---
schema_version: 1
id: seed-agent-play-pr34377:library/manual-things
title: Things
description: This section covers things.
document_type: manual
source_type: in_game_manual
source_collection: seed-agent-play-pr34377
source_id: library/manual-things
source_url: null
source_path: tools/agent-play-api/library/manual-things.md
source_version: null
language: en
category: In-game manual
topics:
- things
- in-game manual
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:7023ea3a6c5e9787d6279fca68d958a18eef08ddf8aff84c7b4d8161d0844182
conflicts_with: []
---

This section covers things.

## Things

*Inanimate world items: natural resources, container items, placeable objects, and ownership versus access rules.*

This section consists of inanimate things that can be found in the world. There are three main types and they all have different ways of interacting with them. They include Resources, Container Items & Placeable Objects.

### World Resources
*Natural resources in the world: what grows back, planting trees and saplings, and gathering surface and underground deposits.*
<!-- keywords: wood stone log timber find gather important early regrow grow back respawn sapling not growing stuck blocked deposit mined out -->
World resources are natural things in the world, such as Trees, Rocks, Algae Shrubs and Flaxa Flowers (small flowers found across Avesta). Move your camera around and click one to see what it gives. For how Seedlings gather and store them, see Harvesting.
**What grows back**
Most plants, such as shrubs, mushrooms and flowers, grow back at the same spot a few taus after they are harvested.
(May not apply: sapling growth enabled.)
Trees do not grow back, even when the stump is still standing. Plant a tree seed to grow a new one. A harvested Berry Bush does not grow back either. Harvesting one sometimes gives Berry Bush Seeds. Plant a seed on open terrain to grow a new Berry Bush. For a steady wood supply, grow Sapling Seeds on a farm field (see Farming and Crops).
**Saplings**
A planted tree seed grows as a sapling. Click it to see its Growth status: Growing or Blocked. When its growth time is up, it becomes a tree on its spot. If a rock, a deposit or another natural object holds that spot, the tree grows right beside it instead. A building in the way stops it from becoming a tree. Its status then shows Blocked. Players who can move the sapling also see "Cannot Grow" above it. Clear the spot and the sapling becomes a tree shortly after.
 (Alternative; may not apply.)
Trees grow back the same way.

**Deposits**
Deposits hold raw materials, such as Clay, Coal, Stone and Water Deposits. Ore deposits give ores, not metals. To turn ore into metal, see Mining and Ore Processing.
Deposits you can see on the surface can be gathered by hand. Use Direct Control, click the deposit and pick its gathering option, such as "Mine Coal", "Harvest Clay" or "Fetch Water". Any adult Seedling with access to the spot can do this. They need no tool or machine. Their skill changes how well it goes, not whether they can try.
Hidden deposits also lie underground across the whole landscape. A Seedling must find them first by scanning with a Resource Scanner (see Resource Scanning). Only a Resource Extraction Machine can gather an underground deposit. Scan before you place one. The resource underground can differ from the deposit you see above it.
A mined-out deposit does not come back. To keep your supply going, find a new deposit, trade with another society, or place an extractor on a fresh underground deposit. Underground water is different. It refills on its own. Light pumping is covered by the refill. Heavy pumping can drain it faster than it refills.

#### Matsu and Bristlecone Trees
*Special decorative trees bought with Pollen in the Seed Store, part of the SEED x Wilderness International partnership.*
<!-- keywords: matsu bristlecone golden silver special tree seed grow rainforest forest amazon certificate email charity where plant can't plant outside of placement area who planted -->
Matsu Tree Seeds and Bristlecone Tree Seeds are special seeds that grow into decorative trees: the golden Matsu Tree and the silver Bristlecone Tree. These seeds cannot be gathered from nature or crafted. They are sold in the [SeedStore], for Pollen.
Plant them outdoors on ground where you may place objects, such as your own plot. On society land, your role must allow placing objects there. The whole tree, roots included, must fit inside the plot or area it is planted on without reaching over its edge. A Matsu Tree needs about 9 by 8.5 metres, a Bristlecone Tree about 4 by 4 metres. If the placement shows "Outside of placement area" or is refused, move it away from the edge or pick a larger plot.
They grow through four visible stages before reaching their final form. Growth takes roughly 168 taus, about seven real-world days.
Click a Matsu or Bristlecone sapling or tree to see which Cultivator planted it.
Matsu and Bristlecone Trees do not drop lumber or any other resource when harvested. They are purely decorative.
Seedlings never chop these trees on their own, on a schedule, or when asked in chat. Only a Direct Control order from the tree's menu removes one. Its harvest option shows in red. Choosing it opens a Gone Forever warning. Confirm to remove the tree.
These seeds are part of SEED x Wilderness International, a partnership with a real-world conservation organization. For each Matsu Tree Seed bought, Wilderness International permanently preserves 10 m² of real rainforest in the Peruvian Amazon. For each Bristlecone Tree Seed bought, it preserves 1 m². The rainforest is counted per seed bought, not per tree planted. The Cultivator who buys the seeds receives a certificate, issued by Wilderness International, for the rainforest their purchases preserve. A Cultivator who plants a seed that someone else bought does not receive a certificate. Klang Games, the studio behind SEED, sends the certificate to the email address of the buyer's SEED account. It arrives within 30 business days of the purchase, not right away. If it has not arrived by then, [PlayerFeedback].

