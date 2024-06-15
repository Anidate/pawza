import{a9 as V,p as W,aa as D,_ as a,h as N,ab as U,ac as z,H as j,r as q,j as H,q as I,s as B,v as J,w as K,D as Q,E as X}from"./index-DLdJFUOh.js";const Y=["ownerState"],Z=["variants"],ee=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function te(e){return Object.keys(e).length===0}function se(e){return typeof e=="string"&&e.charCodeAt(0)>96}function O(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const oe=N(),re=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function k({defaultTheme:e,theme:o,themeId:s}){return te(o)?e:o[s]||o}function ne(e){return e?(o,s)=>s[e]:null}function w(e,o){let{ownerState:s}=o,d=W(o,Y);const u=typeof e=="function"?e(a({ownerState:s},d)):e;if(Array.isArray(u))return u.flatMap(f=>w(f,a({ownerState:s},d)));if(u&&typeof u=="object"&&Array.isArray(u.variants)){const{variants:f=[]}=u;let r=W(u,Z);return f.forEach(n=>{let i=!0;typeof n.props=="function"?i=n.props(a({ownerState:s},d,s)):Object.keys(n.props).forEach(c=>{(s==null?void 0:s[c])!==n.props[c]&&d[c]!==n.props[c]&&(i=!1)}),i&&(Array.isArray(r)||(r=[r]),r.push(typeof n.style=="function"?n.style(a({ownerState:s},d,s)):n.style))}),r}return u}function ie(e={}){const{themeId:o,defaultTheme:s=oe,rootShouldForwardProp:d=O,slotShouldForwardProp:u=O}=e,f=t=>U(a({},t,{theme:k(a({},t,{defaultTheme:s,themeId:o}))}));return f.__mui_systemSx=!0,(t,r={})=>{V(t,l=>l.filter(m=>!(m!=null&&m.__mui_systemSx)));const{name:n,slot:i,skipVariantsResolver:c,skipSx:x,overridesResolver:y=ne(re(i))}=r,g=W(r,ee),_=c!==void 0?c:i&&i!=="Root"&&i!=="root"||!1,$=x||!1;let C,v=O;i==="Root"||i==="root"?v=d:i?v=u:se(t)&&(v=void 0);const P=D(t,a({shouldForwardProp:v,label:C},g)),G=l=>typeof l=="function"&&l.__emotion_real!==l||z(l)?m=>w(l,a({},m,{theme:k({theme:m.theme,defaultTheme:s,themeId:o})})):l,A=(l,...m)=>{let T=G(l);const S=m?m.map(G):[];n&&y&&S.push(h=>{const p=k(a({},h,{defaultTheme:s,themeId:o}));if(!p.components||!p.components[n]||!p.components[n].styleOverrides)return null;const b=p.components[n].styleOverrides,R={};return Object.entries(b).forEach(([E,L])=>{R[E]=w(L,a({},h,{theme:p}))}),y(h,R)}),n&&!_&&S.push(h=>{var p;const b=k(a({},h,{defaultTheme:s,themeId:o})),R=b==null||(p=b.components)==null||(p=p[n])==null?void 0:p.variants;return w({variants:R},a({},h,{theme:b}))}),$||S.push(f);const F=S.length-m.length;if(Array.isArray(l)&&F>0){const h=new Array(F).fill("");T=[...l,...h],T.raw=[...l.raw,...h]}const M=P(T,...S);return t.muiName&&(M.muiName=t.muiName),M};return P.withConfig&&(A.withConfig=P.withConfig),A}}const ae=ie(),ue=["className","component","disableGutters","fixed","maxWidth","classes"],le=N(),ce=ae("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[o.root,o[`maxWidth${j(String(s.maxWidth))}`],s.fixed&&o.fixed,s.disableGutters&&o.disableGutters]}}),de=e=>B({props:e,name:"MuiContainer",defaultTheme:le}),pe=(e,o)=>{const s=n=>K(o,n),{classes:d,fixed:u,disableGutters:f,maxWidth:t}=e,r={root:["root",t&&`maxWidth${j(String(t))}`,u&&"fixed",f&&"disableGutters"]};return J(r,s,d)};function fe(e={}){const{createStyledComponent:o=ce,useThemeProps:s=de,componentName:d="MuiContainer"}=e,u=o(({theme:t,ownerState:r})=>a({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!r.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}}),({theme:t,ownerState:r})=>r.fixed&&Object.keys(t.breakpoints.values).reduce((n,i)=>{const c=i,x=t.breakpoints.values[c];return x!==0&&(n[t.breakpoints.up(c)]={maxWidth:`${x}${t.breakpoints.unit}`}),n},{}),({theme:t,ownerState:r})=>a({},r.maxWidth==="xs"&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},r.maxWidth&&r.maxWidth!=="xs"&&{[t.breakpoints.up(r.maxWidth)]:{maxWidth:`${t.breakpoints.values[r.maxWidth]}${t.breakpoints.unit}`}}));return q.forwardRef(function(r,n){const i=s(r),{className:c,component:x="div",disableGutters:y=!1,fixed:g=!1,maxWidth:_="lg"}=i,$=W(i,ue),C=a({},i,{component:x,disableGutters:y,fixed:g,maxWidth:_}),v=pe(C,d);return H.jsx(u,a({as:x,ownerState:C,className:I(v.root,c),ref:n},$))})}const me=fe({createStyledComponent:Q("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:s}=e;return[o.root,o[`maxWidth${j(String(s.maxWidth))}`],s.fixed&&o.fixed,s.disableGutters&&o.disableGutters]}}),useThemeProps:e=>X({props:e,name:"MuiContainer"})}),xe=me;export{xe as C,ae as s};
