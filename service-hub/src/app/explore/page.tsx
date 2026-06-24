"use client";
import { useState } from 'react';
import { SERVICES } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';

export default function Explore() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Développement Web', 'Design Graphique', 'Marketing Digital', 'Rédaction & Traduction', 'Vidéo & Animation'];

  const filteredServices = SERVICES.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || s.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-12 fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Explorer les services</h1>
        <p className="text-muted-foreground">Trouvez les meilleurs freelances pour donner vie à vos idées.</p>
      </div>

      {/* Search and Filters */}
      <div className="grid lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-3">
          <div className="relative">
            <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xl"></i>
            <input 
              type="text" 
              className="form-input pl-12 py-4 text-lg" 
              placeholder="Rechercher un service (ex: Next.js, Logo, SEO...)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div>
          <select 
            className="form-input py-4 appearance-none cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'Toutes les catégories' : cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm font-medium">
          <span className="text-foreground">{filteredServices.length}</span> services trouvés
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Trier par :</span>
          <select className="bg-transparent border-none text-xs font-bold focus:outline-none cursor-pointer">
            <option>Pertinence</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Mieux notés</option>
          </select>
        </div>
      </div>

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center glass rounded-[2rem]">
          <div className="text-6xl mb-6 text-muted-foreground/20">
            <i className="ph ph-mask-sad"></i>
          </div>
          <h2 className="text-2xl font-bold mb-2">Aucun service trouvé</h2>
          <p className="text-muted-foreground">Essayez d'ajuster vos filtres ou votre recherche.</p>
          <button 
            className="btn btn-secondary mt-8"
            onClick={() => { setSearch(''); setCategory('All'); }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
