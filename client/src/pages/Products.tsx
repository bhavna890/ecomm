import { useFetch } from "@/hooks/useFetch";
// import React from "react";

import { useParams } from "react-router-dom";

const Products = () => {
  const { category } = useParams();
  const { data } = useFetch(`http://localhost:4000/products/${category}`);
  console.log(data);

  return <div></div>;
};

export default Products;