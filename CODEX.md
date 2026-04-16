# Codex Operating Rules For CentrLP

These rules are mandatory for every Codex session.

## Primary Repository

- Primary worktree: `G:\mvp\centrlp`
- Primary remote: `origin`
- Production deploy target: `/var/www/centrlp`

## Never End Dirty

Do not finish a session while any of the following is true:

- local `git status` is dirty
- production `git status` is dirty
- `git stash list` is non-empty and not explicitly resolved
- production has manual edits that are missing from the local repository

## If A Repo Is Already Dirty

- check `git status` first
- tell the user immediately
- do not silently build new work on top of hidden dirt

## Hotfix Rule

If a production hotfix happens:

1. move the change back into local immediately
2. commit it in git
3. push it to `origin`
4. align production to that commit in the same session

## Production Rule

- Production is not the primary editor workspace.
- Use it only as a deploy target and verification target.
- Avoid manual production edits unless recovery is impossible otherwise.

## Required Final Report

Every final report must explicitly say:

- what changed
- whether local commits were created
- whether `origin` was updated
- whether local git is clean
- whether production git is clean
