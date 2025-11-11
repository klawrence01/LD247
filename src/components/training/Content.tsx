// src/components/training/Content.tsx
import React from "react";

type TrainingContentProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function TrainingContent({
  title = "Training Module",
  children,
}: TrainingContentProps) {
  return (
    <div className="rounded-xl border border-slate-200/10 bg-slate-900/40 p-6">
      <h1 className="text-xl font-semibold mb-3 text-white">{title}</h1>
      <div className="text-sm text-slate-200">
        {children || (
          <p>
            Training content coming soon. This component exists so Vercel can
            build the dashboard without missing modules.
          </p>
        )}
      </div>
    </div>
  );
}
