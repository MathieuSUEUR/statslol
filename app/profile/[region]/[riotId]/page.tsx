import { Card } from "@/components/Card";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{
    region: string;
    riotId: string;
  }>;
}

async function getPlayer(region: string, riotId: string) {
  const decodedId = decodeURIComponent(riotId).trim();
  
  // On split par le DERNIER tiret pour éviter les problèmes si le pseudo contient un tiret
  const lastDashIndex = decodedId.lastIndexOf('-');
  if (lastDashIndex === -1) return null;

  const gameName = decodedId.substring(0, lastDashIndex).trim();
  const tagline = decodedId.substring(lastDashIndex + 1).trim();
  
  if (!gameName || !tagline) {
    return null;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001/api';
    const url = `${baseUrl}/players/search?gameName=${encodeURIComponent(gameName)}&tagline=${encodeURIComponent(tagline)}&region=${region}`;
    
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch player data (Status: ${res.status})`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching player:", error);
    throw error;
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;
  const account = await getPlayer(resolvedParams.region, resolvedParams.riotId);

  if (!account) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto px-4 py-8 gap-6 w-full">
      
      {/* Profile Header Block */}
      <Card className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-lg bg-zinc-800 flex items-center justify-center border border-card-border shrink-0">
          <span className="text-4xl font-bold text-zinc-300">
            {account.gameName?.charAt(0)?.toUpperCase() || '?'}
          </span>
        </div>
        
        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-3xl font-bold text-white tracking-tight flex flex-wrap items-center gap-2 justify-center md:justify-start">
            {account.gameName}
            <span className="text-zinc-500 text-xl font-medium">#{account.tagLine || resolvedParams.riotId.split('-')[1]}</span>
          </h1>
          
          <div className="flex items-center gap-3 mt-3 justify-center md:justify-start">
             <span className="px-3 py-1 rounded bg-zinc-800 border border-card-border text-xs font-semibold text-zinc-300 uppercase">
                {resolvedParams.region}
             </span>
             {account.summonerLevel && (
               <span className="px-3 py-1 rounded bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
                  Level {account.summonerLevel}
               </span>
             )}
          </div>
        </div>
      </Card>

      {/* Grid Layout for Match History & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left col: Stats (WIP) */}
         <div className="lg:col-span-1 flex flex-col gap-6">
            <Card title="Ranked Solo" noPadding>
               <div className="flex flex-col items-center justify-center h-32 p-5">
                  <span className="text-zinc-500 text-sm">Unranked</span>
               </div>
            </Card>
         </div>

         {/* Right col: History (WIP) */}
         <div className="lg:col-span-2 flex flex-col gap-6">
            <Card title="Recent Matches" noPadding>
               <div className="flex flex-col divide-y divide-card-border">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 flex items-center px-5 transition-colors hover:bg-zinc-800/50">
                      <span className="text-zinc-500 font-medium text-sm">Match details available soon</span>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
