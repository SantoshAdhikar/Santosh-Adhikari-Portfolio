import { motion } from "framer-motion";

const text = "LOOKING FOR JOB";

export default function JobBanner() {
  const items = Array.from({ length: 18 }, () => text);

  return (
    <section className="py-2 overflow-hidden">
      <div className="border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <motion.div
          className="flex w-max gap-6 py-3"
          animate={{ x: ["-5%", "-50%"] }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="text-lg md:text-2xl font-extrabold tracking-[0.2em] whitespace-nowrap rainbow-text px-2"
            >
              {item} <span className="text-white/30">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}