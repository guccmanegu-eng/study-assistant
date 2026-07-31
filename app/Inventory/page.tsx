"use client";

import { motion } from "framer-motion";
import AnimatedLink from "@/components/AnimatedLink";
import { Backpack, Brain, LibraryBig, Pencil, Trophy } from "lucide-react";

export default function InventoryPage() {
    return (
        <main
        className="animated-bg min-h-screen text-black p-8"
        style={{ backgroundImage: "url('/background.png')"}}>

            <motion.div
            initial={{
                y:80,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.4,
            }}
            className="max-w-5xl mx-auto">

                <h1 className="flex items-center gap-2 relative left-80 text-5xl font-bold"><Backpack size="64" strokeWidth={2.5} /><span>Backpack</span></h1>

                <p className="relative left-75 mt-2 text-lg text-[#666]"> Everything you have collected while learning.</p>

                <div className="mt-12 bg-[#C98B4A] rounded-[30px] p-8 border-4 border-black shadow-[8px_8px_0px_0px_black]">
                    
                    <div className="flex justify-center">
                        <Backpack size="46" strokeWidth={2.5}/>
                    </div>

                    <h2 className="text-4xl font-bold text-center mt-6">
                        Your Backpack
                    </h2>

                    <div className="mt-8 grid grid-cols-2 gap-6">
                        <div className="bg-[#f5c84c] rounded-[20px] p-6 border-4 border-black shadow-[6px_6px_0px_0px_black]">
                            <div className="flex">
                                <LibraryBig size={46} strokeWidth={2.5}/>
                            </div>

                            <h3 className="text-2xl font-bold mt-4">
                                Books
                            </h3>

                            <p>
                                12 collected
                            </p>
                        </div>
                        </div>
                        
                        <div className="mt-8 grid grid-cols-2 gap-6">
                        <div className="bg-[#f5c84c] rounded-[20px] p-4 border-4 border-black shadow-[6px_6px_0px_0px_black]">
                            <div className="flex">
                                <Pencil size={46} strokeWidth={2.5}/>
                            </div>

                            <h3 className="text-2xl font-bold mt-4">
                                Supplies
                            </h3>

                            <p>
                                8 collected
                            </p>
                        </div>
                        </div>
                        
                        <div className="mt-8 grid grid-cols-2 gap-6">
                        <div className="bg-[#f5c84c] rounded-[20px] p-4 border-4 border-black shadow-[6px_6px_0px_0px_black]">
                            <div className="flex">
                                <Trophy size={46} strokeWidth={2.5}/>
                            </div>

                            <h3 className="text-2xl font-bold mt-4">
                                Achievements
                            </h3>

                            <p>
                                5 unlocked
                            </p>
                        </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-6">
                        <div className="bg-[#f5c84c] rounded-[20px] p-4 border-4 border-black shadow-[6px_6px_0px_0px_black]">
                            <div className="flex">
                                <Brain size={46} strokeWidth={2.5}/>
                            </div>

                            <h3 className="text-2xl font-bold mt-4">
                                Knowledge
                            </h3>

                            <p>
                                Level 5
                            </p>
                        </div>
                        </div>
                        </div>
            </motion.div>
            <div className="relative bottom-280">
                            <AnimatedLink
                                href="/"
                                className="inline-flex items-center justify-center gap-2 bg-[#f3e8d8] rounded-[20px] px-20 py-8 border-4 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:scale-105 hover:bg-[#ffbb00]">
                                    <span className="back-text">BACK</span>
                             </AnimatedLink>
                                                    
                        </div>
        </main>
    );
}