"use client";
import { motion } from "framer-motion";
import { usePageTransition } from "@/components/TransitionProvider";
import WaveText from "@/components/WaveText";
import AnimatedLink from "@/components/AnimatedLink";
import { useState } from "react";

export default function Home() {
  const { leaving } = usePageTransition();
  const [showInventory, setShowInventory] = useState(false);

  return (
    <motion.main
      initial={{
        x: "100%",
      }}
      animate={{
        x: leaving ? "-50%" : 0,
        filter: leaving ? "blur(12px)" : "blur(0px)",
      }}
      transition={{
        duration: 0.55,
        ease: [0.65, 0, 0.35, 1],
      }}
      className="animated-bg h-screen text-black overflow-hidden"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <motion.div
        animate={{
          x: showInventory ? "-500px" : "0vw",
        }}
        transition={{
          duration: 0.6,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="flex w-max items-start"
      >
        <div className="w-screen min-w-screen shrink-0">
          <motion.div
            initial={{
              y: 80,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
              duration: 0.35,
            }}
            className="p-8 flex justify-between items-start"
          >
            <div>
              <h1 className="text-5xl font-bold tracking-tight">
                <WaveText text="Study Island" /> <span>🏝️</span>
              </h1>

              <p className="mt-2 text-lg text-[#666]">
                Welcome back, Yassin!
              </p>
            </div>

            <div className="bg-[#ffa936] rounded-[20px] px-6 py-4 shadow-[4px_4px_0px_0px_black] hover:scale-105 transition">
              <p className="font-bold text-xl">
                ⭐️ Level 5
              </p>

              <p>
                🔥 7 day streak
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{
              y: 80,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.35,
            }}
            className="mt-12 px-8 grid grid-cols-3 gap-8"
          >
            <AnimatedLink
              href="/homework"
              className="bg-[#87DD3B] rounded-[20px] p-8 h-152 shadow-[6px_6px_0px_0px_black] border-4 border-black transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:-translate-y-2 hover:rotate-1 hover:scale-[1.03] active:-translate-y-1 active:shadow-none animate-[float_4s_ease-in-out_infinite]"
            >
              <div className="text-7xl">
                📚
              </div>

              <h2 className="text-3xl font-bold mt-6">
                Homework
              </h2>

              <p className="mt-2">
                4 tasks remaining...
              </p>
            </AnimatedLink>

            <div className="col-span-2 flex flex-col gap-8">
              <AnimatedLink
                href="/timer"
                className="bg-[#FFA836] rounded-[20px] p-8 h-72 shadow-[6px_6px_0px_0px_black] border-4 border-black transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:-translate-y-2 hover:rotate-1 hover:scale-[1.03] active:-translate-y-1 active:shadow-none animate-[float_4s_ease-in-out_infinite]"
              >
                <div className="text-7xl">
                  ⏰
                </div>

                <h2 className="text-3xl font-bold mt-6">
                  Focus Room
                </h2>

                <p className="mt-2">
                  Start a study session
                </p>
              </AnimatedLink>

              <AnimatedLink
                href="/grades"
                className="bg-[#FF8A6E] rounded-[20px] p-8 h-72 shadow-[6px_6px_0px_0px_black] border-4 border-black transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:-translate-y-2 hover:rotate-1 hover:scale-[1.03] active:-translate-y-1 active:shadow-none animate-[float_4s_ease-in-out_infinite]"
              >
                <div className="text-7xl">
                  🏆
                </div>

                <h2 className="text-3xl font-bold mt-6">
                  Grades
                </h2>

                <p className="mt-2">
                  View your grades.
                </p>
              </AnimatedLink>
            </div>
          </motion.div>

          <motion.div
            initial={{
              y: 80,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 1.5,
              duration: 0.35,
            }}
            className="mt-12 mx-8 bg-black text-white rounded-[20px] p-8 flex items-center justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold">
                Your Study Buddy
              </h2>

              <p className="text-[fdd9a8] mt-2">
                Keep going! Your tree is growing! 🌳
              </p>
            </div>

            <div className="text-8xl">
              🧑‍🎓
            </div>
          </motion.div>
        </div>

        <div
          onMouseEnter={() => setShowInventory(true)}
          onMouseLeave={() => setShowInventory(false)}
          className="w-[500px] min-w-[500px] h-screen flex items-center justify-center pt-30 p-8 shrink-0 -ml-10"
        >
          <AnimatedLink
            href="/Inventory"
            className="bg-[#87DD3B] rounded-[20px] p-8 h-152 w-[500px] shadow-[6px_6px_0px_0px_black] border-4 border-black transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:-translate-y-2 hover:rotate-1 hover:scale-[1.03] active:-translate-y-1 active:shadow-none animate-[float_4s_ease-in-out_infinite]"
          >
            <div className="text-7xl">
              📦
            </div>

            <h2 className="text-3xl font-bold mt-6">
              Inventory
            </h2>

            <p className="mt-2">
              Check what you have.
            </p>
          </AnimatedLink>
        </div>
      </motion.div>
    </motion.main>
  );
}
