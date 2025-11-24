-- Create admin user
-- Note: This will create the user with email texadmin@admin.local and password tex2025admin
-- The password is hashed by Supabase Auth

-- First, we need to insert into auth.users (this is a special case for creating initial admin)
-- We'll use a SQL function to safely create the user

DO $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Check if user already exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'texadmin@admin.local') THEN
    -- Create the user using Supabase's internal auth schema
    -- Note: In production, this should be done via the Supabase Dashboard or Auth API
    -- This is a simplified version for initial setup
    
    -- Insert user with a placeholder (actual password must be set via Supabase Dashboard)
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      raw_app_meta_data,
      raw_user_meta_data
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'texadmin@admin.local',
      crypt('tex2025admin', gen_salt('bf')),
      now(),
      now(),
      now(),
      '',
      '{"provider":"email","providers":["email"]}',
      '{}'
    )
    RETURNING id INTO new_user_id;
    
    -- Add admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new_user_id, 'admin');
  END IF;
END $$;