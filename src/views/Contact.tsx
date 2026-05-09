'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import type { Locale } from '../lib/i18n';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

type ContactFormState = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string;
};

const initialFormState: ContactFormState = {
  fullName: '',
  email: '',
  phone: '',
  service: 'construction',
  message: '',
  website: '',
};

const serviceOptions = [
  { value: 'construction', fr: 'Construction', en: 'Construction' },
  { value: 'logistics_transport', fr: 'Logistique & Transport', en: 'Logistics & Transport' },
  { value: 'general_trading', fr: 'Commerce Général', en: 'General Trading' },
  { value: 'trading', fr: 'Négoce', en: 'Trading' },
  { value: 'other', fr: 'Autre', en: 'Other' },
] as const;

export const ContactPage = ({ locale = 'fr' }: { locale?: Locale }) => {
  const isEn = locale === 'en';
  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formData, setFormData] = React.useState<ContactFormState>(initialFormState);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const field = e.target.name as keyof ContactFormState;
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error ?? (isEn ? 'Unable to send message right now.' : "Impossible d'envoyer le message pour le moment."));
      }

      setStatus('success');
      setFormData(initialFormState);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : isEn ? 'Unable to send message right now.' : "Impossible d'envoyer le message pour le moment.",
      );
    }
  };

  return (
    <div className="bg-merlin-gray min-h-screen">
      {/* Banner */}
      <div className="bg-white py-16 md:py-24 px-6 text-center border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-merlin-red font-black text-xs uppercase tracking-widest px-4 py-1 bg-red-50 rounded-full border border-red-100">{isEn ? 'Contact us' : 'Contactez-nous'}</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-outfit uppercase">{isEn ? 'LET’S TALK ABOUT YOUR' : 'PARLONS DE VOTRE'} <span className="text-merlin-green">{isEn ? 'PROJECT' : 'PROJET'}</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            {isEn
              ? 'A question? A quote request? Our responsive team is ready to provide the best solutions in Kribi.'
              : 'Une question ? Un devis ? Notre équipe réactive est à votre écoute pour vous proposer les meilleures solutions à Kribi.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
             <div className="space-y-6">
                <h2 className="text-3xl font-black uppercase tracking-tight">{isEn ? 'CONTACT' : 'INFORMATIONS DE'} <span className="text-merlin-red">{isEn ? 'INFORMATION' : 'CONTACT'}</span></h2>
                <p className="text-gray-500">{isEn ? 'Choose the channel that suits you best, we will respond as quickly as possible.' : 'Choisissez le canal qui vous convient le mieux, nous vous répondrons dans les plus brefs délais.'}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Phone, label: isEn ? 'Phone' : 'Téléphone', value: '+237 695 42 59 70', sub: '+237 222 462 523', color: 'bg-merlin-red' },
                  { icon: Mail, label: 'Email', value: 'merlincameroun@gmail.com', sub: isEn ? 'Reply within 24h' : 'Réponse sous 24h', color: 'bg-merlin-green' },
                  { icon: MapPin, label: isEn ? 'Location' : 'Localisation', value: isEn ? 'Kribi, Cameroon' : 'Kribi, Cameroun', sub: isEn ? 'Head office' : 'Siège social', color: 'bg-merlin-black' },
                  { 
                    isWhatsApp: true,
                    label: 'WhatsApp', 
                    value: '+237 695 42 59 70', 
                    sub: isEn ? 'Quick guidance' : 'Conseils rapides', 
                    color: 'bg-[#25D366]' 
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-500/5 group hover:bg-merlin-gray transition-colors">
                     <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                        {('isWhatsApp' in item) ? (
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.3-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.2 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                          </svg>
                        ) : (
                          <item.icon className="w-6 h-6" />
                        )}
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{item.label}</p>
                     <p className="font-bold text-merlin-black break-words">{item.value}</p>
                     <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
                  </div>
                ))}
             </div>

             <div className="bg-merlin-black p-10 rounded-[3rem] text-white space-y-4">
                <h3 className="text-xl font-bold uppercase text-merlin-yellow">{isEn ? 'Opening hours' : 'Horaires de bureau'}</h3>
                <div className="flex justify-between items-center text-sm border-b border-white/10 py-3">
                   <span className="text-gray-400">{isEn ? 'Monday — Saturday' : 'Lundi — Samedi'}</span>
                   <span className="font-bold">07:30 — 18:00</span>
                </div>
                <div className="flex justify-between items-center text-sm py-3">
                   <span className="text-gray-400">{isEn ? 'Public holidays' : 'Jours fériés'}</span>
                   <span className="font-bold">{isEn ? 'Open' : 'Ouvert'}</span>
                </div>
             </div>
          </div>

          {/* Form */}
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 relative">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-24 h-24 rounded-full bg-merlin-green text-white flex items-center justify-center shadow-xl shadow-green-500/20">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black uppercase">{isEn ? 'Message sent!' : 'Message Envoyé !'}</h3>
                <p className="text-gray-500 max-w-xs">{isEn ? 'Thanks for contacting us. A MERLIN advisor will get back to you shortly.' : 'Merci de nous avoir contacté. Un conseiller MERLIN reviendra vers vous très prochainement.'}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-merlin-green font-bold hover:underline"
                >
                  {isEn ? 'Send another message' : 'Envoyer un autre message'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-8">{isEn ? 'REQUEST A' : 'DEMANDER UN'} <span className="text-merlin-green">{isEn ? 'QUOTE' : 'DEVIS'}</span></h3>
                {status === 'error' ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {errorMessage || (isEn ? 'Unable to send message right now.' : "Impossible d'envoyer le message pour le moment.")}
                  </div>
                ) : null}

                <input type="text" name="website" value={formData.website} onChange={handleFieldChange} className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{isEn ? 'Full name' : 'Nom Complet'}</label>
                    <input
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFieldChange}
                      type="text"
                      className="w-full bg-merlin-gray border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-merlin-green"
                      placeholder={isEn ? 'John Doe' : 'Jean Dupont'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email</label>
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleFieldChange}
                      type="email"
                      className="w-full bg-merlin-gray border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-merlin-green"
                      placeholder={isEn ? 'john@example.com' : 'jean@example.com'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{isEn ? 'Phone' : 'Téléphone'}</label>
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleFieldChange}
                      type="tel"
                      className="w-full bg-merlin-gray border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-merlin-green"
                      placeholder="+237 6..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{isEn ? 'Requested service' : 'Service Demandé'}</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleFieldChange}
                      className="w-full bg-merlin-gray border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-merlin-green appearance-none font-medium"
                    >
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {isEn ? option.en : option.fr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{isEn ? 'Your message' : 'Votre Message'}</label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleFieldChange}
                    rows={5}
                    className="w-full bg-merlin-gray border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-merlin-green resize-none"
                    placeholder={isEn ? 'Describe your needs here...' : 'Détaillez votre besoin ici...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-merlin-green text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-green-500/30 hover:bg-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {status === 'sending' ? (isEn ? 'Sending...' : 'Envoi en cours...') : (
                    <>{isEn ? 'Send my request' : 'Envoyer ma demande'} <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
