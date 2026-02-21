import React from "react";
import { fetchProductById } from "../../../services/apiProducts";
import { useQuery } from "@tanstack/react-query";
const useFetchProductById = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProductById(id),
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error };
};

export default useFetchProductById;
