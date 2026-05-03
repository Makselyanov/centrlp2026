# CentrLP Session Rules

These rules are mandatory for every future session in this repository.

## Portfolio Completion Protocol

Also follow `G:\mvp\AGENTS.md`. CentrLP already uses the strict rule: local edit, commit, push, deploy, verify. Keep that as the default for all site/product work unless the user explicitly asks for a draft-only session.

Every final report must say whether the work is committed, pushed, deployed, whether local git is clean, and whether production git is clean when production was touched.

## Public Content Boundary

Public CentrLP pages, landing sections, blog/SEO pages, legal pages, meta tags,
sitemap entries, JSON-LD, RSS, OpenGraph text, and any user-facing artifact must
never contain agent/user meta-dialogue.

Forbidden in public content: `здесь будут`, `потом добавим`, `надо придумать`,
`мы обсудили`, `в диалоге`, `черновик`, `план`, `структура будет`, `Codex`,
`Claude`, `агент`, `implementation plan`, `TODO`, `draft`, `placeholder`,
`handoff`, internal reasoning, prompts, commit/deploy notes, or task lists.

All public text must be finished product/editorial/legal copy for an external
reader. Internal planning belongs only in internal docs, plans, handoff files,
or issues that are not included in the publish artifact. Before publish or
deploy, read the rendered artifact and stop if it contains meta markers,
future-structure language, or placeholders disguised as copy.

## Canonical Paths

- Local working copy: `G:\mvp\centrlp`
- Bare git remote: `ssh://root@90.156.168.115/home/deploy/git/centrlp.git`
- Production working tree: `/var/www/centrlp`
- Production site: `https://centrlp.ru/`

## Source Of Truth

- The local repository is the primary place for editing.
- Production is a deploy target, not the main place for editing.
- GitHub is not the primary deployment remote for this project.

## Mandatory Start-Of-Session Checks

Before any work:

1. Run `git status`.
2. Run `git stash list`.
3. If the repository is already dirty, explicitly tell the user before making new changes.
4. If production was edited directly before, bring those changes back into the local repository in the same session.

## Mandatory End-Of-Session Rules

You must not end a session with:

- a dirty local `git status`
- a dirty production `git status`
- forgotten `git stash` entries
- production-only code or content changes that are not committed in git

If there was a production hotfix:

1. copy it back into the local repository immediately
2. commit it in the same session
3. push it to the main remote
4. verify production runs from that committed state

## Deployment Discipline

- Edit locally first.
- Commit locally.
- Push to `origin`.
- Update production to the exact same commit.
- Verify important URLs after deploy.
- Never expose internal discussion, prompt logic, outreach strategy, or private operator notes in user-facing site copy.

Do not leave the site in a state where:

- local and production differ by uncommitted edits
- production works only because of manual file uploads outside git
- someone has to remember a stash or a tar archive to reconstruct the current state

## Final Report Requirements

Every final session report must state:

- what changed
- whether it was committed locally
- whether it was pushed to `origin`
- whether local git is clean
- whether production git is clean
