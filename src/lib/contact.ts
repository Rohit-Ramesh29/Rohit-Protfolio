import { profile } from '../data/portfolio';

export type ContactPayload = { name: string; email: string; subject: string; message: string };
export type SendResult = { status: 'sent' } | { status: 'mailto' } | { status: 'error'; message: string };

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export const isDirectDeliveryConfigured = Boolean(WEB3FORMS_KEY);

export function buildMailto({ name, email, subject, message }: ContactPayload) {
  const body = `${message}\n\n— ${name}\n${email}`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends through Web3Forms when VITE_WEB3FORMS_KEY is configured.
 * Otherwise hands the message to the visitor's email client, and the UI states
 * clearly that nothing is delivered until they press send there.
 */
export async function sendMessage(payload: ContactPayload): Promise<SendResult> {
  if (!WEB3FORMS_KEY) {
    window.location.href = buildMailto(payload);
    return { status: 'mailto' };
  }
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        from_name: 'Portfolio contact form',
        name: payload.name,
        email: payload.email,
        subject: `[Portfolio] ${payload.subject}`,
        message: payload.message,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (res.ok && data.success) return { status: 'sent' };
    return { status: 'error', message: data.message ?? 'The message service rejected the request.' };
  } catch {
    return { status: 'error', message: 'Network error. Please check your connection or email me directly.' };
  }
}
