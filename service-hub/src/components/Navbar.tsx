"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-5'}`}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="ph-fill ph-rocket-launch text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">Service<span className="text-indigo-500">Hub</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Explorer</Link>
          <Link href="/dashboard/provider" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Mes Services</Link>
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          
          {/* Notification Bell */}
          <button className="relative w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all">
            <i className="ph ph-bell text-xl text-muted-foreground"></i>
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-[#09090b] rounded-full"></span>
          </button>

          {/* User Profile / Auth */}
          <Link href="/dashboard/client" className="flex items-center gap-3 pl-2 group">
            <div className="text-right hidden lg:block">
              <p className="text-xs font-bold leading-none mb-1">Jean Dupont</p>
              <p className="text-[10px] text-muted-foreground leading-none">Client</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-indigo-500 transition-all overflow-hidden bg-zinc-800">
              <img src="https://i.pravatar.cc/100?img=12" alt="Avatar" />
            </div>
          </Link>
        </div>

        <button className="md:hidden text-2xl">
          <i className="ph ph-list"></i>
        </button>
      </div>
    </nav>
  );
}
