import { supabase } from './supabase';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  name: string | null;
  password: string | null;
  google_id: string | null;
  role: 'USER' | 'ADMIN';
  expire_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const db = {
  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getUserByGoogleId(googleId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('google_id', googleId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createUser(userData: {
    email: string;
    name?: string;
    password?: string;
    googleId?: string;
    role?: 'USER' | 'ADMIN';
    expireDate?: string;
  }): Promise<User> {
    const hashedPassword = userData.password
      ? await bcrypt.hash(userData.password, 10)
      : null;

    const { data, error } = await supabase
      .from('users')
      .insert({
        email: userData.email,
        name: userData.name || null,
        password: hashedPassword,
        google_id: userData.googleId || null,
        role: userData.role || 'USER',
        expire_date: userData.expireDate || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateUser(id: string, updates: {
    name?: string;
    role?: 'USER' | 'ADMIN';
    expireDate?: string;
    isActive?: boolean;
  }): Promise<User> {
    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.role !== undefined) updateData.role = updates.role;
    if (updates.expireDate !== undefined) updateData.expire_date = updates.expireDate;
    if (updates.isActive !== undefined) updateData.is_active = updates.isActive;

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
};
