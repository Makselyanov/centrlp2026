/**
 * Compact stat row used to break up text walls with numeric accents.
 * Not a dense data-viz — it's a visual pause between text sections.
 */
interface Stat {
  value: string;
  label: string;
}

interface StatBandProps {
  stats: Stat[];
}

export const StatBand = ({ stats }: StatBandProps) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-[#0096D6]/[0.03] to-[#44B78B]/[0.04] p-6 text-center shadow-sm"
      >
        <div className="mb-2 text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#0096D6] to-[#44B78B] bg-clip-text text-transparent">
          {stat.value}
        </div>
        <div className="text-sm font-medium text-slate-600">{stat.label}</div>
      </div>
    ))}
  </div>
);
