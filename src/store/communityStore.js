import React, { createContext, useContext, useMemo, useReducer } from 'react';

const CommunityContext = createContext(null);

const events = [
 { id: 'e1', emoji: '', title: 'Sunday Gathering', date: 'Sun 1 June', time: '10:00am', location: 'Main Hall', desc: 'Join us for our weekly community gathering. All welcome!', capacity: 250, registered: 187, category: 'Weekly' },
 { id: 'e2', emoji: '', title: 'Community BBQ & Fundraiser', date: 'Sat 7 June', time: '12:00pm', location: 'Rear Grounds', desc: 'Annual BBQ fundraiser for the community food bank. Bring the family!', capacity: 300, registered: 142, category: 'Social' },
 { id: 'e3', emoji: '', title: 'Book Club — June Meeting', date: 'Tue 10 June', time: '7:00pm', location: 'Library Room', desc: 'This month: "The Midnight Library" by Matt Haig. Newcomers welcome.', capacity: 20, registered: 14, category: 'Groups' },
 { id: 'e4', emoji: '', title: 'Parent & Toddler Playgroup', date: 'Wed 11 June', time: '9:30am', location: 'Activity Room', desc: 'Weekly playgroup for parents with children under 5.', capacity: 30, registered: 22, category: 'Family' },
 { id: 'e5', emoji: '', title: 'Community Choir Practice', date: 'Thu 12 June', time: '7:30pm', location: 'Music Room', desc: 'All voices welcome — no experience needed! Fun, friendly choir.', capacity: 40, registered: 31, category: 'Groups' },
 { id: 'e6', emoji: '', title: 'Community Garden Working Bee', date: 'Sat 14 June', time: '8:00am', location: 'Community Garden', desc: 'Help maintain our beautiful community garden. Gloves provided.', capacity: 25, registered: 9, category: 'Volunteer' },
 { id: 'e7', emoji: '', title: 'Youth Night — Open Mic', date: 'Fri 20 June', time: '6:30pm', location: 'Main Hall', desc: 'Monthly youth night with open mic performances and food.', capacity: 100, registered: 58, category: 'Youth' },
 { id: 'e8', emoji: '', title: 'Charity Fun Run 5K', date: 'Sun 22 June', time: '7:00am', location: 'Community Park', desc: 'Annual 5K fun run raising funds for local youth programs.', capacity: 200, registered: 145, category: 'Fundraiser' },
];

const programs = [
 { id: 'p1', emoji: '', name: 'Families & Kids', desc: 'Playgroup, youth group, and practical support for families.' },
 { id: 'p2', emoji: '', name: 'Environmental', desc: 'Community garden days and sustainability projects with locals.' },
 { id: 'p3', emoji: '', name: 'Arts & Music', desc: 'Choir, art classes, and open mic nights for every skill level.' },
 { id: 'p4', emoji: '', name: 'Volunteering', desc: 'Food bank support, visiting elderly neighbours, and working bees.' },
 { id: 'p5', emoji: '', name: 'Learning', desc: 'Book club, workshops, language classes, and community learning.' },
 { id: 'p6', emoji: '', name: 'Sports & Fitness', desc: 'Fun runs, fitness classes, and social sports teams.' },
];

const team = [
 { id: 't1', avatar: '‍', name: "Rev. Michael O'Brien", role: 'Senior Pastor / Club President', bio: 'Leads with warmth and a passion for building welcoming, connected communities.' },
 { id: 't2', avatar: '', name: 'Sarah Chen', role: 'Community Programs Director', bio: 'Shapes programs that help families, neighbours, and newcomers feel at home.' },
 { id: 't3', avatar: '‍', name: 'Marcus Williams', role: 'Events Coordinator', bio: 'Keeps the calendar buzzing with memorable community experiences.' },
 { id: 't4', avatar: '‍', name: 'Priya Nair', role: 'Youth Director', bio: 'Creates spaces where young people can belong, grow, and contribute.' },
 { id: 't5', avatar: '‍', name: 'Tom Baker', role: 'Volunteer Coordinator', bio: 'Connects generous people with meaningful ways to serve and help others.' },
];

const talks = [
 { id: 's1', title: 'Belonging in a Busy City', speaker: "Rev. Michael O'Brien", date: '26 May', summary: 'A practical talk on building friendships, purpose, and care in modern community life.' },
 { id: 's2', title: 'Serving Side by Side', speaker: 'Sarah Chen', date: '19 May', summary: 'Stories from volunteering programs and why local action still changes lives.' },
 { id: 's3', title: 'Raising Hope Together', speaker: 'Priya Nair', date: '12 May', summary: 'Encouragement for families and youth leaders investing in the next generation.' },
];

