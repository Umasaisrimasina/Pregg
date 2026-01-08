import React from 'react';
import { ShieldCheck, Heart, Brain, Baby, Shield, Sparkles, BookOpen, AlertCircle, Phone } from 'lucide-react';

export const PostPartumEducation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Hero */}
      <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-slate-100 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-[100px] -mr-20 -mt-20 opacity-60 pointer-events-none"></div>
         <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6 border border-purple-100">
               <Sparkles size={14} />
               Recovery Resources
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mb-6 leading-tight">
               Your postpartum <br/>recovery guide.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              The fourth trimester is just as important. Expert guidance on physical recovery, mental health, and bonding with your newborn.
            </p>
         </div>
      </div>

      {/* Mental Health Alert */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[2rem] p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Heart size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold font-display mb-2">Your Mental Health Matters</h3>
            <p className="text-purple-100 text-sm leading-relaxed">
              Postpartum depression affects 1 in 7 mothers. If you're feeling overwhelmed, sad, or anxious, you're not alone and help is available.
            </p>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-50 transition-colors flex items-center gap-2">
            <Phone size={16} /> Get Support
          </button>
        </div>
      </div>

      {/* Recovery Topics */}
      <div>
        <h2 className="text-xl font-bold font-display text-slate-900 mb-6">Recovery Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Heart, title: "Physical Recovery", desc: "Healing timelines and self-care", color: "text-purple-500", bg: "bg-purple-50" },
            { icon: Brain, title: "Mental Wellness", desc: "Understanding baby blues vs PPD", color: "text-indigo-500", bg: "bg-indigo-50" },
            { icon: Baby, title: "Newborn Bonding", desc: "Building attachment with your baby", color: "text-purple-600", bg: "bg-purple-50" },
            { icon: Shield, title: "Pelvic Floor Health", desc: "Exercises and recovery tips", color: "text-indigo-600", bg: "bg-indigo-50" },
          ].map((topic, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all cursor-pointer group flex gap-4">
              <div className={`w-12 h-12 rounded-xl ${topic.bg} ${topic.color} flex items-center justify-center shrink-0`}>
                <topic.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">{topic.title}</h3>
                <p className="text-sm text-slate-500">{topic.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[2rem] p-8 border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle size={24} className="text-purple-500" />
          <h2 className="text-xl font-bold font-display text-slate-900">When to Seek Help</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Feeling hopeless or worthless",
            "Difficulty bonding with baby",
            "Severe mood swings",
            "Thoughts of harming yourself or baby",
            "Unable to sleep even when baby sleeps",
            "Loss of interest in activities",
          ].map((sign, i) => (
            <div key={i} className="bg-white p-4 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm text-slate-700">{sign}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-white rounded-xl p-4 border border-purple-200">
          <p className="text-sm text-purple-800 font-medium">
            <strong>Crisis Helplines:</strong> iCall: 9152987821 • Vandrevala Foundation: 1860-2662-345
          </p>
        </div>
      </div>

      {/* Breastfeeding Section */}
      <div>
        <h2 className="text-xl font-bold font-display text-slate-900 mb-6">Breastfeeding Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Latching Guide", desc: "Proper techniques for comfortable feeding" },
            { title: "Common Challenges", desc: "Solutions for engorgement, mastitis & more" },
            { title: "Pumping Tips", desc: "Building and storing your milk supply" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
               <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
               <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
