import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {runSmoke} from '../scripts/smoke.mjs';
import {endpoint} from '../scripts/validate.mjs';

const seedScopes=['seed:profile:read','seed:character-information:read','seed:developer','seed:societies:read','seed:staticdata:read','seed:wallet:read','seed:market:read'];
function server({retiredStatus=404,badPolicy=false,canonicalIssuer='https://mcp.flaxa.app',authorizationOverrides={},legacyAuthorizationOverrides={},authorizationStatus=200,scopes=seedScopes}={}) {
 const calls=[],requests=[];
 const json=(value,status=200,headers={})=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json',...headers}});
 return {calls,requests,fetchImpl:async(url,options={})=>{
  const path=new URL(url).pathname;
  assert.equal(new URL(url).origin,'https://mcp.flaxa.app');
  assert.equal(options.redirect,'error');
  requests.push({path,method:options.method??'GET',authenticated:Boolean(options.headers?.Authorization)});
  if(path==='/health') return json({name:'SEED',authentication:'oauth2',version:'2.5.0',mcp:endpoint});
  if(['/demo/mcp','/guest/channel'].includes(path)) return new Response('',{status:retiredStatus});
  if(path.startsWith('/.well-known/oauth-protected-resource')) {
   const resourcePath=path.replace('/.well-known/oauth-protected-resource','');
   return json({resource:`https://mcp.flaxa.app${resourcePath}`,authorization_servers:[resourcePath==='/mcp'?canonicalIssuer:'https://mcp.flaxa.app/staging'],...(resourcePath==='/mcp'?{scopes_supported:scopes}:{})});
  }
  if(['/.well-known/oauth-authorization-server','/.well-known/oauth-authorization-server/staging'].includes(path)) {
   const legacy=path.endsWith('/staging');
   const issuer=`https://mcp.flaxa.app${legacy?'/staging':''}`;
   return json({issuer,authorization_endpoint:`${issuer}/oauth/authorize`,token_endpoint:`${issuer}/oauth/token`,registration_endpoint:`${issuer}/oauth/register`,protected_resources:[endpoint,'https://mcp.flaxa.app/live/mcp','https://mcp.flaxa.app/staging/mcp'],...(legacy?legacyAuthorizationOverrides:authorizationOverrides)},authorizationStatus);
  }
  assert.ok(['/mcp','/live/mcp','/staging/mcp'].includes(path),`Unexpected request: ${path}`);
  if(!options.headers?.Authorization) return new Response('',{status:401,headers:{'WWW-Authenticate':`Bearer resource_metadata="https://mcp.flaxa.app/.well-known/oauth-protected-resource${path}"${path==='/mcp'?`, scope="${scopes.join(' ')}"`:''}`}});
  assert.equal(path,'/mcp','Credentials must be sent only to the canonical audience');
  const request=JSON.parse(options.body); calls.push(request);
  let result;
  if(request.method==='initialize') result={serverInfo:{name:'flaxa-seed',title:'SEED',version:'2.5.0'},instructions:badPolicy?'Render only for an explicit visual request':'The user need not say "card" or "widget". Use prepare_presentation_review; verified completion transitions do trigger panels.'};
  else if(request.method==='tools/list') result={tools:['status','inventory','health','agenda','goals','mood','radar','needs','activity','society_goals','seedling_character','game_plans','settlement_supplies','project_status'].map(name=>({name:`show_${name}`,description:'The user need not say "card" or "widget".',annotations:{readOnlyHint:true},_meta:{ui:{resourceUri:'ui://seed/widget.html'}}}))};
  else if(request.method==='resources/read') result={contents:[{mimeType:'text/html;profile=mcp-app',text:'<html></html>'}]};
  else if(request.method==='tools/call') {
   assert.equal(request.params.name,'read_seed_doc','Only documentation reads are allowed');
   result={structuredContent:{text:request.params.arguments.uri==='seed://docs/index'?'# SEED documentation':'Use one focused card.'}};
  } else assert.fail(`Unexpected method ${request.method}`);
  return json({jsonrpc:'2.0',id:request.id,result});
 }};
}
async function directory(t){const path=await mkdtemp(join(tmpdir(),'seed-smoke-'));t.after(()=>rm(path,{recursive:true,force:true}));return path;}
test('public release smoke verifies authenticated routing and retired paths without game reads',async t=>{
 const fixture=server();const report=await runSmoke({token:undefined,fetchImpl:fixture.fetchImpl,outputDirectory:await directory(t),log:()=>{}});
 assert.equal(report.authenticated,'not_run');assert.equal(report.checks.length,5);assert.deepEqual(fixture.calls,[]);
 assert.ok(fixture.requests.every(request=>!request.authenticated));
 assert.deepEqual(fixture.requests.filter(request=>request.path.includes('oauth-authorization-server')).map(request=>request.path),['/.well-known/oauth-authorization-server','/.well-known/oauth-authorization-server/staging']);
 assert.ok(fixture.requests.every(request=>request.method==='GET'||['/demo/mcp','/guest/channel'].includes(request.path)));
});
test('authenticated documentation smoke verifies deployed policy and never calls gameplay tools',async t=>{
 const fixture=server();const outputDirectory=await directory(t);const token='synthetic-test-token';
 const report=await runSmoke({docsOnly:true,token,expectedVersion:'2.5.0',fetchImpl:fixture.fetchImpl,outputDirectory,log:()=>{}});
 assert.equal(report.authenticated,'passed');assert.equal(report.checks.length,8);
 assert.deepEqual([...new Set(fixture.calls.filter(c=>c.method==='tools/call').map(c=>c.params.name))],['read_seed_doc']);
 const saved=await readFile(join(outputDirectory,'smoke-docs-results.json'),'utf8');assert.ok(!saved.includes(token));
 assert.deepEqual(JSON.parse(saved),report);
});
test('release smoke rejects canonical discovery that sends new connections to staging',async t=>{
 const outputDirectory=await directory(t);
 await assert.rejects(runSmoke({token:undefined,fetchImpl:server({canonicalIssuer:'https://mcp.flaxa.app/staging'}).fetchImpl,outputDirectory,log:()=>{}}),/\/mcp OAuth issuer/);
 await assert.rejects(runSmoke({token:undefined,fetchImpl:server({authorizationStatus:404}).fetchImpl,outputDirectory,log:()=>{}}),/oauth-authorization-server must be available/);
 for(const [field,route] of [['issuer',''],['authorization_endpoint','/oauth/authorize'],['token_endpoint','/oauth/token'],['registration_endpoint','/oauth/register']]) {
  await assert.rejects(runSmoke({token:undefined,fetchImpl:server({authorizationOverrides:{[field]:`https://mcp.flaxa.app/staging${route}`}}).fetchImpl,outputDirectory,log:()=>{}}),new RegExp(`oauth-authorization-server ${field}`));
 }
});
test('release smoke requires the canonical sign-in to request every SEED permission once',async t=>{
 const outputDirectory=await directory(t);
 for(const scopes of [seedScopes.filter(scope=>scope!=='seed:market:read'),[...seedScopes,'seed:market:read'],[...seedScopes,'seed:market:write'],[]]) {
  await assert.rejects(runSmoke({token:undefined,fetchImpl:server({scopes}).fetchImpl,outputDirectory,log:()=>{}}),/every SEED permission exactly once/);
 }
});
test('release smoke preserves the issuer and endpoints used by existing alias connections',async t=>{
 const outputDirectory=await directory(t);
 for(const [field,route] of [['issuer',''],['authorization_endpoint','/oauth/authorize'],['token_endpoint','/oauth/token'],['registration_endpoint','/oauth/register']]) {
  await assert.rejects(runSmoke({token:undefined,fetchImpl:server({legacyAuthorizationOverrides:{[field]:`https://mcp.flaxa.app${route}`}}).fetchImpl,outputDirectory,log:()=>{}}),new RegExp(`oauth-authorization-server/staging ${field}`));
 }
});
test('release smoke rejects retired route revival, stale policy and missing auth',async t=>{
 const outputDirectory=await directory(t);
 await assert.rejects(runSmoke({docsOnly:true,token:undefined,outputDirectory}),/requires SEED_SMOKE_TOKEN/);
 await assert.rejects(runSmoke({token:undefined,fetchImpl:server({retiredStatus:200}).fetchImpl,outputDirectory,log:()=>{}}),/Retired route/);
 await assert.rejects(runSmoke({token:'fixture',fetchImpl:server({badPolicy:true}).fetchImpl,outputDirectory,log:()=>{}}),/card/);
});
