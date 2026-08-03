"use client";

import { useSession, signOut } from "next-auth/react";
import AnimatedLink from "./AnimatedLink";

export default function AuthButtons() {
    const { data:session } = useSession();

    if (session) {
        return (
            <button
            onClick={() => signOut({callbackUrl: "/" })}
            className="
            bg-[#FF8A6E]
            rounded-[15px]
            px-5 py-3
            border-4 border-black
            shadow-[4px_4px_0px_0px_black]
            font-bold
            hover:scale-105
            transition">
                Logout
            </button>
        )
    }

    return (
        <div className="flex gap-3">
            <AnimatedLink
            href="/login"
            className="
            bg-[#f5c84c]
            rounded-[15px]
            px-5 py-3
            border-4 border-black
            shadow-[4px_4px_0px_0px_black]
            font-bold
            hover:scale-105
            transition">
                Login
            </AnimatedLink>

            <AnimatedLink
            href="/login"
            className="
            bg-[#f5c84c]
            rounded-[15px]
            px-5 py-3
            border-4 border-black
            shadow-[4px_4px_0px_0px_black]
            font-bold
            hover:scale-105
            transition">
                Register
            </AnimatedLink>
        </div>
    )
}