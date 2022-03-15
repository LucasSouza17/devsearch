/** @format */

import { Actionsheet, Box, Text } from "native-base";

interface OrderModalProps {
  isVisible: boolean;
  active: "asc" | "desc";
  onClose: () => void;
  onPressAsc: () => void;
  onPressDesc: () => void;
}

export function OrderModal({
  isVisible,
  active,
  onClose,
  onPressAsc,
  onPressDesc,
}: OrderModalProps) {
  return (
    <Actionsheet isOpen={isVisible} onClose={onClose}>
      <Actionsheet.Content>
        <Box p={2}>
          <Text fontSize="lg" color="blue.500">
            Ordenação
          </Text>
        </Box>
        <Actionsheet.Item
          background={active === "asc" ? "blue.100" : "transparent"}
          onPress={onPressAsc}>
          <Text fontSize="md" color={active === "asc" ? "blue.500" : "black"}>
            A - Z
          </Text>
        </Actionsheet.Item>
        <Actionsheet.Item
          background={active === "desc" ? "blue.100" : "transparent"}
          onPress={onPressDesc}>
          <Text fontSize="md" color={active === "desc" ? "blue.500" : "black"}>
            Z - A
          </Text>
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
