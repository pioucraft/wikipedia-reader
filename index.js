// ALGORITHM!!!!!!!!!!!!! DO NOT TOUCH !!!!! ACtually, touch it

let links = [];
const main = async (path, next) => {
    let data = await (await fetch(`https://en.wikipedia.org/${path}`)).text();

    links = links.concat(
        data
            .match(/href="\/wiki\/[^"]+"/g)
            .map((link) => link.match(/\/wiki\/[^"]+/)[0])
    );
    if (next) {
        const toFetchLinks = links;
        let index = 0;
        for (let link of links) {
            console.log(link);
            if (link.startsWith("/wiki/Category:")) {
                console.log(link);
                main(link, false);
                index++;
                console.log(index);
            }
        }
        console.log(links);
        setTimeout(() => {
            let counts1 = links.reduce((acc, link) => {
                acc[link] = (acc[link] || 0) + 1;
                return acc;
            }, {});
            const sortedLinks = Object.entries(counts1)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 150)
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
            counts1 = sortedLinks;
            console.log(counts1);
        }, 10000);
    }
};

main("/wiki/Elon_Musk", true);
