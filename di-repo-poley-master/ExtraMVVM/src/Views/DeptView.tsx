import { useEffect, useReducer, useRef, useState } from 'react';
import { Animated, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Departamento } from '../Models/Entities/Departamento';
import { Persona } from '../Models/Entities/Persona';
import { DeptViewModel } from '../ViewModels/DeptViewModel';

const viewModel = new DeptViewModel();
const palette = ['#c8f169', '#f6a98b', '#9eb8ff', '#d7a9f5'];
const getNombreCortoDepartamento = (departamento: Departamento): string => {
  const nombres: Record<number, string> = { 1: 'Admin', 2: 'Informática', 3: 'RR. HH.', 4: 'Ventas' };
  return nombres[departamento.id] ?? departamento.nombre;
};
const totalPersonas = viewModel.listarDepartamentos.reduce(
  (total, departamento) => total + viewModel.getNumeroPersonasPorDept(departamento.id),
  0,
);

type PersonCardProps = {
  persona: Persona;
  color: string;
  index: number;
  onPress: () => void;
};

function PersonCard({ persona, color, index, onPress }: PersonCardProps) {
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: 340,
      delay: index * 35,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [entrance, index]);

  return (
    <Animated.View style={[styles.personCardSlot, { opacity: entrance, transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }]}>
      <Pressable style={({ pressed }) => [styles.personCard, pressed && styles.personCardPressed]} onPress={onPress}>
        <View style={[styles.personAvatar, { backgroundColor: color }]}>
          <Text style={styles.personInitial}>{persona.nombre.split(' ').map((parte) => parte[0]).slice(0, 2).join('')}</Text>
          <View style={styles.avatarOnline} />
        </View>
        <View style={styles.personInfo}>
          <Text style={styles.personName} numberOfLines={1}>{persona.nombre}</Text>
          <Text style={styles.personRole}>PERSONA {String(persona.id).padStart(2, '0')}</Text>
        </View>
        <View style={styles.personCardLine} />
      </Pressable>
    </Animated.View>
  );
}

