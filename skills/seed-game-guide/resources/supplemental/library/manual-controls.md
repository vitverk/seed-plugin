---
schema_version: 1
id: seed-agent-play-pr34377:library/manual-controls
title: Controls
description: This section covers controls.
document_type: manual
source_type: in_game_manual
source_collection: seed-agent-play-pr34377
source_id: library/manual-controls
source_url: null
source_path: tools/agent-play-api/library/manual-controls.md
source_version: null
language: en
category: In-game manual
topics:
- controls
- in-game manual
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:07efce00ec4d872d68af1456ca3f1563182b8182c6b191111b2fadef9d849c79
conflicts_with: []
---

This section covers controls.

## Controls

*Game settings, HUD layout, camera controls, Seedling commands, mobile apps, and view modes.*

This section will go in-depth on how to control everything.

### General Game Controls
To view settings, press the 'Esc' key and select 'Settings,' here you can access Graphics (split into Display and Visuals: resolution, MSAA, lighting, and Color Blind Mode), Audio (volume for different sounds), UI (Interface size and more), Gameplay (change skip activity queue setting), Controls (Control overview and keyboard shortcuts), Notifications (enabling or disabling notifications for different categories for mobile/desktop), Link Device (reveal a QR code and scan it with the SEED mobile app to link your account; keep the code private, since anyone who has it can log in to your account).
To exit the game, press the 'Esc' key and select 'Exit to system.'

#### HUD Layout
- **Top-left:** Cultivator Profile, Pollen Wallet, Camera Bookmarks, and Election Notifications.
- **Top-right:** PAM (your assistant), Cultivator Objectives, Society Goals, Catalog, TODO List, Notification Centre and Clock.
- **Left sidebar:** Your Seedling's mobile device apps (Wallet, Jobs, Scheduler, Social, Groups, Photos, Spark, Seedling Chat).
- **Right sidebar:** the Management Hub buttons (May not apply: organization browser enabled.) Properties, Organizations and Marketplace (Alternative; may not apply.) Properties, Business (the Business Panel), Societies (the Societies Panel) and Marketplace, then Chat, Real Estate Market, Land Planner and SEED Store.

#### Maintenance Banner
<!-- keywords: banner countdown maintenance downtime server going down -->
*The banner across the top of the screen announcing scheduled maintenance.*
A banner across the top of the screen with a countdown and a message from Seed Industries means scheduled maintenance is coming. The countdown shows how long you have before the world goes down. Nothing is wrong with your game. Use the time to finish what you are doing.

#### Muting Notifications
<!-- keywords: mute silence turn off stop notification spam annoying too many -->
*Turning off a category of notification, from the notification itself or from Settings.*
Click the crossed-out bell icon on a notification to mute its whole category, then confirm. That silences every future one in the category, not just this one. To turn it back on, go to Settings and then Notifications.

#### Pinned Items
Wherever you see the "Pin to HUD" option in the interface, it pins that element to a persistent overlay on your screen. You can pin a machine's production task to watch its progress, a society goal to follow its completion, one of your Seedling's objectives, or an object recipe from the Catalog to keep its ingredients in view while you gather them. Pinned items update in real time, and you can unpin them at any time from the overlay.

#### Hiding the Interface and Choosing What Shows
<!-- keywords: hide ui hide hud screenshot clean view hotkey shortcut visibility settings eye icon show hide turn off names labels plot names icons bubbles notifications markers grid zones plots territory deposits clutter -->
*Hiding the whole interface, and turning names, icons, plots and other world overlays on or off.*
Press Ctrl + U to hide the whole interface, and press it again to bring it back. Use Ctrl on both Windows and Mac.
To choose what shows in the world, click Visibility (the eye icon at the bottom right of the screen). Each item in it is a switch you can turn on or off:
- World Icons: Names, Resource icons, Activity indicators, Floating notifications, Reaction bubbles, Wear & damage, Owned Seedling markers and Furniture set icons.
- Floating Chat, World Grid, Transfers and Timeline.
- Zones: Owned plots, Accessible plots, Inaccessible plots, Claimable plots and Territory. Inaccessible plots are off by default.
- Resource Deposits: Sub-surface overlay and Icons.

### Camera Controls
<!-- keywords: see inside building cutaway zoom find locate seedling -->
Zoom in and out using the mouse wheel or press + or -.
Pan the camera by holding and dragging the right mouse button across the screen. The W, A, S, D keys and arrow keys can also move the camera.
Use Q, E, R, and F to rotate the camera. You can also rotate the screen by holding and dragging the middle mouse button across the screen.

#### Locate an object or Seedling and focus camera on it
The Locate button (a map pin icon) instantly zooms to and finds any object or Seedling. You can locate your Seedling using the locate button on the Seedling Card or by pressing the Space key.
To focus on a building or object, select it: this opens a panel showing its name, and from there you can click the location pin icon to focus your camera on it. (Whether you click or right-click to select something depends on the Swap Mouse Controls setting — off by default, click selects; enabled, right-click selects instead.) From that same object's context menu you can also switch view modes to show the building with or without its walls — pick the eye icon to see inside the building. You can hold Shift and scroll the mouse wheel to switch between floors.

