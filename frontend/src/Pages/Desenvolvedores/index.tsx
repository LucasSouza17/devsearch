/** @format */

import React, { useEffect, useState } from "react";
import {
  Actionsheet,
  Box,
  Button,
  Fab,
  FlatList,
  Heading,
  Icon,
  Input,
  Text,
  theme,
  VStack,
} from "native-base";
import { RefreshControl, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { DevCard } from "../../Components/DevCard";
import { api } from "../../services/api";
import moment from "moment";
import { useDebouncedCallback } from "use-debounce";

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

const Home: React.FC = () => {
  const [desenvolvedores, setDesenvolvedores] = useState<DesenvolvedorProps[]>(
    [],
  );
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [modalOrderOpen, setModalOrderOpen] = useState<boolean>(false);

  useEffect(() => {
    getDesenvolvedores();
  }, [page, order, search]);

  const getDesenvolvedores = async () => {
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

    setDesenvolvedores(formatedData);
    setIsLoading(false);
  };

  const typeSearch = useDebouncedCallback((text: string) => {
    setSearch(text);
  }, 800);

  return (
    <Box background="white" width="full" height="full">
      <Box>
        <Heading
          color="blue.500"
          marginTop={StatusBar.currentHeight! + 20}
          paddingX={4}>
          Desenvolvedores
        </Heading>
      </Box>
      <Box paddingX={4} marginTop={4}>
        <Input
          variant="outline"
          _focus={{ borderColor: "blue.500" }}
          placeholder="Pesquise pelos desenvolvedores"
          onChangeText={(text) => typeSearch(text)}
        />
      </Box>
      <Button
        variant="outline"
        colorScheme="blue"
        marginX={4}
        marginTop={4}
        onPress={() => setModalOrderOpen(true)}>
        Ordenar
      </Button>
      <FlatList
        marginTop={2}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.blue[400]]}
            refreshing={isLoading}
            onRefresh={() => getDesenvolvedores()}
          />
        }
        data={desenvolvedores}
        renderItem={({ item }) => (
          <VStack margin={4} space={4}>
            <DevCard
              nome={item.nome}
              sexo={item.sexo}
              datanascimento={item.datanascimento}
              idade={item.idade}
              hobby={item.hobby}
              nivel={item.Niveis.nivel}
            />
          </VStack>
        )}
      />
      <Fab
        onPress={() => {}}
        colorScheme="blue"
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon as={Feather} name="plus" size="sm" />}
      />
      <Actionsheet
        isOpen={modalOrderOpen}
        onClose={() => setModalOrderOpen(false)}>
        <Actionsheet.Content>
          <Box p={2}>
            <Text fontSize="lg" color="blue.500">
              Ordenação
            </Text>
          </Box>
          <Actionsheet.Item
            background={order === "asc" ? "blue.100" : "transparent"}
            onPress={() => {
              setModalOrderOpen(false), setOrder("asc");
            }}>
            <Text fontSize="md" color={order === "asc" ? "blue.500" : "black"}>
              A - Z
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            background={order === "desc" ? "blue.100" : "transparent"}
            onPress={() => {
              setModalOrderOpen(false), setOrder("desc");
            }}>
            <Text fontSize="md" color={order === "desc" ? "blue.500" : "black"}>
              Z - A
            </Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default Home;
