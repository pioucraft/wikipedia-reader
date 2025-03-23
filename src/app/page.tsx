import fetchRecommendations from "@/db/retrieveRecommendations";
import Recommendations from "./recommendations";
import Link from "next/link";

export default async function Home() {
    const recommendations = await fetchRecommendations();

    return (
        <div>
            <Recommendations
                recommendations={recommendations}
            ></Recommendations>
        </div>
    );
}
