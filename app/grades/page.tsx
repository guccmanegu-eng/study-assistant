"use client";

import { useEffect,  useState } from "react";

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
            <main className="p-6">
                <h1 className="text-3xl font-bold mb-6">Grades</h1>
                <div className="grid gap-4">
                    {grades.map((grade, index) => (
                        <div
                        key={grade.CijferId}
                        className="rounded-xl border p-4 flex justify-between"
                        >
                            <div>
                                <h2 className="font-semibold">{grade.Vak.Omschrijving}</h2>

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
}