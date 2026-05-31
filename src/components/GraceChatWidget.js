import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useCommunity } from '../store/communityStore';
import { theme } from '../theme';

const chips = ['Upcoming events ', 'How to get involved ', 'Make a donation ️', 'This for my club? ️'];

export default function GraceChatWidget() {
 const { state, dispatch } = useCommunity();

 return (
 <View pointerEvents="box-none" style={styles.layer}>
 {state.chatOpen ? (
 <View style={styles.panel}>
 <View style={styles.panelHeader}>
 <View>
 <Text style={styles.panelTitle}>Grace assistant</Text>
 <Text style={styles.panelSubtitle}>ChatInstance demo widget</Text>
 </View>
 <Pressable onPress={() => dispatch({ type: 'TOGGLE_CHAT', payload: false })}>
 <Text style={styles.close}></Text>
 </Pressable>
 </View>

 <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
 {state.chatMessages.map((message) => (
 <View key={message.id} style={[styles.messageBubble, message.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
 <Text style={[styles.messageText, message.role === 'user' && styles.userText]}>{message.text}</Text>
 </View>
 ))}
 </ScrollView>

 <View style={styles.chipsRow}>
 {chips.map((chip) => (
 <Pressable key={chip} onPress={() => dispatch({ type: 'SEND_CHAT_MESSAGE', payload: chip })} style={styles.chip}>
 <Text style={styles.chipText}>{chip}</Text>
 </Pressable>
 ))}
 </View>

 <View style={styles.inputRow}>
 <TextInput
 value={state.chatInput}
 onChangeText={(value) => dispatch({ type: 'SET_CHAT_INPUT', payload: value })}
 placeholder="Ask Grace about events, groups, or donations"
 placeholderTextColor={theme.colors.textMuted}
 style={styles.input}
 />
 <Pressable onPress={() => dispatch({ type: 'SEND_CHAT_MESSAGE', payload: state.chatInput })} style={styles.sendButton}>
 <Text style={styles.sendText}>Send</Text>
 </Pressable>
 </View>
 </View>
 ) : null}

 <Pressable onPress={() => dispatch({ type: 'TOGGLE_CHAT', payload: true })} style={styles.fab}>
 <Text style={styles.fabText}>Grace </Text>
 </Pressable>
 </View>
 );
}

const styles = StyleSheet.create({
 layer: {
 position: 'absolute',
 right: 18,
 bottom: 18,
 alignItems: 'flex-end',
 zIndex: 30,
 },
 panel: {
 width: 360,
 maxWidth: '92%',
 height: 520,
 backgroundColor: theme.colors.surface,
 borderRadius: 24,
 borderWidth: 1,
 borderColor: theme.colors.border,
 marginBottom: 12,
 overflow: 'hidden',
 ...theme.shadow,
 },
 panelHeader: {
 backgroundColor: theme.colors.primary,
 paddingHorizontal: 18,
 paddingVertical: 16,
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 },
 panelTitle: {
 color: theme.colors.surface,
 fontSize: 18,
 fontWeight: '800',
 },
 panelSubtitle: {
 color: '#E9D5FF',
 marginTop: 4,
 },
 close: {
 color: theme.colors.surface,
 fontSize: 20,
 fontWeight: '700',
 },
 messages: {
 flex: 1,
 backgroundColor: '#FBF9FF',
 },
 messagesContent: {
 padding: 14,
 gap: 10,
 },
 messageBubble: {
 maxWidth: '92%',
 paddingHorizontal: 14,
 paddingVertical: 12,
 borderRadius: 18,
 },
 assistantBubble: {
 backgroundColor: '#F3EDFF',
 alignSelf: 'flex-start',
 },
 userBubble: {
 backgroundColor: theme.colors.primary,
 alignSelf: 'flex-end',
 },
 messageText: {
 color: theme.colors.text,
 lineHeight: 20,
 },
 userText: {
 color: theme.colors.surface,
 },
 chipsRow: {
 flexDirection: 'row',
 flexWrap: 'wrap',
 gap: 8,
 paddingHorizontal: 14,
 paddingTop: 12,
 },
 chip: {
 backgroundColor: theme.colors.accentSoft,
 borderRadius: theme.radius.pill,
 paddingHorizontal: 12,
 paddingVertical: 8,
 },
 chipText: {
 color: theme.colors.accent,
 fontWeight: '700',
 fontSize: 12,
 },
 inputRow: {
 flexDirection: 'row',
 gap: 10,
 padding: 14,
 alignItems: 'center',
 },
 input: {
 flex: 1,
 borderWidth: 1,
 borderColor: theme.colors.border,
 borderRadius: theme.radius.pill,
 paddingHorizontal: 16,
 paddingVertical: 12,
 color: theme.colors.text,
 backgroundColor: theme.colors.surface,
 },
 sendButton: {
 backgroundColor: theme.colors.text,
 borderRadius: theme.radius.pill,
 paddingHorizontal: 16,
 paddingVertical: 12,
 },
 sendText: {
 color: theme.colors.surface,
 fontWeight: '700',
 },
 fab: {
 backgroundColor: theme.colors.primary,
 borderRadius: theme.radius.pill,
 paddingHorizontal: 18,
 paddingVertical: 14,
 ...theme.shadow,
 },
 fabText: {
 color: theme.colors.surface,
 fontWeight: '800',
 },
});
