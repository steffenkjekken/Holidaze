import { useState, useEffect } from 'react';

const useApi = (url, token) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
    // Add other headers if needed
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(url, { headers });
      const json = await response.json();
      setData(json);
      return json; // Set the response object
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async (payload) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(url, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      setData(json);
      return json; // Set the response object
    } catch (error) {
      console.log(error);
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const putData = async (id, payload) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      setData(json);
      return json; // Set the response object
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers,
      });
      const json = await response.json();
      setData(json);
      return json; // Set the response object
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return {
    data,
    isLoading,
    isError,
    refresh,
    get: fetchData,
    post: postData,
    put: putData,
    del: deleteData,
  };
};

export default useApi;
