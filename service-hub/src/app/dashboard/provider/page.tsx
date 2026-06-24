"use client";
import DashboardSidebar from '@/components/DashboardSidebar';
import Link from 'next/link';

export default function ProviderDashboard() {
  const stats = [
    { label: "Revenus Total", value: "2,450€", icon: "ph-money", color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Commandes Actives", value: "12", icon: "ph-shopping-bag", color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { label: "Note Moyenne", value: "4.9", icon: "ph-star", color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Taux de Réponse", value: "98%", icon: "ph-chat-circle", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  ];

  const recentOrders = [
    { id: "ORD-7241", service: "Logo Design", client: "Marie K.", price: "150€", status: "En cours", date: "Aujourd'hui" },
    { id: "ORD-7239", service: "Site Next.js", client: "Digital Corp", price: "800€", status: "Livré", date: "Hier" },
    { id: "ORD-7235", service: "SEO Audit", client: "Jean L.", price: "200€", status: "Payé", date: "Il y a 3 jours" },
  ];

  return (
    <div className="container py-12 flex gap-12">
      <DashboardSidebar type="provider" />
      
      <main className="flex-1 space-y-12 fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tableau de bord Prestataire</h1>
            <p className="text-muted-foreground">Bienvenue, voici un aperçu de votre activité.</p>
          </div>
          <Link href="/dashboard/new-service" className="btn btn-primary">
            <i className="ph ph-plus"></i> Nouveau Service
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-6 rounded-2xl border-white/5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                <i className={`ph-fill ${stat.icon} text-xl`}></i>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Active Orders */}
        <div className="glass rounded-[2rem] overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold">Commandes Récentes</h2>
            <Link href="/dashboard/provider/orders" className="text-xs font-bold text-indigo-400 hover:underline">Voir tout</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-muted-foreground bg-white/5">
                  <th className="px-8 py-4 font-bold">Commande</th>
                  <th className="px-8 py-4 font-bold">Service</th>
                  <th className="px-8 py-4 font-bold">Client</th>
                  <th className="px-8 py-4 font-bold">Prix</th>
                  <th className="px-8 py-4 font-bold">Statut</th>
                  <th className="px-8 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors text-sm">
                    <td className="px-8 py-6 font-mono text-xs">{order.id}</td>
                    <td className="px-8 py-6 font-bold">{order.service}</td>
                    <td className="px-8 py-6 text-muted-foreground">{order.client}</td>
                    <td className="px-8 py-6 font-bold text-indigo-400">{order.price}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'En cours' ? 'bg-amber-500/20 text-amber-500' :
                        order.status === 'Livré' ? 'bg-indigo-500/20 text-indigo-500' :
                        'bg-green-500/20 text-green-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-muted-foreground hover:text-foreground">
                        <i className="ph ph-dots-three-outline-vertical"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Growth Tip */}
        <div className="bg-indigo-600 rounded-[2rem] p-8 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-bold text-white">Augmentez vos revenus de 20%</h3>
            <p className="text-indigo-100 max-w-md">
              Les prestataires qui répondent en moins de 1 heure ont 3 fois plus de chances de convertir leurs clients.
            </p>
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-transform">
              Voir mes conseils
            </button>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
            <i className="ph-fill ph-trend-up text-[200px] text-white"></i>
          </div>
        </div>
      </main>
    </div>
  );
}
