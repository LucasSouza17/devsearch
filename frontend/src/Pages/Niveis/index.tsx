/** @format */

import React from "react";
import { Box, Fab, Heading, Icon, Input } from "native-base";
import { StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";

export const Niveis: React.FC = () => {
  return (
    <Box background="white" width="full" height="full">
      <Box>
        <Heading
          color="blue.500"
          marginTop={StatusBar.currentHeight! + 20}
          paddingX={4}>
          Níveis
        </Heading>
      </Box>
      <Box paddingX={4} marginTop={4}>
        <Input
          variant="outline"
          _focus={{ borderColor: "blue.500" }}
          placeholder="Pesquise pelos níveis"
        />
      </Box>
      <Box marginTop={4}></Box>
      <Fab
        onPress={() => {}}
        colorScheme="blue"
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon as={Feather} name="plus" size="sm" />}
      />
    </Box>
  );
};
