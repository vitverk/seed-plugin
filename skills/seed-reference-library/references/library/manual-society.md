---
schema_version: 1
id: seed-agent-play-pr34377:library/manual-society
title: Society
description: This section covers society.
document_type: manual
source_type: in_game_manual
source_collection: seed-agent-play-pr34377
source_id: library/manual-society
source_url: null
source_path: tools/agent-play-api/library/manual-society.md
source_version: null
language: en
category: In-game manual
topics:
- society
- in-game manual
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:ab431614703b9e337aa370788c69658f05b6f337de051163c1f5c69ed7521412
conflicts_with: []
---

This section covers society.

## Society

*Society governance: organizations, goals and tiers, ballots, finance, policies, roles, permissions, constitution, departments.*
This section covers everything available to the government of a society. (May not apply: organization browser enabled.) Society management lives in the Organizations window from the right sidebar: your society has its own page there, with a section for each tool below. (Alternative; may not apply.) It is managed in the Societies Panel from the right sidebar.
Societies are collaborative spaces where Seedlings live, work, and shape experimental civilizations. Society is governed and managed through roles and permissions. You can find the available roles and their permissions in (May not apply: organization browser enabled.) your society's Roles section in the Organizations window (Alternative; may not apply.) the Societies Panel > Roles tab. Players can join existing societies through migration or found a new society by gathering a group of [world-dependent value: min lobby size] Cultivators. A society can advance through completing society goals.

### Organizations
*The four organization types - societies, businesses, departments, groups - and their shared roles system.*
There are four types of organizations in SEED, and they all share the same system of roles and permissions:
- **Societies** - the overarching organization that Seedlings belong to and govern together, with elected and appointed government roles.
- **Businesses** - player-owned companies that can employ Seedlings and manage production and trade.
- **Departments** - sub-organizations within a society (e.g. Ministry of Urban Planning) that handle specific government functions. See the Departments section for details.
- **Groups** - player-formed groups for shared living and resources.

Each organization type can have its own roles, and each role grants a specific set of permissions. All four organization types hold their own wallet and can own and rent buildings or plots. Beyond that, what an organization may do depends on the rights its society grants it by default: the society, businesses and departments may employ Seedlings, a business, department, or the society itself may trade on the Market directly on a building it owns, and only a business may run a service location. A group holds neither the right to employ nor the right to trade, so a group cannot hire Seedlings and a group's sales still need to go through a Seedling-owned Business. Only Seedlings can own a business - societies, departments, and groups cannot become one.

Both Seedlings and other organizations (like businesses) can hold roles within an organization. For example, a business can hold a role in a society, and the business’s employees inherit those permissions when acting on behalf of the business. This is how businesses gain the right to own property, build on plots, or trade in a society - the society grants those permissions to the business through its roles.

Societies and departments are governed through fully editable roles and permissions. Businesses and groups come with a fixed core instead: an Owner (or Group Head) plus jobs or members(May not apply: organization browser enabled.) , though a business owner or group head can add custom roles on the organization's Roles page, including roles filled by invitation. A business also has a Partner role (see Business Partners).

### Society Overview
<!-- keywords: change name rename society -->
*The Overview tab: society stats, goals in progress, and renaming your society.*
Found in (May not apply: organization browser enabled.) your society's page in the Organizations window, the Overview section (Alternative; may not apply.) the Societies Panel, the Overview tab lets you view information on your own as well as all the other societies in the world and see how well they are doing financially, politically and socially. For more information, open it up and have a look yourself! The overview tab is also where you can see Society Goals in progress. You can also rename a society here if you have the right governor role and permissions to do so.

### Population Limits
*Everything that stops a society accepting new Seedlings: tier capacity, the Population Cap, and claimable plots.*
Beyond the population capacity a society unlocks through its tier, a society can set its own **Population Cap**: the total number of Seedlings it accepts. It is set in the (May not apply: organization browser enabled.) society's Overview section in the Organizations window (Alternative; may not apply.) Societies Panel > Overview tab, under Edit Details, by a Cultivator whose Seedling holds a role with the Edit population cap permission, and appears once the society has left the Expedition tier. The cap can be set at or below the tier capacity, never above it. Once the society reaches it, no new Seedlings can join until it is raised or removed.

A society with no cap set is limited by its tier capacity instead.

From the Camp tier onward a society also needs one free claimable plot per newcomer: with none left it cannot be joined and stops being suggested. Its Claimable Plots figure is the plots set as claimable minus the members yet to claim one, a hold that expires after 5 real-world days. That figure only counts Seedlings arriving from elsewhere. A Seedling who grew up from an infant born in the society gets no claim tent and never counts towards it.

