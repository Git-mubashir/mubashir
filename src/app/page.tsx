'use client';

import { useMemo, useState } from 'react';
import DependencyGraph from '@/components/graph/DependencyGraph';

const DEFAULT_MESSAGE = 'Explain your project.';
const RECIPIENT_EMAIL = 'mubashirkhanmohammed@gmail.com';

type InquiryStatus = {
  type: 'success' | 'error';
  message: string;
};

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [fromEmail, setFromEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState<InquiryStatus | null>(null);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('Work inquiry from the portfolio');
    const body = encodeURIComponent(
      `${message || DEFAULT_MESSAGE}\n\nFrom: ${fromEmail || 'Not provided'}`
    );
    return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  }, [fromEmail, message]);

  function handleSend() {
    if (!fromEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
      setInquiryStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!message.trim()) {
      setMessage(DEFAULT_MESSAGE);
    }

    try {
      window.location.href = mailtoHref;
      setInquiryStatus({
        type: 'success',
        message: 'Your email app was opened with the inquiry ready to send.'
      });
    } catch {
      setInquiryStatus({
        type: 'error',
        message: 'We could not open your email app. Please email us directly.'
      });
    }
  }

  return (
    <>
      <header className="site-header" aria-label="Main navigation">
        <div className="brand-mark" aria-label="MKM home">
          <span className="brand-mark__dot" />
          MKM
        </div>

        <div className="header-actions">
          <button type="button" className="nav-toggle" aria-label="Open workspace menu">
            <span className="nav-toggle__icon" />
          </button>

          <button type="button" className="nav-cta" onClick={() => {
            setInquiryStatus(null);
            setIsInquiryOpen(true);
          }}>
            Work inquiry
          </button>
        </div>
      </header>

      <main id="home" className="portfolio-shell">
        <DependencyGraph />
      </main>

      {isInquiryOpen && (
        <div className="work-inquiry-overlay" onClick={(e) => e.target === e.currentTarget && setIsInquiryOpen(false)}>
          <div className="work-inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="work-inquiry-title">
            <div className="work-inquiry-header">
              <h2 id="work-inquiry-title">Work Inquiry</h2>
            </div>

            <div className="work-inquiry-row">
              <div className="work-inquiry-label">From</div>
              <div className="work-inquiry-person">
                <div className="work-inquiry-avatar work-inquiry-avatar--from">
                  {fromEmail ? fromEmail.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="work-inquiry-meta">
                  <div className="work-inquiry-name">You</div>
                  <div className="work-inquiry-email">{fromEmail || 'Your email address'}</div>
                </div>
              </div>
            </div>

            <div className="work-inquiry-row">
              <div className="work-inquiry-label">To</div>
              <div className="work-inquiry-person">
                <div className="work-inquiry-avatar work-inquiry-avatar--to">M</div>
                <div className="work-inquiry-meta">
                  <div className="work-inquiry-name">Mubashir Khan Mohammed</div>
                  <div className="work-inquiry-email">{RECIPIENT_EMAIL}</div>
                </div>
              </div>
            </div>

            <label className="work-inquiry-field">
              <span className="sr-only">Your email</span>
              <input
                type="email"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                placeholder="Your email address"
              />
            </label>

            <label className="work-inquiry-field work-inquiry-field--textarea">
              <span className="sr-only">Project details</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={DEFAULT_MESSAGE}
                rows={8}
              />
            </label>

            <p className="work-inquiry-note">Serious work inquiries only. Sending a spam will result in account closure.</p>

            {inquiryStatus && (
              <p className={`work-inquiry-status work-inquiry-status--${inquiryStatus.type}`} role="status">
                {inquiryStatus.message}
              </p>
            )}

            <div className="work-inquiry-actions">
              <button type="button" className="work-inquiry-send" onClick={handleSend}>Send</button>
              <button type="button" className="work-inquiry-cancel" onClick={() => setIsInquiryOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
