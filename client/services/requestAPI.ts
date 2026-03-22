import axios from "axios";
import { useState } from "react";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
}

const fetchApi = async (path: string, method: RequestMethod, data: Object): Promise<Object> => {
  try{
      console.log(`${process.env.NEXT_PUBLIC_API_ROUTE}`);
      const axiosRes = await axios({
        method: method,
        url: `${process.env.NEXT_PUBLIC_API_ROUTE}${path}`,
        data: data,
        withCredentials: true
      });
    return axiosRes.data;
  }
  catch(err: any) {
    console.log(err);
    throw new Error(err);
  }
}

export const getRequest = async (path: string): Promise<any> => {
    try {
        const result = await fetchApi(path, RequestMethod.GET, {});
        return result;
    } catch(err: any) {
        console.log(err);
        throw new Error(err);
    }
}

export const postRequest = async (path: string, data: Object): Promise<any> => {
    try {
        const result = await fetchApi(path, RequestMethod.POST, data);
        return result;
    } catch(err: any) {
        console.log(err);
        throw new Error(err);
    }
}