-- Delete the incorrectly created user
DELETE FROM auth.users WHERE email = 'texadmin@admin.local';