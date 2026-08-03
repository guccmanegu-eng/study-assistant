import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HomeworkClient from "./HomeworkClient";

export default async function HomeworkPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return <HomeworkClient />;
}