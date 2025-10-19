// @ts-nocheck
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroSplash({ show, onDone }: { show: boolean; onDone: () => void }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 2600); // auto-hide after 2.6s
    return () => clearTimeout(t);
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onDone}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="button"
          aria-label="Skip intro"
          title="Click to skip"
        >
          {/* Transparent overlay; your shader shows behind */}
          <div className="absolute inset-0 bg-black/0" />
          <motion.div
            className="relative text-center px-6"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="text-xs tracking-[0.4em] uppercase text-white/80 mb-3">
              Portfolio
            </div>
            <h1 className="intro-name select-none">Santosh Adhikari</h1>
            <motion.div
              className="mt-3 text-white/70 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Building reliable, clean software.
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
