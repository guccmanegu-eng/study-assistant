"use client";

import { motion } from "framer-motion";

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

                <h1 className="text-5xl font-bold">🎒 Backpack</h1>

                <p className="mt-2 text-lg text-[#666]"> Everything you have collected while learning.</p>

                <div className="mt-12 bg-[#C98B4A] rounded-[30px] p-8 border-4 border-black shadow-[8px_8px_0px_0px_black]">
                    
                </div>
            </motion.div>
        </main>
    )
}