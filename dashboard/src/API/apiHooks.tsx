/**
 * API Hooks:
 * using tanstack and axios, we can create custom hoolks to fetch data
 * from our API
 * All the API calls are GET requests.
 */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_URL = "http://localhost:8080";


export const useGetToolVersion = () => {
    const [version, setVersion] = useState<string | null>(null);    
    return version;
    }

