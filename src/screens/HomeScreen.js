import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { COMMUNITY_IMAGES, getEventImage, getTeamImage } from '../media';
import { useCommunity } from '../store/communityStore';
import { theme } from '../theme';

function SectionTitle({ eyebrow, title, subtitle }) {
 return <View style={styles.sectionHeading}>{eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}<Text style={styles.sectionTitle}>{title}</Text>{subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}</View>;
}

function EventCard({ event, onPress }) {
 const spotsLeft = event.capacity - event.registered;
 const urgent = spotsLeft / event.capacity < 0.2;
 return (
 <View style={styles.eventCard}>
 <Image source={{ uri: getEventImage(event.id) }} style={styles.eventImage} />
 <View style={styles.eventTopRow}><View style={styles.categoryBadge}><Text style={styles.categoryText}>{event.category}</Text></View></View>
 <Text style={styles.eventTitle}>{event.title}</Text>
 <Text style={styles.eventMeta}>{event.date} • {event.time}</Text>
 <Text style={styles.eventMeta}>{event.location}</Text>
 <Text style={styles.eventDesc}>{event.desc}</Text>
 <Text style={styles.progressText}>{event.registered}/{event.capacity} registered</Text>
 {urgent ? <Text style={styles.urgencyText}>Only {spotsLeft} spots left</Text> : null}
 <Pressable onPress={onPress} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Register</Text></Pressable>
 </View>
 );
}

