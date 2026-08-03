"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="
            bg-[#ffbb00]
            rounded-[20px]
            p-4
            border-4 border-black
            shadow-[6px_6px_0px_0px_black]
            font-bold
            hover:scale-105
            transition-all
            "
        >
            Logout
        </button>
    );
}