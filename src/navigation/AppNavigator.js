import React from 'react';
import { View } from 'react-native';
import GraceChatWidget from '../components/GraceChatWidget';
import ConnectScreen from '../screens/ConnectScreen';
import DonateScreen from '../screens/DonateScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventsScreen from '../screens/EventsScreen';
import HomeScreen from '../screens/HomeScreen';
import SermonsScreen from '../screens/SermonsScreen';
import { useCommunity } from '../store/communityStore';
import { theme } from '../theme';

export default function AppNavigator() {
 const { state } = useCommunity();

 const screens = {
 home: <HomeScreen />,
 events: <EventsScreen />,
 'event-detail': <EventDetailScreen />,
 donate: <DonateScreen />,
 connect: <ConnectScreen />,
 sermons: <SermonsScreen />,
 };

 return (
 <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
 {screens[state.phase] || <HomeScreen />}
 <GraceChatWidget />
 </View>
 );
}
