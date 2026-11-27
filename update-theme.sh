#!/usr/bin/env bash
# Update the LoveIt theme safely, on a separate branch.
#
# Usage:  ./update-theme.sh [ref]
#   ref = a LoveIt tag, branch or commit (default: origin/master)
#
# Runs on macOS/Linux, and on Windows from "Git Bash" (installed with Git).
# It never touches master and never pushes: it creates a branch
# "theme-update/<sha>", commits the new theme version and checks that the
# site still builds. Then you push the branch and review the Netlify deploy
# preview before merging.
set -euo pipefail

REF="${1:-origin/master}"
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree has uncommitted changes: commit or stash them first." >&2
  exit 1
fi
command -v hugo >/dev/null || { echo "hugo not found in PATH." >&2; exit 1; }

git submodule update --init themes/LoveIt
OLD="$(git -C themes/LoveIt rev-parse --short HEAD)"
git -C themes/LoveIt fetch --tags origin
git -C themes/LoveIt checkout --quiet "$REF"
NEW="$(git -C themes/LoveIt rev-parse --short HEAD)"

if [ "$OLD" = "$NEW" ]; then
  echo "Theme already at $NEW, nothing to do."
  exit 0
fi

BRANCH="theme-update/$NEW"
git switch -c "$BRANCH"
git add themes/LoveIt
git commit -m "chore: update LoveIt theme $OLD -> $NEW"

echo "Checking that the site builds..."
OUT="$(mktemp -d)"
if hugo --gc --minify -d "$OUT" 2>&1 | tee "$OUT.log" | grep -E "WARN|ERROR"; then
  echo "Build printed warnings/errors (see above). Review before pushing." >&2
fi
rm -rf "$OUT"

cat <<EOF

Theme updated $OLD -> $NEW on branch $BRANCH.
Next steps:
  git push -u origin $BRANCH      # Netlify builds a deploy preview
  # open the preview, check home, /posts/, /analogs/, /projects/, /about/
  # then open a pull request and merge it if everything looks right.
To undo locally:  git switch - && git branch -D $BRANCH && git submodule update
EOF
