"use client";

import Image from "next/image";
import AnimatedLink from "@/components/AnimatedLink";
import { motion } from "framer-motion";
import { usePageTransition } from "@/components/TransitionProvider";

export default function GradesPage() {
    const { leaving } = usePageTransition();
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
            }}  
        className="animated-bg flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')"}}>
            <div className="relative w-full min-h-[70vh] max-w-4xl overflow-hidden rounded-3xl border border-yellow-500/20 shadow-3xl backdrop-blur-[2px] bg-white/10">
            <div className="absolute right-0 top-0 h-full w-4 bg-[repeating-linear-gradient(-45deg,#facc15_0px,#facc15_12px,#18181b_12px,#18181b_24px)]" />
                <div className="absolute left-0 top-0 h-full w-4 bg-[repeating-linear-gradient(-45deg,#facc15_0px,#facc15_12px,#18181b_12px,#18181b_24px)]" />

            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative p-10">
                <div className="flex justify-center">
                    <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-yellow-400">
                        <path
                        d="M12 3L2 20h20L12 3z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="rgba(250,204,21,0.08)" />
                        <path
                        d="M12 9v5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        />
                        <circle cx="12" cy="17" r="1" fill="currentColor" />
                    </svg>
                </div>

                <h1 className="mt-6 text-center text-4xl font-bold text-black">
                    Grades are currently under maintenance...
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500 leading-7">
                    We're working on building a faster grade solution than your schools standard grade system! Update should be here shortly.
                </p>

            </div>
            <div className="absolute bottom-[-30] right-8">
                    <div className="absolute bottom-full right-0 mb-4 rounded-2xl border border-gray-500 bg-[#f3e8d8] px-5 py-4 text-sm text-black shadow-xl">
                        <p className="font-medium">
                            Shh...
                        </p>

                        <p className="mt-1 text-black">
                            I'm building the grades page..
                        </p>

                        <div className="absolute -bottom-2 right-10 h-4 w-4 rotate-45 border-b border-r border-gray-500 bg-[#f3e8d8]"/>
                    </div>

                    <Image
                    src="/racoon.png"
                    alt="Sleeping racoon"
                    width={180}
                    height={180}
                    className="pixelated select-none scale-x-[-1]"
                    draggable={false}

                    />
                </div>
            </div>
            <div className="fixed top-8 left-8 z-50">
                                        <AnimatedLink
                                        href="/"
                                        className="inline-flex items-center justify-center gap-2 bg-[#f3e8d8] rounded-[20px] px-20 py-8 border-4 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:scale-105 hover:bg-[#ffbb00]">
                                            <span className="back-text">BACK</span>
                                        </AnimatedLink>
                            
                                        </div>
        </motion.main>
    );
}