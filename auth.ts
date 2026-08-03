import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt",
    },

    providers: [
        Credentials({
            name: "Credentials",

            credentials: {
                username: {},
                password: {},
            },

            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username as string,
                    },
                });

                if (!user || !user.password) {
                    return null;
                }

                const valid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );
                
                if (!valid) {
                    return null;
                }

                return {
                    id: user.id,
                    username: user.username,
                    name: user.username,

                    level: user.level,
                    xp: user.xp,
                    coins: user.coins,
                    streak: user.streak,
                };
            },
        }),
    ],

callbacks: {
    async jwt({ token, user }) {

        if (user) {
            token.id = user.id;
        }

        if (token.id) {
            const dbUser = await prisma.user.findUnique({
                where: {
                    id: token.id as string,
                },
            });

            if (dbUser) {
                token.level = dbUser.level;
                token.xp = dbUser.xp;
                token.coins = dbUser.coins;
                token.streak = dbUser.streak;
            }
        }

        return token;
    },

    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
            session.user.level = token.level as number;
            session.user.xp = token.xp as number;
            session.user.coins = token.coins as number;
            session.user.streak = token.streak as number;
        }

        return session;
    },
},

    pages: {
        signIn: "/login",
    },

    secret: process.env.AUTH_SECRET,
});