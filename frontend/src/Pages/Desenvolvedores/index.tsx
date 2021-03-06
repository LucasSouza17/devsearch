/** @format */

import React, { useState } from "react";
import {
  Box,
  Button,
  Fab,
  FlatList,
  Heading,
  Icon,
  Input,
  theme,
  VStack,
} from "native-base";
import { RefreshControl, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";

import { DevCard } from "../../components/DevCard";
import { OrderModal } from "../../components/OrderModal";
import { useDesenvolvedor } from "../../hooks/useDesevolvedor";
import { RemoveModal } from "../../components/RemoveModal";
import { useNavigation } from "@react-navigation/native";

export const Desenvolvedores: React.FC = () => {
  const navigation = useNavigation();

  const {
    desenvolvedores,
    totalPages,
    getDesenvolvedores,
    isLoading,
    page,
    changePage,
    order,
    setOrder,
    typeSearch,
    removeDev,
  } = useDesenvolvedor();

  const [isOrderModalVisible, setIsOrderModalVisible] =
    useState<boolean>(false);
  const [isModalRemoveVisible, setIsModalRemoveVisible] = useState(false);

  const [selectedDev, setSelectedDev] = useState<number>(0);

  return (
    <Box background="white" width="full" height="full">
      <Box marginTop={StatusBar.currentHeight! + 20} paddingX={4}>
        <Heading color="blue.500" size="md">Desenvolvedores</Heading>
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
        onPress={() => setIsOrderModalVisible(true)}>
        Ordenar
      </Button>
      <FlatList
        marginTop={2}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.blue[400]]}
            refreshing={isLoading}
            onRefresh={() => {
              getDesenvolvedores();
            }}
          />
        }
        onEndReached={() => {
          totalPages > page ? changePage(page + 1) : {};
        }}
        onEndReachedThreshold={0.6}
        data={desenvolvedores}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <VStack margin={4} space={4}>
            <DevCard
              nome={item.nome}
              sexo={item.sexo}
              datanascimento={item.datanascimento}
              idade={item.idade}
              hobby={item.hobby}
              nivel={item.Niveis.nivel}
              onPressRemove={() => {
                setIsModalRemoveVisible(true), setSelectedDev(item.id);
              }}
              onPressUpdate={() => navigation.navigate("FormDesenvolvedor", {type: "update", dev: item})}
            />
          </VStack>
        )}
      />
      <Fab
        onPress={() =>
          navigation.navigate("FormDesenvolvedor", { type: "create" })
        }
        colorScheme="blue"
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon as={Feather} name="plus" size="sm" />}
      />
      <OrderModal
        isVisible={isOrderModalVisible}
        onClose={() => setIsOrderModalVisible(false)}
        active={order}
        onPressAsc={() => {
          setIsOrderModalVisible(false), setOrder("asc");
        }}
        onPressDesc={() => {
          setIsOrderModalVisible(false), setOrder("desc");
        }}
      />

      <RemoveModal
        title="Remover Desenvolvedor"
        description={
          "Se voc?? tocar no bot??o remover, voc?? ir?? excluir permanentemente o desenvolvedor da sua base.\nSabendo das informa????es, deseja remover?"
        }
        isOpen={isModalRemoveVisible}
        onClose={() => setIsModalRemoveVisible(false)}
        onCancel={() => setIsModalRemoveVisible(false)}
        onRemove={() => {
          setIsModalRemoveVisible(false), removeDev(selectedDev);
        }}
      />
    </Box>
  );
};
