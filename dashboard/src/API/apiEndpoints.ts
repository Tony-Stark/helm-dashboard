/**
 * API Endpoints:
 * Aggregates all API endpoints, providing easy acess using
 * axios.
 * this is so it is later easier to be used by tanstack's react-query
 * library, querying the data from the API and presenting it to the
 * frontend.
 */

import axios from "axios";
import { Repository } from "../data/types";
import { useRepositories } from "../hooks/useApi";
import { Query, QueryFunctionContext } from "@tanstack/react-query";

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

// getRepositoryCharts returns a promise of the charts array of a repository
// it should be used by the useRepositoryCharts hook in useApi.ts
// this hook has a queryKey of ['repositoryCharts', repository.name] that
// can be used by getRepositoryCharts to get the repository name.
// queryKey is always passed to a query function.
// queryKey is of type 

export const getRepositoryCharts = async (context: QueryFunctionContext<[string, string]>) => {
    const [_, repository] = context.queryKey;
    return await api.get(`/api/helm/repositories/${repository}`).then((res) => res.data);
}



// findRepositoryIndex returns a promise of the index by repository name to be used
// by the useRepositoryIndex hook in useApi.ts
// it won't call the API, but rather use the repositories array from the useRepositories hook
// it should be used by the useRepositoryIndex hook in useApi.ts
// repository name is sent using the queryKey of the useRepositoryIndex hook

export const findRepositoryIndex = async (repositoryName: string) => {
    const repositories = await useRepositories();
    const repositoryIndex = repositories.data.findIndex((repository: Repository) => repository.name === repositoryName);
    return repositoryIndex;
}
