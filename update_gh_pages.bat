git checkout gh-pages
if %errorlevel% neq 0 exit /b %errorlevel%

git merge master
call npm run build
git add .
git commit -a -m "rebuilt"
git push origin gh-pages
git chechout master