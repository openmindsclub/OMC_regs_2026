import React, { useEffect } from "react";
import { CheckCircle2, AlertOctagon, X } from "lucide-react";

export type ModalType = "success" | "error";

export interface StatusModalProps {
  isOpen: boolean;
  type: ModalType;
  title?: string;
  message: string;
  details?: string[];
  actionLabel?: string;
  onClose: () => void;
}

export default function StatusModal({
  isOpen,
  type,
  title,
  message,
  details,
  actionLabel,
  onClose,
}: StatusModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className={`relative w-full max-w-sm rounded-xl border bg-[#0d131a] p-6 shadow-2xl transition-all duration-200 ${
          isSuccess
            ? "border-[#00f66a]/60 shadow-[0_0_35px_rgba(0,246,106,0.25)]"
            : "border-[#f54255]/60 shadow-[0_0_35px_rgba(245,66,85,0.25)]"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3.5 top-3.5 cursor-pointer text-gray-400 transition-colors hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full border ${
              isSuccess
                ? "border-[#00f66a]/40 bg-[#00f66a]/10 text-[#00f66a]"
                : "border-[#f54255]/40 bg-[#f54255]/10 text-[#f54255]"
            }`}
          >
            {isSuccess ? <CheckCircle2 size={32} /> : <AlertOctagon size={32} />}
          </div>

          <span
            className={`font-jakarta text-[10px] uppercase tracking-widest ${
              isSuccess ? "text-[#00f66a]/80" : "text-[#f54255]/80"
            }`}
          >
            {isSuccess ? "System Status: Verified" : "System Alert: Exception"}
          </span>

          <h3 className="mt-1 font-jakarta text-lg font-bold tracking-wide text-white">
            {title || (isSuccess ? "Registration Complete" : "Submission Failed")}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-gray-300">{message}</p>

          {details && details.length > 0 && (
            <div className="mt-3 w-full rounded border border-red-900/30 bg-red-950/20 p-2.5 text-left font-mono text-[11px] text-red-300">
              <ul className="list-inside list-disc space-y-1">
                {details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 w-full">
            <button
              type="button"
              onClick={onClose}
              className={`w-full cursor-pointer rounded-lg py-2.5 font-jakarta text-xs font-bold uppercase tracking-wider transition-all duration-150 active:scale-95 ${
                isSuccess
                  ? "bg-[#00f66a] text-black shadow-[0_0_15px_rgba(0,246,106,0.4)] hover:bg-[#00f66a]/90 hover:shadow-[0_0_20px_rgba(0,246,106,0.6)]"
                  : "border border-[#f54255] bg-[#f54255]/20 text-[#f54255] hover:bg-[#f54255]/30 hover:shadow-[0_0_15px_rgba(245,66,85,0.4)]"
              }`}
            >
              {actionLabel || (isSuccess ? "Acknowledge" : "Dismiss")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
