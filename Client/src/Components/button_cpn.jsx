import { Plus } from "lucide-react";

export default function AddButton({ text = "Thêm mới", onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-[#0A1D45] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#aeb4c1] transition-colors duration-200"
    >
      <Plus className="w-4 h-4" />
      {text}
    </button>
  );
}
