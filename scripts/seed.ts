import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  try {
    console.log('Seeding database...');

    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    const { data: existingAdmin } = await supabase
      .from('users')
      .select('*')
      .eq('email', adminEmail)
      .maybeSingle();

    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const { data: admin, error } = await supabase
      .from('users')
      .insert({
        email: adminEmail,
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    console.log('Admin user created successfully:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('Please change the password after first login!');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
