# SEED on Claude hosts

Install the repository marketplace and the SEED plugin using the stable internal identifier:

```sh
claude plugin marketplace add vitverk/seed-plugin
claude plugin install seed-live@vitverk-seed
```

Its displayed name is SEED. The HTTP connector uses `https://mcp.flaxa.app/mcp` with OAuth; installation does not by itself sign in or grant game access. The root package contains the Claude manifest, connection configuration, assets and README needed for a self-contained archive.

Host rendering and directory approval require separate verification. Before public submission, provide current SEED policy, licensing, recording and host-review evidence and run `npm run check:submission`.
