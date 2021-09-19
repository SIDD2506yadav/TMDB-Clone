import {
    SEARCH_BASE_URL,
    SEARCH_SHOW_BASE_URL,
    POPULAR_BASE_URL,
    POPULAR_SHOW_BASE_URL,
    TOPRATED_BASE_URL,
    TOPRATED_SHOW_BASE_URL,
    API_URL,
    API_KEY,
    REQUEST_TOKEN_URL,
    LOGIN_URL,
    SESSION_ID_URL,
} from "./config";

const defaultConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

const apiSettings = {
    fetchMovies: async (searchTerm, page, type, category) => {
        const endpoint = searchTerm
            ? `${
                  category === "movie" ? SEARCH_BASE_URL : SEARCH_SHOW_BASE_URL
              }${searchTerm}&page=${page}`
            : `${
                  category === "movie"
                      ? type === "popular"
                          ? POPULAR_BASE_URL
                          : TOPRATED_BASE_URL
                      : type === "popular"
                      ? POPULAR_SHOW_BASE_URL
                      : TOPRATED_SHOW_BASE_URL
              }&page=${page}`;
        return await (await fetch(endpoint)).json();
    },
    fetchSimilar: async (movieId) => {
        const endpoint = `${API_URL}movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`;
        return await (await fetch(endpoint)).json();
    },
    fetchSimilarShow: async (movieId) => {
        const endpoint = `${API_URL}tv/${movieId}/similar?api_key=${API_KEY}&language=en-US`;
        return await (await fetch(endpoint)).json();
    },
    fetchActor: async (actorId) => {
        const endpoint = `${API_URL}person/${actorId}?api_key=${API_KEY}&language=en-US`;
        return await (await fetch(endpoint)).json();
    },
    fetchMovie: async (movieId) => {
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        return await (await fetch(endpoint)).json();
    },
    fetchShow: async (showId) => {
        const endpoint = `${API_URL}tv/${showId}?api_key=${API_KEY}`;
        return await (await fetch(endpoint)).json();
    },
    fetchShowCredit: async (showId) => {
        const creditsEndpoint = `${API_URL}tv/${showId}/credits?api_key=${API_KEY}`;
        return await (await fetch(creditsEndpoint)).json();
    },
    fetchCredits: async (movieId) => {
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        return await (await fetch(creditsEndpoint)).json();
    },
    // Bonus material below for login
    getRequestToken: async () => {
        const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
        return reqToken.request_token;
    },
    authenticate: async (requestToken, username, password) => {
        const bodyData = {
            username,
            password,
            request_token: requestToken,
        };
        // First authenticate the requestToken
        const data = await (
            await fetch(LOGIN_URL, {
                ...defaultConfig,
                body: JSON.stringify(bodyData),
            })
        ).json();
        // Then get the sessionId with the requestToken
        if (data.success) {
            const sessionId = await (
                await fetch(SESSION_ID_URL, {
                    ...defaultConfig,
                    body: JSON.stringify({ request_token: requestToken }),
                })
            ).json();
            return sessionId;
        }
    },
    rateMovie: async (sessionId, movieId, value) => {
        const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

        const rating = await (
            await fetch(endpoint, {
                ...defaultConfig,
                body: JSON.stringify({ value }),
            })
        ).json();

        return rating;
    },
};

export default apiSettings;
