# GitHub Actions Workflows

## Deploy Storybook to GitHub Pages

This workflow automatically deploys the Storybook documentation to GitHub Pages whenever changes are pushed to the `master` or `main` branch.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **The workflow will:**
   - Trigger on pushes to `master` or `main`
   - Build Storybook documentation
   - Deploy to GitHub Pages

3. **Access your deployed Storybook:**
   - Once deployed, it will be available at: `https://[username].github.io/CrossStitcher/`

### Manual Deployment

You can also trigger the deployment manually:

1. Go to Actions tab
2. Select "Deploy Storybook to GitHub Pages"
3. Click "Run workflow"

### Required Permissions

The workflow requires:

- `contents: read` - to checkout the code
- `pages: write` - to deploy to GitHub Pages
- `id-token: write` - for OIDC authentication

### Troubleshooting

If the deployment fails:

1. Ensure GitHub Pages is enabled in repository settings
2. Check that the branch protection rules allow GitHub Actions to deploy
3. Verify that all dependencies install correctly with `npm ci`
