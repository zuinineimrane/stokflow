"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function NewService() {
  const [step, setStep] = useState(1);

  return (
    <div className="container py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/dashboard" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all">
          <i className="ph ph-arrow-left"></i>
        </Link>
        <h1 className="text-3xl font-bold">Publier une nouvelle offre</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-muted-foreground'}`}>
              {s}
            </div>
            <div className={`h-1 flex-1 rounded-full ${step > s ? 'bg-indigo-500' : 'bg-zinc-800'}`}></div>
          </div>
        ))}
      </div>

      <div className="glass p-10 rounded-[2rem] fade-in">
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-6">Informations de base</h2>
              <div className="form-group">
                <label className="form-label">Titre de votre service</label>
                <input type="text" className="form-input text-lg" placeholder="Ex: Je vais créer votre logo professionnel en 24h" />
                <p className="text-[10px] text-muted-foreground mt-2">Un titre clair et accrocheur aide les clients à vous trouver.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <select className="form-input">
                    <option>Sélectionner une catégorie</option>
                    <option>Développement Web</option>
                    <option>Design Graphique</option>
                    <option>Marketing Digital</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Prix de départ (€)</label>
                  <input type="number" className="form-input" placeholder="50" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary px-10" onClick={() => setStep(2)}>Suivant <i className="ph ph-arrow-right"></i></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-6">Description & Médias</h2>
              <div className="form-group">
                <label className="form-label">Description détaillée</label>
                <textarea className="form-input min-h-[200px]" placeholder="Décrivez votre service, ce qui est inclus, votre processus..."></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Image de couverture</label>
                <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-indigo-500/50 transition-colors cursor-pointer bg-zinc-900/50">
                  <i className="ph ph-cloud-arrow-up text-5xl text-muted-foreground mb-4"></i>
                  <p className="font-bold">Cliquez pour télécharger une image</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou WEBP (Max 5MB)</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="btn btn-secondary px-10" onClick={() => setStep(1)}><i className="ph ph-arrow-left"></i> Précédent</button>
              <button className="btn btn-primary px-10" onClick={() => setStep(3)}>Suivant <i className="ph ph-arrow-right"></i></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 space-y-6">
            <div className="w-24 h-24 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto text-5xl">
              <i className="ph-fill ph-check-circle"></i>
            </div>
            <h2 className="text-3xl font-bold">Prêt à publier ?</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Votre service sera visible par des milliers de clients potentiels dès que vous cliquerez sur le bouton ci-dessous.
            </p>
            <div className="pt-8 flex justify-center gap-4">
              <button className="btn btn-secondary px-10" onClick={() => setStep(2)}>Réviser</button>
              <button className="btn btn-primary px-12" onClick={() => alert('Service publié !')}>Publier maintenant</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
