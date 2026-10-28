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
  `git push origin HEAD:main`. This does not require switching or modifying a
  separate checkout of `main`. If the remote advances and rejects the push,
  fetch, integrate, revalidate as needed, and retry. Never force-push `main`.
- Preserve unrelated local changes and commits. Do not reset, stash, include,
  or publish someone else's unfinished work just to make a push succeed.
- Confirm the remote contains the shipped commit and report its SHA. Treat
  deployment as a separate step: a successful push does not prove deployment.
