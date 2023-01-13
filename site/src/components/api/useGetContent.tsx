import { useEffect, useRef, useState } from "react";

type Content = {
  authors: Model.Person[];
  posts: Model.BlogPost[];
  status: "UNSET" | "FETCHING" | "DONE";
};
const DEFAULT_CONTENT = {
  authors: [],
  posts: [],
  status: "UNSET",
} as Content;
let WARN_ONCE = true;
function warn() {
  if (!WARN_ONCE) return;
  WARN_ONCE = false;
  console.info("Delay is added on resolving the response!");
}
export const useGetContent = (force?: number, delay = false): Content => {
  const timerRef = useRef<any>(null);
  const [content, setContent] = useState<Content>({ ...DEFAULT_CONTENT });
  useEffect(() => {
    delay && warn();
    setContent(p => ({
      ...p,
      status: "FETCHING",
    }));
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      (async () => {
        const server = "http://127.0.0.1:3543";
        const unSortedPosts = await fetch(server + "/blogs").then(_ => _.json());
        const authors = await fetch(server + "/persons").then(_ => _.json());
        const posts = unSortedPosts.sort((a: any, b: any) => {
          const aDate = new Date((a.publishDate as string).split("T")[0]);
          const bDate = new Date((b.publishDate as string).split("T")[0]);
          if (aDate > bDate) {
            return -1;
          } else if (aDate < bDate) {
            return 1;
          } else {
            return 0;
          }
        });
        setTimeout(
          () => {
            setContent({
              posts,
              authors,
              status: "DONE",
            });
          },
          delay ? 500 : 0
        );
      })();
    }, 100);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [delay, force]);

  return content;
};
