import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[70vh] px-4">
      <main className="flex w-full max-w-xl flex-col items-center justify-center gap-8">
        
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Stats<span className="text-accent">LOL</span>
          </h1>
          <p className="text-sm md:text-base text-white/50">
            Professional League of Legends Match History & Analytics
          </p>
        </div>

        <div className="w-full">
          <SearchBar />
        </div>
      </main>
    </div>
  );
}
