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
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="w-full max-w-[420px] rounded-t-ios-lg bg-white/70 px-6 pb-8 pt-6 shadow-lg backdrop-blur-xl backdrop-saturate-150"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-black/10" />
            <h3 className="mb-2 text-lg font-semibold text-label">{title}</h3>
            {description && <p className="mb-6 text-sm text-slabel">{description}</p>}
            <div className="flex flex-col gap-3">
              <PrimaryButton onClick={onConfirm}>{confirmText}</PrimaryButton>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full bg-white/60 px-4 py-3 text-sm font-semibold text-red-500 shadow-inner shadow-white/40 transition hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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

