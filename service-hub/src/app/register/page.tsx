"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [role, setRole] = useState<'client' | 'provider'>('client');

  return (
    <div className="container py-12 flex items-center justify-center min-h-[80vh]">
      <div className="auth-card glass fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
          <p className="text-muted-foreground">Rejoignez la communauté ServiceHub dès aujourd'hui.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div 
            className={`role-card ${role === 'client' ? 'active' : ''}`}
            onClick={() => setRole('client')}
          >
            <div className="text-2xl mb-2">
              <i className={`ph-fill ph-user ${role === 'client' ? 'text-primary' : 'text-muted-foreground'}`}></i>
            </div>
            <p className="font-bold text-sm">Client</p>
            <p className="text-[10px] text-muted-foreground">Je veux recruter</p>
          </div>
          <div 
            className={`role-card ${role === 'provider' ? 'active' : ''}`}
            onClick={() => setRole('provider')}
          >
            <div className="text-2xl mb-2">
              <i className={`ph-fill ph-briefcase ${role === 'provider' ? 'text-primary' : 'text-muted-foreground'}`}></i>
            </div>
            <p className="font-bold text-sm">Prestataire</p>
            <p className="text-[10px] text-muted-foreground">Je propose mes services</p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="form-group">
            <label className="form-label">Nom complet</label>
            <input type="text" className="form-input" placeholder="Jean Dupont" required />
          </div>
          <div className="form-group">
            <label className="form-label">Adresse Email</label>
            <input type="email" className="form-input" placeholder="jean@exemple.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input type="password" className="form-input" placeholder="••••••••" required />
          </div>
          
          <button type="submit" className="btn btn-primary w-full py-4 mt-4">
            S'inscrire en tant que {role === 'client' ? 'Client' : 'Prestataire'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Déjà un compte ? <Link href="/login" className="text-primary font-bold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
