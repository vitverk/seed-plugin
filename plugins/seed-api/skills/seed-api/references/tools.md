# Announced SEED staging tools

Snapshot of Oddur’s 27 October 2026 staging announcement, reviewed on
28 October. These are announced capabilities, not an independent authenticated
test result. Inspect the server’s current schemas before calling tools.

## Player tools

Available to SEED accounts with the relevant permissions selected at consent.
All eight are read-only.

| Tool | Purpose |
| --- | --- |
| `my_account` | Account profile, granted permissions, progression, inventory and public profile. |
| `my_seedlings` | List seedlings or read one seedling’s needs, activity, health, thoughts, stats, skills and relationships. `section: now` returns compact current state; supported clients display a live card. |
| `game_data` | Search published items, schematics, skills, needs, activities and traits, or read an entry by its link. |
| `find_recipes` | Find schematics that produce or consume an item, including inputs, outputs, machine, skill and time. `uniqueId` is the `schematic_id` used by crafting commands. |
| `game_guide` | Search and read the game manual, PAM’s knowledge base. |
| `societies` | Read visible societies, society cards, statistics and graveyards. |
| `wallets` | Read permitted Pollen, SeedCoin and organization balances, transactions, history charts and wills. |
| `players` | Read public player and seedling profiles and ownership. |

## Developer tools

Require the SEED MCP `mcp_developer` role and `seed:developer` token scope.
Reauthenticate after receiving the role. Only `send_command` changes game state.

| Tool | Purpose |
| --- | --- |
| `sim_time` | Read world simulation time and speed. |
| `commands` | List ECO commands, required roles and read-only status, or inspect a command’s request and response schemas. |
| `entities` | Read live sector entities and components. `near` filters by a circle and sorts nearest first; `landscape` pages standing tile-grid objects such as trees, rocks and deposits. |
| `send_command` | Send one ECO command to an entity for the identity named by `header`. Changes live game state; limited to one request per second per developer. Read state before retrying an unknown outcome. |
| `find_actions` | Discover nearby seedling actions through its player’s context menus and return ready `send_command` requests. Discovery does not queue an action. |
| `query_land` | Read nearby plots and society territories, including ownership, society, household flag and bounds. |
| `character_chat_history` | Read a seedling’s most recent chat messages with players, newest first, limited to the newest 100. |
| `list_events` | Start observing a user, then poll using the returned cursor for chat replies, needs crises, activity changes and elections; a call can wait up to 20 seconds. |

The separate MCP Events push integration was planned in a later message on
27 October; it is not established by this tool list. Proposed tool renames
were discussed on 28 October but are not assumed to have shipped here.