export default function HomeScreen() {
 const { state, dispatch } = useCommunity();
 const { width } = useWindowDimensions();
 const isWide = width > 900;
 const cardWidth = isWide ? '48.5%' : '100%';
 const homeEvents = state.events.slice(0, 4);

 return (
 <ScrollView style={styles.page} contentContainerStyle={styles.content}>
 <HeaderBar />
 <View style={styles.hero}>
 <Image source={{ uri: COMMUNITY_IMAGES.hero }} style={styles.heroImage} />
 <View style={[styles.heroContent, { flexDirection: isWide ? 'row' : 'column' }]}>
 <View style={styles.heroTextWrap}>
 <Text style={styles.heroEyebrow}> GraceConnect Community</Text>
 <Text style={styles.heroTitle}>A place to belong. Everyone welcome.</Text>
 <Text style={styles.heroSubtitle}>Join 2,400+ members making a difference in our community.</Text>
 <View style={styles.heroActions}><Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'connect' })} style={styles.heroPrimaryButton}><Text style={styles.heroPrimaryText}>Join Us </Text></Pressable><Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'events' })} style={styles.heroSecondaryButton}><Text style={styles.heroSecondaryText}>Upcoming Events </Text></Pressable></View>
 </View>
 <View style={styles.statsCard}><Text style={styles.statsTitle}>Community impact this year</Text><Text style={styles.statsSummary}>2,400+ Members | 15+ Years | $120K Raised This Year | 50+ Volunteers</Text><View style={styles.heroFeatureCard}><Text style={styles.heroFeatureTitle}>Built for churches, clubs, and community groups</Text><Text style={styles.heroFeatureBody}>GraceConnect is a warm, adaptable template for not-for-profits that want to grow participation and generosity.</Text></View></View>
 </View>
 </View>
 <View style={styles.container}>
 <SectionTitle eyebrow="This Week" title="This Sunday — Community Gathering" subtitle="A warm welcome for newcomers, regulars, families, and neighbours." />
 <View style={[styles.highlightCard, { flexDirection: isWide ? 'row' : 'column' }]}><Image source={{ uri: getEventImage(state.events[0].id) }} style={styles.highlightImage} /><View style={styles.highlightMain}><Text style={styles.highlightTitle}>Sunday Gathering</Text><Text style={styles.highlightMeta}>10:00am • Main Hall • 187 attending • All welcome</Text><Text style={styles.highlightDesc}>Start the week with encouragement, music, community updates, and real connection over coffee afterwards.</Text></View><Pressable onPress={() => dispatch({ type: 'SELECT_EVENT', payload: state.events[0] })} style={styles.goldButton}><Text style={styles.goldButtonText}>Register Free</Text></Pressable></View>
 <SectionTitle eyebrow="Upcoming events" title="What’s happening next" subtitle="Fresh opportunities to connect, volunteer, learn, and celebrate together." />
 <View style={styles.grid}>{homeEvents.map((event) => <View key={event.id} style={{ width: cardWidth }}><EventCard event={event} onPress={() => dispatch({ type: 'SELECT_EVENT', payload: event })} /></View>)}</View>
 <SectionTitle eyebrow="Programs & groups" title="There’s a place for everyone" subtitle="From families to fitness, GraceConnect helps people discover community in ways that fit their season of life." />
 <View style={styles.grid}>{state.programs.map((program) => <View key={program.id} style={[styles.programCard, { width: cardWidth }]}><Text style={styles.programEmoji}>{program.emoji}</Text><Text style={styles.programTitle}>{program.name}</Text><Text style={styles.programDesc}>{program.desc}</Text><Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'connect' })} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Join Group</Text></Pressable></View>)}</View>
 <View style={[styles.donateCard, { flexDirection: isWide ? 'row' : 'column' }]}><View style={styles.donateCopy}><Text style={styles.donateEyebrow}>️ Support Our Community</Text><Text style={styles.donateTitle}>Help us continue our programs and outreach</Text><Text style={styles.donateBody}>This year our community has donated ${state.totalDonations.toLocaleString()} — thank you!</Text><Text style={styles.callout}> alphinium-payments — Secure donations, recurring giving, tax receipts, and fund tracking. One install for any not-for-profit.</Text></View><View style={styles.donateActionsWrap}><View style={styles.amountRow}>{[25, 50, 100, 250].map((amount) => <Pressable key={amount} onPress={() => dispatch({ type: 'SET_DONATE_AMOUNT', payload: amount })} style={[styles.amountChip, state.donateAmount === amount && styles.amountChipActive]}><Text style={[styles.amountChipText, state.donateAmount === amount && styles.amountChipTextActive]}>${amount}</Text></Pressable>)}<TextInput value={state.customAmount} onChangeText={(value) => dispatch({ type: 'SET_CUSTOM_AMOUNT', payload: value.replace(/[^0-9]/g, '') })} keyboardType="numeric" placeholder="Custom" placeholderTextColor={theme.colors.textMuted} style={styles.customInput} /></View><View style={styles.frequencyRow}>{['One-off', 'Monthly'].map((option) => <Pressable key={option} onPress={() => dispatch({ type: 'SET_DONATE_FREQUENCY', payload: option })} style={[styles.frequencyChip, state.donateFrequency === option && styles.frequencyChipActive]}><Text style={[styles.frequencyChipText, state.donateFrequency === option && styles.frequencyChipTextActive]}>{option}</Text></Pressable>)}</View><Pressable onPress={() => dispatch({ type: 'SET_DONATE_STEP', payload: 0 })} style={styles.goldButton}><Text style={styles.goldButtonText}>Give Now</Text></Pressable></View></View>
 <SectionTitle eyebrow="Meet the team" title="Friendly faces leading the community" subtitle="A caring team supporting events, outreach, young people, and volunteers." />
 <View style={styles.grid}>{state.team.map((member) => <View key={member.id} style={[styles.teamCard, { width: isWide ? '31.5%' : '100%' }]}><Image source={{ uri: getTeamImage(member.id) }} style={styles.teamImage} /><Text style={styles.teamName}>{member.name}</Text><Text style={styles.teamRole}>{member.role}</Text><Text style={styles.teamBio}>{member.bio}</Text></View>)}</View>
 <View style={[styles.grid, styles.quotesRow]}>{['“This community changed my life. I came alone and now I have a second family.” — Maria S.','“The volunteering programs are incredible. I’ve made friends for life.” — David K.'].map((quote) => <View key={quote} style={[styles.quoteCard, { width: cardWidth }]}><Text style={styles.quoteText}>{quote}</Text></View>)}</View>
 <View style={styles.talksBanner}><Text style={styles.talksEyebrow}>Recent talks & stories</Text><Text style={styles.talksTitle}>Messages that inspire belonging and action</Text><Text style={styles.talksBody}>Browse recent Sunday messages, community stories, and practical talks that can easily be adapted for your organisation’s media hub.</Text><Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'sermons' })} style={styles.secondaryButtonDark}><Text style={styles.secondaryButtonDarkText}>Browse Talks</Text></Pressable></View>
 </View>
 <View style={styles.footer}><Text style={styles.footerText}> 45 Community Way, Surry Hills Sydney | (02) 9888 4444</Text><Text style={styles.footerText}>Service times: Sundays 10:00am • Midweek groups across the community</Text><Text style={styles.footerText}>Follow us: Instagram • Facebook • YouTube</Text><Text style={styles.footerBrand}> Built with alphinium · alphinium-payments · ChatInstance · alphinium-auth</Text></View>
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 page: { flex: 1, backgroundColor: theme.colors.background },
 content: { paddingBottom: 120 },
 container: { width: '100%', maxWidth: 1180, alignSelf: 'center', paddingHorizontal: 20 },
 hero: { marginHorizontal: 20, marginBottom: 32, borderRadius: 32, backgroundColor: theme.colors.primary, overflow: 'hidden', position: 'relative' },
 heroImage: { width: '100%', height: 320 },
 heroContent: { width: '100%', maxWidth: 1180, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 34, gap: 24, backgroundColor: 'rgba(76,29,149,0.72)' },
 heroTextWrap: { flex: 1.15, gap: 16 },
 heroEyebrow: { color: '#FDE68A', fontWeight: '800', letterSpacing: 0.3 },
 heroTitle: { fontSize: 46, lineHeight: 54, fontWeight: '900', color: theme.colors.surface, maxWidth: 560 },
 heroSubtitle: { color: '#F3E8FF', fontSize: 19, lineHeight: 30, maxWidth: 560 },
 heroActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
 heroPrimaryButton: { backgroundColor: theme.colors.accent, paddingHorizontal: 18, paddingVertical: 14, borderRadius: theme.radius.pill },
 heroPrimaryText: { color: theme.colors.surface, fontWeight: '800' },
 heroSecondaryButton: { backgroundColor: 'rgba(255,255,255,0.14)', paddingHorizontal: 18, paddingVertical: 14, borderRadius: theme.radius.pill, borderWidth: 1, borderColor: 'rgba(255,255,255,0.22)' },
 heroSecondaryText: { color: theme.colors.surface, fontWeight: '800' },
 statsCard: { flex: 0.9, backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)', borderRadius: 28, padding: 20, gap: 16 },
 statsTitle: { color: '#DDD6FE', fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8 },
 statsSummary: { color: theme.colors.surface, fontSize: 22, lineHeight: 32, fontWeight: '800' },
 heroFeatureCard: { backgroundColor: 'rgba(20,15,56,0.26)', borderRadius: 22, padding: 16, gap: 8 },
 heroFeatureTitle: { color: theme.colors.surface, fontWeight: '800', marginBottom: 4 },
 heroFeatureBody: { color: '#E9D5FF', lineHeight: 21 },
 sectionHeading: { marginBottom: 18, marginTop: 14 },
 eyebrow: { color: theme.colors.accent, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8 },
 sectionTitle: { fontSize: 34, lineHeight: 42, fontWeight: '900', color: theme.colors.text, marginBottom: 8 },
 sectionSubtitle: { color: theme.colors.textMuted, lineHeight: 24, fontSize: 16, maxWidth: 760 },
 highlightCard: { backgroundColor: theme.colors.surface, borderRadius: 28, padding: 24, marginBottom: 34, gap: 20, alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: theme.colors.border, ...theme.shadow },
 highlightImage: { width: 220, height: 180, borderRadius: 24 },
 highlightMain: { flex: 1, gap: 10 },
 highlightTitle: { fontSize: 28, fontWeight: '900', color: theme.colors.text },
 highlightMeta: { color: theme.colors.primary, fontWeight: '700' },
 highlightDesc: { color: theme.colors.textMuted, lineHeight: 24, maxWidth: 680 },
 grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginBottom: 32 },
 eventCard: { backgroundColor: theme.colors.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: theme.colors.border, gap: 8, height: '100%', ...theme.shadow, overflow: 'hidden' },
 eventImage: { width: '100%', height: 170, borderRadius: 20, marginBottom: 12 },
 eventTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
 categoryBadge: { backgroundColor: '#EFE7FF', borderRadius: theme.radius.pill, paddingHorizontal: 12, paddingVertical: 6 },
 categoryText: { color: theme.colors.primary, fontWeight: '800', fontSize: 12 },
 eventTitle: { fontSize: 22, lineHeight: 28, color: theme.colors.text, fontWeight: '800' },
 eventMeta: { color: theme.colors.textMuted },
 eventDesc: { color: theme.colors.text, lineHeight: 22, marginVertical: 6 },
 progressText: { color: theme.colors.primary, fontWeight: '700', marginTop: 4 },
 urgencyText: { color: theme.colors.accent, fontWeight: '800', marginTop: 4 },
 primaryButton: { marginTop: 10, backgroundColor: theme.colors.primary, paddingHorizontal: 16, paddingVertical: 13, borderRadius: theme.radius.pill, alignSelf: 'flex-start' },
 primaryButtonText: { color: theme.colors.surface, fontWeight: '800' },
 programCard: { backgroundColor: theme.colors.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: theme.colors.border, gap: 10, ...theme.shadow },
 programEmoji: { fontSize: 32 },
 programTitle: { fontSize: 21, fontWeight: '800', color: theme.colors.text },
 programDesc: { color: theme.colors.textMuted, lineHeight: 22, marginBottom: 8 },
 secondaryButton: { alignSelf: 'flex-start', backgroundColor: '#F4EEFF', borderRadius: theme.radius.pill, paddingHorizontal: 14, paddingVertical: 11 },
 secondaryButtonText: { color: theme.colors.primary, fontWeight: '800' },
 donateCard: { backgroundColor: '#FFF7ED', borderRadius: 30, padding: 24, marginBottom: 34, gap: 20, borderWidth: 1, borderColor: '#FCD9A6', ...theme.shadow },
 donateCopy: { flex: 1, gap: 10 },
 donateEyebrow: { color: theme.colors.accent, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8 },
 donateTitle: { fontSize: 32, fontWeight: '900', color: '#7C2D12', lineHeight: 40 },
 donateBody: { color: '#7C2D12', lineHeight: 24, fontSize: 16 },
 callout: { marginTop: 12, backgroundColor: '#FFFFFFB3', borderRadius: 20, padding: 14, color: '#92400E', lineHeight: 22, fontWeight: '700' },
 donateActionsWrap: { flex: 1, gap: 14, justifyContent: 'center' },
 amountRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
 amountChip: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.pill, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#F5C37C' },
 amountChipActive: { backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
 amountChipText: { color: '#92400E', fontWeight: '800' },
 amountChipTextActive: { color: theme.colors.surface },
 customInput: { minWidth: 110, flexGrow: 1, borderWidth: 1, borderColor: '#F5C37C', backgroundColor: theme.colors.surface, borderRadius: theme.radius.pill, paddingHorizontal: 16, paddingVertical: 12, color: theme.colors.text },
 frequencyRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
 frequencyChip: { backgroundColor: '#FFF0D9', paddingHorizontal: 14, paddingVertical: 10, borderRadius: theme.radius.pill },
 frequencyChipActive: { backgroundColor: '#7C2D12' },
 frequencyChipText: { color: '#92400E', fontWeight: '800' },
 frequencyChipTextActive: { color: theme.colors.surface },
 goldButton: { alignSelf: 'flex-start', backgroundColor: theme.colors.accent, paddingHorizontal: 18, paddingVertical: 14, borderRadius: theme.radius.pill },
 goldButtonText: { color: theme.colors.surface, fontWeight: '800' },
 teamCard: { backgroundColor: theme.colors.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: theme.colors.border, gap: 8, ...theme.shadow, overflow: 'hidden' },
 teamImage: { width: '100%', height: 180, borderRadius: 20, marginBottom: 8 },
 teamName: { fontSize: 21, fontWeight: '800', color: theme.colors.text },
 teamRole: { color: theme.colors.primary, fontWeight: '700' },
 teamBio: { color: theme.colors.textMuted, lineHeight: 22 },
 quotesRow: { marginTop: 8 },
 quoteCard: { backgroundColor: '#F0EAFF', borderRadius: 24, padding: 24 },
 quoteText: { color: theme.colors.text, fontSize: 18, lineHeight: 28, fontWeight: '700' },
 talksBanner: { backgroundColor: theme.colors.text, borderRadius: 30, padding: 28, marginBottom: 42, gap: 10 },
 talksEyebrow: { color: '#FDE68A', fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8 },
 talksTitle: { color: theme.colors.surface, fontSize: 30, fontWeight: '900' },
 talksBody: { color: '#D1D5DB', lineHeight: 24, maxWidth: 720 },
 secondaryButtonDark: { marginTop: 10, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: theme.radius.pill, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' },
 secondaryButtonDarkText: { color: theme.colors.surface, fontWeight: '800' },
 footer: { backgroundColor: theme.colors.footer, paddingHorizontal: 20, paddingVertical: 36, gap: 8, alignItems: 'center' },
 footerText: { color: '#D1D5DB', textAlign: 'center' },
 footerBrand: { color: '#FDE68A', fontWeight: '800', textAlign: 'center', marginTop: 6 },
});
