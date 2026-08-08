'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { profile, skills } from '@/lib/profileData';
import { skillIcons } from '@/lib/skillIcons';

export default function SkillsEducation() {
  return (
    <section id="skills" className="w-full max-w-[1450px] mx-auto px-8 md:px-12 lg:px-20 py-24 text-white">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-white/45 mb-3">SKILLS</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tools I use to build.</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.04 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/75"
              >
                {(() => {
                  const Icon = skillIcons[skill as keyof typeof skillIcons];
                  return <Icon className="text-white/70" />;
                })()}
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="education"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-white/45 mb-3">EDUCATION</p>
          <GraduationCap className="text-white/70 mb-6" size={30} />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{profile.degree}</h2>
          <p className="text-white/65 leading-relaxed">{profile.college}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/50">
            <span>Expected graduation: {profile.graduation}</span>
            <span className="flex items-center gap-1"><MapPin size={14} />{profile.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