#### Resource Scanning
Underground deposits of resources like clay, water, or ores are hidden by default: nobody can tell what's underground until a Seedling scans for it. Scanning only concerns these hidden deposits: a deposit you can already see on the surface can be gathered straight away, with no scanner involved.
To scan, a Seedling needs two items in their inventory: a Resource Scanner and Power Cells. Both are crafted at the Electronics Table (check the [ObjectCatalog] for materials and details), or you can buy them on the Marketplace if another Cultivator is selling them. The Resource Scanner is reusable, but each scan consumes one Power Cell, and after a scan the scanner needs a short cooldown before that Seedling can scan again.
Use Direct Control: click a spot on the ground and choose Scan. The Seedling walks over and scans a small area around that spot, reliably revealing every deposit cell within range. Scans are dependable but short-ranged: if a scan finds nothing, that small patch really is empty. To cover more ground, scan several different spots — re-scanning the same spot never reveals anything new.
Everything your Seedlings discover is shown in the deposit overlay, which you can turn on and off in the visibility settings (eye icon) at the bottom right of the screen. It paints your discovered deposits as a colored grid overlay on the terrain. Each tile's color identifies which resource was found there (for example, water shows blue, coal near-black, ores in their own colors); the color does not indicate how rich the deposit is. Tiles that were scanned but held nothing show as a faint gray, and ground that was never scanned stays unmarked. While the overlay is on, hover over a tile to see which resource was found there and how much of it was left when it was scanned. A tile with nothing left shows Depleted. A banner shows your Seedling's scanner status, including the scan cooldown. If the Scan option in the ground menu is grayed out, it tells you why — your Seedling is out of Power Cells or the scanner is still on cooldown.
A few things to keep in mind:
- Survey knowledge belongs to the individual Seedling that scanned. If that Seedling dies or migrates to another sector, its discoveries are lost.
- As the Cultivator, you automatically see the combined discoveries of all your Seedlings — they don't need to do anything to share findings with each other. There is no way to share survey knowledge with other Cultivators; their scans are their own.
- A Seedling can only remember a limited number of discovered cells; past that limit, its oldest discoveries are forgotten to make room for new ones. There is currently no way to increase this capacity — there is only one type of Resource Scanner and no upgrades that affect scanning.
- If the Scan option doesn't appear when clicking the ground, check that the Seedling is carrying a Resource Scanner; if it appears but is grayed out, they are out of Power Cells or the scanner is on cooldown.

#### Prospecting Radar
<!-- keywords: radar filter extractor stone dust running out depleted yield less empty -->
The Prospecting Radar is a second mode of the same Resource Scanner, for covering ground passively instead of scanning spot by spot: a regular Scan only reveals a small area around one exact point you clicked, so surveying a large tract of land one scan at a time is slow. The radar solves that by working automatically around your Seedling as they go about their day, without you having to walk them to each spot yourself — start it once, then let your Seedling get on with other tasks while it keeps checking the surrounding ground on its own.
Turn it on from the deposit overlay's scanner banner (the "Radar" toggle, next to the regular scanner status). Activating it costs one Power Cell up front — not per clue found — and starts a session that runs for a limited time, shown as a countdown on the scanner banner; once the countdown ends, the session stops and you'd need to activate it again. It doesn't need your Seedling to stand still or stay nearby while it runs. Use the Radar Filter button next to the Radar toggle to choose which deposit resources the radar pings. A change applies from the radar's next ping.
While active, the radar periodically pings the ground around wherever your Seedling currently is, even outside your society's land, and drops a marker on any promising cell it finds, up to a small cap of clues at a time. Each marker is color-coded: rare deposits get a distinctly different marker color than ordinary ones, so you can tell at a glance which pings are worth prioritizing. A radar clue is deliberately vague beyond that, though: it never tells you which resource is actually there. To find out, you still have to send your Seedling to do a normal Scan on the pinged spot; scanning it removes the clue and reveals the resource like any other scan. Cells that are already fully depleted never generate a clue. The radar session and the regular scan cooldown are independent, so running the radar doesn't stop you from also doing manual scans in the meantime.
Use the radar to flag a wide area worth exploring, then use regular scans to confirm the good spots — it's a first pass, not a replacement for scanning.

