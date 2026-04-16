import Link from 'next/link';
import { Home, Medal, Search, Trophy } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-card border-b border-card-border">

        <Link href="/" className="text-2xl font-bold text-accent hover:opacity-60 transition-opacity">
            StatsLoL
        </Link>

        <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Home size={20} />
                <span className="font-medium">Accueil</span>
            </Link>
            
            <Link href="/recherche" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Search size={20} />
                <span className="font-medium">Rechercher</span>
            </Link>

            <Link href="/classement" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Trophy size={20} />
                <span className="font-medium">Classement</span>
            </Link>

            <Link href="/riven" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Medal size={20} />
                <span className="font-medium">Riven</span>
            </Link>
        </div>

    </nav>
  );
}