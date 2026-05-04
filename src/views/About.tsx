"use client";

import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, Users, Zap, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  const values = [
    { icon: <ShieldCheck size={32} />, title: 'Intégrité', desc: 'La transparence totale dans chaque transaction et chaque phase de chantier.' },
    { icon: <Zap size={32} />, title: 'Réactivité', desc: "Une capacité d'action immédiate pour répondre aux imprévus du terrain." },
    { icon: <Users size={32} />, title: 'Proximité', desc: 'Basés à Kribi, nous sommes au cœur des réalités et des besoins locaux.' },
    { icon: <Target size={32} />, title: 'Précision', desc: 'Le souci du détail technique pour des ouvrages durables et esthétiques.' },
    { icon: <Award size={32} />, title: 'Excellence', desc: 'Nous visons le plus haut standard de qualité pour chaque service rendu.' },
  ];

  return (
    <div id="about-page" className="pt-32 bg-white min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-[1] noise-overlay" />

      <section className="px-6 py-10 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full industrial-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-4 md:mb-6 block text-center md:text-left">NOTRE HISTOIRE</span>
            <h1 className="text-4xl md:text-8xl font-display font-bold text-industrial mb-6 md:mb-10 uppercase text-center md:text-left leading-tight">
              L'Ambition <span className="text-brand">Camerounaise</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-muted font-light leading-relaxed text-center md:text-left">
              MERLIN Cameroun est née d'une vision simple : offrir à Kribi et ses environs une structure multi-services capable d'allier la rigueur technique du bâtiment à l'agilité du commerce moderne.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 bg-industrial text-white relative">
        <div className="absolute top-0 left-0 w-full h-full industrial-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 bg-accent/20 text-accent flex items-center justify-center rounded-2xl mb-8 md:mb-10 border border-accent/20 mx-auto md:mx-0">
              <Target size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 md:mb-8 uppercase tracking-tight text-center md:text-left">Notre Mission</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-light mb-6 text-center md:text-left">
              Simplifier la vie de nos clients en devenant leur point de contact unique pour leurs besoins complexes. Qu'il s'agisse de construire une résidence, d'acheminer des marchandises ou de sourcer des équipements spécifiques, nous sommes le maillon fort de la chaîne.
            </p>
            <div className="h-1 w-12 bg-accent mx-auto md:mx-0" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 bg-brand/20 text-brand flex items-center justify-center rounded-2xl mb-8 md:mb-10 border border-brand/20 mx-auto md:mx-0">
              <Eye size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 md:mb-8 uppercase tracking-tight text-center md:text-left">Notre Vision</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-light mb-6 text-center md:text-left">
              Devenir l'entreprise de référence à Kribi, synonyme de fiabilité et d'efficacité. Nous voulons accompagner la croissance économique de la région en apportant des services modernes qui respectent les exigences de nos partenaires nationaux et internationaux.
            </p>
            <div className="h-1 w-12 bg-brand mx-auto md:mx-0" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-display font-bold text-industrial uppercase mb-4 md:mb-6">Nos Piliers</h2>
            <p className="text-slate-muted max-w-xl mx-auto text-sm md:text-base px-4">Ces valeurs guident chaque décision et chaque interaction chez MERLIN Cameroun.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-paper p-8 md:p-10 flex flex-col items-center text-center rounded-[2rem] border border-gray-50 shadow-sm transition-all hover:shadow-xl hover:bg-white group"
              >
                <div className="text-accent mb-6 md:mb-8 group-hover:scale-110 transition-transform group-hover:text-brand">{v.icon}</div>
                <h4 className="font-display font-bold uppercase mb-3 md:mb-4 text-industrial text-lg md:text-xl tracking-tight">{v.title}</h4>
                <p className="text-xs md:text-sm text-slate-muted leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto bg-paper p-8 md:p-24 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          <div className="absolute top-0 right-0 w-full h-full industrial-grid opacity-[0.03] pointer-events-none" />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-industrial mb-6 md:mb-10 leading-tight">
              À PROPOS DE NOTRE <span className="text-accent italic">DIRECTEUR</span>
            </h2>
            <p className="text-base md:text-lg text-slate-muted leading-relaxed font-light mb-6">
              Fondée par un entrepreneur passionné par le développement local et la rigueur organisationnelle, MERLIN Cameroun s'appuie sur une équipe pluridisciplinaire d'experts du terrain.
            </p>
            <p className="text-base md:text-lg text-slate-muted leading-relaxed font-light">
              Chaque pôle, Construction, Transport ou Commerce, est supervisé avec la même exigence de résultat et le même respect des délais contractuels.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center gap-2 text-brand font-display font-bold uppercase text-xs md:text-sm tracking-widest hover:gap-4 transition-all">
                Démarrer un projet <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <motion.div
              initial={{ rotate: -5, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="w-full max-w-xs md:max-w-sm aspect-[4/5] bg-industrial rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative"
            >
              <div className="absolute inset-4 border-2 border-white/10 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center p-6 md:p-10 text-center">
                <p className="text-accent font-mono text-[9px] md:text-[10px] uppercase tracking-widest mb-4 md:mb-6">Engagement</p>
                <p className="text-white text-lg md:text-xl font-display font-bold leading-relaxed px-4">
                  "La confiance n'est pas un concept, c'est le résultat d'un travail bien fait."
                </p>
                <div className="mt-8 md:mt-10 h-0.5 w-8 md:w-10 bg-brand" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
