'use client';

import { useEffect, useState } from 'react';
import { ContactQR } from '@/components/ui/ContactQR';

export type Section = {
  id: string;
  label: string;
  file: string;
  accent: string;
  icon: string;
  render: () => JSX.Element;
};

const LINKEDIN_URL = 'https://linkedin.com/in/mubashir-khan-mohammed';
const ABOUTME_URL = 'https://about.me/mubashirkhanmohammed';
const MEDIUM_URL = 'https://medium.com/@mubashirkhanmohammed';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => w.length && !/^(of|and|the|pvt\.?|ltd\.?|inc\.?|internet)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

const EXPERIENCE = [
  { co: 'Fresenius Medical Care', role: 'Senior Java Developer (Contract)', where: 'Waltham, MA', when: 'Aug 2025 – Present',
    bullets: ['OpenShift deployment templates + Jenkins CI/CD pipelines across Fera, ECC and EPOC', 'Led P1/P2 RRT bridge calls and RCA, driving down MTTR'] },
  { co: 'Centene Corporation', role: 'Java Developer (Contract)', where: 'St. Louis, MO', when: 'Aug 2024 – Jul 2025',
    bullets: ['PowerShell deployment automation cut release time by 40%', 'ServiceNow ITIL incident management + SLA dashboards'] },
  { co: 'Liberty Mutual Insurance', role: 'Full Stack Java Developer', where: 'Exeter, NH', when: 'Sep 2019 – Jul 2024',
    bullets: ['Spring Boot microservices with Spring Security / OAuth2', 'Kafka event streaming; ReactJS + AJAX frontend features'] },
  { co: 'University of Phoenix', role: 'Full Stack Developer', where: 'Phoenix, AZ', when: 'Feb 2018 – Sep 2019',
    bullets: ['Angular 4/5 + TypeScript SPAs', 'Java 8 backend integrated with Oracle via PL/SQL'] },
  { co: 'Flipkart Internet Pvt. Ltd.', role: 'Java Developer', where: 'India', when: 'May 2015 – Oct 2015',
    bullets: ['Java Swing/JSF logistics tracking system', 'SOA integration via SOAP, WSDL, JAX-WS'] }
];

