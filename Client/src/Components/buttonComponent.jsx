import add from "@/assets/Icon/addWhite.png"

export default function AddButton({ text = "Thêm mới", onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-fit bg-mainBlue text-white text-base font-semibold px-5 py-2 rounded-[15px] whitespace-nowrap gap-2 
        hover:bg-mainYellow hover:text-mainBlue transition-colors duration-200"
    >
      <img src={add} className="w-5 h-5" alt="Thêm mới" />
      {text}
    </button>
  );
}