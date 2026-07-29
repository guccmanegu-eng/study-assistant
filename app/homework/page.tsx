"use client";

import { motion } from "framer-motion"
import WaveText from "@/components/WaveText";
import AnimatedLink from "@/components/AnimatedLink";
import { usePageTransition } from "@/components/TransitionProvider";

export default function Homework() {
    const { leaving } = usePageTransition();
    const assignments = [
        {
            subject: "Mathematics",
            title: "Chapter 6 exercises",
            due: "Tomorrow",
            priority: "High",
        },
        {
            subject: "History",
            title: "Renaissance essay",
            due: "Next week",
            priority: "Medium",
        },
        {
            subject: "French",
            title: "Chapter 2 Vocabulary",
            due: "Friday",
            priority: "Low",
        },
    ];
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
            }} className="animated-bg flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')"}}>

            <button className="relative top-[-100] left-[1050] inline-flex items-center justify-center gap-2 bg-[#f3e8d8] rounded-[20px] px-20 py-8 border-4 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:scale-105 hover:bg-[#ffbb00]">
                    <span className="homework-text">+ Add Homework</span></button>

            <div className="fixed top-8 left-8 z-50">
                        <AnimatedLink
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-[#f3e8d8] rounded-[20px] px-20 py-8 border-4 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:scale-105 hover:bg-[#ffbb00]">
                            <span className="back-text">BACK</span>
                        </AnimatedLink>
            
                        </div>
            <section className="flex-1 p-10">
                <div className="flex justify-between items-center">
                    <div>
                    <h2 className="text-5x1 font-bold">Homework</h2>
                    <p className="text-zinc-400 mt-2">Manage your assignments.</p>
                    </div>

                
                </div>

                <div className="mt-10 space-y-5 fixed top-100 left-8 z-50">
                    {assignments.map((item, index) => (
                        <div
                        key={index}
                        className="bg-[#f3e8d8] rounded-2x1 p-6 w-[calc(100vw-75px)] flex justify-between items-center border-black border-4 rounded-2xl"
                        >
                            <div className="flex gap-5 items-center">
                                <input
                                type="checkbox"
                                className="w-6 h-6"
                                />
                            <div>
                                <h3 className="text-xl font-semibold">
                                    {item.title}
                                </h3>

                                <p className="text-zinc-400">
                                    {item.subject}
                                </p>
                            </div>
                            </div>

                            <div className="text-right">
                                <p>
                                    Due: {item.due}
                                </p>
                                <span className="text-sm text-zinc-400">
                                    Priority: {item.priority}
                                </span>
                            </div>
                            </div>
                    ))}
                </div>
            </section>
        </motion.main>
    )
}