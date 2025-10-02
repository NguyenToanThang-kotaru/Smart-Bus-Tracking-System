// src/components/BreakpointIndicator.jsx
export default function BreakpointIndicator() {
  return (
    <div className="fixed bottom-2 right-2 z-50 px-3 py-1 rounded-md text-white text-sm font-bold bg-black/60">
      <span className="block sm:hidden">xs (&lt;640px)</span>
      <span className="hidden sm:block md:hidden">sm (≥640px)</span>
      <span className="hidden md:block lg:hidden">md (≥768px)</span>
      <span className="hidden lg:block xl:hidden">lg (≥1024px)</span>
      <span className="hidden xl:block 2xl:hidden">xl (≥1280px)</span>
      <span className="hidden 2xl:block">2xl (≥1536px)</span>
    </div>
  );
}
