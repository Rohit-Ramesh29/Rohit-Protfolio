import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Copy, Loader2, Mail, MailOpen, MapPin, Send } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { profile } from '../../data/portfolio';
import { buildMailto, isDirectDeliveryConfigured, sendMessage, type ContactPayload } from '../../lib/contact';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { useToast } from '../ui/Toast';

type Errors = Partial<Record<keyof ContactPayload, string>>;
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'mailto' } | { kind: 'error'; message: string };

const empty: ContactPayload = { name: '', email: '', subject: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v: ContactPayload): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'Please add a short subject (at least 3 characters).';
  if (v.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.';
  else if (v.message.length > 2000) e.message = 'Please keep your message under 2000 characters.';
  return e;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label} <span className="text-accent-blue" aria-hidden="true">*</span>
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
          >
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (hasError: boolean) =>
  `w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:bg-ink-950 focus:ring-4 ${
    hasError ? 'border-rose-400/60 focus:ring-rose-400/15' : 'border-white/10 focus:border-accent-blue/70 focus:ring-accent-blue/15'
  }`;

function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactPayload, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched[e.target.name as keyof ContactPayload]) setErrors(validate(next));
    if (status.kind !== 'idle' && status.kind !== 'sending') setStatus({ kind: 'idle' });
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length) {
      document.getElementById(`contact-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus({ kind: 'sending' });
    const res = await sendMessage(values);
    if (res.status === 'sent') {
      setStatus({ kind: 'sent' });
      setValues(empty);
      setTouched({});
    } else if (res.status === 'mailto') {
      setStatus({ kind: 'mailto' });
    } else {
      setStatus({ kind: 'error', message: res.message });
    }
  };

  const aria = (k: keyof ContactPayload) => ({
    'aria-invalid': Boolean(errors[k] && touched[k]),
    'aria-describedby': errors[k] && touched[k] ? `contact-${k}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className="glass space-y-5 p-6 sm:p-8" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={touched.name ? errors.name : undefined}>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Your full name"
            className={inputCls(Boolean(touched.name && errors.name))}
            {...aria('name')}
          />
        </Field>
        <Field id="contact-email" label="Email" error={touched.email ? errors.email : undefined}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="you@company.com"
            className={inputCls(Boolean(touched.email && errors.email))}
            {...aria('email')}
          />
        </Field>
      </div>
      <Field id="contact-subject" label="Subject" error={touched.subject ? errors.subject : undefined}>
        <input
          id="contact-subject"
          name="subject"
          value={values.subject}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Internship opportunity, freelance project, collaboration…"
          className={inputCls(Boolean(touched.subject && errors.subject))}
          {...aria('subject')}
        />
      </Field>
      <Field id="contact-message" label="Message" error={touched.message ? errors.message : undefined}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Tell me a little about the role or project…"
          className={`${inputCls(Boolean(touched.message && errors.message))} resize-y`}
          {...aria('message')}
        />
        <p className="mt-1 text-right font-mono text-[10px] text-slate-600">{values.message.length}/2000</p>
      </Field>

      <button
        type="submit"
        disabled={status.kind === 'sending'}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.7)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
      >
        {status.kind === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            {isDirectDeliveryConfigured ? 'Send Message' : 'Compose in Email App'}
            <Send className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
          </>
        )}
      </button>

      {!isDirectDeliveryConfigured && status.kind === 'idle' && (
        <p className="text-center text-xs text-slate-500">
          This form opens your email app with your message ready to send to {profile.email}.
        </p>
      )}

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {status.kind === 'sent' && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
              <p className="text-emerald-100">Thank you! Your message has been delivered. I&apos;ll get back to you soon.</p>
            </motion.div>
          )}
          {status.kind === 'mailto' && (
            <motion.div
              key="mailto"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 rounded-xl border border-accent-blue/30 bg-accent-blue/10 p-4 text-sm"
            >
              <MailOpen className="mt-0.5 h-5 w-5 shrink-0 text-accent-blue" aria-hidden="true" />
              <div className="text-slate-200">
                <p className="font-semibold text-white">Almost there: your email app should now be open.</p>
                <p className="mt-1 text-slate-400">
                  Your message is <strong className="text-slate-200">not sent yet</strong>. Press send in your email app to deliver it. If nothing
                  opened,{' '}
                  <a href={buildMailto(values)} className="text-accent-blue underline underline-offset-2">
                    try again
                  </a>{' '}
                  or email <span className="text-white">{profile.email}</span> directly.
                </p>
              </div>
            </motion.div>
          )}
          {status.kind === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" aria-hidden="true" />
              <p className="text-rose-100">
                Your message could not be sent. {status.message} You can also reach me at{' '}
                <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                  {profile.email}
                </a>
                .
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export function Contact() {
  const notify = useToast();
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify({ tone: 'success', title: 'Email copied', body: profile.email });
    } catch {
      notify({ tone: 'error', title: 'Could not copy', body: 'Please copy the address manually.' });
    }
  };

  const socials = [
    { href: profile.github, label: 'GitHub', handle: 'Rohit-Ramesh29', icon: GithubIcon },
    { href: profile.linkedin, label: 'LinkedIn', handle: 'rohit-ramesh', icon: LinkedinIcon },
  ];

  return (
    <Section id="contact">
      <SectionHeading
        id="contact"
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s Build Something <span className="text-gradient">Great Together.</span>
          </>
        }
        description="I'm open to software development opportunities, QA engineering roles, internships, freelance projects, and professional collaborations."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
        <Reveal className="space-y-4">
          <div className="glass p-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-blue/15 text-accent-blue">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-slate-500">Email</p>
                <a href={`mailto:${profile.email}`} className="block truncate font-medium text-white hover:text-accent-blue">
                  {profile.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-accent-blue/50 hover:text-white"
                aria-label="Copy email address"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink-950 transition hover:bg-slate-200"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> Email Me
            </a>
          </div>

          <div className="glass flex items-center gap-4 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-purple/15 text-accent-purple">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Location</p>
              <p className="font-medium text-white">{profile.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {socials.map(({ href, label, handle, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="glass group flex flex-col gap-3 p-5 transition-colors hover:border-accent-blue/40"
                aria-label={`${label} profile (opens in a new tab)`}
              >
                <Icon className="h-6 w-6 text-slate-300 transition group-hover:text-white" />
                <div className="min-w-0">
                  <p className="font-semibold text-white">{label}</p>
                  <p className="truncate text-xs text-slate-500">{handle}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
