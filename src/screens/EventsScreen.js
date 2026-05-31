import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { COMMUNITY_IMAGES, getEventImage } from '../media';
import { useCommunity } from '../store/communityStore';
import { theme } from '../theme';

export default function EventsScreen() {
 const { state, dispatch } = useCommunity();
 const { width } = useWindowDimensions();
 const isWide = width > 860;
 return (
 <ScrollView style={styles.page} contentContainerStyle={styles.content}>
 <HeaderBar />
 <View style={styles.container}>
 <Text style={styles.eyebrow}>GraceConnect calendar</Text>
 <Text style={styles.title}>Upcoming events for the whole community</Text>
 <Text style={styles.subtitle}>From Sunday gatherings to BBQ fundraisers, book club nights, and youth events, GraceConnect makes registration and attendance easy for any community organisation.</Text>
 <View style={styles.topBanner}><Image source={{ uri: COMMUNITY_IMAGES.connect }} style={styles.bannerImage} /><Text style={styles.bannerTitle}> Ready for live registrations?</Text><Text style={styles.bannerBody}>Connect alphinium-booking to manage capacity, waitlists, reminders, and volunteer rosters.</Text></View>
 <View style={styles.grid}>{state.events.map((event) => { const spotsLeft = event.capacity - event.registered; const fill = Math.min(100, Math.round((event.registered / event.capacity) * 100)); return <View key={event.id} style={[styles.card, { width: isWide ? '48.5%' : '100%' }]}><Image source={{ uri: getEventImage(event.id) }} style={styles.cardImage} /><View style={styles.cardHeader}><View style={styles.badge}><Text style={styles.badgeText}>{event.category}</Text></View></View><Text style={styles.cardTitle}>{event.title}</Text><Text style={styles.meta}>{event.date} • {event.time}</Text><Text style={styles.meta}>{event.location}</Text><Text style={styles.desc}>{event.desc}</Text><View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${fill}%` }]} /></View><Text style={styles.progressLabel}>{event.registered} registered • {spotsLeft} spots left</Text><Pressable onPress={() => dispatch({ type: 'SELECT_EVENT', payload: event })} style={styles.button}><Text style={styles.buttonText}>Register</Text></Pressable></View>; })}</View>
 </View>
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 page: { flex: 1, backgroundColor: theme.colors.background },
 content: { paddingBottom: 100 },
 container: { width: '100%', maxWidth: 1180, alignSelf: 'center', paddingHorizontal: 20 },
 eyebrow: { color: theme.colors.accent, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: '800', marginTop: 6, marginBottom: 10 },
 title: { fontSize: 38, lineHeight: 46, fontWeight: '900', color: theme.colors.text, marginBottom: 12 },
 subtitle: { color: theme.colors.textMuted, fontSize: 16, lineHeight: 25, maxWidth: 820, marginBottom: 24 },
 topBanner: { backgroundColor: '#EFE7FF', borderRadius: 24, padding: 22, marginBottom: 24, overflow: 'hidden' },
 bannerImage: { width: '100%', height: 180, borderRadius: 18, marginBottom: 16 },
 bannerTitle: { color: theme.colors.primary, fontSize: 22, fontWeight: '900', marginBottom: 8 },
 bannerBody: { color: theme.colors.text, lineHeight: 22 },
 grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
 card: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 24, padding: 20, ...theme.shadow, overflow: 'hidden' },
 cardImage: { width: '100%', height: 180, borderRadius: 18, marginBottom: 14 },
 cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' },
 badge: { backgroundColor: '#FFF0D9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: theme.radius.pill },
 badgeText: { color: theme.colors.accent, fontWeight: '800', fontSize: 12 },
 cardTitle: { color: theme.colors.text, fontSize: 24, fontWeight: '900', marginBottom: 8 },
 meta: { color: theme.colors.textMuted, marginBottom: 2 },
 desc: { color: theme.colors.text, lineHeight: 23, marginVertical: 10 },
 progressTrack: { height: 10, backgroundColor: '#EFE7FF', borderRadius: theme.radius.pill, overflow: 'hidden', marginTop: 6 },
 progressFill: { height: '100%', backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill },
 progressLabel: { color: theme.colors.primary, fontWeight: '700', marginTop: 8 },
 button: { alignSelf: 'flex-start', marginTop: 16, backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill, paddingHorizontal: 16, paddingVertical: 12 },
 buttonText: { color: theme.colors.surface, fontWeight: '800' },
});
