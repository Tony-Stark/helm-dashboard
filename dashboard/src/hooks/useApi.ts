/**
 * this file aggregates all the hooks that are used
 * to query the API, using react-query.
 * 
 * 
 */

import { useQuery } from "@tanstack/react-query";
import { Chart, Repository } from "../data/types";
import { QueryFunctionContext } from "@tanstack/react-query";
import "../API/apiEndpoints";
import * as api from "../API/apiEndpoints";
export const useToolCurrentVersion = () => {
    return useQuery({
        queryKey: ['toolCurrentVersion'],
        queryFn: api.getToolCurrentVersion
    });
};

export const useToolLatestVersion = () => {
    return useQuery({
        queryKey: ['toolLatestVersion'],
        queryFn: api.getToolLatestVersion
    });
}

export const useInstalledReleases = () => {
    return useQuery({
        queryKey: ['installedReleases'],
        queryFn: api.getInstalledReleases
    });
}

export const useClusters = () => {
    return useQuery({
        queryKey: ['clusters'],
        queryFn: api.getClusters
    });
}

export const useNamespaces = () => {
    return useQuery({
        queryKey: ['namespaces'],
        queryFn: api.getNamespaces
    });
}

export const useRepositories = () => {
    return useQuery({
        queryKey: ['repositories'],
        queryFn: api.getRepositories
    });
}

// hook for getting the charts of a repository
// it gets {repository} as a parameter, which is the repository object that
// contains the name of the repository, and we get for example from 
// the params of the RepositoryViewer component
// it should return a useQuery hook that queries the API for the charts of the repository

export const useRepositoryCharts = (repository: Repository | undefined) => {
    return useQuery({
        queryKey: ['repositoryCharts', repository?.name],
        enabled: repository !== undefined, 
        queryFn: () => api.getRepositoryCharts
    });
}

// hook for getting the index of a repository in the repositories array
// it should rely on a previous hook, useRepositories, to get the repositories array
// it should ultimately return a useQuery hook
// it should rely on findRepositoryIndex function, which should be defined in apiEndpoints.ts
// findRepositoryIndex should return the index of the repository in the repositories array
// it should also rely on the 'repositories' query key to get the repositories array
export const useRepositoryIndex = (repository: Repository) => {
    return useQuery({
        queryKey: ['repositories', 'index', repository?.name],
        enabled: !!useRepositories,
        queryFn: () => {
            const repositories = useRepositories();
            if (repositories.data) {
                return api.findRepositoryIndex(repositories.data, repository);
            }
        }
    });
}




//once we know the index, using useRepositoryIndex, we can get the url
// by accessing the repositories array at the index we got from useRepositoryIndex
export const useRepositoryUrl = (repository: Repository) => {
    return useQuery({
        queryKey: ['repositoryIndex', name],
        enabled: !!useRepositoryIndex,
        queryFn: () => {
           const index = useRepositoryIndex(repository);
           if (index === -1)
           return useRepositories().data[useRepositoryIndex(repository)?.data].url
        }
    });
}
