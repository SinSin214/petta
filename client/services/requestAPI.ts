import axios from "axios";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
}

const fetchApi = async (path: string, method: RequestMethod, data: Object): Promise<Object> => {
  try{
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
    const code = err?.response?.data?.code;
    throw new Error(typeof code === 'string' ? code : 'GENERIC_ERROR');
  }
}

export const getRequest = async (path: string): Promise<any> => {
    const result = await fetchApi(path, RequestMethod.GET, {});
    return result;
}

export const postRequest = async (path: string, data: Object): Promise<any> => {
    const result = await fetchApi(path, RequestMethod.POST, data);
    return result;
}