import { Plus } from "lucide-react";

export default function AddButton({ text = "Thêm mới", onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center max-h-15 min-w-50 gap-2 bg-mainBlue text-white text-2xl font-bold px-4 py-2 rounded-md hover:bg-mainYellow hover:text-mainBlue transition-colors duration-200"
    >
      <Plus className="w-8 h-8" />
      {text }
    </button>
  );
}
