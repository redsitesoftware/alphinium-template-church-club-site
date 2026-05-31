import React from 'react';
import { CommunityProvider } from './src/store/communityStore';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <CommunityProvider>
      <AppNavigator />
    </CommunityProvider>
  );
}
