import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import DetalhesPersonagens from "./src/pages/DetalhesPersonagens";
import InformacoesFilmes from "./src/pages/InformacoesFilmes";
import InformacoesNaves from "./src/pages/InformacoesNaves";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() { 
  
function sobreTrabalho(){
  alert("Vitor Quadros - RA:1134821 -  Email: 1134821@atitus.edu.br"  +  "  Gabriel Onofre - RA:1135384 - Email: 1135384@atitus.edu.br")
}
  
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
            title: "Selecione o Personagem",
            headerStyle:{
              backgroundColor: "black",
            },
            headerTintColor: "white",
            headerRight: () => (
              <Button
              
              title="Sobre"
              color= "red"
              
              onPress={() => sobreTrabalho()} />
            )
          }}
        />
        <Stack.Screen
          component={DetalhesPersonagens}
          name="DetalhesPersonagens"
          options={{
            title: "Informações Personagem",
            headerStyle:{
              backgroundColor: "black",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          component={InformacoesNaves}
          name="InformacoesNaves"
          options={{
            title: "Informações Naves",
            headerStyle:{
              backgroundColor: "black",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          component={InformacoesFilmes}
          name="InformacoesFilmes"
          options={{
            title: "Filmes Participados",
            headerStyle:{
              backgroundColor: "black",
            },
            headerTintColor: "white",
          }}
          />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
