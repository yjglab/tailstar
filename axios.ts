import axios, { Axios, AxiosError, AxiosResponse, isAxiosError } from "axios";

// type(간단) 또는 interface(객체지향적) 선택
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

(async () => {
  try {
    // axios 사용법1
    const getRes = await axios.get<Post, AxiosResponse<Post>>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const postRes = axios.post<Dummy, AxiosResponse<Dummy>, DummyType>(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        title: "foo",
        body: "bar",
        userId: 3,
      }
    );

    // axios 사용법2
    const postRes2 = await axios({
      method: "post",
      url: "...",
      data: {
        title: "foo",
        body: "bar",
        userId: 3,
      },
    });

    console.log(getRes.data);
    console.log(getRes.data.userId);
    console.log(getRes.data.id);
    console.log(getRes.data.title);
    console.log(getRes.data.body);
  } catch (error) {
    // error가 AxiosError가 아닌 다른 에러일 수 있으므로 타입 가드 이용. (AxiosError가 class이기 때문에 쓰기 좋음)
    if (error instanceof AxiosError) {
      console.error(
        (error as AxiosError<{ message: string }>).response?.data.message
      );
    }
    if (isAxiosError(error)) {
      // 위와 같은 방식
      console.error(
        (error as AxiosError<{ message: string }>).response?.data.message
      );
    }
  }
})();

// 명령: ts-node axios.ts
