import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import DetalhesPersonagens from "./src/pages/DetalhesPersonagens";
import InformacoesFilmes from "./src/pages/InformacoesFilmes";
import InformacoesNaves from "./src/pages/InformacoesNaves";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
      <Stack.Screen
          component={Home}
          name="Home" 
          options={{
            headerShown: true,
            title: "Personagens",
            headerRight: () => (
              <Button
              title="Sobre"
              onPress={() => sobreTrabalho()} />
            )
          }}
        />
        <Stack.Screen
          component={DetalhesPersonagens}
          name="DetalhesPersonagens"
          options={{
            title: "Informações Personagem",
          }}
        />
        <Stack.Screen
          component={InformacoesNaves}
          name="InformacoesNaves"
          options={{
            title: "Informações Naves",
          }}
        />
        <Stack.Screen
          component={InformacoesFilmes}
          name="InformacoesFilmes"
          options={{
            title: "Filmes Participados",
          }}
          />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