### Society Goals & Tiers
<!-- keywords: unlock progress tier donate pollen -->
*How societies advance through eleven tiers by completing collective Society Goals.*
Your society’s development is guided by a structured progression system that helps focus your efforts on what matters most. You progress through tiers by completing Society Goals: collective objectives that all members of a society work towards together. Goals start with essential survival needs before advancing to more complex systems like governance and trade. More advanced game features, such as government types and voting, are unlocked as your society advances through tiers.

Each tier has a set of goals that must all be completed to advance to the next tier. Goals are tracked automatically: once a goal’s requirements are met, it is marked as complete. When all goals for the current tier are finished, the society automatically advances to the next tier, unlocking new capabilities, governance roles, permissions, and increased population capacity.

There are eleven tiers. The first is Expedition and the last is Large Town II. The Society Tiers section lists every tier in order, with each tier's Seedling capacity and goals.

### Ballots
<!-- keywords: vote election political -->
*Proposing and voting on ballots to change policies, laws, and the constitution.*
Ballots are a core feature of democratic governance in SEED. Cultivators that have Seedlings within the government can propose ballots to change policies or remove existing laws (depending on the current constitution). A constitution change is the exception: any member of the society can propose one, under the conditions described in the Constitution section. Once a law or policy is proposed, the Seedlings whose role lets them vote on laws vote on it. In a society without a constitution, that is every Adult and the Legislators, from the Small Town II tier on. Results depend on the current constitution’s rules. Ballots enable societies to evolve.
(May not apply: limit player voting power enabled.)

#### Vote Allowance
<!-- keywords: max votes voting limit cap how many votes multiple seedlings -->
*How many votes a single Cultivator can cast in any one voting process.*
Each Seedling carries its own vote, so a Cultivator with many Seedlings would otherwise decide a society's ballots alone. To prevent that, every Cultivator has a vote allowance: on any one voting process they cast at most [world-dependent value: min max votes per player] votes, or [world-dependent value: max votes population percentage]% of the society's current population if that is more (rounded up). The allowance grows as the society grows, and it is a fixed rule of the game — society leaders cannot change it.

If a Cultivator has more eligible Seedlings than their allowance, the extra Seedlings simply do not vote on that ballot. Nothing stops a Cultivator from having as many Seedlings as they like; only their voting weight is bounded. The allowance applies to every voting process, including elections, law and policy ballots, banishment votes, constitution change votes, and the confidence vote.


### Society Finance
<!-- keywords: transfer pollen government wallet -->
*The society's government wallet for wages, construction, and trade.*
Each society has a ‘government’ Wallet used to pay wages, fund construction, and manage trade. This Wallet works like any other and can send and receive SeedCoins. To see its balance and transactions, you need the See finances permission. The default member roles of a society have it. To spend its funds, you need the Spend money permission. To transfer them, you need the Transfer money permission. Transparency and budgeting are critical to prevent depletion.

### Society Policies
<!-- keywords: income tax rate vat sales tax charge extra import tax export tax business tax land tax property tax high balance tax wealth tax low balance assistance welfare minimum wage default laws money taken by society -->
*How to use policies to steer your society with automatic rewards, and the built-in taxes, benefits and minimum wage every society has.*
Policies let your society reward what it wants more of. Reward births to grow the population. Reward new arrivals to welcome Seedlings who join. Reward skill level-ups to build a skilled workforce. Reward placing objects or producing items to grow building and trade.
When its event happens, a policy pays SeedCoin, gives items, or hands out a role. A role can't be the reward for placing an object or producing an item.
A Seedling in the government with the right permission proposes a policy. It starts once the Ballot passes. A policy can end after a set number of uses, and a Ballot can remove it.

Every society also starts with built-in policies. They are listed in (May not apply: organization browser enabled.) the Policies section of your society in the Organizations window (Alternative; may not apply.) the Policies tab of the Societies Panel. Each one starts at zero, so it has no effect until the society changes it. Changing or removing one opens a Ballot. Each society sets its own rates and amounts. For the current values, check your society's Policies.
- **Income tax**: a share of every wage goes from the employee's wallet to the society wallet.
- **VAT**: a share of a purchase, paid by the buyer to the society. It is set per item category, not as one rate for everything, using the same category tree used elsewhere in the game. A rate on a broad category covers everything beneath it, unless a narrower category sets its own. VAT is added to the buyer's total at purchase, so it is one reason a purchase costs more than the listed price.
- **Import Tax**: when a buyer buys from a player in another society, the buyer pays a share of the trade to the buyer's society. The rate is set per item or category.
- **Export Tax**: when a seller sells to a player in another society, the seller pays a share of the trade to the seller's society. The rate is set per item or category.
- Import Tax and Export Tax never apply to trades with Seed Industries.
- **Minimum Wage**: if an employer pays a wage below the minimum set per tau, the employer also pays the employee the difference.

