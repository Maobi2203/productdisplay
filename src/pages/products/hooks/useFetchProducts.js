import React from "react";
import { fetchProducts } from "../../../services/apiProducts";
import { useQuery } from "@tanstack/react-query";
const useFetchProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error };
};

export default useFetchProducts;
