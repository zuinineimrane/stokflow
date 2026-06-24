"use client";
import { useParams } from 'next/navigation';
import { SERVICES } from '@/lib/data';
import Link from 'next/link';

export default function ServiceDetails() {
  const params = useParams();
  const id = Number(params.id);
  const service = SERVICES.find(s => s.id === id) || SERVICES[0];

  return (
    <div className="container py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 inline-block">{service.category}</span>
            <h1 className="text-4xl font-extrabold mb-6 leading-tight">{service.title}</h1>
            
            <div className="flex items-center gap-6 pb-8 border-b border-white/5">
              <div className="flex items-center gap-3">
                <img src={service.providerImage} alt="" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="text-sm font-bold">{service.provider}</p>
                  <p className="text-xs text-muted-foreground">Prestataire Vérifié</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <i className="ph-fill ph-star text-amber-400"></i>
                <span className="font-bold">{service.rating}</span>
                <span className="text-muted-foreground">({service.reviews} avis)</span>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-[2rem] overflow-hidden glass p-2">
            <img src={service.image} alt="" className="w-full h-full object-cover rounded-[1.8rem]" />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">À propos de ce service</h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Besoin d'un service de haute qualité ? Je vous propose une solution clé en main adaptée à vos besoins spécifiques. 
                Avec plus de 5 ans d'expérience dans le domaine, je garantis un résultat professionnel et moderne.
              </p>
              <p className="font-bold text-foreground">Ce qui est inclus dans cette offre :</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Conception personnalisée selon votre charte graphique</li>
                <li>Optimisation pour tous les supports (Desktop, Tablette, Mobile)</li>
                <li>Intégration des fonctionnalités avancées</li>
                <li>Support après-vente gratuit pendant 30 jours</li>
              </ul>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-8 pt-12 border-t border-white/5">
            <h2 className="text-2xl font-bold">Avis des clients ({service.reviews})</h2>
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="text-sm font-bold">Client Heureux {i}</p>
                        <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(s => <i key={s} className="ph-fill ph-star text-amber-400 text-xs"></i>)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "Travail exceptionnel ! Alex a compris exactement ce dont j'avais besoin et a livré le projet en avance. 
                    La communication était fluide et le résultat dépasse mes attentes. Je recommande vivement !"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Purchase Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 glass p-8 rounded-[2rem] shadow-2xl space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Prix du service</h3>
              <span className="text-3xl font-black text-indigo-400">{service.price}€</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <i className="ph ph-clock text-lg text-indigo-400"></i>
                <span>Livraison en 3 jours</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <i className="ph ph-arrows-counter-clockwise text-lg text-indigo-400"></i>
                <span>Révisions illimitées</span>
              </div>
            </div>

            <Link href={`/checkout/${service.id}`} className="btn btn-primary w-full py-5 text-lg">
              Continuer ({service.price}€)
            </Link>
            
            <Link href="/messages" className="btn btn-secondary w-full py-4">
              <i className="ph ph-chat-centered-dots"></i> Contacter le vendeur
            </Link>

            <div className="pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-4">Garantie ServiceHub</p>
              <div className="flex justify-center gap-4 text-muted-foreground/30 text-2xl">
                <i className="ph-fill ph-shield-check"></i>
                <i className="ph-fill ph-credit-card"></i>
                <i className="ph-fill ph-lock"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
