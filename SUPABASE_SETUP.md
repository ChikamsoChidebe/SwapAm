# Supabase Setup for SwapAm

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose a project name: `swapam`
4. Set a database password
5. Choose a region close to your users

## 2. Get Project Credentials

After project creation, go to Settings > API:
- Copy the Project URL
- Copy the `anon` public key

## 3. Update Configuration

Update `src/services/supabase.js`:
```javascript
const supabaseUrl = 'YOUR_PROJECT_URL'
const supabaseAnonKey = 'YOUR_ANON_KEY'
```

## 4. Create Database Tables

Go to SQL Editor in Supabase dashboard and run:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  university TEXT,
  avatar_url TEXT,
  campus_points INTEGER DEFAULT 0,
  total_swaps INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Items table
CREATE TABLE public.items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  condition TEXT NOT NULL,
  exchange_type TEXT NOT NULL,
  price NUMERIC,
  images TEXT[],
  owner_id UUID REFERENCES public.users(id) NOT NULL,
  status TEXT DEFAULT 'available',
  views INTEGER DEFAULT 0,
  likes UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Swaps table
CREATE TABLE public.swaps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  requester_id UUID REFERENCES public.users(id) NOT NULL,
  owner_id UUID REFERENCES public.users(id) NOT NULL,
  item_id UUID REFERENCES public.items(id) NOT NULL,
  status TEXT DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swaps ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Items policies
CREATE POLICY "Anyone can view available items" ON public.items FOR SELECT USING (status = 'available');
CREATE POLICY "Users can view own items" ON public.items FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can insert own items" ON public.items FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own items" ON public.items FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete own items" ON public.items FOR DELETE USING (auth.uid() = owner_id);

-- Swaps policies
CREATE POLICY "Users can view own swaps" ON public.swaps FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = owner_id);
CREATE POLICY "Users can create swaps" ON public.swaps FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update swaps they're involved in" ON public.swaps FOR UPDATE USING (auth.uid() = requester_id OR auth.uid() = owner_id);
```

## 5. Set up Storage

1. Go to Storage in Supabase dashboard
2. Create a new bucket called `item-images`
3. Make it public
4. Set up policies:

```sql
-- Storage policies for item-images bucket
CREATE POLICY "Anyone can view item images" ON storage.objects FOR SELECT USING (bucket_id = 'item-images');
CREATE POLICY "Authenticated users can upload item images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'item-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own item images" ON storage.objects FOR UPDATE USING (bucket_id = 'item-images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own item images" ON storage.objects FOR DELETE USING (bucket_id = 'item-images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 6. Test the Setup

1. Start your frontend: `npm run dev`
2. Try registering a new user
3. Try creating an item
4. Check the Supabase dashboard to see data

## Benefits of Using Supabase

✅ **No backend server needed** - Direct database access from frontend
✅ **Built-in authentication** - Email/password, social logins
✅ **Real-time updates** - Items update live across users
✅ **File storage** - Built-in image hosting
✅ **Automatic APIs** - REST and GraphQL endpoints
✅ **Row Level Security** - Database-level permissions
✅ **Free tier** - 500MB database, 1GB storage, 2GB bandwidth
✅ **Scalable** - Handles growth automatically

## Environment Variables

Create `.env.local` in your project root:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Then update `supabase.js` to use environment variables:
```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```