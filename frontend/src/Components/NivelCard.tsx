/** @format */

import { Box, Button, HStack, Text, VStack } from "native-base";

interface NivelCardProps {
  nivel: string;
  count: number;
  onPressUpdate: () => void;
  onPressRemove: () => void;
}

export const NivelCard = ({
  nivel,
  count,
  onPressRemove,
  onPressUpdate,
}: NivelCardProps) => {
  return (
    <Box rounded="sm" background="gray.50">
      <VStack space={4}>
        <HStack
          background="blue.100"
          rounded="sm"
          padding={2}
          justifyContent="space-between">
          <Text color="blue.500" fontWeight="bold">
            Nível
          </Text>
          <Text color="blue.500" fontWeight="bold">
            Desenvolvedores
          </Text>
        </HStack>
        <HStack padding={2} justifyContent="space-between">
          <Text>{nivel}</Text>
          <Text>{count}</Text>
        </HStack>
        <HStack
          flexWrap="wrap"
          margin={2}
          marginTop={0}
          space={2}
          justifyContent="center">
          <Button
            w="48.5%"
            variant="outline"
            colorScheme="orange"
            marginTop={2}
            onPress={onPressUpdate}>
            Editar
          </Button>
          <Button
            w="48.5%"
            variant="outline"
            colorScheme="red"
            marginTop={2}
            onPress={onPressRemove}>
            Remover
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
