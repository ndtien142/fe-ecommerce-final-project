import _mock from './_mock';
import { randomInArray } from './funcs';

// ----------------------------------------------------------------------

export const _carouselsExample = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  image: _mock.image.feed(index),
  description: _mock.text.description(index),
}));

export const _carouselsMembers = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
  avatar: `https://minimal-assets-api-dev.vercel.app/assets/images/members/member-${index + 1}.jpg`,
}));

// ----------------------------------------------------------------------

export const _faqs = [
  {
    id: 'faq1',
    value: 'panel1',
    heading: 'What is your return policy for furniture?',
    detail:
      'We offer a 30-day return policy for most furniture items. Items must be in original condition with all packaging. Custom or personalized furniture has a 14-day return period. Return shipping costs are the responsibility of the customer unless the item is defective.',
  },
  {
    id: 'faq2',
    value: 'panel2',
    heading: 'How long does furniture delivery take?',
    detail:
      "Standard delivery takes 7-14 business days. We offer express delivery (2-5 business days) for select items. White glove delivery service is available for professional setup and old furniture removal. We'll contact you to schedule delivery once your order is ready.",
  },
  {
    id: 'faq3',
    value: 'panel3',
    heading: 'Do you offer assembly services?',
    detail:
      'Yes! We offer white glove delivery service which includes professional assembly, placement in your desired room, and removal of packaging. This service is available for an additional fee. We also provide detailed assembly instructions for DIY assembly.',
  },
  {
    id: 'faq4',
    value: 'panel4',
    heading: 'What materials do you use for your furniture?',
    detail:
      'We use high-quality materials including solid wood, engineered wood, premium fabrics, genuine leather, and durable metal frames. Each product page includes detailed material specifications. We prioritize sustainable and eco-friendly materials whenever possible.',
  },
  {
    id: 'faq5',
    value: 'panel5',
    heading: 'Can I customize furniture pieces?',
    detail:
      'Yes, we offer customization options for many of our furniture pieces. You can choose from different fabrics, finishes, sizes, and configurations. Custom orders typically take 4-6 weeks to complete. Contact our design team for personalized assistance.',
  },
  {
    id: 'faq6',
    value: 'panel6',
    heading: 'What warranty do you provide?',
    detail:
      'We offer a 1-year warranty on furniture frames and mechanisms, 6-month warranty on fabric and upholstery, 2-year warranty on mattresses, and lifetime warranty on solid wood construction. The warranty covers manufacturing defects but not normal wear and tear.',
  },
  {
    id: 'faq7',
    value: 'panel7',
    heading: 'Do you offer financing options?',
    detail:
      'Yes, we partner with several financing companies to offer flexible payment options. You can choose from 0% APR financing for qualified purchases, monthly payment plans, and lease-to-own options. Apply online or in-store for instant approval.',
  },
  {
    id: 'faq8',
    value: 'panel8',
    heading: 'How do I care for my furniture?',
    detail:
      'Care instructions vary by material. We provide detailed care guides with each purchase. Generally, avoid direct sunlight, use appropriate cleaning products, dust regularly, and follow manufacturer guidelines. Professional cleaning is recommended for delicate fabrics.',
  },
];

// ----------------------------------------------------------------------

export const _addressBooks = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  receiver: _mock.name.fullName(index),
  fullAddress: _mock.address.fullAddress(index),
  phone: _mock.phoneNumber(index),
  addressType: index === 0 ? 'Home' : 'Office',
  isDefault: index === 0,
}));

// ----------------------------------------------------------------------

export const _skills = [...Array(3)].map((_, index) => ({
  label: ['Development', 'Design', 'Marketing'][index],
  value: _mock.number.percent(index),
}));

// ----------------------------------------------------------------------

export const _accordions = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  value: `panel${index + 1}`,
  heading: `Accordion ${index + 1}`,
  subHeading: _mock.text.title(index),
  detail: _mock.text.description(index),
}));

// ----------------------------------------------------------------------

export const _dataGrid = [...Array(36)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  lastLogin: _mock.time(index),
  performance: _mock.number.percent(index),
  rating: _mock.number.rating(index),
  status: randomInArray(['online', 'away', 'busy']),
  isAdmin: _mock.boolean(index),
  lastName: _mock.name.lastName(index),
  firstName: _mock.name.firstName(index),
  age: _mock.number.age(index),
}));

// ----------------------------------------------------------------------

export const _megaMenuProducts = [...Array(10)].map((_, index) => ({
  name: _mock.text.title(index),
  image: _mock.image.feed(index),
  path: '#',
}));

// ----------------------------------------------------------------------

export const _contacts = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  username: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  address: _mock.address.fullAddress(index),
  phone: _mock.phoneNumber(index),
  email: _mock.email(index),
  lastActivity: _mock.time(index),
  status: randomInArray(['online', 'offline', 'away', 'busy']),
  position: _mock.role(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: [
    'Your order is placed',
    'Sylvan King',
    'You have new message',
    'You have new mail',
    'Delivery processing',
  ][index],
  description: [
    'waiting for shipping',
    'answered to your comment on the Minimal',
    '5 unread messages',
    'sent from Guido Padberg',
    'Your order is being shipped',
  ][index],
  avatar: [null, _mock.image.avatar(2), null, null, null][index],
  type: ['order_placed', 'friend_interactive', 'chat_message', 'mail', 'order_shipped'][index],
  createdAt: _mock.time(index),
  isUnRead: [true, true, false, false, false][index],
}));

// ----------------------------------------------------------------------

export const _mapContact = [
  {
    latlng: [33, 65],
    address: _mock.address.fullAddress(1),
    phoneNumber: _mock.phoneNumber(1),
  },
  {
    latlng: [-12.5, 18.5],
    address: _mock.address.fullAddress(2),
    phoneNumber: _mock.phoneNumber(2),
  },
];
