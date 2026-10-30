# SEED on Claude hosts

Install the repository marketplace and the SEED plugin:

```sh
claude plugin marketplace add vitverk/seed-plugin
claude plugin install seed@vitverk-seed
```

Its displayed name is SEED. The marketplace installs the [`claude`](../claude/) folder, whose plugin and HTTP server are both named `seed`, so Claude shows `plugin:seed:seed`. The folder limits the Claude install to its manifest, connection, README and icon. Earlier Claude installs of `seed-live@vitverk-seed` are no longer listed: uninstall them and install `seed@vitverk-seed`, then sign in again.

The connector uses `https://mcp.flaxa.app/mcp` with OAuth; installation does not by itself sign in or grant game access. The server's first sign-in challenge offers every SEED permission, and the consent page lets people decline each one. The root package carries the same `seed` Claude manifest and connection for the self-contained archive.

Host rendering and directory approval require separate verification. Before public submission, provide current SEED policy, licensing, recording and host-review evidence and run `npm run check:submission`.