These run once at the start of every Avestan year (24 taus):
- **Business Tax**: businesses pay a share of their wallet balance above a set threshold to the society. Only the part above the threshold is taxed.
- **Land Tax**: the chosen payers (Seedlings, organizations, or both) pay a set amount to the society for every 16 m² of land they own, after a free allowance. The owner of the land pays it. A tenant renting a building does not.
- **High Balance Tax**: Seedlings with more than a set amount in their wallet pay a fixed tax to the society.
- **Low Balance Assistance**: Seedlings with less than a set amount in their wallet receive a fixed payment from the society wallet. Organizations never receive it.

### Roles
*What roles are, how they grant permissions, how they are assigned, and how to create them.*
Roles define what Seedlings and organizations are allowed to do. Every role carries a set of permissions, such as managing buildings or spending funds, and a set of rights, such as voting on laws or owning property. The permissions a Seedling has depend on which roles they hold. Roles exist on all organization types, not just societies - businesses, departments, and groups all have their own roles too.

A society has no owner. It is led by an elected leader role instead. The leader is the "Camp Manager" from the Camp tier and is renamed "Mayor" from the Adv. Camp tier. A Seedling becomes Camp Manager or Mayor by winning the leader election. After the society adopts a constitution, the leader is the role that constitution names, such as President or Prime Minister. Anarchy has no leader.

Some roles also change name as a society advances. What each built-in role does, and which roles a society has at each tier, are listed in the Built-in Society Roles and Society Tier Progression sections.

Societies and departments can also create **custom roles** with a chosen set of permissions tailored to their needs. For example, a society could create a "Warehouse Manager" role that only grants access to storage and delivery settings.(May not apply: organization browser enabled.)  A business owner or group head can do the same for their own organization from its Roles page. Roles can also include compensation (wages) and work schedules. A wage is paid per shift, so only a role with a schedule can have one. A society can create custom roles from the Camp tier on (see Creating a Role).

