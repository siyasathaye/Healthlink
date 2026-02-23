# HealthLink Login Page - Quick Reference

## 🎨 What's New

Login page now matches the HealthLink aesthetic with:
- Dark blue gradient background
- Blue accent borders and buttons
- Smooth hover effects and animations
- Success state with email confirmation
- Professional error handling

## 🚀 Quick Start

1. **Start dev server**
   ```bash
   npm run dev
   ```

2. **Visit login page**
   ```
   http://localhost:3000/login
   ```

3. **Fill in the form**
   - Full Name: Your name
   - Email: An email you can access (for testing, use Mailtrap or Gmail)

4. **Click "Send Magic Link"**

5. **Check your email** for the Supabase OTP link

6. **Click the link** to sign in

## ✅ Verify Signup in Supabase

### Quick Path:
1. Go to https://app.supabase.co
2. Select project `eltdnueqrfiwiynhjoes`
3. Click **Authentication** → **Users**
4. Look for your test email in the users list
5. Click on the user to see their metadata (includes `full_name`)

### What You Should See:
```
Email: test@example.com
Created at: Jan 12, 2026 3:45 PM
Verified: ✓
User Metadata: { "full_name": "John Doe" }
```

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| Email not received | Check spam folder; verify Email provider is enabled in Auth → Providers |
| User doesn't appear in Supabase | Check Auth → Logs for errors; verify redirect URL in Auth → URL Configuration includes localhost |
| "Unauthorized" error | Ensure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct in `.env.local` |
| Page styling looks wrong | Make sure Tailwind CSS is loaded; check `globals.css` is imported |

## 📖 Full Documentation

See **SIGNUP_VERIFICATION.md** for complete setup and troubleshooting guide.

## 🎯 Next Steps

- [ ] Test signup flow end-to-end
- [ ] Verify user appears in Supabase Auth
- [ ] Create `/member` page (member dashboard)
- [ ] Set up automatic sync of Supabase users to your Prisma `User` table
- [ ] Test officer view at `/officer` to see member attendance
