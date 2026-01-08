import React from 'react';
import { ShieldCheck, Clock, Brain, Baby, Shield, Heart, Calendar, BookOpen } from 'lucide-react';

export const PregnancyEducation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Hero */}
      <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-slate-100 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-[100px] -mr-20 -mt-20 opacity-60 pointer-events-none"></div>
         <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-6 border border-rose-100">
               <Heart size={14} />
               Pregnancy Library
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mb-6 leading-tight">
               Your pregnancy <br/>knowledge hub.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Expert-curated content to guide you through each trimester. From fetal development to labor preparation, find trusted information here.
            </p>
         </div>
      </div>

      {/* Trimester Navigation */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "First Trimester", weeks: "Weeks 1-12", active: false },
          { label: "Second Trimester", weeks: "Weeks 13-26", active: true },
          { label: "Third Trimester", weeks: "Weeks 27-40", active: false },
        ].map((trim, i) => (
          <button 
            key={i} 
            className={`p-4 rounded-2xl border text-center transition-all ${
              trim.active 
                ? 'bg-rose-50 border-rose-200 shadow-sm' 
                : 'bg-white border-slate-100 hover:border-rose-200'
            }`}
          >
            <span className={`font-bold block ${trim.active ? 'text-rose-700' : 'text-slate-700'}`}>
              {trim.label}
            </span>
            <span className="text-xs text-slate-400">{trim.weeks}</span>
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div>
        <h2 className="text-xl font-bold font-display text-slate-900 mb-6">Featured Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Brain, title: "Fetal Development", desc: "Week-by-week growth milestones", color: "text-rose-500", bg: "bg-rose-50" },
            { icon: Heart, title: "Your Changing Body", desc: "Physical and emotional changes", color: "text-pink-500", bg: "bg-pink-50" },
            { icon: Shield, title: "Prenatal Tests", desc: "Understanding screenings and results", color: "text-rose-600", bg: "bg-rose-50" },
            { icon: Calendar, title: "Birth Preparation", desc: "Labor, delivery, and birth plans", color: "text-rose-500", bg: "bg-rose-50" },
          ].map((topic, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-rose-200 hover:shadow-md transition-all cursor-pointer group flex gap-4">
              <div className={`w-12 h-12 rounded-xl ${topic.bg} ${topic.color} flex items-center justify-center shrink-0`}>
                <topic.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-rose-600 transition-colors">{topic.title}</h3>
                <p className="text-sm text-slate-500">{topic.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Questions */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-[2rem] p-8 border border-rose-100">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={24} className="text-rose-500" />
          <h2 className="text-xl font-bold font-display text-slate-900">Common Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            "Is it safe to exercise during pregnancy?",
            "What foods should I avoid?",
            "When should I feel the baby move?",
            "How do I know if contractions are real?",
          ].map((q, i) => (
            <div key={i} className="bg-white p-4 rounded-xl hover:shadow-md transition-all cursor-pointer">
              <span className="font-medium text-slate-700">{q}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
