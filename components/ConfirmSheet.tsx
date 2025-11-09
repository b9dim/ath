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
          className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(6,11,25,0.45)] backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="glass-card w-full max-w-[420px] rounded-t-[32px] border-transparent bg-[rgba(var(--card-elevated),0.9)] px-7 pb-8 pt-7 shadow-[0_28px_60px_rgba(var(--shadow),0.24)]"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[rgba(255,255,255,0.35)] dark:bg-[rgba(255,255,255,0.2)]" />
            <h3 className="mb-2 text-lg font-semibold text-label">{title}</h3>
            {description && <p className="mb-6 text-sm text-[rgba(var(--label),0.65)]">{description}</p>}
            <div className="flex flex-col gap-3">
              <PrimaryButton onClick={onConfirm}>{confirmText}</PrimaryButton>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full bg-[rgba(var(--card),0.72)] px-4 py-3 text-sm font-semibold text-red-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-300 hover:bg-[rgba(var(--card-elevated),0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(248,113,113,0.35)] focus-visible:ring-offset-0 dark:text-red-300"
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

