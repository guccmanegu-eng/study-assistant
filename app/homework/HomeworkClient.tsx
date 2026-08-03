"use client";

import { AnimatePresence, motion } from "framer-motion"
import WaveText from "@/components/WaveText";
import AnimatedLink from "@/components/AnimatedLink";
import { usePageTransition } from "@/components/TransitionProvider";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Homework() {
    const { leaving } = usePageTransition();
    const { update } = useSession();
    const [showAddHomework, setShowAddHomework] = useState(false);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [due, setDue] = useState("");
    const [priority, setPriority] = useState("Medium");
    type Assignment = {
    subject: string;
    title: string;
    due: string;
    priority: string;
    };
    const [assignments, setAssignments] = useState<Assignment[]>(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("assignments");

    if (saved) {
        return JSON.parse(saved);
    }

    return [
        {
            subject: "Mathematics",
            title: "Chapter 6 exercises",
            due: "Tomorrow",
            priority: "High",
        },
        {
            subject: "History",
            title: "Renaissance essay",
            due: "Next week",
            priority: "Medium",
        },
        {
            subject: "French",
            title: "Chapter 2 Vocabulary",
            due: "Friday",
            priority: "Low",
        },
    ];
});

    const priorityButtonColor = {
        Low: "bg-[#87DD3B]",
        Medium: "bg-[#FFA836]",
        High: "bg-[#FF8A6E]",
        Urgent: "bg-[#FF3B30]",
    }[priority];

    useEffect(() => {
        localStorage.setItem(
            "assignments",
            JSON.stringify(assignments)
        );
    }, [assignments]);

    function addHomework() {
        if (!title.trim()) return;

        setAssignments([
            ...assignments,
            {
                title,
                subject,
                due,
                priority,
            },
        ]);

        setTitle("");
        setSubject("");
        setDue("");
        setPriority("Medium");

        setShowAddHomework(false);
    }

    function deleteHomework(index: number) {
        setAssignments(assignments.filter((_, i) => i !== index));
    }
    return (
        <motion.main
            initial={{
                x: "100%"
            }}
            animate={{
                x: leaving ? "200%" : 0,
                filter: leaving ? "blur(12px)" : "blur(0px)",
            }}
            transition={{
                duration: 0.55,
                ease: [0.65, 0, 0.35, 1],
            }} className="animated-bg flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')"}}>

            <button
            onClick={() => setShowAddHomework(true)} 
            className="flex fixed top-8 right-8 inline-flex items-center justify-center gap-2 bg-[#f3e8d8] rounded-[20px] px-20 py-8 border-4 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:scale-105 hover:bg-[#ffbb00]">
                    <span className="homework-text">+ Add Homework</span></button>

            <div className="fixed top-8 left-8 z-50">
                        <AnimatedLink
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-[#f3e8d8] text-black rounded-[20px] px-20 py-8 border-4 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:scale-105 hover:bg-[#ffbb00]">
                            <span className="back-text">BACK</span>
                        </AnimatedLink>
            
                        </div>
            <section className="flex-1 p-10">
                <div className="flex justify-between items-center">
                </div>

                <div className="mt-10 space-y-5 fixed top-100 left-8 z-50">
                    {assignments.map((item, index) => (
                        <div
                        key={index}
                        className="bg-[#f3e8d8] rounded-2x1 p-6 w-[calc(100vw-75px)] gap-2 flex justify-between items-center border-black border-4 rounded-2xl"
                        >
                            <div className="flex gap-5 items-center">
                                <input
                                type="checkbox"
                                className="w-6 h-6"
                                onChange={async (e) => {
                                    if (e.target.checked) {
                                        const response = await fetch("/api/xp", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                amount: 50,
                                            }),
                                        });

                                        const data = await response.json();

                                        console.log("XP response:", data);

                                        if (response.ok) {
                                            await update();
                                            deleteHomework(index);
                                        } else {
                                            alert("XP FAILED:" + data.error)
                                        }

                                    }
                                }}
                                />
                            <div>
                                <h3 className="text-xl text-black font-semibold">
                                    {item.title}
                                </h3>

                                <p className="text-zinc-400">
                                    {item.subject}
                                </p>
                            </div>
                            </div>

                            <div className="text-right text-black">
                                <p>
                                    Due: {item.due}
                                </p>
                                <span className="text-sm text-zinc-400">
                                    Priority: {item.priority}
                                </span>
                                <button
                                onClick={() => deleteHomework(index)}
                                className="mt-3 rounded-lg bg-red-500 px-3 py-2 text-white font-bold transition hover:bg-red-600 right-8 flex items-center">
                                    <Trash2 size={18} strokeWidth={2.5}/>
                                    Delete
                                </button>
                            </div>
                            </div>
                    ))}
                </div>
            </section>

            <AnimatePresence>
                {showAddHomework && (
                    <>
                    <motion.div
                    className="fixed inset-0 bg-black/40"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    onClick={() => setShowAddHomework(false)}
                    />

                    <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="fixed left-1/2 top-1/2 z-50 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border-4 border-black bg-[#f3e8d8] p-8">
                        <h2 className="text-3xl font-bold mb-6 text-black">Add Homework</h2>

                        <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Homework Title"
                        className="mb-4 w-full rounded-xl border-4 border-black p-3 text-black"/>

                        <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                        className="mb-4 w-full rounded-xl border-4 border-black p-3 text-black"/>

                        <input
                        value={due}
                        onChange={(e) => setDue(e.target.value)}
                        placeholder="Due"
                        className="mb-4 w-full rounded-xl border-4 border-black p-3 text-black"/>

                        <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="mb-4 w-full rounded-xl border-4 border-black p-3 text-black">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Urgent</option>
                            </select>

                            <button
                            onClick={addHomework}
                            className={`w-full rounded-xl ${priorityButtonColor} p-4 font-bold border-4 border-black transition-=colors duration-300`}>
                                Add
                            </button>

                    </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.main>
    )
}