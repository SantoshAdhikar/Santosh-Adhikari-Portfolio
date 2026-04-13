import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "developer" | "customer-service";

const customerExperience = [
  {
    company: "Hustler Casino",
    location: "1000 W Redondo Beach Blvd, Gardena, CA 90247",
    role: "Cage Cashier",
    dates: "02/01/2026 – 03/17/2026",
    details: [
      "Handled cash transactions accurately and efficiently in a fast-paced casino environment.",
      "Processed chips and cash exchanges, balanced drawers, and followed cage procedures and security standards.",
      "Provided direct customer service while maintaining accuracy, speed, and professionalism.",
      "Resigned after giving one week notice due to an unstable schedule and difficulty maintaining rest while working night shifts.",
    ],
  },
  {
    company: "Uber / Lyft / DoorDash",
    location: "California",
    role: "Driver / Delivery Driver",
    dates: "2019 – Present",
    details: [
      "Provided transportation and delivery services while maintaining safety, punctuality, and customer satisfaction.",
      "Managed routes, time, and customer communication in a flexible, fast-moving environment.",
      "Built strong customer service skills through direct interaction with riders and delivery customers.",
    ],
  },
  {
    company: "Nanking Indian Restaurant",
    location: "18349 Pioneer Blvd, Artesia, CA 90701",
    role: "Waiter / Cashier",
    dates: "11/27/2018 – 06/12/2019",
    details: [
      "Served customers, handled front-of-house support, processed payments, and managed cashier duties.",
      "Worked in a busy restaurant setting while maintaining accuracy, professionalism, and customer satisfaction.",
    ],
  },
  {
    company: "7-Eleven",
    location: "18532 Yorba Linda Blvd, Yorba Linda, CA 92886",
    role: "Cashier",
    dates: "08/01/2019 – 08/27/2020",
    details: [
      "Handled customer transactions, stocking, register operations, and general store support.",
      "Maintained store cleanliness and helped customers in a fast-paced retail environment.",
      "Left the position because of family safety concerns during the COVID period with a baby due in September.",
    ],
  },
];

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-white bg-white text-black"
          : "border-white/25 text-white hover:bg-white hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProfileMode() {
  const [mode, setMode] = useState<Mode>("developer");

  return (
    <motion.section
      id="profile-mode"
      className="scroll-mt-24 py-12 md:py-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                Choose Profile
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                View My Background
              </h2>
              <p className="mt-3 max-w-3xl text-white/80">
                I’m applying to both software roles and customer-facing roles, so this section
                lets you quickly view the experience that fits the position.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <PillButton
                active={mode === "developer"}
                onClick={() => setMode("developer")}
              >
                Developer
              </PillButton>

              <PillButton
                active={mode === "customer-service"}
                onClick={() => setMode("customer-service")}
              >
                Customer Service
              </PillButton>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {mode === "developer" ? (
              <motion.div
                key="developer"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.25 }}
                className="mt-8 grid gap-6 md:grid-cols-2"
              >
                <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                  <h3 className="text-lg font-semibold text-white">Developer Focus</h3>
                  <p className="mt-3 text-white/80 leading-relaxed">
                    Full-stack developer focused on building practical web applications
                    with React, Spring Boot, SQL, and cloud tools. I enjoy building
                    clean user experiences backed by reliable backend systems.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                  <h3 className="text-lg font-semibold text-white">Best Fit Roles</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {[
                      "Software Engineer",
                      "Full-Stack Developer",
                      "Backend Developer",
                      "Frontend Developer",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="customer-service"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.25 }}
                className="mt-8"
              >
                <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                  <h3 className="text-lg font-semibold text-white">
                    Customer Service Focus
                  </h3>
                  <p className="mt-3 max-w-4xl text-white/80 leading-relaxed">
                    Experienced in cashiering, customer service, restaurant service,
                    rideshare, retail, and delivery support. Strong background in
                    handling customers, managing transactions, staying organized
                    under pressure, and working in fast-paced environments.
                  </p>
                </div>

                <div className="mt-6 grid gap-6">
                  {customerExperience.map((job) => (
                    <div
                      key={`${job.company}-${job.dates}`}
                      className="rounded-xl border border-white/10 bg-black/20 p-5"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                          <p className="text-white/85">{job.company}</p>
                          <p className="text-sm text-white/60">{job.location}</p>
                        </div>
                        <p className="text-sm text-white/70">{job.dates}</p>
                      </div>

                      <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
                        {job.details.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-5">
                  <h3 className="text-lg font-semibold text-white">Best Fit Roles</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {[
                      "Customer Service",
                      "Cashier",
                      "Retail Associate",
                      "Front Desk",
                      "Cage Cashier",
                      "Restaurant Service",
                      "Delivery Driver",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}