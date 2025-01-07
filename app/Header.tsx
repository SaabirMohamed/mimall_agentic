import React from 'react';
import Link from 'next/link';
import { Home, ShoppingBag, Grid, MapPin, Globe, Truck, Stethoscope, User, UserPlus, Mic } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-neutral-light text-primary shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-center items-center">
        <Link href="/" className="text-3xl font-bold text-accent-color flex items-center">
          <span className="mr-2">MiMall</span>
        </Link>
        <button className="rounded-full bg-accent-color p-2 shadow hover:bg-primary-color transition-colors ml-4">
          <Mic size={24} className="text-white" />
        </button>
      </div>
      <nav className="container mx-auto mt-2">
        <ul className="flex justify-center space-x-6">
          <li><Link href="/" className="flex items-center hover:text-accent-color"><Home className="mr-1" size={18} /> Home</Link></li>
          <li><Link href="/stores" className="flex items-center hover:text-accent-color"><ShoppingBag className="mr-1" size={18} /> Stores</Link></li>
          <li><Link href="/categories" className="flex items-center hover:text-accent-color"><Grid className="mr-1" size={18} /> Categories</Link></li>
          <li><Link href="/locations" className="flex items-center hover:text-accent-color"><MapPin className="mr-1" size={18} /> Locations</Link></li>
          <li><Link href="/michina" className="flex items-center hover:text-accent-color"><Globe className="mr-1" size={18} /> MiChina</Link></li>
          <li><Link href="/hailoride" className="flex items-center hover:text-accent-color"><Truck className="mr-1" size={18} /> HailoRide</Link></li>
          <li><Link href="/miia" className="flex items-center hover:text-accent-color"><Stethoscope className="mr-1" size={18} /> MiiA Medical</Link></li>
        </ul>
      </nav>
      <div className="container mx-auto mt-2 flex justify-end">
        <div className="flex items-center space-x-4">
          <Link href="/signin" className="btn btn-secondary">
            <User className="mr-1" size={18} /> Sign In
          </Link>
          <Link href="/signup/user" className="btn btn-primary">
            <UserPlus className="mr-1" size={18} /> Sign Up (User)</Link>
          <Link href="/signup/business" className="btn btn-primary">
            <UserPlus className="mr-1" size={18} /> Sign Up (Business)
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
