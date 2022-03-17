/** @format */

import moment from "moment";
import { useEffect, useState } from "react";
import { useToast } from "native-base";
import { useDebouncedCallback } from "use-debounce/lib";
import { api } from "../services/api";

interface NivelProps {
  id: number;
  nivel: string;
  _count: {
    Desenvolvedores: number;
  };
}

export function useNivel<T = unknown>() {
  const toast = useToast();

  const [niveis, setNiveis] = useState<NivelProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getNiveis();
  }, [order, search]);

  const getNiveis = async () => {
    try {
      setPage(1);
      setIsLoading(true);
      const response = await api.get(
        `/nivel?page=1&order=${order}&search=${search}`,
      );

      if (response.status === 404) {
        setIsLoading(false);
      }

      const responseTotalPages = Math.ceil(
        Number(response.headers["x-total-count"]) / 5,
      );
      setTotalPages(responseTotalPages);

      setNiveis(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const changePage = async (page: number) => {
    try {
      setPage(page);
      setIsLoading(true);
      const response = await api.get(
        `/nivel?page=${page}&order=${order}&search=${search}`,
      );

      setNiveis([...niveis, ...response.data])
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const typeSearch = useDebouncedCallback((text: string) => {
    setSearch(text);
  }, 500);

  return {
    getNiveis,
    order,
    niveis,
    setOrder,
    isLoading,
    changePage,
    typeSearch,
    totalPages,
    page
  };
}
