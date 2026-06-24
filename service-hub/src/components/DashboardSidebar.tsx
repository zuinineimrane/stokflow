import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar({ type }: { type: 'client' | 'provider' }) {
  const pathname = usePathname();

  const links = type === 'provider' ? [
    { name: 'Vue d\'ensemble', icon: 'ph-circles-four', href: '/dashboard/provider' },
    { name: 'Mes Services', icon: 'ph-package', href: '/dashboard/provider/services' },
    { name: 'Commandes', icon: 'ph-shopping-bag', href: '/dashboard/provider/orders' },
    { name: 'Revenus', icon: 'ph-currency-eur', href: '/dashboard/provider/earnings' },
  ] : [
    { name: 'Tableau de bord', icon: 'ph-squares-four', href: '/dashboard/client' },
    { name: 'Mes Achats', icon: 'ph-shopping-cart', href: '/dashboard/client/orders' },
    { name: 'Favoris', icon: 'ph-heart', href: '/dashboard/client/favorites' },
    { name: 'Messages', icon: 'ph-chat-centered', href: '/messages' },
  ];

  return (
    <aside className="w-64 glass rounded-[2rem] p-6 space-y-8 h-fit sticky top-32">
      <div className="flex items-center gap-4 px-4">
        <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
          <i className={`ph-fill ${type === 'provider' ? 'ph-briefcase' : 'ph-user'} text-2xl`}></i>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Compte</p>
          <p className="font-bold text-sm">{type === 'provider' ? 'Prestataire' : 'Client'}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === link.href ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-muted-foreground hover:bg-white/5'}`}
          >
            <i className={`ph ${link.icon} text-lg`}></i>
            <span className="text-sm font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-8 border-t border-white/5">
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-all">
          <i className="ph ph-gear text-lg"></i>
          <span className="text-sm font-medium">Paramètres</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-all">
          <i className="ph ph-sign-out text-lg"></i>
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
