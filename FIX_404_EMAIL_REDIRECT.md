# Fix 404 Error on Email Confirmation Link

## Problem
When clicking the confirmation link in the Supabase OTP email, you get a 404 error instead of being redirected to `/member`.

## Solution: Configure Redirect URLs in Supabase

### Steps:

1. **Go to Supabase Dashboard**
   - URL: https://app.supabase.co
   - Select your project: `eltdnueqrfiwiynhjoes`

2. **Navigate to URL Configuration**
   - Click on **Settings** (gear icon) in the left sidebar
   - Select **Authentication**
   - Click **URL Configuration**

3. **Add Redirect URLs**
   
   For **Development** (localhost):
   ```
   http://localhost:3000
   ```
   
   For **Production** (add later):
   ```
   https://yourdomain.com
   ```

   **Important:** Add the base URL only (e.g., `http://localhost:3000`), NOT the full path like `/member`.

4. **Save**
   - Click **Save** button

5. **Verify in Code**
   
   Your login page already has the correct redirect URL:
   ```tsx
   emailRedirectTo: `${window.location.origin}/member`
   ```
   
   This will work after you add the base URL to Supabase.

### What Happens Now:

1. User clicks link in email
2. Supabase verifies the OTP token
3. User is redirected to `http://localhost:3000/member` (or your production URL)
4. The new `/member` page checks authentication and shows welcome screen

## ✅ Verify It's Working

1. **Restart your dev server**
   ```bash
   npm run dev
   ```

2. **Try the signup flow again**
   - Go to http://localhost:3000/login
   - Enter email and name
   - Click "Send Magic Link"
   - Check your email

3. **Click the OTP link**
   - You should now land on http://localhost:3000/member
   - See your email and name displayed
   - No more 404 error!

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| Still getting 404 | Make sure you added `http://localhost:3000` to Supabase URL Configuration and restarted dev server |
| Email link not working | Check that you're using the correct Supabase project |
| Blank page instead of member page | Check browser console for errors; might need to wait a few seconds for Supabase to process |
| Link expires too quickly | Supabase OTP links expire in 24 hours by default |

## 📝 Notes

- The `/member` page was just created - it displays your user info and provides a sign-out button
- This page requires authentication - if you access it without being signed in, you're redirected to `/login`
- You can customize this page later to show attendance history, events, etc.
