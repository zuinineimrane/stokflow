"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function IdentityVerification() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'pending'>('idle');

  return (
    <div className="container py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/dashboard/provider" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all">
          <i className="ph ph-arrow-left"></i>
        </Link>
        <h1 className="text-3xl font-bold">Vérification d'identité</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-10 rounded-[2rem] space-y-8">
            {status === 'idle' && (
              <>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Étape 1 : Document Officiel</h2>
                  <p className="text-muted-foreground text-sm">Téléchargez une copie lisible de votre carte d'identité, passeport ou permis de conduire.</p>
                </div>
                
                <div className="border-2 border-dashed border-border rounded-3xl p-16 text-center hover:border-indigo-500/50 transition-all cursor-pointer bg-zinc-900/50 group">
                  <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <i className="ph ph-identification-card text-4xl text-indigo-500"></i>
                  </div>
                  <p className="font-bold mb-2">Glissez votre document ici</p>
                  <p className="text-xs text-muted-foreground">Formats acceptés : PDF, JPG, PNG (Max 10MB)</p>
                  <button className="btn btn-secondary mt-8 text-sm px-8" onClick={() => setStatus('uploading')}>Sélectionner un fichier</button>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  <h2 className="text-xl font-bold">Étape 2 : Selfie de sécurité</h2>
                  <p className="text-muted-foreground text-sm">Nous avons besoin d'une photo de votre visage pour comparer avec le document.</p>
                  <button className="btn btn-secondary w-full py-4 flex items-center justify-center gap-3">
                    <i className="ph ph-camera text-xl"></i> Prendre une photo
                  </button>
                </div>
              </>
            )}

            {status === 'uploading' && (
              <div className="py-20 text-center space-y-6">
                <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
                <h3 className="text-xl font-bold">Analyse des documents...</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">Notre système IA vérifie la validité de vos documents. Cela prend généralement moins de 30 secondes.</p>
                {setTimeout(() => setStatus('pending'), 3000) && null}
              </div>
            )}

            {status === 'pending' && (
              <div className="py-20 text-center space-y-6 fade-in">
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto text-4xl">
                  <i className="ph-fill ph-check-circle"></i>
                </div>
                <h3 className="text-2xl font-bold">Vérification en cours</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">Vos documents ont été soumis avec succès. Notre équipe va les valider sous 24h.</p>
                <Link href="/dashboard/provider" className="btn btn-primary px-12 mt-8 inline-block">Retour au tableau de bord</Link>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[2rem] border-indigo-500/20 bg-indigo-500/5">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <i className="ph-fill ph-shield-check text-indigo-500"></i> Pourquoi vérifier ?
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-xs text-muted-foreground">
                <i className="ph ph-check text-indigo-500 font-bold"></i>
                <span>Badge de confiance sur votre profil</span>
              </li>
              <li className="flex gap-3 text-xs text-muted-foreground">
                <i className="ph ph-check text-indigo-500 font-bold"></i>
                <span>Priorité dans les résultats de recherche</span>
              </li>
              <li className="flex gap-3 text-xs text-muted-foreground">
                <i className="ph ph-check text-indigo-500 font-bold"></i>
                <span>Accès à des projets exclusifs "Verified Only"</span>
              </li>
            </ul>
          </div>

          <div className="glass p-8 rounded-[2rem] text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-2xl text-muted-foreground">
              <i className="ph ph-lock-key"></i>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vos données sont cryptées et stockées de manière sécurisée. Nous ne partageons jamais vos documents officiels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
