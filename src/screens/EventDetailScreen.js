import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { getEventImage } from '../media';
import { useCommunity } from '../store/communityStore';
import { theme } from '../theme';

export default function EventDetailScreen() {
 const { state, dispatch } = useCommunity();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [submitted, setSubmitted] = useState(false);
 const event = useMemo(() => state.selectedEvent ? state.events.find((item) => item.id === state.selectedEvent.id) || state.selectedEvent : state.events[0], [state.events, state.selectedEvent]);
 const handleSubmit = () => { if (!name.trim() || !email.trim()) return; dispatch({ type: 'REGISTER_FOR_EVENT', payload: event.id }); setSubmitted(true); };
 const spotsLeft = event.capacity - event.registered;
 return (
 <ScrollView style={styles.page} contentContainerStyle={styles.content}>
 <HeaderBar />
 <View style={styles.container}>
 <Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'events' })} style={styles.backButton}><Text style={styles.backText}>← Back to events</Text></Pressable>
 <View style={styles.heroCard}><Image source={{ uri: getEventImage(event.id) }} style={styles.heroImage} /><Text style={styles.title}>{event.title}</Text><Text style={styles.meta}>{event.date} • {event.time} • {event.location}</Text><Text style={styles.badge}>{event.category}</Text><Text style={styles.desc}>{event.desc}</Text><Text style={styles.spots}>{spotsLeft} spots left • {event.registered}/{event.capacity} registered</Text></View>
 <View style={styles.formCard}><Text style={styles.formTitle}>Register your place</Text><Text style={styles.formBody}>This demo form shows how alphinium-booking or your CRM could capture registrations for events, services, and club activities.</Text>{submitted ? <View style={styles.confirmCard}><Text style={styles.confirmTitle}>You’re registered </Text><Text style={styles.confirmBody}>Thanks {name.split(' ')[0] || name}! A confirmation would be sent to {email} in the live version.</Text><View style={styles.confirmActions}><Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'events' })} style={styles.primaryButton}><Text style={styles.primaryButtonText}>See more events</Text></Pressable><Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'home' })} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Return home</Text></Pressable></View></View> : <><TextInput value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor={theme.colors.textMuted} style={styles.input} /><TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor={theme.colors.textMuted} autoCapitalize="none" style={styles.input} /><Pressable onPress={handleSubmit} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Complete registration</Text></Pressable></>}</View>
 </View>
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 page: { flex: 1, backgroundColor: theme.colors.background },
 content: { paddingBottom: 100 },
 container: { width: '100%', maxWidth: 960, alignSelf: 'center', paddingHorizontal: 20 },
 backButton: { alignSelf: 'flex-start', marginTop: 8, marginBottom: 18, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#EEE6FF', borderRadius: theme.radius.pill },
 backText: { color: theme.colors.primary, fontWeight: '700' },
 heroCard: { backgroundColor: theme.colors.surface, borderRadius: 28, padding: 26, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 22, ...theme.shadow, overflow: 'hidden' },
 heroImage: { width: '100%', height: 240, borderRadius: 22, marginBottom: 18 },
 title: { fontSize: 36, lineHeight: 44, fontWeight: '900', color: theme.colors.text, marginBottom: 8 },
 meta: { color: theme.colors.primary, fontWeight: '700', marginBottom: 10 },
 badge: { alignSelf: 'flex-start', backgroundColor: '#FFF0D9', color: theme.colors.accent, fontWeight: '800', paddingHorizontal: 12, paddingVertical: 8, borderRadius: theme.radius.pill, marginBottom: 14 },
 desc: { color: theme.colors.text, lineHeight: 25, marginBottom: 12, fontSize: 16 },
 spots: { color: theme.colors.textMuted },
 formCard: { backgroundColor: theme.colors.surface, borderRadius: 28, padding: 26, borderWidth: 1, borderColor: theme.colors.border, ...theme.shadow },
 formTitle: { fontSize: 28, fontWeight: '900', color: theme.colors.text, marginBottom: 8 },
 formBody: { color: theme.colors.textMuted, lineHeight: 24, marginBottom: 18 },
 input: { width: '100%', borderWidth: 1, borderColor: theme.colors.border, borderRadius: 18, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 12, backgroundColor: '#FCFBFF', color: theme.colors.text },
 primaryButton: { alignSelf: 'flex-start', backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill, paddingHorizontal: 18, paddingVertical: 13, marginTop: 6 },
 primaryButtonText: { color: theme.colors.surface, fontWeight: '800' },
 confirmCard: { backgroundColor: '#ECFDF5', borderRadius: 22, padding: 20, borderWidth: 1, borderColor: '#A7F3D0' },
 confirmTitle: { color: theme.colors.success, fontSize: 24, fontWeight: '900', marginBottom: 8 },
 confirmBody: { color: '#065F46', lineHeight: 23 },
 confirmActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
 secondaryButton: { backgroundColor: '#F4EEFF', borderRadius: theme.radius.pill, paddingHorizontal: 18, paddingVertical: 13 },
 secondaryButtonText: { color: theme.colors.primary, fontWeight: '800' },
});
