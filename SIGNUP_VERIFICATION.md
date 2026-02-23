# HealthLink Account Creation & Supabase Verification Guide

## 🎨 Login Page Updated

The login page has been redesigned to match the HealthLink aesthetic:
- Dark blue gradient background (`#071225` → `#102647`)
- Blue accent borders and buttons
- Smooth animations and hover effects
- Success state with confirmation message
- Better error handling

## 📋 How Member Signup Works

### Flow
1. Member enters email and full name on `/login` page
2. Clicks "Send Magic Link"
3. Supabase Auth sends OTP email to the member
4. Member clicks the link in email
5. Member is redirected to `/member` (authenticated)
6. User data is created in Supabase Auth

## ✅ Verifying Signups in Supabase

### Option 1: Check Supabase Auth Users (Easiest)

1. Go to [Supabase Dashboard](https://app.supabase.co)
2. Select your project: **eltdnueqrfiwiynhjoes**
3. Navigate to **Authentication** → **Users**
4. You'll see all users who have signed up/attempted to sign up
5. Look for columns:
   - **Email** - User's email address
   - **Created at** - When they first signed in
   - **Last signed in** - Last login time

**What to look for:**
- ✓ User appears in the Users list
- ✓ Email is verified (check the verified badge)
- ✓ User data includes `full_name` in their metadata

### Option 2: Check User Metadata

When a user signs up with `full_name` data, it's stored as user metadata:

1. In the **Users** tab, click on a specific user
2. Scroll down to **User Metadata**
3. You should see:
```json
{
  "full_name": "John Doe"
}
```

### Option 3: Check Auth Logs

1. Go to **Authentication** → **Logs**
2. Filter by event type (signup, sign-in, etc.)
3. See real-time auth activity

## 🔐 How Email OTP Works

When a user signs up:

1. **Email Verification Link is sent** to their inbox
2. **Link expires in 24 hours** (configurable)
3. **Clicking the link authenticates them** automatically
4. **Redirects to `/member`** (or your redirect URL)

### Email Template

You can customize the email template:

1. Go to **Authentication** → **Email Templates**
2. Select **Magic Link**
3. Edit the template to match your branding
4. Update the subject line, body, and button text

## 🛠️ Troubleshooting: User Not Appearing

### Problem: I don't see the signup in Supabase

**Possible causes:**

1. **Email not configured** - Check if Email provider is enabled
   - Go to **Authentication** → **Providers**
   - Ensure **Email** is toggled ON
   - Check SMTP settings under **Email**

2. **Redirect URL wrong** - OTP link may fail if redirect domain doesn't match
   - Go to **Authentication** → **URL Configuration**
   - Add `http://localhost:3000` (for dev)
   - Add your production domain later
   - Make sure `/member` page exists or update the redirect URL

3. **Email not sent** - Check email logs
   - Go to **Authentication** → **Logs**
   - Look for failed email sends
   - Check spam folder on test email

4. **Wrong project** - Make sure you're looking at the right Supabase project
   - Project name should be: `eltdnueqrfiwiynhjoes`

## 📝 Environment Variables Checklist

Your `.env.local` should have:
```
NEXT_PUBLIC_SUPABASE_URL=https://eltdnueqrfiwiynhjoes.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsdGRudWVxcmZpd2l5bmhqb2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMDgzMzAsImV4cCI6MjA4Mjc4NDMzMH0.rzYQ54ylCZW4JnWdASfMBx054k92vX24-6mTAqquUqs
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.eltdnueqrfiwiynhjoes.supabase.co:5432/postgres
```

## 🧪 Test Signup Flow

### Step 1: Start the dev server
```bash
npm run dev
```

### Step 2: Visit login page
```
http://localhost:3000/login
```

### Step 3: Fill in the form
- **Full Name**: Your test name (e.g., "Test User")
- **Email**: A test email you can access (e.g., your personal email, temporary email like Mailtrap, etc.)

### Step 4: Submit
Click "Send Magic Link"

### Step 5: Check email
Look for an email from Supabase with subject line like:
> "Your HealthLink magic link"

### Step 6: Click the link
Clicking the link should:
- Authenticate you
- Redirect to `/member`
- Show you're logged in

### Step 7: Verify in Supabase
1. Go to Supabase Dashboard
2. **Authentication** → **Users**
3. Search for your test email
4. Confirm user is created with correct metadata

## 🔗 Related Setup Steps

If you haven't already, complete these:

1. **Configure Email Provider**
   ```
   Go to Supabase → Authentication → Email Templates
   Verify email is enabled
   ```

2. **Set Redirect URLs**
   ```
   Go to Authentication → URL Configuration
   Add: http://localhost:3000
   Add: https://yourdomain.com (for production)
   ```

3. **Create Member Page** (optional, handles post-login redirect)
   ```typescript
   // src/app/member/page.tsx
   import { redirect } from "next/navigation";
   import { supabase } from "@/lib/supabaseClient";
   
   export default async function MemberPage() {
     // Check if user is authenticated
     // Return welcome page or member dashboard
     return <div>Welcome, Member!</div>;
   }
   ```

## 📊 Next Steps

1. **Sync Supabase users to your database**
   - Set up a webhook or background job to sync Supabase users to your Prisma `User` table
   - Add a database trigger to create records automatically

2. **Create member profile page**
   - Show user's events attended
   - Display attendance history

3. **Add event checkin flow**
   - Officers can mark members as attended

## ❓ Common Questions

**Q: Where are passwords stored?**
A: Supabase handles all password/OTP securely. No passwords are stored in your app.

**Q: Can I use password auth instead of OTP?**
A: Yes! You can enable **Password** provider under Authentication → Providers, but OTP is simpler and more secure.

**Q: How do I export user data from Supabase?**
A: Go to **Authentication** → **Users**, select users, then export as CSV via the UI or use the API.

**Q: Can I automatically create the member in my database?**
A: Yes! Use Supabase webhooks or set up a Postgres function to sync users.