How this connects to extraction: a Resource Extraction Machine placed on the ground produces its resource with a chance based on how abundant the deposit underneath is, and produces Stone Dust the rest of the time. Rich ground yields mostly the resource; empty ground yields just Stone Dust. That's why scanning first matters: it tells you where the rich ground is before you invest in placing an extractor.
Underground deposits wear down as they are mined. Each time the machine extracts its resource, it uses up part of the deposit under it. After enough extractions, the chance of getting the resource drops a step. It keeps dropping step by step until the machine yields only Stone Dust. A large extractor's bonus output does not wear the deposit down. If you manage the machine, open its menu and hover its extraction action. The tooltip shows how much of the resource is left and when the chance drops next. Underground water wears down too, but it refills on its own over time.

#### Harvesting
<!-- keywords: chop mine pick collect leaving stuff on ground not picking up storage full bag plot zone -->
*Scheduling wild-resource harvesting and collecting resource piles into storage.*
Harvesting is the best way to gather resources for survival. You can send your Seedling to harvest resources through Direct Control by clicking on natural resources in the world. Resource Deposits work the same way: click a deposit you can see and your Seedling gets an option to gather it. Only the hidden sub-surface deposits found by scanning need an extraction machine.

(May not apply: schedule zones enabled.) For automatic harvesting, set a schedule block's location to a plot or a schedule zone and choose Harvest. Both work the same way: your Seedling harvests the wild trees, shrubs and stones inside that area in turn.  (Alternative; may not apply.) For scheduled harvesting, save the resources' harvest actions to your Seedling's TODO List. Farm crops use the Farm priority instead (see Grow Your Crops and Harvesting).

Harvesting can leave resources in piles on the ground. To have your Seedling collect them automatically, place a storage container near the resources and inside the scheduled area. Your Seedling needs access to the container. In the storage container's Settings, select the items or categories it should accept. The container must have free space. Collecting ground piles counts as Harvest work, so a separate Haul priority is not needed. Fetch Water is Harvest work too; place storage that accepts water. Without suitable storage, your Seedling can keep harvesting while piles remain. Plan storage for the harvest rather than relying on your Seedling's personal inventory.

To send the collected resources to a business elsewhere, arrange a transfer or delivery from the storage container (see Transferring Items Between Containers).
Some harvestables also have a chance to yield a bonus drop on top of their normal resource.

### Container Items
<!-- keywords: store food storage disappear missing item delete remove throw away get rid of discard trash -->
These are items that exist exclusively within a Seedling's inventory or storage containers. They cannot be placed into the game world. Examples include materials harvested from nature, food produced by machines, or clothes purchased from the Marketplace. These items can be stored, hauled between containers, used as materials for crafting, or consumed by Seedlings using Direct Control.
Container Items cannot be deleted. Only placed objects have a Delete option. To get rid of Container Items, sell them on the Marketplace, move them to another container, or use them up in crafting or by consuming them.
For crafting, Seedlings will automatically collect the required items when assigned to a production task. To consume food or water, use Direct Control on a storage container, select Consume, and then choose the item you want your Seedling to eat or drink. Clothing can be equipped through the Seedling Focus Mode once it is in the Seedlings inventory.

#### Decay
Many Container Items decay over time, including food, plants, remedies and many materials. Fresh items like algae decay extremely quickly while cooked and processed foods last longer. Once fully decayed, most items turn into another item, often Biomass. The item's catalog entry shows its Lifespan and what it decays into. You can slow decay using special storage containers like a fridge. To check an item's remaining Lifespan, open the Properties Panel, select the container the item is stored in, then select the item. Lifespan is shown on the right. For placeable objects such as machines and furniture, durability is listed under context menu > About.

