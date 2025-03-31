import axios, { AxiosError } from 'axios';

export const axiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        throw new AxiosError(error.message);
      } else if (error instanceof Error) {
        throw new Error(error.stack);
      }
    }
  );
};
