import { useState, useEffect } from 'react';

const useApi = (url, token) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(url, { headers });
      const json = await response.json();
      setData(json);
      return json; 
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
      return json; 
    } catch (error) {
      console.log(error);
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const putData = async (id, payload, media = '') => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(`${url}/${id}${media}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      setData(json);
      return json; 
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
      if (response.ok) {
        if (response.status !== 204) {
          const json = await response.json();
          setData(json);
          return json;
        } else {
          return null;
        }
      } else {
        throw new Error('Request failed');
      }
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