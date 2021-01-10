import { useEffect, useState } from "react";
import axios from "axios";

export default function useScrollFilter(query, pageNumber) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false); // For not found
  const [autocomplete, setAutocomplete] = useState([]);
  let cancel;

  useEffect(() => {
    setProducts([]);
    setAutocomplete([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (query.indexOf("q=") !== -1) {
      autocompleteRequest();
    }
    searchRequest();
    console.log(query);
  }, [query, pageNumber]);
  return { data, loading, error, products, hasMore, autocomplete };

  function autocompleteRequest() {
    axios({
      method: "GET",
      url: process.env.REACT_APP_AUTOCOMPLETE_URL + "?" + query,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setAutocomplete(res.data.autocomplete);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }

  function searchRequest() {
    axios({
      method: "GET",
      url: process.env.REACT_APP_PRODUCTS_URL + "?" + query,
      params: { page: pageNumber - 1 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData(res.data);
        setProducts((prevProducts) => {
          setHasMore(
            prevProducts.length + res.data.products.length === res.data.hits
              ? false
              : true
          );
          return [...new Set([...prevProducts, ...res.data.products])];
        });
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }
}
