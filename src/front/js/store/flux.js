import { symbol } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            username: null, // Initially no user is logged in
            userID: null,
            favoriteIds: [],
            favoriteData: [],
            favoritePriceData: [],
            wallet: [],
            coins: [],
            loadingCoins: true,
            currentCoinId: null,
            currency: "usd",
            timeFrame: "7",
            currentCoinPriceData: [],
            showContactModal: false,
            showModal: false,
            showOverallHoldings: false,
            showWallet: false,
            showFavorites: false,
        },
        actions: {
            setFavoritePriceData: () => {
                setStore({ favoritePriceData: [] })
            },
            setFavoriteData: () => {
                setStore({ favoriteData: [] })
            },
            setUserId: (id) => {
                setStore({ userID: id })
            },
            setUserName: (email) => {
                setStore({ username: email })
            },
            setCurrentCoinId: (id) => {
                setStore({ currentCoinId: id })
            },
            setCurrency: (currency) => {
                setStore({ currency: currency })
            },
            setTimeFrame: (days) => {
                setStore({ timeFrame: days })
            },
            setShowContactModal: () => {
                setStore({ showContactModal: !getStore().showContactModal })
            },
            setShowOverallHoldings: () => {
                setStore({ showOverallHoldings: true })
                setStore({ showWallet: false })
                setStore({ showFavorites: false })
            },
            setShowWallet: () => {
                setStore({ showWallet: true })
                setStore({ showOverallHoldings: false })
                setStore({ showFavorites: false })
            },
            setShowFavorites: () => {
                setStore({ showFavorites: true })
                setStore({ showWallet: false })
                setStore({ showOverallHoldings: false })
            },
            fetchCoins: async () => {
                setStore({ loading: true });
                try {
                    const options = {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            'x-cg-pro-api-key': process.env.COINGECKO_KEY
                        }
                    };
                    const response = await fetch(
                        "https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=30&page=1&sparkline=true", options
                    );
                    const data = await response.json();
                    setStore({ coins: data, loading: false });
                } catch (error) {
                    console.error("Error fetching coins:", error);
                    setStore({ loading: false });
                }
            },

            fetchWalletData: async (userId) => {
                try {
                    const response = await fetch(`/api/wallet/${userId}`);
                    if (!response.ok) throw new Error("Failed to fetch wallet data");

                    const walletData = await response.json();
                    setStore({ ...store, wallet: walletData });
                } catch (error) {
                    console.error("Error fetching wallet data:", error);
                }
            },


            getPriceData: () => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${getStore().currentCoinId}/market_chart?vs_currency=${getStore().currency}&days=${getStore().timeFrame}`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        setStore({
                            currentCoinPriceData:
                                response.prices.map((price) => {
                                    return ({ date: new Date(price[0]), price: price[1] })
                                })
                        })
                    })
                    .catch((err) => console.log(err))
            },

            getFavPriceData: (id) => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`, options)
                    .then((res) => res.json())
                    .then((response) => {
                        setStore({
                            favoritePriceData: [...getStore().favoritePriceData,
                            response.prices.map((price) => {
                                return ({ id: id, date: new Date(price[0]), price: price[1] })
                            })]
                        })
                    })
                    .catch((err) => console.log(err))
            },

            signUp: (username, password) => {
                console.log(`Sign-up request for: ${username}`);
                // Implement API call or logic for user registration
            },
            login: () => {
                setStore({ username: "JohnDoe" }); // Replace with actual login logic
                console.log("User logged in"); // Optional: Debugging message
            },
            logout: () => {
                setStore({ username: null }); // Clear the username
                console.log("User logged out"); // Optional: Debugging message
            },
            search: (query) => {
                console.log("Search query:", query); // Implement actual search logic
            },
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            // addToFavs: (id, name, symbol, current_price) => {
            //     const exist = getStore().favorites.find((favorite) => favorite.name === name)
            //     if (!exist) {
            //         let newFav = { name: name, id: id, symbol: symbol, current_price: current_price };
            //         let newArr = [...getStore().favorites, newFav];
            //         setStore({ favorites: newArr });
            //         console.log("favorites:" + getStore().favorites)
            //     } else { console.log("favorite exists") }
            // },
            addToFavs: (coin) => {
                fetch(`https://psychic-potato-7vvw4xvvrw7934xw-3001.app.github.dev/favorites/${coin.id}`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            "name": coin.name,
                            "user_id": getStore().userID,
                            "coin_id": coin.id
                        }
                    ),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => setStore({ favoriteIds: response }))
                    .catch(error => console.error(error));
            },

<<<<<<< HEAD

            addToWallet: (coin) => {
                fetch(`https://psychic-potato-7vvw4xvvrw7934xw-3001.app.github.dev/wallet/${coin.id}`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            "name": coin.name,
                            "user_id": getStore().userID,
                            "coin_id": coin.id
                        }
                    ),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => {
                        if (!res.ok) throw Error(res.statusText);
                        return res.json();
                    })
                    .then(response => getActions().getWallet(getStore().userID))
                    .catch(error => console.error(error));
            },
=======
            removeFromFavs: (fav_id) => {
                fetch(`https://psychic-potato-7vvw4xvvrw7934xw-3001.app.github.dev/favorites/${getStore().userID}/${fav_id}`, {
					method: 'DELETE'
				})
					.then(res => {
						if (!res.ok) throw Error(res.statusText);
                        return res.json();
					})
                    .then(response => setStore({ favoriteIds: response }))
					.catch(error => console.error(error));
            },

            getFavoriteIds: (id) => {
                fetch(`https://psychic-potato-7vvw4xvvrw7934xw-3001.app.github.dev/users/${id}/favorites`)
                    .then((res) => res.json())
                    .then((response) => {
                        setStore({ favoriteIds: response });
                    })
                    .catch((err) => console.log(err))
            },
            getFavoriteData: (coin_id) => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-pro-api-key': process.env.COINGECKO_KEY
                    }
                };
                fetch(`https://pro-api.coingecko.com/api/v3/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, options)
                    .then((res) => res.json())
                    .then((response) => setStore({ favoriteData: [...getStore().favoriteData, response] }))
                    .catch((err) => console.log(err))
            }

>>>>>>> d1dab542c92303f5cab5f08ea829ca8a1266468d
        },
    };
};

export default getState;
