import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8090/auth/upstox",
});

export const searchStocks = async (query) => {
    const response = await API.get("/search", {
        params: {
            q: query,
        },
    });

    return response.data.data;
};

export const getQuote = async (instrumentKey) => {
    const response = await API.get("/quote", {
        params: {
            instrument_key: instrumentKey,
        },
    });

    return response.data;
};