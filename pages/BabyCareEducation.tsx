import React from 'react';
import { ShieldCheck, Heart, Brain, Baby, Shield, Sparkles, BookOpen, Calendar, Syringe, Scale } from 'lucide-react';

export const BabyCareEducation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Hero */}
      <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-slate-100 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-[100px] -mr-20 -mt-20 opacity-60 pointer-events-none"></div>
         <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider mb-6 border border-sky-100">
               <Baby size={14} />
               Baby Care Guide
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mb-6 leading-tight">
               Everything about <br/>caring for baby.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Evidence-based guidance for newborn care, development milestones, feeding, sleep, and keeping your little one healthy and happy.
            </p>
         </div>
      </div>

      {/* Age Navigation */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "0-3 months", active: true },
          { label: "3-6 months", active: false },
          { label: "6-9 months", active: false },
          { label: "9-12 months", active: false },
        ].map((age, i) => (
          <button 
            key={i} 
            className={`p-3 rounded-xl border text-center transition-all text-sm font-medium ${
              age.active 
                ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-sky-200'
            }`}
          >
            {age.label}
          </button>
        ))}
      </div>

      {/* Care Topics */}
      <div>
        <h2 className="text-xl font-bold font-display text-slate-900 mb-6">Care Essentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Heart, title: "Feeding Guide", desc: "Breast, bottle, and combination feeding", color: "text-sky-500", bg: "bg-sky-50" },
            { icon: Brain, title: "Development Milestones", desc: "What to expect month by month", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Calendar, title: "Sleep Training", desc: "Safe sleep practices and routines", color: "text-sky-600", bg: "bg-sky-50" },
            { icon: Shield, title: "Health & Safety", desc: "Keeping baby healthy and safe", color: "text-blue-600", bg: "bg-blue-50" },
          ].map((topic, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all cursor-pointer group flex gap-4">
              <div className={`w-12 h-12 rounded-xl ${topic.bg} ${topic.color} flex items-center justify-center shrink-0`}>
                <topic.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">{topic.title}</h3>
                <p className="text-sm text-slate-500">{topic.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vaccination Schedule */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-[2rem] p-8 border border-sky-100">
        <div className="flex items-center gap-3 mb-6">
          <Syringe size={24} className="text-sky-500" />
          <h2 className="text-xl font-bold font-display text-slate-900">Vaccination Schedule</h2>
        </div>
        <div className="space-y-3">
          {[
            { vaccine: "BCG, OPV-0, Hep B-1", timing: "At birth", status: "completed" },
            { vaccine: "OPV-1, Pentavalent-1, Rotavirus-1, PCV-1", timing: "6 weeks", status: "upcoming" },
            { vaccine: "OPV-2, Pentavalent-2, Rotavirus-2", timing: "10 weeks", status: "pending" },
            { vaccine: "OPV-3, Pentavalent-3, Rotavirus-3, PCV-2", timing: "14 weeks", status: "pending" },
          ].map((vax, i) => (
            <div key={i} className="bg-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-medium text-slate-700 block">{vax.vaccine}</span>
                <span className="text-xs text-slate-400">{vax.timing}</span>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                vax.status === 'completed' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : vax.status === 'upcoming'
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-slate-100 text-slate-500'
              }`}>
                {vax.status === 'completed' ? 'Done' : vax.status === 'upcoming' ? 'Next' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Tracking */}
      <div>
        <h2 className="text-xl font-bold font-display text-slate-900 mb-6">Growth & Development</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Scale, title: "Weight Charts", desc: "Track healthy weight gain patterns", color: "text-sky-500", bg: "bg-sky-50" },
            { icon: Brain, title: "Motor Skills", desc: "Physical development milestones", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Heart, title: "Social Skills", desc: "Emotional and social development", color: "text-sky-600", bg: "bg-sky-50" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
               <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
                 <item.icon size={24} />
               </div>
               <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
               <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
