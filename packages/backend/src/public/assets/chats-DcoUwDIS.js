import{X as a}from"./index-sJYKCaek.js";const c=()=>a.get("/chats").then(s=>s.data),n=s=>a.get(`/chats/${s}/messages`).then(t=>t.data),o=(s,t)=>a.post(`/chats/${s}/messages`,{content:t}).then(e=>e.data),g=s=>a.get(`/chats/${s}`).then(t=>t.data);export{g as a,n as b,c as f,o as s};
