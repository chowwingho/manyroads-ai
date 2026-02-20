# Contributing

This project uses **GitHub Flow** — a simple, branch-based workflow.

## How It Works

1. **`main` is always deployable.** Vercel auto-deploys from `main`.
2. **All work happens in feature branches** off `main`.
3. **Open a Pull Request** when ready for review.
4. **Squash merge** to keep `main` history clean.
5. **Delete the branch** after merging.

## Branch Naming

Use descriptive prefixes:

- `feature/description` — new functionality (e.g., `feature/assessment-tool`)
- `fix/description` — bug fixes (e.g., `fix/footer-contrast`)
- `chore/description` — maintenance (e.g., `chore/dependency-update`)

## Guidelines

- Keep branches short-lived — ideally merged within a few days.
- Run `npm run build` before pushing — don't break `main`.
- PRs need at least one approval before merging.
- Write clear PR descriptions: what changed, why, and how to verify.

## Branch Protection

Repo admins should configure these rules on `main` in GitHub Settings > Branches:

- Require pull request reviews before merging
- Require status checks to pass (Vercel build)
- No direct pushes to `main`

> **Note:** Branch protection rules are configured in GitHub's web UI, not via git CLI.
