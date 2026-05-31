# GraceConnect

GraceConnect is a warm, welcoming Expo demo for churches, clubs, and community organisations.

## Highlights
- Community-focused home page with events, groups, donation callout, team profiles, and testimonials
- Reducer-driven app state for events, donations, chat, and screen phases
- Simulated donation flow for alphinium-payments
- Grace chat widget showcasing a ChatInstance-style assistant
- Web-ready Expo setup using Metro

## Run locally
```bash
npm install --legacy-peer-deps
npx expo install react-dom react-native-web @expo/metro-runtime
CI=1 npx expo start --web --port 8102 --clear
```

See `GOING_LIVE.md` for suggested production integrations.
