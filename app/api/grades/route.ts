import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch(
        "https://martinus.magister.net/api/personen/33769/aanmeldingen/78993/cijfers/cijferoverzichtvooraanmelding?actievePerioden=true&alleenBerekendeKolommen=false&alleenPTAKolommen=false",
        {
            headers: {
                Authorization: `Bearer ${process.env.MAGISTER_TOKEN}`,
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        return NextResponse.json (
        { error: "Failed to get Grades" },
        { status: response.status }
        );
    }

    const data = await response.json();
    return NextResponse.json(data);
}