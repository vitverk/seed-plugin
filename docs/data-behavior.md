# SEED data behavior

SEED reads the connected player's actual account through the Flaxa proxy. It is not a disposable simulation. OAuth permissions and the upstream game enforce access; developer tools can change the game within the user's authorized task.

The proxy keeps encrypted connection credentials and account-specific notes in its existing storage. Notes persist across chats for the same connected account and world. Disconnecting revokes host credentials; it does not undo game changes or erase the chat host's retained messages and tool results.

Cards display bounded snapshots with the original subject, source and capture time. A card does not run the game, store a simulation, or refresh because of an unrelated read. Read again when freshness matters. The character creator saves a design locally and does not create a game entity by itself.

The currently configured upstream world is `mcp-dev2` in SEED staging. Keep its credentials, identifiers and account notes separate from older worlds. This technical environment marker remains in machine responses and operational records.

The direct SEED API plugin has its own OAuth connection and grants. Installing either package does not grant account or developer access. Neither package embeds credentials.
