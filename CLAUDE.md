# Claude Operating Rules For CentrLP

These rules are mandatory.

## Work Location

- Main work happens in `G:\mvp\centrlp`.
- Production at `/var/www/centrlp` is deploy-only.
- Do not treat production as the primary working copy.

## Git Hygiene

- Always inspect `git status` before starting.
- Always inspect `git stash list` before finishing.
- If the repo is dirty at the beginning, tell the user immediately.
- Do not leave a session with local uncommitted changes unless the user explicitly pauses the task and accepts that state.
- Do not leave forgotten stash entries behind.

## Production Hygiene

- Do not make a production-only fix and walk away.
- If a hotfix was applied on production, it must be copied back into the local repo, committed, and pushed in the same session.
- Production and local must end on the same commit.

## Deploy Rule

Correct sequence:

1. change locally
2. commit locally
3. push to `origin`
4. deploy or fast-forward production to the same commit
5. verify live URLs

## Public Copy Rule

- Never put internal working notes, private discussion, outreach reasoning, or “why this page works for our sales process” into site content.

## Final Message Rule

The final message must always include:

- what changed
- committed locally or not
- pushed to `origin` or not
- local git clean or not
- production git clean or not
