import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Sistema = {
  id: string;
  sigla: string;
  nombre: string;
  detalle: string;
  activo: boolean;
};

const sistemasIniciales: Sistema[] = [
  {
    id: "luces",
    sigla: "LUZ",
    nombre: "Luz ambiental",
    detalle: "Tono cálido en el salón",
    activo: true,
  },
  {
    id: "sonido",
    sigla: "SON",
    nombre: "Sonido relajante",
    detalle: "Lista Noche tranquila",
    activo: true,
  },
  {
    id: "aire",
    sigla: "AIRE",
    nombre: "Purificador de aire",
    detalle: "Modo silencioso",
    activo: false,
  },
];

export default function Index() {
  const [sistemas, setSistemas] = useState(sistemasIniciales);
  const activos = sistemas.filter((sistema) => sistema.activo).length;
  const porcentaje = (activos / sistemas.length) * 100;

  function cambiarSistema(id: string, activo: boolean) {
    setSistemas((actuales) =>
      actuales.map((sistema) =>
        sistema.id === id ? { ...sistema, activo } : sistema,
      ),
    );
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.panel}>
          <View style={styles.cabecera}>
            <View style={styles.marca}>
              <View style={styles.puntoMarca} />
              <Text style={styles.nombreMarca}>CASA NÉBULA</Text>
            </View>
            <View style={styles.estadoCasa}>
              <View style={styles.puntoEstado} />
              <Text style={styles.textoEstado}>EN CASA</Text>
            </View>
          </View>

          <Text style={styles.sobreTitulo}>TU ESPACIO, A TU MANERA</Text>
          <Text style={styles.titulo}>Una noche{ "\n" }perfecta.</Text>
          <Text style={styles.descripcion}>
            Ajusta el ambiente y deja que tu hogar se ocupe del resto.
          </Text>

          <View style={styles.resumen}>
            <View style={styles.resumenCabecera}>
              <View>
                <Text style={styles.etiquetaResumen}>SISTEMAS ACTIVOS</Text>
                <Text style={styles.cifraResumen}>
                  {String(activos).padStart(2, "0")}
                  <Text style={styles.totalResumen}> / {sistemas.length}</Text>
                </Text>
              </View>
              <Text style={styles.resumenDerecha}>
                {activos === sistemas.length ? "Todo listo" : "En directo"}
              </Text>
            </View>
            <View style={styles.barraFondo}>
              <View style={[styles.barraActiva, { width: `${porcentaje}%` }]} />
            </View>
          </View>

          <View style={styles.seccionCabecera}>
            <Text style={styles.tituloSeccion}>Tu ambiente</Text>
            <Text style={styles.contadorSeccion}>CONTROLES</Text>
          </View>

          <View style={styles.listaSistemas}>
            {sistemas.map((sistema) => (
              <View key={sistema.id} style={styles.filaSistema}>
                <View style={styles.siglaSistema}>
                  <Text style={styles.textoSigla}>{sistema.sigla}</Text>
                </View>
                <View style={styles.detallesSistema}>
                  <Text style={styles.nombreSistema}>{sistema.nombre}</Text>
                  <Text style={styles.detalleSistema}>{sistema.detalle}</Text>
                </View>
                <Switch
                  accessibilityLabel={sistema.nombre}
                  value={sistema.activo}
                  onValueChange={(valor) => cambiarSistema(sistema.id, valor)}
                  trackColor={{ false: "#384255", true: "#49D6B0" }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#384255"
                />
              </View>
            ))}
          </View>

          <View style={styles.pie}>
            <View style={styles.puntoPie} />
            <Text style={styles.textoPie}>
              Toca un interruptor para actualizar tu espacio.
            </Text>
          </View>
        </View>
        <Text style={styles.credito}>CONTROL DEL HOGAR · 21:48</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: "#0B1020",
  },
  contenido: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 30,
  },
  panel: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#131B2D",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: "#253149",
  },
  cabecera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  marca: {
    flexDirection: "row",
    alignItems: "center",
  },
  puntoMarca: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#49D6B0",
    marginRight: 9,
  },
  nombreMarca: {
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.6,
  },
  estadoCasa: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B2C36",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  puntoEstado: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#49D6B0",
    marginRight: 7,
  },
  textoEstado: {
    color: "#8FE8D1",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  sobreTitulo: {
    color: "#8A97AE",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  titulo: {
    color: "#F8FAFC",
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "700",
    letterSpacing: -1,
    marginTop: 10,
  },
  descripcion: {
    maxWidth: 360,
    color: "#A3AEC1",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  resumen: {
    backgroundColor: "#1A2438",
    borderRadius: 18,
    padding: 17,
    marginTop: 26,
    marginBottom: 29,
    borderWidth: 1,
    borderColor: "#27344B",
  },
  resumenCabecera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  etiquetaResumen: {
    color: "#8A97AE",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.1,
  },
  cifraResumen: {
    color: "#F8FAFC",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
    marginTop: 4,
  },
  totalResumen: {
    color: "#8793A8",
    fontSize: 16,
    fontWeight: "500",
  },
  resumenDerecha: {
    color: "#49D6B0",
    fontSize: 12,
    fontWeight: "600",
  },
  barraFondo: {
    width: "100%",
    height: 6,
    overflow: "hidden",
    backgroundColor: "#303B50",
    borderRadius: 3,
  },
  barraActiva: {
    height: "100%",
    backgroundColor: "#49D6B0",
    borderRadius: 3,
  },
  seccionCabecera: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tituloSeccion: {
    color: "#F1F5F9",
    fontSize: 18,
    fontWeight: "700",
  },
  contadorSeccion: {
    color: "#718096",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.1,
  },
  listaSistemas: {
    borderTopWidth: 1,
    borderTopColor: "#273247",
  },
  filaSistema: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#273247",
    paddingVertical: 10,
  },
  siglaSistema: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202B3F",
    borderRadius: 13,
    marginRight: 13,
  },
  textoSigla: {
    color: "#A9B5C9",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  detallesSistema: {
    flex: 1,
    paddingRight: 8,
  },
  nombreSistema: {
    color: "#E8EDF5",
    fontSize: 14,
    fontWeight: "600",
  },
  detalleSistema: {
    color: "#8491A6",
    fontSize: 12,
    marginTop: 4,
  },
  pie: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 19,
  },
  puntoPie: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#49D6B0",
    marginRight: 8,
  },
  textoPie: {
    color: "#8995A8",
    fontSize: 12,
  },
  credito: {
    color: "#657087",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1.2,
    textAlign: "center",
    marginTop: 17,
  },
});