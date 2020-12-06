import { useEffect, useState } from "react";
import axios from "axios";

export default function useScrollFilter(query, pageNumber) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false); // For not found

  useEffect(() => {
    setProducts([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: process.env.REACT_APP_PRODUCTS_URL + "?" + query,
      params: { page: pageNumber - 1 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData(res.data);
        setProducts((prevProducts) => {
          setHasMore(prevProducts.length + res.data.products.length === res.data.hits ? false : true);
          return [...new Set([...prevProducts, ...res.data.products])];
        });
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { data, loading, error, products, hasMore };
}
