/**
 * API Endpoints:
 * Aggregates all API endpoints, providing easy acess using
 * axios.
 * this is so it is later easier to be used by tanstack's react-query
 * library, querying the data from the API and presenting it to the
 * frontend.
 */

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

export const getToolVersions = () => {
    return api.get("/status").then((res) => res.data);
}

export const getReposioryLatestVersion = (repositoryName: string) => {
    return api.get(`/api/helm/repositories/latestver?name=${repositoryName}`);
}