const initialChatMessages = [
 {
 id: 'm1',
 role: 'assistant',
 text: "Hi there! I'm Grace, your community assistant demo — powered by ChatInstance. GraceConnect is an alphinium template for churches, clubs and community groups. How can I help, or want to see how this works for YOUR organisation?",
 },
];

const initialState = {
 phase: 'home',
 selectedEvent: null,
 donateStep: 0,
 donateAmount: 50,
 customAmount: '',
 donateFrequency: 'One-off',
 donateMessage: '',
 chatOpen: false,
 chatMessages: initialChatMessages,
 chatInput: '',
 events,
 programs,
 team,
 talks,
 totalDonations: 120450,
};

function buildReply(message, state) {
 const text = message.toLowerCase();

 if (text.includes('event') || text.includes('upcoming') || text.includes('calendar')) {
 const nextEvents = state.events.slice(0, 3).map((event) => `${event.emoji} ${event.title} on ${event.date} at ${event.time}`).join(' · ');
 return `Here are the next highlights: ${nextEvents}. Want me to point you to the full events list or help with registration?`;
 }

 if (text.includes('involved') || text.includes('volunteer') || text.includes('group') || text.includes('join')) {
 return 'There are plenty of ways to get involved Families & Kids, Environmental, Arts & Music, Volunteering, Learning, and Sports & Fitness are all open to newcomers. The Connect page is the best next step.';
 }

 if (text.includes('donat') || text.includes('give') || text.includes('support')) {
 return 'You can make a one-off or monthly gift through our demo alphinium-payments flow. Popular amounts are $25, $50, $100, and $250, and donors receive a tax receipt note in the confirmation step.';
 }

 if (text.includes('club') || text.includes('organisation') || text.includes('template') || text.includes('community centre')) {
 return 'Absolutely. GraceConnect is framed as a flexible community template, so it can be adapted for churches, sports clubs, surf clubs, rotary clubs, community centres, and other not-for-profits.';
 }

 return 'Happy to help I can point you to events, groups, volunteering, donations, or show how this GraceConnect demo could be adapted for your organisation.';
}

function communityReducer(state, action) {
 switch (action.type) {
 case 'SET_PHASE':
 return { ...state, phase: action.payload };
 case 'SELECT_EVENT':
 return { ...state, selectedEvent: action.payload, phase: 'event-detail' };
 case 'SET_DONATE_STEP':
 return { ...state, donateStep: action.payload, phase: 'donate' };
 case 'SET_DONATE_AMOUNT':
 return { ...state, donateAmount: action.payload, customAmount: String(action.payload) };
 case 'SET_CUSTOM_AMOUNT':
 return { ...state, customAmount: action.payload, donateAmount: Number(action.payload) || state.donateAmount };
 case 'SET_DONATE_FREQUENCY':
 return { ...state, donateFrequency: action.payload };
 case 'SET_DONATE_MESSAGE':
 return { ...state, donateMessage: action.payload };
 case 'TOGGLE_CHAT':
 return { ...state, chatOpen: action.payload ?? !state.chatOpen };
 case 'SET_CHAT_INPUT':
 return { ...state, chatInput: action.payload };
 case 'SEND_CHAT_MESSAGE': {
 const trimmed = action.payload.trim();
 if (!trimmed) {
 return state;
 }
 return {
 ...state,
 chatInput: '',
 chatOpen: true,
 chatMessages: [
 ...state.chatMessages,
 { id: `u-${Date.now()}`, role: 'user', text: trimmed },
 { id: `a-${Date.now() + 1}`, role: 'assistant', text: buildReply(trimmed, state) },
 ],
 };
 }
 case 'REGISTER_FOR_EVENT':
 return {
 ...state,
 events: state.events.map((event) =>
 event.id === action.payload ? { ...event, registered: Math.min(event.capacity, event.registered + 1) } : event
 ),
 };
 case 'SUBMIT_DONATION': {
 const amount = Number(state.customAmount) || state.donateAmount;
 return {
 ...state,
 donateAmount: amount,
 customAmount: String(amount),
 donateStep: 2,
 totalDonations: state.totalDonations + amount,
 };
 }
 case 'RESET_DONATION':
 return {
 ...state,
 phase: 'home',
 donateStep: 0,
 donateAmount: 50,
 customAmount: '',
 donateFrequency: 'One-off',
 donateMessage: '',
 };
 default:
 return state;
 }
}

export function CommunityProvider({ children }) {
 const [state, dispatch] = useReducer(communityReducer, initialState);
 const value = useMemo(() => ({ state, dispatch }), [state]);
 return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
}

export function useCommunity() {
 const context = useContext(CommunityContext);
 if (!context) {
 throw new Error('useCommunity must be used within CommunityProvider');
 }
 return context;
}
