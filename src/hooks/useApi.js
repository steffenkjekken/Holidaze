import { useEffect, useState} from 'react';
import axios from 'axios';

const useApi = (url, payload, method ) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
          try {
            const response = await axios.request({
              data: payload,
              method,
              url,
            });
    
            setData(response.data);
          } catch (error) {
            setIsError(error.message);
          } finally {
            setIsLoading(false);
          }
        })();
      }, [url, method, payload]);
    
      return { data, isError, isLoading };
    };

  export default useApi