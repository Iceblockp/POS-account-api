# Vercel Deployment Setup

## 1. Database Setup (Supabase)

1. Go to your Supabase dashboard
2. Get your database password from Settings > Database
3. Update the connection strings with your actual password

## 2. Environment Variables in Vercel

Set these in Vercel Dashboard > Settings > Environment Variables:

```
DATABASE_URL=postgresql://postgres.kyvyigksezdoqobjzlkn:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.kyvyigksezdoqobjzlkn:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-change-in-production
GOOGLE_CLIENT_ID=188930484209-8p4a85jd2icaqdhnpni44picnl4vs2go.apps.googleusercontent.com
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-change-in-production
NEXT_PUBLIC_SUPABASE_URL=https://kyvyigksezdoqobjzlkn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5dnlpZ2tzZXpkb3FvYmp6bGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTEwMjAsImV4cCI6MjA3NzIyNzAyMH0.mCdhQkTwpJaar9esSWhIozI42PDpveBvfERdx1Eq6OI
```

## 3. Run Database Migrations

After setting up environment variables, run:

```bash
# Set production environment variables locally for migration
export DATABASE_URL="postgresql://postgres.kyvyigksezdoqobjzlkn:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
export DIRECT_URL="postgresql://postgres.kyvyigksezdoqobjzlkn:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# Run migrations
npx prisma migrate deploy
npx prisma generate
```

## 4. Create Initial Admin

After deployment, visit: `https://your-app.vercel.app/api/admin/register`

This will create the initial admin user with credentials:

- Email: admin@admin.com
- Password: admin123
