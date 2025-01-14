'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ShoppingBag, Grid, MapPin, Globe, Truck, Stethoscope, LogOut, LayoutDashboard } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Header = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="bg-transparent text-gray-200 shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-center items-center">
        <Link href="/" className="text-3xl font-bold text-gray-200 flex items-center">
          <span className="mr-2">MiMall</span>
        </Link>
      </div>
      <nav className="container mx-auto mt-2">
        <ul className="flex justify-center space-x-6">
          <li><Link href="/" className="flex items-center hover:text-gray-200"><Home className="mr-1" size={18} /> Home</Link></li>
          <li><Link href="/stores" className="flex items-center hover:text-gray-200"><ShoppingBag className="mr-1" size={18} /> Stores</Link></li>
          <li><Link href="/categories" className="flex items-center hover:text-gray-200"><Grid className="mr-1" size={18} /> Categories</Link></li>
          <li><Link href="/locations" className="flex items-center hover:text-gray-200"><MapPin className="mr-1" size={18} /> Locations</Link></li>
          <li><Link href="/michina" className="flex items-center hover:text-gray-200"><Globe className="mr-1" size={18} /> MiChina</Link></li>
          <li><Link href="/hailoride" className="flex items-center hover:text-gray-200"><Truck className="mr-1" size={18} /> HailoRide</Link></li>
          <li><Link href="/miia" className="flex items-center hover:text-gray-200"><Stethoscope className="mr-1" size={18} /> MiiA Medical</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link href="/dashboard" className="flex items-center hover:text-gray-200"><LayoutDashboard className="mr-1" size={18} /> Dashboard</Link></li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="flex items-center hover:text-gray-200"
                >
                  <LogOut className="mr-1" size={18} /> Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/login" className="flex items-center hover:text-gray-200">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
