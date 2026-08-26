#!/usr/bin/env bash
# Деплой сайта на GitHub Pages: https://vikahramovich02-collab.github.io/mary-site/
#
# Pages отдаёт проект из подпапки /mary-site/, поэтому собираем с этим base.
# Vite сам дописывает префикс только своим ассетам (js, css, шрифты, url() в css);
# пути вида /media/… и /?page=… лежат в коде обычными строками, поэтому после
# сборки дописываем префикс всем строкам-путям в бандле.
#
# Запуск: bash scripts/deploy-gh-pages.sh
set -euo pipefail

BASE="/mary-site/"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npx vite build --base="$BASE"

# В минифицированном бандле пути лежат строками в бэктиках: `/media/x.png`,
# `/?page=blog`, `/#contact`, `/`. Префикс дописываем только им — вслепую по
# любому «`/» нельзя, под раздачу попадают куски регулярок вроде `/$`.
perl -pi -e 's{`/(?=media/|\?page=|#|blog/|platform|beauty|custom|onboarding|contacts|pricing|clients|cases)}{`'"$BASE"'}g; s{`/`}{`'"$BASE"'`}g' dist/client/assets/*.js

# Без .nojekyll Pages прячет всё, что начинается с подчёркивания.
touch dist/client/.nojekyll

WORK="$(mktemp -d)"
git fetch -q github gh-pages
git worktree add -q -f "$WORK" -B gh-pages github/gh-pages
# чистим старую сборку, но не служебную папку git
find "$WORK" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R dist/client/. "$WORK"/

cd "$WORK"
git add -A
if git diff --cached --quiet; then
  echo "Нечего деплоить: сборка не изменилась."
else
  git -c user.name="Виктория" -c user.email="vika@MacBook-Air-Viktoria.local" \
      commit -q -m "Деплой сайта $(date '+%d.%m.%Y %H:%M')"
  git push -q github gh-pages
  echo "Готово: https://vikahramovich02-collab.github.io/mary-site/"
fi

cd "$ROOT"
git worktree remove --force "$WORK"
