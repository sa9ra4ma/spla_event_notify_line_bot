@echo off
npx clasp push 2> deploy.log
for %%i in (deploy.log) do set SIZE=%%~zi
if %SIZE% leq 100 (
  npx clasp deploy -i AKfycbw37NGrGtqmn846pviVd4DzzKkect-IUqj8LifLow2hjmnyX6b5hJUmdKjcxGEz9d3Jrw
) else (
  echo "push error!"
)