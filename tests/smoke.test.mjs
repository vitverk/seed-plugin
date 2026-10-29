import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {runSmoke} from '../scripts/smoke.mjs';
import {endpoint} from '../scripts/validate.mjs';

function server({retiredStatus=404,badPolicy=false}={}) {
 const calls=[];
 const json=(value,status=200,headers={})=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json',...headers}});
 return {calls,fetchImpl:async(url,options={})=>{
  const path=new URL(url).pathname;
  if(path==='/health') return json({name:'SEED',authentication:'oauth2',version:'2.5.0',mcp:endpoint});
  if(['/demo/mcp','/guest/channel'].includes(path)) return new Response('',{status:retiredStatus});
  if(path.startsWith('/.well-known/oauth-protected-resource')) {
   return json({resource:`https://mcp.flaxa.app${path.replace('/.well-known/oauth-protected-resource','')}`,authorization_servers:['https://mcp.flaxa.app/staging']});
  }
  if(!options.headers?.Authorization) return new Response('',{status:401,headers:{'WWW-Authenticate':`Bearer resource_metadata="https://mcp.flaxa.app/.well-known/oauth-protected-resource${path}"`}});
  assert.equal(path,'/mcp','Credentials must be sent only to the canonical audience');
  assert.equal(options.redirect,'error');
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
 assert.equal(report.authenticated,'not_run');assert.equal(report.checks.length,3);assert.deepEqual(fixture.calls,[]);
});
test('authenticated documentation smoke verifies deployed policy and never calls gameplay tools',async t=>{
 const fixture=server();const outputDirectory=await directory(t);const token='synthetic-test-token';
 const report=await runSmoke({docsOnly:true,token,expectedVersion:'2.5.0',fetchImpl:fixture.fetchImpl,outputDirectory,log:()=>{}});
 assert.equal(report.authenticated,'passed');assert.equal(report.checks.length,6);
 assert.deepEqual([...new Set(fixture.calls.filter(c=>c.method==='tools/call').map(c=>c.params.name))],['read_seed_doc']);
 const saved=await readFile(join(outputDirectory,'smoke-docs-results.json'),'utf8');assert.ok(!saved.includes(token));
 assert.deepEqual(JSON.parse(saved),report);
});
test('release smoke rejects retired route revival, stale policy and missing auth',async t=>{
 const outputDirectory=await directory(t);
 await assert.rejects(runSmoke({docsOnly:true,token:undefined,outputDirectory}),/requires SEED_SMOKE_TOKEN/);
 await assert.rejects(runSmoke({token:undefined,fetchImpl:server({retiredStatus:200}).fetchImpl,outputDirectory,log:()=>{}}),/Retired route/);
 await assert.rejects(runSmoke({token:'fixture',fetchImpl:server({badPolicy:true}).fetchImpl,outputDirectory,log:()=>{}}),/card/);
});
