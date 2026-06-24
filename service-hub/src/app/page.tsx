import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const categories = [
    { name: "Développement Web", icon: "ph-code", color: "#6366f1", count: "1,200+" },
    { name: "Design Graphique", icon: "ph-palette", color: "#a855f7", count: "850+" },
    { name: "Marketing Digital", icon: "ph-megaphone", color: "#06b6d4", count: "600+" },
    { name: "Rédaction & Traduction", icon: "ph-pen-nib", color: "#10b981", count: "450+" },
    { name: "Vidéo & Animation", icon: "ph-video-camera", color: "#f59e0b", count: "300+" },
    { name: "Musique & Audio", icon: "ph-music-notes", color: "#ec4899", count: "200+" },
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="hero-glow"></div>
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-bold uppercase tracking-wider text-indigo-400 mb-6">
              Nouveau : Découvrez les services IA
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-[1.1]">
              Trouvez le talent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">parfait</span> pour vos projets.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Une marketplace premium pour connecter les entreprises avec les meilleurs freelances au monde. Qualité garantie, paiement sécurisé.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/explore" className="btn btn-primary px-8 py-4 text-lg">
                Explorer les services <i className="ph ph-arrow-right"></i>
              </Link>
              <Link href="/register" className="btn btn-secondary px-8 py-4 text-lg">
                Devenir prestataire
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-zinc-800">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">5,000+</span> prestataires nous font déjà confiance.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-[2rem]"></div>
            <div className="relative glass p-4 rounded-[2rem] shadow-2xl">
              <img 
                src="/marketplace_hero_image_1778840922367.png" 
                alt="Marketplace Platform" 
                className="w-full h-auto rounded-[1.5rem] object-cover"
              />
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <i className="ph-fill ph-check-circle text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Projets Terminés</p>
                    <p className="text-xl font-bold">12,480</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-zinc-950/50">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Parcourir par catégorie</h2>
              <p className="text-muted-foreground">Découvrez les talents par expertise.</p>
            </div>
            <Link href="/explore" className="text-indigo-400 font-semibold hover:underline flex items-center gap-2">
              Voir toutes les catégories <i className="ph ph-arrow-right"></i>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-2xl glass hover:bg-white/5 transition-all duration-300 cursor-pointer border-transparent hover:border-white/10"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                >
                  <i className={`ph-fill ${cat.icon} text-2xl`}></i>
                </div>
                <h3 className="text-sm font-bold mb-1">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.count} services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20">
        <div className="container grid lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
            <i className="ph-fill ph-shield-check text-4xl text-indigo-500 mb-6"></i>
            <h3 className="text-xl font-bold mb-4">Paiements sécurisés</h3>
            <p className="text-muted-foreground">Vos fonds sont protégés et ne sont libérés qu'une fois le travail validé par vos soins.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
            <i className="ph-fill ph-chat-centered-text text-4xl text-purple-500 mb-6"></i>
            <h3 className="text-xl font-bold mb-4">Support 24/7</h3>
            <p className="text-muted-foreground">Notre équipe d'experts est disponible à tout moment pour vous aider dans vos projets.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
            <i className="ph-fill ph-lightning text-4xl text-cyan-500 mb-6"></i>
            <h3 className="text-xl font-bold mb-4">Livraison rapide</h3>
            <p className="text-muted-foreground">Trouvez des prestataires capables de livrer en quelques heures pour vos urgences.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
