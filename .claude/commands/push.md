Run the following shell commands to push the project to GitHub:

```bash
git status
git add -A
git diff --cached --stat
```

Then commit any staged changes with a short conventional commit message summarizing what changed, and push:

```bash
git push origin main
```

If the remote `origin` is not set, ask the user for the GitHub repository URL and run:

```bash
git remote add origin <url>
git push -u origin main
```

Report the result to the user.