#### Jobs and Roles
Jobs and roles are the same thing: a job is a role that has a schedule. Both carry a name and permissions, both can carry a wage and a schedule, and hiring for a job is assigning its role. The difference is what they are for and where you manage them:
- **Roles** ((May not apply: organization browser enabled.) the organization's Roles page in the Organizations window (Alternative; may not apply.) Societies Panel > Roles tab): governance and organizational positions (May not apply: organization browser enabled.) on any organization (Alternative; may not apply.) on societies and departments. Assigned via election, appointment, or invitation (an offer the Seedling accepts or declines). Configured with a name, description, icon, number of available slots - and the permissions the role grants.
- **Jobs** ((May not apply: organization browser enabled.) any organization's Roles page, which a business calls its Jobs page (Alternative; may not apply.) the branch's Employment tab in the Business Panel): (May not apply: organization browser enabled.) employment at a workplace, on a society, a department or a business. Filled by hiring (Seedlings apply through the Jobs app and the reviewing role accepts or rejects them) or by joining (the first qualified Seedling who asks gets the job at once, with no review). Configured with a job title, wage, shift hours, workplace, number of positions, activity priorities (the tasks), optionally required skills, and the permissions the job grants, which you can edit like any role's. (Alternative; may not apply.) employment at a specific Business Branch. Seedlings apply through the Jobs app and the employer accepts or rejects them. With Quick Hire on, the first qualified Seedling who applies gets the job at once, with no review. Configured with a job title, wage, shift hours, number of positions, activity priorities (the tasks), and optionally required skills.

Roles are assigned in (May not apply: organization browser enabled.) five (Alternative; may not apply.) four ways:

#### Elected Roles
Elected roles are filled through **periodic elections** where Seedlings vote for candidates. When creating an elected role, you configure:
- **Voters** ("by"): the holders of one role (e.g., all Adults), or any member of the organization
- **Candidates** ("among"): the holders of one role (e.g., also Adults), any member, or any Seedling
- **Frequency**: how often elections occur (1-24 hours or 1-24 days)

The voters of an election cannot be a role with only one slot. A Seedling must have the "Hold roles" right to stand as a candidate.

When an election starts, it appears in the (May not apply: organization browser enabled.) organization's Ballots section (Alternative; may not apply.) Ballots tab and as a notification. Eligible candidates can register during the election. Eligible voters cast their votes for their preferred candidate. Each of your eligible Seedlings gets one vote, so if you have multiple eligible Seedlings, you can cast multiple votes(May not apply: limit player voting power enabled.) , up to your vote allowance (see the Vote Allowance section under Ballots). You can also choose to abstain.

When the election ends, the candidate(s) with the most votes win and are assigned to the role. Elections are available for (May not apply: organization browser enabled.) any organization where you can create roles (Alternative; may not apply.) societies and departments.

An elected role can have a schedule. An elected role with a schedule works like a job. A Seedling with an overlapping shift in another job cannot register as a candidate. The winner gets the role's shift in their schedule. The Seedling cannot resign from the role. They also do not leave it for another job on their own. The role ends for them when they are voted out, when the role is removed, or when they die. You cannot remove the schedule from an elected role. Remove the role instead. If the organization loses the workplace, the shift moves to Anywhere. The Seedling keeps the role.

#### Appointed Roles
Appointed roles are assigned directly by a holder of another role. When creating an appointed role, you configure:
- **Appointer** ("by"): the holders of one role (e.g., the Mayor), or any member of the organization
- **Appointees** ("among"): the holders of another role, any member, or any Seedling

The appointer can assign and unassign Seedlings at any time through the (May not apply: organization browser enabled.) Roles page. The "+" on the role card shows only to the appointer (Alternative; may not apply.) Roles tab. Only the appointer can unassign an appointed role. A Cultivator can also take their own Seedling out of it. A Seedling must have the "Hold roles" right (the Adult role holds it) to be appointed. If the role has limited slots (e.g., only 1 Treasurer), you must unassign the current holder before assigning someone new.

#### Invited Roles (Offers)
<!-- keywords: offer role invite into role partner keyholder offered accept decline -->
A role can be filled by invitation: it is offered to a Seedling, who accepts or declines before ever holding it. When creating such a role you pick the inviting role ("by") and who may be offered it ("among"). Only the inviting role's holders may offer it. An invited role cannot be assigned directly, the same way an elected role cannot. Accepting follows the same rules as any role handover. An unanswered offer expires. The inbox shows when.(May not apply: organization browser enabled.)  Offers are made in the Organizations window with the envelope button on the role's card on the Roles page. The dialog shows the seats taken and who may be offered the role. The offered Seedling answers from the inbox, and offers you sent wait in its Outbox tab, where they can be withdrawn.
(May not apply: organization browser enabled.) This is also how a business can be joined without a job: the Owner offers the Partner role (see Business Partners), or creates a custom role filled by invitation and offers that.

#### Hired Roles (Jobs)
Hired roles are filled through **job postings** that Seedlings apply to via the Jobs app on their mobile device. (May not apply: organization browser enabled.) When creating such a role you pick the reviewing role ("by") and who may apply ("among"). The reviewers accept or reject each application. A role with a schedule is a job. Only the society, departments and businesses can fill roles by hiring or joining. (Alternative; may not apply.) The employer accepts or rejects each application. When Quick Hire is on, the first qualified Seedling who applies gets the job at once, with no review.
(May not apply: organization browser enabled.)
#### Roles a Seedling can join
A role that Seedlings can join goes to the first eligible Seedling who asks for it, with no review: when creating it you pick who may join ("among"). A job of this kind is taken the moment a qualified Seedling joins through the Jobs app.


#### The Criminal Role
<!-- keywords: criminal punished punishment crime missed rent unpaid wages how long expire ends lost roles -->
*How a Seedling becomes a Criminal, what it loses, and when it ends.*
Criminal is the society's punishment role. A failed payment can make a Seedling a Criminal automatically, for example:
- The Seedling rents a building with their own wallet and cannot pay the daily rent.
- A business cannot pay an employee's wage or severance. A Seedling who can create jobs there, usually the owner, becomes the Criminal.

When the game makes a Seedling a Criminal, they lose all their other society roles. The Criminal role then ends on its own after about one real-time day. Each new failed payment starts that time again. Afterwards the Seedling gets the Adult role back. Other society roles they held before, such as an elected office, do not come back.

Elected Judges can also give a Seedling the Criminal role (see Built-in Society Roles). That does not remove their other roles. It lasts until someone allowed to remove it does so.

#### Creating a Role
<!-- keywords: custom role make new role which tier when -->
Custom roles with hand-picked permissions exist on societies and departments(May not apply: organization browser enabled.) , and a business owner or group head can create them on their own organization too.

A society can create custom roles from the Camp tier on. Only a Seedling whose role lets it create roles can make one. By default that is the society's leader, the Camp Manager, later called the Mayor. A custom role can only grant permissions its creator already holds. The built-in roles themselves cannot be edited or deleted. A society that wants different rights creates a custom role instead.

To create one:
1. Open (May not apply: organization browser enabled.) the organization's Roles page in the Organizations window (Alternative; may not apply.) the Societies Panel > Roles tab (for a department's roles, select the department in the list on the left first)
2. Click (May not apply: organization browser enabled.) "New" (Alternative; may not apply.) "New Role"
3. Main Details: set the icon, name and description. Optionally set an amount in "Pays". A role that pays needs a schedule. Setting an amount adds one.
4. Assignment: choose the assignment method - **Elected**: select the voter role ("by"), the candidate role ("among"), and the election frequency. **Appointed**: select the appointer role and optionally the role appointees must already hold. **Invited**: select the role whose holders may offer it, and who may be offered it.(May not apply: organization browser enabled.)  **Hired**: select the reviewing role ("by") and who may apply ("among"). **Joined**: select who may join ("among"). Then set the number of available slots (or unlimited)
5. Schedule: optionally click "Add Schedule" to give the role working hours: work days, shift times, a work location, and activity priorities.(May not apply: organization browser enabled.)  A role with a schedule is a job.
6. Required Skills: optionally add up to three skills a Seedling needs first
7. Permissions: choose what holders of this role can do

