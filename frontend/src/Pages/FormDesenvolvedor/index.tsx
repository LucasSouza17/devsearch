/** @format */

import { Feather } from "@expo/vector-icons";
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  useToast,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { DesenvolvedorProps } from "../../hooks/useDesevolvedor";
import { RootStackParamList } from "../../routes";
import { api } from "../../services/api";
import { applyMask, formatDate } from "../../utils";

interface VerifyFieldsProps {
  nome?: boolean;
  sexo?: boolean;
  datanascimento?: boolean;
  hobby?: boolean;
  nivel?: boolean;
}

export const FormDesenvolvedor = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'FormDesenvolvedor'>>();
  const toast = useToast();

  const {type, dev} = route.params

  const [nome, setNome] = useState<string>(dev?.nome ?? "");
  const [sexo, setSexo] = useState<string | "M" | "F">(dev?.sexo ?? "");
  const [dataNascimento, setDataNascimento] = useState<string>(dev?.datanascimento ?? "");
  const [hobby, setHobby] = useState<string>(dev?.hobby ?? "");
  const [nivel, setNivel] = useState<number>(dev?.Niveis.id ?? 0);
  const [niveis, setNiveis] = useState<{ id: number; nivel: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verifyFields, setVerifyFields] = useState<VerifyFieldsProps>();

  useEffect(() => {
    api
      .get("/nivel?full=true")
      .then((response) => {
        setNiveis(response.data);
      })
      .catch(() => {
        toast.show({
          description: "Erro ao buscar níveis.",
        });
      });
  }, []);

  const handleCreateDev = async () => {
    try {
      setIsLoading(true);

      let verifyings: VerifyFieldsProps = {};

      // Validações
      if (nome === "") {
        verifyings["nome"] = true;
      }
      if (sexo !== "M" && sexo !== "F") {
        verifyings["sexo"] = true;
      }
      if (!new Date(formatDate(dataNascimento)).getTime() || dataNascimento.length < 10) {
        verifyings["datanascimento"] = true;
      }
      if (hobby === "") {
        verifyings["hobby"] = true;
      }
      if (nivel === 0) {
        verifyings["nivel"] = true;
      }

      if (Object.keys(verifyings).length > 0) {
        setVerifyFields(verifyings);
        setIsLoading(false);
        return;
      }

      const data = {
        nome,
        sexo,
        datanascimento: formatDate(dataNascimento),
        hobby,
        nivel,
      };

      if(type === "create") {
        await api.post("/dev", data);
      } else {
        await api.put(`/dev/${dev?.id}`, data);
      }

      setIsLoading(false);
      toast.show({
        description: `Desenvolvedor ${type === "create" ? "adicionado" : "atualizado"} com sucesso!`,
        duration: 2000 // 2 segundos
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Tab" }],
      });
    } catch (err) {
      console.log(err)
      toast.show({
        description: `Erro ao ${type === "create" ? "criar" : "atualizar"} desenvolvedor`,
        duration: 2000 // 2 segundos
      });
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      background="white"
      width="full"
      height="full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <HStack
        marginTop={StatusBar.currentHeight! + 20}
        paddingX={4}
        space={4}
        alignItems="center">
        <Button variant="unstyled" padding={0}>
          <Icon
            onPress={() => navigation.goBack()}
            as={Feather}
            color="blue.500"
            name="chevron-left"
          />
        </Button>
        <Heading color="blue.500" size="md">
          {type === "create" ? "Adicionar" : "Atualizar"} desenvolvedor
        </Heading>
      </HStack>
      <ScrollView>
        <Box padding={4} justifyContent="space-between">
          <VStack space={4}>
            <FormControl isInvalid={verifyFields?.nome}>
              <FormControl.Label>Nome</FormControl.Label>
              <Input
                placeholder="Exemplo: Lucas Souza"
                _focus={{ borderColor: "blue.500" }}
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                O campo não foi informado.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={verifyFields?.sexo}>
              <FormControl.Label>Sexo</FormControl.Label>
              <Select
                selectedValue={sexo}
                placeholder="Escolha o sexo"
                _item={{
                  marginY: 1,
                }}
                _selectedItem={{
                  bg: "blue.100",
                  _text: {
                    color: "blue.500",
                  },
                }}
                onValueChange={(itemValue) => setSexo(itemValue)}>
                <Select.Item label="Masculino" value="M" />
                <Select.Item label="Feminino" value="F" />
              </Select>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                O campo não foi informado.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={verifyFields?.datanascimento}>
              <FormControl.Label>Data nascimento</FormControl.Label>
              <Input
                placeholder="Exemplo: DD/MM/AAAA"
                _focus={{ borderColor: "blue.500" }}
                maxLength={10}
                value={dataNascimento}
                onChangeText={(text) => setDataNascimento(applyMask("__/__/____", text))}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                O campo não foi informado ou está preenchido incorretamente.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={verifyFields?.hobby}>
              <FormControl.Label>Hobby</FormControl.Label>
              <Input
                placeholder="Exemplo: Fazer caminhada"
                _focus={{ borderColor: "blue.500" }}
                value={hobby}
                onChangeText={(text) => setHobby(text)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                O campo não foi informado.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={verifyFields?.nivel}>
              <FormControl.Label>Nivel</FormControl.Label>
              <Select
                selectedValue={String(nivel)}
                placeholder="Escolha o nível"
                _item={{
                  marginY: 1,
                }}
                _selectedItem={{
                  bg: "blue.100",
                  _text: {
                    color: "blue.500",
                  },
                }}
                onValueChange={(itemValue) => setNivel(Number(itemValue))}>
                {niveis.map((data) => (
                  <Select.Item
                    key={data.id}
                    label={data.nivel}
                    value={String(data.id)}
                  />
                ))}
              </Select>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                O campo não foi informado.
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <Button
            onPress={() => handleCreateDev()}
            isLoading={isLoading}
            marginTop={6}
            bgColor="blue.500"
            size="lg">
            {type === "create" ? "Adicionar desenvolvedor" : "Atualizar desenvolvedor"}
          </Button>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
