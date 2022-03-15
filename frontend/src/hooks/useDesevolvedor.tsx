/** @format */

import moment from "moment";
import { useEffect, useState } from "react";
import { useToast } from "native-base";
import { useDebouncedCallback } from "use-debounce/lib";
import { api } from "../services/api";

interface DesenvolvedorProps {
  id: number;
  nome: string;
  sexo: "M" | "F";
  datanascimento: string;
  idade: number;
  hobby: string;
  Niveis: {
    id: number;
    nivel: string;
  };
}

export function useDesenvolvedor<T = unknown>() {
  const toast = useToast();

  const [desenvolvedores, setDesenvolvedores] = useState<DesenvolvedorProps[]>(
    [],
  );
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getDesenvolvedores();
  }, [order, search]);

  const getDesenvolvedores = async () => {
    try {
      setPage(1);
      setIsLoading(true);
      const response = await api.get(
        `/dev?page=1&order=${order}&search=${search}`,
      );

      if (response.status === 404) {
        setIsLoading(false);
      }

      const responseTotalPages = Math.ceil(
        Number(response.headers["x-total-count"]) / 5,
      );
      setTotalPages(responseTotalPages);

      const formatedData = response.data.map((data: DesenvolvedorProps) => {
        return {
          ...data,
          datanascimento: moment(new Date(data.datanascimento))
            .utc()
            .format("DD/MM/YYYY"),
        };
      });

      setDesenvolvedores(formatedData);
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
        `/dev?page=${page}&order=${order}&search=${search}`,
      );

      const formatedData = response.data.map((data: DesenvolvedorProps) => {
        return {
          ...data,
          datanascimento: moment(new Date(data.datanascimento))
            .utc()
            .format("DD/MM/YYYY"),
        };
      });

      if (totalPages >= page) {
        setDesenvolvedores([...desenvolvedores, ...formatedData]);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const typeSearch = useDebouncedCallback((text: string) => {
    setSearch(text);
  }, 800);

  const removeDev = async (id: number) => {
    try {
      await api.delete(`/dev/${id}`);

      const newDesenvolvedores = desenvolvedores.filter(data => data.id !== id);

      setDesenvolvedores([...newDesenvolvedores]);

      toast.show({
        description: "Desenvolvedor removido com sucesso!",
        duration: 3000 // 3 segundos,
      })

    } catch (err) {
      toast.show({
        description: "Erro ao remover desenvolvedor."
      })
    }
  };

  return {
    desenvolvedores,
    page,
    totalPages,
    order,
    setOrder,
    isLoading,
    getDesenvolvedores,
    changePage,
    typeSearch,
    removeDev
  };
}
