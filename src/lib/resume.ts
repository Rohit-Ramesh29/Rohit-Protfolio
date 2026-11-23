import { profile } from '../data/portfolio';

/**
 * Checks the resume file actually exists before downloading, so the button never
 * leads to a broken page. Returns false when the PDF has not been uploaded yet.
 */
export async function downloadResume(): Promise<boolean> {
  try {
    const res = await fetch(profile.resume, { method: 'HEAD', cache: 'no-store' });
    const type = res.headers.get('content-type') ?? '';
    if (!res.ok || !type.includes('pdf')) return false;
    const a = document.createElement('a');
    a.href = profile.resume;
    a.download = 'Rohit_R_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  } catch {
    return false;
  }
}