function AnimatedBar({ percentage, color }: { percentage: number; color: string }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, { toValue: 1, duration: 650, useNativeDriver: false }).start();
  }, [progress]);

  return (
    <View style={styles.barTrack}>
      <Animated.View style={[styles.barFill, { backgroundColor: color, width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', `${percentage}%`] }) }]} />
    </View>
  );
}

export default function DeptView() {
  const insets = useSafeAreaInsets();
  const [, forceUpdate] = useReducer((value: number) => value + 1, 0);
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [personaVisible, setPersonaVisible] = useState(false);
  const [personaActual, setPersonaActual] = useState<Persona | null>(null);
  const [aviso, setAviso] = useState('');
  const avisoAnimado = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (aviso === '') return;
    avisoAnimado.setValue(0);
    Animated.spring(avisoAnimado, { toValue: 1, useNativeDriver: true, damping: 16, stiffness: 180 }).start();
    const timer = setTimeout(() => setAviso(''), 2400);
    return () => clearTimeout(timer);
  }, [aviso, avisoAnimado]);

  const seleccionarDepartamento = (departamento: Departamento) => {
    viewModel.departamentoSeleccionado = departamento;
    setSelectorVisible(false);
    setAviso(`${departamento.nombre} · ${viewModel.numeroPersonasPorDepartamento} personas`);
    forceUpdate();
  };

  const abrirFicha = (persona: Persona) => {
    setPersonaActual(persona);
    setPersonaVisible(true);
  };

  const seleccionado = viewModel.departamentoSeleccionado;
  if (!seleccionado) {
    return (
      <View style={[styles.screen, styles.emptyScreen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.emptyIllustration}><Text style={styles.emptyIllustrationText}>+</Text></View>
        <Text style={styles.emptyTitle}>Todavía no hay departamentos</Text>
        <Text style={styles.emptyDescription}>Cuando añadas departamentos, aquí podrás consultar sus equipos y personas.</Text>
      </View>
    );
  }

  const indiceColor = viewModel.listarDepartamentos.findIndex((item) => item.id === seleccionado.id);
  const colorEquipo = palette[indiceColor % palette.length];
  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 22) }]} showsVerticalScrollIndicator>
        <View style={styles.hero}>
          <View style={styles.heroInner}>
            <View style={styles.topline}>
              <View style={styles.brandMark}><Text style={styles.brandGlyph}>E</Text></View>
              <View style={styles.brandCopy}><Text style={styles.brand}>EXTRA MVVM</Text><Text style={styles.brandSub}>DIRECTORIO DE EQUIPOS</Text></View>
              <View style={styles.totalPill}><Text style={styles.totalValue}>{totalPersonas}</Text><Text style={styles.totalLabel}>PERSONAS</Text></View>
            </View>
            <Text style={styles.heroTitle}>La gente que{ '\n' }mueve las cosas.</Text>
            <Text style={styles.heroSubtitle}>{viewModel.listarDepartamentos.length} departamentos · {totalPersonas} personas</Text>
          </View>
        </View>

        <View style={styles.main}>
          <Text style={styles.selectorLabel}>ESTÁS VIENDO</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Abrir departamentos. Seleccionado: ${seleccionado.nombre}`}
            style={({ pressed }) => [styles.departmentSelector, pressed && styles.departmentSelectorPressed]}
            onPress={() => setSelectorVisible(true)}
          >
            <View style={[styles.selectorColor, { backgroundColor: colorEquipo }]}><Text style={styles.selectorInitial}>{seleccionado.nombre.charAt(0)}</Text></View>
            <View style={styles.selectorCopy}><Text style={styles.selectorName}>{seleccionado.nombre}</Text><Text style={styles.selectorCount}>{viewModel.numeroPersonasPorDepartamento} personas en el equipo</Text></View>
            <View style={styles.selectorChevron}><Text style={styles.selectorChevronText}>⌄</Text></View>
          </Pressable>

          <View style={styles.listHeading}>
            <View><Text style={styles.listEyebrow}>DEPARTAMENTO {String(indiceColor + 1).padStart(2, '0')}</Text><Text style={styles.sectionTitle}>{seleccionado.nombre}</Text></View>
            <View style={styles.peopleCount}><Text style={styles.peopleCountNumber}>{viewModel.numeroPersonasPorDepartamento}</Text><Text style={styles.peopleCountLabel}>PERSONAS</Text></View>
          </View>
          <View style={styles.peopleGrid}>
            {viewModel.listadoPersonasPorDepartamento.map((persona, index) => (
              <PersonCard key={`${seleccionado.id}-${persona.id}`} persona={persona} color={palette[(indiceColor + index) % palette.length]} index={index} onPress={() => abrirFicha(persona)} />
            ))}
            {viewModel.listadoPersonasPorDepartamento.length === 0 && <Text style={styles.empty}>Este departamento aún no tiene personas.</Text>}
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}><Text style={styles.chartTitle}>Todos los equipos</Text><Text style={styles.chartTotal}>{totalPersonas} personas</Text></View>
            {viewModel.listarDepartamentos.map((departamento, index) => (
              <Pressable key={departamento.id} style={styles.chartRow} onPress={() => seleccionarDepartamento(departamento)}>
                <View style={[styles.chartLegend, { backgroundColor: palette[index % palette.length] }]} />
                <Text style={styles.chartName} numberOfLines={1}>{getNombreCortoDepartamento(departamento)}</Text>
                <AnimatedBar percentage={totalPersonas === 0 ? 0 : viewModel.getNumeroPersonasPorDept(departamento.id) / totalPersonas * 100} color={palette[index % palette.length]} />
                <Text style={styles.chartValue}>{viewModel.getNumeroPersonasPorDept(departamento.id)}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.footerText}>HECHO DE PERSONAS · EXTRA MVVM</Text>
        </View>
      </ScrollView>

      {aviso !== '' && (
        <Animated.View accessibilityLiveRegion="polite" style={[styles.toast, { bottom: Math.max(insets.bottom, 16) + 12, opacity: avisoAnimado, transform: [{ translateY: avisoAnimado.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }, { scale: avisoAnimado.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }] }]}>
          <View style={styles.toastIcon}><Text style={styles.toastCheck}>✓</Text></View>
          <View style={styles.toastCopy}><Text style={styles.toastTitle}>Equipo actualizado</Text><Text style={styles.toastText}>{aviso}</Text></View>
          <Pressable accessibilityLabel="Cerrar aviso" onPress={() => setAviso('')}><Text style={styles.toastClose}>×</Text></Pressable>
        </Animated.View>
      )}

      <Modal visible={selectorVisible} transparent animationType="fade" onRequestClose={() => setSelectorVisible(false)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setSelectorVisible(false)} />
          <View style={[styles.modalCard, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <View><Text style={styles.modalKicker}>DIRECTORIO DE EQUIPOS</Text><Text style={styles.modalTitle}>¿A dónde vamos?</Text></View>
              <Pressable style={styles.modalCloseButton} onPress={() => setSelectorVisible(false)}><Text style={styles.modalClose}>×</Text></Pressable>
            </View>
            <Text style={styles.modalSubtitle}>Elige un departamento para ver su equipo.</Text>
            {viewModel.listarDepartamentos.map((departamento, index) => {
              const active = departamento.id === seleccionado.id;
              return (
                <Pressable key={departamento.id} style={[styles.departmentOption, active && styles.departmentOptionActive]} onPress={() => seleccionarDepartamento(departamento)}>
                  <View style={[styles.optionIcon, { backgroundColor: palette[index % palette.length] }]}><Text style={styles.optionIconText}>{departamento.nombre.slice(0, 1)}</Text></View>
                  <View style={styles.optionCopy}><Text style={styles.departmentOptionText}>{departamento.nombre}</Text><Text style={styles.optionMeta}>{viewModel.getNumeroPersonasPorDept(departamento.id)} personas</Text></View>
                  {active ? <View style={styles.optionCheck}><Text style={styles.optionCheckText}>✓</Text></View> : <Text style={styles.optionArrow}>↗</Text>}
                </Pressable>
              );
            })}
            <Text style={styles.modalFootnote}>Cada equipo aporta algo único.</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={personaVisible} transparent animationType="fade" onRequestClose={() => setPersonaVisible(false)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setPersonaVisible(false)} />
          {personaActual && <View style={styles.personModal}>
            <Pressable style={styles.personModalClose} onPress={() => setPersonaVisible(false)}><Text style={styles.modalClose}>×</Text></Pressable>
            <View style={[styles.personModalAvatar, { backgroundColor: colorEquipo }]}><Text style={styles.personModalInitial}>{personaActual.nombre.split(' ').map((parte) => parte[0]).slice(0, 2).join('')}</Text></View>
            <View style={styles.personModalBadge}><View style={styles.liveDot} /><Text style={styles.personModalBadgeText}>PARTE DEL EQUIPO</Text></View>
            <Text style={styles.personModalName}>{personaActual.nombre}</Text>
            <Text style={styles.personModalDept}>{seleccionado.nombre}</Text>
            <View style={styles.personModalRule} />
            <Text style={styles.personModalMessage}>Cada persona suma una nueva perspectiva. Nos alegra tenerte en el equipo.</Text>
            <Pressable style={styles.personModalButton} onPress={() => setPersonaVisible(false)}><Text style={styles.personModalButtonText}>¡Genial!</Text><Text style={styles.personModalButtonArrow}>↗</Text></Pressable>
          </View>}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f3ed' },
  scrollContent: { alignItems: 'center' },
  hero: { backgroundColor: '#182521', overflow: 'hidden', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 18, width: '100%' },
  heroInner: { alignSelf: 'center', maxWidth: 768, width: '100%' },
  topline: { alignItems: 'center', flexDirection: 'row', minHeight: 39 },
  brandMark: { alignItems: 'center', backgroundColor: '#c8f169', borderRadius: 10, height: 31, justifyContent: 'center', width: 31 },
  brandGlyph: { color: '#182521', fontSize: 17, fontWeight: '900' },
  brandCopy: { marginLeft: 9 },
  brand: { color: '#f4f2e9', fontSize: 10, fontWeight: '800', letterSpacing: 1.4 },
  brandSub: { color: '#94a198', fontSize: 8, fontWeight: '700', letterSpacing: 1, marginTop: 2 },
  totalPill: { alignItems: 'center', backgroundColor: '#ffffff12', borderColor: '#ffffff24', borderRadius: 12, borderWidth: 1, flexDirection: 'row', marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 6 },
  totalValue: { color: '#c8f169', fontSize: 15, fontWeight: '800', marginRight: 6 },
  totalLabel: { color: '#c0c9c0', fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  heroTitle: { color: '#f7f5ed', fontSize: 26, fontWeight: '700', letterSpacing: -0.8, lineHeight: 29, marginTop: 17 },
  heroSubtitle: { color: '#aeb9af', fontSize: 11, marginTop: 6 },
  main: { maxWidth: 800, paddingHorizontal: 16, paddingTop: 14, width: '100%' },
  selectorLabel: { color: '#899187', fontSize: 8, fontWeight: '800', letterSpacing: 1.4, marginBottom: 7 },
  departmentSelector: { alignItems: 'center', backgroundColor: '#fffefa', borderColor: '#e5e3da', borderRadius: 15, borderWidth: 1, flexDirection: 'row', minHeight: 62, paddingHorizontal: 10 },
  departmentSelectorPressed: { backgroundColor: '#eeeee5', transform: [{ scale: 0.99 }] },
  selectorColor: { alignItems: 'center', borderRadius: 12, height: 41, justifyContent: 'center', width: 41 },
  selectorInitial: { color: '#26342c', fontSize: 18, fontWeight: '800' },
  selectorCopy: { flex: 1, marginLeft: 10 },
  selectorName: { color: '#26342c', fontSize: 13, fontWeight: '800' },
  selectorCount: { color: '#899187', fontSize: 10, marginTop: 4 },
  selectorChevron: { alignItems: 'center', backgroundColor: '#f0efe8', borderRadius: 10, height: 33, justifyContent: 'center', width: 33 },
  selectorChevronText: { color: '#536057', fontSize: 19, lineHeight: 23 },
  departmentChipCountActive: { color: '#43513e' },
  listHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 11, marginTop: 19 },
  listEyebrow: { color: '#899187', fontSize: 8, fontWeight: '800', letterSpacing: 1.4 },
  sectionTitle: { color: '#1b2823', fontSize: 21, fontWeight: '700', letterSpacing: -0.6, marginTop: 3 },
  peopleCount: { alignItems: 'flex-end', flexDirection: 'row' },
  peopleCountNumber: { color: '#28372e', fontSize: 22, fontWeight: '800', letterSpacing: -0.8 },
  peopleCountLabel: { color: '#899187', fontSize: 8, fontWeight: '800', letterSpacing: 0.9, marginBottom: 4, marginLeft: 5 },
  peopleGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 8 },
  personCardSlot: { width: '48.5%' },
  personCard: { alignItems: 'center', backgroundColor: '#fffefa', borderColor: '#e8e6de', borderRadius: 14, borderWidth: 1, flexDirection: 'row', minHeight: 68, overflow: 'hidden', paddingHorizontal: 9 },
  personCardPressed: { backgroundColor: '#f0f2e9', transform: [{ scale: 0.97 }] },
  personAvatar: { alignItems: 'center', borderRadius: 19, height: 38, justifyContent: 'center', position: 'relative', width: 38 },
  personInitial: { color: '#26342c', fontSize: 11, fontWeight: '800', letterSpacing: 0.4 },
  avatarOnline: { backgroundColor: '#79bd71', borderColor: '#fffefa', borderRadius: 5, borderWidth: 1.5, bottom: 0, height: 9, position: 'absolute', right: 0, width: 9 },
  personInfo: { flex: 1, marginLeft: 8, minWidth: 0 },
  personName: { color: '#26342c', fontSize: 10, fontWeight: '700' },
  personRole: { color: '#92988d', fontSize: 7, fontWeight: '700', letterSpacing: 0.45, marginTop: 4 },
  personCardLine: { backgroundColor: '#c8f169', bottom: 0, height: 2, left: 0, position: 'absolute', right: 0 },
  empty: { color: '#899187', fontSize: 13, padding: 18, textAlign: 'center' },
  emptyScreen: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyIllustration: { alignItems: 'center', backgroundColor: '#e6efda', borderRadius: 32, height: 64, justifyContent: 'center', marginBottom: 18, width: 64 },
  emptyIllustrationText: { color: '#57743b', fontSize: 34, fontWeight: '300', lineHeight: 39 },
  emptyTitle: { color: '#26342c', fontSize: 19, fontWeight: '800', textAlign: 'center' },
  emptyDescription: { color: '#778277', fontSize: 13, lineHeight: 20, marginTop: 8, maxWidth: 290, textAlign: 'center' },
  chartCard: { backgroundColor: '#fffefa', borderColor: '#e8e6de', borderRadius: 15, borderWidth: 1, marginTop: 19, paddingHorizontal: 13, paddingVertical: 8 },
  chartHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, paddingVertical: 5 },
  chartTitle: { color: '#344138', fontSize: 11, fontWeight: '800' },
  chartTotal: { color: '#899187', fontSize: 9, fontWeight: '600' },
  chartRow: { alignItems: 'center', flexDirection: 'row', minHeight: 31 },
  chartLegend: { borderRadius: 4, height: 8, marginRight: 9, width: 8 },
  chartName: { color: '#657066', fontSize: 9, fontWeight: '600', width: 78 },
  barTrack: { backgroundColor: '#f0efe8', borderRadius: 5, flex: 1, height: 7, overflow: 'hidden' },
  barFill: { borderRadius: 5, height: 7 },
  chartValue: { color: '#26342c', fontSize: 9, fontWeight: '800', marginLeft: 8, textAlign: 'right', width: 17 },
  footerText: { color: '#9b9f95', fontSize: 8, fontWeight: '800', letterSpacing: 1.4, marginTop: 17, textAlign: 'center' },
  toast: { alignItems: 'center', alignSelf: 'center', backgroundColor: '#fffefa', borderColor: '#dfe5d6', borderRadius: 15, borderWidth: 1, elevation: 8, flexDirection: 'row', left: 16, maxWidth: 460, paddingHorizontal: 12, paddingVertical: 11, position: 'absolute', right: 16, shadowColor: '#17231c', shadowOffset: { height: 5, width: 0 }, shadowOpacity: 0.13, shadowRadius: 14 },
  toastIcon: { alignItems: 'center', backgroundColor: '#e8f4d5', borderRadius: 13, height: 27, justifyContent: 'center', width: 27 },
  toastCheck: { color: '#406529', fontSize: 14, fontWeight: '800' },
  toastCopy: { flex: 1, marginLeft: 10 },
  toastTitle: { color: '#27362d', fontSize: 11, fontWeight: '800' },
  toastText: { color: '#7a8479', fontSize: 9, marginTop: 2 },
  toastClose: { color: '#8b948b', fontSize: 22, paddingHorizontal: 6 },
  modalBackdrop: { alignItems: 'center', backgroundColor: '#101a16b8', flex: 1, justifyContent: 'flex-end', paddingTop: 35 },
  modalCard: { backgroundColor: '#f8f7f1', borderTopLeftRadius: 25, borderTopRightRadius: 25, maxWidth: 520, padding: 20, width: '100%' },
  modalHandle: { alignSelf: 'center', backgroundColor: '#d9dbd0', borderRadius: 3, height: 4, marginBottom: 19, width: 35 },
  modalHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  modalKicker: { color: '#8a9388', fontSize: 8, fontWeight: '800', letterSpacing: 1.5 },
  modalTitle: { color: '#1b2823', fontSize: 25, fontWeight: '700', letterSpacing: -0.7, marginTop: 5 },
  modalCloseButton: { alignItems: 'center', backgroundColor: '#eae9e1', borderRadius: 16, height: 32, justifyContent: 'center', width: 32 },
  modalClose: { color: '#536057', fontSize: 22, lineHeight: 25 },
  modalSubtitle: { color: '#858d82', fontSize: 11, lineHeight: 17, marginBottom: 13, marginTop: 8 },
  departmentOption: { alignItems: 'center', backgroundColor: '#fffefa', borderColor: '#eeece4', borderRadius: 14, borderWidth: 1, flexDirection: 'row', marginTop: 8, minHeight: 66, paddingHorizontal: 10 },
  departmentOptionActive: { borderColor: '#a8c979', backgroundColor: '#fcfdf8' },
  optionIcon: { alignItems: 'center', borderRadius: 12, height: 40, justifyContent: 'center', width: 40 },
  optionIconText: { color: '#29362e', fontSize: 17, fontWeight: '800' },
  optionCopy: { flex: 1, marginLeft: 10 },
  departmentOptionText: { color: '#28352d', fontSize: 12, fontWeight: '700' },
  optionMeta: { color: '#91968c', fontSize: 9, marginTop: 3 },
  optionCheck: { alignItems: 'center', backgroundColor: '#e8f4d5', borderRadius: 11, height: 23, justifyContent: 'center', width: 23 },
  optionCheckText: { color: '#486b2c', fontSize: 12, fontWeight: '800' },
  optionArrow: { color: '#a3a89e', fontSize: 16, marginRight: 5 },
  modalFootnote: { color: '#92978e', fontSize: 9, fontStyle: 'italic', marginTop: 15, textAlign: 'center' },
  personModal: { alignItems: 'center', backgroundColor: '#f8f7f1', borderRadius: 24, maxWidth: 390, paddingHorizontal: 25, paddingTop: 28, paddingBottom: 22, position: 'relative', width: '100%' },
  personModalClose: { alignItems: 'center', backgroundColor: '#eae9e1', borderRadius: 16, height: 32, justifyContent: 'center', position: 'absolute', right: 17, top: 17, width: 32 },
  personModalAvatar: { alignItems: 'center', borderRadius: 37, height: 74, justifyContent: 'center', marginTop: 7, width: 74 },
  personModalInitial: { color: '#26342c', fontSize: 22, fontWeight: '800' },
  personModalBadge: { alignItems: 'center', backgroundColor: '#eaf2df', borderRadius: 14, flexDirection: 'row', marginTop: 16, paddingHorizontal: 10, paddingVertical: 6 },
  personModalBadgeText: { color: '#5b714a', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  personModalName: { color: '#1b2823', fontSize: 25, fontWeight: '700', letterSpacing: -0.6, marginTop: 13, textAlign: 'center' },
  personModalDept: { color: '#778277', fontSize: 12, marginTop: 5 },
  personModalRule: { backgroundColor: '#e4e3da', height: 1, marginVertical: 18, width: '100%' },
  personModalMessage: { color: '#717c71', fontSize: 12, lineHeight: 19, maxWidth: 270, textAlign: 'center' },
  personModalButton: { alignItems: 'center', backgroundColor: '#263630', borderRadius: 13, flexDirection: 'row', justifyContent: 'center', marginTop: 21, minHeight: 47, width: '100%' },
  personModalButtonText: { color: '#f6f5ec', fontSize: 12, fontWeight: '800' },
  personModalButtonArrow: { color: '#c8f169', fontSize: 15, marginLeft: 8 },
});
