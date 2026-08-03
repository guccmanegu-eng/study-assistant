import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        level: number;
        xp: number;
        coins: number;
        streak: number;
        username: string;
    }

    interface Session {
        user: {
            id: string;
            level: number;
            xp: number;
            coins: number;
            streak: number;
            username: string;
        } & Session["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        level: number;
        xp: number;
        coins: number;
        streak: number;
    }
}