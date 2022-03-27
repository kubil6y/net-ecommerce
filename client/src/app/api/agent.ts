import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep(500); // TODO
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;

    switch (status) {
      case 400:
        // two types of 400 errors (bad requests, validation errors)
        if (data?.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }

        toast.error(data.title);
        break;

      case 401:
        toast.error(data.title);
        break;

      case 500:
        // redirect user to developer exception page
        history.push({
          pathname: "/server-error",
          state: {
            error: data,
          },
        });
        break;

      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("/products"),
  details: (id: number) => requests.get(`/products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get("/buggy/bad-request"),
  get401Error: () => requests.get("/buggy/unauthorized"),
  get404Error: () => requests.get("/buggy/not-found"),
  get500Error: () => requests.get("/buggy/server-error"),
  getValidationError: () => requests.get("/buggy/validation-error"),
};

export const agent = {
  Catalog,
  TestErrors,
};
