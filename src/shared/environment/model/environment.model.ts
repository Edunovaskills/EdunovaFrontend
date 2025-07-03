export const baseServerUrl = import.meta.env.VITE_API_BASE_URL || ''
export const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

export const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919891279370'; 
export const message = import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hello! I want to check out your courses and events.';
export const whatsAppLink = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;



