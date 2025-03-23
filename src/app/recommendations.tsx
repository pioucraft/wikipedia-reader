"use client";

//TODO: MAKE THIS SHIT READABLE FUCK !!!!
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Recommendations({
    recommendations,
}: {
    recommendations: {
        link: string;
        weight: number | null;
        summary?: string;
        imageURL?: string;
    }[];
}) {
    let [displayLength, setDisplayLength] = useState(1);
    let [displayedRecommendations, setDisplayedRecommendations] = useState<
        {
            link: string;
            weight: number | null;
            summary?: string;
            imageURL?: string;
        }[]
    >([]);
    let [isLoading, setIsLoading] = useState(false);

    async function loadMore() {
        if (isLoading) return;
        setIsLoading(true);
        setDisplayLength(displayLength + 2);
        const newRecommendations = recommendations
            .slice(displayLength, displayLength + 2)
            .map(async (rec) => {
                const data = await fetchImageAndSumarry(
                    rec.link.split("/").reverse()[0]
                );
                rec.summary = data.summary;
                rec.imageURL = data.imageURL;
                return rec;
            });

        Promise.all(newRecommendations).then((updatedRecs) => {
            setDisplayedRecommendations([
                ...displayedRecommendations,
                ...updatedRecs,
            ]);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                loadMore();
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [displayLength, displayedRecommendations]);

    return (
        <div>
            <ul>
                {displayedRecommendations
                    .filter((rec) => !rec.link.endsWith("Main_Page"))
                    .map((rec, index) => {
                        return (
                            <li key={index}>
                                <Link href={rec.link}>
                                    {rec.link.split("/").reverse()[0]}
                                </Link>
                                <p>{rec.summary}</p>
                                {rec.imageURL && (
                                    <Image
                                        src={rec.imageURL}
                                        width={500}
                                        height={500}
                                        alt="No"
                                    />
                                )}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

async function fetchImageAndSumarry(
    name: string
): Promise<{ imageURL: string; summary: string }> {
    let answer = await (
        await fetch(`/api/fetchImageAndSumarry/${name}`)
    ).json();

    return { imageURL: answer.imageURL, summary: answer.summary };
}
