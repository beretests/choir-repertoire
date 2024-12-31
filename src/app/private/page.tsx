import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log('Auth error:', error.message);
    redirect('/login');
  }

  if (!data?.user) {
    console.log('No authenticated user found');
    redirect('/login');
  }

  return <p>Hello {data.user.email}</p>;
}
