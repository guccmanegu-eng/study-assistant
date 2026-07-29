"use client";

import { useEffect,  useState } from "react";
import AnimatedLink from "@/components/AnimatedLink";

type Grade = {
    CijferId: number;
    CijferStr: string;
    IsVoldoende: boolean;
    Vak: {
        Omschrijving:  string;
        Afkorting: string;
    };
    CijferKolom: {
        KolomKop: string;
    };
    CijferPeriode: {
        Naam: string;
    } | null;
};

export default function GradesPage() {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/grades")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setGrades(data.Items ?? []);
        })
        .finally(() => setLoading(false));
    }, []);
    
    if(loading) {
        return(
            <div className="p-6">
                Loading Grades...
            </div>
        );
    }

    return(
            <main className="p-6">
                <div className="fixed top-8 left-8 z-50">
                            <AnimatedLink
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-[#f3e8d8] rounded-[20px] px-20 py-8 border-4 border-black shadow-[6px_6px_0px_0px_black] transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,2)] hover:scale-105 hover:bg-[#ffbb00]">
                                <span className="back-text">BACK</span>
                            </AnimatedLink>
                
                            </div>
                <h1 className="text-3xl text-black font-bold mb-6 absolute top-30 left-337">Grades</h1>
                <div className="grid gap-4 absolute top-40 w-[calc(100vw-75px)]">
                    {grades.map((grade, index) => (
                        <div
                        key={grade.CijferId}
                        className="rounded-xl border p-4 flex justify-between"
                        >
                            <div>
                                <h2 className="text-black font-semibold">{grade.Vak.Omschrijving}</h2>

                                <p className="text-sm text-gray-500">{grade.CijferKolom.KolomKop}</p>
                            </div>

                            <div className={`text-2xl font-bold ${
                            grade.IsVoldoende
                            ? "text-green-600"
                            : "text-red-600"
                    }`}>{grade.CijferStr ?? "-"}</div>
                            </div>
                    ))}
                </div>
            </main>
        );
    }
