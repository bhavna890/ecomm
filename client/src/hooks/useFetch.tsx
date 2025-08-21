import { useEffect, useState } from "react";


export const useFetch = (url: string,dataType?: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<typeof dataType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (!json.success) {
          setError(json.error || "Something went wrong!");
          // console.log("RESPONSE JSON:", json);

          return;

        }
        setData(json.data);
      } catch (error: any) {
        setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { loading, error, data };
};