A red triangle on an item in storage means some of it will decay soon. Click the item to see how many. Use or sell them first, or put them in a fridge.

Biomass itself is a useful raw material. It feeds into a range of schematics (such as farming and chemistry) and can also be sold on the Marketplace if you produce more than you need. Check the Catalog to see which schematics currently consume it. Biomass is not permanent either — left unused long enough, it eventually decays away too, just much more slowly than the fresh items it came from.

Most minerals and metals, such as Clay, Stone, Coal and Graphite Powder, don't decay. When in doubt about a specific material, check the Catalog rather than assuming.

### Placeable Objects
<!-- keywords: move pick up furniture place delete remove destroy which roles who can destroy destroy permission -->
Placeable Objects are objects with a physical presence in the world that can be positioned using Placement Mode. Examples include: Tents, furniture like Chairs and Sofas, production Machines such as the Crafting Table, and decoration items like plants or paintings.
Placement Restriction: Not all objects can be placed everywhere. Some objects can only be placed indoors (inside a building), while others can only be placed outdoors. Placement Mode will indicate if the selected spot is valid for the object and show hints about why a placement is not allowed. If you see an error message, pay attention to the UI hints: they will tell you what the restriction is.
Objects can also be packed or deleted. Select the object to open its context menu, hover the three-dots (⋮) button in the top right corner of the menu header, and pick ‘Pack’ or ‘Delete’ in the panel that opens — these live behind that button rather than among the rows of the context menu itself. Packing an object turns it into a package that can be picked up and dropped off via Direct Control; until the package is moved into a container, it cannot be unpacked. Deleting an object removes it for good — there's a confirmation step first since it can't be undone.

To move an object, it must be packed first. To move a container, it has to be emptied first. Some exceptions are building inboxes and outboxes. Their contents move directly with them.

Who can delete an object depends on who owns it:
- You can always delete objects you own yourself.
- An object owned by your society or a department can only be deleted by a Seedling whose role allows it.
- Until your society adopts a constitution, no role can delete society-owned objects. The Mayor gets this right once the society reaches Large Town II, the last tier.
- After your society adopts a constitution, the roles of that constitution decide who can delete. In an Anarchy, every adult Seedling can.
- Some objects, like the Inbox, Outbox and Kernel, can't be deleted. An Inbox and Outbox are removed when their building is demolished.

If you don't see the Delete option on a society-owned object, ask your society's leaders who holds this right.

#### Wear and Tear
<!-- keywords: repair fix broken furniture machine durability condition maintenance outside outdoors rain weather wearing out fast -->
*Object durability, and how to repair worn or broken furniture and machines.*
Most Placeable Objects suffer from Wear and Tear as they are being used. The durability stat that can be inspected after viewing an object, indicates the object's condition. You can make your Seedling repair it immediately with Direct Control or Create an Employment Task with the repair activity selected to automate repairs at a specified priority level. Repairs need the required materials to be available in nearby inventory. Objects with less than 85% condition cannot be packed and stored. Letting durability run all the way down doesn't destroy the object — it becomes Broken, a distinct condition state that still exists and can still be repaired back to working order.
Where an object stands matters too. Some objects wear out much faster outdoors than under a roof, and the object's durability display warns you while one of them is standing outside. They don't break sooner in total use. The weather just gets through it faster. One left outside needs repairing far more often. Everything else wears at the same rate wherever you put it.

#### Fire
Fire is a serious hazard in Avesta. Certain objects like kilns, furnaces, and ovens are flammable, and when a Seedling critically fails an activity on a flammable object, that object can catch fire. This can happen during smelting, cooking, firing pottery and bricks, processing chemicals, or even crafting decorative items like vases and mirrors. The lower your Seedling's skill level for that activity, the more likely they are to critically fail and accidentally ignite the object they are working on.

##### What Happens When Fire Breaks Out
Once a fire starts on an object, it will steadily damage that object's durability. If the fire is not extinguished in time, the object will be destroyed entirely. Fire also spreads to nearby flammable objects on the same floor of a building, so a single unattended fire can quickly turn into a much bigger problem.

All wooden furniture items such as beds, chairs, desks, chests, and couches are flammable, as are production machines like kilns, furnaces, and ovens. Buildings with lots of flammable objects packed closely together are especially vulnerable.