Click Next to move to the following step. The Create button turns on once the required steps are done. When you edit a role, click any step at the top to open it.
(May not apply: !organization browser enabled.) Businesses and groups offer no role creation: a business is run through its jobs (see Creating a Job), and a group's two roles are fixed.

#### Creating a Job
(May not apply: organization browser enabled.) A job is a role with a schedule, so the society, a department or a business creates one in its role editor (see Creating a Role: add a schedule, and choose Hired or Joined so that Seedlings can apply or join). A Business Branch also offers a shortcut: (Alternative; may not apply.) To create a new job:
(May not apply: organization browser enabled.) 1. Open the business's Jobs page in the Organizations window
2. Click "Add" next to the branch's heading, then a starting point such as Hired Job (Alternative; may not apply.) 1. Open the Business Branch's Employment tab in the Business Panel
2. Click "New Job"
3. Main Details: set the icon, name and description, and the amount in "Pays"
4. Assignment: (May not apply: organization browser enabled.) choose how the job is filled. **Hired**: you review each applicant. **Joined**: the first qualified applicant gets the job at once, with no review. Then set the number of job slots (Alternative; may not apply.) set the number of job slots, and optionally turn on Quick Hire: the first qualified applicant gets the job at once, with no review. Quick Hire cannot be turned on while applications are waiting for review
5. Schedule: set the work days, and the shift start and end times - the workplace starts as the branch. Then set the activity priorities: the tasks the employee should perform, in order
6. Required Skills: optionally add up to three

(May not apply: organization browser enabled.) "New" in the toolbar offers the same job starting points. You then pick the workplace in the role editor. The job posting becomes visible in the Jobs app for Seedlings to apply to(May not apply: organization browser enabled.) , and on the organization's Jobs page in the Organizations window. (May not apply: organization browser enabled.) Applications arrive in the Inbox of the Organizations window, not in a building's Inbox. Click Hire or Reject on each application. The inbox button on the job card shows how many applications are waiting and opens that Inbox. A job's permissions can be edited like any role's, in the role editor. (Alternative; may not apply.) Applications arrive on the job card.

(May not apply: organization browser enabled.) Every organization's roles - jobs included - are listed on its Roles page in the Organizations window, grouped by workplace. (Alternative; may not apply.) Society and department roles are viewed and managed in the Societies Panel > Roles tab, and a business's jobs in its Employment tab. There is no separate "Roles" screen for businesses or groups.

### Permissions
<!-- keywords: transfer ownership allowed -->
*How permissions gate actions, why roles grant them, and ownership requirements.*
Permissions control what actions a Seedling or organization can perform. They are always granted through roles - if a Seedling holds a role that includes a specific permission, they can perform that action.

