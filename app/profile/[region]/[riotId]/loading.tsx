import { Card } from "@/components/Card";

export default function Loading() {
  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto px-4 py-8 gap-6 animate-pulse">

      {/* Skeleton Header */}
      <Card className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-lg bg-zinc-800 shrink-0" />
        <div className="flex flex-col gap-4 w-full items-center md:items-start">
          <div className="h-8 bg-zinc-800 rounded w-64" />
          <div className="flex gap-3">
            <div className="h-6 w-16 bg-zinc-800 rounded" />
            <div className="h-6 w-20 bg-zinc-800 rounded" />
          </div>
        </div>
      </Card>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Loading Stats" noPadding>
            <div className="h-32 bg-zinc-900 w-full" />
          </Card>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card title="Fetching Matches" noPadding>
            <div className="flex flex-col divide-y divide-card-border">
               {[1, 2, 3].map(i => (
                 <div key={i} className="h-20 bg-zinc-900 w-full" />
               ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
