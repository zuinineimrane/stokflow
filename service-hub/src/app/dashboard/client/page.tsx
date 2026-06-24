"use client";
import DashboardSidebar from '@/components/DashboardSidebar';
import Link from 'next/link';

export default function ClientDashboard() {
  const activeOrders = [
    { id: "ORD-7241", service: "Logo Design", provider: "Sarah Chen", price: "150€", status: "En cours", progress: 60 },
    { id: "ORD-7239", service: "Site Next.js", provider: "Alex Rivera", price: "800€", status: "Livré", progress: 100 },
  ];

  const favorites = [
    { id: 3, title: "Marketing Digital", provider: "Marc Lambert", price: 300, rating: 4.7 },
    { id: 4, title: "Rédaction SEO", provider: "Emma Wilson", price: 50, rating: 4.8 },
  ];

  return (
    <div className="container py-12 flex gap-12">
      <DashboardSidebar type="client" />
      
      <main className="flex-1 space-y-12 fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mon Espace Client</h1>
            <p className="text-muted-foreground">Suivez vos commandes et gérez vos prestataires favoris.</p>
          </div>
          <Link href="/explore" className="btn btn-secondary">
            <i className="ph ph-magnifying-glass"></i> Explorer plus
          </Link>
        </div>

        {/* Active Orders Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <i className="ph ph-shopping-cart text-indigo-400"></i> Commandes en cours
          </h2>
          <div className="grid gap-6">
            {activeOrders.map((order) => (
              <div key={order.id} className="glass p-8 rounded-[2rem] border-white/5 flex items-center gap-8">
                <div className="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl">
                  <i className="ph ph-package text-muted-foreground/30"></i>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{order.service}</h3>
                      <p className="text-sm text-muted-foreground">Par {order.provider} • {order.price}</p>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Livré' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-amber-500/20 text-amber-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-bold">{order.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${order.status === 'Livré' ? 'bg-indigo-500' : 'bg-amber-500'}`} 
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {order.status === 'Livré' ? (
                    <button className="btn btn-primary text-xs py-2 px-6">Valider & Payer</button>
                  ) : (
                    <button className="btn btn-secondary text-xs py-2 px-6">Contacter</button>
                  )}
                  <Link href={`/messages`} className="text-[10px] text-center text-muted-foreground hover:text-indigo-400">Voir détails</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Favorites Grid */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <i className="ph ph-heart text-indigo-400"></i> Prestataires favoris
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {favorites.map((fav) => (
              <div key={fav.id} className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <i className="ph-fill ph-user text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{fav.title}</h3>
                    <p className="text-xs text-muted-foreground">{fav.provider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{fav.price}€</p>
                  <div className="flex items-center gap-1 justify-end">
                    <i className="ph-fill ph-star text-amber-400 text-[10px]"></i>
                    <span className="text-[10px] font-bold">{fav.rating}</span>
                  </div>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 p-6 hover:bg-white/5 transition-all text-muted-foreground hover:text-foreground">
              <i className="ph ph-plus-circle text-2xl"></i>
              <span className="text-xs font-bold uppercase tracking-widest">Ajouter un favori</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
