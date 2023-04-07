import axios, { AxiosResponse, AxiosError } from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Dummy {}
interface DummyType {
  title: string;
  body: string;
  userId: number;
}

interface Config<D = any> {
  method?: "post" | "get" | "put" | "patch" | "delete" | "head" | "options";
  url?: string;
  data?: D;
}

interface makeAxios {
  get: <T = any, R = AxiosResponse<T>>(url: string) => Promise<R>;
  post: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data: D
  ) => Promise<R>;
  isAxiosError: (error: unknown) => error is AxiosError; // any보다는 unknown을..
  (config: Config): void;
  (url: string, config: Config): void;
}

const myAxios: makeAxios = axios;
(async () => {
  try {
    const getRes = await myAxios.get<Post, AxiosResponse<Post>>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const postRes = await myAxios.post<Dummy, AxiosResponse<Dummy>, DummyType>(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        title: "foo",
        body: "bar",
        userId: 3,
      }
    );

    const postRes2 = await axios({
      method: "post",
      url: "...",
      data: {
        title: "foo",
        body: "bar",
        userId: 3,
      },
    });
  } catch (error) {
    if (myAxios.isAxiosError(error)) {
      // 위와 같은 방식
      console.error(
        (error as AxiosError<{ message: string }>).response?.data.message
      );
    }
  }
})();

// 명령: ts-node axios.ts
