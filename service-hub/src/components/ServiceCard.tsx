import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    provider: string;
    providerImage: string;
    price: number;
    rating: number;
    reviews: number;
    category: string;
    image: string;
    isPro?: boolean;
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.id}`} className="group glass rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300 border-transparent hover:border-white/10 flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {service.isPro && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase rounded-full shadow-lg">
            Pro
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <img src={service.providerImage} alt={service.provider} className="w-6 h-6 rounded-full" />
          <span className="text-xs font-medium text-muted-foreground">{service.provider}</span>
        </div>
        
        <h3 className="text-sm font-bold leading-tight mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
          {service.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-4">
          <i className="ph-fill ph-star text-amber-400 text-xs"></i>
          <span className="text-xs font-bold">{service.rating}</span>
          <span className="text-xs text-muted-foreground">({service.reviews})</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">À partir de</span>
          <span className="text-lg font-extrabold">{service.price}€</span>
        </div>
      </div>
    </Link>
  );
}
