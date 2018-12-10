!function(){"use strict";function t(){}function e(t,e){for(var n in e)t[n]=e[n];return t}function n(t,e){return 0===e&&t(),function(){--e||t()}}function a(t,e){var n={};for(var a in t)a===e||(n[a]=t[a]);return n}function i(t){t()}function r(t,e){t.appendChild(e)}function o(t,e,n){t.insertBefore(e,n)}function c(t){t.parentNode.removeChild(t)}function s(t,e){for(var n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function l(t,e,n,a){t.addEventListener(e,n,a)}function f(t,e,n,a){t.removeEventListener(e,n,a)}function d(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function g(t,e){t.data=""+e}function p(){return Object.create(null)}function m(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function _(t,e){return t!=t?e==e:t!==e}function v(t,e){var n=t in this._handlers&&this._handlers[t].slice();if(n)for(var a=0;a<n.length;a+=1){var i=n[a];if(!i.__calling)try{i.__calling=!0,i.call(this,e)}finally{i.__calling=!1}}}function M(t){t._lock=!0,x(t._beforecreate),x(t._oncreate),x(t._aftercreate),t._lock=!1}function y(){return this._state}function A(t,e){t._handlers=p(),t._slots=p(),t._bind=e._bind,t._staged={},t.options=e,t.root=e.root||t,t.store=e.store||t.root.store,e.root||(t._beforecreate=[],t._oncreate=[],t._aftercreate=[])}function T(t,e){var n=this._handlers[t]||(this._handlers[t]=[]);return n.push(e),{cancel:function(){var t=n.indexOf(e);~t&&n.splice(t,1)}}}function x(t){for(;t&&t.length;)t.shift()()}function b(){this.store._remove(this)}var k={destroy:function(e){this.destroy=t,this.fire("destroy"),this.set=t,this._fragment.d(!1!==e),this._fragment=null,this._state={}},get:y,fire:v,on:T,set:function(t){this._set(e({},t)),this.root._lock||M(this.root)},_recompute:t,_set:function(t){var n=this._state,a={},i=!1;for(var r in t=e(this._staged,t),this._staged={},t)this._differs(t[r],n[r])&&(a[r]=i=!0);i&&(this._state=e(e({},n),t),this._recompute(a,this._state),this._bind&&this._bind(a,this._state),this._fragment&&(this.fire("state",{changed:a,current:this._state,previous:n}),this._fragment.p(a,this._state),this.fire("update",{changed:a,current:this._state,previous:n})))},_stage:function(t){e(this._staged,t)},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:m};function S(t){return String(t).split(",").map(function(t){return String.fromCharCode(t)}).join("")}var w="1576,1616,1587,1618,1605,1616,32,1575,1604,1604,1617,1614,1607,1616,32,1575,1604,1585,1617,1614,1581,1618,1605,1614,1606,1616,32,1575,1604,1585,1617,1614,1581,1616,1610,1605,1616",N=new RegExp("^("+w+"(,32)?(,)?)(.*)","");function C(t){return N.exec(function(t){return String(t).split("").map(function(t){return t.charCodeAt()}).join(",")}(t))||[]}function j(t){return function(t){return t?S(t):""}(C(t)[4])||t}var P=S(w);function E(t){var n,a,s,l,f,d,p,m,_,v,M,y,T,x,b,k,S,w,N;A(this,t),this._state=e({bismillah:P},t.data),this._intro=!!t.intro,this._fragment=(n=this._state,k=n.meta[4],S=n.meta[5],w=n.meta[6],N=n.meta[7],{c:function(){a=u("header"),s=u("h1"),l=h(k),f=h("\n  "),d=u("h2"),p=h(S),m=h(" | "),_=h(w),v=h(" | "),M=h(N),y=h("\n  "),T=u("h3"),x=h(n.bismillah),s.className="svelte-1tv5h2o",d.className="svelte-1tv5h2o",T.className="svelte-1tv5h2o",a.className="svelte-1tv5h2o"},m:function(t,e){o(t,a,e),r(a,s),r(s,l),r(a,f),r(a,d),r(d,p),r(d,m),r(d,_),r(d,v),r(d,M),r(a,y),r(a,T),r(T,x),b=!0},p:function(t,e){t.meta&&k!==(k=e.meta[4])&&g(l,k),t.meta&&S!==(S=e.meta[5])&&g(p,S),t.meta&&w!==(w=e.meta[6])&&g(_,w),t.meta&&N!==(N=e.meta[7])&&g(M,N),t.bismillah&&g(x,e.bismillah)},i:function(t,e){b||this.m(t,e)},o:i,d:function(t){t&&c(a)}}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor)),this._intro=!0}function I(t,e){var n,a,r,s,u,l=e.aya.text,f=e.aya.sajda!==e.undefined&&$(t,e),d=e.aya.ruku&&q(t,e);return{c:function(){n=h(l),a=h("\n"),f&&f.c(),r=h("\n"),d&&d.c(),s=document.createComment("")},m:function(t,e){o(t,n,e),o(t,a,e),f&&f.m(t,e),o(t,r,e),d&&d.m(t,e),o(t,s,e),u=!0},p:function(e,a){e.aya&&l!==(l=a.aya.text)&&g(n,l),a.aya.sajda!==a.undefined?f?f.p(e,a):((f=$(t,a)).c(),f.m(r.parentNode,r)):f&&(f.d(1),f=null),a.aya.ruku?d||((d=q(t,a)).c(),d.m(s.parentNode,s)):d&&(d.d(1),d=null)},i:function(t,e){u||this.m(t,e)},o:i,d:function(t){t&&(c(n),c(a)),f&&f.d(t),t&&c(r),d&&d.d(t),t&&c(s)}}}function $(t,e){var n,a;return{c:function(){(n=u("img")).src="public/resources/sajda.svg",n.alt=a=e.aya.sajda,n.title="Sajda",n.height="32",n.className="svelte-1lgkrcq"},m:function(t,e){o(t,n,e)},p:function(t,e){t.aya&&a!==(a=e.aya.sajda)&&(n.alt=a)},d:function(t){t&&c(n)}}}function q(t,e){var n;return{c:function(){(n=u("img")).src="public/resources/ruku.svg",n.alt="Ruku",n.title="Ruku",n.height="32",n.className="svelte-1lgkrcq"},m:function(t,e){o(t,n,e)},d:function(t){t&&c(n)}}}function R(t){A(this,t),this._state=e({undefined:void 0},t.data),this._intro=!!t.intro,this._fragment=I(this,this._state),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor)),this._intro=!0}function H(t,e,n){var a=Object.create(t);return a.aya=e[n],a}function O(t,e){var n,a,i,s={aya:e.aya},l=new R({root:t.root,store:t.store,data:s});return{c:function(){n=u("li"),l._fragment.c(),a=h("\n  "),n.className="svelte-wbzmk0"},m:function(t,e){o(t,n,e),l._mount(n,null),r(n,a),i=!0},p:function(t,e){var n={};t.ayas&&(n.aya=e.aya),l._set(n)},i:function(t,e){i||this.m(t,e)},o:function(t){i&&(l&&l._fragment.o(t),i=!1)},d:function(t){t&&c(n),l.destroy()}}}function B(t){A(this,t),this._state=e({},t.data),this._recompute({},this._state),this._intro=!!t.intro,this._fragment=function(t,e){for(var a,i,r=e.ayas,h=[],l=0;l<r.length;l+=1)h[l]=O(t,H(e,r,l));function f(t,e,n){h[t]&&h[t].o(function(){e&&(h[t].d(e),h[t]=null),n&&n()})}return{c:function(){a=u("ol");for(var t=0;t<h.length;t+=1)h[t].c();a.start=e.start,a.style.cssText=e.inlineStyle,a.dir="rtl",a.className="svelte-wbzmk0"},m:function(t,e){o(t,a,e);for(var n=0;n<h.length;n+=1)h[n].i(a,null);i=!0},p:function(e,n){if(e.ayas){r=n.ayas;for(var o=0;o<r.length;o+=1){var c=H(n,r,o);h[o]?h[o].p(e,c):(h[o]=O(t,c),h[o].c()),h[o].i(a,null)}for(;o<h.length;o+=1)f(o,1)}i&&!e.start||(a.start=n.start),i&&!e.inlineStyle||(a.style.cssText=n.inlineStyle)},i:function(t,e){i||this.m(t,e)},o:function(t){if(i){for(var e=n(t,(h=h.filter(Boolean)).length),a=0;a<h.length;a+=1)f(a,0,e);i=!1}},d:function(t){t&&c(a),s(h,t)}}}(this,this._state),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),M(this)),this._intro=!0}function z(t,e){var n,a={meta:e.meta},i=new E({root:t.root,store:t.store,data:a});return{c:function(){i._fragment.c()},m:function(t,e){i._mount(t,e),n=!0},p:function(t,e){var n={};t.meta&&(n.meta=e.meta),i._set(n)},i:function(t,e){n||this.m(t,e)},o:function(t){n&&(i&&i._fragment.o(t),n=!1)},d:function(t){i.destroy(t)}}}function F(t){var a,i,s,l,f,d,g,p;A(this,t),this._state=e({},t.data),this._intro=!!t.intro,this._fragment=(a=this,i=this._state,d=1===i.ayas[0].aya&&z(a,i),g={ayas:i.ayas},p=new B({root:a.root,store:a.store,data:g}),{c:function(){s=u("article"),d&&d.c(),l=h("\n  "),p._fragment.c(),s.className="svelte-hl4ji2"},m:function(t,e){o(t,s,e),d&&d.m(s,null),r(s,l),p._mount(s,null),f=!0},p:function(t,e){1===e.ayas[0].aya?(d?d.p(t,e):(d=z(a,e))&&d.c(),d.i(s,l)):d&&d.o(function(){d.d(1),d=null});var n={};t.ayas&&(n.ayas=e.ayas),p._set(n)},i:function(t,e){f||this.m(t,e)},o:function(t){f&&(t=n(t,2),d?d.o(t):t(),p&&p._fragment.o(t),f=!1)},d:function(t){t&&c(s),d&&d.d(),p.destroy()}}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),M(this)),this._intro=!0}function L(t,e,n){var a=Object.create(t);return a.sura=e[n],a}function D(t,e){var n,a={ayas:e.sura.data,meta:e.sura.meta},i=new F({root:t.root,store:t.store,data:a});return{c:function(){i._fragment.c()},m:function(t,e){i._mount(t,e),n=!0},p:function(t,e){var n={};t.$page&&(n.ayas=e.sura.data),t.$page&&(n.meta=e.sura.meta),i._set(n)},i:function(t,e){n||this.m(t,e)},o:function(t){n&&(i&&i._fragment.o(t),n=!1)},d:function(t){i.destroy(t)}}}function G(t){A(this,t),this._state=e(this.store._init(["page"]),t.data),this.store._add(this,["page"]),this._intro=!!t.intro,this._handlers.destroy=[b],this._fragment=function(t,e){for(var a,i,r=e.$page,h=[],l=0;l<r.length;l+=1)h[l]=D(t,L(e,r,l));function f(t,e,n){h[t]&&h[t].o(function(){e&&(h[t].d(e),h[t]=null),n&&n()})}return{c:function(){a=u("section");for(var t=0;t<h.length;t+=1)h[t].c();a.className="svelte-jjcuoy"},m:function(t,e){o(t,a,e);for(var n=0;n<h.length;n+=1)h[n].i(a,null);i=!0},p:function(e,n){if(e.$page){r=n.$page;for(var i=0;i<r.length;i+=1){var o=L(n,r,i);h[i]?h[i].p(e,o):(h[i]=D(t,o),h[i].c()),h[i].i(a,null)}for(;i<h.length;i+=1)f(i,1)}},i:function(t,e){i||this.m(t,e)},o:function(t){if(i){for(var e=n(t,(h=h.filter(Boolean)).length),a=0;a<h.length;a+=1)f(a,0,e);i=!1}},d:function(t){t&&c(a),s(h,t)}}}(this,this._state),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),M(this)),this._intro=!0}e(E.prototype,k),e(R.prototype,k),e(B.prototype,k),B.prototype._recompute=function(t,e){this._differs(e.start,e.start=a(e,"start").ayas[0].aya)&&(t.start=!0),this._differs(e.inlineStyle,e.inlineStyle=function(t){return"counter-reset: section "+(t.start-1)+";"}(a(e,"inlineStyle")))&&(t.inlineStyle=!0)},e(F.prototype,k),e(G.prototype,k);var Q="page",W="sura",U="pagingType",J="pagingIndex";function K(t){var e=t&&t.options[t.selectedIndex];e&&(t.style.width=function(t,e){var n,a=document,i=a.body,r=t.cloneNode(),o=a.createElement("option");return o.text=e,r.add(o,null),r.style.opacity=0,r.style.width="auto",i.appendChild(r),n=r.scrollWidth,i.removeChild(r),n}(t,e.innerText)+"px")}var Y={next:function(){var t,e,n=this.store.get();this.store.set({pagingIndex:(t=n.pagingIndex,e=n.pagingTotal,(t+1)%e||1)})},previous:function(){var t,e,n=this.store.get();this.store.set({pagingIndex:(t=n.pagingIndex,e=n.pagingTotal,(e+t-1)%e||e-1)})},onTypeChange:function(t){this.store.set({pagingType:t.target.value,pagingIndex:1})},onPageChange:function(t){this.store.set({pagingIndex:parseInt(t.target.value,10)})}};function Z(){setTimeout(K,0,this.refs.select)}function V(t,e,n){var a=Object.create(t);return a.meta=e[n],a.x=n,a}function X(t,e){var n,a,i,s=e.meta;return{c:function(){n=u("option"),a=h(s),n.__value=e.x+1,n.value=n.__value,n.selected=i=e.$pagingIndex===e.x+1},m:function(t,e){o(t,n,e),r(n,a)},p:function(t,e){t.$pagingMeta&&s!==(s=e.meta)&&g(a,s),t.$pagingIndex&&i!==(i=e.$pagingIndex===e.x+1)&&(n.selected=i)},d:function(t){t&&c(n)}}}function tt(t,e){var n,a=e.$page.map(function(t){return t.meta[4]}).join(" ,");return{c:function(){n=h(a)},m:function(t,e){o(t,n,e)},p:function(t,e){t.$page&&a!==(a=e.$page.map(function(t){return t.meta[4]}).join(" ,"))&&g(n,a)},d:function(t){t&&c(n)}}}function et(t){var n=this;A(this,t),this.refs={},this._state=e(e(this.store._init(["pagingType","pagingMeta","pagingIndex","page"]),{PAGE:Q,SURA:W}),t.data),this.store._add(this,["pagingType","pagingMeta","pagingIndex","page"]),this._intro=!!t.intro,this._handlers.update=[Z],this._handlers.destroy=[b],this._fragment=function(t,e){var n,a,g,p,m,_,v,M,y,A,T,x,b,k,S,w,N,C,j;function P(e){t.next()}function E(e){t.previous()}function I(e){t.onTypeChange(e)}for(var $=e.$pagingMeta,q=[],R=0;R<$.length;R+=1)q[R]=X(0,V(e,$,R));function H(e){t.onPageChange(e)}var O=e.$pagingType===e.PAGE&&tt(0,e);return{c:function(){n=u("nav"),(a=u("button")).innerHTML='<svg width="12" height="20" viewBox="0 0 12 20" class="svelte-1x79hk7"><path d="M10,0l2,2l-8,8l8,8l-2,2L0,10L10,0z" fill="#0151a9"></path></svg>\n\t\t\t    <span class="svelte-1x79hk7">Next</span>',g=h("\n\n  "),(p=u("button")).innerHTML='<span class="svelte-1x79hk7">Previous</span>\n\t\t\t    <svg width="12" height="20" viewBox="0 0 12 20" class="svelte-1x79hk7"><path d="M 2,0 0,2 8,10 0,18 2,20 12,10 2,0 Z" fill="#0151a9"></path></svg>',m=h("\n\n  "),_=u("form"),v=u("select"),M=u("option"),y=h("Sura"),T=u("option"),x=h("Page"),k=h("\n    "),S=u("select");for(var t=0;t<q.length;t+=1)q[t].c();w=h("\n    "),N=u("span"),C=h(" \n      "),O&&O.c(),l(a,"click",P),a.className="next svelte-1x79hk7",l(p,"click",E),p.className="previous svelte-1x79hk7",M.__value=e.SURA,M.value=M.__value,M.selected=A=e.$pagingType===e.SURA,T.__value=e.PAGE,T.value=T.__value,T.selected=b=e.$pagingType===e.PAGE,l(v,"change",I),d(v,"aria-label","Select Page Type"),v.className="svelte-1x79hk7",l(S,"change",H),d(S,"aria-label","Select Page"),S.className="svelte-1x79hk7",d(_,"onsubmit","return false"),_.className="svelte-1x79hk7",n.lang="en",n.className="svelte-1x79hk7"},m:function(e,i){o(e,n,i),r(n,a),r(n,g),r(n,p),r(n,m),r(n,_),r(_,v),r(v,M),r(M,y),r(v,T),r(T,x),r(_,k),r(_,S);for(var c=0;c<q.length;c+=1)q[c].m(S,null);t.refs.select=S,r(_,w),r(_,N),r(N,C),O&&O.m(N,null),j=!0},p:function(t,e){if(t.SURA&&(M.__value=e.SURA),M.value=M.__value,(t.$pagingType||t.SURA)&&A!==(A=e.$pagingType===e.SURA)&&(M.selected=A),t.PAGE&&(T.__value=e.PAGE),T.value=T.__value,(t.$pagingType||t.PAGE)&&b!==(b=e.$pagingType===e.PAGE)&&(T.selected=b),t.$pagingIndex||t.$pagingMeta){$=e.$pagingMeta;for(var n=0;n<$.length;n+=1){var a=V(e,$,n);q[n]?q[n].p(t,a):(q[n]=X(0,a),q[n].c(),q[n].m(S,null))}for(;n<q.length;n+=1)q[n].d(1);q.length=$.length}e.$pagingType===e.PAGE?O?O.p(t,e):((O=tt(0,e)).c(),O.m(N,null)):O&&(O.d(1),O=null)},i:function(t,e){j||this.m(t,e)},o:i,d:function(e){e&&c(n),f(a,"click",P),f(p,"click",E),f(v,"change",I),s(q,e),f(S,"change",H),t.refs.select===S&&(t.refs.select=null),O&&O.d()}}}(this,this._state),this.root._oncreate.push(function(){n.fire("update",{changed:function(t,e){for(var n in e)t[n]=1;return t}({},n._state),current:n._state})}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),M(this)),this._intro=!0}function nt(a){var i,s,l,f,d,g,p,m,_,v;A(this,a),this._state=e({},a.data),this._intro=!!a.intro,this._fragment=(i=this,this._state,m=new et({root:i.root,store:i.store}),_=new G({root:i.root,store:i.store}),v=new et({root:i.root,store:i.store}),{c:function(){s=u("main"),l=u("header"),m._fragment.c(),f=h("\n\t"),_._fragment.c(),d=h("\n\t"),g=u("footer"),v._fragment.c(),l.className="svelte-o5yzxk",g.className="svelte-o5yzxk",s.className="svelte-o5yzxk"},m:function(t,e){o(t,s,e),r(s,l),m._mount(l,null),r(s,f),_._mount(s,null),r(s,d),r(s,g),v._mount(g,null),p=!0},p:t,i:function(t,e){p||this.m(t,e)},o:function(t){p&&(t=n(t,3),m&&m._fragment.o(t),_&&_._fragment.o(t),v&&v._fragment.o(t),p=!1)},d:function(t){t&&c(s),m.destroy(),_.destroy(),v.destroy()}}),a.target&&(this._fragment.c(),this._mount(a.target,a.anchor),M(this)),this._intro=!0}function at(t,n){this._handlers={},this._dependents=[],this._computed=p(),this._sortedComputedProperties=[],this._state=e({},t),this._differs=n&&n.immutable?_:m}e(et.prototype,k),e(et.prototype,Y),e(nt.prototype,k),e(at.prototype,{_add:function(t,e){this._dependents.push({component:t,props:e})},_init:function(t){for(var e={},n=0;n<t.length;n+=1){var a=t[n];e["$"+a]=this._state[a]}return e},_remove:function(t){for(var e=this._dependents.length;e--;)if(this._dependents[e].component===t)return void this._dependents.splice(e,1)},_set:function(t,n){var a=this,i=this._state;this._state=e(e({},i),t);for(var r=0;r<this._sortedComputedProperties.length;r+=1)this._sortedComputedProperties[r].update(this._state,n);this.fire("state",{changed:n,previous:i,current:this._state}),this._dependents.filter(function(t){for(var e={},i=!1,r=0;r<t.props.length;r+=1){var o=t.props[r];o in n&&(e["$"+o]=a._state[o],i=!0)}if(i)return t.component._stage(e),!0}).forEach(function(t){t.component.set({})}),this.fire("update",{changed:n,previous:i,current:this._state})},_sortComputedProperties:function(){var t,e=this._computed,n=this._sortedComputedProperties=[],a=p();function i(r){var o=e[r];o&&(o.deps.forEach(function(e){if(e===t)throw new Error("Cyclical dependency detected between "+e+" <-> "+r);i(e)}),a[r]||(a[r]=!0,n.push(o)))}for(var r in this._computed)i(t=r)},compute:function(t,n,a){var i,r=this,o={deps:n,update:function(e,o,c){var s=n.map(function(t){return t in o&&(c=!0),e[t]});if(c){var u=a.apply(null,s);r._differs(u,i)&&(i=u,o[t]=!0,e[t]=i)}}};this._computed[t]=o,this._sortComputedProperties();var c=e({},this._state),s={};o.update(c,s,!0),this._set(c,s)},fire:v,get:y,on:T,set:function(t){var e=this._state,n=this._changed={},a=!1;for(var i in t){if(this._computed[i])throw new Error("'"+i+"' is a read-only computed property");this._differs(t[i],e[i])&&(n[i]=a=!0)}a&&this._set(t,n)}});var it,rt,ot=[[],[0,7,5,1,"الفاتحة","Al-Faatiha","The Opening","Meccan"],[7,286,87,40,"البقرة","Al-Baqara","The Cow","Medinan"],[293,200,89,20,"آل عمران","Aal-i-Imraan","The Family of Imraan","Medinan"],[493,176,92,24,"النساء","An-Nisaa","The Women","Medinan"],[669,120,112,16,"المائدة","Al-Maaida","The Table","Medinan"],[789,165,55,20,"الأنعام","Al-An'aam","The Cattle","Meccan"],[954,206,39,24,"الأعراف","Al-A'raaf","The Heights","Meccan"],[1160,75,88,10,"الأنفال","Al-Anfaal","The Spoils of War","Medinan"],[1235,129,113,16,"التوبة","At-Tawba","The Repentance","Medinan"],[1364,109,51,11,"يونس","Yunus","Jonas","Meccan"],[1473,123,52,10,"هود","Hud","Hud","Meccan"],[1596,111,53,12,"يوسف","Yusuf","Joseph","Meccan"],[1707,43,96,6,"الرعد","Ar-Ra'd","The Thunder","Medinan"],[1750,52,72,7,"ابراهيم","Ibrahim","Abraham","Meccan"],[1802,99,54,6,"الحجر","Al-Hijr","The Rock","Meccan"],[1901,128,70,16,"النحل","An-Nahl","The Bee","Meccan"],[2029,111,50,12,"الإسراء","Al-Israa","The Night Journey","Meccan"],[2140,110,69,12,"الكهف","Al-Kahf","The Cave","Meccan"],[2250,98,44,6,"مريم","Maryam","Mary","Meccan"],[2348,135,45,8,"طه","Taa-Haa","Taa-Haa","Meccan"],[2483,112,73,7,"الأنبياء","Al-Anbiyaa","The Prophets","Meccan"],[2595,78,103,10,"الحج","Al-Hajj","The Pilgrimage","Medinan"],[2673,118,74,6,"المؤمنون","Al-Muminoon","The Believers","Meccan"],[2791,64,102,9,"النور","An-Noor","The Light","Medinan"],[2855,77,42,6,"الفرقان","Al-Furqaan","The Criterion","Meccan"],[2932,227,47,11,"الشعراء","Ash-Shu'araa","The Poets","Meccan"],[3159,93,48,7,"النمل","An-Naml","The Ant","Meccan"],[3252,88,49,8,"القصص","Al-Qasas","The Stories","Meccan"],[3340,69,85,7,"العنكبوت","Al-Ankaboot","The Spider","Meccan"],[3409,60,84,6,"الروم","Ar-Room","The Romans","Meccan"],[3469,34,57,3,"لقمان","Luqman","Luqman","Meccan"],[3503,30,75,3,"السجدة","As-Sajda","The Prostration","Meccan"],[3533,73,90,9,"الأحزاب","Al-Ahzaab","The Clans","Medinan"],[3606,54,58,6,"سبإ","Saba","Sheba","Meccan"],[3660,45,43,5,"فاطر","Faatir","The Originator","Meccan"],[3705,83,41,5,"يس","Yaseen","Yaseen","Meccan"],[3788,182,56,5,"الصافات","As-Saaffaat","Those drawn up in Ranks","Meccan"],[3970,88,38,5,"ص","Saad","The letter Saad","Meccan"],[4058,75,59,8,"الزمر","Az-Zumar","The Groups","Meccan"],[4133,85,60,9,"غافر","Al-Ghaafir","The Forgiver","Meccan"],[4218,54,61,6,"فصلت","Fussilat","Explained in detail","Meccan"],[4272,53,62,5,"الشورى","Ash-Shura","Consultation","Meccan"],[4325,89,63,7,"الزخرف","Az-Zukhruf","Ornaments of gold","Meccan"],[4414,59,64,3,"الدخان","Ad-Dukhaan","The Smoke","Meccan"],[4473,37,65,4,"الجاثية","Al-Jaathiya","Crouching","Meccan"],[4510,35,66,4,"الأحقاف","Al-Ahqaf","The Dunes","Meccan"],[4545,38,95,4,"محمد","Muhammad","Muhammad","Medinan"],[4583,29,111,4,"الفتح","Al-Fath","The Victory","Medinan"],[4612,18,106,2,"الحجرات","Al-Hujuraat","The Inner Apartments","Medinan"],[4630,45,34,3,"ق","Qaaf","The letter Qaaf","Meccan"],[4675,60,67,3,"الذاريات","Adh-Dhaariyat","The Winnowing Winds","Meccan"],[4735,49,76,2,"الطور","At-Tur","The Mount","Meccan"],[4784,62,23,3,"النجم","An-Najm","The Star","Meccan"],[4846,55,37,3,"القمر","Al-Qamar","The Moon","Meccan"],[4901,78,97,3,"الرحمن","Ar-Rahmaan","The Beneficent","Medinan"],[4979,96,46,3,"الواقعة","Al-Waaqia","The Inevitable","Meccan"],[5075,29,94,4,"الحديد","Al-Hadid","The Iron","Medinan"],[5104,22,105,3,"المجادلة","Al-Mujaadila","The Pleading Woman","Medinan"],[5126,24,101,3,"الحشر","Al-Hashr","The Exile","Medinan"],[5150,13,91,2,"الممتحنة","Al-Mumtahana","She that is to be examined","Medinan"],[5163,14,109,2,"الصف","As-Saff","The Ranks","Medinan"],[5177,11,110,2,"الجمعة","Al-Jumu'a","Friday","Medinan"],[5188,11,104,2,"المنافقون","Al-Munaafiqoon","The Hypocrites","Medinan"],[5199,18,108,2,"التغابن","At-Taghaabun","Mutual Disillusion","Medinan"],[5217,12,99,2,"الطلاق","At-Talaaq","Divorce","Medinan"],[5229,12,107,2,"التحريم","At-Tahrim","The Prohibition","Medinan"],[5241,30,77,2,"الملك","Al-Mulk","The Sovereignty","Meccan"],[5271,52,2,2,"القلم","Al-Qalam","The Pen","Meccan"],[5323,52,78,2,"الحاقة","Al-Haaqqa","The Reality","Meccan"],[5375,44,79,2,"المعارج","Al-Ma'aarij","The Ascending Stairways","Meccan"],[5419,28,71,2,"نوح","Nooh","Noah","Meccan"],[5447,28,40,2,"الجن","Al-Jinn","The Jinn","Meccan"],[5475,20,3,2,"المزمل","Al-Muzzammil","The Enshrouded One","Meccan"],[5495,56,4,2,"المدثر","Al-Muddaththir","The Cloaked One","Meccan"],[5551,40,31,2,"القيامة","Al-Qiyaama","The Resurrection","Meccan"],[5591,31,98,2,"الانسان","Al-Insaan","Man","Medinan"],[5622,50,33,2,"المرسلات","Al-Mursalaat","The Emissaries","Meccan"],[5672,40,80,2,"النبإ","An-Naba","The Announcement","Meccan"],[5712,46,81,2,"النازعات","An-Naazi'aat","Those who drag forth","Meccan"],[5758,42,24,1,"عبس","Abasa","He frowned","Meccan"],[5800,29,7,1,"التكوير","At-Takwir","The Overthrowing","Meccan"],[5829,19,82,1,"الإنفطار","Al-Infitaar","The Cleaving","Meccan"],[5848,36,86,1,"المطففين","Al-Mutaffifin","Defrauding","Meccan"],[5884,25,83,1,"الإنشقاق","Al-Inshiqaaq","The Splitting Open","Meccan"],[5909,22,27,1,"البروج","Al-Burooj","The Constellations","Meccan"],[5931,17,36,1,"الطارق","At-Taariq","The Morning Star","Meccan"],[5948,19,8,1,"الأعلى","Al-A'laa","The Most High","Meccan"],[5967,26,68,1,"الغاشية","Al-Ghaashiya","The Overwhelming","Meccan"],[5993,30,10,1,"الفجر","Al-Fajr","The Dawn","Meccan"],[6023,20,35,1,"البلد","Al-Balad","The City","Meccan"],[6043,15,26,1,"الشمس","Ash-Shams","The Sun","Meccan"],[6058,21,9,1,"الليل","Al-Lail","The Night","Meccan"],[6079,11,11,1,"الضحى","Ad-Dhuhaa","The Morning Hours","Meccan"],[6090,8,12,1,"الشرح","Ash-Sharh","The Consolation","Meccan"],[6098,8,28,1,"التين","At-Tin","The Fig","Meccan"],[6106,19,1,1,"العلق","Al-Alaq","The Clot","Meccan"],[6125,5,25,1,"القدر","Al-Qadr","The Power, Fate","Meccan"],[6130,8,100,1,"البينة","Al-Bayyina","The Evidence","Medinan"],[6138,8,93,1,"الزلزلة","Az-Zalzala","The Earthquake","Medinan"],[6146,11,14,1,"العاديات","Al-Aadiyaat","The Chargers","Meccan"],[6157,11,30,1,"القارعة","Al-Qaari'a","The Calamity","Meccan"],[6168,8,16,1,"التكاثر","At-Takaathur","Competition","Meccan"],[6176,3,13,1,"العصر","Al-Asr","The Declining Day, Epoch","Meccan"],[6179,9,32,1,"الهمزة","Al-Humaza","The Traducer","Meccan"],[6188,5,19,1,"الفيل","Al-Fil","The Elephant","Meccan"],[6193,4,29,1,"قريش","Quraish","Quraysh","Meccan"],[6197,7,17,1,"الماعون","Al-Maa'un","Almsgiving","Meccan"],[6204,3,15,1,"الكوثر","Al-Kawthar","Abundance","Meccan"],[6207,6,18,1,"الكافرون","Al-Kaafiroon","The Disbelievers","Meccan"],[6213,3,114,1,"النصر","An-Nasr","Divine Support","Medinan"],[6216,5,6,1,"المسد","Al-Masad","The Palm Fibre","Meccan"],[6221,4,22,1,"الإخلاص","Al-Ikhlaas","Sincerity","Meccan"],[6225,5,20,1,"الفلق","Al-Falaq","The Dawn","Meccan"],[6230,6,21,1,"الناس","An-Naas","Mankind","Meccan"],[6236,1]],ct=[[],[1,1],[2,1],[2,8],[2,21],[2,30],[2,40],[2,47],[2,60],[2,62],[2,72],[2,83],[2,87],[2,97],[2,104],[2,113],[2,122],[2,130],[2,142],[2,148],[2,153],[2,164],[2,168],[2,177],[2,183],[2,189],[2,197],[2,211],[2,217],[2,222],[2,229],[2,232],[2,236],[2,243],[2,249],[2,254],[2,258],[2,261],[2,267],[2,274],[2,282],[2,284],[3,1],[3,10],[3,21],[3,31],[3,42],[3,55],[3,64],[3,72],[3,81],[3,92],[3,102],[3,110],[3,121],[3,130],[3,144],[3,149],[3,156],[3,172],[3,181],[3,190],[4,1],[4,11],[4,15],[4,23],[4,26],[4,34],[4,43],[4,51],[4,60],[4,71],[4,77],[4,88],[4,92],[4,97],[4,101],[4,105],[4,113],[4,116],[4,127],[4,135],[4,142],[4,153],[4,163],[4,172],[5,1],[5,6],[5,12],[5,20],[5,27],[5,35],[5,44],[5,51],[5,57],[5,67],[5,78],[5,87],[5,94],[5,101],[5,109],[5,116],[6,1],[6,11],[6,21],[6,31],[6,42],[6,51],[6,56],[6,61],[6,71],[6,83],[6,91],[6,95],[6,101],[6,111],[6,122],[6,130],[6,141],[6,145],[6,151],[6,155],[7,1],[7,11],[7,26],[7,32],[7,40],[7,48],[7,54],[7,59],[7,65],[7,73],[7,85],[7,94],[7,100],[7,109],[7,127],[7,130],[7,142],[7,148],[7,152],[7,158],[7,163],[7,172],[7,182],[7,189],[8,1],[8,11],[8,20],[8,29],[8,38],[8,45],[8,49],[8,59],[8,65],[8,70],[9,1],[9,7],[9,17],[9,25],[9,30],[9,38],[9,43],[9,60],[9,67],[9,73],[9,81],[9,90],[9,100],[9,111],[9,119],[9,123],[10,1],[10,11],[10,21],[10,31],[10,41],[10,54],[10,61],[10,71],[10,83],[10,93],[10,104],[11,1],[11,9],[11,25],[11,36],[11,50],[11,61],[11,69],[11,84],[11,96],[11,110],[12,1],[12,7],[12,21],[12,30],[12,36],[12,43],[12,50],[12,58],[12,69],[12,80],[12,94],[12,105],[13,1],[13,8],[13,19],[13,27],[13,32],[13,38],[14,1],[14,7],[14,13],[14,22],[14,28],[14,35],[14,42],[15,1],[15,16],[15,26],[15,45],[15,61],[15,80],[16,1],[16,10],[16,22],[16,26],[16,35],[16,41],[16,51],[16,61],[16,66],[16,71],[16,77],[16,84],[16,90],[16,101],[16,111],[16,120],[17,1],[17,11],[17,23],[17,31],[17,41],[17,53],[17,61],[17,71],[17,78],[17,85],[17,94],[17,101],[18,1],[18,13],[18,18],[18,23],[18,32],[18,45],[18,50],[18,54],[18,60],[18,71],[18,83],[18,102],[19,1],[19,16],[19,41],[19,51],[19,66],[19,83],[20,1],[20,25],[20,55],[20,77],[20,90],[20,105],[20,116],[20,129],[21,1],[21,11],[21,30],[21,42],[21,51],[21,76],[21,94],[22,1],[22,11],[22,23],[22,26],[22,34],[22,39],[22,49],[22,58],[22,65],[22,73],[23,1],[23,23],[23,33],[23,51],[23,78],[23,93],[24,1],[24,11],[24,21],[24,27],[24,35],[24,41],[24,51],[24,58],[24,62],[25,1],[25,10],[25,21],[25,35],[25,45],[25,61],[26,1],[26,10],[26,34],[26,53],[26,70],[26,105],[26,123],[26,141],[26,160],[26,176],[26,192],[27,1],[27,15],[27,32],[27,45],[27,59],[27,67],[27,83],[28,1],[28,14],[28,22],[28,29],[28,43],[28,51],[28,61],[28,76],[29,1],[29,14],[29,23],[29,31],[29,45],[29,52],[29,64],[30,1],[30,11],[30,20],[30,28],[30,41],[30,54],[31,1],[31,12],[31,20],[32,1],[32,12],[32,23],[33,1],[33,9],[33,21],[33,28],[33,35],[33,41],[33,53],[33,59],[33,69],[34,1],[34,10],[34,22],[34,31],[34,37],[34,46],[35,1],[35,8],[35,15],[35,27],[35,38],[36,1],[36,13],[36,33],[36,51],[36,68],[37,1],[37,22],[37,75],[37,114],[37,139],[38,1],[38,15],[38,27],[38,41],[38,65],[39,1],[39,10],[39,22],[39,32],[39,42],[39,53],[39,64],[39,71],[40,1],[40,10],[40,21],[40,28],[40,38],[40,51],[40,61],[40,69],[40,79],[41,1],[41,9],[41,19],[41,26],[41,33],[41,45],[42,1],[42,10],[42,20],[42,30],[42,44],[43,1],[43,16],[43,26],[43,36],[43,46],[43,57],[43,68],[44,1],[44,30],[44,43],[45,1],[45,12],[45,22],[45,27],[46,1],[46,11],[46,21],[46,27],[47,1],[47,12],[47,20],[47,29],[48,1],[48,11],[48,18],[48,27],[49,1],[49,11],[50,1],[50,16],[50,30],[51,1],[51,24],[51,47],[52,1],[52,29],[53,1],[53,26],[53,33],[54,1],[54,23],[54,41],[55,1],[55,26],[55,46],[56,1],[56,39],[56,75],[57,1],[57,11],[57,20],[57,26],[58,1],[58,7],[58,14],[59,1],[59,11],[59,18],[60,1],[60,7],[61,1],[61,10],[62,1],[62,9],[63,1],[63,9],[64,1],[64,11],[65,1],[65,8],[66,1],[66,8],[67,1],[67,15],[68,1],[68,34],[69,1],[69,38],[70,1],[70,36],[71,1],[71,21],[72,1],[72,20],[73,1],[73,20],[74,1],[74,32],[75,1],[75,31],[76,1],[76,23],[77,1],[77,41],[78,1],[78,31],[79,1],[79,27],[80,1],[81,1],[82,1],[83,1],[84,1],[85,1],[86,1],[87,1],[88,1],[89,1],[90,1],[91,1],[92,1],[93,1],[94,1],[95,1],[96,1],[97,1],[98,1],[99,1],[100,1],[101,1],[102,1],[103,1],[104,1],[105,1],[106,1],[107,1],[108,1],[109,1],[110,1],[111,1],[112,1],[113,1],[114,1]],st=[[],[1,1],[2,1],[2,6],[2,17],[2,25],[2,30],[2,38],[2,49],[2,58],[2,62],[2,70],[2,77],[2,84],[2,89],[2,94],[2,102],[2,106],[2,113],[2,120],[2,127],[2,135],[2,142],[2,146],[2,154],[2,164],[2,170],[2,177],[2,182],[2,187],[2,191],[2,197],[2,203],[2,211],[2,216],[2,220],[2,225],[2,231],[2,234],[2,238],[2,246],[2,249],[2,253],[2,257],[2,260],[2,265],[2,270],[2,275],[2,282],[2,283],[3,1],[3,10],[3,16],[3,23],[3,30],[3,38],[3,46],[3,53],[3,62],[3,71],[3,78],[3,84],[3,92],[3,101],[3,109],[3,116],[3,122],[3,133],[3,141],[3,149],[3,154],[3,158],[3,166],[3,174],[3,181],[3,187],[3,195],[4,1],[4,7],[4,12],[4,15],[4,20],[4,24],[4,27],[4,34],[4,38],[4,45],[4,52],[4,60],[4,66],[4,75],[4,80],[4,87],[4,92],[4,95],[4,102],[4,106],[4,114],[4,122],[4,128],[4,135],[4,141],[4,148],[4,155],[4,163],[4,171],[4,176],[5,3],[5,6],[5,10],[5,14],[5,18],[5,24],[5,32],[5,37],[5,42],[5,46],[5,51],[5,58],[5,65],[5,71],[5,77],[5,83],[5,90],[5,96],[5,104],[5,109],[5,114],[6,1],[6,9],[6,19],[6,28],[6,36],[6,45],[6,53],[6,60],[6,69],[6,74],[6,82],[6,91],[6,95],[6,102],[6,111],[6,119],[6,125],[6,132],[6,138],[6,143],[6,147],[6,152],[6,158],[7,1],[7,12],[7,23],[7,31],[7,38],[7,44],[7,52],[7,58],[7,68],[7,74],[7,82],[7,88],[7,96],[7,105],[7,121],[7,131],[7,138],[7,144],[7,150],[7,156],[7,160],[7,164],[7,171],[7,179],[7,188],[7,196],[8,1],[8,9],[8,17],[8,26],[8,34],[8,41],[8,46],[8,53],[8,62],[8,70],[9,1],[9,7],[9,14],[9,21],[9,27],[9,32],[9,37],[9,41],[9,48],[9,55],[9,62],[9,69],[9,73],[9,80],[9,87],[9,94],[9,100],[9,107],[9,112],[9,118],[9,123],[10,1],[10,7],[10,15],[10,21],[10,26],[10,34],[10,43],[10,54],[10,62],[10,71],[10,79],[10,89],[10,98],[10,107],[11,6],[11,13],[11,20],[11,29],[11,38],[11,46],[11,54],[11,63],[11,72],[11,82],[11,89],[11,98],[11,109],[11,118],[12,5],[12,15],[12,23],[12,31],[12,38],[12,44],[12,53],[12,64],[12,70],[12,79],[12,87],[12,96],[12,104],[13,1],[13,6],[13,14],[13,19],[13,29],[13,35],[13,43],[14,6],[14,11],[14,19],[14,25],[14,34],[14,43],[15,1],[15,16],[15,32],[15,52],[15,71],[15,91],[16,7],[16,15],[16,27],[16,35],[16,43],[16,55],[16,65],[16,73],[16,80],[16,88],[16,94],[16,103],[16,111],[16,119],[17,1],[17,8],[17,18],[17,28],[17,39],[17,50],[17,59],[17,67],[17,76],[17,87],[17,97],[17,105],[18,5],[18,16],[18,21],[18,28],[18,35],[18,46],[18,54],[18,62],[18,75],[18,84],[18,98],[19,1],[19,12],[19,26],[19,39],[19,52],[19,65],[19,77],[19,96],[20,13],[20,38],[20,52],[20,65],[20,77],[20,88],[20,99],[20,114],[20,126],[21,1],[21,11],[21,25],[21,36],[21,45],[21,58],[21,73],[21,82],[21,91],[21,102],[22,1],[22,6],[22,16],[22,24],[22,31],[22,39],[22,47],[22,56],[22,65],[22,73],[23,1],[23,18],[23,28],[23,43],[23,60],[23,75],[23,90],[23,105],[24,1],[24,11],[24,21],[24,28],[24,32],[24,37],[24,44],[24,54],[24,59],[24,62],[25,3],[25,12],[25,21],[25,33],[25,44],[25,56],[25,68],[26,1],[26,20],[26,40],[26,61],[26,84],[26,112],[26,137],[26,160],[26,184],[26,207],[27,1],[27,14],[27,23],[27,36],[27,45],[27,56],[27,64],[27,77],[27,89],[28,6],[28,14],[28,22],[28,29],[28,36],[28,44],[28,51],[28,60],[28,71],[28,78],[28,85],[29,7],[29,15],[29,24],[29,31],[29,39],[29,46],[29,53],[29,64],[30,6],[30,16],[30,25],[30,33],[30,42],[30,51],[31,1],[31,12],[31,20],[31,29],[32,1],[32,12],[32,21],[33,1],[33,7],[33,16],[33,23],[33,31],[33,36],[33,44],[33,51],[33,55],[33,63],[34,1],[34,8],[34,15],[34,23],[34,32],[34,40],[34,49],[35,4],[35,12],[35,19],[35,31],[35,39],[35,45],[36,13],[36,28],[36,41],[36,55],[36,71],[37,1],[37,25],[37,52],[37,77],[37,103],[37,127],[37,154],[38,1],[38,17],[38,27],[38,43],[38,62],[38,84],[39,6],[39,11],[39,22],[39,32],[39,41],[39,48],[39,57],[39,68],[39,75],[40,8],[40,17],[40,26],[40,34],[40,41],[40,50],[40,59],[40,67],[40,78],[41,1],[41,12],[41,21],[41,30],[41,39],[41,47],[42,1],[42,11],[42,16],[42,23],[42,32],[42,45],[42,52],[43,11],[43,23],[43,34],[43,48],[43,61],[43,74],[44,1],[44,19],[44,40],[45,1],[45,14],[45,23],[45,33],[46,6],[46,15],[46,21],[46,29],[47,1],[47,12],[47,20],[47,30],[48,1],[48,10],[48,16],[48,24],[48,29],[49,5],[49,12],[50,1],[50,16],[50,36],[51,7],[51,31],[51,52],[52,15],[52,32],[53,1],[53,27],[53,45],[54,7],[54,28],[54,50],[55,17],[55,41],[55,68],[56,17],[56,51],[56,77],[57,4],[57,12],[57,19],[57,25],[58,1],[58,7],[58,12],[58,22],[59,4],[59,10],[59,17],[60,1],[60,6],[60,12],[61,6],[62,1],[62,9],[63,5],[64,1],[64,10],[65,1],[65,6],[66,1],[66,8],[67,1],[67,13],[67,27],[68,16],[68,43],[69,9],[69,35],[70,11],[70,40],[71,11],[72,1],[72,14],[73,1],[73,20],[74,18],[74,48],[75,20],[76,6],[76,26],[77,20],[78,1],[78,31],[79,16],[80,1],[81,1],[82,1],[83,7],[83,35],[85,1],[86,1],[87,16],[89,1],[89,24],[91,1],[92,15],[95,1],[97,1],[98,8],[100,10],[103,1],[106,1],[109,1],[112,1],[115,1]],ut=[[],[7,206,"recommended"],[13,15,"recommended"],[16,50,"recommended"],[17,109,"recommended"],[19,58,"recommended"],[22,18,"recommended"],[22,77,"recommended"],[25,60,"recommended"],[27,26,"recommended"],[32,15,"obligatory"],[38,24,"recommended"],[41,38,"obligatory"],[53,62,"obligatory"],[84,21,"recommended"],[96,19,"obligatory"]];function ht(t){return ot[t]}function lt(t,e){return function(t,e){return t[0]+Math.min(t[1],e-1)}(ht(t),e)}function ft(t,e,n){switch(e){case Q:case W:return t.slice(function(t,e){switch(t){case Q:return lt.apply(null,st[e]);case W:return ot[e][0];default:return-1}}(e,n),function(t,e){switch(t){case Q:return lt.apply(null,st[e+1]);case W:return ot[e][0]+ot[e][1];default:return-1}}(e,n));default:return[]}}var dt={};dt[Q]=st.length-1,dt[W]=ot.length-1;var gt=new at({quran:[],pagingType:Q,pagingIndex:1,page:[]});function pt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function mt(t,e){for(var n in e)t[n]=e[n];return t}gt.compute(Q,["quran",U,J],function(t,e,n){return i=ft(t,e,n),a=i.reduce(function(t,e){var n=e.sura.toString();return Object.prototype.hasOwnProperty.call(t,n)||(t[n]=[]),t[n].push(e),t},{}),Object.keys(a).map(function(t){return{meta:ht(t),data:a[t]}});var a,i}),gt.compute("pagingTotal",[U],function(t){return dt[t]||0}),gt.compute("pagingMeta",[U],function(t){switch(t){case Q:return it||(it=st.reduce(function(t,e,n,a){return e.length&&n+1!==a.length&&t.push(n.toString()),t},[]));case W:return rt||(rt=ot.reduce(function(t,e,n){var a;return(a=e[4])&&t.push(a+" "+e[5]),t},[]));default:return[]}});var _t=Object.assign||function(){for(var t=arguments,e=t[0],n=1,a=t.length;n<a;n++)e=mt(e,t[n]);return e};function vt(t){return t<1048576?Math.round(100*t/1024)/100+" KB":function(t){return Math.round(100*t/1048576)/100+" MB"}(t)}function Mt(t,e){return 0===e?function(t){return t<1024?t+" B":vt(t)}(t):Math.round(100*t/e)+"%"}var yt=document.location,At="#!/",Tt=/#!\/((page)|(sura))\/(\d+)/,xt="page/1";function bt(t){return function(e){var n=(yt.hash,Tt.exec(yt.hash)||kt(xt)&&!1),a=n[1];n&&t.set({pagingType:a,pagingIndex:function(t,e){return Math.max(1,Math.min(dt[t]-1,parseInt(e,10)))}(a,n[4])})}}function kt(t){return yt.hash=At+t}function St(t){var e=t.changed,n=t.current;(pt(e,J)||pt(e,U))&&kt(n.pagingType+"/"+n.pagingIndex)}var wt={init:function(t){var e=bt(t);window.addEventListener("hashchange",e),t.on("state",St),e()},navigate:kt};function Nt(t){return function(t){return ct.forEach(function(e,n){n>1&&(t[lt(e[0],e[1])-1].ruku=n-1)}),t[t.length-2].ruku=ct.length,t}(function(t){return ut.forEach(function(e,n){n&&(t[lt(e[0],e[1])].sajda=e[2])}),t}(function(t){return Array.prototype.concat.apply([],ot.map(function(e,n){return t.slice(e[0],e[0]+e[1]).map(function(t,e){return Object.create(null,{text:{value:0===e?j(t):t},aya:{value:e+1},sura:{value:n}})})}))}(t)))}var Ct,jt=document.getElementById("preloader");function Pt(t){jt.childNodes[0].innerHTML=t}Pt("connecting server..."),Ct={url:"data/quran-simple.txt",progress:function(t){Pt("loading data "+Mt(t.loaded,t.total))},success:function(t){jt.parentNode.removeChild(jt),jt=null,gt.set({quran:Nt(t.target.responseText.replace(/\r?\n|\r/g,"|").split("|"))}),wt.init(gt),new nt({target:document.body,store:gt})},error:function(t){var e;Pt((e=t.target).statusText+": "+e.responseURL)}},function(t,e){t.onprogress=e.progress,t.onreadystatechange=function(t){!function(t,e){4===t.target.readyState&&function(t,e){t.target.status<400?e.success(t):e.error(t)}(t,e)}(t,e)},t.open(e.method||"GET",e.url,!0),t.send(e.data)}(new XMLHttpRequest,function(t){return _t({},t)}(Ct)),"serviceWorker"in navigator&&(navigator.serviceWorker.register("sw.js"),navigator.serviceWorker.ready.then(function(){}))}();
//# sourceMappingURL=bundle.js.map
