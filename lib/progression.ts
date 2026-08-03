import { prisma } from "@/lib/prisma";

export async function addXP(
    userId: string,
    amount: number
) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new Error("user not found...")
    }

    let newXP = user.xp + amount;
    let newLevel = user.level;

    const xpNeeded = newLevel * 100;

    if (newXP >= xpNeeded) {
        newXP -= xpNeeded;
        newLevel++;
    }

    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            xp: newXP,
            level: newLevel,
        },
    });

    return {
        xp: newXP,
        level: newLevel,
    };
}