import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { COMMUNITY_IMAGES } from '../media';
import { useCommunity } from '../store/communityStore';
import { theme } from '../theme';

const pathways = [
 { emoji: '', title: 'Volunteer with us', body: 'Join food bank shifts, community care visits, working bees, and special events.' },
 { emoji: '', title: 'Find your group', body: 'Explore book club, choir, youth nights, families programs, and fitness activities.' },
 { emoji: '', title: 'Visit on Sunday', body: 'Drop in for the community gathering, stay for coffee, and meet the team.' },
 { emoji: '', title: 'Ask Grace online', body: 'Use the ChatInstance-powered Grace assistant to answer visitor questions 24/7.' },
];

export default function ConnectScreen() {
 const { dispatch } = useCommunity();
 const { width } = useWindowDimensions();
 const wide = width > 900;
 return (
 <ScrollView style={styles.page} contentContainerStyle={styles.content}>
 <HeaderBar />
 <View style={styles.container}>
 <View style={[styles.hero, { flexDirection: wide ? 'row' : 'column' }]}>
 <Image source={{ uri: COMMUNITY_IMAGES.connect }} style={styles.heroImage} />
 <View style={{ flex: 1.1 }}><Text style={styles.eyebrow}>Connect</Text><Text style={styles.title}>Get involved with GraceConnect Community</Text><Text style={styles.subtitle}>Whether you’re exploring a church, club, community centre, or local not-for-profit, this template is designed to help people feel welcome fast.</Text><View style={styles.actionRow}><Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'events' })} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Explore events</Text></Pressable><Pressable onPress={() => dispatch({ type: 'SET_DONATE_STEP', payload: 0 })} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Support the mission</Text></Pressable></View></View><View style={styles.contactCard}><Text style={styles.contactTitle}>Visit or contact us</Text><Text style={styles.contactLine}> 45 Community Way, Surry Hills Sydney</Text><Text style={styles.contactLine}> (02) 9888 4444</Text><Text style={styles.contactLine}>️ hello@graceconnect.demo</Text><Text style={styles.contactLine}>⏰ Sundays 10:00am • Midweek groups all week</Text></View></View>
 <View style={styles.grid}>{pathways.map((item) => <View key={item.title} style={[styles.pathCard, { width: wide ? '48.5%' : '100%' }]}><Text style={styles.pathEmoji}>{item.emoji}</Text><Text style={styles.pathTitle}>{item.title}</Text><Text style={styles.pathBody}>{item.body}</Text></View>)}</View>
 <View style={styles.platformCard}><Text style={styles.platformTitle}>Why this demo works beyond churches</Text><Text style={styles.platformBody}>GraceConnect is intentionally broad enough for sports clubs, surf clubs, rotary clubs, community centres, and other member-based organisations. Swap the copy, events, and media, then connect alphinium-payments, alphinium-booking, and ChatInstance for a production-ready digital front door.</Text></View>
 </View>
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 page: { flex: 1, backgroundColor: theme.colors.background },
 content: { paddingBottom: 100 },
 container: { width: '100%', maxWidth: 1180, alignSelf: 'center', paddingHorizontal: 20 },
 hero: { gap: 18, marginTop: 6, marginBottom: 24, alignItems: 'stretch' },
 heroImage: { width: '100%', height: 280, borderRadius: 28 },
 eyebrow: { color: theme.colors.accent, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },
 title: { color: theme.colors.text, fontSize: 40, lineHeight: 48, fontWeight: '900', marginBottom: 12, maxWidth: 640 },
 subtitle: { color: theme.colors.textMuted, lineHeight: 25, fontSize: 16, maxWidth: 720 },
 actionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 18 },
 primaryButton: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill, paddingHorizontal: 18, paddingVertical: 13 },
 primaryButtonText: { color: theme.colors.surface, fontWeight: '800' },
 secondaryButton: { backgroundColor: '#F4EEFF', borderRadius: theme.radius.pill, paddingHorizontal: 18, paddingVertical: 13 },
 secondaryButtonText: { color: theme.colors.primary, fontWeight: '800' },
 contactCard: { flex: 0.9, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 28, padding: 24, gap: 10, ...theme.shadow },
 contactTitle: { color: theme.colors.text, fontSize: 26, fontWeight: '900', marginBottom: 4 },
 contactLine: { color: theme.colors.textMuted, lineHeight: 24 },
 grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginBottom: 24 },
 pathCard: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 24, padding: 22, ...theme.shadow },
 pathEmoji: { fontSize: 32, marginBottom: 10 },
 pathTitle: { color: theme.colors.text, fontSize: 24, fontWeight: '900', marginBottom: 8 },
 pathBody: { color: theme.colors.textMuted, lineHeight: 24 },
 platformCard: { backgroundColor: '#140F38', borderRadius: 30, padding: 28 },
 platformTitle: { color: theme.colors.surface, fontSize: 30, fontWeight: '900', marginBottom: 10 },
 platformBody: { color: '#D1D5DB', lineHeight: 25, maxWidth: 850 },
});
