import {runIteration} from "./scrapG2A.js";
import {scrapeSteamData} from "./scrapSteam.js";
import {writeFileSync} from 'fs';


async function compareSteamG2A() {
    try {
        // Run the async operations
        const jsonSteamDumpData = await scrapeSteamData(); // Data from Steam
        const jsonG2AData = await runIteration();        // Data from G2A
        console.log('G2A Data:', jsonG2AData);

    // Create a Map for fast Steam name lookup
    const steamMap = new Map(
        jsonSteamDumpData.map(game => [game.name.toLowerCase().trim(), game])
    );

    // Compare G2A data with Steam data
    const matchedGames = jsonG2AData
        .map(game => {
            const normalizedName = game.name.toLowerCase().trim();
            if (steamMap.has(normalizedName)) {
                const steamGame = steamMap.get(normalizedName);
                return {
                    name: game.name,
                    appId: steamGame.appID,
                    release: steamGame.release,
                    imageID: steamGame.imageID ? steamGame.imageID : "",
                    tags: steamGame.tags,
                    score: steamGame.score,
                    g2aPrice: game.basePrice,
                    g2aUrl: game.path,
                    steamPrice: steamGame.price
                };
            }
            return null;
        })
        .filter(Boolean); // Remove null values

        const gameMap = new Map();

        matchedGames.forEach(game => {
            if (!gameMap.has(game.name)) {
                gameMap.set(game.name, game);
            } else {
                let existingGame = gameMap.get(game.name);

                // Convert prices to numbers (handling cases like "49.99 €")
                let existingPrice = existingGame.g2aPrice; // Already a number
                let newPrice = game.g2aPrice; // Already a number

                if (newPrice > existingPrice) {
                    console.log(`Removed: ${existingGame.g2aUrl}`);
                    gameMap.set(game.name, game); // Replace with the higher-priced game
                } else {
                    console.log(`Removed: ${game.g2aUrl}`);
                }
            }
        });

        console.log(`Found ${matchedGames.length} games`);

        let filteredmatchedGames = Array.from(gameMap.values());

        console.log(`Filtered and got ${filteredmatchedGames.length} games`);

        writeFileSync('matchedGames.json', JSON.stringify(filteredmatchedGames, null, 2));
        return filteredmatchedGames
    } catch (error) {
        console.error("Error in main process:", error);
    }
}

compareSteamG2A()


