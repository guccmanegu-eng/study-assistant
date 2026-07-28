"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import WaveText from "@/components/WaveText";
import AnimatedLink from "@/components/AnimatedLink";
import { usePageTransition } from "@/components/TransitionProvider";

export default function Timer() {

    const [seconds, setSeconds] = useState(25 * 60);
    const [running, setRunning] = useState(false);
    const { leaving } = usePageTransition();

    useEffect(() => {

        if (!running) return;

        const interval = setInterval(() => {
            setSeconds((prev: number) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setRunning(false);
                    return 0;
                }

                return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }, [running]);

        const minutes = Math.floor (seconds / 60);
        const remainingSeconds = seconds % 60;

        function resetTimer() {
            setRunning(false);
            setSeconds(25 * 60);
        }

        return (
            <motion.main
            initial={{
                x: "100%"
            }}
            animate={{
                x: leaving ? "200%" : 0,
                filter: leaving ? "blur(12px)" : "blur(0px)",
            }}
            transition={{
                duration: 0.55,
                ease: [0.65, 0, 0.35, 1],
            }} className="h-screen bg-[#f3e8d8] text-black p-8 overflow-hidden">

            <div className="fixed top-8 left-8 z-50">
            <AnimatedLink
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#f3e8d8] rounded-[20px] px-20 py-8 border-4 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:scale-105 hover:bg-[#ffbb00]">
                <span className="back-text">BACK</span>
            </AnimatedLink>

            </div>

            <section className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-5xl font-bold mb-10">
            <WaveText text="Study Timer ⏱️" />
            </h2>

            <motion.div className="bg-[#f3e8d8] border-black border-4 rounded-3xl p-12">
                <motion.div className="text-8xl font-bold text-center tracking-wider">

            {String(minutes).padStart(2,"0")}:
            {String(remainingSeconds).padStart(2,"0")}

                </motion.div>
                <div className="flex gap-4 mt-10 justify-center">

                    <button
                    onClick={() => setRunning(true)}
                    className="bg-white text-black px-8 py-3 rounded-xl font-bold border-black border-4"
                    >
                        Start
                    </button>

                    <button
                    onClick={() => setRunning(false)}
                    className="bg-[#ffbb00] text-black px-8 py-3 rounded-xl font-bold border-black border-4"
                    >
                        Pause
                    </button>

                    <button
                    onClick={resetTimer}
                    className="bg-[#ff0000] text-black px-8 py-3 rounded-xl font-bold border-black border-4"
                    >
                        Reset
                    </button>

                </div>
            </motion.div>
            </section>

            </motion.main>
        );

    }
