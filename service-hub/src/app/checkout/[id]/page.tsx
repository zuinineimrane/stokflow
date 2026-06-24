"use client";
import { useParams } from 'next/navigation';
import { SERVICES } from '@/lib/data';
import Link from 'next/link';
import { useState } from 'react';

export default function Checkout() {
  const params = useParams();
  const id = Number(params.id);
  const service = SERVICES.find(s => s.id === id) || SERVICES[0];
  const [method, setMethod] = useState<'card' | 'paypal'>('card');

  return (
    <div className="container py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-10 text-center">Finaliser votre commande</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-[2rem] space-y-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <i className="ph ph-credit-card text-indigo-400"></i> Méthode de paiement
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`role-card flex items-center justify-center gap-3 py-6 ${method === 'card' ? 'active' : ''}`}
                onClick={() => setMethod('card')}
              >
                <i className="ph ph-credit-card text-2xl"></i>
                <span className="font-bold">Carte Bancaire</span>
              </div>
              <div 
                className={`role-card flex items-center justify-center gap-3 py-6 ${method === 'paypal' ? 'active' : ''}`}
                onClick={() => setMethod('paypal')}
              >
                <i className="ph ph-paypal-logo text-2xl"></i>
                <span className="font-bold">PayPal</span>
              </div>
            </div>

            {method === 'card' ? (
              <form className="space-y-6 pt-4">
                <div className="form-group">
                  <label className="form-label">Nom sur la carte</label>
                  <input type="text" className="form-input" placeholder="JEAN DUPONT" />
                </div>
                <div className="form-group">
                  <label className="form-label">Numéro de carte</label>
                  <div className="relative">
                    <input type="text" className="form-input pr-12" placeholder="4242 4242 4242 4242" />
                    <i className="ph ph-lock-key absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Date d'expiration</label>
                    <input type="text" className="form-input" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVC</label>
                    <input type="text" className="form-input" placeholder="123" />
                  </div>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <i className="ph ph-paypal-logo text-6xl text-indigo-400 opacity-20"></i>
                <p className="text-muted-foreground">Vous allez être redirigé vers PayPal pour finaliser votre paiement en toute sécurité.</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 text-sm">
            <i className="ph ph-info text-xl"></i>
            <p>Votre paiement est protégé par le système d'escrow de ServiceHub. L'argent ne sera libéré qu'après validation du travail.</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-[2rem] space-y-6">
            <h2 className="text-xl font-bold">Récapitulatif</h2>
            
            <div className="flex gap-4 pb-6 border-b border-white/5">
              <img src={service.image} alt="" className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold truncate">{service.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">Par {service.provider}</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service</span>
                <span>{service.price}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frais de service</span>
                <span>{(service.price * 0.05).toFixed(2)}€</span>
              </div>
              <div className="h-px bg-white/5 my-2"></div>
              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-indigo-400">{(service.price * 1.05).toFixed(2)}€</span>
              </div>
            </div>

            <button 
              className="btn btn-primary w-full py-5 text-lg mt-4"
              onClick={() => alert('Paiement simulé réussi ! Redirection vers la messagerie...')}
            >
              Confirmer et Payer
            </button>
            
            <p className="text-[10px] text-center text-muted-foreground">
              En cliquant sur "Confirmer et Payer", vous acceptez les <Link href="/terms" className="underline">Conditions Générales</Link> de ServiceHub.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
