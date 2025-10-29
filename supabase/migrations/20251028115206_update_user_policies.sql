/*
  # Update User Table Policies

  1. Changes
    - Drop existing service role policy
    - Add policy to allow anonymous inserts (for initial user creation)
    - Keep existing policies for authenticated users
*/

-- Drop existing service role policy if it exists
DROP POLICY IF EXISTS "Service role can insert users" ON users;

-- Allow anonymous inserts for user registration/creation
CREATE POLICY "Allow public insert for user creation"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);