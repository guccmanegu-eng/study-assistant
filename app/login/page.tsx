"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import AnimatedLink from "@/components/AnimatedLink";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
    });

    if (result?.error) {
        alert("Invalid email or password.");
        return;
    }

    router.push("/");
    router.refresh();
}

    return (
        <main
        className="animated-bg min-h-screen text-black p-8"
        style={{backgroundImage:"url('/background.png')"}}>

        <motion.div
        initial={{
            y:80,
            opacity:0,
        }}
        animate={{
            y:0,
            opacity:1
        }}
        transition={{
            duration:0.4,
        }}
        className="max-w-5xl mx-auto">

            <h1 className="flex items-center justify-center gap-3 text-5xl font-bold">
                <LogIn size={60} strokeWidth={2.5}/>
            </h1>

            <p className="text-center mt-3 text-lg text-[#666]">
                Continue your adventure...
            </p>

            <div className="mt-12 bg-[#C98B4A] rounded-[30px] p-10 border-4 border-black shadow-[8px_8px_0px_0px_black] max-w-xl mx-auto">
                <form
                onSubmit={handleLogin}
                className="flex flex-col gap-5">
                    <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-4 rounded-[15px]
                    bg-[#f5c84c]
                    border-4 border-black
                    shadow-[4px_4px_0px_0px_black]"/>

                    <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-4 rounded-[15px]
                    bg-[#f5c84c]
                    border-4 border-black
                    shadow-[4px_4px_0px_0px_black]"/>

                    <button
                    className="mt-4 bg-[#ffbb00] rounded-[20px] p-4 border-4 border-black shadow-[6px_6px_0px_0px_black] font-bold text-xl hover:scale-105 transition-all">Login</button>
                </form>
            </div>
        </motion.div>

        </main>
    )
}