"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePageTransition } from "@/components/TransitionProvider";
import WaveText from "@/components/WaveText";
import AnimatedLink from "@/components/AnimatedLink";
import { useState } from "react";
import { Flame, Package, Star, TreePalm, Trophy, LibraryBig, AlarmClockCheck, User, Sparkles } from "lucide-react"
import ProfileTest from "@/components/ProfileTest";
import AuthButtons from "@/components/AuthButtons";
import { useSession } from "next-auth/react";

export default function Home() {
  const { leaving } = usePageTransition();
  const [showInventory, setShowInventory] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();

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
      className="animated-bg h-screen text-black"
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
              <h1 className="flex items-center text-5xl font-bold tracking-tight">
                <TreePalm size={32} strokeWidth={2.5}/><WaveText text="  Study Island" />
              </h1>

              <p className="mt-2 text-lg text-[#666]">
                Welcome back, <ProfileTest/>!
              </p>
            </div>
            <div className="flex flex-col gap-4 items-end">
            <AuthButtons/>
            <div 
            onClick={() => setProfileOpen(true)}
            className="bg-[#ffa936] rounded-[20px] px-6 py-4 shadow-[4px_4px_0px_0px_black] hover:scale-105 transition">
              <p className="flex items-center gap-2 font-bold text-xl">
                <Star size={22} strokeWidth={2.5}/> 
                <span>Level {session?.user?.level}</span>
              </p>

              <p className="flex items-center gap-2 font-bold text-xl">
                <Flame size={22} strokeWidth={2.5}/>
                <span>{session?.user?.streak}</span>
              </p>
              </div>
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
              <div className="flex justify-center">
                <LibraryBig size={64} strokeWidth={2.5}/>
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
                <div className="flex justify-center">
                  <AlarmClockCheck size={64} strokeWidth={2.5}/>
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
                <div className="flex justify-center">
                  <Trophy size={64} strokeWidth={2.5}/>
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
                Keep studying, study buddy coming soon!
              </p>
            </div>

            <div className="flex justify-center">
              <User size={64} strokeWidth={2.5}/>
            </div>
          </motion.div>
        </div>

        <div
          onMouseEnter={() => setShowInventory(true)}
          onMouseLeave={() => setShowInventory(false)}
          className="w-[500px] min-w-[500px] pt-[180px] px-8 shrink-0 -ml-10"
        >
          <div className="h-[100px]" />
          <AnimatedLink
            href="/Inventory"
            className="bg-[#87DD3B] rounded-[20px] p-8 h-152 w-[500px] shadow-[6px_6px_0px_0px_black] border-4 border-black transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:-translate-y-2 hover:rotate-1 hover:scale-[1.03] active:-translate-y-1 active:shadow-none animate-[float_4s_ease-in-out_infinite]"
          >
            <div className="flex justify-center">
              <Package size={64} strokeWidth={2.5}/>
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

      <AnimatePresence>
        {profileOpen && (
          <>
          <motion.div
          className="fixed inset-0 bg-black/40 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setProfileOpen(false)}/>
          
          <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1}}
          exit={{ scale:0.8, opacity: 0}}
          transition={{duration: 0.2}}
          className="fixed left-1/2 top-1/2 z-50 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border-4 border-black bg-[#f3e8d8] p-8 shadow-[8px_8px_0px_0px_black]">
            <h2 className="text-3xl font-bold">
              Your Progress
            </h2>

            <p className="flex items-center gap-2 mt-4">
              <Star size={24} strokeWidth={2.5} fill="yellow"/> <span>Level : {session?.user?.level}</span>
            </p>
            <p className="flex items-center gap-2 mt-4">
              <Flame size={24} strokeWidth={2.5} fill="orange"/> <span>Current streak: {session?.user?.streak}</span>
            </p>
            <p className="flex items-center gap-2 mt-4">
              <Sparkles size={24} strokeWidth={2.5} fill="cyan"/> <span>XP: {session?.user?.xp}</span>
            </p>

          </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
