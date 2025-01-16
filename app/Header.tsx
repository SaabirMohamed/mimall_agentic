'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ShoppingBag, Grid, MapPin, Globe, Truck, Stethoscope, LogOut, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Header = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userType, setUserType] = React.useState('shopper');

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, user_type, updated_at')
          .eq('id', session.user.id)
          .single();
        if (profile) {
          setUserType(profile.user_type);
        }
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoggedIn(!!session);
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, user_type, updated_at')
          .eq('id', session.user.id)
          .single();
        if (profile) {
          setUserType(profile.user_type);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogin = () => {
    router.push(`/login?type=${userType}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="text-gray-200 py-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-4">
          <Link href="/" className="text-3xl font-bold text-gray-200">
            <span>MiMall</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="flex items-center hover:text-gray-300">
              <Home className="mr-1" size={18} /> Home
            </Link>
            <Link href="/stores" className="flex items-center hover:text-gray-300">
              <ShoppingBag className="mr-1" size={18} /> Stores
            </Link>
            <Link href="/categories" className="flex items-center hover:text-gray-300">
              <Grid className="mr-1" size={18} /> Categories
            </Link>
            <Link href="/locations" className="flex items-center hover:text-gray-300">
              <MapPin className="mr-1" size={18} /> Locations
            </Link>
            <Link href="/michina" className="flex items-center hover:text-gray-300">
              <Globe className="mr-1" size={18} /> MiChina
            </Link>
            <Link href="/hailoride" className="flex items-center hover:text-gray-300">
              <Truck className="mr-1" size={18} /> HailoRide
            </Link>
            <Link href="/miia" className="flex items-center hover:text-gray-300">
              <Stethoscope className="mr-1" size={18} /> MiiA Medical
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-800/50 p-2 rounded">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="shopper"
                      checked={userType === 'shopper'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="mr-1"
                    />
                    <span className="text-sm">Shopper</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="seller"
                      checked={userType === 'seller'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="mr-1"
                    />
                    <span className="text-sm">Seller</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="healthcare"
                      checked={userType === 'healthcare'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="mr-1"
                    />
                    <span className="text-sm">Healthcare</span>
                  </label>
                </div>
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                  {userType === 'shopper' 
                    ? 'Shopper Login' 
                    : userType === 'seller' 
                    ? 'Seller Login' 
                    : 'Healthcare Login'}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {userType === 'shopper' && (
                  <Link href="/cart" className="hover:text-gray-300">
                    <ShoppingCart size={24} />
                  </Link>
                )}
                <Link href="/dashboard" className="hover:text-gray-300">
                  <LayoutDashboard size={24} />
                </Link>
                {userType === 'healthcare' && (
                  <Link 
                    href="https://medical.ageye.pro" 
                    className="hover:text-gray-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Stethoscope size={24} />
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300"
                >
                  <LogOut size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
