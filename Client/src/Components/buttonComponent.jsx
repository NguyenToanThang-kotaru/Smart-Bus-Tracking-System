import add from "@/assets/Icon/addWhite.png"

export default function AddButton({ text = "Thêm mới", onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center max-h-15 min-w-45 gap-4 bg-mainBlue text-white text-xl font-semibold px-5 py-2 rounded-md
        hover:bg-mainYellow hover:text-mainBlue transition-colors duration-200"
    >
      <img src={add} className="w-6 h-6" />
      {text}
    </button>
  );
}
