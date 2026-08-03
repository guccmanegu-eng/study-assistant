import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        const user = await prisma.user.findUnique({
            where:{
                username
            }
        });

        if(!user){
            return NextResponse.json(
                {error:"User not found!"},
                {status:400}
            );
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordCorrect){
            return NextResponse.json(
                {error:"Incorrect password..."},
                {status:400}
            );
        }

        return NextResponse.json({
            message:"Login successful!",
            user:{
                id:user.id,
                username:user.username,
            }
        });
    } catch(error){
        console.error(error);

        return NextResponse.json(
            {error:"Something went wrong..."},
            {status:500}
        );
    }
}