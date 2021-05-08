import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (requestConfig.method === undefined) {
        response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
        });
      } else {
        response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: JSON.stringify(requestConfig.body ? requestConfig.body : null),
        });
      }

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  //   return { isLoading: isLoading, error: error, sendRequest: sendRequest }; -> The same than the next line, property and value are the same
  return { isLoading, error, sendRequest };
};

export default useHttp;
