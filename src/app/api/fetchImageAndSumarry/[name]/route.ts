import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    context: { params: { name: string } }
) {
    const { name } = await context.params;

    return NextResponse.json({
        imageURL: Object.entries(
            (
                await (
                    await fetch(
                        `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=300&format=json&titles=${name}`
                    )
                ).json()
            ).query.pages
            //@ts-ignore
        )[0][1]?.thumbnail?.source,
        summary: Object.entries(
            (
                await (
                    await fetch(
                        `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${name}`
                    )
                ).json()
            ).query.pages
            //@ts-ignore
        )[0][1]?.extract,
    });
}
