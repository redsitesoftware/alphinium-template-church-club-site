import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { COMMUNITY_IMAGES } from '../media';
import { useCommunity } from '../store/communityStore';
import { theme } from '../theme';

export default function SermonsScreen() {
 const { state, dispatch } = useCommunity();
 const { width } = useWindowDimensions();
 const wide = width > 860;
 return (
 <ScrollView style={styles.page} contentContainerStyle={styles.content}>
 <HeaderBar />
 <View style={styles.container}>
 <Text style={styles.eyebrow}>Stories & talks</Text>
 <Text style={styles.title}>Messages that deepen belonging and inspire action</Text>
 <Text style={styles.subtitle}>This area can serve as a sermons page for a church or a stories and talks hub for a club, community centre, or not-for-profit.</Text>
 <View style={styles.heroCard}><Image source={{ uri: COMMUNITY_IMAGES.sermons }} style={styles.heroImage} /><Text style={styles.heroTitle}>Featured message</Text><Text style={styles.heroHeadline}>Belonging in a Busy City</Text><Text style={styles.heroBody}>A warm conversation on loneliness, hospitality, and the practical ways communities become places of healing and friendship.</Text><Pressable onPress={() => dispatch({ type: 'TOGGLE_CHAT', payload: true })} style={styles.button}><Text style={styles.buttonText}>Ask Grace about this demo</Text></Pressable></View>
 <View style={styles.grid}>{state.talks.map((talk) => <View key={talk.id} style={[styles.card, { width: wide ? '31.8%' : '100%' }]}><Text style={styles.cardLabel}>{talk.date}</Text><Text style={styles.cardTitle}>{talk.title}</Text><Text style={styles.cardSpeaker}>{talk.speaker}</Text><Text style={styles.cardBody}>{talk.summary}</Text></View>)}</View>
 </View>
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 page: { flex: 1, backgroundColor: theme.colors.background },
 content: { paddingBottom: 100 },
 container: { width: '100%', maxWidth: 1180, alignSelf: 'center', paddingHorizontal: 20 },
 eyebrow: { color: theme.colors.accent, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 6, marginBottom: 10 },
 title: { color: theme.colors.text, fontSize: 38, lineHeight: 46, fontWeight: '900', marginBottom: 10 },
 subtitle: { color: theme.colors.textMuted, lineHeight: 25, maxWidth: 760, marginBottom: 24 },
 heroCard: { backgroundColor: '#EFE7FF', borderRadius: 30, padding: 28, marginBottom: 24, overflow: 'hidden' },
 heroImage: { width: '100%', height: 220, borderRadius: 22, marginBottom: 18 },
 heroTitle: { color: theme.colors.primary, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: '800', marginBottom: 10 },
 heroHeadline: { color: theme.colors.text, fontSize: 32, lineHeight: 40, fontWeight: '900', marginBottom: 10 },
 heroBody: { color: theme.colors.text, lineHeight: 24, maxWidth: 760 },
 button: { alignSelf: 'flex-start', marginTop: 18, backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill, paddingHorizontal: 18, paddingVertical: 13 },
 buttonText: { color: theme.colors.surface, fontWeight: '800' },
 grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
 card: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 24, padding: 22, ...theme.shadow },
 cardLabel: { color: theme.colors.accent, fontWeight: '800', marginBottom: 8 },
 cardTitle: { color: theme.colors.text, fontSize: 24, fontWeight: '900', marginBottom: 6 },
 cardSpeaker: { color: theme.colors.primary, fontWeight: '700', marginBottom: 10 },
 cardBody: { color: theme.colors.textMuted, lineHeight: 24 },
});
