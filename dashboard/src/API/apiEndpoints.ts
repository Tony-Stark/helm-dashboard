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

export const getToolCurrentVersion = async () => {
    return await api.get("/status").then((res) => res.data.CurVer);
};

export const getToolLatestVersion = async () => {
    return await api.get("/status").then((res) => res.data.LatestVer);
}

export const getInstalledReleases = async () => {
    return await api.get("/api/helm/releases").then((res) => res.data);
}

export const getClusters = async () => {
    return await api.get("/api/k8s/contexts").then((res) => res.data);
}

export const getNamespaces = async () => {
    return await api.get("/api/k8s/namespaces/list").then((res) => res.data.items);
}

export const getRepositories = async () => {
    return await api.get("/api/helm/repositories").then((res) => res.data);
}

