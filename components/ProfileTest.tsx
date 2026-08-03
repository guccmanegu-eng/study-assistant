"use client";

import { useSession } from "next-auth/react";
import LogoutButton from "@/components/LogoutButton";
import { Span } from "next/dist/trace";

export default function ProfileTest() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <span>Loading...</span>;
    }

    if (!session) {
        return (
            <span>
                Not logged in yet!
            </span>
        )
    }

    return (
        <span>
            {session?.user?.name}
        </span>
    );
}