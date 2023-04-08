// esmoduleinterop : true로 두면 commonjs도 es6처럼 임포트 가능
import React, {
  useState,
  useCallback,
  useRef,
  ReactElement,
  FunctionComponent,
  FC,
} from "react";

interface p1 {
  name: string;
  title: string;
}
// ReactElement == JSX.Element
// FunctionComponent == FC
const WordRelay: FC<p1> = (props) => {
  const [word, setWord] = useState<string>("james");
  const [stt, setStt] = useState(() => (() => {})());
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef<HTMLInputElement>(null); // null 이야야 RefObject 타입에 걸림.

  // e: MouseEvent, FormEvent,
  const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("딩동댕");
        setWord(value);
        setValue("");
        if (input) {
          input.focus();
        }
      } else {
        setResult("땡");
        setValue("");
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
