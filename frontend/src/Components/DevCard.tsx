import { Box, Button, HStack, Text, VStack } from "native-base";

interface DevCardProps {
  nome: string
  sexo: "M" | "F"
  datanascimento: string
  idade: number
  hobby: string
  nivel: string
}

export function DevCard({nome, sexo, datanascimento, idade, hobby, nivel}: DevCardProps) {
  return (
    <Box rounded="sm" background="gray.50">
      <Box background="blue.500" padding={2} rounded="sm" roundedBottom={0}>
        <Text fontSize="lg" color="white">{nome}</Text>
      </Box>
      <Box padding={2}>
        <HStack space={8} marginTop={4}>
          <VStack alignItems="flex-start">
            <Text fontSize="xs">Data de nascimento:</Text>
            <Text fontSize="lg">{datanascimento}</Text>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontSize="xs">Idade:</Text>
            <Text fontSize="lg">{idade}</Text>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontSize="xs">Sexo:</Text>
            <Text fontSize="lg">{sexo === "M" ? "Masculino" : "Feminino"}</Text>
          </VStack>
        </HStack>
        <VStack marginTop={4}>
          <Text fontSize="xs">Hobby:</Text>
          <Text fontSize="lg">{hobby}</Text>
        </VStack>
      </Box>
      <Box margin={2} background="blue.100" padding={2} rounded="sm" alignItems="center">
        <Text fontWeight="bold" fontSize="md" color="blue.500">{nivel}</Text>
      </Box>
      <HStack flexWrap="wrap" margin={2} marginTop={0} space={2} justifyContent="center">
        <Button w="48.5%" variant="outline" colorScheme="orange" marginTop={2}>Editar</Button>
        <Button w="48.5%" variant="outline" colorScheme="red" marginTop={2}>Remover</Button>
      </HStack>
    </Box>
  )
}