# Repository workflow

- Commit frequently: make a small, descriptive commit after each coherent,
  validated change. Do not leave all completed work uncommitted until the end
  of a long session. Stage only files belonging to the task.
- For now, shipping means pushing directly to `origin/main`; a pull request is
  not required unless the user requests one. A push to a feature branch alone
  does not finish a shipping request.
- Before shipping, fetch `origin` and merge the latest `origin/main` into the
  working branch if needed. Preserve both sets of changes, resolve conflicts,
  and run checks appropriate to the integrated change before pushing.
- From a worktree or feature branch, push the validated commit with
  `git push origin HEAD:main`. If the remote advances and rejects the push,
  fetch, integrate, revalidate as needed, and retry. Never force-push `main`.
- Publishing also requires updating the primary (root) checkout's local `main`;
  a successful remote push alone does not finish the publishing workflow. Find
  the primary checkout with `git worktree list --porcelain`; do not assume the
  current linked worktree is the root. Apply this rule separately to each repo
  being published.
- After pushing, fetch `origin` and, with a clean primary checkout on `main` and
  no Git operation in progress, run `git -C <root> merge --ff-only origin/main`.
  Verify that the shipped commit is an ancestor of both `origin/main` and local
  `main`, and that the root checkout is current with the fetched `origin/main`.
  Report the root-main synchronization result alongside the published SHA.
- If the root checkout has local changes, an active merge/rebase, a different
  branch checked out, or divergent commits, preserve that work. Do not reset,
  force-update a checked-out branch, silently stash changes, or finish another
  task's Git operation. Report root-main synchronization as blocked/incomplete
  with the specific reason; do not silently leave the root behind or describe
  the whole publishing workflow as complete. Integrate divergent commits only
  when they belong to the authorized release, with appropriate validation.
- Preserve unrelated local changes and commits. Do not reset, stash, include,
  or publish someone else's unfinished work just to make a push succeed.
- Confirm the remote contains the shipped commit and report its SHA. Treat
  deployment as a separate step: a successful push does not prove deployment.
