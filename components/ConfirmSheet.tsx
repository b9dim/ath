"use client";

import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "@/components/PrimaryButton";

type ConfirmSheetProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmSheet({
  open,
  title,
  description,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  onConfirm,
  onCancel
}: ConfirmSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#2F3E3A]/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="w-full max-w-[420px] rounded-t-3xl border border-[#C1D4CF] bg-[#F5F5F5] px-6 pb-8 pt-6 shadow-[0_20px_40px_rgba(7,132,119,0.15)]"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#C1D4CF]" />
            <h3 className="text-lg font-semibold text-[#2F3E3A]">{title}</h3>
            {description && <p className="mt-2 text-sm text-[#4C5A56]">{description}</p>}
            <div className="mt-6 flex flex-col gap-3">
              <PrimaryButton onClick={onConfirm}>{confirmText}</PrimaryButton>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-2xl border border-[#C1D4CF] bg-white px-4 py-3 text-sm font-semibold text-[#2F3E3A] transition hover:bg-[#C1D4CF]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#078477]/30"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

