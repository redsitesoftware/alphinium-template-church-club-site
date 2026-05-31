import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { useCommunity } from '../store/communityStore';
import { theme } from '../theme';

export default function DonateScreen() {
 const { state, dispatch } = useCommunity();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [card, setCard] = useState('4242 4242 4242 4242');
 const amount = useMemo(() => Number(state.customAmount) || state.donateAmount || 50, [state.customAmount, state.donateAmount]);

 const goToDetails = () => dispatch({ type: 'SET_DONATE_STEP', payload: 1 });
 const completeDonation = () => {
 if (!name.trim() || !email.trim() || !card.trim()) {
 return;
 }
 dispatch({ type: 'SUBMIT_DONATION' });
 };

 return (
 <ScrollView style={styles.page} contentContainerStyle={styles.content}>
 <HeaderBar />
 <View style={styles.container}>
 <Text style={styles.eyebrow}>Give</Text>
 <Text style={styles.title}>Support the work of GraceConnect Community</Text>
 <Text style={styles.subtitle}>A polished donation flow helps churches, clubs, and community organisations turn generosity into real impact.</Text>

 <View style={styles.stepsRow}>
 {['Amount', 'Details', 'Done'].map((label, index) => {
 const active = state.donateStep >= index;
 return (
 <View key={label} style={[styles.step, active && styles.stepActive]}>
 <Text style={[styles.stepNumber, active && styles.stepNumberActive]}>{index + 1}</Text>
 <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{label}</Text>
 </View>
 );
 })}
 </View>

 {state.donateStep === 0 ? (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>Step 1 — Choose your amount</Text>
 <Text style={styles.cardBody}>Select a suggested amount or type your own donation value.</Text>
 <View style={styles.amountRow}>
 {[25, 50, 100, 250].map((value) => (
 <Pressable
 key={value}
 onPress={() => dispatch({ type: 'SET_DONATE_AMOUNT', payload: value })}
 style={[styles.amountChip, amount === value && styles.amountChipActive]}
 >
 <Text style={[styles.amountChipText, amount === value && styles.amountChipTextActive]}>${value}</Text>
 </Pressable>
 ))}
 <TextInput
 value={state.customAmount}
 onChangeText={(value) => dispatch({ type: 'SET_CUSTOM_AMOUNT', payload: value.replace(/[^0-9]/g, '') })}
 keyboardType="numeric"
 placeholder="Custom"
 placeholderTextColor={theme.colors.textMuted}
 style={styles.customInput}
 />
 </View>

 <Text style={styles.fieldLabel}>Frequency</Text>
 <View style={styles.frequencyRow}>
 {['One-off', 'Monthly'].map((option) => (
 <Pressable
 key={option}
 onPress={() => dispatch({ type: 'SET_DONATE_FREQUENCY', payload: option })}
 style={[styles.frequencyChip, state.donateFrequency === option && styles.frequencyChipActive]}
 >
 <Text style={[styles.frequencyChipText, state.donateFrequency === option && styles.frequencyChipTextActive]}>{option}</Text>
 </Pressable>
 ))}
 </View>

 <Text style={styles.fieldLabel}>Message (optional)</Text>
 <TextInput
 value={state.donateMessage}
 onChangeText={(value) => dispatch({ type: 'SET_DONATE_MESSAGE', payload: value })}
 placeholder="Share what inspired your gift"
 placeholderTextColor={theme.colors.textMuted}
 multiline
 style={styles.messageInput}
 />

 <Pressable onPress={goToDetails} style={styles.primaryButton}>
 <Text style={styles.primaryButtonText}>Continue to details</Text>
 </Pressable>
 </View>
 ) : null}

 {state.donateStep === 1 ? (
 <View style={styles.card}>
 <Text style={styles.cardTitle}>Step 2 — Simulated secure card form</Text>
 <Text style={styles.cardBody}>This demo represents a Stripe-style checkout powered in production by alphinium-payments.</Text>
 <TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor={theme.colors.textMuted} style={styles.input} />
 <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor={theme.colors.textMuted} autoCapitalize="none" style={styles.input} />
 <TextInput value={card} onChangeText={setCard} placeholder="Card number" placeholderTextColor={theme.colors.textMuted} style={styles.input} />
 <View style={styles.summaryBox}>
 <Text style={styles.summaryTitle}>Donation summary</Text>
 <Text style={styles.summaryText}>${amount} • {state.donateFrequency}</Text>
 {state.donateMessage ? <Text style={styles.summaryText}>“{state.donateMessage}”</Text> : null}
 </View>
 <View style={styles.actionsRow}>
 <Pressable onPress={() => dispatch({ type: 'SET_DONATE_STEP', payload: 0 })} style={styles.secondaryButton}>
 <Text style={styles.secondaryButtonText}>Back</Text>
 </Pressable>
 <Pressable onPress={completeDonation} style={styles.primaryButton}>
 <Text style={styles.primaryButtonText}>Donate ${amount}</Text>
 </Pressable>
 </View>
 </View>
 ) : null}

 {state.donateStep === 2 ? (
 <View style={styles.successCard}>
 <Text style={styles.successTitle}> Thank you! Your donation of ${amount} has been received.</Text>
 <Text style={styles.successBody}>A tax receipt note and confirmation email would be sent after payment capture in the live alphinium-payments integration.</Text>
 <Text style={styles.successBody}>Community donations this year: ${state.totalDonations.toLocaleString()}</Text>
 <View style={styles.actionsRow}>
 <Pressable onPress={() => dispatch({ type: 'RESET_DONATION' })} style={styles.primaryButton}>
 <Text style={styles.primaryButtonText}>Back to home</Text>
 </Pressable>
 <Pressable onPress={() => dispatch({ type: 'SET_PHASE', payload: 'connect' })} style={styles.secondaryButton}>
 <Text style={styles.secondaryButtonText}>Get involved</Text>
 </Pressable>
 </View>
 </View>
 ) : null}
 </View>
 </ScrollView>
 );
}

