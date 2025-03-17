export default async function Page({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const resolvedParams = await params; // Resolve the Promise first
    return (
        <div className="text-9xl bg-red-500">
            <p className="">{resolvedParams.name}</p>
            <p>HI</p>
        </div>
    );
}
