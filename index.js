// ALGORITHM!!!!!!!!!!!!! DO NOT TOUCH !!!!! ACtually, touch it

let links = [];
let categoryLinks = [];
const main = async (path, next) => {
    let data = await (await fetch(`https://en.wikipedia.org/${path}`)).text();

    links = data
        .match(/href="\/wiki\/[^"]+"/g)
        .map((link) => link.match(/\/wiki\/[^"]+/)[0]);

    if (next) {
        const categoryPath = links.find((link) =>
            link.startsWith("/wiki/Category:")
        );
        if (categoryPath) {
            let categoryData = await (
                await fetch(`https://en.wikipedia.org${categoryPath}`)
            ).text();
            categoryLinks = categoryData
                .match(/href="\/wiki\/[^"]+"/g)
                .map((link) => link.match(/\/wiki\/[^"]+/)[0]);
        }

        const commonLinks = links.filter((link) =>
            categoryLinks.includes(link)
        );
        let counts = commonLinks.reduce((acc, link) => {
            acc[link] = (acc[link] || 0) + 1;
            return acc;
        }, {});

        const sortedLinks = Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        console.log(sortedLinks);
    }
};

main("/wiki/Elon_Musk", true);
