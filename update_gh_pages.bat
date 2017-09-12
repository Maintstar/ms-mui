git checkout gh-pages
if %errorlevel% neq 0 exit /b %errorlevel%

git reset --hard master
call npm run build
git add build -f
git commit -a -m "rebuilt"
git push origin gh-pages --force
git checkout master