import { EventType } from '@/types';
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Imię i nazwisko jest wymagane'),
  email: z.string().email('Nieprawidłowy adres email'),
  phone: z.string().regex(/^[0-9]{9}$/, 'Nieprawidłowy numer telefonu'),
  eventDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Data wydarzenia musi być w przyszłości',
  }),
  eventType: z.enum(['wesele', 'urodziny', 'osiemnastka', 'event_firmowy', 'inne'] as const, {
    errorMap: () => ({ message: 'Wybierz typ wydarzenia' }),
  }),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateEventType = (type: string): type is EventType => {
  const validTypes = ['wesele', 'urodziny', 'osiemnastka', 'event_firmowy', 'inne'];
  return validTypes.includes(type);
};

export const validateEventDate = (date: string): boolean => {
  const eventDate = new Date(date);
  const today = new Date();
  return eventDate > today;
};

export const validateBookingData = (data: any) => {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Imię i nazwisko jest wymagane');
  }

  if (!validateEmail(data.email)) {
    errors.push('Nieprawidłowy adres email');
  }

  if (!validatePhone(data.phone)) {
    errors.push('Nieprawidłowy numer telefonu');
  }

  if (!validateEventDate(data.event_date)) {
    errors.push('Data wydarzenia musi być w przyszłości');
  }

  if (!validateEventType(data.event_type)) {
    errors.push('Nieprawidłowy typ wydarzenia');
  }

  return errors;
};

export const validateAnalyticsData = (data: any) => {
  const errors: string[] = [];

  if (!data.page_url?.trim()) {
    errors.push('URL strony jest wymagany');
  }

  if (typeof data.time_on_page !== 'number' || data.time_on_page < 0) {
    errors.push('Nieprawidłowy czas spędzony na stronie');
  }

  if (!['desktop', 'mobile', 'tablet'].includes(data.device_type)) {
    errors.push('Nieprawidłowy typ urządzenia');
  }

  return errors;
};

export const validateLoginData = (data: any) => {
  const errors: string[] = [];

  if (!data.email?.trim()) {
    errors.push('Email jest wymagany');
  } else if (!validateEmail(data.email)) {
    errors.push('Nieprawidłowy adres email');
  }

  if (!data.password?.trim()) {
    errors.push('Hasło jest wymagane');
  } else if (data.password.length < 6) {
    errors.push('Hasło musi mieć co najmniej 6 znaków');
  }

  return errors;
}; 