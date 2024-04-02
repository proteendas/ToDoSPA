import { useEffect } from "react";

export const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | ToDo-SPA`;
  }, [title]);

  return null;
};