function ResumeSection() {
  return (
    <>
      <div className="comment">// Resume</div>
      <p>Senior Java &amp; Full Stack Developer with 8+ years designing and delivering enterprise microservices, REST APIs and cloud-native applications — Spring Boot, Kafka event-driven architecture, AWS, and CI/CD across OpenShift and Jenkins.</p>
      <a className="btn" href="/resume.pdf" download="Mubashir_Khan_Mohammed_Resume.pdf">Download Résumé (PDF) ⇩</a>
      <div style={{ marginTop: 18 }}>
        {EXPERIENCE.map((e) => (
          <div className="role-block" key={e.co}>
            <h3>{e.co}</h3>
            <div className="sub">{e.role} · {e.where} · {e.when}</div>
            <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="todo"><b style={{ color: 'var(--ink-dim)' }}>Highlights</b>&nbsp; 8+ yrs enterprise Java · ITIL v4 Foundation · 40% faster deployments</div>
    </>
  );
}

function ClientsSection() {
  const [clients, setClients] = useState<{ name: string; role: string; accent: string }[] | null>(null);

  useEffect(() => {
    fetch('/api/clients').then((r) => r.json()).then(setClients).catch(() => setClients([]));
  }, []);

  return (
    <>
      <div className="comment">// Clients served</div>
      <p className="li-note" style={{ marginBottom: 14 }}>
        Company logos aren&apos;t pulled in here — reusing another company&apos;s brand mark isn&apos;t something to do lightly — so each client gets its own initials badge instead. This list is fetched from <code>/api/clients</code>, backed by the <code>Client</code> Prisma model, so it&apos;s editable from <code>/admin</code> without touching code.
      </p>
      <div className="client-grid">
        {(clients ?? []).map((c) => (
          <div className="client-card" key={c.name}>
            <div className={`client-badge dot-accent-${c.accent}`} style={{ background: 'var(--dot-accent)' }}>{initials(c.name)}</div>
            <div><div className="client-name">{c.name}</div><div className="client-role">{c.role}</div></div>
          </div>
        ))}
      </div>
    </>
  );
}

function TestimonialsSection() {
  const [items, setItems] = useState<{ name: string; role: string; accent: string; quote: string }[] | null>(null);

  useEffect(() => {
    fetch('/api/testimonials').then((r) => r.json()).then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <>
      <div className="comment">// Testimonials</div>
      {(items ?? []).map((t) => (
        <div className="li-card" key={t.name}>
          <div className={`li-avatar dot-accent-${t.accent}`} style={{ background: 'var(--dot-accent)' }}>{initials(t.name)}</div>
          <div>
            <div className="quote">{t.quote}</div>
            <div className="who"><b>{t.name}</b> · {t.role}</div>
          </div>
        </div>
      ))}
      <div className="todo">// Seeded placeholder quotes (see prisma/seed.ts) — replace via /admin once real feedback comes in</div>
    </>
  );
}

export const SECTIONS: Section[] = [
  {
    id: 'about', label: 'About me', file: 'about-me.md', accent: 'purple',
    icon: '<circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"></path>',
    render: () => (
      <>
        <div className="comment">// About me</div>
        <p>Senior Java &amp; Full Stack Developer with 8+ years designing enterprise-grade microservices, REST APIs and event-driven systems on Spring Boot, Kafka and AWS. Comfortable owning things end-to-end — CI/CD pipelines, OpenShift deployments, and hands-on L2/L3 production incident response. Experience spans healthcare, insurance and public-sector platforms in the US; currently open to opportunities in the UAE.</p>
        <a className="btn" href={ABOUTME_URL} target="_blank" rel="noopener noreferrer">View about.me profile ↗</a>
      </>
    )
  },
  {
    id: 'resume', label: 'Resume', file: 'resume.pdf', accent: 'yellow',
    icon: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><polyline points="14 3 14 8 19 8"></polyline><line x1="8.5" y1="13" x2="15.5" y2="13"></line><line x1="8.5" y1="17" x2="15.5" y2="17"></line>',
    render: () => <ResumeSection />
  },
  {
    id: 'linkedin', label: 'LinkedIn', file: 'linkedin.json', accent: 'blue',
    icon: '<circle cx="7" cy="7" r="3"></circle><circle cx="17" cy="17" r="3"></circle><line x1="9.2" y1="9.2" x2="14.8" y2="14.8"></line>',
    render: () => (
      <>
        <div className="comment">// LinkedIn</div>
        <div className="li-card">
          <div className="li-avatar" style={{ background: 'var(--c-blue)' }}>MK</div>
          <div>
            <div className="li-name">Mubashir Khan Mohammed</div>
            <div className="li-headline">Senior Java &amp; Full Stack Developer</div>
          </div>
        </div>
        <p className="li-note">LinkedIn blocks third-party iframe embedding for every site, not just this one, so a live embed isn&apos;t possible — this card mirrors the real profile instead.</p>
        <a className="btn" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">View LinkedIn Profile ↗</a>
      </>
    )
  },
  {
    id: 'clients', label: 'Clients served', file: 'clients-served.csv', accent: 'green',
    icon: '<circle cx="9" cy="8" r="3.2"></circle><path d="M3.5 20c0-3.6 2.9-5.8 5.5-5.8s5.5 2.2 5.5 5.8"></path><circle cx="17.2" cy="9" r="2.4"></circle><path d="M15.8 14.4c2.6 0 4.7 2 4.7 5.2"></path>',
    render: () => <ClientsSection />
  },
  {
    id: 'tech', label: 'Tech & services', file: 'tech-stack.yaml', accent: 'cyan',
    icon: '<polyline points="9 8 4.5 12 9 16"></polyline><polyline points="15 8 19.5 12 15 16"></polyline><line x1="13.5" y1="5.5" x2="10.5" y2="18.5"></line>',
    render: () => (
      <>
        <div className="comment">// Tech &amp; services</div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="todo">// TODO: replace with the real stack/services breakdown</div>
      </>
    )
  },
  {
    id: 'testimonials', label: 'Testimonials', file: 'testimonials.log', accent: 'pink',
    icon: '<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4.2 3.5A.6.6 0 0 1 4 19.1V6a1 1 0 0 1 1-1z"></path><line x1="7.5" y1="9.5" x2="16.5" y2="9.5"></line><line x1="7.5" y1="13" x2="13.5" y2="13"></line>',
    render: () => <TestimonialsSection />
  },
  {
    id: 'payment', label: 'Payment', file: 'payment.config', accent: 'orange',
    icon: '<rect x="2.5" y="5.5" width="19" height="13" rx="2"></rect><line x1="2.5" y1="10" x2="21.5" y2="10"></line><line x1="6" y1="15" x2="10" y2="15"></line>',
    render: () => (
      <>
        <div className="comment">// Payment</div>
        <p>Accepts Mastercard, Visa and PhonePe.</p>
        <div className="pay-grid">
          <div className="pay-badge" style={{ background: '#1a1f71' }}>VISA</div>
          <div className="pay-badge" style={{ background: 'linear-gradient(90deg,#eb001b,#f79e1b)' }}>mastercard</div>
          <div className="pay-badge" style={{ background: '#5f259f' }}>PhonePe</div>
        </div>
        <p className="li-note">Styled name badges rather than official brand marks — same reasoning as the client logos: no outside images, and hand-recreating trademarked artwork isn&apos;t the right workaround.</p>
        <div className="todo">// TODO: wire up a real &quot;Pay now&quot; link and swap in official payment logos once self-hosted</div>
      </>
    )
  },
  {
    id: 'qr', label: 'Contact QR', file: 'contact-qr.svg', accent: 'teal',
    icon: '<rect x="3.5" y="3.5" width="6" height="6" rx="1"></rect><rect x="14.5" y="3.5" width="6" height="6" rx="1"></rect><rect x="3.5" y="14.5" width="6" height="6" rx="1"></rect><rect x="14.5" y="14.5" width="2.5" height="2.5"></rect><rect x="18" y="14.5" width="2.5" height="2.5"></rect><rect x="14.5" y="18" width="2.5" height="2.5"></rect><rect x="18" y="18" width="2.5" height="2.5"></rect>',
    render: () => (
      <>
        <div className="comment">// Contact QR</div>
        <ContactQR />
        <p className="qr-caption">Scan to save this contact directly to your phone.</p>
      </>
    )
  },
  {
    id: 'updates', label: 'Daily updates', file: 'daily-updates.rss', accent: 'red',
    icon: '<path d="M5 11a8 8 0 0 1 8 8"></path><path d="M5 5a14 14 0 0 1 14 14"></path><circle cx="5.5" cy="18.5" r="1.4" fill="currentColor" stroke="none"></circle>',
    render: () => (
      <>
        <div className="comment">// Daily updates</div>
        <p>No stories published on Medium yet — this section is wired up and ready to sync as soon as there&apos;s something to show.</p>
        <a className="btn" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">Visit Medium profile ↗</a>
        <div className="todo">// The Post Prisma model + /admin/posts is the intended long-term replacement for Medium syncing entirely — publish here directly instead of scraping an external feed</div>
      </>
    )
  }
];
