import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SlideToggle({ title = "Xem thêm", children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-4">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center font-bold text-[#2A435D]"
      >
        {title}
        <span className="text-xl">{open ? "▲" : "▼"}</span>
      </button>

      {/* Nội dung trượt lên/xuống */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2"
          >
            <div className="p-2 text-sm text-gray-700">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
