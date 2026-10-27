---
schema_version: 1
id: seed-agent-play-pr34377:library/concept-organizations-and-jobs
title: Organizations, roles and jobs
description: This page explains organizations, roles and jobs.
document_type: concept
source_type: developer_reference
source_collection: seed-agent-play-pr34377
source_id: library/concept-organizations-and-jobs
source_url: null
source_path: tools/agent-play-api/library/concept-organizations-and-jobs.md
source_version: null
language: en
category: Developer concepts
topics:
- organizations, roles and jobs
- developer concepts
retrieved_at: null
imported_at: '2026-10-27T15:35:13Z'
verification_status: unverified_reference
content_hash: sha256:352be923e6a0810e94d858ce41798681915a048b25c5620e60f13940d2d9a46e
conflicts_with: []
---

This page explains organizations, roles and jobs.

# Organizations, roles and jobs

## Organizations
- Societies, businesses, departments and groups are legal actors.
- Organizations can hold property and roles.
- Each organization is its own ownership root.
- A seedling can hold roles within an organization.
- Roles grant permissions; they can also carry wages or work schedules.
- A player acts through legal actors and the roles available to them.
- Organization permissions do not mean every society member can act for it.
- Some permissions apply only to organizations, including market trading and employment.

## Find the relationships
- Read `SocietyOrganizations` on a society to inspect its organizations.
- Read `OrganizationRoles` on an organization for roles and holders.
- Read `OrganizationMember` on a member for organization membership data.
- `SocietyRoles` holds society role information.
- `PlayerPermissions` is the player-facing summary of resolved permissions.
- `Employee` and `Employer` hold employment-related state.
- `OrganizationCharter` describes charter state.
- A role permission can be scoped to a particular location, role or department.
- Organizations can hold roles in their society and other charter roles.
- An organization's proxy roles determine which people act on its behalf.

## Commands
- `OrganizationRoles.assign_role` and `unassign_role` change assignments.
- `OrganizationInvitations.create_invitation` proposes an invitation.
- `accept_invitation` and `decline_invitation` respond to one.
- `create_application` and `withdraw_application` manage an application.
- `accept_application` and `decline_application` respond to applications.
- `leave_organization` leaves an organization.
- `Employer.leave_job` and `switch_job` affect jobs.
- `Employee.set_default_job` and `remove_default_job` affect the default job.
- `Voting.cast_vote` and `cast_character_vote` are voting commands.
- Target the entity carrying the named component and inspect the request schema.

## Work and authority
- An employer can define a job role's shift location and priorities.
- A job shift is part of the seedling's schedule.
- The player can see employer-defined job priorities but cannot edit them there.
- Role assignment requires the relevant permission and may be role-scoped.
- A business can employ and host paid services; a department can employ.
- A group has more limited default capabilities.
- Permission checks use the relevant legal actor and society.
- When an action fails, inspect the role holder, scope, subject and administrator.