#### Camera Bookmarks
<!-- keywords: bookmark save camera view position jump cycle shortcut hotkey slot tour travel speed follow entity -->
*Saving camera views and jumping back to them.*
Open Camera Bookmarks from the top-left HUD to see slots 1 to 10. Click a bookmark to jump to it, or click "Add bookmark" on a free slot to save the current view there. Hover a bookmark to delete it.
A bookmark saved while the camera follows a Seedling or an object stores that Seedling or object and shows its portrait. A jump to the bookmark follows the Seedling or object wherever it is.
The play button in the title bar starts a tour of at least two bookmarks. The tour starts at the bookmark closest to the camera and then goes in slot order. Camera input, a bookmark shortcut or Escape stops it.
The gear button opens the settings. Travel Time is the flight time to a bookmark (0 to 10 seconds), and Stop Time is the time at each tour stop (1 to 30 seconds).
Keyboard shortcuts. Ctrl means the Control key on both Windows and Mac.
- Ctrl + 1 to 9, or Ctrl + 0 for slot 10: jump to that bookmark.
- Ctrl + Left and Ctrl + Right: step to the previous and next bookmark.
- Ctrl + Up and Ctrl + Down: shorten or lengthen the travel time by one second.
- Ctrl + Space: start or stop the tour.
- Ctrl + Shift + 1 to 9, or Ctrl + Shift + 0 for slot 10: save the current view into that slot as "Bookmark N". The slot must be free.
These shortcuts keep working after Ctrl + U hides the interface.

### Seedling Controls
<!-- keywords: command obey ignore listen daydream direct control -->
*Guiding your Seedling with the Scheduler, Direct Control, and their mobile device.*

There are two main ways to guide and influence your Seedling's actions through planning and direct instruction.

Scheduler App: This app lets you fill in your Seedling's calendar, telling them where to go and when. Your Seedling will strictly follow their calendar and only perform the assigned prioritized activities.

Direct Control: Click on the ground and select "Go here" to ask your Seedling to walk there. Click on objects to bring up the Direct Control menu with the activities your Seedling can perform there. Clicking on one of those activities will add it to the activity queue, which appears at the top of your Seedling's card. (Which mouse button does this depends on the Swap Mouse Controls setting — off by default, so it's the left mouse button; enabled, the right mouse button instead.) Shortcuts: You can double-click on the ground to go somewhere.

The Direct Control menu shows the most relevant actions first and groups the rest into submenus by category, so related actions sit together. Actions that never apply to an object are hidden entirely, while activities that exist but can't be performed right now (the object is in use, materials are missing, or your Seedling lacks access) appear grayed out. Pickup and drop actions include a quantity selector so you can choose how many items to move. The menu also gives quick access to the object's Catalog information. Some items have handy shortcuts: seeds, for example, show a direct "Plant" option that takes you straight into farming.

Send Directly: You can hold the Shift key while selecting an activity in the Direct Control menu, or double-click on the ground. Your Seedling will then be sent directly to perform the activity without waiting in the queue. You can change this behavior in Settings > Gameplay to make holding Shift queue the activity instead.

If you see a grayed-out activity button, it means the activity is currently unavailable. This can happen for several reasons: the object or Seedling may be in use by another Seedling; for construction, production, or repair activities, there may not be enough resources available in nearby inventory; or, if 'Go here' is grayed out, your Seedling may lack access to the selected location. For example, if another Cultivator's Seedling is already using an object, or if the building is privately owned, the button will appear grayed out. Public service locations are available to all Seedlings, and you can assign activities there through the Scheduler. Although you cannot direct control your Seedling to go to a public service location, you can always direct control it to go home.

#### Mobile Device
Your Seedling has their very own smartphone that comes with apps that can manage their daily life. You can access this from the left sidebar of your screen. Here is a quick summary for the various apps:
Wallet: Transfer money to any other wallet, view your Seedling's SeedCoin balance and transaction history.
Jobs: Find jobs and manage your Seedling's career.
Scheduler: This app lets you fill in your Seedling's calendar, telling them where to go and when.
Social: Monitor relationships with other Seedlings.
Groups: Manage private groups for shared living and resources.
Photos: View selfies your Seedling has taken. To take a selfie, click on your own Seedling and select the selfie option.
Spark: SEED's social network — a shared feed of short posts.

### View Modes
*Focus Mode, Society View, Map View, and World View explained.*

There are four view modes that can be accessed from the bottom right of your screen.
- Focus Mode: Focus Mode shows the inner workings of your Seedling.
- Society View: The default mode where you play the game. In this view, you can observe Seedlings and their surroundings. You can move the camera around, exploring the world, finding natural resources, objects and inspect items. You can find out where things are and how your Seedling might interact with the world. The Locate Button (which looks like a map location marker) can be used to focus on Seedlings and to look inside buildings.
- Map View: This allows you to explore the society and its buildings from a bird's-eye perspective and see where your Seedling is. This is a helpful tool for navigating more advanced societies with many buildings and service locations, as it lets you find businesses, homes, and other buildings to visit and decide where to send your Seedling. It also allows you to explore buildings and locations that your Seedling doesn't have knowledge of yet (see Unknown Buildings under Buildings & Building Management). Map view is for discovering locations and not used for looking for resources or certain objects in the world.
- World View: It lets you see your current society and discover other societies. You can also use this view to find locations on the map to start a new society. If another society is public, you can click on it and select "Visit" to enter Visitor Mode: this lets you look around, inspect buildings and objects, and get a feel for the society before deciding if you want to migrate your Seedling there.
