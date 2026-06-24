"use client";
import { useState } from 'react';

export default function Messages() {
  const [activeChat, setActiveChat] = useState(0);

  const contacts = [
    { name: "Alex Rivera", lastMsg: "Salut, je commence le projet aujourd'hui !", time: "12:30", avatar: "11", unread: 2 },
    { name: "Sarah Chen", lastMsg: "Est-ce que le logo vous convient ?", time: "Hier", avatar: "5", unread: 0 },
    { name: "Thomas Costa", lastMsg: "J'ai besoin de vos accès API.", time: "Lun", avatar: "44", unread: 0 },
  ];

  return (
    <div className="container py-12">
      <div className="glass rounded-[2rem] overflow-hidden flex h-[70vh]">
        {/* Sidebar */}
        <div className="w-80 border-r border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-bold">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact, index) => (
              <div 
                key={index}
                className={`p-4 flex items-center gap-4 cursor-pointer transition-colors ${activeChat === index ? 'bg-white/5' : 'hover:bg-white/5'}`}
                onClick={() => setActiveChat(index)}
              >
                <div className="relative">
                  <img src={`https://i.pravatar.cc/100?img=${contact.avatar}`} alt="" className="w-12 h-12 rounded-full" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-bold truncate">{contact.name}</h3>
                    <span className="text-[10px] text-muted-foreground">{contact.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{contact.lastMsg}</p>
                </div>
                {contact.unread > 0 && (
                  <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-zinc-950/20">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={`https://i.pravatar.cc/100?img=${contacts[activeChat].avatar}`} alt="" className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-bold">{contacts[activeChat].name}</h3>
                <p className="text-[10px] text-green-500 font-medium">En ligne</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all">
                <i className="ph ph-phone"></i>
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all">
                <i className="ph ph-video-camera"></i>
              </button>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-6">
            <div className="flex justify-center">
              <span className="text-[10px] text-muted-foreground bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest font-bold">Aujourd'hui</span>
            </div>
            
            <div className="flex items-end gap-3 max-w-[70%]">
              <img src={`https://i.pravatar.cc/100?img=${contacts[activeChat].avatar}`} alt="" className="w-8 h-8 rounded-full mb-1" />
              <div className="p-4 rounded-2xl rounded-bl-none bg-zinc-800 text-sm">
                Salut ! J'ai bien reçu les fichiers. Je commence le développement du site web dès maintenant.
              </div>
            </div>

            <div className="flex flex-row-reverse items-end gap-3 max-w-[70%] self-end">
              <div className="p-4 rounded-2xl rounded-br-none bg-indigo-600 text-sm">
                Super, merci beaucoup Alex ! N'hésite pas si tu as des questions sur les maquettes.
              </div>
            </div>

            <div className="flex items-end gap-3 max-w-[70%]">
              <img src={`https://i.pravatar.cc/100?img=${contacts[activeChat].avatar}`} alt="" className="w-8 h-8 rounded-full mb-1" />
              <div className="p-4 rounded-2xl rounded-bl-none bg-zinc-800 text-sm">
                Entendu. Je t'envoie une première version demain soir.
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-white/5">
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition-all text-xl">
                <i className="ph ph-plus"></i>
              </button>
              <div className="flex-1 relative">
                <input type="text" className="form-input py-3 pr-12" placeholder="Écrivez votre message..." />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-500 text-xl">
                  <i className="ph ph-paper-plane-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