const styles = StyleSheet.create({
 page: {
 flex: 1,
 backgroundColor: theme.colors.background,
 },
 content: {
 paddingBottom: 100,
 },
 container: {
 width: '100%',
 maxWidth: 920,
 alignSelf: 'center',
 paddingHorizontal: 20,
 },
 eyebrow: {
 color: theme.colors.accent,
 fontWeight: '800',
 textTransform: 'uppercase',
 letterSpacing: 0.8,
 marginTop: 6,
 marginBottom: 10,
 },
 title: {
 color: theme.colors.text,
 fontSize: 38,
 lineHeight: 46,
 fontWeight: '900',
 marginBottom: 10,
 },
 subtitle: {
 color: theme.colors.textMuted,
 lineHeight: 25,
 marginBottom: 24,
 },
 stepsRow: {
 flexDirection: 'row',
 flexWrap: 'wrap',
 gap: 10,
 marginBottom: 20,
 },
 step: {
 flexDirection: 'row',
 alignItems: 'center',
 gap: 10,
 backgroundColor: '#F3EDFF',
 paddingHorizontal: 14,
 paddingVertical: 10,
 borderRadius: theme.radius.pill,
 },
 stepActive: {
 backgroundColor: theme.colors.primary,
 },
 stepNumber: {
 width: 26,
 height: 26,
 borderRadius: 13,
 textAlign: 'center',
 overflow: 'hidden',
 backgroundColor: theme.colors.surface,
 color: theme.colors.primary,
 fontWeight: '900',
 lineHeight: 26,
 },
 stepNumberActive: {
 color: theme.colors.primary,
 },
 stepLabel: {
 color: theme.colors.primary,
 fontWeight: '800',
 },
 stepLabelActive: {
 color: theme.colors.surface,
 },
 card: {
 backgroundColor: theme.colors.surface,
 borderRadius: 28,
 padding: 24,
 borderWidth: 1,
 borderColor: theme.colors.border,
 ...theme.shadow,
 },
 cardTitle: {
 color: theme.colors.text,
 fontSize: 30,
 fontWeight: '900',
 marginBottom: 10,
 },
 cardBody: {
 color: theme.colors.textMuted,
 lineHeight: 24,
 marginBottom: 18,
 },
 amountRow: {
 flexDirection: 'row',
 flexWrap: 'wrap',
 gap: 10,
 marginBottom: 18,
 },
 amountChip: {
 backgroundColor: '#FFF7ED',
 borderWidth: 1,
 borderColor: '#FCD9A6',
 borderRadius: theme.radius.pill,
 paddingHorizontal: 16,
 paddingVertical: 12,
 },
 amountChipActive: {
 backgroundColor: theme.colors.accent,
 borderColor: theme.colors.accent,
 },
 amountChipText: {
 color: '#92400E',
 fontWeight: '800',
 },
 amountChipTextActive: {
 color: theme.colors.surface,
 },
 customInput: {
 minWidth: 120,
 flexGrow: 1,
 borderWidth: 1,
 borderColor: theme.colors.border,
 borderRadius: theme.radius.pill,
 paddingHorizontal: 16,
 paddingVertical: 12,
 color: theme.colors.text,
 backgroundColor: '#FCFBFF',
 },
 fieldLabel: {
 color: theme.colors.text,
 fontWeight: '800',
 marginBottom: 10,
 },
 frequencyRow: {
 flexDirection: 'row',
 gap: 10,
 flexWrap: 'wrap',
 marginBottom: 18,
 },
 frequencyChip: {
 backgroundColor: '#F4EEFF',
 paddingHorizontal: 16,
 paddingVertical: 11,
 borderRadius: theme.radius.pill,
 },
 frequencyChipActive: {
 backgroundColor: theme.colors.primary,
 },
 frequencyChipText: {
 color: theme.colors.primary,
 fontWeight: '800',
 },
 frequencyChipTextActive: {
 color: theme.colors.surface,
 },
 messageInput: {
 minHeight: 110,
 borderWidth: 1,
 borderColor: theme.colors.border,
 borderRadius: 18,
 backgroundColor: '#FCFBFF',
 paddingHorizontal: 16,
 paddingVertical: 14,
 color: theme.colors.text,
 textAlignVertical: 'top',
 marginBottom: 18,
 },
 input: {
 borderWidth: 1,
 borderColor: theme.colors.border,
 borderRadius: 18,
 backgroundColor: '#FCFBFF',
 paddingHorizontal: 16,
 paddingVertical: 14,
 color: theme.colors.text,
 marginBottom: 12,
 },
 summaryBox: {
 backgroundColor: '#F8F5FF',
 borderRadius: 20,
 padding: 16,
 marginTop: 8,
 marginBottom: 18,
 },
 summaryTitle: {
 color: theme.colors.text,
 fontWeight: '900',
 marginBottom: 6,
 },
 summaryText: {
 color: theme.colors.textMuted,
 lineHeight: 22,
 },
 actionsRow: {
 flexDirection: 'row',
 flexWrap: 'wrap',
 gap: 10,
 },
 primaryButton: {
 backgroundColor: theme.colors.primary,
 borderRadius: theme.radius.pill,
 paddingHorizontal: 18,
 paddingVertical: 13,
 },
 primaryButtonText: {
 color: theme.colors.surface,
 fontWeight: '800',
 },
 secondaryButton: {
 backgroundColor: '#F4EEFF',
 borderRadius: theme.radius.pill,
 paddingHorizontal: 18,
 paddingVertical: 13,
 },
 secondaryButtonText: {
 color: theme.colors.primary,
 fontWeight: '800',
 },
 successCard: {
 backgroundColor: '#ECFDF5',
 borderRadius: 28,
 padding: 26,
 borderWidth: 1,
 borderColor: '#A7F3D0',
 ...theme.shadow,
 },
 successTitle: {
 color: theme.colors.success,
 fontSize: 30,
 lineHeight: 38,
 fontWeight: '900',
 marginBottom: 12,
 },
 successBody: {
 color: '#065F46',
 lineHeight: 24,
 marginBottom: 10,
 },
});
