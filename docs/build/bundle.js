!function(){"use strict";function e(){}function n(e,n){for(const t in n)e[t]=n[t];return e}function t(e){return e()}function a(){return Object.create(null)}function r(e){e.forEach(t)}function c(e){return"function"==typeof e}function i(e,n){return e!=e?n==n:e!==n||e&&"object"==typeof e||"function"==typeof e}function o(e,n){const t=e.subscribe(n);return t.unsubscribe?()=>t.unsubscribe():t}function l(e){return null==e?"":e}function s(e,n){e.appendChild(n)}function u(e,n,t){e.insertBefore(n,t||null)}function h(e){e.parentNode.removeChild(e)}function g(e,n){for(let t=0;t<e.length;t+=1)e[t]&&e[t].d(n)}function d(e){return document.createElement(e)}function f(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function p(e){return document.createTextNode(e)}function m(){return p(" ")}function M(e,n,t,a){return e.addEventListener(n,t,a),()=>e.removeEventListener(n,t,a)}function v(e,n,t){null==t?e.removeAttribute(n):e.getAttribute(n)!==t&&e.setAttribute(n,t)}function T(e,n){n=""+n,e.data!==n&&(e.data=n)}function A(e,n,t,a){e.style.setProperty(n,t,a?"important":"")}let y;function $(e){y=e}function x(){if(!y)throw new Error("Function called outside component initialization");return y}const b=[],w=[],k=[],j=[],I=Promise.resolve();let S=!1;function _(e){k.push(e)}function C(){const e=new Set;do{for(;b.length;){const e=b.shift();$(e),q(e.$$)}for(;w.length;)w.pop()();for(let n=0;n<k.length;n+=1){const t=k[n];e.has(t)||(t(),e.add(t))}k.length=0}while(b.length);for(;j.length;)j.pop()();S=!1}function q(e){null!==e.fragment&&(e.update(),r(e.before_update),e.fragment&&e.fragment.p(e.ctx,e.dirty),e.dirty=[-1],e.after_update.forEach(_))}const E=new Set;let H;function z(){H={r:0,c:[],p:H}}function N(){H.r||r(H.c),H=H.p}function P(e,n){e&&e.i&&(E.delete(e),e.i(n))}function L(e,n,t,a){if(e&&e.o){if(E.has(e))return;E.add(e),H.c.push(()=>{E.delete(e),a&&(t&&e.d(1),a())}),e.o(n)}}function B(e){e&&e.c()}function R(e,n,a){const{fragment:i,on_mount:o,on_destroy:l,after_update:s}=e.$$;i&&i.m(n,a),_(()=>{const n=o.map(t).filter(c);l?l.push(...n):r(n),e.$$.on_mount=[]}),s.forEach(_)}function F(e,n){const t=e.$$;null!==t.fragment&&(r(t.on_destroy),t.fragment&&t.fragment.d(n),t.on_destroy=t.fragment=null,t.ctx=[])}function O(e,n){-1===e.$$.dirty[0]&&(b.push(e),S||(S=!0,I.then(C)),e.$$.dirty.fill(0)),e.$$.dirty[n/31|0]|=1<<n%31}function D(n,t,c,i,o,l,s=[-1]){const u=y;$(n);const h=t.props||{},g=n.$$={fragment:null,ctx:null,props:l,update:e,not_equal:o,bound:a(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:a(),dirty:s};let d=!1;g.ctx=c?c(n,h,(e,t,a=t)=>(g.ctx&&o(g.ctx[e],g.ctx[e]=a)&&(g.bound[e]&&g.bound[e](a),d&&O(n,e)),t)):[],g.update(),d=!0,r(g.before_update),g.fragment=!!i&&i(g.ctx),t.target&&(t.hydrate?g.fragment&&g.fragment.l(function(e){return Array.from(e.childNodes)}(t.target)):g.fragment&&g.fragment.c(),t.intro&&P(n.$$.fragment),R(n,t.target,t.anchor),C()),$(u)}class Q{$destroy(){F(this,1),this.$destroy=e}$on(e,n){const t=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return t.push(n),()=>{const e=t.indexOf(n);-1!==e&&t.splice(e,1)}}$set(){}}function J(e){var n=e&&e.options[e.selectedIndex];n&&(e.style.width=function(e,n){var t,a=document,r=a.body,c=e.cloneNode(),i=a.createElement("option");return i.text=n,c.add(i,null),c.style.opacity=0,c.style.width="auto",r.appendChild(c),t=c.scrollWidth,r.removeChild(c),t}(e,n.innerText)+"px")}function W(e,n,t){const a=e.slice();return a[11]=n[t],a[13]=t,a}function G(e){let n,t,a,r=e[11]+"";return{c(){n=d("option"),t=p(r),n.__value=a=e[13]+1,n.value=n.__value},m(e,a){u(e,n,a),s(n,t)},p(e,n){8&n[0]&&r!==(r=e[11]+"")&&T(t,r)},d(e){e&&h(n)}}}function K(n){let t,a,c,i,o,l,f,p,T,A,y,$,x,b,w=n[3].pagingMeta,k=[];for(let e=0;e<w.length;e+=1)k[e]=G(W(n,w,e));return{c(){t=d("nav"),a=d("button"),a.innerHTML='<svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true" class="svelte-1lfsvku"><path d="M10,0l2,2l-8,8l8,8l-2,2L0,10L10,0z" fill="#0151a9" class="svelte-1lfsvku"></path></svg> \n        <span class="svelte-1lfsvku"> Next</span>',c=m(),i=d("div"),o=d("select"),l=d("option"),l.textContent="Page",f=d("option"),f.textContent="Sura",T=m(),A=d("select");for(let e=0;e<k.length;e+=1)k[e].c();$=m(),x=d("button"),x.innerHTML='<span class="svelte-1lfsvku">Previous </span> \n        <svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true" class="svelte-1lfsvku"><path d="M 2,0 0,2 8,10 0,18 2,20 12,10 2,0 Z" fill="#0151a9" class="svelte-1lfsvku"></path></svg>',v(a,"type","button"),v(a,"class","svelte-1lfsvku"),l.__value="page",l.value=l.__value,f.__value="sura",f.value=f.__value,v(o,"aria-label","Select paging type"),v(o,"class","svelte-1lfsvku"),v(A,"aria-label","Select page"),v(A,"class","svelte-1lfsvku"),v(x,"type","button"),v(x,"class","svelte-1lfsvku"),v(t,"class","svelte-1lfsvku"),b=[M(a,"click",n[4]),M(o,"change",n[7]),M(A,"change",n[6]),M(x,"click",n[5])]},m(e,r){u(e,t,r),s(t,a),s(t,c),s(t,i),s(i,o),s(o,l),s(o,f),p=n[3].pagingType;for(var h=0;h<o.options.length;h+=1){var g=o.options[h];if(g.__value===p){g.selected=!0;break}}n[9](o),s(i,T),s(i,A);for(let e=0;e<k.length;e+=1)k[e].m(A,null);y=n[3].pagingIndex;for(var d=0;d<A.options.length;d+=1){var m=A.options[d];if(m.__value===y){m.selected=!0;break}}n[10](A),s(t,$),s(t,x)},p(e,n){if(8&n[0]&&p!==(p=e[3].pagingType))for(var t=0;t<o.options.length;t+=1){var a=o.options[t];if(a.__value===p){a.selected=!0;break}}if(8&n[0]){let t;for(w=e[3].pagingMeta,t=0;t<w.length;t+=1){const a=W(e,w,t);k[t]?k[t].p(a,n):(k[t]=G(a),k[t].c(),k[t].m(A,null))}for(;t<k.length;t+=1)k[t].d(1);k.length=w.length}if(8&n[0]&&y!==(y=e[3].pagingIndex))for(var r=0;r<A.options.length;r+=1){var c=A.options[r];if(c.__value===y){c.selected=!0;break}}},i:e,o:e,d(e){e&&h(t),n[9](null),g(k,e),n[10](null),r(b)}}}function Y(n,t,a){let r,c=e,i=()=>(c(),c=o(u,e=>a(3,r=e)),u);n.$$.on_destroy.push(()=>c());let l,s,{store:u}=t;function h(){J(l),J(s)}var g;return i(),g=h,x().$$.on_mount.push(g),function(e){x().$$.after_update.push(e)}(h),n.$set=e=>{"store"in e&&i(a(0,u=e.store))},[u,l,s,r,function(){const{pagingIndex:e,pagingTotal:n}=r;u.gotoPage({pagingIndex:(e+1)%n||1})},function(){const{pagingIndex:e,pagingTotal:n}=r;u.gotoPage({pagingIndex:(n+e-1)%n||n-1})},function(e){u.gotoPage({pagingIndex:parseInt(e.target.value,10)}),J(e.target)},function(e){u.gotoPage({pagingType:e.target.value}),J(e.target)},h,function(e){w[e?"unshift":"push"](()=>{a(1,l=e)})},function(e){w[e?"unshift":"push"](()=>{a(2,s=e)})}]}class Z extends Q{constructor(e){super(),D(this,e,Y,K,i,{store:0})}}function V(e){return String(e).split(",").map((function(e){return String.fromCharCode(e)})).join("")}const U="1576,1616,1587,1618,1605,1616,32,1649,1604,1604,1617,1614,1607,1616,32,1649,1604,1585,1617,1614,1581,1618,1605,1614,1648,1606,1616,32,1649,1604,1585,1617,1614,1581,1616,1610,1605,1616",X=new RegExp(U,"g");function ee(e){const n=function(e){return String(e).split("").map((function(e){return e.charCodeAt()})).join(",")}(e).replace(X,"");return 0===n.length?"":V(n)}V("1576,1616,1587,1618,1605,1616,32,1575,1604,1604,1617,1614,1607,1616,32,1575,1604,1585,1617,1614,1581,1618,1605,1614,1606,1616,32,1575,1604,1585,1617,1614,1581,1616,1610,1605,1616");const ne=V(U);function te(n){let t,a,r,c,i,o,l,g="Ruku "+n[2];return{c(){t=f("svg"),a=f("title"),r=p(g),c=f("path"),i=f("text"),o=p(n[2]),v(c,"fill","#18582d"),v(c,"d","M1002.612 1402.795L752.454 1567.92q-205.664 0-318.384-16.81-194.788-28.673-300.586-114.696Q0 1328.638 0 1126.929q0-122.608 37.573-220.496 30.652-80.09 88-151.282 27.686-33.618 96.9-101.843-94.922-47.46-131.506-82.068-81.08-76.135-81.08-192.81 0-104.81 88.001-205.664Q198.743 57.08 342.114 57.08q64.27 0 136.45 37.573 48.45 24.72 121.62 82.068-96.9 0-198.744 12.854-131.506 16.81-212.585 48.45-98.877 38.562-98.877 94.922 0 60.315 113.709 114.697 95.91 45.483 217.529 64.27 98.877-53.393 192.81-90.967 104.81-41.528 217.53-69.214l-41.53 154.248q-205.663 80.09-296.63 122.608-183.911 87.012-281.8 177.978-125.573 116.675-125.573 250.16 0 139.416 104.81 219.506 90.966 69.214 267.956 97.888 140.405 22.742 357.935 22.742 46.472 0 92.944-.989l92.944-1.978v8.9z"),v(i,"text-anchor","start"),v(i,"x","1100"),A(i,"font-size","38rem"),A(i,"font-family","serif"),A(i,"pointer-events","none"),v(i,"y","1200"),v(t,"xmlns","http://www.w3.org/2000/svg"),v(t,"viewBox","0 0 1250 1625"),v(t,"width",n[0]),v(t,"height",n[1]),v(t,"role","img"),v(t,"aria-label",l="Ruku "+n[2])},m(e,n){u(e,t,n),s(t,a),s(a,r),s(t,c),s(t,i),s(i,o)},p(e,n){4&n[0]&&g!==(g="Ruku "+e[2])&&T(r,g),4&n[0]&&T(o,e[2]),1&n[0]&&v(t,"width",e[0]),2&n[0]&&v(t,"height",e[1]),4&n[0]&&l!==(l="Ruku "+e[2])&&v(t,"aria-label",l)},i:e,o:e,d(e){e&&h(t)}}}function ae(e,n,t){let{width:a=27}=n,{height:r=36}=n,{text:c=""}=n;return e.$set=e=>{"width"in e&&t(0,a=e.width),"height"in e&&t(1,r=e.height),"text"in e&&t(2,c=e.text)},[a,r,c]}class re extends Q{constructor(e){super(),D(this,e,ae,te,i,{width:0,height:1,text:2})}}function ce(n){let t,a,r,c;return{c(){t=f("svg"),a=f("title"),r=p("Sajda"),c=f("path"),v(a,"id",n[2]),v(c,"fill","#900"),v(c,"d","M99.229 147.305H0l20.04-22.94v-51.68L0 49.923 49.57 0 99.23 49.922l-20.04 22.764v51.68l20.04 22.939zm-6.856-97.383L49.57 6.855 6.855 49.922l18.457 20.83v55.547L11.25 142.383h76.729l-14.063-16.084V70.752l18.457-20.83zm-9.316 0l-13.184 15.03v70.839H29.355v-70.84l-13.183-15.03L49.57 16.437l33.487 33.486zm-6.416 0l-27.07-27.07-26.983 27.07 11.074 12.305v68.73h31.904v-68.73l11.075-12.305zm-7.823 0l-7.734 8.525v65.39h-22.94v-65.39l-7.734-8.525 19.16-19.6 19.248 19.6zm-4.658 0L49.57 34.98 35.068 49.922l6.504 7.119v63.105h15.996V57.041l6.592-7.12z"),v(t,"xmlns","http://www.w3.org/2000/svg"),v(t,"viewBox","0 0 99 147"),v(t,"width",n[0]),v(t,"height",n[1]),v(t,"aria-describedby",n[2])},m(e,n){u(e,t,n),s(t,a),s(a,r),s(t,c)},p(e,n){4&n[0]&&v(a,"id",e[2]),1&n[0]&&v(t,"width",e[0]),2&n[0]&&v(t,"height",e[1]),4&n[0]&&v(t,"aria-describedby",e[2])},i:e,o:e,d(e){e&&h(t)}}}function ie(e,n,t){let a,{width:r=24}=n,{height:c=36}=n;return e.$set=e=>{"width"in e&&t(0,r=e.width),"height"in e&&t(1,c=e.height)},t(2,a="sajda-"+Math.random()),[r,c,a]}class oe extends Q{constructor(e){super(),D(this,e,ie,ce,i,{width:0,height:1})}}function le(e,n,t){const a=e.slice();return a[5]=n[t],a}function se(n){let t;return{c(){t=d("div"),t.textContent=`${ne}`,v(t,"dir","rtl"),v(t,"class","bismillah svelte-vl99jt")},m(e,n){u(e,t,n)},p:e,d(e){e&&h(t)}}}function ue(e){let n;const t=new oe({});return{c(){B(t.$$.fragment)},m(e,a){R(t,e,a),n=!0},i(e){n||(P(t.$$.fragment,e),n=!0)},o(e){L(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}function he(e){let n;const t=new re({props:{text:e[5].ruku}});return{c(){B(t.$$.fragment)},m(e,a){R(t,e,a),n=!0},p(e,n){const a={};4&n[0]&&(a.text=e[5].ruku),t.$set(a)},i(e){n||(P(t.$$.fragment,e),n=!0)},o(e){L(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}function ge(e){let n,t,a,r,c,i,o,g=e[5].text+"",f=e[5].sajda&&ue(),m=e[5].ruku&&he(e);return{c(){n=d("li"),t=d("span"),a=p(g),f&&f.c(),r=p(""),m&&m.c(),v(t,"class","text svelte-vl99jt"),v(n,"id",c=`${e[5].sura}:${e[5].aya}`),v(n,"class",i=l([e[5].ruku?"ruku":"",e[5].sajda?"sajda":""].join(" "))+" svelte-vl99jt")},m(e,c){u(e,n,c),s(n,t),s(t,a),f&&f.m(n,null),s(n,r),m&&m.m(n,null),o=!0},p(e,t){(!o||4&t[0])&&g!==(g=e[5].text+"")&&T(a,g),e[5].sajda?f?P(f,1):(f=ue(),f.c(),P(f,1),f.m(n,r)):f&&(z(),L(f,1,1,()=>{f=null}),N()),e[5].ruku?m?(m.p(e,t),P(m,1)):(m=he(e),m.c(),P(m,1),m.m(n,null)):m&&(z(),L(m,1,1,()=>{m=null}),N()),(!o||4&t[0]&&c!==(c=`${e[5].sura}:${e[5].aya}`))&&v(n,"id",c),(!o||4&t[0]&&i!==(i=l([e[5].ruku?"ruku":"",e[5].sajda?"sajda":""].join(" "))+" svelte-vl99jt"))&&v(n,"class",i)},i(e){o||(P(f),P(m),o=!0)},o(e){L(f),L(m),o=!1},d(e){e&&h(n),f&&f.d(),m&&m.d()}}}function de(e){let n,t,a,r,c,i,o,f,M,A,y,$,x,b,w,k,j,I,S,_,C,q=e[1].tname+"",E=e[1].ename+"",H=e[1].type+"",B=e[4]&&se(),R=e[2],F=[];for(let n=0;n<R.length;n+=1)F[n]=ge(le(e,R,n));const O=e=>L(F[e],1,1,()=>{F[e]=null});return{c(){n=d("article"),t=d("header"),a=d("img"),i=m(),o=d("div"),f=d("span"),M=p(q),A=m(),y=d("span"),$=p(E),x=m(),b=d("span"),w=p(H),k=m(),B&&B.c(),I=m(),S=d("ol");for(let e=0;e<F.length;e+=1)F[e].c();a.src!==(r="assets/sura-title/"+e[1].position+".svg")&&v(a,"src",r),v(a,"alt",c=e[1].name),v(a,"class","sura-title svelte-vl99jt"),v(a,"loading","lazy"),v(a,"height","125"),v(f,"class","svelte-vl99jt"),v(y,"class","svelte-vl99jt"),v(b,"class","svelte-vl99jt"),v(o,"class","meta svelte-vl99jt"),v(t,"class",j=l(e[4]&&"hero")+" svelte-vl99jt"),v(S,"start",_=e[0][0].aya),v(S,"style",e[3]),v(S,"dir","rtl"),v(S,"class","svelte-vl99jt"),v(n,"class","svelte-vl99jt")},m(e,r){u(e,n,r),s(n,t),s(t,a),s(t,i),s(t,o),s(o,f),s(f,M),s(o,A),s(o,y),s(y,$),s(o,x),s(o,b),s(b,w),s(t,k),B&&B.m(t,null),s(n,I),s(n,S);for(let e=0;e<F.length;e+=1)F[e].m(S,null);C=!0},p(e,n){if((!C||2&n[0]&&a.src!==(r="assets/sura-title/"+e[1].position+".svg"))&&v(a,"src",r),(!C||2&n[0]&&c!==(c=e[1].name))&&v(a,"alt",c),(!C||2&n[0])&&q!==(q=e[1].tname+"")&&T(M,q),(!C||2&n[0])&&E!==(E=e[1].ename+"")&&T($,E),(!C||2&n[0])&&H!==(H=e[1].type+"")&&T(w,H),e[4]?B?B.p(e,n):(B=se(),B.c(),B.m(t,null)):B&&(B.d(1),B=null),(!C||16&n[0]&&j!==(j=l(e[4]&&"hero")+" svelte-vl99jt"))&&v(t,"class",j),4&n[0]){let t;for(R=e[2],t=0;t<R.length;t+=1){const a=le(e,R,t);F[t]?(F[t].p(a,n),P(F[t],1)):(F[t]=ge(a),F[t].c(),P(F[t],1),F[t].m(S,null))}for(z(),t=R.length;t<F.length;t+=1)O(t);N()}(!C||1&n[0]&&_!==(_=e[0][0].aya))&&v(S,"start",_),(!C||8&n[0])&&v(S,"style",e[3])},i(e){if(!C){for(let e=0;e<R.length;e+=1)P(F[e]);C=!0}},o(e){F=F.filter(Boolean);for(let e=0;e<F.length;e+=1)L(F[e]);C=!1},d(e){e&&h(n),B&&B.d(),g(F,e)}}}function fe(e,n,t){let a,r,c,{data:i=[]}=n,{meta:o={}}=n;return e.$set=e=>{"data"in e&&t(0,i=e.data),"meta"in e&&t(1,o=e.meta)},e.$$.update=()=>{3&e.$$.dirty[0]&&t(2,a=1===o.position?i.slice(1):i),1&e.$$.dirty[0]&&t(3,r=i.length>0?`counter-reset: section ${i[0].aya-1}`:void 0),1&e.$$.dirty[0]&&t(4,c=i.length>0&&1===i[0].aya)},[i,o,a,r,c]}class pe extends Q{constructor(e){super(),D(this,e,fe,de,i,{data:0,meta:1})}}function me(e,n,t){const a=e.slice();return a[2]=n[t],a}function Me(e){let t;const a=[e[2]];let r={};for(let e=0;e<a.length;e+=1)r=n(r,a[e]);const c=new pe({props:r});return{c(){B(c.$$.fragment)},m(e,n){R(c,e,n),t=!0},p(e,n){const t=2&n[0]?function(e,n){const t={},a={},r={$$scope:1};let c=e.length;for(;c--;){const i=e[c],o=n[c];if(o){for(const e in i)e in o||(a[e]=1);for(const e in o)r[e]||(t[e]=o[e],r[e]=1);e[c]=o}else for(const e in i)r[e]=1}for(const e in a)e in t||(t[e]=void 0);return t}(a,[(r=e[2],"object"==typeof r&&null!==r?r:{})]):{};var r;c.$set(t)},i(e){t||(P(c.$$.fragment,e),t=!0)},o(e){L(c.$$.fragment,e),t=!1},d(e){F(c,e)}}}function ve(e){let n,t;const a=new Z({props:{store:e[0]}});return{c(){n=d("footer"),B(a.$$.fragment)},m(e,r){u(e,n,r),R(a,n,null),t=!0},p(e,n){const t={};1&n[0]&&(t.store=e[0]),a.$set(t)},i(e){t||(P(a.$$.fragment,e),t=!0)},o(e){L(a.$$.fragment,e),t=!1},d(e){e&&h(n),F(a)}}}function Te(e){let n,t,a,r,c,i;const o=new Z({props:{store:e[0]}});let l=e[1].page,f=[];for(let n=0;n<l.length;n+=1)f[n]=Me(me(e,l,n));const p=e=>L(f[e],1,1,()=>{f[e]=null});let M=e[1].page.length>0&&ve(e);return{c(){n=d("section"),t=d("header"),B(o.$$.fragment),a=m(),r=d("main");for(let e=0;e<f.length;e+=1)f[e].c();c=m(),M&&M.c(),v(t,"class","topbar svelte-mnpcql"),v(r,"role","main"),v(n,"class","svelte-mnpcql")},m(e,l){u(e,n,l),s(n,t),R(o,t,null),s(n,a),s(n,r);for(let e=0;e<f.length;e+=1)f[e].m(r,null);s(n,c),M&&M.m(n,null),i=!0},p(e,t){const a={};if(1&t[0]&&(a.store=e[0]),o.$set(a),2&t[0]){let n;for(l=e[1].page,n=0;n<l.length;n+=1){const a=me(e,l,n);f[n]?(f[n].p(a,t),P(f[n],1)):(f[n]=Me(a),f[n].c(),P(f[n],1),f[n].m(r,null))}for(z(),n=l.length;n<f.length;n+=1)p(n);N()}e[1].page.length>0?M?(M.p(e,t),P(M,1)):(M=ve(e),M.c(),P(M,1),M.m(n,null)):M&&(z(),L(M,1,1,()=>{M=null}),N())},i(e){if(!i){P(o.$$.fragment,e);for(let e=0;e<l.length;e+=1)P(f[e]);P(M),i=!0}},o(e){L(o.$$.fragment,e),f=f.filter(Boolean);for(let e=0;e<f.length;e+=1)L(f[e]);L(M),i=!1},d(e){e&&h(n),F(o),g(f,e),M&&M.d()}}}function Ae(n,t,a){let r,c=e,i=()=>(c(),c=o(l,e=>a(1,r=e)),l);n.$$.on_destroy.push(()=>c());let{store:l}=t;return i(),n.$set=e=>{"store"in e&&i(a(0,l=e.store))},[l,r]}const ye=[];const $e="page",xe="sura",be=[[],[0,7,5,1,"الفاتحة","Al-Faatiha","The Opening","Meccan"],[7,286,87,40,"البقرة","Al-Baqara","The Cow","Medinan"],[293,200,89,20,"آل عمران","Aal-i-Imraan","The Family of Imraan","Medinan"],[493,176,92,24,"النساء","An-Nisaa","The Women","Medinan"],[669,120,112,16,"المائدة","Al-Maaida","The Table","Medinan"],[789,165,55,20,"الأنعام","Al-An'aam","The Cattle","Meccan"],[954,206,39,24,"الأعراف","Al-A'raaf","The Heights","Meccan"],[1160,75,88,10,"الأنفال","Al-Anfaal","The Spoils of War","Medinan"],[1235,129,113,16,"التوبة","At-Tawba","The Repentance","Medinan"],[1364,109,51,11,"يونس","Yunus","Jonas","Meccan"],[1473,123,52,10,"هود","Hud","Hud","Meccan"],[1596,111,53,12,"يوسف","Yusuf","Joseph","Meccan"],[1707,43,96,6,"الرعد","Ar-Ra'd","The Thunder","Medinan"],[1750,52,72,7,"ابراهيم","Ibrahim","Abraham","Meccan"],[1802,99,54,6,"الحجر","Al-Hijr","The Rock","Meccan"],[1901,128,70,16,"النحل","An-Nahl","The Bee","Meccan"],[2029,111,50,12,"الإسراء","Al-Israa","The Night Journey","Meccan"],[2140,110,69,12,"الكهف","Al-Kahf","The Cave","Meccan"],[2250,98,44,6,"مريم","Maryam","Mary","Meccan"],[2348,135,45,8,"طه","Taa-Haa","Taa-Haa","Meccan"],[2483,112,73,7,"الأنبياء","Al-Anbiyaa","The Prophets","Meccan"],[2595,78,103,10,"الحج","Al-Hajj","The Pilgrimage","Medinan"],[2673,118,74,6,"المؤمنون","Al-Muminoon","The Believers","Meccan"],[2791,64,102,9,"النور","An-Noor","The Light","Medinan"],[2855,77,42,6,"الفرقان","Al-Furqaan","The Criterion","Meccan"],[2932,227,47,11,"الشعراء","Ash-Shu'araa","The Poets","Meccan"],[3159,93,48,7,"النمل","An-Naml","The Ant","Meccan"],[3252,88,49,8,"القصص","Al-Qasas","The Stories","Meccan"],[3340,69,85,7,"العنكبوت","Al-Ankaboot","The Spider","Meccan"],[3409,60,84,6,"الروم","Ar-Room","The Romans","Meccan"],[3469,34,57,3,"لقمان","Luqman","Luqman","Meccan"],[3503,30,75,3,"السجدة","As-Sajda","The Prostration","Meccan"],[3533,73,90,9,"الأحزاب","Al-Ahzaab","The Clans","Medinan"],[3606,54,58,6,"سبإ","Saba","Sheba","Meccan"],[3660,45,43,5,"فاطر","Faatir","The Originator","Meccan"],[3705,83,41,5,"يس","Yaseen","Yaseen","Meccan"],[3788,182,56,5,"الصافات","As-Saaffaat","Those drawn up in Ranks","Meccan"],[3970,88,38,5,"ص","Saad","The letter Saad","Meccan"],[4058,75,59,8,"الزمر","Az-Zumar","The Groups","Meccan"],[4133,85,60,9,"غافر","Al-Ghaafir","The Forgiver","Meccan"],[4218,54,61,6,"فصلت","Fussilat","Explained in detail","Meccan"],[4272,53,62,5,"الشورى","Ash-Shura","Consultation","Meccan"],[4325,89,63,7,"الزخرف","Az-Zukhruf","Ornaments of gold","Meccan"],[4414,59,64,3,"الدخان","Ad-Dukhaan","The Smoke","Meccan"],[4473,37,65,4,"الجاثية","Al-Jaathiya","Crouching","Meccan"],[4510,35,66,4,"الأحقاف","Al-Ahqaf","The Dunes","Meccan"],[4545,38,95,4,"محمد","Muhammad","Muhammad","Medinan"],[4583,29,111,4,"الفتح","Al-Fath","The Victory","Medinan"],[4612,18,106,2,"الحجرات","Al-Hujuraat","The Inner Apartments","Medinan"],[4630,45,34,3,"ق","Qaaf","The letter Qaaf","Meccan"],[4675,60,67,3,"الذاريات","Adh-Dhaariyat","The Winnowing Winds","Meccan"],[4735,49,76,2,"الطور","At-Tur","The Mount","Meccan"],[4784,62,23,3,"النجم","An-Najm","The Star","Meccan"],[4846,55,37,3,"القمر","Al-Qamar","The Moon","Meccan"],[4901,78,97,3,"الرحمن","Ar-Rahmaan","The Beneficent","Medinan"],[4979,96,46,3,"الواقعة","Al-Waaqia","The Inevitable","Meccan"],[5075,29,94,4,"الحديد","Al-Hadid","The Iron","Medinan"],[5104,22,105,3,"المجادلة","Al-Mujaadila","The Pleading Woman","Medinan"],[5126,24,101,3,"الحشر","Al-Hashr","The Exile","Medinan"],[5150,13,91,2,"الممتحنة","Al-Mumtahana","She that is to be examined","Medinan"],[5163,14,109,2,"الصف","As-Saff","The Ranks","Medinan"],[5177,11,110,2,"الجمعة","Al-Jumu'a","Friday","Medinan"],[5188,11,104,2,"المنافقون","Al-Munaafiqoon","The Hypocrites","Medinan"],[5199,18,108,2,"التغابن","At-Taghaabun","Mutual Disillusion","Medinan"],[5217,12,99,2,"الطلاق","At-Talaaq","Divorce","Medinan"],[5229,12,107,2,"التحريم","At-Tahrim","The Prohibition","Medinan"],[5241,30,77,2,"الملك","Al-Mulk","The Sovereignty","Meccan"],[5271,52,2,2,"القلم","Al-Qalam","The Pen","Meccan"],[5323,52,78,2,"الحاقة","Al-Haaqqa","The Reality","Meccan"],[5375,44,79,2,"المعارج","Al-Ma'aarij","The Ascending Stairways","Meccan"],[5419,28,71,2,"نوح","Nooh","Noah","Meccan"],[5447,28,40,2,"الجن","Al-Jinn","The Jinn","Meccan"],[5475,20,3,2,"المزمل","Al-Muzzammil","The Enshrouded One","Meccan"],[5495,56,4,2,"المدثر","Al-Muddaththir","The Cloaked One","Meccan"],[5551,40,31,2,"القيامة","Al-Qiyaama","The Resurrection","Meccan"],[5591,31,98,2,"الانسان","Al-Insaan","Man","Medinan"],[5622,50,33,2,"المرسلات","Al-Mursalaat","The Emissaries","Meccan"],[5672,40,80,2,"النبإ","An-Naba","The Announcement","Meccan"],[5712,46,81,2,"النازعات","An-Naazi'aat","Those who drag forth","Meccan"],[5758,42,24,1,"عبس","Abasa","He frowned","Meccan"],[5800,29,7,1,"التكوير","At-Takwir","The Overthrowing","Meccan"],[5829,19,82,1,"الإنفطار","Al-Infitaar","The Cleaving","Meccan"],[5848,36,86,1,"المطففين","Al-Mutaffifin","Defrauding","Meccan"],[5884,25,83,1,"الإنشقاق","Al-Inshiqaaq","The Splitting Open","Meccan"],[5909,22,27,1,"البروج","Al-Burooj","The Constellations","Meccan"],[5931,17,36,1,"الطارق","At-Taariq","The Morning Star","Meccan"],[5948,19,8,1,"الأعلى","Al-A'laa","The Most High","Meccan"],[5967,26,68,1,"الغاشية","Al-Ghaashiya","The Overwhelming","Meccan"],[5993,30,10,1,"الفجر","Al-Fajr","The Dawn","Meccan"],[6023,20,35,1,"البلد","Al-Balad","The City","Meccan"],[6043,15,26,1,"الشمس","Ash-Shams","The Sun","Meccan"],[6058,21,9,1,"الليل","Al-Lail","The Night","Meccan"],[6079,11,11,1,"الضحى","Ad-Dhuhaa","The Morning Hours","Meccan"],[6090,8,12,1,"الشرح","Ash-Sharh","The Consolation","Meccan"],[6098,8,28,1,"التين","At-Tin","The Fig","Meccan"],[6106,19,1,1,"العلق","Al-Alaq","The Clot","Meccan"],[6125,5,25,1,"القدر","Al-Qadr","The Power, Fate","Meccan"],[6130,8,100,1,"البينة","Al-Bayyina","The Evidence","Medinan"],[6138,8,93,1,"الزلزلة","Az-Zalzala","The Earthquake","Medinan"],[6146,11,14,1,"العاديات","Al-Aadiyaat","The Chargers","Meccan"],[6157,11,30,1,"القارعة","Al-Qaari'a","The Calamity","Meccan"],[6168,8,16,1,"التكاثر","At-Takaathur","Competition","Meccan"],[6176,3,13,1,"العصر","Al-Asr","The Declining Day, Epoch","Meccan"],[6179,9,32,1,"الهمزة","Al-Humaza","The Traducer","Meccan"],[6188,5,19,1,"الفيل","Al-Fil","The Elephant","Meccan"],[6193,4,29,1,"قريش","Quraish","Quraysh","Meccan"],[6197,7,17,1,"الماعون","Al-Maa'un","Almsgiving","Meccan"],[6204,3,15,1,"الكوثر","Al-Kawthar","Abundance","Meccan"],[6207,6,18,1,"الكافرون","Al-Kaafiroon","The Disbelievers","Meccan"],[6213,3,114,1,"النصر","An-Nasr","Divine Support","Medinan"],[6216,5,6,1,"المسد","Al-Masad","The Palm Fibre","Meccan"],[6221,4,22,1,"الإخلاص","Al-Ikhlaas","Sincerity","Meccan"],[6225,5,20,1,"الفلق","Al-Falaq","The Dawn","Meccan"],[6230,6,21,1,"الناس","An-Naas","Mankind","Meccan"],[6236,1]],we=[[],[1,1],[2,1],[2,8],[2,21],[2,30],[2,40],[2,47],[2,60],[2,62],[2,72],[2,83],[2,87],[2,97],[2,104],[2,113],[2,122],[2,130],[2,142],[2,148],[2,153],[2,164],[2,168],[2,177],[2,183],[2,189],[2,197],[2,211],[2,217],[2,222],[2,229],[2,232],[2,236],[2,243],[2,249],[2,254],[2,258],[2,261],[2,267],[2,274],[2,282],[2,284],[3,1],[3,10],[3,21],[3,31],[3,42],[3,55],[3,64],[3,72],[3,81],[3,92],[3,102],[3,110],[3,121],[3,130],[3,144],[3,149],[3,156],[3,172],[3,181],[3,190],[4,1],[4,11],[4,15],[4,23],[4,26],[4,34],[4,43],[4,51],[4,60],[4,71],[4,77],[4,88],[4,92],[4,97],[4,101],[4,105],[4,113],[4,116],[4,127],[4,135],[4,142],[4,153],[4,163],[4,172],[5,1],[5,6],[5,12],[5,20],[5,27],[5,35],[5,44],[5,51],[5,57],[5,67],[5,78],[5,87],[5,94],[5,101],[5,109],[5,116],[6,1],[6,11],[6,21],[6,31],[6,42],[6,51],[6,56],[6,61],[6,71],[6,83],[6,91],[6,95],[6,101],[6,111],[6,122],[6,130],[6,141],[6,145],[6,151],[6,155],[7,1],[7,11],[7,26],[7,32],[7,40],[7,48],[7,54],[7,59],[7,65],[7,73],[7,85],[7,94],[7,100],[7,109],[7,127],[7,130],[7,142],[7,148],[7,152],[7,158],[7,163],[7,172],[7,182],[7,189],[8,1],[8,11],[8,20],[8,29],[8,38],[8,45],[8,49],[8,59],[8,65],[8,70],[9,1],[9,7],[9,17],[9,25],[9,30],[9,38],[9,43],[9,60],[9,67],[9,73],[9,81],[9,90],[9,100],[9,111],[9,119],[9,123],[10,1],[10,11],[10,21],[10,31],[10,41],[10,54],[10,61],[10,71],[10,83],[10,93],[10,104],[11,1],[11,9],[11,25],[11,36],[11,50],[11,61],[11,69],[11,84],[11,96],[11,110],[12,1],[12,7],[12,21],[12,30],[12,36],[12,43],[12,50],[12,58],[12,69],[12,80],[12,94],[12,105],[13,1],[13,8],[13,19],[13,27],[13,32],[13,38],[14,1],[14,7],[14,13],[14,22],[14,28],[14,35],[14,42],[15,1],[15,16],[15,26],[15,45],[15,61],[15,80],[16,1],[16,10],[16,22],[16,26],[16,35],[16,41],[16,51],[16,61],[16,66],[16,71],[16,77],[16,84],[16,90],[16,101],[16,111],[16,120],[17,1],[17,11],[17,23],[17,31],[17,41],[17,53],[17,61],[17,71],[17,78],[17,85],[17,94],[17,101],[18,1],[18,13],[18,18],[18,23],[18,32],[18,45],[18,50],[18,54],[18,60],[18,71],[18,83],[18,102],[19,1],[19,16],[19,41],[19,51],[19,66],[19,83],[20,1],[20,25],[20,55],[20,77],[20,90],[20,105],[20,116],[20,129],[21,1],[21,11],[21,30],[21,42],[21,51],[21,76],[21,94],[22,1],[22,11],[22,23],[22,26],[22,34],[22,39],[22,49],[22,58],[22,65],[22,73],[23,1],[23,23],[23,33],[23,51],[23,78],[23,93],[24,1],[24,11],[24,21],[24,27],[24,35],[24,41],[24,51],[24,58],[24,62],[25,1],[25,10],[25,21],[25,35],[25,45],[25,61],[26,1],[26,10],[26,34],[26,53],[26,70],[26,105],[26,123],[26,141],[26,160],[26,176],[26,192],[27,1],[27,15],[27,32],[27,45],[27,59],[27,67],[27,83],[28,1],[28,14],[28,22],[28,29],[28,43],[28,51],[28,61],[28,76],[29,1],[29,14],[29,23],[29,31],[29,45],[29,52],[29,64],[30,1],[30,11],[30,20],[30,28],[30,41],[30,54],[31,1],[31,12],[31,20],[32,1],[32,12],[32,23],[33,1],[33,9],[33,21],[33,28],[33,35],[33,41],[33,53],[33,59],[33,69],[34,1],[34,10],[34,22],[34,31],[34,37],[34,46],[35,1],[35,8],[35,15],[35,27],[35,38],[36,1],[36,13],[36,33],[36,51],[36,68],[37,1],[37,22],[37,75],[37,114],[37,139],[38,1],[38,15],[38,27],[38,41],[38,65],[39,1],[39,10],[39,22],[39,32],[39,42],[39,53],[39,64],[39,71],[40,1],[40,10],[40,21],[40,28],[40,38],[40,51],[40,61],[40,69],[40,79],[41,1],[41,9],[41,19],[41,26],[41,33],[41,45],[42,1],[42,10],[42,20],[42,30],[42,44],[43,1],[43,16],[43,26],[43,36],[43,46],[43,57],[43,68],[44,1],[44,30],[44,43],[45,1],[45,12],[45,22],[45,27],[46,1],[46,11],[46,21],[46,27],[47,1],[47,12],[47,20],[47,29],[48,1],[48,11],[48,18],[48,27],[49,1],[49,11],[50,1],[50,16],[50,30],[51,1],[51,24],[51,47],[52,1],[52,29],[53,1],[53,26],[53,33],[54,1],[54,23],[54,41],[55,1],[55,26],[55,46],[56,1],[56,39],[56,75],[57,1],[57,11],[57,20],[57,26],[58,1],[58,7],[58,14],[59,1],[59,11],[59,18],[60,1],[60,7],[61,1],[61,10],[62,1],[62,9],[63,1],[63,9],[64,1],[64,11],[65,1],[65,8],[66,1],[66,8],[67,1],[67,15],[68,1],[68,34],[69,1],[69,38],[70,1],[70,36],[71,1],[71,21],[72,1],[72,20],[73,1],[73,20],[74,1],[74,32],[75,1],[75,31],[76,1],[76,23],[77,1],[77,41],[78,1],[78,31],[79,1],[79,27],[80,1],[81,1],[82,1],[83,1],[84,1],[85,1],[86,1],[87,1],[88,1],[89,1],[90,1],[91,1],[92,1],[93,1],[94,1],[95,1],[96,1],[97,1],[98,1],[99,1],[100,1],[101,1],[102,1],[103,1],[104,1],[105,1],[106,1],[107,1],[108,1],[109,1],[110,1],[111,1],[112,1],[113,1],[114,1]],ke=[[],[1,1],[2,1],[2,6],[2,17],[2,25],[2,30],[2,38],[2,49],[2,58],[2,62],[2,70],[2,77],[2,84],[2,89],[2,94],[2,102],[2,106],[2,113],[2,120],[2,127],[2,135],[2,142],[2,146],[2,154],[2,164],[2,170],[2,177],[2,182],[2,187],[2,191],[2,197],[2,203],[2,211],[2,216],[2,220],[2,225],[2,231],[2,234],[2,238],[2,246],[2,249],[2,253],[2,257],[2,260],[2,265],[2,270],[2,275],[2,282],[2,283],[3,1],[3,10],[3,16],[3,23],[3,30],[3,38],[3,46],[3,53],[3,62],[3,71],[3,78],[3,84],[3,92],[3,101],[3,109],[3,116],[3,122],[3,133],[3,141],[3,149],[3,154],[3,158],[3,166],[3,174],[3,181],[3,187],[3,195],[4,1],[4,7],[4,12],[4,15],[4,20],[4,24],[4,27],[4,34],[4,38],[4,45],[4,52],[4,60],[4,66],[4,75],[4,80],[4,87],[4,92],[4,95],[4,102],[4,106],[4,114],[4,122],[4,128],[4,135],[4,141],[4,148],[4,155],[4,163],[4,171],[4,176],[5,3],[5,6],[5,10],[5,14],[5,18],[5,24],[5,32],[5,37],[5,42],[5,46],[5,51],[5,58],[5,65],[5,71],[5,77],[5,83],[5,90],[5,96],[5,104],[5,109],[5,114],[6,1],[6,9],[6,19],[6,28],[6,36],[6,45],[6,53],[6,60],[6,69],[6,74],[6,82],[6,91],[6,95],[6,102],[6,111],[6,119],[6,125],[6,132],[6,138],[6,143],[6,147],[6,152],[6,158],[7,1],[7,12],[7,23],[7,31],[7,38],[7,44],[7,52],[7,58],[7,68],[7,74],[7,82],[7,88],[7,96],[7,105],[7,121],[7,131],[7,138],[7,144],[7,150],[7,156],[7,160],[7,164],[7,171],[7,179],[7,188],[7,196],[8,1],[8,9],[8,17],[8,26],[8,34],[8,41],[8,46],[8,53],[8,62],[8,70],[9,1],[9,7],[9,14],[9,21],[9,27],[9,32],[9,37],[9,41],[9,48],[9,55],[9,62],[9,69],[9,73],[9,80],[9,87],[9,94],[9,100],[9,107],[9,112],[9,118],[9,123],[10,1],[10,7],[10,15],[10,21],[10,26],[10,34],[10,43],[10,54],[10,62],[10,71],[10,79],[10,89],[10,98],[10,107],[11,6],[11,13],[11,20],[11,29],[11,38],[11,46],[11,54],[11,63],[11,72],[11,82],[11,89],[11,98],[11,109],[11,118],[12,5],[12,15],[12,23],[12,31],[12,38],[12,44],[12,53],[12,64],[12,70],[12,79],[12,87],[12,96],[12,104],[13,1],[13,6],[13,14],[13,19],[13,29],[13,35],[13,43],[14,6],[14,11],[14,19],[14,25],[14,34],[14,43],[15,1],[15,16],[15,32],[15,52],[15,71],[15,91],[16,7],[16,15],[16,27],[16,35],[16,43],[16,55],[16,65],[16,73],[16,80],[16,88],[16,94],[16,103],[16,111],[16,119],[17,1],[17,8],[17,18],[17,28],[17,39],[17,50],[17,59],[17,67],[17,76],[17,87],[17,97],[17,105],[18,5],[18,16],[18,21],[18,28],[18,35],[18,46],[18,54],[18,62],[18,75],[18,84],[18,98],[19,1],[19,12],[19,26],[19,39],[19,52],[19,65],[19,77],[19,96],[20,13],[20,38],[20,52],[20,65],[20,77],[20,88],[20,99],[20,114],[20,126],[21,1],[21,11],[21,25],[21,36],[21,45],[21,58],[21,73],[21,82],[21,91],[21,102],[22,1],[22,6],[22,16],[22,24],[22,31],[22,39],[22,47],[22,56],[22,65],[22,73],[23,1],[23,18],[23,28],[23,43],[23,60],[23,75],[23,90],[23,105],[24,1],[24,11],[24,21],[24,28],[24,32],[24,37],[24,44],[24,54],[24,59],[24,62],[25,3],[25,12],[25,21],[25,33],[25,44],[25,56],[25,68],[26,1],[26,20],[26,40],[26,61],[26,84],[26,112],[26,137],[26,160],[26,184],[26,207],[27,1],[27,14],[27,23],[27,36],[27,45],[27,56],[27,64],[27,77],[27,89],[28,6],[28,14],[28,22],[28,29],[28,36],[28,44],[28,51],[28,60],[28,71],[28,78],[28,85],[29,7],[29,15],[29,24],[29,31],[29,39],[29,46],[29,53],[29,64],[30,6],[30,16],[30,25],[30,33],[30,42],[30,51],[31,1],[31,12],[31,20],[31,29],[32,1],[32,12],[32,21],[33,1],[33,7],[33,16],[33,23],[33,31],[33,36],[33,44],[33,51],[33,55],[33,63],[34,1],[34,8],[34,15],[34,23],[34,32],[34,40],[34,49],[35,4],[35,12],[35,19],[35,31],[35,39],[35,45],[36,13],[36,28],[36,41],[36,55],[36,71],[37,1],[37,25],[37,52],[37,77],[37,103],[37,127],[37,154],[38,1],[38,17],[38,27],[38,43],[38,62],[38,84],[39,6],[39,11],[39,22],[39,32],[39,41],[39,48],[39,57],[39,68],[39,75],[40,8],[40,17],[40,26],[40,34],[40,41],[40,50],[40,59],[40,67],[40,78],[41,1],[41,12],[41,21],[41,30],[41,39],[41,47],[42,1],[42,11],[42,16],[42,23],[42,32],[42,45],[42,52],[43,11],[43,23],[43,34],[43,48],[43,61],[43,74],[44,1],[44,19],[44,40],[45,1],[45,14],[45,23],[45,33],[46,6],[46,15],[46,21],[46,29],[47,1],[47,12],[47,20],[47,30],[48,1],[48,10],[48,16],[48,24],[48,29],[49,5],[49,12],[50,1],[50,16],[50,36],[51,7],[51,31],[51,52],[52,15],[52,32],[53,1],[53,27],[53,45],[54,7],[54,28],[54,50],[55,17],[55,41],[55,68],[56,17],[56,51],[56,77],[57,4],[57,12],[57,19],[57,25],[58,1],[58,7],[58,12],[58,22],[59,4],[59,10],[59,17],[60,1],[60,6],[60,12],[61,6],[62,1],[62,9],[63,5],[64,1],[64,10],[65,1],[65,6],[66,1],[66,8],[67,1],[67,13],[67,27],[68,16],[68,43],[69,9],[69,35],[70,11],[70,40],[71,11],[72,1],[72,14],[73,1],[73,20],[74,18],[74,48],[75,20],[76,6],[76,26],[77,20],[78,1],[78,31],[79,16],[80,1],[81,1],[82,1],[83,7],[83,35],[85,1],[86,1],[87,16],[89,1],[89,24],[91,1],[92,15],[95,1],[97,1],[98,8],[100,10],[103,1],[106,1],[109,1],[112,1],[115,1]],je=[[],[7,206,"recommended"],[13,15,"recommended"],[16,50,"recommended"],[17,109,"recommended"],[19,58,"recommended"],[22,18,"recommended"],[22,77,"recommended"],[25,60,"recommended"],[27,26,"recommended"],[32,15,"obligatory"],[38,24,"recommended"],[41,38,"obligatory"],[53,62,"obligatory"],[84,21,"recommended"],[96,19,"obligatory"]];var Ie,Se;function _e(e){switch(e){case $e:return Ie||(Ie=ke.reduce((function(e,n,t,a){return n.length&&t+1!==a.length&&e.push(t.toString()),e}),[]));case xe:return Se||(Se=be.reduce((function(e,n,t){var a;return(a=n[4])&&e.push(a+" "+n[5]),e}),[]));default:return[]}}function Ce(e){return be[e]}function qe(e,n){return function(e,n){return e[0]+Math.min(e[1],n-1)}(Ce(e),n)}function Ee(e,n,t){switch(n){case $e:case xe:return e.slice(function(e,n){switch(e){case $e:return qe.apply(null,ke[n]);case xe:return be[n][0];default:return-1}}(n,t),function(e,n){switch(e){case $e:return qe.apply(null,ke[n+1]);case xe:return be[n][0]+be[n][1];default:return-1}}(n,t));default:return[]}}function He(e,n,t){return r=Ee(e,n,t),a=r.reduce((function(e,n){const t=n.sura.toString();return Object.prototype.hasOwnProperty.call(e,t)||(e[t]=[]),e[t].push(n),e}),{}),Object.keys(a).map((function(e){const n=parseInt(e,10);return{meta:(t=Ce(e),r=n,["start","ayas","order","rukus","name","tname","ename","type"].reduce((function(e,n,a){return e[n]=t[a],e}),{position:r})),data:a[n]};var t,r}));var a,r}const ze={[$e]:ke.length-1,[xe]:be.length-1};function Ne(e,n){return Math.max(1,Math.min(ze[e]-1,parseInt(n,10)))}function Pe(e){return ze[e]||0}function Le(e,n){for(let t in n)e[t]=n[t];return e}const Be=Object.assign||function(){const e=arguments;let n=e[0];for(let t=1,a=e.length;t<a;t++)n=Le(n,e[t]);return n},Re=1,Fe=2,Oe=3,De=4,Qe={page:Pe($e),sura:Pe(xe)},Je={pagingType:$e,pagingIndex:1,pagingTotal:Qe[$e],pagingMeta:_e($e),page:[]};let We=[];var Ge=function(){const{subscribe:n,update:t}=function(n,t=e){let a;const r=[];function c(e){if(i(n,e)&&(n=e,a)){const e=!ye.length;for(let e=0;e<r.length;e+=1){const t=r[e];t[1](),ye.push(t,n)}if(e){for(let e=0;e<ye.length;e+=2)ye[e][0](ye[e+1]);ye.length=0}}}return{set:c,update:function(e){c(e(n))},subscribe:function(i,o=e){const l=[i,o];return r.push(l),1===r.length&&(a=t(c)||e),i(n),()=>{const e=r.indexOf(l);-1!==e&&r.splice(e,1),0===r.length&&(a(),a=null)}}}}(Je),a=e=>t(n=>(function(e,n){let t,a;switch(n.type){case Re:return We=n.source,Be({},e,{page:He(We,e.pagingType,e.pagingIndex)});case Fe:if(a=n.pagingType,t=1,void 0!==a&&e.pagingType!==a)return Be({},e,{pagingType:a,pagingIndex:t,pagingTotal:Qe[a],pagingMeta:_e(a),page:He(We,a,t)});case Oe:if(a=e.pagingType,t=Ne(e.pagingType,n.pagingIndex),void 0!==t&&t!==e.pagingIndex)return Be({},e,{pagingIndex:t,page:He(We,a,t)});case De:if(a=n.pagingType,t=Ne(n.pagingType,n.pagingIndex),a!==e.pagingType||t!==e.pagingIndex)return Be({},e,{pagingType:a,pagingIndex:t,pagingTotal:Qe[a],pagingMeta:_e(a),page:He(We,a,t)})}return e})(n,e));return{subscribe:n,dispatch:a,gotoPage:function({pagingIndex:e,pagingType:n}){switch((void 0===e?0:1)+(void 0===n?0:2)){case 1:return a({type:Oe,pagingIndex:e});case 2:return a({type:Fe,pagingType:n});case 3:return a({type:De,pagingIndex:e,pagingType:n})}}}}();function Ke(e){return function(e){return we.forEach((function(n,t){t>1&&(e[qe(n[0],n[1])-1].ruku=t-1)})),e[e.length-2].ruku=we.length,e}(function(e){return je.forEach((function(n,t){t&&(e[qe(n[0],n[1])].sajda=n[2])})),e}(function(e){return Array.prototype.concat.apply([],be.map((function(n,t){return e.slice(n[0],n[0]+n[1]).map((function(e,n){return{text:0===n?ee(e):e,aya:n+1,sura:t}}))})))}(e)))}function Ye(e){return e<1048576?`${Math.round(100*e/1024)/100} KB`:function(e){return`${Math.round(100*e/1048576)/100} MB`}(e)}function Ze(e,n){return 0===n?function(e){return e<1024?`${e} B`:Ye(e)}(e):`${Math.round(100*e/n)}%`}const Ve=document.location,Ue="#!/",Xe=/#!\/(page|sura)\/(\d+)/,en="page/1";function nn(e){return function(n){const t=(Ve.hash,Xe.exec(Ve.hash)||tn(en)&&!1);t&&e.gotoPage({pagingType:t[1],pagingIndex:parseInt(t[2],10)})}}function tn(e){return Ve.hash=Ue+e}const an=document.getElementById("app");let rn=an.querySelector("svg");var cn;!function(e){const n=nn(e);n();const t=e.subscribe(e=>{tn(e.pagingType+"/"+e.pagingIndex)});window.addEventListener("hashchange",n)}(Ge),new class extends Q{constructor(e){super(),D(this,e,Ae,Te,i,{store:0})}}({target:an,props:{store:Ge}}),cn={url:"data/quran-uthmani.txt",progress:function(e){Ze(e.loaded,e.total)},success:function(e){rn.parentNode.removeChild(rn),rn=null,Ge.dispatch({type:Re,source:Ke(e.target.responseText.replace(/\r?\n|\r/g,"|").split("|"))})},error:function(e){var n;(n=e.target).statusText,n.responseURL}},function(e,n){e.onprogress=n.progress,e.onreadystatechange=function(e){!function(e,n){4===e.target.readyState&&function(e,n){e.target.status<400?n.success(e):n.error(e)}(e,n)}(e,n)},e.open(n.method||"GET",n.url,!0),e.send(n.data)}(new XMLHttpRequest,Be({},cn))}();
//# sourceMappingURL=bundle.js.map