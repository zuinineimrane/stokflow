"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [lang, setLang] = useState('FR');
  const [currency, setCurrency] = useState('EUR');

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <i className="ph-fill ph-rocket-launch text-white text-lg"></i>
              </div>
              <span className="text-lg font-bold tracking-tight">Service<span className="text-indigo-500">Hub</span></span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              La marketplace premium pour les services digitaux. Qualité, confiance et rapidité pour tous vos projets.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6">Catégories</h4>
            <ul className="space-y-4 text-xs text-muted-foreground">
              <li><Link href="/explore" className="hover:text-indigo-400">Développement Web</Link></li>
              <li><Link href="/explore" className="hover:text-indigo-400">Design Graphique</Link></li>
              <li><Link href="/explore" className="hover:text-indigo-400">Marketing Digital</Link></li>
              <li><Link href="/explore" className="hover:text-indigo-400">Rédaction SEO</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6">Support</h4>
            <ul className="space-y-4 text-xs text-muted-foreground">
              <li><Link href="/help" className="hover:text-indigo-400">Centre d'aide</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400">Conditions d'utilisation</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-400">Confidentialité</Link></li>
              <li><Link href="/disputes" className="hover:text-indigo-400">Litiges</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6">Communauté</h4>
            <ul className="space-y-4 text-xs text-muted-foreground">
              <li><Link href="/blog" className="hover:text-indigo-400">Notre Blog</Link></li>
              <li><Link href="/forum" className="hover:text-indigo-400">Forum</Link></li>
              <li><Link href="/affiliate" className="hover:text-indigo-400">Programme Affiliation</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-muted-foreground font-medium">
            © 2026 ServiceHub Inc. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <i className="ph ph-globe text-muted-foreground"></i>
              <select 
                className="bg-transparent border-none text-[10px] font-bold text-muted-foreground focus:outline-none cursor-pointer hover:text-foreground"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="FR">Français</option>
                <option value="EN">English</option>
                <option value="AR">العربية</option>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-2">
              <i className="ph ph-currency-circle-dollar text-muted-foreground"></i>
              <select 
                className="bg-transparent border-none text-[10px] font-bold text-muted-foreground focus:outline-none cursor-pointer hover:text-foreground"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="DZD">DZD (DA)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <i className="ph-fill ph-facebook-logo text-xl text-muted-foreground hover:text-indigo-400 cursor-pointer"></i>
            <i className="ph-fill ph-instagram-logo text-xl text-muted-foreground hover:text-indigo-400 cursor-pointer"></i>
            <i className="ph-fill ph-linkedin-logo text-xl text-muted-foreground hover:text-indigo-400 cursor-pointer"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
