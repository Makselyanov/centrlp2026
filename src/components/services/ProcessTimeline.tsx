/**
 * Adaptive process timeline for service pages.
 *
 * Behavior:
 * - If any step title is long (> 45 chars) OR any description is long (> 120 chars),
 *   renders as a vertical timeline (no overflow, long text stays readable).
 * - Otherwise renders as a 4-col grid with connecting line.
 *
 * This mirrors the adaptive logic in BlogInfographic.ProcessStepsCard.
 */
interface ProcessStep {
  step: string;
  title: string;
  text: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export const ProcessTimeline = ({ steps }: ProcessTimelineProps) => {
  const longContent = steps.some(
    (s) => s.title.length > 45 || s.text.length > 120
  );

  if (longContent) {
    // Vertical timeline — handles long copy gracefully
    return (
      <ol className="relative space-y-6 border-l-2 border-dashed border-[#0096D6]/30 pl-8">
        {steps.map((item) => (
          <li key={item.step} className="relative">
            <span className="absolute -left-[42px] top-0 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-sm font-bold text-white shadow-sm ring-4 ring-white">
              {item.step}
            </span>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-slate-900 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  // Compact horizontal grid
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {steps.map((item) => (
        <div
          key={item.step}
          className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white text-sm font-bold shadow-sm">
            {item.step}
          </div>
          <h3 className="mb-2 text-lg font-bold text-slate-900 tracking-tight">{item.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
};
