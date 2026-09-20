'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

// Real npm package (not a CDN script tag) generating a scannable vCard QR —
// scanning it prompts "Add contact" on most phones rather than showing plain text.
const CONTACT = {
  name: 'Mubashir Khan Mohammed',
  phones: ['+1 978 712 8190', '+91 91000 02413'],
  email: 'mubashirkhanmohammed@gmail.com'
};

export function ContactQR() {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Khan Mohammed;Mubashir;;;',
      `FN:${CONTACT.name}`,
      `TEL;TYPE=CELL:${CONTACT.phones[0].replace(/\s+/g, '')}`,
      `TEL;TYPE=CELL:${CONTACT.phones[1].replace(/\s+/g, '')}`,
      `EMAIL:${CONTACT.email}`,
      'END:VCARD'
    ].join('\n');

    QRCode.toString(vcard, { type: 'svg', margin: 1, color: { dark: '#0f111a', light: '#ffffff' } })
      .then(setSvg)
      .catch(() => setSvg(''));
  }, []);

  return (
    <div className="qr-wrap">
      <div className="qr-card" dangerouslySetInnerHTML={{ __html: svg }} />
      <div className="qr-details">
        <div className="qname">{CONTACT.name}</div>
        <div>{CONTACT.phones.join(' · ')}</div>
        <div>{CONTACT.email}</div>
      </div>
    </div>
  );
}