Some permissions are marked as requiring ownership. For example, you can only sell or transfer a building if the organization you're acting through actually owns it - having a role with the "Transfer buildings and plots" permission is not enough on its own. This means owning a property automatically gives you certain management rights like construction and selling, but other permissions like editing security or managing residents can be added to roles without needing ownership.

You can check which permissions a role grants (May not apply: organization browser enabled.) on the organization's Roles page in the Organizations window (Alternative; may not apply.) in the Societies Panel > Roles tab - only society and department roles have editable permissions; a job's or a group role's permissions are fixed by the game.

In the role editor, the permissions are sorted into tabs. Menus holds what the role lets you do in the game's windows, with one card per window, such as Properties, Land Planner and Organizations. World holds what Seedlings with the role do in the world itself: "Seedlings enter and use locations" and "Seedlings use vehicles". Society holds the permissions for running the society. Only the society's own roles have this tab. Point at a permission to read what it does. You can only add a permission that you hold yourself.

### Constitution
<!-- keywords: political system government anarchist anarchy -->
*Governance types a society can adopt and how to change the constitution.*
The constitution defines the type of governance in your society. It sets the foundation for decision-making, voting, and role assignments. A newly founded society starts on the Basic Charter: a minimal structure with no government roles, where Adults hold the basic permissions and further roles unlock through tier progression. Adopting a formal constitution unlocks only once your society has completed every tier, up to and including Large Town II, the last one; until then the society keeps running under those default starting roles (see the Roles section). Each constitution type provides its own set of government roles. From then on any member of the society can propose a constitution change vote, but only while confidence in the leadership has fallen low enough (see the Confidence Vote section); all available governance types are then put to a vote. The winning constitution clears every government role, also when it is the current one. Each Seedling keeps their Minor, Criminal or adult role, such as Citizen or Subject. Every elected role goes to a new election. Appointed roles stay empty until someone appoints a new holder. You can view your society's current constitution under [Constitution].

#### Confidence Vote
<!-- keywords: unhappy leader approval recall remove mayor change constitution -->
*Voting confidence in the leadership up or down, and what low confidence triggers.*
Alongside ballots, a society tracks how much confidence its members have in the current constitution and leadership. In the (May not apply: organization browser enabled.) society's Constitution section in the Organizations window (Alternative; may not apply.) Societies Panel > Constitution tab each Cultivator can vote their confidence up or down, then waits out a cooldown before voting again. A Cultivator's confidence vote weighs more the more Seedlings they have in the society(May not apply: limit player voting power enabled.) , bounded by the same vote allowance that bounds ballots.

If confidence falls low enough, the society acts on it: below the top tier the leader is recalled and a new election starts, and at the top tier it unlocks proposing a constitution change vote.

### Departments
*Creating and managing society sub-organizations with their own wallets, roles, and property.*
Departments become available once a society role holds the Found organizations permission for departments. By default, the society's leader gets it once the society has completed every tier. The leader roles of a constitution, such as the President or the Prime Minister, hold it too. Its holders can also close a department. Role management inside a department follows the specific role permissions described below.

Departments are sub-organizations within a society, each with its own wallet, roles, and the ability to own property. They're useful for delegating specific responsibilities to different groups of Seedlings.

(May not apply: organization browser enabled.) To create a department, open the Organizations window, click the plus tile (New Organization) at the bottom left of the Organizations window and pick "Department". Enter the department's Name. Under Founding role, pick its Holder from your Seedlings and enter a Role name. Role description and Role positions are optional. (Alternative; may not apply.) To create a department, select your society in the Societies Panel and click "Create Department" in the list on the left. You'll need to enter a department name and define a Leader Role (with a name and number of leader positions), and assign one of your own Seedlings as the initial leader. (May not apply: organization browser enabled.) The founding role (Alternative; may not apply.) The Leader Role is created automatically and grants full permission to manage all other roles within the department.

Departments can own buildings and hold funds independently from the parent society. A society can have up to 10 departments. A society role that holds a role-management permission (create, edit, delete, or assign roles) can use that permission in the departments the society owns, too. When nobody holds a department's founding role, for example after its holder dies, a society role that may assign roles fills it with the + on the role card. A department is deleted (May not apply: organization browser enabled.) with Disband in the More menu (⋮) on its Overview in the Organizations window (Alternative; may not apply.) with "Delete Department" in the same left-hand list, again needing the department-management right. Deleting a department returns its funds to the parent society, but a department that owns or rents buildings cannot be deleted until it has handed them over.
