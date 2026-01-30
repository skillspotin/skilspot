@echo off
echo ===========================================
echo SkillSpot Social Feed Updater
echo ===========================================
echo.
echo Organizing images in assets/social_feed...
echo.

powershell -Command "$files = Get-ChildItem 'assets\social_feed' | Sort-Object LastWriteTime -Descending; $count = 1; foreach ($file in $files) { if ($file.PsIsContainer) { continue } $ext = $file.Extension; $newName = 'post_' + $count + $ext; if ($file.Name -ne $newName) { $tempName = 'temp_rename_' + $count + $ext; Rename-Item -Path $file.FullName -NewName $tempName -Force } $count++ }; $tempFiles = Get-ChildItem 'assets\social_feed' -Filter 'temp_rename_*'; foreach ($file in $tempFiles) { if ($file.Name -match 'temp_rename_(\d+)(.*)') { $num = $matches[1]; $ext = $matches[2]; Rename-Item -Path $file.FullName -NewName ('post_' + $num + $ext) -Force } }"

echo.
echo Success! All images have been renamed to post_1, post_2, etc.
echo Your newest images are now at the top of the feed.
echo.
echo You can now Git Push your changes to GitHub.
echo.
pause
