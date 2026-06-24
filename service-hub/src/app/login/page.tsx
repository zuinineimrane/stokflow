"use client";
import Link from 'next/link';

export default function Login() {
  return (
    <div className="container py-12 flex items-center justify-center min-h-[80vh]">
      <div className="auth-card glass fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Bon retour !</h1>
          <p className="text-muted-foreground">Connectez-vous pour gérer vos projets.</p>
        </div>

        <form className="space-y-4">
          <div className="form-group">
            <label className="form-label">Adresse Email</label>
            <input type="email" className="form-input" placeholder="jean@exemple.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input type="password" className="form-input" placeholder="••••••••" required />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-indigo-500" />
              <span className="text-muted-foreground">Se souvenir de moi</span>
            </label>
            <Link href="/forgot" className="text-xs text-primary hover:underline">Mot de passe oublié ?</Link>
          </div>

          <button type="submit" className="btn btn-primary w-full py-4">
            Se connecter
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#18181b] px-2 text-muted-foreground">Ou continuer avec</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="btn btn-secondary py-3 text-sm">
            <i className="ph-fill ph-google-logo text-xl"></i> Google
          </button>
          <button className="btn btn-secondary py-3 text-sm">
            <i className="ph-fill ph-github-logo text-xl"></i> GitHub
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Pas encore de compte ? <Link href="/register" className="text-primary font-bold hover:underline">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
