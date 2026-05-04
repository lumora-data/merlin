"use client";

import { motion } from 'motion/react';
import type { FormEvent } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Building2 } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Merci pour votre message ! Notre équipe vous contactera sous peu.');
  };

  return (
    <div id="contact-page" className="pt-24 min-h-screen pb-24 overflow-x-hidden">
      <section className="bg-industrial py-24 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand/10 blur-[120px] -mb-48 -mr-48" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-4 md:mb-6 block text-center md:text-left"
            >
              DISCUTONS DE VOTRE PROJET
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-8xl font-display font-bold text-white mb-6 md:mb-8 uppercase leading-tight text-center md:text-left"
            >
              Contactez <span className="text-brand">Nous</span>
            </motion.h1>
            <p className="text-lg md:text-xl text-slate-muted font-light leading-relaxed text-center md:text-left">
              Une question ? Un devis ? Notre équipe à Kribi est prête à mobiliser son expertise pour la réussite de vos projets.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-16 md:-mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bento-card p-8 md:p-10 border-l-4 border-l-brand">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-brand/5 text-brand flex items-center justify-center rounded-xl md:rounded-2xl mb-6 md:mb-8 border border-brand/10">
                <Phone size={24} />
              </div>
              <h3 className="font-display font-bold text-industrial text-lg md:text-xl uppercase mb-4 md:mb-6 tracking-widest leading-tight">Lignes Directes</h3>
              <div className="space-y-4 text-slate-muted font-medium">
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent uppercase tracking-widest mb-1">Mobile & WhatsApp</span>
                  <p className="text-industrial">+237 694 42 59 70</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent uppercase tracking-widest mb-1">Fixes</span>
                  <p className="text-industrial">+237 222 462 523</p>
                  <p className="text-industrial">+237 222 462 563</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bento-card p-8 md:p-10 border-l-4 border-l-accent"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/5 text-accent flex items-center justify-center rounded-xl md:rounded-2xl mb-6 md:mb-8 border border-accent/10">
                <Mail size={24} />
              </div>
              <h3 className="font-display font-bold text-industrial text-lg md:text-xl uppercase mb-4 md:mb-6 tracking-widest leading-tight">Communication</h3>
              <div className="text-industrial font-medium">
                <p className="text-sm md:text-base break-all">merlincameroun@gmail.com</p>
                <p className="text-[10px] md:text-xs text-slate-muted mt-2 font-light uppercase tracking-widest">Réponse moyenne sous 24h</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bento-card p-8 md:p-10 bg-industrial text-white"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 text-brand flex items-center justify-center rounded-xl md:rounded-2xl mb-6 md:mb-8">
                <MapPin size={24} />
              </div>
              <h3 className="font-display font-bold text-white text-lg md:text-xl uppercase mb-4 md:mb-6 tracking-widest leading-tight">Localisation</h3>
              <div className="text-white/60 font-light leading-relaxed text-sm md:text-base">
                <p className="text-white font-medium">Kribi, Cameroun</p>
                <p className="mt-2">Base Portuaire & Logistique</p>
                <p className="mt-1">Zone Industrielle</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] md:rounded-[2.5rem] border border-gray-100"
            >
              <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-12">
                <div className="w-1.5 md:w-2 h-10 md:h-12 bg-brand rounded-full" />
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold uppercase text-industrial leading-tight">Nouveau Projet</h2>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-muted">Nom Complet</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-paper border border-gray-100 focus:border-brand py-4 px-6 rounded-2xl outline-none transition-all placeholder:text-gray-300"
                    placeholder="Ex: Jean Paul"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-muted">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full bg-paper border border-gray-100 focus:border-brand py-4 px-6 rounded-2xl outline-none transition-all placeholder:text-gray-300"
                    placeholder="+237 6XX XX XX XX"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-muted">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-paper border border-gray-100 focus:border-brand py-4 px-6 rounded-2xl outline-none transition-all placeholder:text-gray-300"
                    placeholder="votre@email.com"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="service" className="text-xs font-bold uppercase tracking-widest text-slate-muted">Service souhaité</label>
                  <div className="relative">
                    <select id="service" className="w-full bg-paper border border-gray-100 focus:border-brand py-4 px-6 rounded-2xl outline-none transition-all appearance-none cursor-pointer">
                      <option>Construction</option>
                      <option>Logistique & Transport</option>
                      <option>Commerce Général</option>
                      <option>Négoce</option>
                      <option>Autre demande</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                      <Send size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-3">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-muted">Votre Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full bg-paper border border-gray-100 focus:border-brand py-4 px-6 rounded-2xl outline-none transition-all resize-none placeholder:text-gray-300"
                    placeholder="Détaillez vos besoins techniques ou logistiques..."
                  />
                </div>

                <div className="col-span-1 md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-brand text-white py-5 md:py-6 rounded-2xl font-display font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm flex items-center justify-center gap-3 md:gap-4 hover:bg-industrial transition-all shadow-xl active:scale-[0.98]"
                  >
                    Lancer l'Étude de Projet
                    <Send size={18} className="rotate-0 md:-rotate-45" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
          <Clock className="text-brand shrink-0" size={32} />
          <div>
            <h4 className="font-display font-bold uppercase mb-2 text-industrial">Disponibilité</h4>
            <p className="text-gray-500 text-xs md:text-sm">
              Lundi - Vendredi: 08:30 - 18:00
              <br />
              Samedi: Sur rendez-vous
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
          <Building2 className="text-brand shrink-0" size={32} />
          <div>
            <h4 className="font-display font-bold uppercase mb-2 text-industrial">Polyvalence</h4>
            <p className="text-gray-500 text-xs md:text-sm">Un seul partenaire pour vos travaux, transports et fournitures au Cameroun.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
          <MessageCircle className="text-brand shrink-0" size={32} />
          <div>
            <h4 className="font-display font-bold uppercase mb-2 text-industrial">WhatsApp Rapide</h4>
            <p className="text-gray-500 text-xs md:text-sm">Notre équipe répond rapidement à vos messages sur WhatsApp pour toute urgence chantier.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
