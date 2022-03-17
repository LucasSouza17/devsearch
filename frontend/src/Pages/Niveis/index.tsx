/** @format */

import React, { useState } from "react";
import {
  Box,
  Button,
  Fab,
  FlatList,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  theme,
  VStack,
} from "native-base";
import { RefreshControl, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { OrderModal } from "../../components/OrderModal";
import { useNivel } from "../../hooks/useNivel";
import { NivelCard } from "../../components/NivelCard";

export const Niveis: React.FC = () => {
  const {
    order,
    setOrder,
    isLoading,
    getNiveis,
    niveis,
    totalPages,
    changePage,
    typeSearch,
    page
  } = useNivel();

  const [isOrderModalVisible, setIsOrderModalVisible] =
    useState<boolean>(false);

  return (
    <Box background="white" width="full" height="full">
      <Box marginTop={StatusBar.currentHeight! + 20} paddingX={4}>
        <Heading color="blue.500">Níveis</Heading>
      </Box>
      <Box paddingX={4} marginTop={4}>
        <Input
          variant="outline"
          _focus={{ borderColor: "blue.500" }}
          placeholder="Pesquise pelos níveis"
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
              getNiveis();
            }}
          />
        }
        onEndReached={() => totalPages > page ? changePage(page + 1): {}}
        onEndReachedThreshold={0.4}
        data={niveis}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <VStack margin={4} space={4}>
            <NivelCard
              nivel={item.nivel}
              count={item._count.Desenvolvedores}
              onPressRemove={() => {}}
              onPressUpdate={() => {}}
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
    </Box>
  );
};
