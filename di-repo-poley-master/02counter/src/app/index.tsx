import React, { useRef, useState } from "react";
import { Alert, Platform, Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const CLICKS_PARA_ALERTA = 10;

const mostrarAlerta = (clicks: number) => {
  const titulo = "¡Enhorabuena!";
  const mensaje = `Llevas ${clicks} clicks`;

  // Plataforma web -> alert nativo del navegador.
  if (Platform.OS === "web") {
    // `window` no existe en React Native, por eso comprobamos que exista.
    if (typeof window !== "undefined" && typeof window.alert === "function") {
      window.alert(`${titulo}\n${mensaje}`);
    }
    return; // ya hemos mostrado (o no hay forma de mostrarlo), no seguimos.
  }

  // iOS / Android -> diálogo nativo.
  Alert.alert(titulo, mensaje);
};

const Index = () => {

  const [count, setCount] = useState(0);

  const [clicks, setClicks] = useState(0);

  const clicksRef = useRef(0);

  const registrarClick = (variacion: number) => {
    const nuevosClicks = clicksRef.current + 1;
    clicksRef.current = nuevosClicks; 
    setClicks(nuevosClicks);          

    setCount((prev) => prev + variacion);

    if (nuevosClicks > 0 && nuevosClicks % CLICKS_PARA_ALERTA === 0) {
      mostrarAlerta(nuevosClicks);
    }
  };

  const handleIncrement = () => registrarClick(1);
  const handleDecrement = () => registrarClick(-1);


  return (
    <View style={styles.container}>
      {/* Título principal: el valor del contador */}
      <Text style={styles.title}>
        Contador: {count}
      </Text>

      {/* Subtítulo: clics totales acumulados (siempre sube) */}
      <Text style={styles.subtitle}>
        Clics totales: {clicks}
      </Text>

      {/* Contenedor de los dos botones, uno al lado del otro */}
      <View style={styles.row}>

        {/* Botón DECREMENTAR */}
        <Pressable
          onPress={handleDecrement}
          style={({ pressed }) => [
            styles.button,
            styles.buttonDecrement, 
            pressed && styles.buttonPressed, 
          ]}
        >
          <Text style={styles.buttonText}>Decrementar</Text>
          <Ionicons name="remove-circle" size={24} color="white" />
        </Pressable>

        {/* Botón INCREMENTAR */}
        <Pressable
          onPress={handleIncrement}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Incrementar</Text>
          <Ionicons name="add-circle" size={24} color="white" />
        </Pressable>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,                  
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4, 
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24, 
  },
  row: {
    flexDirection: 'row',     
    alignItems: 'center',     
  },
  button: {
    flexDirection: 'row',    
    alignItems: 'center',     
    backgroundColor: '#6200ee', 
    padding: 15,
    borderRadius: 8,         
    marginHorizontal: 6,      
  },
  buttonDecrement: {
    backgroundColor: '#e53935', 
                               
  },
  buttonPressed: {
    opacity: 0.7,            
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,           
  },
});

export default Index;

