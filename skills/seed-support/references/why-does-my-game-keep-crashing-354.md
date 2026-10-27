---
title: Why does my game keep crashing?
description: 'Fully drafted in the doc; system-requirements link to be wired once
  live. Restart the game client. Verify your game files. On Steam: right-click SEED
  → Prope...'
source_url: https://klang-games.eu.theymes.com/hc/en/seed/articles/why-does-my-game-keep-crashing-354
source_id: '354'
category: Community & Support
language: en
retrieved_at: '2026-10-27T14:26:25Z'
content_hash: sha256:f7cf49e2a3044a8320966070f90cfb75084531f8168eed783cfab20e45a54c15
---

# Why does my game keep crashing?

Fully drafted in the doc; system-requirements link to be wired once live.

1. Restart the game client.
2. Verify your game files. On Steam: right-click SEED → Properties → Installed Files → Verify integrity of game files.
3. Update your graphics driver. NVIDIA (nvidia.com/drivers) or AMD (amd.com/support) on Windows; on Mac this comes through the latest macOS update.
4. Check your PC against the system requirements.
5. Still crashing? Reset your local SEED settings, then restart. This only removes SEED's own saved settings — it won't affect Windows, your other programs, or any of your files:

   - **Windows**: open Registry Editor, go to HKEY\_CURRENT\_USER\Software\Klang\Seed, and delete everything inside (not the folder itself). Then delete the folder at %USERPROFILE%\AppData\LocalLow\Klang\Seed.
   - **Mac**: delete ~/Library/Preferences/com.Klang.Seed.plist, and clear anything Klang-related from ~/Library/Application Support/.
