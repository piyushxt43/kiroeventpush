# 🔒 Security Guidelines

## API Key Management

### ⚠️ CRITICAL: Never Commit API Keys

All API keys and sensitive credentials must be stored in environment variables, never hardcoded in source files.

## Local Development Setup

1. **Create a `.env` file** in the project root (this file is git-ignored):

```bash
# Copy the example file
cp .env.example .env
```

2. **Add your actual API keys** to `.env`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_actual_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Google Gemini AI
VITE_GEMINI_API_KEY=your_actual_gemini_key
```

3. **Never commit the `.env` file** - it's already in `.gitignore`

## Production Deployment

### Vercel

Add environment variables in the Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable with its production value
3. Redeploy after adding variables

### Other Platforms

- **Netlify**: Site Settings → Build & Deploy → Environment
- **AWS/Docker**: Use secrets management or environment injection
- **GitHub Actions**: Repository Settings → Secrets and Variables

## Checking for Exposed Keys

Before pushing to GitHub, always verify:

```bash
# Search for potential API keys in your code
git grep -i "AIzaSy"
git grep -i "api.*key.*="

# Check what will be committed
git diff --cached
```

## What's Protected

✅ `.env` - Git ignored, contains your actual keys
✅ `.env.local` - Git ignored
✅ `.env.production` - Git ignored
✅ `.env.development` - Git ignored

❌ `.env.example` - Committed, contains only placeholders

## If You Accidentally Commit a Key

1. **Immediately revoke/regenerate** the exposed key
2. **Remove from git history**:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch path/to/file" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** (if already pushed):
   ```bash
   git push origin --force --all
   ```
4. **Update** with new keys in `.env` and deployment platforms

## Best Practices

- ✅ Use environment variables for all secrets
- ✅ Keep `.env` in `.gitignore`
- ✅ Use different keys for development and production
- ✅ Rotate keys regularly
- ✅ Limit API key permissions to minimum required
- ✅ Monitor API usage for anomalies
- ❌ Never log API keys
- ❌ Never commit `.env` files
- ❌ Never share keys in chat/email
- ❌ Never hardcode keys in source files

## Getting API Keys

### Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Project Settings → General → Your apps
4. Copy the configuration values

### Google Gemini AI
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create or select a project
3. Generate API key
4. Copy and store securely in `.env`

## Questions?

If you're unsure about security practices, check the [CONTRIBUTING.md](CONTRIBUTING.md) or open an issue.