##### Extinguishing a Fire
To put out a fire, click on the burning object and select the Extinguish activity through Direct Control. Your Seedling will attempt to put out the flames, but be aware that this is not without risk. If the attempt fails, your Seedling can suffer burn injuries. The more skilled your Seedling is in Fire Safety and Fire Suppression, the better their chances of extinguishing the fire safely and quickly.

You can also set "Extinguish Fires" as an activity priority in the Scheduler. Because fire extinguishing is an emergency priority, Seedlings with this priority will enter buildings for free and access private rooms to fight fires, even in buildings they would not normally be allowed into. This makes it possible for a Seedling to serve as a firefighter across the entire society.

Seedlings do not catch fire themselves, but burn injuries from failed extinguishing attempts can be serious. Minor and moderate burns can be self-treated with a Cooling Gel, while severe burns require another Seedling skilled in Burn Care along with an Advanced Burn Treatment Kit. Make sure your society has burn remedies stocked and ideally a Seedling trained in Burn Care, so you are prepared when fires happen.

##### Fire-Related Skills
Fire-related skills fall under the Emergency Response skill tree. Fire Safety reduces the chance of getting burned while extinguishing fires. Fire Suppression makes your Seedling faster at putting out fires. Burn Care, which falls under First Aid, improves your Seedling's ability to treat burn injuries. Like all skills, these improve through practice, so the more your Seedling fights fires and treats burns, the better they become at it. Skill books for Fire Safety and Fire Suppression are also available if you want to speed up training.

##### Preventing Fires
The best way to deal with fire is to prevent it from happening in the first place. Since fires ignite when a Seedling critically fails on a flammable object, the most effective prevention is to make sure your Seedlings are well-trained in the skills needed to operate those objects. A Seedling skilled in Smelting is far less likely to set the furnace ablaze than a beginner, and the same goes for cooking, masonry, and any other production skill. Level up the relevant skill before assigning a Seedling to work on a flammable machine, and the risk of fire drops significantly.

Beyond training, smart building design goes a long way. Keep flammable machines like kilns, furnaces, and ovens in a separate room or building, away from flammable furniture. Space out your machines so that if one catches fire, it does not immediately spread to the next one. If a fire does break out, act quickly: the longer you wait, the more it spreads and the more you stand to lose. Having a Seedling with Emergency Response skills nearby can make all the difference.

### Ownership vs Access
<!-- keywords: who owns stolen steal -->
In Avesta, “owning” something means you Seedling can edit or transfer ownership of it, like a building or plot you placed. Others won’t be able to change it. But when it comes to movable items (like furnitures, food or tools), it's less about ownership and more about access. If your Seedling has access to a shower facility or a storage container, they can freely use what is in it, even if they don’t “own” it. This becomes important early on, especially when your Seedling is hungry and looking for food: if they can access it, they’ll take it! So if you don't want your things to be consumed by others, make sure they are stored in an inventory that has no public access. Visitors, such as customers and invited guests, can use what is in the rooms open to them. They cannot carry items into or out of the building's containers. That needs full access to the building, for example as its owner, a resident, or through a role that gives access to it.

#### Giving Another Seedling Access
<!-- keywords: grant access share land let friend use my building house plot co-own another seedling enter -->
Who may enter a building is decided by that building, never by society roles: a Seedling gets in if they own or administer it, live there as a resident, hold a job there, or are visiting as a customer or invited guest. A society role's "Seedlings enter and use locations" permission (on the World tab of the role editor) only ever covers locations the society itself administers, so nothing in the society's roles can open a privately owned house or plot to someone. The real ways are:
- **A home or other building you own:** make the Seedling a resident. Select the building, open it in the Properties Panel, and use Invite in the Residents block on its page; the building's owner has the right to manage its residents. Residents have full access, private rooms included. For a building administered by a group this sends a residence invite instead (see Groups).
- **A Business Branch:** hire the Seedling into a job at that branch(May not apply: organization browser enabled.)  from the business's Jobs page in the Organizations window. The job grants access to that one building for its work and to nothing else the business owns. Setting a room to public does not let strangers in either: it only admits customers, guests, and delivery personnel who are already visiting.
- **A plot (the land itself):** there is no per-Seedling grant. Either transfer the plot to that Seedling, or change its owner to a group both Seedlings belong to: group members can build on, farm, and use everything the group administers. Both are done with Change Owner on the plot's page in the Properties Panel.
