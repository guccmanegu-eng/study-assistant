import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addXP } from "@/lib/progression";

export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            {error: "unauthorized"},
            {status:401}
        );
    }

    const { amount } = await req.json();

    const result = await addXP(
        session.user.id,
        amount
    );

    return NextResponse.json(result);
}