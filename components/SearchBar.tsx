"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';

const REGIONS = [
  { id: 'euw1', label: 'EUW' },
  { id: 'na1', label: 'NA' },
  { id: 'kr', label: 'KR' },
];

export function SearchBar() {
  const router = useRouter();
  const [riotId, setRiotId] = useState('');
  const [region, setRegion] = useState('euw1');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riotId) return;

    let formattedId = riotId.trim();
    if (formattedId.includes('#')) {
      // Nettoyage des espaces autour du # (ex: "Nom # 1234" -> "Nom-1234")
      const parts = formattedId.split('#');
      formattedId = `${parts[0].trim()}-${parts[1].trim()}`;
    } else if (formattedId.includes('-')) {
      // Déjà au format URL, on s'assure juste que c'est propre
      const lastDash = formattedId.lastIndexOf('-');
      formattedId = `${formattedId.substring(0, lastDash).trim()}-${formattedId.substring(lastDash + 1).trim()}`;
    }
    
    router.push(`/profile/${region}/${encodeURIComponent(formattedId)}`);

  };

  return (
    <form 
      onSubmit={handleSearch}
      className="relative flex items-center w-full bg-card rounded-lg border border-card-border focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all duration-200 overflow-hidden"
      style={{ height: '56px' }}
    >
      <div className="relative border-r border-card-border h-full">
        <select 
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="h-full appearance-none bg-transparent py-0 pl-4 pr-10 text-white/80 font-semibold focus:outline-none cursor-pointer hover:text-white transition-colors text-sm"
        >
          {REGIONS.map(r => (
            <option key={r.id} value={r.id} className="bg-card text-white">
              {r.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
      </div>

      <input
        type="text"
        value={riotId}
        onChange={(e) => setRiotId(e.target.value)}
        placeholder="GameName#Tagline"
        className="flex-1 bg-transparent h-full px-5 text-white placeholder:text-white/40 focus:outline-none text-base"
      />

      <button 
        type="submit"
        className="h-full px-6 flex items-center justify-center bg-accent hover:bg-blue-500 transition-colors text-white"
      >
        <Search size={18} />
      </button>
    </form>
  );
}
