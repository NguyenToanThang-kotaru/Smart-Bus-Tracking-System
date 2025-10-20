import { ArrowLeft } from "lucide-react";

export default function BackButton({ url }  ) {
  return (
    <button
      onClick={() => window.location.href = url}
      className="flex items-center gap-3 p-2 text-white text-2xl font-bold"
    >
      <ArrowLeft className="w-8 h-8" strokeWidth={3} />
      <span className="cursor-pointer">Quay lại</span>
    </button>
  );
}
