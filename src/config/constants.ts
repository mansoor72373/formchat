export const QUESTION_TYPES = ['text', 'email', 'multiple_choice', 'yes_no'] as const;
export const FORM_STATUSES = ['draft', 'published'] as const;

export const LIMITS = {
  maxQuestions: 50,
  maxOptions: 10,
  maxAnswerLength: 2000,
} as const;

export const DEFAULT_FORM_SETTINGS = {
  primaryColor: '#157b6c',
  botName: 'Assistant',
  welcomeMessage: 'Hi there! I have a few quick questions for you.',
  completionMessage: 'Thanks! Your answers have been sent.',
} as const;

export const SESSION_COOKIE = 'formchat_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
