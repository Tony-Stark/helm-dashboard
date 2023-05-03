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




