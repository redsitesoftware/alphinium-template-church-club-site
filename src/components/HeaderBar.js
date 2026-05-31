import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCommunity } from '../store/communityStore';
import { theme } from '../theme';

const navItems = [
 { label: 'Events', phase: 'events' },
 { label: 'Groups', phase: 'home' },
 { label: 'Give', phase: 'donate' },
 { label: 'Connect', phase: 'connect' },
];

export default function HeaderBar() {
 const { state, dispatch } = useCommunity();

 return (
 <View style={styles.wrap}>
 <Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'home' })} style={styles.logoWrap}>
 <Text style={styles.logo}> GraceConnect</Text>
 </Pressable>
 <View style={styles.navRow}>
 {navItems.map((item) => (
 <Pressable
 key={item.label}
 onPress={() => {
 if (item.phase === 'donate') {
 dispatch({ type: 'SET_DONATE_STEP', payload: 0 });
 } else {
 dispatch({ type: 'SET_PHASE', payload: item.phase });
 }
 }}
 style={[styles.navButton, state.phase === item.phase && styles.navButtonActive]}
 >
 <Text style={[styles.navText, state.phase === item.phase && styles.navTextActive]}>{item.label}</Text>
 </Pressable>
 ))}
 <Pressable onPress={() => dispatch({ type: 'TOGGLE_CHAT' })} style={styles.graceButton}>
 <Text style={styles.graceText}>Grace </Text>
 </Pressable>
 </View>
 </View>
 );
}

const styles = StyleSheet.create({
 wrap: {
 width: '100%',
 maxWidth: 1180,
 alignSelf: 'center',
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 paddingHorizontal: 20,
 paddingTop: 22,
 paddingBottom: 18,
 gap: 16,
 flexWrap: 'wrap',
 },
 logoWrap: {
 paddingVertical: 6,
 },
 logo: {
 fontSize: 24,
 fontWeight: '800',
 color: theme.colors.primary,
 },
 navRow: {
 flexDirection: 'row',
 alignItems: 'center',
 gap: 10,
 flexWrap: 'wrap',
 justifyContent: 'flex-end',
 },
 navButton: {
 paddingHorizontal: 14,
 paddingVertical: 10,
 borderRadius: theme.radius.pill,
 },
 navButtonActive: {
 backgroundColor: '#EEE6FF',
 },
 navText: {
 color: theme.colors.textMuted,
 fontWeight: '600',
 },
 navTextActive: {
 color: theme.colors.primary,
 },
 graceButton: {
 backgroundColor: theme.colors.text,
 borderRadius: theme.radius.pill,
 paddingHorizontal: 16,
 paddingVertical: 10,
 },
 graceText: {
 color: theme.colors.surface,
 fontWeight: '700',
 },
});
