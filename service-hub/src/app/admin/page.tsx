"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function AdminDashboard() {
  const stats = [
    { label: "Utilisateurs", value: "1,248", change: "+12%", icon: "ph-users" },
    { label: "Volume d'Affaires", value: "124,500€", change: "+8%", icon: "ph-chart-line-up" },
    { label: "Services en Attente", value: "45", change: "-5", icon: "ph-stack" },
    { label: "Litiges Ouverts", value: "3", change: "0", icon: "ph-scales" },
  ];

  const pendingServices = [
    { id: 101, title: "Logo IA Futuriste", provider: "DevBot", date: "Il y a 2h" },
    { id: 102, title: "Audit Cyber-sécurité", provider: "SafeNet", date: "Il y a 5h" },
  ];

  return (
    <div className="container py-12 flex gap-12">
      {/* Admin Sidebar */}
      <aside className="w-64 glass rounded-[2rem] p-6 space-y-8 h-fit">
        <div className="flex items-center gap-4 px-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <i className="ph-fill ph-shield-star text-2xl"></i>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Admin</p>
            <p className="font-bold text-sm">Super Admin</p>
          </div>
        </div>
        <nav className="space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/20">
            <i className="ph ph-grid-four text-lg"></i>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5">
            <i className="ph ph-users-three text-lg"></i>
            <span className="text-sm font-medium">Utilisateurs</span>
          </Link>
          <Link href="/admin/services" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5">
            <i className="ph ph-package text-lg"></i>
            <span className="text-sm font-medium">Validation</span>
          </Link>
          <Link href="/admin/disputes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5">
            <i className="ph ph-scales text-lg"></i>
            <span className="text-sm font-medium">Litiges</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-12 fade-in">
        <h1 className="text-3xl font-bold">Console d'Administration</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground">
                  <i className={`ph ${stat.icon} text-xl`}></i>
                </div>
                <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Validation */}
          <div className="glass rounded-[2rem] p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <i className="ph ph-stack text-amber-500"></i> Validation de Services
            </h2>
            <div className="space-y-4">
              {pendingServices.map(s => (
                <div key={s.id} className="p-4 rounded-2xl bg-white/5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-all">
                      <i className="ph ph-image"></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{s.title}</h3>
                      <p className="text-xs text-muted-foreground">Par {s.provider} • {s.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                      <i className="ph ph-check"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                      <i className="ph ph-x"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/services" className="text-xs font-bold text-center block text-muted-foreground hover:text-foreground">Voir tous les services en attente</Link>
          </div>

          {/* Platform Health */}
          <div className="glass rounded-[2rem] p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <i className="ph ph-heartbeat text-red-500"></i> Santé de la Plateforme
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Uptime Serveurs</span>
                  <span className="font-bold text-green-500">99.98%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[99.9%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Temps de réponse moyen</span>
                  <span className="font-bold">240ms</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[80%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
