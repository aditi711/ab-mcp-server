# 🔒 Security Guidelines

## API Key Management

### Environment Variables

This project requires the following API keys:

```bash
# Required for AI Agent functionality
OPENAI_API_KEY=sk-proj-your-openai-api-key-here

# Required for web scraping features  
FIRECRAWL_API_KEY=fc-your-firecrawl-api-key-here
```

### 🔐 Secure Setup Instructions

#### Local Development
1. Create `.env.local` file in project root
2. Add your API keys (never commit this file)
3. The `.gitignore` automatically excludes `.env*.local` files

#### Production (Vercel)
1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add each API key individually
3. Select **Production** and **Development** environments
4. Keys are automatically encrypted by Vercel

### 🚨 Security Best Practices

#### ✅ DO:
- Store API keys in environment variables only
- Use Vercel dashboard for production keys
- Keep `.env.local` file private and local only
- Rotate API keys regularly
- Use least-privilege API keys when possible

#### ❌ DON'T:
- Commit API keys to version control
- Share API keys in chat/email
- Use API keys in client-side code
- Hard-code API keys in source files
- Use production keys in development

### 🔍 Key Sources

- **OpenAI API Key**: https://platform.openai.com/api-keys
- **Firecrawl API Key**: https://firecrawl.dev

### 🛡️ Additional Security

- API keys are encrypted in Vercel
- Environment variables are isolated by deployment environment
- Keys are not exposed in build logs (when properly configured)
- HTTPS enforced for all API communications

### 📋 Security Checklist

- [ ] API keys added to Vercel environment variables
- [ ] Local `.env.local` file created (not committed)
- [ ] API keys working in both development and production
- [ ] No API keys visible in source code
- [ ] Rate limiting enabled on API providers
- [ ] API key usage monitoring configured

## Incident Response

If an API key is compromised:

1. **Immediately revoke** the compromised key at the provider
2. **Generate new key** with same permissions
3. **Update environment variables** in Vercel dashboard
4. **Redeploy** the application
5. **Monitor usage** for any unauthorized activity

## Contact

For security concerns, create an issue in the repository or contact the maintainer directly. 