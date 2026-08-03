import { auth } from "@/auth";
import { redirect } from "next/navigation";
import InventoryClient from "./InventoryClient";

export default async function HomeworkPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return <InventoryClient />;
}