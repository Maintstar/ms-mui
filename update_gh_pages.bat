git chechout gh-pages
git merge master
npm run build
git add .
git commit -a -m "rebuilt"
git push origin gh-pages
git chechout master