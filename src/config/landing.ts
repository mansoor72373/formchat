import {
  BarChart3,
  Code2,
  LayoutList,
  Link2,
  Palette,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import type { PublicFormDTO } from '@/types/form';

export const FEATURES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    icon: LayoutList,
    title: 'A builder that stays out of your way',
    description:
      'Add text, email, multiple choice and yes/no questions. Reorder them, mark what’s required and preview before anyone sees it.',
  },
  {
    icon: Code2,
    title: 'One line to embed',
    description:
      'Paste a single script tag and a floating chat bubble appears on your site, on desktop and on phones.',
  },
  {
    icon: Link2,
    title: 'A link for every form',
    description:
      'Each published form gets its own public URL, ready to share in emails, bios or QR codes.',
  },
  {
    icon: Palette,
    title: 'Looks like your brand',
    description:
      'Choose the widget colour, the chatbot’s name, and write your own welcome and thank-you messages.',
  },
  {
    icon: ShieldCheck,
    title: 'Answers checked as they’re typed',
    description:
      'Emails are validated and required questions can’t be skipped, so the data you collect is usable.',
  },
  {
    icon: BarChart3,
    title: 'Every submission in one place',
    description:
      'See each response with its timestamp, and publish or unpublish a form whenever you like.',
  },
];

export const STEPS = [
  {
    title: 'Build your form',
    description: 'Write your questions in the builder and choose how the chatbot sounds.',
  },
  { title: 'Publish it', description: 'Switch the form to published to get its public link.' },
  { title: 'Embed the widget', description: 'Copy one script tag onto any page of your website.' },
  {
    title: 'Read the responses',
    description: 'Open the dashboard to see every submission as it arrives.',
  },
];

export const DEMO_FORM: Pick<PublicFormDTO, 'title' | 'questions' | 'settings'> = {
  title: 'Quick feedback',
  settings: {
    primaryColor: '#157b6c',
    botName: 'Sam',
    welcomeMessage: 'Hi! I’m Sam. Got a minute to tell us how we’re doing?',
    completionMessage:
      'Thank you! That’s all we needed. (This was just a demo, nothing was saved.)',
  },
  questions: [
    { id: 'name', type: 'text', label: 'What should we call you?', required: true },
    { id: 'email', type: 'email', label: 'What’s your email address?', required: true },
    {
      id: 'rating',
      type: 'multiple_choice',
      label: 'How would you rate your experience?',
      required: true,
      options: ['Great', 'Okay', 'Could be better'],
    },
    { id: 'again', type: 'yes_no', label: 'Would you recommend us to a friend?', required: false },
  ],
};
