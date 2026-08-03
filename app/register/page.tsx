"use client";

import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedLink from "@/components/AnimatedLink";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            return;
        }

        alert("Account Created!");
    }

    return (
        <main className="animated-bg min-h-screen text-black p-8"
        style={{ backgroundImage: "url('/background.png')" }}>

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
                duration: 0.4,
            }}
            className="max-w-5xl mx-auto">
            <h1 className="flex items-center justify-center gap-3 text-5xl font-bold">
                <UserPlus size={60} strokeWidth={2.5}/> Create Account </h1>
                <p className="text-center mt-3 text-lg text-[#666]">
                    Start your learning adventure!
                </p>

            <div className="mt-12 bg-[#C98B4A] rounded-[30px] p-10 border-4 border-black shadow-[8px_8px_0px_0px_black] max-w-xl mx-auto">
                <div className="flex justify-center">
                    <UserPlus size={50} strokeWidth={2.5}/>
                </div>
                <h2 className="text-4xl font-bold text-center mt-5">
                    Register
                </h2>
            <form
            onSubmit={handleRegister}
            className="mt-8 flex flex-col gap-5">
                <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-4 rounded-[15px] bg-[#f5c84c] border-4 border-black shadow-[4px_4px_0px_0px_black] text-black"/>
                
                <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 rounded-[15px] bg-[#f5c84c] border-4 border-black shadow-[4px_4px_0px_0px_black] text-black"/>

                <div className="relative">
                    <input
                    placeholder="Password"
                    type={ showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 pr-14 rounded-[15px] bg-[#f5c84c] border-4 border-black shadow-[4px_4px_0px_0px_black] text-black"/>

                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2">
                        {showPassword ? (
                            <EyeOff size={20} strokeWidth={2.5}/>
                        ) : (
                            <Eye size={20} strokeWidth={2.5}/>
                        )}
                    </button>
                    </div>
                    

                <button
                className="bg-blue-600 p-3 rounded">Register</button>
            </form>
            </div>
            </motion.div>
            <div className="relative mt-10">
                <AnimatedLink
                href="/"
                className="
                inline-flex items-center justify-center
                bg-[#f3e8d8]
                rounded-[20px]
                px-20 py-8
                border-4 border-black
                shadow-[6px_6px_0px_0px_black]
                transition-all duration-200
                hover:scale-105
                hover:bg-[#ffbb00]">
                    <span className="back-text">BACK</span>
                </AnimatedLink>
            </div>
        </main>
    )
}