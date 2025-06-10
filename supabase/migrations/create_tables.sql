/*
  # Create initial tables for LeadMine

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `website` (text)
      - `bio` (text)
      - `subscription_tier` (text)
      - `notification_settings` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `leads`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `username` (text)
      - `post_title` (text)
      - `post_content` (text)
      - `subreddit` (text)
      - `permalink` (text)
      - `created_at` (timestamptz)
      - `lead_score` (integer)
      - `location` (text)
      - `budget` (text)
      - `status` (text)
      - `contact_status` (text)
      - `notes` (text)
    - `messages`
      - `id` (uuid, primary key)
      - `lead_id` (uuid, foreign key to leads)
      - `sender` (text)
      - `message` (text)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  website TEXT,
  bio TEXT,
  subscription_tier TEXT DEFAULT 'free',
  notification_settings JSONB DEFAULT '{"newLeads": true, "leadResponses": true, "weeklyDigest": true, "marketingUpdates": false}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  post_title TEXT NOT NULL,
  post_content TEXT,
  subreddit TEXT,
  permalink TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  lead_score INTEGER,
  location TEXT,
  budget TEXT,
  status TEXT DEFAULT 'new',
  contact_status TEXT DEFAULT 'Not contacted',
  notes TEXT
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for leads
CREATE POLICY "Users can view their own leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for messages
CREATE POLICY "Users can view messages for their leads"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM leads
      WHERE leads.id = messages.lead_id
      AND leads.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages for their leads"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM leads
      WHERE leads.id = messages.lead_id
      AND leads.user_id = auth.uid()
    )
  );