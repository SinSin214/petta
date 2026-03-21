import axios from "axios";
import { useState } from "react";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
}

export const api = {
  get: (path: string, data?: Object) =>
    requestAPI(path, RequestMethod.GET),

  post: (path: string, data: Object) =>
    requestAPI(path, RequestMethod.POST, data),
};

export const requestAPI = async (path: string, method: RequestMethod, data?: Object): Promise<any> => {
    try {
        const data = await fetchApi(path, method, {});

        return data;
    } catch(err: any) {
        console.log(err);
        throw new Error(err);
    }
}

const fetchApi = async (path: string, method: RequestMethod, data: Object): Promise<Object> => {
    const axiosRes = await axios({
        method: method,
        url: `${process.env.NEXT_PUBLIC_API_ROUTE}${path}`,
        data: data,
        withCredentials: true
    });

    return axiosRes.data;
}

export function useApi() {
  const [loading, setLoading] = useState(false);

  async function callApi(apiCall: () => Promise<T>): Promise<T | null> {
    try {
      setLoading(true);

      const data = await apiCall();

      return data;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { callApi, loading };
}