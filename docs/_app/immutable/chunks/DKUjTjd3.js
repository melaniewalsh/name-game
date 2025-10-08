var Lu=Object.defineProperty;var yo=t=>{throw TypeError(t)};var Uu=(t,e,n)=>e in t?Lu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var vo=(t,e,n)=>Uu(t,typeof e!="symbol"?e+"":e,n),Jr=(t,e,n)=>e.has(t)||yo("Cannot "+n);var He=(t,e,n)=>(Jr(t,e,"read from private field"),n?n.call(t):e.get(t)),nn=(t,e,n)=>e.has(t)?yo("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),ei=(t,e,n,r)=>(Jr(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),wo=(t,e,n)=>(Jr(t,e,"access private method"),n);import{h as Ue,a as il,b as sl,aY as $u,p as ol,c as hs,d as At,U as Bu,g as Co,aZ as Wu,v as Hu,w as Eo,x as ti,y as ni,X as Vu,z as al,a_ as ri,a0 as ll,aa as bo,a$ as To,m as Yu,b0 as So,b1 as fs,b2 as zu,_ as qu,b3 as Gu,aT as ju,b4 as ds,b5 as Ku,V as Qu,T as Xu,a6 as Zu,ae as Ju,D as eh,b6 as cl,b7 as th,an as nh,C as ul,B as rh,A as ih}from"./6QfFowuy.js";function qw(t,e,n){Ue&&il();var r=t,i=Bu,s,o=$u;sl(()=>{o(i,i=e())&&(s&&ol(s),s=hs(()=>n(r)))}),Ue&&(r=At)}function Gw(t,e){return e}function sh(t,e,n,r){for(var i=[],s=e.length,o=0;o<s;o++)zu(e[o].e,i,!0);var a=s>0&&i.length===0&&n!==null;if(a){var l=n.parentNode;qu(l),l.append(n),r.clear(),et(t,e[0].prev,e[s-1].next)}Gu(i,()=>{for(var c=0;c<s;c++){var u=e[c];a||(r.delete(u.k),et(t,u.prev,u.next)),ju(u.e,!a)}})}function jw(t,e,n,r,i,s=null){var o=t,a={flags:e,items:new Map,first:null},l=(e&cl)!==0;if(l){var c=t;o=Ue?ti(Xu(c)):c.appendChild(Zu())}Ue&&il();var u=null,h=!1,f=Wu(()=>{var d=n();return Ju(d)?d:d==null?[]:ll(d)});sl(()=>{var d=Co(f),p=d.length;if(h&&p===0)return;h=p===0;let v=!1;if(Ue){var C=o.data===Hu;C!==(p===0)&&(o=Eo(),ti(o),ni(!1),v=!0)}if(Ue){for(var D=null,O,S=0;S<p;S++){if(At.nodeType===8&&At.data===Vu){o=At,v=!0,ni(!1);break}var E=d[S],b=r(E,S);O=hl(At,a,D,null,E,b,S,i,e,n),a.items.set(b,O),D=O}p>0&&ti(Eo())}Ue||oh(d,a,o,i,e,r,n),s!==null&&(p===0?u?al(u):u=hs(()=>s(o)):u!==null&&ol(u,()=>{u=null})),v&&ni(!0),Co(f)}),Ue&&(o=At)}function oh(t,e,n,r,i,s,o){var pe,xe,be,Ne;var a=(i&th)!==0,l=(i&(ds|fs))!==0,c=t.length,u=e.items,h=e.first,f=h,d,p=null,v,C=[],D=[],O,S,E,b;if(a)for(b=0;b<c;b+=1)O=t[b],S=s(O,b),E=u.get(S),E!==void 0&&((pe=E.a)==null||pe.measure(),(v??(v=new Set)).add(E));for(b=0;b<c;b+=1){if(O=t[b],S=s(O,b),E=u.get(S),E===void 0){var x=f?f.e.nodes_start:n;p=hl(x,e,p,p===null?e.first:p.next,O,S,b,r,i,o),u.set(S,p),C=[],D=[],f=p.next;continue}if(l&&ah(E,O,b,i),(E.e.f&ri)!==0&&(al(E.e),a&&((xe=E.a)==null||xe.unfix(),(v??(v=new Set)).delete(E))),E!==f){if(d!==void 0&&d.has(E)){if(C.length<D.length){var U=D[0],G;p=U.prev;var we=C[0],de=C[C.length-1];for(G=0;G<C.length;G+=1)Io(C[G],U,n);for(G=0;G<D.length;G+=1)d.delete(D[G]);et(e,we.prev,de.next),et(e,p,we),et(e,de,U),f=U,p=de,b-=1,C=[],D=[]}else d.delete(E),Io(E,f,n),et(e,E.prev,E.next),et(e,E,p===null?e.first:p.next),et(e,p,E),p=E;continue}for(C=[],D=[];f!==null&&f.k!==S;)(f.e.f&ri)===0&&(d??(d=new Set)).add(f),D.push(f),f=f.next;if(f===null)continue;E=f}C.push(E),p=E,f=E.next}if(f!==null||d!==void 0){for(var R=d===void 0?[]:ll(d);f!==null;)(f.e.f&ri)===0&&R.push(f),f=f.next;var ee=R.length;if(ee>0){var te=(i&cl)!==0&&c===0?n:null;if(a){for(b=0;b<ee;b+=1)(be=R[b].a)==null||be.measure();for(b=0;b<ee;b+=1)(Ne=R[b].a)==null||Ne.fix()}sh(e,R,te,u)}}a&&eh(()=>{var Me;if(v!==void 0)for(E of v)(Me=E.a)==null||Me.apply()}),bo.first=e.first&&e.first.e,bo.last=p&&p.e}function ah(t,e,n,r){(r&ds)!==0&&To(t.v,e),(r&fs)!==0?To(t.i,n):t.i=n}function hl(t,e,n,r,i,s,o,a,l,c){var u=(l&ds)!==0,h=(l&Ku)===0,f=u?h?Yu(i):So(i):i,d=(l&fs)===0?o:So(o),p={i:d,v:f,k:s,a:null,e:null,prev:n,next:r};try{return p.e=hs(()=>a(t,f,d,c),Ue),p.e.prev=n&&n.e,p.e.next=r&&r.e,n===null?e.first=p:(n.next=p,n.e.next=p.e),r!==null&&(r.prev=p,r.e.prev=p.e),p}finally{}}function Io(t,e,n){for(var r=t.next?t.next.e.nodes_start:n,i=e?e.e.nodes_start:n,s=t.e.nodes_start;s!==r;){var o=Qu(s);i.before(s),s=o}}function et(t,e,n){e===null?t.first=n:(e.next=n,e.e.next=n&&n.e),n!==null&&(n.prev=e,n.e.prev=e&&e.e)}function Kw(t,e,n=e){nh(t,"input",r=>{var i=r?t.defaultValue:t.value;if(i=ii(t)?si(i):i,n(i),i!==(i=e())){var s=t.selectionStart,o=t.selectionEnd;t.value=i??"",o!==null&&(t.selectionStart=s,t.selectionEnd=Math.min(o,t.value.length))}}),(Ue&&t.defaultValue!==t.value||ul(e)==null&&t.value)&&n(ii(t)?si(t.value):t.value),rh(()=>{var r=e();ii(t)&&r===si(t.value)||t.type==="date"&&!r&&!t.value||r!==t.value&&(t.value=r??"")})}function ii(t){var e=t.type;return e==="number"||e==="range"}function si(t){return t===""?null:+t}var tt,$t,Fn,Dr,fl;const Pr=class Pr{constructor(e){nn(this,Dr);nn(this,tt,new WeakMap);nn(this,$t);nn(this,Fn);ei(this,Fn,e)}observe(e,n){var r=He(this,tt).get(e)||new Set;return r.add(n),He(this,tt).set(e,r),wo(this,Dr,fl).call(this).observe(e,He(this,Fn)),()=>{var i=He(this,tt).get(e);i.delete(n),i.size===0&&(He(this,tt).delete(e),He(this,$t).unobserve(e))}}};tt=new WeakMap,$t=new WeakMap,Fn=new WeakMap,Dr=new WeakSet,fl=function(){return He(this,$t)??ei(this,$t,new ResizeObserver(e=>{for(var n of e){Pr.entries.set(n.target,n);for(var r of He(this,tt).get(n.target)||[])r(n)}}))},vo(Pr,"entries",new WeakMap);let Ai=Pr;var lh=new Ai({box:"border-box"});function Qw(t,e,n){var r=lh.observe(t,()=>n(t[e]));ih(()=>(ul(()=>n(t[e])),r))}function Zn(t,e){return t==null||e==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function ch(t,e){return t==null||e==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function _s(t){let e,n,r;t.length!==2?(e=Zn,n=(a,l)=>Zn(t(a),l),r=(a,l)=>t(a)-l):(e=t===Zn||t===ch?t:uh,n=t,r=t);function i(a,l,c=0,u=a.length){if(c<u){if(e(l,l)!==0)return u;do{const h=c+u>>>1;n(a[h],l)<0?c=h+1:u=h}while(c<u)}return c}function s(a,l,c=0,u=a.length){if(c<u){if(e(l,l)!==0)return u;do{const h=c+u>>>1;n(a[h],l)<=0?c=h+1:u=h}while(c<u)}return c}function o(a,l,c=0,u=a.length){const h=i(a,l,c,u-1);return h>c&&r(a[h-1],l)>-r(a[h],l)?h-1:h}return{left:i,center:o,right:s}}function uh(){return 0}function hh(t){return t===null?NaN:+t}const fh=_s(Zn),dh=fh.right;_s(hh).center;const _h=Math.sqrt(50),ph=Math.sqrt(10),gh=Math.sqrt(2);function rr(t,e,n){const r=(e-t)/Math.max(0,n),i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i),o=s>=_h?10:s>=ph?5:s>=gh?2:1;let a,l,c;return i<0?(c=Math.pow(10,-i)/o,a=Math.round(t*c),l=Math.round(e*c),a/c<t&&++a,l/c>e&&--l,c=-c):(c=Math.pow(10,i)*o,a=Math.round(t/c),l=Math.round(e/c),a*c<t&&++a,l*c>e&&--l),l<a&&.5<=n&&n<2?rr(t,e,n*2):[a,l,c]}function mh(t,e,n){if(e=+e,t=+t,n=+n,!(n>0))return[];if(t===e)return[t];const r=e<t,[i,s,o]=r?rr(e,t,n):rr(t,e,n);if(!(s>=i))return[];const a=s-i+1,l=new Array(a);if(r)if(o<0)for(let c=0;c<a;++c)l[c]=(s-c)/-o;else for(let c=0;c<a;++c)l[c]=(s-c)*o;else if(o<0)for(let c=0;c<a;++c)l[c]=(i+c)/-o;else for(let c=0;c<a;++c)l[c]=(i+c)*o;return l}function Ri(t,e,n){return e=+e,t=+t,n=+n,rr(t,e,n)[2]}function ki(t,e,n){e=+e,t=+t,n=+n;const r=e<t,i=r?Ri(e,t,n):Ri(t,e,n);return(r?-1:1)*(i<0?1/-i:i)}function Xw(t,e){let n;if(e===void 0)for(const r of t)r!=null&&(n<r||n===void 0&&r>=r)&&(n=r);else{let r=-1;for(let i of t)(i=e(i,++r,t))!=null&&(n<i||n===void 0&&i>=i)&&(n=i)}return n}function Zw(t,e,n){t=+t,e=+e,n=(i=arguments.length)<2?(e=t,t=0,1):i<3?1:+n;for(var r=-1,i=Math.max(0,Math.ceil((e-t)/n))|0,s=new Array(i);++r<i;)s[r]=t+r*n;return s}function yh(t){return t}var oi=1,ai=2,Di=3,dn=4,xo=1e-6;function vh(t){return"translate("+t+",0)"}function wh(t){return"translate(0,"+t+")"}function Ch(t){return e=>+t(e)}function Eh(t,e){return e=Math.max(0,t.bandwidth()-e*2)/2,t.round()&&(e=Math.round(e)),n=>+t(n)+e}function bh(){return!this.__axis}function dl(t,e){var n=[],r=null,i=null,s=6,o=6,a=3,l=typeof window<"u"&&window.devicePixelRatio>1?0:.5,c=t===oi||t===dn?-1:1,u=t===dn||t===ai?"x":"y",h=t===oi||t===Di?vh:wh;function f(d){var p=r??(e.ticks?e.ticks.apply(e,n):e.domain()),v=i??(e.tickFormat?e.tickFormat.apply(e,n):yh),C=Math.max(s,0)+a,D=e.range(),O=+D[0]+l,S=+D[D.length-1]+l,E=(e.bandwidth?Eh:Ch)(e.copy(),l),b=d.selection?d.selection():d,x=b.selectAll(".domain").data([null]),U=b.selectAll(".tick").data(p,e).order(),G=U.exit(),we=U.enter().append("g").attr("class","tick"),de=U.select("line"),R=U.select("text");x=x.merge(x.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),U=U.merge(we),de=de.merge(we.append("line").attr("stroke","currentColor").attr(u+"2",c*s)),R=R.merge(we.append("text").attr("fill","currentColor").attr(u,c*C).attr("dy",t===oi?"0em":t===Di?"0.71em":"0.32em")),d!==b&&(x=x.transition(d),U=U.transition(d),de=de.transition(d),R=R.transition(d),G=G.transition(d).attr("opacity",xo).attr("transform",function(ee){return isFinite(ee=E(ee))?h(ee+l):this.getAttribute("transform")}),we.attr("opacity",xo).attr("transform",function(ee){var te=this.parentNode.__axis;return h((te&&isFinite(te=te(ee))?te:E(ee))+l)})),G.remove(),x.attr("d",t===dn||t===ai?o?"M"+c*o+","+O+"H"+l+"V"+S+"H"+c*o:"M"+l+","+O+"V"+S:o?"M"+O+","+c*o+"V"+l+"H"+S+"V"+c*o:"M"+O+","+l+"H"+S),U.attr("opacity",1).attr("transform",function(ee){return h(E(ee)+l)}),de.attr(u+"2",c*s),R.attr(u,c*C).text(v),b.filter(bh).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===ai?"start":t===dn?"end":"middle"),b.each(function(){this.__axis=E})}return f.scale=function(d){return arguments.length?(e=d,f):e},f.ticks=function(){return n=Array.from(arguments),f},f.tickArguments=function(d){return arguments.length?(n=d==null?[]:Array.from(d),f):n.slice()},f.tickValues=function(d){return arguments.length?(r=d==null?null:Array.from(d),f):r&&r.slice()},f.tickFormat=function(d){return arguments.length?(i=d,f):i},f.tickSize=function(d){return arguments.length?(s=o=+d,f):s},f.tickSizeInner=function(d){return arguments.length?(s=+d,f):s},f.tickSizeOuter=function(d){return arguments.length?(o=+d,f):o},f.tickPadding=function(d){return arguments.length?(a=+d,f):a},f.offset=function(d){return arguments.length?(l=+d,f):l},f}function Jw(t){return dl(Di,t)}function eC(t){return dl(dn,t)}var Th={value:()=>{}};function _l(){for(var t=0,e=arguments.length,n={},r;t<e;++t){if(!(r=arguments[t]+"")||r in n||/[\s.]/.test(r))throw new Error("illegal type: "+r);n[r]=[]}return new Jn(n)}function Jn(t){this._=t}function Sh(t,e){return t.trim().split(/^|\s+/).map(function(n){var r="",i=n.indexOf(".");if(i>=0&&(r=n.slice(i+1),n=n.slice(0,i)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:r}})}Jn.prototype=_l.prototype={constructor:Jn,on:function(t,e){var n=this._,r=Sh(t+"",n),i,s=-1,o=r.length;if(arguments.length<2){for(;++s<o;)if((i=(t=r[s]).type)&&(i=Ih(n[i],t.name)))return i;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++s<o;)if(i=(t=r[s]).type)n[i]=No(n[i],t.name,e);else if(e==null)for(i in n)n[i]=No(n[i],t.name,null);return this},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new Jn(t)},call:function(t,e){if((i=arguments.length-2)>0)for(var n=new Array(i),r=0,i,s;r<i;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(s=this._[t],r=0,i=s.length;r<i;++r)s[r].value.apply(e,n)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,s=r.length;i<s;++i)r[i].value.apply(e,n)}};function Ih(t,e){for(var n=0,r=t.length,i;n<r;++n)if((i=t[n]).name===e)return i.value}function No(t,e,n){for(var r=0,i=t.length;r<i;++r)if(t[r].name===e){t[r]=Th,t=t.slice(0,r).concat(t.slice(r+1));break}return n!=null&&t.push({name:e,value:n}),t}var Pi="http://www.w3.org/1999/xhtml";const Mo={svg:"http://www.w3.org/2000/svg",xhtml:Pi,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Or(t){var e=t+="",n=e.indexOf(":");return n>=0&&(e=t.slice(0,n))!=="xmlns"&&(t=t.slice(n+1)),Mo.hasOwnProperty(e)?{space:Mo[e],local:t}:t}function xh(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===Pi&&e.documentElement.namespaceURI===Pi?e.createElement(t):e.createElementNS(n,t)}}function Nh(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function pl(t){var e=Or(t);return(e.local?Nh:xh)(e)}function Mh(){}function ps(t){return t==null?Mh:function(){return this.querySelector(t)}}function Ah(t){typeof t!="function"&&(t=ps(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var s=e[i],o=s.length,a=r[i]=new Array(o),l,c,u=0;u<o;++u)(l=s[u])&&(c=t.call(l,l.__data__,u,s))&&("__data__"in l&&(c.__data__=l.__data__),a[u]=c);return new Ee(r,this._parents)}function Rh(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function kh(){return[]}function gl(t){return t==null?kh:function(){return this.querySelectorAll(t)}}function Dh(t){return function(){return Rh(t.apply(this,arguments))}}function Ph(t){typeof t=="function"?t=Dh(t):t=gl(t);for(var e=this._groups,n=e.length,r=[],i=[],s=0;s<n;++s)for(var o=e[s],a=o.length,l,c=0;c<a;++c)(l=o[c])&&(r.push(t.call(l,l.__data__,c,o)),i.push(l));return new Ee(r,i)}function ml(t){return function(){return this.matches(t)}}function yl(t){return function(e){return e.matches(t)}}var Oh=Array.prototype.find;function Fh(t){return function(){return Oh.call(this.children,t)}}function Lh(){return this.firstElementChild}function Uh(t){return this.select(t==null?Lh:Fh(typeof t=="function"?t:yl(t)))}var $h=Array.prototype.filter;function Bh(){return Array.from(this.children)}function Wh(t){return function(){return $h.call(this.children,t)}}function Hh(t){return this.selectAll(t==null?Bh:Wh(typeof t=="function"?t:yl(t)))}function Vh(t){typeof t!="function"&&(t=ml(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var s=e[i],o=s.length,a=r[i]=[],l,c=0;c<o;++c)(l=s[c])&&t.call(l,l.__data__,c,s)&&a.push(l);return new Ee(r,this._parents)}function vl(t){return new Array(t.length)}function Yh(){return new Ee(this._enter||this._groups.map(vl),this._parents)}function ir(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}ir.prototype={constructor:ir,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function zh(t){return function(){return t}}function qh(t,e,n,r,i,s){for(var o=0,a,l=e.length,c=s.length;o<c;++o)(a=e[o])?(a.__data__=s[o],r[o]=a):n[o]=new ir(t,s[o]);for(;o<l;++o)(a=e[o])&&(i[o]=a)}function Gh(t,e,n,r,i,s,o){var a,l,c=new Map,u=e.length,h=s.length,f=new Array(u),d;for(a=0;a<u;++a)(l=e[a])&&(f[a]=d=o.call(l,l.__data__,a,e)+"",c.has(d)?i[a]=l:c.set(d,l));for(a=0;a<h;++a)d=o.call(t,s[a],a,s)+"",(l=c.get(d))?(r[a]=l,l.__data__=s[a],c.delete(d)):n[a]=new ir(t,s[a]);for(a=0;a<u;++a)(l=e[a])&&c.get(f[a])===l&&(i[a]=l)}function jh(t){return t.__data__}function Kh(t,e){if(!arguments.length)return Array.from(this,jh);var n=e?Gh:qh,r=this._parents,i=this._groups;typeof t!="function"&&(t=zh(t));for(var s=i.length,o=new Array(s),a=new Array(s),l=new Array(s),c=0;c<s;++c){var u=r[c],h=i[c],f=h.length,d=Qh(t.call(u,u&&u.__data__,c,r)),p=d.length,v=a[c]=new Array(p),C=o[c]=new Array(p),D=l[c]=new Array(f);n(u,h,v,C,D,d,e);for(var O=0,S=0,E,b;O<p;++O)if(E=v[O]){for(O>=S&&(S=O+1);!(b=C[S])&&++S<p;);E._next=b||null}}return o=new Ee(o,r),o._enter=a,o._exit=l,o}function Qh(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function Xh(){return new Ee(this._exit||this._groups.map(vl),this._parents)}function Zh(t,e,n){var r=this.enter(),i=this,s=this.exit();return typeof t=="function"?(r=t(r),r&&(r=r.selection())):r=r.append(t+""),e!=null&&(i=e(i),i&&(i=i.selection())),n==null?s.remove():n(s),r&&i?r.merge(i).order():i}function Jh(t){for(var e=t.selection?t.selection():t,n=this._groups,r=e._groups,i=n.length,s=r.length,o=Math.min(i,s),a=new Array(i),l=0;l<o;++l)for(var c=n[l],u=r[l],h=c.length,f=a[l]=new Array(h),d,p=0;p<h;++p)(d=c[p]||u[p])&&(f[p]=d);for(;l<i;++l)a[l]=n[l];return new Ee(a,this._parents)}function ef(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var r=t[e],i=r.length-1,s=r[i],o;--i>=0;)(o=r[i])&&(s&&o.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(o,s),s=o);return this}function tf(t){t||(t=nf);function e(h,f){return h&&f?t(h.__data__,f.__data__):!h-!f}for(var n=this._groups,r=n.length,i=new Array(r),s=0;s<r;++s){for(var o=n[s],a=o.length,l=i[s]=new Array(a),c,u=0;u<a;++u)(c=o[u])&&(l[u]=c);l.sort(e)}return new Ee(i,this._parents).order()}function nf(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function rf(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function sf(){return Array.from(this)}function of(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],i=0,s=r.length;i<s;++i){var o=r[i];if(o)return o}return null}function af(){let t=0;for(const e of this)++t;return t}function lf(){return!this.node()}function cf(t){for(var e=this._groups,n=0,r=e.length;n<r;++n)for(var i=e[n],s=0,o=i.length,a;s<o;++s)(a=i[s])&&t.call(a,a.__data__,s,i);return this}function uf(t){return function(){this.removeAttribute(t)}}function hf(t){return function(){this.removeAttributeNS(t.space,t.local)}}function ff(t,e){return function(){this.setAttribute(t,e)}}function df(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function _f(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttribute(t):this.setAttribute(t,n)}}function pf(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function gf(t,e){var n=Or(t);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((e==null?n.local?hf:uf:typeof e=="function"?n.local?pf:_f:n.local?df:ff)(n,e))}function wl(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function mf(t){return function(){this.style.removeProperty(t)}}function yf(t,e,n){return function(){this.style.setProperty(t,e,n)}}function vf(t,e,n){return function(){var r=e.apply(this,arguments);r==null?this.style.removeProperty(t):this.style.setProperty(t,r,n)}}function wf(t,e,n){return arguments.length>1?this.each((e==null?mf:typeof e=="function"?vf:yf)(t,e,n??"")):Bt(this.node(),t)}function Bt(t,e){return t.style.getPropertyValue(e)||wl(t).getComputedStyle(t,null).getPropertyValue(e)}function Cf(t){return function(){delete this[t]}}function Ef(t,e){return function(){this[t]=e}}function bf(t,e){return function(){var n=e.apply(this,arguments);n==null?delete this[t]:this[t]=n}}function Tf(t,e){return arguments.length>1?this.each((e==null?Cf:typeof e=="function"?bf:Ef)(t,e)):this.node()[t]}function Cl(t){return t.trim().split(/^|\s+/)}function gs(t){return t.classList||new El(t)}function El(t){this._node=t,this._names=Cl(t.getAttribute("class")||"")}El.prototype={add:function(t){var e=this._names.indexOf(t);e<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function bl(t,e){for(var n=gs(t),r=-1,i=e.length;++r<i;)n.add(e[r])}function Tl(t,e){for(var n=gs(t),r=-1,i=e.length;++r<i;)n.remove(e[r])}function Sf(t){return function(){bl(this,t)}}function If(t){return function(){Tl(this,t)}}function xf(t,e){return function(){(e.apply(this,arguments)?bl:Tl)(this,t)}}function Nf(t,e){var n=Cl(t+"");if(arguments.length<2){for(var r=gs(this.node()),i=-1,s=n.length;++i<s;)if(!r.contains(n[i]))return!1;return!0}return this.each((typeof e=="function"?xf:e?Sf:If)(n,e))}function Mf(){this.textContent=""}function Af(t){return function(){this.textContent=t}}function Rf(t){return function(){var e=t.apply(this,arguments);this.textContent=e??""}}function kf(t){return arguments.length?this.each(t==null?Mf:(typeof t=="function"?Rf:Af)(t)):this.node().textContent}function Df(){this.innerHTML=""}function Pf(t){return function(){this.innerHTML=t}}function Of(t){return function(){var e=t.apply(this,arguments);this.innerHTML=e??""}}function Ff(t){return arguments.length?this.each(t==null?Df:(typeof t=="function"?Of:Pf)(t)):this.node().innerHTML}function Lf(){this.nextSibling&&this.parentNode.appendChild(this)}function Uf(){return this.each(Lf)}function $f(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Bf(){return this.each($f)}function Wf(t){var e=typeof t=="function"?t:pl(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function Hf(){return null}function Vf(t,e){var n=typeof t=="function"?t:pl(t),r=e==null?Hf:typeof e=="function"?e:ps(e);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function Yf(){var t=this.parentNode;t&&t.removeChild(this)}function zf(){return this.each(Yf)}function qf(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function Gf(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function jf(t){return this.select(t?Gf:qf)}function Kf(t){return arguments.length?this.property("__data__",t):this.node().__data__}function Qf(t){return function(e){t.call(this,e,this.__data__)}}function Xf(t){return t.trim().split(/^|\s+/).map(function(e){var n="",r=e.indexOf(".");return r>=0&&(n=e.slice(r+1),e=e.slice(0,r)),{type:e,name:n}})}function Zf(t){return function(){var e=this.__on;if(e){for(var n=0,r=-1,i=e.length,s;n<i;++n)s=e[n],(!t.type||s.type===t.type)&&s.name===t.name?this.removeEventListener(s.type,s.listener,s.options):e[++r]=s;++r?e.length=r:delete this.__on}}}function Jf(t,e,n){return function(){var r=this.__on,i,s=Qf(e);if(r){for(var o=0,a=r.length;o<a;++o)if((i=r[o]).type===t.type&&i.name===t.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=n),i.value=e;return}}this.addEventListener(t.type,s,n),i={type:t.type,name:t.name,value:e,listener:s,options:n},r?r.push(i):this.__on=[i]}}function ed(t,e,n){var r=Xf(t+""),i,s=r.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,u;l<c;++l)for(i=0,u=a[l];i<s;++i)if((o=r[i]).type===u.type&&o.name===u.name)return u.value}return}for(a=e?Jf:Zf,i=0;i<s;++i)this.each(a(r[i],e,n));return this}function Sl(t,e,n){var r=wl(t),i=r.CustomEvent;typeof i=="function"?i=new i(e,n):(i=r.document.createEvent("Event"),n?(i.initEvent(e,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(e,!1,!1)),t.dispatchEvent(i)}function td(t,e){return function(){return Sl(this,t,e)}}function nd(t,e){return function(){return Sl(this,t,e.apply(this,arguments))}}function rd(t,e){return this.each((typeof e=="function"?nd:td)(t,e))}function*id(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],i=0,s=r.length,o;i<s;++i)(o=r[i])&&(yield o)}var Il=[null];function Ee(t,e){this._groups=t,this._parents=e}function Ln(){return new Ee([[document.documentElement]],Il)}function sd(){return this}Ee.prototype=Ln.prototype={constructor:Ee,select:Ah,selectAll:Ph,selectChild:Uh,selectChildren:Hh,filter:Vh,data:Kh,enter:Yh,exit:Xh,join:Zh,merge:Jh,selection:sd,order:ef,sort:tf,call:rf,nodes:sf,node:of,size:af,empty:lf,each:cf,attr:gf,style:wf,property:Tf,classed:Nf,text:kf,html:Ff,raise:Uf,lower:Bf,append:Wf,insert:Vf,remove:zf,clone:jf,datum:Kf,on:ed,dispatch:rd,[Symbol.iterator]:id};function tC(t){return typeof t=="string"?new Ee([[document.querySelector(t)]],[document.documentElement]):new Ee([[t]],Il)}function od(t){let e;for(;e=t.sourceEvent;)t=e;return t}function nC(t,e){if(t=od(t),e===void 0&&(e=t.currentTarget),e){var n=e.ownerSVGElement||e;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=t.clientX,r.y=t.clientY,r=r.matrixTransform(e.getScreenCTM().inverse()),[r.x,r.y]}if(e.getBoundingClientRect){var i=e.getBoundingClientRect();return[t.clientX-i.left-e.clientLeft,t.clientY-i.top-e.clientTop]}}return[t.pageX,t.pageY]}function ms(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function xl(t,e){var n=Object.create(t.prototype);for(var r in e)n[r]=e[r];return n}function Un(){}var En=.7,sr=1/En,Pt="\\s*([+-]?\\d+)\\s*",bn="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",$e="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",ad=/^#([0-9a-f]{3,8})$/,ld=new RegExp(`^rgb\\(${Pt},${Pt},${Pt}\\)$`),cd=new RegExp(`^rgb\\(${$e},${$e},${$e}\\)$`),ud=new RegExp(`^rgba\\(${Pt},${Pt},${Pt},${bn}\\)$`),hd=new RegExp(`^rgba\\(${$e},${$e},${$e},${bn}\\)$`),fd=new RegExp(`^hsl\\(${bn},${$e},${$e}\\)$`),dd=new RegExp(`^hsla\\(${bn},${$e},${$e},${bn}\\)$`),Ao={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ms(Un,gt,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:Ro,formatHex:Ro,formatHex8:_d,formatHsl:pd,formatRgb:ko,toString:ko});function Ro(){return this.rgb().formatHex()}function _d(){return this.rgb().formatHex8()}function pd(){return Nl(this).formatHsl()}function ko(){return this.rgb().formatRgb()}function gt(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=ad.exec(t))?(n=e[1].length,e=parseInt(e[1],16),n===6?Do(e):n===3?new me(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):n===8?qn(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):n===4?qn(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=ld.exec(t))?new me(e[1],e[2],e[3],1):(e=cd.exec(t))?new me(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=ud.exec(t))?qn(e[1],e[2],e[3],e[4]):(e=hd.exec(t))?qn(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=fd.exec(t))?Fo(e[1],e[2]/100,e[3]/100,1):(e=dd.exec(t))?Fo(e[1],e[2]/100,e[3]/100,e[4]):Ao.hasOwnProperty(t)?Do(Ao[t]):t==="transparent"?new me(NaN,NaN,NaN,0):null}function Do(t){return new me(t>>16&255,t>>8&255,t&255,1)}function qn(t,e,n,r){return r<=0&&(t=e=n=NaN),new me(t,e,n,r)}function gd(t){return t instanceof Un||(t=gt(t)),t?(t=t.rgb(),new me(t.r,t.g,t.b,t.opacity)):new me}function Oi(t,e,n,r){return arguments.length===1?gd(t):new me(t,e,n,r??1)}function me(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r}ms(me,Oi,xl(Un,{brighter(t){return t=t==null?sr:Math.pow(sr,t),new me(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?En:Math.pow(En,t),new me(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new me(pt(this.r),pt(this.g),pt(this.b),or(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Po,formatHex:Po,formatHex8:md,formatRgb:Oo,toString:Oo}));function Po(){return`#${dt(this.r)}${dt(this.g)}${dt(this.b)}`}function md(){return`#${dt(this.r)}${dt(this.g)}${dt(this.b)}${dt((isNaN(this.opacity)?1:this.opacity)*255)}`}function Oo(){const t=or(this.opacity);return`${t===1?"rgb(":"rgba("}${pt(this.r)}, ${pt(this.g)}, ${pt(this.b)}${t===1?")":`, ${t})`}`}function or(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function pt(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function dt(t){return t=pt(t),(t<16?"0":"")+t.toString(16)}function Fo(t,e,n,r){return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new Re(t,e,n,r)}function Nl(t){if(t instanceof Re)return new Re(t.h,t.s,t.l,t.opacity);if(t instanceof Un||(t=gt(t)),!t)return new Re;if(t instanceof Re)return t;t=t.rgb();var e=t.r/255,n=t.g/255,r=t.b/255,i=Math.min(e,n,r),s=Math.max(e,n,r),o=NaN,a=s-i,l=(s+i)/2;return a?(e===s?o=(n-r)/a+(n<r)*6:n===s?o=(r-e)/a+2:o=(e-n)/a+4,a/=l<.5?s+i:2-s-i,o*=60):a=l>0&&l<1?0:o,new Re(o,a,l,t.opacity)}function yd(t,e,n,r){return arguments.length===1?Nl(t):new Re(t,e,n,r??1)}function Re(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}ms(Re,yd,xl(Un,{brighter(t){return t=t==null?sr:Math.pow(sr,t),new Re(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?En:Math.pow(En,t),new Re(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*e,i=2*n-r;return new me(li(t>=240?t-240:t+120,i,r),li(t,i,r),li(t<120?t+240:t-120,i,r),this.opacity)},clamp(){return new Re(Lo(this.h),Gn(this.s),Gn(this.l),or(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=or(this.opacity);return`${t===1?"hsl(":"hsla("}${Lo(this.h)}, ${Gn(this.s)*100}%, ${Gn(this.l)*100}%${t===1?")":`, ${t})`}`}}));function Lo(t){return t=(t||0)%360,t<0?t+360:t}function Gn(t){return Math.max(0,Math.min(1,t||0))}function li(t,e,n){return(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)*255}const ys=t=>()=>t;function vd(t,e){return function(n){return t+n*e}}function wd(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(r){return Math.pow(t+r*e,n)}}function Cd(t){return(t=+t)==1?Ml:function(e,n){return n-e?wd(e,n,t):ys(isNaN(e)?n:e)}}function Ml(t,e){var n=e-t;return n?vd(t,n):ys(isNaN(t)?e:t)}const ar=(function t(e){var n=Cd(e);function r(i,s){var o=n((i=Oi(i)).r,(s=Oi(s)).r),a=n(i.g,s.g),l=n(i.b,s.b),c=Ml(i.opacity,s.opacity);return function(u){return i.r=o(u),i.g=a(u),i.b=l(u),i.opacity=c(u),i+""}}return r.gamma=t,r})(1);function Ed(t,e){e||(e=[]);var n=t?Math.min(e.length,t.length):0,r=e.slice(),i;return function(s){for(i=0;i<n;++i)r[i]=t[i]*(1-s)+e[i]*s;return r}}function bd(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Td(t,e){var n=e?e.length:0,r=t?Math.min(n,t.length):0,i=new Array(r),s=new Array(n),o;for(o=0;o<r;++o)i[o]=vs(t[o],e[o]);for(;o<n;++o)s[o]=e[o];return function(a){for(o=0;o<r;++o)s[o]=i[o](a);return s}}function Sd(t,e){var n=new Date;return t=+t,e=+e,function(r){return n.setTime(t*(1-r)+e*r),n}}function Ae(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}function Id(t,e){var n={},r={},i;(t===null||typeof t!="object")&&(t={}),(e===null||typeof e!="object")&&(e={});for(i in e)i in t?n[i]=vs(t[i],e[i]):r[i]=e[i];return function(s){for(i in n)r[i]=n[i](s);return r}}var Fi=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ci=new RegExp(Fi.source,"g");function xd(t){return function(){return t}}function Nd(t){return function(e){return t(e)+""}}function Al(t,e){var n=Fi.lastIndex=ci.lastIndex=0,r,i,s,o=-1,a=[],l=[];for(t=t+"",e=e+"";(r=Fi.exec(t))&&(i=ci.exec(e));)(s=i.index)>n&&(s=e.slice(n,s),a[o]?a[o]+=s:a[++o]=s),(r=r[0])===(i=i[0])?a[o]?a[o]+=i:a[++o]=i:(a[++o]=null,l.push({i:o,x:Ae(r,i)})),n=ci.lastIndex;return n<e.length&&(s=e.slice(n),a[o]?a[o]+=s:a[++o]=s),a.length<2?l[0]?Nd(l[0].x):xd(e):(e=l.length,function(c){for(var u=0,h;u<e;++u)a[(h=l[u]).i]=h.x(c);return a.join("")})}function vs(t,e){var n=typeof e,r;return e==null||n==="boolean"?ys(e):(n==="number"?Ae:n==="string"?(r=gt(e))?(e=r,ar):Al:e instanceof gt?ar:e instanceof Date?Sd:bd(e)?Ed:Array.isArray(e)?Td:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Id:Ae)(t,e)}function Md(t,e){return t=+t,e=+e,function(n){return Math.round(t*(1-n)+e*n)}}var Uo=180/Math.PI,Li={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Rl(t,e,n,r,i,s){var o,a,l;return(o=Math.sqrt(t*t+e*e))&&(t/=o,e/=o),(l=t*n+e*r)&&(n-=t*l,r-=e*l),(a=Math.sqrt(n*n+r*r))&&(n/=a,r/=a,l/=a),t*r<e*n&&(t=-t,e=-e,l=-l,o=-o),{translateX:i,translateY:s,rotate:Math.atan2(e,t)*Uo,skewX:Math.atan(l)*Uo,scaleX:o,scaleY:a}}var jn;function Ad(t){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?Li:Rl(e.a,e.b,e.c,e.d,e.e,e.f)}function Rd(t){return t==null||(jn||(jn=document.createElementNS("http://www.w3.org/2000/svg","g")),jn.setAttribute("transform",t),!(t=jn.transform.baseVal.consolidate()))?Li:(t=t.matrix,Rl(t.a,t.b,t.c,t.d,t.e,t.f))}function kl(t,e,n,r){function i(c){return c.length?c.pop()+" ":""}function s(c,u,h,f,d,p){if(c!==h||u!==f){var v=d.push("translate(",null,e,null,n);p.push({i:v-4,x:Ae(c,h)},{i:v-2,x:Ae(u,f)})}else(h||f)&&d.push("translate("+h+e+f+n)}function o(c,u,h,f){c!==u?(c-u>180?u+=360:u-c>180&&(c+=360),f.push({i:h.push(i(h)+"rotate(",null,r)-2,x:Ae(c,u)})):u&&h.push(i(h)+"rotate("+u+r)}function a(c,u,h,f){c!==u?f.push({i:h.push(i(h)+"skewX(",null,r)-2,x:Ae(c,u)}):u&&h.push(i(h)+"skewX("+u+r)}function l(c,u,h,f,d,p){if(c!==h||u!==f){var v=d.push(i(d)+"scale(",null,",",null,")");p.push({i:v-4,x:Ae(c,h)},{i:v-2,x:Ae(u,f)})}else(h!==1||f!==1)&&d.push(i(d)+"scale("+h+","+f+")")}return function(c,u){var h=[],f=[];return c=t(c),u=t(u),s(c.translateX,c.translateY,u.translateX,u.translateY,h,f),o(c.rotate,u.rotate,h,f),a(c.skewX,u.skewX,h,f),l(c.scaleX,c.scaleY,u.scaleX,u.scaleY,h,f),c=u=null,function(d){for(var p=-1,v=f.length,C;++p<v;)h[(C=f[p]).i]=C.x(d);return h.join("")}}}var kd=kl(Ad,"px, ","px)","deg)"),Dd=kl(Rd,", ",")",")"),Wt=0,_n=0,rn=0,Dl=1e3,lr,pn,cr=0,mt=0,Fr=0,Tn=typeof performance=="object"&&performance.now?performance:Date,Pl=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function ws(){return mt||(Pl(Pd),mt=Tn.now()+Fr)}function Pd(){mt=0}function ur(){this._call=this._time=this._next=null}ur.prototype=Ol.prototype={constructor:ur,restart:function(t,e,n){if(typeof t!="function")throw new TypeError("callback is not a function");n=(n==null?ws():+n)+(e==null?0:+e),!this._next&&pn!==this&&(pn?pn._next=this:lr=this,pn=this),this._call=t,this._time=n,Ui()},stop:function(){this._call&&(this._call=null,this._time=1/0,Ui())}};function Ol(t,e,n){var r=new ur;return r.restart(t,e,n),r}function Od(){ws(),++Wt;for(var t=lr,e;t;)(e=mt-t._time)>=0&&t._call.call(void 0,e),t=t._next;--Wt}function $o(){mt=(cr=Tn.now())+Fr,Wt=_n=0;try{Od()}finally{Wt=0,Ld(),mt=0}}function Fd(){var t=Tn.now(),e=t-cr;e>Dl&&(Fr-=e,cr=t)}function Ld(){for(var t,e=lr,n,r=1/0;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:lr=n);pn=t,Ui(r)}function Ui(t){if(!Wt){_n&&(_n=clearTimeout(_n));var e=t-mt;e>24?(t<1/0&&(_n=setTimeout($o,t-Tn.now()-Fr)),rn&&(rn=clearInterval(rn))):(rn||(cr=Tn.now(),rn=setInterval(Fd,Dl)),Wt=1,Pl($o))}}function Bo(t,e,n){var r=new ur;return e=e==null?0:+e,r.restart(i=>{r.stop(),t(i+e)},e,n),r}var Ud=_l("start","end","cancel","interrupt"),$d=[],Fl=0,Wo=1,$i=2,er=3,Ho=4,Bi=5,tr=6;function Lr(t,e,n,r,i,s){var o=t.__transition;if(!o)t.__transition={};else if(n in o)return;Bd(t,n,{name:e,index:r,group:i,on:Ud,tween:$d,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:Fl})}function Cs(t,e){var n=Fe(t,e);if(n.state>Fl)throw new Error("too late; already scheduled");return n}function Be(t,e){var n=Fe(t,e);if(n.state>er)throw new Error("too late; already running");return n}function Fe(t,e){var n=t.__transition;if(!n||!(n=n[e]))throw new Error("transition not found");return n}function Bd(t,e,n){var r=t.__transition,i;r[e]=n,n.timer=Ol(s,0,n.time);function s(c){n.state=Wo,n.timer.restart(o,n.delay,n.time),n.delay<=c&&o(c-n.delay)}function o(c){var u,h,f,d;if(n.state!==Wo)return l();for(u in r)if(d=r[u],d.name===n.name){if(d.state===er)return Bo(o);d.state===Ho?(d.state=tr,d.timer.stop(),d.on.call("interrupt",t,t.__data__,d.index,d.group),delete r[u]):+u<e&&(d.state=tr,d.timer.stop(),d.on.call("cancel",t,t.__data__,d.index,d.group),delete r[u])}if(Bo(function(){n.state===er&&(n.state=Ho,n.timer.restart(a,n.delay,n.time),a(c))}),n.state=$i,n.on.call("start",t,t.__data__,n.index,n.group),n.state===$i){for(n.state=er,i=new Array(f=n.tween.length),u=0,h=-1;u<f;++u)(d=n.tween[u].value.call(t,t.__data__,n.index,n.group))&&(i[++h]=d);i.length=h+1}}function a(c){for(var u=c<n.duration?n.ease.call(null,c/n.duration):(n.timer.restart(l),n.state=Bi,1),h=-1,f=i.length;++h<f;)i[h].call(t,u);n.state===Bi&&(n.on.call("end",t,t.__data__,n.index,n.group),l())}function l(){n.state=tr,n.timer.stop(),delete r[e];for(var c in r)return;delete t.__transition}}function Wd(t,e){var n=t.__transition,r,i,s=!0,o;if(n){e=e==null?null:e+"";for(o in n){if((r=n[o]).name!==e){s=!1;continue}i=r.state>$i&&r.state<Bi,r.state=tr,r.timer.stop(),r.on.call(i?"interrupt":"cancel",t,t.__data__,r.index,r.group),delete n[o]}s&&delete t.__transition}}function Hd(t){return this.each(function(){Wd(this,t)})}function Vd(t,e){var n,r;return function(){var i=Be(this,t),s=i.tween;if(s!==n){r=n=s;for(var o=0,a=r.length;o<a;++o)if(r[o].name===e){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function Yd(t,e,n){var r,i;if(typeof n!="function")throw new Error;return function(){var s=Be(this,t),o=s.tween;if(o!==r){i=(r=o).slice();for(var a={name:e,value:n},l=0,c=i.length;l<c;++l)if(i[l].name===e){i[l]=a;break}l===c&&i.push(a)}s.tween=i}}function zd(t,e){var n=this._id;if(t+="",arguments.length<2){for(var r=Fe(this.node(),n).tween,i=0,s=r.length,o;i<s;++i)if((o=r[i]).name===t)return o.value;return null}return this.each((e==null?Vd:Yd)(n,t,e))}function Es(t,e,n){var r=t._id;return t.each(function(){var i=Be(this,r);(i.value||(i.value={}))[e]=n.apply(this,arguments)}),function(i){return Fe(i,r).value[e]}}function Ll(t,e){var n;return(typeof e=="number"?Ae:e instanceof gt?ar:(n=gt(e))?(e=n,ar):Al)(t,e)}function qd(t){return function(){this.removeAttribute(t)}}function Gd(t){return function(){this.removeAttributeNS(t.space,t.local)}}function jd(t,e,n){var r,i=n+"",s;return function(){var o=this.getAttribute(t);return o===i?null:o===r?s:s=e(r=o,n)}}function Kd(t,e,n){var r,i=n+"",s;return function(){var o=this.getAttributeNS(t.space,t.local);return o===i?null:o===r?s:s=e(r=o,n)}}function Qd(t,e,n){var r,i,s;return function(){var o,a=n(this),l;return a==null?void this.removeAttribute(t):(o=this.getAttribute(t),l=a+"",o===l?null:o===r&&l===i?s:(i=l,s=e(r=o,a)))}}function Xd(t,e,n){var r,i,s;return function(){var o,a=n(this),l;return a==null?void this.removeAttributeNS(t.space,t.local):(o=this.getAttributeNS(t.space,t.local),l=a+"",o===l?null:o===r&&l===i?s:(i=l,s=e(r=o,a)))}}function Zd(t,e){var n=Or(t),r=n==="transform"?Dd:Ll;return this.attrTween(t,typeof e=="function"?(n.local?Xd:Qd)(n,r,Es(this,"attr."+t,e)):e==null?(n.local?Gd:qd)(n):(n.local?Kd:jd)(n,r,e))}function Jd(t,e){return function(n){this.setAttribute(t,e.call(this,n))}}function e_(t,e){return function(n){this.setAttributeNS(t.space,t.local,e.call(this,n))}}function t_(t,e){var n,r;function i(){var s=e.apply(this,arguments);return s!==r&&(n=(r=s)&&e_(t,s)),n}return i._value=e,i}function n_(t,e){var n,r;function i(){var s=e.apply(this,arguments);return s!==r&&(n=(r=s)&&Jd(t,s)),n}return i._value=e,i}function r_(t,e){var n="attr."+t;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;var r=Or(t);return this.tween(n,(r.local?t_:n_)(r,e))}function i_(t,e){return function(){Cs(this,t).delay=+e.apply(this,arguments)}}function s_(t,e){return e=+e,function(){Cs(this,t).delay=e}}function o_(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?i_:s_)(e,t)):Fe(this.node(),e).delay}function a_(t,e){return function(){Be(this,t).duration=+e.apply(this,arguments)}}function l_(t,e){return e=+e,function(){Be(this,t).duration=e}}function c_(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?a_:l_)(e,t)):Fe(this.node(),e).duration}function u_(t,e){if(typeof e!="function")throw new Error;return function(){Be(this,t).ease=e}}function h_(t){var e=this._id;return arguments.length?this.each(u_(e,t)):Fe(this.node(),e).ease}function f_(t,e){return function(){var n=e.apply(this,arguments);if(typeof n!="function")throw new Error;Be(this,t).ease=n}}function d_(t){if(typeof t!="function")throw new Error;return this.each(f_(this._id,t))}function __(t){typeof t!="function"&&(t=ml(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var s=e[i],o=s.length,a=r[i]=[],l,c=0;c<o;++c)(l=s[c])&&t.call(l,l.__data__,c,s)&&a.push(l);return new je(r,this._parents,this._name,this._id)}function p_(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,n=t._groups,r=e.length,i=n.length,s=Math.min(r,i),o=new Array(r),a=0;a<s;++a)for(var l=e[a],c=n[a],u=l.length,h=o[a]=new Array(u),f,d=0;d<u;++d)(f=l[d]||c[d])&&(h[d]=f);for(;a<r;++a)o[a]=e[a];return new je(o,this._parents,this._name,this._id)}function g_(t){return(t+"").trim().split(/^|\s+/).every(function(e){var n=e.indexOf(".");return n>=0&&(e=e.slice(0,n)),!e||e==="start"})}function m_(t,e,n){var r,i,s=g_(e)?Cs:Be;return function(){var o=s(this,t),a=o.on;a!==r&&(i=(r=a).copy()).on(e,n),o.on=i}}function y_(t,e){var n=this._id;return arguments.length<2?Fe(this.node(),n).on.on(t):this.each(m_(n,t,e))}function v_(t){return function(){var e=this.parentNode;for(var n in this.__transition)if(+n!==t)return;e&&e.removeChild(this)}}function w_(){return this.on("end.remove",v_(this._id))}function C_(t){var e=this._name,n=this._id;typeof t!="function"&&(t=ps(t));for(var r=this._groups,i=r.length,s=new Array(i),o=0;o<i;++o)for(var a=r[o],l=a.length,c=s[o]=new Array(l),u,h,f=0;f<l;++f)(u=a[f])&&(h=t.call(u,u.__data__,f,a))&&("__data__"in u&&(h.__data__=u.__data__),c[f]=h,Lr(c[f],e,n,f,c,Fe(u,n)));return new je(s,this._parents,e,n)}function E_(t){var e=this._name,n=this._id;typeof t!="function"&&(t=gl(t));for(var r=this._groups,i=r.length,s=[],o=[],a=0;a<i;++a)for(var l=r[a],c=l.length,u,h=0;h<c;++h)if(u=l[h]){for(var f=t.call(u,u.__data__,h,l),d,p=Fe(u,n),v=0,C=f.length;v<C;++v)(d=f[v])&&Lr(d,e,n,v,f,p);s.push(f),o.push(u)}return new je(s,o,e,n)}var b_=Ln.prototype.constructor;function T_(){return new b_(this._groups,this._parents)}function S_(t,e){var n,r,i;return function(){var s=Bt(this,t),o=(this.style.removeProperty(t),Bt(this,t));return s===o?null:s===n&&o===r?i:i=e(n=s,r=o)}}function Ul(t){return function(){this.style.removeProperty(t)}}function I_(t,e,n){var r,i=n+"",s;return function(){var o=Bt(this,t);return o===i?null:o===r?s:s=e(r=o,n)}}function x_(t,e,n){var r,i,s;return function(){var o=Bt(this,t),a=n(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(t),Bt(this,t))),o===l?null:o===r&&l===i?s:(i=l,s=e(r=o,a))}}function N_(t,e){var n,r,i,s="style."+e,o="end."+s,a;return function(){var l=Be(this,t),c=l.on,u=l.value[s]==null?a||(a=Ul(e)):void 0;(c!==n||i!==u)&&(r=(n=c).copy()).on(o,i=u),l.on=r}}function M_(t,e,n){var r=(t+="")=="transform"?kd:Ll;return e==null?this.styleTween(t,S_(t,r)).on("end.style."+t,Ul(t)):typeof e=="function"?this.styleTween(t,x_(t,r,Es(this,"style."+t,e))).each(N_(this._id,t)):this.styleTween(t,I_(t,r,e),n).on("end.style."+t,null)}function A_(t,e,n){return function(r){this.style.setProperty(t,e.call(this,r),n)}}function R_(t,e,n){var r,i;function s(){var o=e.apply(this,arguments);return o!==i&&(r=(i=o)&&A_(t,o,n)),r}return s._value=e,s}function k_(t,e,n){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(e==null)return this.tween(r,null);if(typeof e!="function")throw new Error;return this.tween(r,R_(t,e,n??""))}function D_(t){return function(){this.textContent=t}}function P_(t){return function(){var e=t(this);this.textContent=e??""}}function O_(t){return this.tween("text",typeof t=="function"?P_(Es(this,"text",t)):D_(t==null?"":t+""))}function F_(t){return function(e){this.textContent=t.call(this,e)}}function L_(t){var e,n;function r(){var i=t.apply(this,arguments);return i!==n&&(e=(n=i)&&F_(i)),e}return r._value=t,r}function U_(t){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;return this.tween(e,L_(t))}function $_(){for(var t=this._name,e=this._id,n=$l(),r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],a=o.length,l,c=0;c<a;++c)if(l=o[c]){var u=Fe(l,e);Lr(l,t,n,c,o,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new je(r,this._parents,t,n)}function B_(){var t,e,n=this,r=n._id,i=n.size();return new Promise(function(s,o){var a={value:o},l={value:function(){--i===0&&s()}};n.each(function(){var c=Be(this,r),u=c.on;u!==t&&(e=(t=u).copy(),e._.cancel.push(a),e._.interrupt.push(a),e._.end.push(l)),c.on=e}),i===0&&s()})}var W_=0;function je(t,e,n,r){this._groups=t,this._parents=e,this._name=n,this._id=r}function $l(){return++W_}var Ve=Ln.prototype;je.prototype={constructor:je,select:C_,selectAll:E_,selectChild:Ve.selectChild,selectChildren:Ve.selectChildren,filter:__,merge:p_,selection:T_,transition:$_,call:Ve.call,nodes:Ve.nodes,node:Ve.node,size:Ve.size,empty:Ve.empty,each:Ve.each,on:y_,attr:Zd,attrTween:r_,style:M_,styleTween:k_,text:O_,textTween:U_,remove:w_,tween:zd,delay:o_,duration:c_,ease:h_,easeVarying:d_,end:B_,[Symbol.iterator]:Ve[Symbol.iterator]};function H_(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}var V_={time:null,delay:0,duration:250,ease:H_};function Y_(t,e){for(var n;!(n=t.__transition)||!(n=n[e]);)if(!(t=t.parentNode))throw new Error(`transition ${e} not found`);return n}function z_(t){var e,n;t instanceof je?(e=t._id,t=t._name):(e=$l(),(n=V_).time=ws(),t=t==null?null:t+"");for(var r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],a=o.length,l,c=0;c<a;++c)(l=o[c])&&Lr(l,t,e,c,o,n||Y_(l,e));return new je(r,this._parents,t,e)}Ln.prototype.interrupt=Hd;Ln.prototype.transition=z_;const Wi=Math.PI,Hi=2*Wi,ut=1e-6,q_=Hi-ut;function Bl(t){this._+=t[0];for(let e=1,n=t.length;e<n;++e)this._+=arguments[e]+t[e]}function G_(t){let e=Math.floor(t);if(!(e>=0))throw new Error(`invalid digits: ${t}`);if(e>15)return Bl;const n=10**e;return function(r){this._+=r[0];for(let i=1,s=r.length;i<s;++i)this._+=Math.round(arguments[i]*n)/n+r[i]}}let j_=class{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=e==null?Bl:G_(e)}moveTo(e,n){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,n){this._append`L${this._x1=+e},${this._y1=+n}`}quadraticCurveTo(e,n,r,i){this._append`Q${+e},${+n},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(e,n,r,i,s,o){this._append`C${+e},${+n},${+r},${+i},${this._x1=+s},${this._y1=+o}`}arcTo(e,n,r,i,s){if(e=+e,n=+n,r=+r,i=+i,s=+s,s<0)throw new Error(`negative radius: ${s}`);let o=this._x1,a=this._y1,l=r-e,c=i-n,u=o-e,h=a-n,f=u*u+h*h;if(this._x1===null)this._append`M${this._x1=e},${this._y1=n}`;else if(f>ut)if(!(Math.abs(h*l-c*u)>ut)||!s)this._append`L${this._x1=e},${this._y1=n}`;else{let d=r-o,p=i-a,v=l*l+c*c,C=d*d+p*p,D=Math.sqrt(v),O=Math.sqrt(f),S=s*Math.tan((Wi-Math.acos((v+f-C)/(2*D*O)))/2),E=S/O,b=S/D;Math.abs(E-1)>ut&&this._append`L${e+E*u},${n+E*h}`,this._append`A${s},${s},0,0,${+(h*d>u*p)},${this._x1=e+b*l},${this._y1=n+b*c}`}}arc(e,n,r,i,s,o){if(e=+e,n=+n,r=+r,o=!!o,r<0)throw new Error(`negative radius: ${r}`);let a=r*Math.cos(i),l=r*Math.sin(i),c=e+a,u=n+l,h=1^o,f=o?i-s:s-i;this._x1===null?this._append`M${c},${u}`:(Math.abs(this._x1-c)>ut||Math.abs(this._y1-u)>ut)&&this._append`L${c},${u}`,r&&(f<0&&(f=f%Hi+Hi),f>q_?this._append`A${r},${r},0,1,${h},${e-a},${n-l}A${r},${r},0,1,${h},${this._x1=c},${this._y1=u}`:f>ut&&this._append`A${r},${r},0,${+(f>=Wi)},${h},${this._x1=e+r*Math.cos(s)},${this._y1=n+r*Math.sin(s)}`)}rect(e,n,r,i){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}};var Vo={},ui={},hi=34,sn=10,fi=13;function Wl(t){return new Function("d","return {"+t.map(function(e,n){return JSON.stringify(e)+": d["+n+'] || ""'}).join(",")+"}")}function K_(t,e){var n=Wl(t);return function(r,i){return e(n(r),i,t)}}function Yo(t){var e=Object.create(null),n=[];return t.forEach(function(r){for(var i in r)i in e||n.push(e[i]=i)}),n}function ge(t,e){var n=t+"",r=n.length;return r<e?new Array(e-r+1).join(0)+n:n}function Q_(t){return t<0?"-"+ge(-t,6):t>9999?"+"+ge(t,6):ge(t,4)}function X_(t){var e=t.getUTCHours(),n=t.getUTCMinutes(),r=t.getUTCSeconds(),i=t.getUTCMilliseconds();return isNaN(t)?"Invalid Date":Q_(t.getUTCFullYear())+"-"+ge(t.getUTCMonth()+1,2)+"-"+ge(t.getUTCDate(),2)+(i?"T"+ge(e,2)+":"+ge(n,2)+":"+ge(r,2)+"."+ge(i,3)+"Z":r?"T"+ge(e,2)+":"+ge(n,2)+":"+ge(r,2)+"Z":n||e?"T"+ge(e,2)+":"+ge(n,2)+"Z":"")}function Z_(t){var e=new RegExp('["'+t+`
\r]`),n=t.charCodeAt(0);function r(h,f){var d,p,v=i(h,function(C,D){if(d)return d(C,D-1);p=C,d=f?K_(C,f):Wl(C)});return v.columns=p||[],v}function i(h,f){var d=[],p=h.length,v=0,C=0,D,O=p<=0,S=!1;h.charCodeAt(p-1)===sn&&--p,h.charCodeAt(p-1)===fi&&--p;function E(){if(O)return ui;if(S)return S=!1,Vo;var x,U=v,G;if(h.charCodeAt(U)===hi){for(;v++<p&&h.charCodeAt(v)!==hi||h.charCodeAt(++v)===hi;);return(x=v)>=p?O=!0:(G=h.charCodeAt(v++))===sn?S=!0:G===fi&&(S=!0,h.charCodeAt(v)===sn&&++v),h.slice(U+1,x-1).replace(/""/g,'"')}for(;v<p;){if((G=h.charCodeAt(x=v++))===sn)S=!0;else if(G===fi)S=!0,h.charCodeAt(v)===sn&&++v;else if(G!==n)continue;return h.slice(U,x)}return O=!0,h.slice(U,p)}for(;(D=E())!==ui;){for(var b=[];D!==Vo&&D!==ui;)b.push(D),D=E();f&&(b=f(b,C++))==null||d.push(b)}return d}function s(h,f){return h.map(function(d){return f.map(function(p){return u(d[p])}).join(t)})}function o(h,f){return f==null&&(f=Yo(h)),[f.map(u).join(t)].concat(s(h,f)).join(`
`)}function a(h,f){return f==null&&(f=Yo(h)),s(h,f).join(`
`)}function l(h){return h.map(c).join(`
`)}function c(h){return h.map(u).join(t)}function u(h){return h==null?"":h instanceof Date?X_(h):e.test(h+="")?'"'+h.replace(/"/g,'""')+'"':h}return{parse:r,parseRows:i,format:o,formatBody:a,formatRows:l,formatRow:c,formatValue:u}}var J_=Z_(","),ep=J_.parse;function tp(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.text()}function np(t,e){return fetch(t,e).then(tp)}function rp(t){return function(e,n,r){return arguments.length===2&&typeof n=="function"&&(r=n,n=void 0),np(e,n).then(function(i){return t(i,r)})}}var iC=rp(ep);function ip(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)}function hr(t,e){if((n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var n,r=t.slice(0,n);return[r.length>1?r[0]+r.slice(2):r,+t.slice(n+1)]}function Ht(t){return t=hr(Math.abs(t)),t?t[1]:NaN}function sp(t,e){return function(n,r){for(var i=n.length,s=[],o=0,a=t[0],l=0;i>0&&a>0&&(l+a+1>r&&(a=Math.max(1,r-l)),s.push(n.substring(i-=a,i+a)),!((l+=a+1)>r));)a=t[o=(o+1)%t.length];return s.reverse().join(e)}}function op(t){return function(e){return e.replace(/[0-9]/g,function(n){return t[+n]})}}var ap=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function fr(t){if(!(e=ap.exec(t)))throw new Error("invalid format: "+t);var e;return new bs({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}fr.prototype=bs.prototype;function bs(t){this.fill=t.fill===void 0?" ":t.fill+"",this.align=t.align===void 0?">":t.align+"",this.sign=t.sign===void 0?"-":t.sign+"",this.symbol=t.symbol===void 0?"":t.symbol+"",this.zero=!!t.zero,this.width=t.width===void 0?void 0:+t.width,this.comma=!!t.comma,this.precision=t.precision===void 0?void 0:+t.precision,this.trim=!!t.trim,this.type=t.type===void 0?"":t.type+""}bs.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function lp(t){e:for(var e=t.length,n=1,r=-1,i;n<e;++n)switch(t[n]){case".":r=i=n;break;case"0":r===0&&(r=n),i=n;break;default:if(!+t[n])break e;r>0&&(r=0);break}return r>0?t.slice(0,r)+t.slice(i+1):t}var Hl;function cp(t,e){var n=hr(t,e);if(!n)return t+"";var r=n[0],i=n[1],s=i-(Hl=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,o=r.length;return s===o?r:s>o?r+new Array(s-o+1).join("0"):s>0?r.slice(0,s)+"."+r.slice(s):"0."+new Array(1-s).join("0")+hr(t,Math.max(0,e+s-1))[0]}function zo(t,e){var n=hr(t,e);if(!n)return t+"";var r=n[0],i=n[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const qo={"%":(t,e)=>(t*100).toFixed(e),b:t=>Math.round(t).toString(2),c:t=>t+"",d:ip,e:(t,e)=>t.toExponential(e),f:(t,e)=>t.toFixed(e),g:(t,e)=>t.toPrecision(e),o:t=>Math.round(t).toString(8),p:(t,e)=>zo(t*100,e),r:zo,s:cp,X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function Go(t){return t}var jo=Array.prototype.map,Ko=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function up(t){var e=t.grouping===void 0||t.thousands===void 0?Go:sp(jo.call(t.grouping,Number),t.thousands+""),n=t.currency===void 0?"":t.currency[0]+"",r=t.currency===void 0?"":t.currency[1]+"",i=t.decimal===void 0?".":t.decimal+"",s=t.numerals===void 0?Go:op(jo.call(t.numerals,String)),o=t.percent===void 0?"%":t.percent+"",a=t.minus===void 0?"−":t.minus+"",l=t.nan===void 0?"NaN":t.nan+"";function c(h){h=fr(h);var f=h.fill,d=h.align,p=h.sign,v=h.symbol,C=h.zero,D=h.width,O=h.comma,S=h.precision,E=h.trim,b=h.type;b==="n"?(O=!0,b="g"):qo[b]||(S===void 0&&(S=12),E=!0,b="g"),(C||f==="0"&&d==="=")&&(C=!0,f="0",d="=");var x=v==="$"?n:v==="#"&&/[boxX]/.test(b)?"0"+b.toLowerCase():"",U=v==="$"?r:/[%p]/.test(b)?o:"",G=qo[b],we=/[defgprs%]/.test(b);S=S===void 0?6:/[gprs]/.test(b)?Math.max(1,Math.min(21,S)):Math.max(0,Math.min(20,S));function de(R){var ee=x,te=U,pe,xe,be;if(b==="c")te=G(R)+te,R="";else{R=+R;var Ne=R<0||1/R<0;if(R=isNaN(R)?l:G(Math.abs(R),S),E&&(R=lp(R)),Ne&&+R==0&&p!=="+"&&(Ne=!1),ee=(Ne?p==="("?p:a:p==="-"||p==="("?"":p)+ee,te=(b==="s"?Ko[8+Hl/3]:"")+te+(Ne&&p==="("?")":""),we){for(pe=-1,xe=R.length;++pe<xe;)if(be=R.charCodeAt(pe),48>be||be>57){te=(be===46?i+R.slice(pe+1):R.slice(pe))+te,R=R.slice(0,pe);break}}}O&&!C&&(R=e(R,1/0));var Me=ee.length+R.length+te.length,Ce=Me<D?new Array(D-Me+1).join(f):"";switch(O&&C&&(R=e(Ce+R,Ce.length?D-te.length:1/0),Ce=""),d){case"<":R=ee+R+te+Ce;break;case"=":R=ee+Ce+R+te;break;case"^":R=Ce.slice(0,Me=Ce.length>>1)+ee+R+te+Ce.slice(Me);break;default:R=Ce+ee+R+te;break}return s(R)}return de.toString=function(){return h+""},de}function u(h,f){var d=c((h=fr(h),h.type="f",h)),p=Math.max(-8,Math.min(8,Math.floor(Ht(f)/3)))*3,v=Math.pow(10,-p),C=Ko[8+p/3];return function(D){return d(v*D)+C}}return{format:c,formatPrefix:u}}var Kn,Vl,Yl;hp({thousands:",",grouping:[3],currency:["$",""]});function hp(t){return Kn=up(t),Vl=Kn.format,Yl=Kn.formatPrefix,Kn}function fp(t){return Math.max(0,-Ht(Math.abs(t)))}function dp(t,e){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Ht(e)/3)))*3-Ht(Math.abs(t)))}function _p(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,Ht(e)-Ht(t))+1}function zl(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t);break}return this}function pp(t){return function(){return t}}function gp(t){return+t}var Qo=[0,1];function Rt(t){return t}function Vi(t,e){return(e-=t=+t)?function(n){return(n-t)/e}:pp(isNaN(e)?NaN:.5)}function mp(t,e){var n;return t>e&&(n=t,t=e,e=n),function(r){return Math.max(t,Math.min(e,r))}}function yp(t,e,n){var r=t[0],i=t[1],s=e[0],o=e[1];return i<r?(r=Vi(i,r),s=n(o,s)):(r=Vi(r,i),s=n(s,o)),function(a){return s(r(a))}}function vp(t,e,n){var r=Math.min(t.length,e.length)-1,i=new Array(r),s=new Array(r),o=-1;for(t[r]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++o<r;)i[o]=Vi(t[o],t[o+1]),s[o]=n(e[o],e[o+1]);return function(a){var l=dh(t,a,1,r)-1;return s[l](i[l](a))}}function ql(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function wp(){var t=Qo,e=Qo,n=vs,r,i,s,o=Rt,a,l,c;function u(){var f=Math.min(t.length,e.length);return o!==Rt&&(o=mp(t[0],t[f-1])),a=f>2?vp:yp,l=c=null,h}function h(f){return f==null||isNaN(f=+f)?s:(l||(l=a(t.map(r),e,n)))(r(o(f)))}return h.invert=function(f){return o(i((c||(c=a(e,t.map(r),Ae)))(f)))},h.domain=function(f){return arguments.length?(t=Array.from(f,gp),u()):t.slice()},h.range=function(f){return arguments.length?(e=Array.from(f),u()):e.slice()},h.rangeRound=function(f){return e=Array.from(f),n=Md,u()},h.clamp=function(f){return arguments.length?(o=f?!0:Rt,u()):o!==Rt},h.interpolate=function(f){return arguments.length?(n=f,u()):n},h.unknown=function(f){return arguments.length?(s=f,h):s},function(f,d){return r=f,i=d,u()}}function Gl(){return wp()(Rt,Rt)}function Cp(t,e,n,r){var i=ki(t,e,n),s;switch(r=fr(r??",f"),r.type){case"s":{var o=Math.max(Math.abs(t),Math.abs(e));return r.precision==null&&!isNaN(s=dp(i,o))&&(r.precision=s),Yl(r,o)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(s=_p(i,Math.max(Math.abs(t),Math.abs(e))))&&(r.precision=s-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(s=fp(i))&&(r.precision=s-(r.type==="%")*2);break}}return Vl(r)}function Ep(t){var e=t.domain;return t.ticks=function(n){var r=e();return mh(r[0],r[r.length-1],n??10)},t.tickFormat=function(n,r){var i=e();return Cp(i[0],i[i.length-1],n??10,r)},t.nice=function(n){n==null&&(n=10);var r=e(),i=0,s=r.length-1,o=r[i],a=r[s],l,c,u=10;for(a<o&&(c=o,o=a,a=c,c=i,i=s,s=c);u-- >0;){if(c=Ri(o,a,n),c===l)return r[i]=o,r[s]=a,e(r);if(c>0)o=Math.floor(o/c)*c,a=Math.ceil(a/c)*c;else if(c<0)o=Math.ceil(o*c)/c,a=Math.floor(a*c)/c;else break;l=c}return t},t}function bp(){var t=Gl();return t.copy=function(){return ql(t,bp())},zl.apply(t,arguments),Ep(t)}function Tp(t,e){t=t.slice();var n=0,r=t.length-1,i=t[n],s=t[r],o;return s<i&&(o=n,n=r,r=o,o=i,i=s,s=o),t[n]=e.floor(i),t[r]=e.ceil(s),t}const di=new Date,_i=new Date;function se(t,e,n,r){function i(s){return t(s=arguments.length===0?new Date:new Date(+s)),s}return i.floor=s=>(t(s=new Date(+s)),s),i.ceil=s=>(t(s=new Date(s-1)),e(s,1),t(s),s),i.round=s=>{const o=i(s),a=i.ceil(s);return s-o<a-s?o:a},i.offset=(s,o)=>(e(s=new Date(+s),o==null?1:Math.floor(o)),s),i.range=(s,o,a)=>{const l=[];if(s=i.ceil(s),a=a==null?1:Math.floor(a),!(s<o)||!(a>0))return l;let c;do l.push(c=new Date(+s)),e(s,a),t(s);while(c<s&&s<o);return l},i.filter=s=>se(o=>{if(o>=o)for(;t(o),!s(o);)o.setTime(o-1)},(o,a)=>{if(o>=o)if(a<0)for(;++a<=0;)for(;e(o,-1),!s(o););else for(;--a>=0;)for(;e(o,1),!s(o););}),n&&(i.count=(s,o)=>(di.setTime(+s),_i.setTime(+o),t(di),t(_i),Math.floor(n(di,_i))),i.every=s=>(s=Math.floor(s),!isFinite(s)||!(s>0)?null:s>1?i.filter(r?o=>r(o)%s===0:o=>i.count(0,o)%s===0):i)),i}const dr=se(()=>{},(t,e)=>{t.setTime(+t+e)},(t,e)=>e-t);dr.every=t=>(t=Math.floor(t),!isFinite(t)||!(t>0)?null:t>1?se(e=>{e.setTime(Math.floor(e/t)*t)},(e,n)=>{e.setTime(+e+n*t)},(e,n)=>(n-e)/t):dr);dr.range;const Ye=1e3,Se=Ye*60,ze=Se*60,Ke=ze*24,Ts=Ke*7,Xo=Ke*30,pi=Ke*365,kt=se(t=>{t.setTime(t-t.getMilliseconds())},(t,e)=>{t.setTime(+t+e*Ye)},(t,e)=>(e-t)/Ye,t=>t.getUTCSeconds());kt.range;const Ss=se(t=>{t.setTime(t-t.getMilliseconds()-t.getSeconds()*Ye)},(t,e)=>{t.setTime(+t+e*Se)},(t,e)=>(e-t)/Se,t=>t.getMinutes());Ss.range;const Sp=se(t=>{t.setUTCSeconds(0,0)},(t,e)=>{t.setTime(+t+e*Se)},(t,e)=>(e-t)/Se,t=>t.getUTCMinutes());Sp.range;const Is=se(t=>{t.setTime(t-t.getMilliseconds()-t.getSeconds()*Ye-t.getMinutes()*Se)},(t,e)=>{t.setTime(+t+e*ze)},(t,e)=>(e-t)/ze,t=>t.getHours());Is.range;const Ip=se(t=>{t.setUTCMinutes(0,0,0)},(t,e)=>{t.setTime(+t+e*ze)},(t,e)=>(e-t)/ze,t=>t.getUTCHours());Ip.range;const $n=se(t=>t.setHours(0,0,0,0),(t,e)=>t.setDate(t.getDate()+e),(t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*Se)/Ke,t=>t.getDate()-1);$n.range;const xs=se(t=>{t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCDate(t.getUTCDate()+e)},(t,e)=>(e-t)/Ke,t=>t.getUTCDate()-1);xs.range;const xp=se(t=>{t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCDate(t.getUTCDate()+e)},(t,e)=>(e-t)/Ke,t=>Math.floor(t/Ke));xp.range;function bt(t){return se(e=>{e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)},(e,n)=>{e.setDate(e.getDate()+n*7)},(e,n)=>(n-e-(n.getTimezoneOffset()-e.getTimezoneOffset())*Se)/Ts)}const Ur=bt(0),_r=bt(1),Np=bt(2),Mp=bt(3),Vt=bt(4),Ap=bt(5),Rp=bt(6);Ur.range;_r.range;Np.range;Mp.range;Vt.range;Ap.range;Rp.range;function Tt(t){return se(e=>{e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)},(e,n)=>{e.setUTCDate(e.getUTCDate()+n*7)},(e,n)=>(n-e)/Ts)}const jl=Tt(0),pr=Tt(1),kp=Tt(2),Dp=Tt(3),Yt=Tt(4),Pp=Tt(5),Op=Tt(6);jl.range;pr.range;kp.range;Dp.range;Yt.range;Pp.range;Op.range;const Ns=se(t=>{t.setDate(1),t.setHours(0,0,0,0)},(t,e)=>{t.setMonth(t.getMonth()+e)},(t,e)=>e.getMonth()-t.getMonth()+(e.getFullYear()-t.getFullYear())*12,t=>t.getMonth());Ns.range;const Fp=se(t=>{t.setUTCDate(1),t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCMonth(t.getUTCMonth()+e)},(t,e)=>e.getUTCMonth()-t.getUTCMonth()+(e.getUTCFullYear()-t.getUTCFullYear())*12,t=>t.getUTCMonth());Fp.range;const Qe=se(t=>{t.setMonth(0,1),t.setHours(0,0,0,0)},(t,e)=>{t.setFullYear(t.getFullYear()+e)},(t,e)=>e.getFullYear()-t.getFullYear(),t=>t.getFullYear());Qe.every=t=>!isFinite(t=Math.floor(t))||!(t>0)?null:se(e=>{e.setFullYear(Math.floor(e.getFullYear()/t)*t),e.setMonth(0,1),e.setHours(0,0,0,0)},(e,n)=>{e.setFullYear(e.getFullYear()+n*t)});Qe.range;const yt=se(t=>{t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCFullYear(t.getUTCFullYear()+e)},(t,e)=>e.getUTCFullYear()-t.getUTCFullYear(),t=>t.getUTCFullYear());yt.every=t=>!isFinite(t=Math.floor(t))||!(t>0)?null:se(e=>{e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,n)=>{e.setUTCFullYear(e.getUTCFullYear()+n*t)});yt.range;function Lp(t,e,n,r,i,s){const o=[[kt,1,Ye],[kt,5,5*Ye],[kt,15,15*Ye],[kt,30,30*Ye],[s,1,Se],[s,5,5*Se],[s,15,15*Se],[s,30,30*Se],[i,1,ze],[i,3,3*ze],[i,6,6*ze],[i,12,12*ze],[r,1,Ke],[r,2,2*Ke],[n,1,Ts],[e,1,Xo],[e,3,3*Xo],[t,1,pi]];function a(c,u,h){const f=u<c;f&&([c,u]=[u,c]);const d=h&&typeof h.range=="function"?h:l(c,u,h),p=d?d.range(c,+u+1):[];return f?p.reverse():p}function l(c,u,h){const f=Math.abs(u-c)/h,d=_s(([,,C])=>C).right(o,f);if(d===o.length)return t.every(ki(c/pi,u/pi,h));if(d===0)return dr.every(Math.max(ki(c,u,h),1));const[p,v]=o[f/o[d-1][2]<o[d][2]/f?d-1:d];return p.every(v)}return[a,l]}const[Up,$p]=Lp(Qe,Ns,Ur,$n,Is,Ss);function gi(t){if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function mi(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function on(t,e,n){return{y:t,m:e,d:n,H:0,M:0,S:0,L:0}}function Bp(t){var e=t.dateTime,n=t.date,r=t.time,i=t.periods,s=t.days,o=t.shortDays,a=t.months,l=t.shortMonths,c=an(i),u=ln(i),h=an(s),f=ln(s),d=an(o),p=ln(o),v=an(a),C=ln(a),D=an(l),O=ln(l),S={a:Ne,A:Me,b:Ce,B:g,c:null,d:ra,e:ra,f:cg,g:vg,G:Cg,H:og,I:ag,j:lg,L:Kl,m:ug,M:hg,p:_,q:M,Q:oa,s:aa,S:fg,u:dg,U:_g,V:pg,w:gg,W:mg,x:null,X:null,y:yg,Y:wg,Z:Eg,"%":sa},E={a:P,A:F,b:L,B:$,c:null,d:ia,e:ia,f:Ig,g:Fg,G:Ug,H:bg,I:Tg,j:Sg,L:Xl,m:xg,M:Ng,p:A,q:B,Q:oa,s:aa,S:Mg,u:Ag,U:Rg,V:kg,w:Dg,W:Pg,x:null,X:null,y:Og,Y:Lg,Z:$g,"%":sa},b={a:de,A:R,b:ee,B:te,c:pe,d:ta,e:ta,f:ng,g:ea,G:Jo,H:na,I:na,j:Zp,L:tg,m:Xp,M:Jp,p:we,q:Qp,Q:ig,s:sg,S:eg,u:zp,U:qp,V:Gp,w:Yp,W:jp,x:xe,X:be,y:ea,Y:Jo,Z:Kp,"%":rg};S.x=x(n,S),S.X=x(r,S),S.c=x(e,S),E.x=x(n,E),E.X=x(r,E),E.c=x(e,E);function x(y,I){return function(N){var m=[],Y=-1,T=0,j=y.length,J,ie,Te;for(N instanceof Date||(N=new Date(+N));++Y<j;)y.charCodeAt(Y)===37&&(m.push(y.slice(T,Y)),(ie=Zo[J=y.charAt(++Y)])!=null?J=y.charAt(++Y):ie=J==="e"?" ":"0",(Te=I[J])&&(J=Te(N,ie)),m.push(J),T=Y+1);return m.push(y.slice(T,Y)),m.join("")}}function U(y,I){return function(N){var m=on(1900,void 0,1),Y=G(m,y,N+="",0),T,j;if(Y!=N.length)return null;if("Q"in m)return new Date(m.Q);if("s"in m)return new Date(m.s*1e3+("L"in m?m.L:0));if(I&&!("Z"in m)&&(m.Z=0),"p"in m&&(m.H=m.H%12+m.p*12),m.m===void 0&&(m.m="q"in m?m.q:0),"V"in m){if(m.V<1||m.V>53)return null;"w"in m||(m.w=1),"Z"in m?(T=mi(on(m.y,0,1)),j=T.getUTCDay(),T=j>4||j===0?pr.ceil(T):pr(T),T=xs.offset(T,(m.V-1)*7),m.y=T.getUTCFullYear(),m.m=T.getUTCMonth(),m.d=T.getUTCDate()+(m.w+6)%7):(T=gi(on(m.y,0,1)),j=T.getDay(),T=j>4||j===0?_r.ceil(T):_r(T),T=$n.offset(T,(m.V-1)*7),m.y=T.getFullYear(),m.m=T.getMonth(),m.d=T.getDate()+(m.w+6)%7)}else("W"in m||"U"in m)&&("w"in m||(m.w="u"in m?m.u%7:"W"in m?1:0),j="Z"in m?mi(on(m.y,0,1)).getUTCDay():gi(on(m.y,0,1)).getDay(),m.m=0,m.d="W"in m?(m.w+6)%7+m.W*7-(j+5)%7:m.w+m.U*7-(j+6)%7);return"Z"in m?(m.H+=m.Z/100|0,m.M+=m.Z%100,mi(m)):gi(m)}}function G(y,I,N,m){for(var Y=0,T=I.length,j=N.length,J,ie;Y<T;){if(m>=j)return-1;if(J=I.charCodeAt(Y++),J===37){if(J=I.charAt(Y++),ie=b[J in Zo?I.charAt(Y++):J],!ie||(m=ie(y,N,m))<0)return-1}else if(J!=N.charCodeAt(m++))return-1}return m}function we(y,I,N){var m=c.exec(I.slice(N));return m?(y.p=u.get(m[0].toLowerCase()),N+m[0].length):-1}function de(y,I,N){var m=d.exec(I.slice(N));return m?(y.w=p.get(m[0].toLowerCase()),N+m[0].length):-1}function R(y,I,N){var m=h.exec(I.slice(N));return m?(y.w=f.get(m[0].toLowerCase()),N+m[0].length):-1}function ee(y,I,N){var m=D.exec(I.slice(N));return m?(y.m=O.get(m[0].toLowerCase()),N+m[0].length):-1}function te(y,I,N){var m=v.exec(I.slice(N));return m?(y.m=C.get(m[0].toLowerCase()),N+m[0].length):-1}function pe(y,I,N){return G(y,e,I,N)}function xe(y,I,N){return G(y,n,I,N)}function be(y,I,N){return G(y,r,I,N)}function Ne(y){return o[y.getDay()]}function Me(y){return s[y.getDay()]}function Ce(y){return l[y.getMonth()]}function g(y){return a[y.getMonth()]}function _(y){return i[+(y.getHours()>=12)]}function M(y){return 1+~~(y.getMonth()/3)}function P(y){return o[y.getUTCDay()]}function F(y){return s[y.getUTCDay()]}function L(y){return l[y.getUTCMonth()]}function $(y){return a[y.getUTCMonth()]}function A(y){return i[+(y.getUTCHours()>=12)]}function B(y){return 1+~~(y.getUTCMonth()/3)}return{format:function(y){var I=x(y+="",S);return I.toString=function(){return y},I},parse:function(y){var I=U(y+="",!1);return I.toString=function(){return y},I},utcFormat:function(y){var I=x(y+="",E);return I.toString=function(){return y},I},utcParse:function(y){var I=U(y+="",!0);return I.toString=function(){return y},I}}}var Zo={"-":"",_:" ",0:"0"},ue=/^\s*\d+/,Wp=/^%/,Hp=/[\\^$*+?|[\]().{}]/g;function z(t,e,n){var r=t<0?"-":"",i=(r?-t:t)+"",s=i.length;return r+(s<n?new Array(n-s+1).join(e)+i:i)}function Vp(t){return t.replace(Hp,"\\$&")}function an(t){return new RegExp("^(?:"+t.map(Vp).join("|")+")","i")}function ln(t){return new Map(t.map((e,n)=>[e.toLowerCase(),n]))}function Yp(t,e,n){var r=ue.exec(e.slice(n,n+1));return r?(t.w=+r[0],n+r[0].length):-1}function zp(t,e,n){var r=ue.exec(e.slice(n,n+1));return r?(t.u=+r[0],n+r[0].length):-1}function qp(t,e,n){var r=ue.exec(e.slice(n,n+2));return r?(t.U=+r[0],n+r[0].length):-1}function Gp(t,e,n){var r=ue.exec(e.slice(n,n+2));return r?(t.V=+r[0],n+r[0].length):-1}function jp(t,e,n){var r=ue.exec(e.slice(n,n+2));return r?(t.W=+r[0],n+r[0].length):-1}function Jo(t,e,n){var r=ue.exec(e.slice(n,n+4));return r?(t.y=+r[0],n+r[0].length):-1}function ea(t,e,n){var r=ue.exec(e.slice(n,n+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function Kp(t,e,n){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n,n+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function Qp(t,e,n){var r=ue.exec(e.slice(n,n+1));return r?(t.q=r[0]*3-3,n+r[0].length):-1}function Xp(t,e,n){var r=ue.exec(e.slice(n,n+2));return r?(t.m=r[0]-1,n+r[0].length):-1}function ta(t,e,n){var r=ue.exec(e.slice(n,n+2));return r?(t.d=+r[0],n+r[0].length):-1}function Zp(t,e,n){var r=ue.exec(e.slice(n,n+3));return r?(t.m=0,t.d=+r[0],n+r[0].length):-1}function na(t,e,n){var r=ue.exec(e.slice(n,n+2));return r?(t.H=+r[0],n+r[0].length):-1}function Jp(t,e,n){var r=ue.exec(e.slice(n,n+2));return r?(t.M=+r[0],n+r[0].length):-1}function eg(t,e,n){var r=ue.exec(e.slice(n,n+2));return r?(t.S=+r[0],n+r[0].length):-1}function tg(t,e,n){var r=ue.exec(e.slice(n,n+3));return r?(t.L=+r[0],n+r[0].length):-1}function ng(t,e,n){var r=ue.exec(e.slice(n,n+6));return r?(t.L=Math.floor(r[0]/1e3),n+r[0].length):-1}function rg(t,e,n){var r=Wp.exec(e.slice(n,n+1));return r?n+r[0].length:-1}function ig(t,e,n){var r=ue.exec(e.slice(n));return r?(t.Q=+r[0],n+r[0].length):-1}function sg(t,e,n){var r=ue.exec(e.slice(n));return r?(t.s=+r[0],n+r[0].length):-1}function ra(t,e){return z(t.getDate(),e,2)}function og(t,e){return z(t.getHours(),e,2)}function ag(t,e){return z(t.getHours()%12||12,e,2)}function lg(t,e){return z(1+$n.count(Qe(t),t),e,3)}function Kl(t,e){return z(t.getMilliseconds(),e,3)}function cg(t,e){return Kl(t,e)+"000"}function ug(t,e){return z(t.getMonth()+1,e,2)}function hg(t,e){return z(t.getMinutes(),e,2)}function fg(t,e){return z(t.getSeconds(),e,2)}function dg(t){var e=t.getDay();return e===0?7:e}function _g(t,e){return z(Ur.count(Qe(t)-1,t),e,2)}function Ql(t){var e=t.getDay();return e>=4||e===0?Vt(t):Vt.ceil(t)}function pg(t,e){return t=Ql(t),z(Vt.count(Qe(t),t)+(Qe(t).getDay()===4),e,2)}function gg(t){return t.getDay()}function mg(t,e){return z(_r.count(Qe(t)-1,t),e,2)}function yg(t,e){return z(t.getFullYear()%100,e,2)}function vg(t,e){return t=Ql(t),z(t.getFullYear()%100,e,2)}function wg(t,e){return z(t.getFullYear()%1e4,e,4)}function Cg(t,e){var n=t.getDay();return t=n>=4||n===0?Vt(t):Vt.ceil(t),z(t.getFullYear()%1e4,e,4)}function Eg(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+z(e/60|0,"0",2)+z(e%60,"0",2)}function ia(t,e){return z(t.getUTCDate(),e,2)}function bg(t,e){return z(t.getUTCHours(),e,2)}function Tg(t,e){return z(t.getUTCHours()%12||12,e,2)}function Sg(t,e){return z(1+xs.count(yt(t),t),e,3)}function Xl(t,e){return z(t.getUTCMilliseconds(),e,3)}function Ig(t,e){return Xl(t,e)+"000"}function xg(t,e){return z(t.getUTCMonth()+1,e,2)}function Ng(t,e){return z(t.getUTCMinutes(),e,2)}function Mg(t,e){return z(t.getUTCSeconds(),e,2)}function Ag(t){var e=t.getUTCDay();return e===0?7:e}function Rg(t,e){return z(jl.count(yt(t)-1,t),e,2)}function Zl(t){var e=t.getUTCDay();return e>=4||e===0?Yt(t):Yt.ceil(t)}function kg(t,e){return t=Zl(t),z(Yt.count(yt(t),t)+(yt(t).getUTCDay()===4),e,2)}function Dg(t){return t.getUTCDay()}function Pg(t,e){return z(pr.count(yt(t)-1,t),e,2)}function Og(t,e){return z(t.getUTCFullYear()%100,e,2)}function Fg(t,e){return t=Zl(t),z(t.getUTCFullYear()%100,e,2)}function Lg(t,e){return z(t.getUTCFullYear()%1e4,e,4)}function Ug(t,e){var n=t.getUTCDay();return t=n>=4||n===0?Yt(t):Yt.ceil(t),z(t.getUTCFullYear()%1e4,e,4)}function $g(){return"+0000"}function sa(){return"%"}function oa(t){return+t}function aa(t){return Math.floor(+t/1e3)}var xt,Jl;Bg({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function Bg(t){return xt=Bp(t),Jl=xt.format,xt.parse,xt.utcFormat,xt.utcParse,xt}function Wg(t){return new Date(t)}function Hg(t){return t instanceof Date?+t:+new Date(+t)}function ec(t,e,n,r,i,s,o,a,l,c){var u=Gl(),h=u.invert,f=u.domain,d=c(".%L"),p=c(":%S"),v=c("%I:%M"),C=c("%I %p"),D=c("%a %d"),O=c("%b %d"),S=c("%B"),E=c("%Y");function b(x){return(l(x)<x?d:a(x)<x?p:o(x)<x?v:s(x)<x?C:r(x)<x?i(x)<x?D:O:n(x)<x?S:E)(x)}return u.invert=function(x){return new Date(h(x))},u.domain=function(x){return arguments.length?f(Array.from(x,Hg)):f().map(Wg)},u.ticks=function(x){var U=f();return t(U[0],U[U.length-1],x??10)},u.tickFormat=function(x,U){return U==null?b:c(U)},u.nice=function(x){var U=f();return(!x||typeof x.range!="function")&&(x=e(U[0],U[U.length-1],x??10)),x?f(Tp(U,x)):u},u.copy=function(){return ql(u,ec(t,e,n,r,i,s,o,a,l,c))},u}function sC(){return zl.apply(ec(Up,$p,Qe,Ns,Ur,$n,Is,Ss,kt,Jl).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}function Nt(t){return function(){return t}}function Vg(t){let e=3;return t.digits=function(n){if(!arguments.length)return e;if(n==null)e=null;else{const r=Math.floor(n);if(!(r>=0))throw new RangeError(`invalid digits: ${n}`);e=r}return t},()=>new j_(e)}function Yg(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function tc(t){this._context=t}tc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:this._context.lineTo(t,e);break}}};function zg(t){return new tc(t)}function qg(t){return t[0]}function Gg(t){return t[1]}function oC(t,e){var n=Nt(!0),r=null,i=zg,s=null,o=Vg(a);t=typeof t=="function"?t:t===void 0?qg:Nt(t),e=typeof e=="function"?e:e===void 0?Gg:Nt(e);function a(l){var c,u=(l=Yg(l)).length,h,f=!1,d;for(r==null&&(s=i(d=o())),c=0;c<=u;++c)!(c<u&&n(h=l[c],c,l))===f&&((f=!f)?s.lineStart():s.lineEnd()),f&&s.point(+t(h,c,l),+e(h,c,l));if(d)return s=null,d+""||null}return a.x=function(l){return arguments.length?(t=typeof l=="function"?l:Nt(+l),a):t},a.y=function(l){return arguments.length?(e=typeof l=="function"?l:Nt(+l),a):e},a.defined=function(l){return arguments.length?(n=typeof l=="function"?l:Nt(!!l),a):n},a.curve=function(l){return arguments.length?(i=l,r!=null&&(s=i(r)),a):i},a.context=function(l){return arguments.length?(l==null?r=s=null:s=i(r=l),a):r},a}function la(t){return t<0?-1:1}function ca(t,e,n){var r=t._x1-t._x0,i=e-t._x1,s=(t._y1-t._y0)/(r||i<0&&-0),o=(n-t._y1)/(i||r<0&&-0),a=(s*i+o*r)/(r+i);return(la(s)+la(o))*Math.min(Math.abs(s),Math.abs(o),.5*Math.abs(a))||0}function ua(t,e){var n=t._x1-t._x0;return n?(3*(t._y1-t._y0)/n-e)/2:e}function yi(t,e,n){var r=t._x0,i=t._y0,s=t._x1,o=t._y1,a=(s-r)/3;t._context.bezierCurveTo(r+a,i+a*e,s-a,o-a*n,s,o)}function gr(t){this._context=t}gr.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:yi(this,this._t0,ua(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){var n=NaN;if(t=+t,e=+e,!(t===this._x1&&e===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,yi(this,ua(this,n=ca(this,t,e)),n);break;default:yi(this,this._t0,n=ca(this,t,e));break}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e,this._t0=n}}};Object.create(gr.prototype).point=function(t,e){gr.prototype.point.call(this,e,t)};function aC(t){return new gr(t)}function gn(t,e,n){this.k=t,this.x=e,this.y=n}gn.prototype={constructor:gn,scale:function(t){return t===1?this:new gn(this.k*t,this.x,this.y)},translate:function(t,e){return t===0&e===0?this:new gn(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};gn.prototype;var Ms={};(function t(e,n,r,i){var s=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),o=typeof Path2D=="function"&&typeof DOMMatrix=="function",a=(function(){if(!e.OffscreenCanvas)return!1;var g=new OffscreenCanvas(1,1),_=g.getContext("2d");_.fillRect(0,0,1,1);var M=g.transferToImageBitmap();try{_.createPattern(M,"no-repeat")}catch{return!1}return!0})();function l(){}function c(g){var _=n.exports.Promise,M=_!==void 0?_:e.Promise;return typeof M=="function"?new M(g):(g(l,l),null)}var u=(function(g,_){return{transform:function(M){if(g)return M;if(_.has(M))return _.get(M);var P=new OffscreenCanvas(M.width,M.height),F=P.getContext("2d");return F.drawImage(M,0,0),_.set(M,P),P},clear:function(){_.clear()}}})(a,new Map),h=(function(){var g=Math.floor(16.666666666666668),_,M,P={},F=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(_=function(L){var $=Math.random();return P[$]=requestAnimationFrame(function A(B){F===B||F+g-1<B?(F=B,delete P[$],L()):P[$]=requestAnimationFrame(A)}),$},M=function(L){P[L]&&cancelAnimationFrame(P[L])}):(_=function(L){return setTimeout(L,g)},M=function(L){return clearTimeout(L)}),{frame:_,cancel:M}})(),f=(function(){var g,_,M={};function P(F){function L($,A){F.postMessage({options:$||{},callback:A})}F.init=function(A){var B=A.transferControlToOffscreen();F.postMessage({canvas:B},[B])},F.fire=function(A,B,y){if(_)return L(A,null),_;var I=Math.random().toString(36).slice(2);return _=c(function(N){function m(Y){Y.data.callback===I&&(delete M[I],F.removeEventListener("message",m),_=null,u.clear(),y(),N())}F.addEventListener("message",m),L(A,I),M[I]=m.bind(null,{data:{callback:I}})}),_},F.reset=function(){F.postMessage({reset:!0});for(var A in M)M[A](),delete M[A]}}return function(){if(g)return g;if(!r&&s){var F=["var CONFETTI, SIZE = {}, module = {};","("+t.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{g=new Worker(URL.createObjectURL(new Blob([F])))}catch(L){return typeof console!==void 0&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",L),null}P(g)}return g}})(),d={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function p(g,_){return _?_(g):g}function v(g){return g!=null}function C(g,_,M){return p(g&&v(g[_])?g[_]:d[_],M)}function D(g){return g<0?0:Math.floor(g)}function O(g,_){return Math.floor(Math.random()*(_-g))+g}function S(g){return parseInt(g,16)}function E(g){return g.map(b)}function b(g){var _=String(g).replace(/[^0-9a-f]/gi,"");return _.length<6&&(_=_[0]+_[0]+_[1]+_[1]+_[2]+_[2]),{r:S(_.substring(0,2)),g:S(_.substring(2,4)),b:S(_.substring(4,6))}}function x(g){var _=C(g,"origin",Object);return _.x=C(_,"x",Number),_.y=C(_,"y",Number),_}function U(g){g.width=document.documentElement.clientWidth,g.height=document.documentElement.clientHeight}function G(g){var _=g.getBoundingClientRect();g.width=_.width,g.height=_.height}function we(g){var _=document.createElement("canvas");return _.style.position="fixed",_.style.top="0px",_.style.left="0px",_.style.pointerEvents="none",_.style.zIndex=g,_}function de(g,_,M,P,F,L,$,A,B){g.save(),g.translate(_,M),g.rotate(L),g.scale(P,F),g.arc(0,0,1,$,A,B),g.restore()}function R(g){var _=g.angle*(Math.PI/180),M=g.spread*(Math.PI/180);return{x:g.x,y:g.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:g.startVelocity*.5+Math.random()*g.startVelocity,angle2D:-_+(.5*M-Math.random()*M),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:g.color,shape:g.shape,tick:0,totalTicks:g.ticks,decay:g.decay,drift:g.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:g.gravity*3,ovalScalar:.6,scalar:g.scalar,flat:g.flat}}function ee(g,_){_.x+=Math.cos(_.angle2D)*_.velocity+_.drift,_.y+=Math.sin(_.angle2D)*_.velocity+_.gravity,_.velocity*=_.decay,_.flat?(_.wobble=0,_.wobbleX=_.x+10*_.scalar,_.wobbleY=_.y+10*_.scalar,_.tiltSin=0,_.tiltCos=0,_.random=1):(_.wobble+=_.wobbleSpeed,_.wobbleX=_.x+10*_.scalar*Math.cos(_.wobble),_.wobbleY=_.y+10*_.scalar*Math.sin(_.wobble),_.tiltAngle+=.1,_.tiltSin=Math.sin(_.tiltAngle),_.tiltCos=Math.cos(_.tiltAngle),_.random=Math.random()+2);var M=_.tick++/_.totalTicks,P=_.x+_.random*_.tiltCos,F=_.y+_.random*_.tiltSin,L=_.wobbleX+_.random*_.tiltCos,$=_.wobbleY+_.random*_.tiltSin;if(g.fillStyle="rgba("+_.color.r+", "+_.color.g+", "+_.color.b+", "+(1-M)+")",g.beginPath(),o&&_.shape.type==="path"&&typeof _.shape.path=="string"&&Array.isArray(_.shape.matrix))g.fill(Ne(_.shape.path,_.shape.matrix,_.x,_.y,Math.abs(L-P)*.1,Math.abs($-F)*.1,Math.PI/10*_.wobble));else if(_.shape.type==="bitmap"){var A=Math.PI/10*_.wobble,B=Math.abs(L-P)*.1,y=Math.abs($-F)*.1,I=_.shape.bitmap.width*_.scalar,N=_.shape.bitmap.height*_.scalar,m=new DOMMatrix([Math.cos(A)*B,Math.sin(A)*B,-Math.sin(A)*y,Math.cos(A)*y,_.x,_.y]);m.multiplySelf(new DOMMatrix(_.shape.matrix));var Y=g.createPattern(u.transform(_.shape.bitmap),"no-repeat");Y.setTransform(m),g.globalAlpha=1-M,g.fillStyle=Y,g.fillRect(_.x-I/2,_.y-N/2,I,N),g.globalAlpha=1}else if(_.shape==="circle")g.ellipse?g.ellipse(_.x,_.y,Math.abs(L-P)*_.ovalScalar,Math.abs($-F)*_.ovalScalar,Math.PI/10*_.wobble,0,2*Math.PI):de(g,_.x,_.y,Math.abs(L-P)*_.ovalScalar,Math.abs($-F)*_.ovalScalar,Math.PI/10*_.wobble,0,2*Math.PI);else if(_.shape==="star")for(var T=Math.PI/2*3,j=4*_.scalar,J=8*_.scalar,ie=_.x,Te=_.y,ct=5,Le=Math.PI/ct;ct--;)ie=_.x+Math.cos(T)*J,Te=_.y+Math.sin(T)*J,g.lineTo(ie,Te),T+=Le,ie=_.x+Math.cos(T)*j,Te=_.y+Math.sin(T)*j,g.lineTo(ie,Te),T+=Le;else g.moveTo(Math.floor(_.x),Math.floor(_.y)),g.lineTo(Math.floor(_.wobbleX),Math.floor(F)),g.lineTo(Math.floor(L),Math.floor($)),g.lineTo(Math.floor(P),Math.floor(_.wobbleY));return g.closePath(),g.fill(),_.tick<_.totalTicks}function te(g,_,M,P,F){var L=_.slice(),$=g.getContext("2d"),A,B,y=c(function(I){function N(){A=B=null,$.clearRect(0,0,P.width,P.height),u.clear(),F(),I()}function m(){r&&!(P.width===i.width&&P.height===i.height)&&(P.width=g.width=i.width,P.height=g.height=i.height),!P.width&&!P.height&&(M(g),P.width=g.width,P.height=g.height),$.clearRect(0,0,P.width,P.height),L=L.filter(function(Y){return ee($,Y)}),L.length?A=h.frame(m):N()}A=h.frame(m),B=N});return{addFettis:function(I){return L=L.concat(I),y},canvas:g,promise:y,reset:function(){A&&h.cancel(A),B&&B()}}}function pe(g,_){var M=!g,P=!!C(_||{},"resize"),F=!1,L=C(_,"disableForReducedMotion",Boolean),$=s&&!!C(_||{},"useWorker"),A=$?f():null,B=M?U:G,y=g&&A?!!g.__confetti_initialized:!1,I=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,N;function m(T,j,J){for(var ie=C(T,"particleCount",D),Te=C(T,"angle",Number),ct=C(T,"spread",Number),Le=C(T,"startVelocity",Number),Mu=C(T,"decay",Number),Au=C(T,"gravity",Number),Ru=C(T,"drift",Number),_o=C(T,"colors",E),ku=C(T,"ticks",Number),po=C(T,"shapes"),Du=C(T,"scalar"),Pu=!!C(T,"flat"),go=x(T),mo=ie,Zr=[],Ou=g.width*go.x,Fu=g.height*go.y;mo--;)Zr.push(R({x:Ou,y:Fu,angle:Te,spread:ct,startVelocity:Le,color:_o[mo%_o.length],shape:po[O(0,po.length)],ticks:ku,decay:Mu,gravity:Au,drift:Ru,scalar:Du,flat:Pu}));return N?N.addFettis(Zr):(N=te(g,Zr,B,j,J),N.promise)}function Y(T){var j=L||C(T,"disableForReducedMotion",Boolean),J=C(T,"zIndex",Number);if(j&&I)return c(function(Le){Le()});M&&N?g=N.canvas:M&&!g&&(g=we(J),document.body.appendChild(g)),P&&!y&&B(g);var ie={width:g.width,height:g.height};A&&!y&&A.init(g),y=!0,A&&(g.__confetti_initialized=!0);function Te(){if(A){var Le={getBoundingClientRect:function(){if(!M)return g.getBoundingClientRect()}};B(Le),A.postMessage({resize:{width:Le.width,height:Le.height}});return}ie.width=ie.height=null}function ct(){N=null,P&&(F=!1,e.removeEventListener("resize",Te)),M&&g&&(document.body.contains(g)&&document.body.removeChild(g),g=null,y=!1)}return P&&!F&&(F=!0,e.addEventListener("resize",Te,!1)),A?A.fire(T,ie,ct):m(T,ie,ct)}return Y.reset=function(){A&&A.reset(),N&&N.reset()},Y}var xe;function be(){return xe||(xe=pe(null,{useWorker:!0,resize:!0})),xe}function Ne(g,_,M,P,F,L,$){var A=new Path2D(g),B=new Path2D;B.addPath(A,new DOMMatrix(_));var y=new Path2D;return y.addPath(B,new DOMMatrix([Math.cos($)*F,Math.sin($)*F,-Math.sin($)*L,Math.cos($)*L,M,P])),y}function Me(g){if(!o)throw new Error("path confetti are not supported in this browser");var _,M;typeof g=="string"?_=g:(_=g.path,M=g.matrix);var P=new Path2D(_),F=document.createElement("canvas"),L=F.getContext("2d");if(!M){for(var $=1e3,A=$,B=$,y=0,I=0,N,m,Y=0;Y<$;Y+=2)for(var T=0;T<$;T+=2)L.isPointInPath(P,Y,T,"nonzero")&&(A=Math.min(A,Y),B=Math.min(B,T),y=Math.max(y,Y),I=Math.max(I,T));N=y-A,m=I-B;var j=10,J=Math.min(j/N,j/m);M=[J,0,0,J,-Math.round(N/2+A)*J,-Math.round(m/2+B)*J]}return{type:"path",path:_,matrix:M}}function Ce(g){var _,M=1,P="#000000",F='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof g=="string"?_=g:(_=g.text,M="scalar"in g?g.scalar:M,F="fontFamily"in g?g.fontFamily:F,P="color"in g?g.color:P);var L=10*M,$=""+L+"px "+F,A=new OffscreenCanvas(L,L),B=A.getContext("2d");B.font=$;var y=B.measureText(_),I=Math.ceil(y.actualBoundingBoxRight+y.actualBoundingBoxLeft),N=Math.ceil(y.actualBoundingBoxAscent+y.actualBoundingBoxDescent),m=2,Y=y.actualBoundingBoxLeft+m,T=y.actualBoundingBoxAscent+m;I+=m+m,N+=m+m,A=new OffscreenCanvas(I,N),B=A.getContext("2d"),B.font=$,B.fillStyle=P,B.fillText(_,Y,T);var j=1/M;return{type:"bitmap",bitmap:A.transferToImageBitmap(),matrix:[j,0,0,j,-I*j/2,-N*j/2]}}n.exports=function(){return be().apply(this,arguments)},n.exports.reset=function(){be().reset()},n.exports.create=pe,n.exports.shapeFromPath=Me,n.exports.shapeFromText=Ce})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Ms,!1);const lC=Ms.exports;Ms.exports.create;var ha={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w=function(t,e){if(!t)throw Xt(e)},Xt=function(t){return new Error("Firebase Database ("+nc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rc=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},jg=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},As={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,l=i+2<t.length,c=l?t[i+2]:0,u=s>>2,h=(s&3)<<4|a>>4;let f=(a&15)<<2|c>>6,d=c&63;l||(d=64,o||(f=64)),r.push(n[u],n[h],n[f],n[d])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(rc(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):jg(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||c==null||h==null)throw new Kg;const f=s<<2|a>>4;if(r.push(f),c!==64){const d=a<<4&240|c>>2;if(r.push(d),h!==64){const p=c<<6&192|h;r.push(p)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Kg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ic=function(t){const e=rc(t);return As.encodeByteArray(e,!0)},mr=function(t){return ic(t).replace(/\./g,"")},Yi=function(t){try{return As.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qg(t){return sc(void 0,t)}function sc(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Xg(n)||(t[n]=sc(t[n],e[n]));return t}function Xg(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jg=()=>Zg().__FIREBASE_DEFAULTS__,em=()=>{if(typeof process>"u"||typeof ha>"u")return;const t=ha.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},tm=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Yi(t[1]);return e&&JSON.parse(e)},oc=()=>{try{return Jg()||em()||tm()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},nm=t=>{var e,n;return(n=(e=oc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},rm=t=>{const e=nm(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},ac=()=>{var t;return(t=oc())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function im(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[mr(JSON.stringify(n)),mr(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sm(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(sm())}function om(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function am(){return nc.NODE_ADMIN===!0}function lm(){try{return typeof indexedDB=="object"}catch{return!1}}function cm(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const um="FirebaseError";class Wn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=um,Object.setPrototypeOf(this,Wn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,cc.prototype.create)}}class cc{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?hm(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Wn(i,a,r)}}function hm(t,e){return t.replace(fm,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const fm=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sn(t){return JSON.parse(t)}function ce(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc=function(t){let e={},n={},r={},i="";try{const s=t.split(".");e=Sn(Yi(s[0])||""),n=Sn(Yi(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:i}},dm=function(t){const e=uc(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},_m=function(t){const e=uc(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function zt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function fa(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function yr(t,e,n){const r={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=e.call(n,t[i],i,t));return r}function zi(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(da(s)&&da(o)){if(!zi(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function da(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pm(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)r[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)r[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const f=r[h-3]^r[h-8]^r[h-14]^r[h-16];r[h]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^s&(o^a),u=1518500249):(c=s^o^a,u=1859775393):h<60?(c=s&o|a&(s|o),u=2400959708):(c=s^o^a,u=3395469782);const f=(i<<5|i>>>27)+c+l+u+r[h]&4294967295;l=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<n;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function $r(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mm=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,w(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Br=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zt(t){return t&&t._delegate?t._delegate:t}class In{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Bn;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wm(e))try{this.getOrInitializeService({instanceIdentifier:ht})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=ht){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ht){return this.instances.has(e)}getOptions(e=ht){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:vm(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ht){return this.component?this.component.multipleInstances?e:ht:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function vm(t){return t===ht?void 0:t}function wm(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new ym(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(X||(X={}));const Em={debug:X.DEBUG,verbose:X.VERBOSE,info:X.INFO,warn:X.WARN,error:X.ERROR,silent:X.SILENT},bm=X.INFO,Tm={[X.DEBUG]:"log",[X.VERBOSE]:"log",[X.INFO]:"info",[X.WARN]:"warn",[X.ERROR]:"error"},Sm=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Tm[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class hc{constructor(e){this.name=e,this._logLevel=bm,this._logHandler=Sm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in X))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Em[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,X.DEBUG,...e),this._logHandler(this,X.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,X.VERBOSE,...e),this._logHandler(this,X.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,X.INFO,...e),this._logHandler(this,X.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,X.WARN,...e),this._logHandler(this,X.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,X.ERROR,...e),this._logHandler(this,X.ERROR,...e)}}const Im=(t,e)=>e.some(n=>t instanceof n);let _a,pa;function xm(){return _a||(_a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Nm(){return pa||(pa=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const fc=new WeakMap,qi=new WeakMap,dc=new WeakMap,vi=new WeakMap,Rs=new WeakMap;function Mm(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(rt(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&fc.set(n,t)}).catch(()=>{}),Rs.set(e,t),e}function Am(t){if(qi.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});qi.set(t,e)}let Gi={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return qi.get(t);if(e==="objectStoreNames")return t.objectStoreNames||dc.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return rt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Rm(t){Gi=t(Gi)}function km(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(wi(this),e,...n);return dc.set(r,e.sort?e.sort():[e]),rt(r)}:Nm().includes(t)?function(...e){return t.apply(wi(this),e),rt(fc.get(this))}:function(...e){return rt(t.apply(wi(this),e))}}function Dm(t){return typeof t=="function"?km(t):(t instanceof IDBTransaction&&Am(t),Im(t,xm())?new Proxy(t,Gi):t)}function rt(t){if(t instanceof IDBRequest)return Mm(t);if(vi.has(t))return vi.get(t);const e=Dm(t);return e!==t&&(vi.set(t,e),Rs.set(e,t)),e}const wi=t=>Rs.get(t);function Pm(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=rt(o);return r&&o.addEventListener("upgradeneeded",l=>{r(rt(o.result),l.oldVersion,l.newVersion,rt(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Om=["get","getKey","getAll","getAllKeys","count"],Fm=["put","add","delete","clear"],Ci=new Map;function ga(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ci.get(e))return Ci.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=Fm.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Om.includes(n)))return;const s=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),i&&l.done]))[0]};return Ci.set(e,s),s}Rm(t=>({...t,get:(e,n,r)=>ga(e,n)||t.get(e,n,r),has:(e,n)=>!!ga(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Um(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Um(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ji="@firebase/app",ma="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe=new hc("@firebase/app"),$m="@firebase/app-compat",Bm="@firebase/analytics-compat",Wm="@firebase/analytics",Hm="@firebase/app-check-compat",Vm="@firebase/app-check",Ym="@firebase/auth",zm="@firebase/auth-compat",qm="@firebase/database",Gm="@firebase/data-connect",jm="@firebase/database-compat",Km="@firebase/functions",Qm="@firebase/functions-compat",Xm="@firebase/installations",Zm="@firebase/installations-compat",Jm="@firebase/messaging",ey="@firebase/messaging-compat",ty="@firebase/performance",ny="@firebase/performance-compat",ry="@firebase/remote-config",iy="@firebase/remote-config-compat",sy="@firebase/storage",oy="@firebase/storage-compat",ay="@firebase/firestore",ly="@firebase/vertexai-preview",cy="@firebase/firestore-compat",uy="firebase",hy="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki="[DEFAULT]",fy={[ji]:"fire-core",[$m]:"fire-core-compat",[Wm]:"fire-analytics",[Bm]:"fire-analytics-compat",[Vm]:"fire-app-check",[Hm]:"fire-app-check-compat",[Ym]:"fire-auth",[zm]:"fire-auth-compat",[qm]:"fire-rtdb",[Gm]:"fire-data-connect",[jm]:"fire-rtdb-compat",[Km]:"fire-fn",[Qm]:"fire-fn-compat",[Xm]:"fire-iid",[Zm]:"fire-iid-compat",[Jm]:"fire-fcm",[ey]:"fire-fcm-compat",[ty]:"fire-perf",[ny]:"fire-perf-compat",[ry]:"fire-rc",[iy]:"fire-rc-compat",[sy]:"fire-gcs",[oy]:"fire-gcs-compat",[ay]:"fire-fst",[cy]:"fire-fst-compat",[ly]:"fire-vertex","fire-js":"fire-js",[uy]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn=new Map,dy=new Map,Qi=new Map;function ya(t,e){try{t.container.addComponent(e)}catch(n){Xe.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function vr(t){const e=t.name;if(Qi.has(e))return Xe.debug(`There were multiple attempts to register component ${e}.`),!1;Qi.set(e,t);for(const n of xn.values())ya(n,t);for(const n of dy.values())ya(n,t);return!0}function _y(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},it=new cc("app","Firebase",py);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gy{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new In("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw it.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my=hy;function _c(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ki,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw it.create("bad-app-name",{appName:String(i)});if(n||(n=ac()),!n)throw it.create("no-options");const s=xn.get(i);if(s){if(zi(n,s.options)&&zi(r,s.config))return s;throw it.create("duplicate-app",{appName:i})}const o=new Cm(i);for(const l of Qi.values())o.addComponent(l);const a=new gy(n,r,o);return xn.set(i,a),a}function pc(t=Ki){const e=xn.get(t);if(!e&&t===Ki&&ac())return _c();if(!e)throw it.create("no-app",{appName:t});return e}function yy(){return Array.from(xn.values())}function Ot(t,e,n){var r;let i=(r=fy[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xe.warn(a.join(" "));return}vr(new In(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy="firebase-heartbeat-database",wy=1,Nn="firebase-heartbeat-store";let Ei=null;function gc(){return Ei||(Ei=Pm(vy,wy,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Nn)}catch(n){console.warn(n)}}}}).catch(t=>{throw it.create("idb-open",{originalErrorMessage:t.message})})),Ei}async function Cy(t){try{const n=(await gc()).transaction(Nn),r=await n.objectStore(Nn).get(mc(t));return await n.done,r}catch(e){if(e instanceof Wn)Xe.warn(e.message);else{const n=it.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Xe.warn(n.message)}}}async function va(t,e){try{const r=(await gc()).transaction(Nn,"readwrite");await r.objectStore(Nn).put(e,mc(t)),await r.done}catch(n){if(n instanceof Wn)Xe.warn(n.message);else{const r=it.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Xe.warn(r.message)}}}function mc(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey=1024,by=720*60*60*1e3;class Ty{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Iy(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=wa();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=by}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Xe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=wa(),{heartbeatsToSend:r,unsentEntries:i}=Sy(this._heartbeatsCache.heartbeats),s=mr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Xe.warn(n),""}}}function wa(){return new Date().toISOString().substring(0,10)}function Sy(t,e=Ey){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Ca(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ca(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Iy{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return lm()?cm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Cy(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return va(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return va(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ca(t){return mr(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xy(t){vr(new In("platform-logger",e=>new Lm(e),"PRIVATE")),vr(new In("heartbeat",e=>new Ty(e),"PRIVATE")),Ot(ji,ma,t),Ot(ji,ma,"esm2017"),Ot("fire-js","")}xy("");var Ny="firebase",My="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ot(Ny,My,"app");var Ea={};const ba="@firebase/database",Ta="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yc="";function Ay(t){yc=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ry{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ce(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Sn(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ky{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return We(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vc=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ry(e)}}catch{}return new ky},_t=vc("localStorage"),Dy=vc("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new hc("@firebase/database"),Py=(function(){let t=1;return function(){return t++}})(),wc=function(t){const e=mm(t),n=new gm;n.update(e);const r=n.digest();return As.encodeByteArray(r)},Hn=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Hn.apply(null,r):typeof r=="object"?e+=ce(r):e+=r,e+=" "}return e};let mn=null,Sa=!0;const Oy=function(t,e){w(!0,"Can't turn on custom loggers persistently."),Ft.logLevel=X.VERBOSE,mn=Ft.log.bind(Ft)},he=function(...t){if(Sa===!0&&(Sa=!1,mn===null&&Dy.get("logging_enabled")===!0&&Oy()),mn){const e=Hn.apply(null,t);mn(e)}},Vn=function(t){return function(...e){he(t,...e)}},Xi=function(...t){const e="FIREBASE INTERNAL ERROR: "+Hn(...t);Ft.error(e)},Ze=function(...t){const e=`FIREBASE FATAL ERROR: ${Hn(...t)}`;throw Ft.error(e),new Error(e)},_e=function(...t){const e="FIREBASE WARNING: "+Hn(...t);Ft.warn(e)},Fy=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&_e("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ks=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Ly=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},qt="[MIN_NAME]",vt="[MAX_NAME]",St=function(t,e){if(t===e)return 0;if(t===qt||e===vt)return-1;if(e===qt||t===vt)return 1;{const n=Ia(t),r=Ia(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},Uy=function(t,e){return t===e?0:t<e?-1:1},cn=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ce(e))},Ds=function(t){if(typeof t!="object"||t===null)return ce(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=ce(e[r]),n+=":",n+=Ds(t[e[r]]);return n+="}",n},Cc=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function fe(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Ec=function(t){w(!ks(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let i,s,o,a,l;t===0?(s=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),r),s=a+r,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-r-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(s%2?1:0),s=Math.floor(s/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let f=parseInt(u.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),h=h+f}return h.toLowerCase()},$y=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},By=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Wy(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const Hy=new RegExp("^-?(0*)\\d{1,10}$"),Vy=-2147483648,Yy=2147483647,Ia=function(t){if(Hy.test(t)){const e=Number(t);if(e>=Vy&&e<=Yy)return e}return null},Jt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw _e("Exception was thrown by user callback.",n),e},Math.floor(0))}},zy=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},yn=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){_e(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(he("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',_e(e)}}class nr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}nr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps="5",bc="v",Tc="s",Sc="r",Ic="f",xc=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Nc="ls",Mc="p",Zi="ac",Ac="websocket",Rc="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(e,n,r,i,s=!1,o="",a=!1,l=!1){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=_t.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&_t.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function jy(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Dc(t,e,n){w(typeof e=="string","typeof type must == string"),w(typeof n=="object","typeof params must == object");let r;if(e===Ac)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Rc)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);jy(t)&&(n.ns=t.namespace);const i=[];return fe(n,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky{constructor(){this.counters_={}}incrementCounter(e,n=1){We(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Qg(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi={},Ti={};function Os(t){const e=t.toString();return bi[e]||(bi[e]=new Ky),bi[e]}function Qy(t,e){const n=t.toString();return Ti[n]||(Ti[n]=e()),Ti[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&Jt(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa="start",Zy="close",Jy="pLPCommand",ev="pRTLPCB",Pc="id",Oc="pw",Fc="ser",tv="cb",nv="seg",rv="ts",iv="d",sv="dframe",Lc=1870,Uc=30,ov=Lc-Uc,av=25e3,lv=3e4;class Dt{constructor(e,n,r,i,s,o,a){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Vn(e),this.stats_=Os(n),this.urlFn=l=>(this.appCheckToken&&(l[Zi]=this.appCheckToken),Dc(n,Rc,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Xy(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(lv)),Ly(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Fs((...s)=>{const[o,a,l,c,u]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===xa)this.id=a,this.password=l;else if(o===Zy)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[xa]="t",r[Fc]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[tv]=this.scriptTagHolder.uniqueCallbackIdentifier),r[bc]=Ps,this.transportSessionId&&(r[Tc]=this.transportSessionId),this.lastSessionId&&(r[Nc]=this.lastSessionId),this.applicationId&&(r[Mc]=this.applicationId),this.appCheckToken&&(r[Zi]=this.appCheckToken),typeof location<"u"&&location.hostname&&xc.test(location.hostname)&&(r[Sc]=Ic);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Dt.forceAllow_=!0}static forceDisallow(){Dt.forceDisallow_=!0}static isAvailable(){return Dt.forceAllow_?!0:!Dt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!$y()&&!By()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ce(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=ic(n),i=Cc(r,ov);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[sv]="t",r[Pc]=e,r[Oc]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ce(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Fs{constructor(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Py(),window[Jy+this.uniqueCallbackIdentifier]=e,window[ev+this.uniqueCallbackIdentifier]=n,this.myIFrame=Fs.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){he("frame writing exception"),a.stack&&he(a.stack),he(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||he("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Pc]=this.myID,e[Oc]=this.myPW,e[Fc]=this.currentSerial;let n=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Uc+r.length<=Lc;){const o=this.pendingSegs.shift();r=r+"&"+nv+i+"="+o.seg+"&"+rv+i+"="+o.ts+"&"+iv+i+"="+o.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(av)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{he("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv=16384,uv=45e3;let wr=null;typeof MozWebSocket<"u"?wr=MozWebSocket:typeof WebSocket<"u"&&(wr=WebSocket);class ke{constructor(e,n,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Vn(this.connId),this.stats_=Os(n),this.connURL=ke.connectionURL_(n,o,a,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,i,s){const o={};return o[bc]=Ps,typeof location<"u"&&location.hostname&&xc.test(location.hostname)&&(o[Sc]=Ic),n&&(o[Tc]=n),r&&(o[Nc]=r),i&&(o[Zi]=i),s&&(o[Mc]=s),Dc(e,Ac,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,_t.set("previous_websocket_failure",!0);try{let r;am(),this.mySock=new wr(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){ke.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&wr!==null&&!ke.forceDisallow_}static previouslyFailed(){return _t.isInMemoryStorage||_t.get("previous_websocket_failure")===!0}markConnectionHealthy(){_t.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Sn(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(w(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=ce(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=Cc(n,cv);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(uv))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ke.responsesRequiredToBeHealthy=2;ke.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Dt,ke]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=ke&&ke.isAvailable();let r=n&&!ke.previouslyFailed();if(e.webSocketOnly&&(n||_e("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[ke];else{const i=this.transports_=[];for(const s of Mn.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);Mn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Mn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hv=6e4,fv=5e3,dv=10*1024,_v=100*1024,Si="t",Na="d",pv="s",Ma="r",gv="e",Aa="o",Ra="a",ka="n",Da="p",mv="h";class yv{constructor(e,n,r,i,s,o,a,l,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Vn("c:"+this.id+":"),this.transportManager_=new Mn(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=yn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>_v?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>dv?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Si in e){const n=e[Si];n===Ra?this.upgradeIfSecondaryHealthy_():n===Ma?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Aa&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=cn("t",e),r=cn("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Da,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ra,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ka,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=cn("t",e),r=cn("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=cn(Si,e);if(Na in e){const r=e[Na];if(n===mv){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===ka){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===pv?this.onConnectionShutdown_(r):n===Ma?this.onReset_(r):n===gv?Xi("Server Error: "+r):n===Aa?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Xi("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Ps!==r&&_e("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),yn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(hv))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):yn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(fv))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Da,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(_t.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{put(e,n,r,i){}merge(e,n,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(e){this.allowedEvents_=e,this.listeners_={},w(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const i=this.getInitialEvent(e);i&&n.apply(r,i)}off(e,n,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===n&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){w(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr extends Bc{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!lc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Cr}getInitialEvent(e){return w(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa=32,Oa=768;class K{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function q(){return new K("")}function W(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function ot(t){return t.pieces_.length-t.pieceNum_}function Z(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new K(t.pieces_,e)}function Ls(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function vv(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function An(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Wc(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new K(e,0)}function ne(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof K)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new K(n,0)}function V(t){return t.pieceNum_>=t.pieces_.length}function ye(t,e){const n=W(t),r=W(e);if(n===null)return e;if(n===r)return ye(Z(t),Z(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function wv(t,e){const n=An(t,0),r=An(e,0);for(let i=0;i<n.length&&i<r.length;i++){const s=St(n[i],r[i]);if(s!==0)return s}return n.length===r.length?0:n.length<r.length?-1:1}function Us(t,e){if(ot(t)!==ot(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function Ie(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(ot(t)>ot(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class Cv{constructor(e,n){this.errorPrefix_=n,this.parts_=An(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Br(this.parts_[r]);Hc(this)}}function Ev(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Br(e),Hc(t)}function bv(t){const e=t.parts_.pop();t.byteLength_-=Br(e),t.parts_.length>0&&(t.byteLength_-=1)}function Hc(t){if(t.byteLength_>Oa)throw new Error(t.errorPrefix_+"has a key path longer than "+Oa+" bytes ("+t.byteLength_+").");if(t.parts_.length>Pa)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Pa+") or object contains a cycle "+ft(t))}function ft(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s extends Bc{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new $s}getInitialEvent(e){return w(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=1e3,Tv=300*1e3,Fa=30*1e3,Sv=1.3,Iv=3e4,xv="server_kill",La=3;class Ge extends $c{constructor(e,n,r,i,s,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ge.nextPersistentConnectionId_++,this.log_=Vn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=un,this.maxReconnectDelay_=Tv,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");$s.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Cr.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const i=++this.requestNumber_,s={r:i,a:e,b:n};this.log_(ce(s)),w(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const n=new Bn,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),w(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),w(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const l=a.d,c=a.s;Ge.warnOnListenWarnings_(l,n),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&We(e,"w")){const r=zt(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();_e(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||_m(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Fa)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=dm(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),w(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,n)}sendUnlisten_(e,n,r,i){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,i){const s={p:n,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,r,i){this.putInternal("p",e,n,r,i)}merge(e,n,r,i){this.putInternal("m",e,n,r,i)}putInternal(e,n,r,i,s){this.initConnection_();const o={p:n,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ce(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Xi("Unrecognized action received from server: "+ce(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){w(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=un,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=un,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Iv&&(this.reconnectDelay_=un),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Sv)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Ge.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,r())},c=function(h){w(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,f]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?he("getToken() completed but was canceled"):(he("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=f&&f.token,a=new yv(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,d=>{_e(d+" ("+this.repoInfo_.toString()+")"),this.interrupt(xv)},s))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&_e(h),l())}}}interrupt(e){he("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){he("Resuming connection for reason: "+e),delete this.interruptReasons_[e],fa(this.interruptReasons_)&&(this.reconnectDelay_=un,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(s=>Ds(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const r=new K(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(n),s.delete(n),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,n){he("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=La&&(this.reconnectDelay_=Fa,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){he("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=La&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+yc.replace(/\./g,"-")]=1,lc()?e["framework.cordova"]=1:om()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Cr.getInstance().currentlyOnline();return fa(this.interruptReasons_)&&e}}Ge.nextPersistentConnectionId_=0;Ge.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new H(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new H(qt,e),i=new H(qt,n);return this.compare(r,i)!==0}minPost(){return H.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qn;class Vc extends Wr{static get __EMPTY_NODE(){return Qn}static set __EMPTY_NODE(e){Qn=e}compare(e,n){return St(e.name,n.name)}isDefinedOn(e){throw Xt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return H.MIN}maxPost(){return new H(vt,Qn)}makePost(e,n){return w(typeof e=="string","KeyIndex indexValue must always be a string."),new H(e,Qn)}toString(){return".key"}}const Lt=new Vc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e,n,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ae{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??ae.RED,this.left=i??ve.EMPTY_NODE,this.right=s??ve.EMPTY_NODE}copy(e,n,r,i,s){return new ae(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return ve.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return ve.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ae.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ae.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ae.RED=!0;ae.BLACK=!1;class Nv{copy(e,n,r,i,s){return this}insert(e,n,r){return new ae(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ve{constructor(e,n=ve.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ve(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ae.BLACK,null,null))}remove(e){return new ve(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ae.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Xn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Xn(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Xn(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Xn(this.root_,null,this.comparator_,!0,e)}}ve.EMPTY_NODE=new Nv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mv(t,e){return St(t.name,e.name)}function Bs(t,e){return St(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ji;function Av(t){Ji=t}const Yc=function(t){return typeof t=="number"?"number:"+Ec(t):"string:"+t},zc=function(t){if(t.isLeafNode()){const e=t.val();w(typeof e=="string"||typeof e=="number"||typeof e=="object"&&We(e,".sv"),"Priority must be a string or number.")}else w(t===Ji||t.isEmpty(),"priority of unexpected type.");w(t===Ji||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ua;class oe{constructor(e,n=oe.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,w(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),zc(this.priorityNode_)}static set __childrenNodeConstructor(e){Ua=e}static get __childrenNodeConstructor(){return Ua}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new oe(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:oe.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return V(e)?this:W(e)===".priority"?this.priorityNode_:oe.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:oe.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=W(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(w(r!==".priority"||ot(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,oe.__childrenNodeConstructor.EMPTY_NODE.updateChild(Z(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Yc(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Ec(this.value_):e+=this.value_,this.lazyHash_=wc(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===oe.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof oe.__childrenNodeConstructor?-1:(w(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,i=oe.VALUE_TYPE_ORDER.indexOf(n),s=oe.VALUE_TYPE_ORDER.indexOf(r);return w(i>=0,"Unknown leaf type: "+n),w(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}oe.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qc,Gc;function Rv(t){qc=t}function kv(t){Gc=t}class Dv extends Wr{compare(e,n){const r=e.node.getPriority(),i=n.node.getPriority(),s=r.compareTo(i);return s===0?St(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return H.MIN}maxPost(){return new H(vt,new oe("[PRIORITY-POST]",Gc))}makePost(e,n){const r=qc(e);return new H(n,new oe("[PRIORITY-POST]",r))}toString(){return".priority"}}const re=new Dv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pv=Math.log(2);class Ov{constructor(e){const n=s=>parseInt(Math.log(s)/Pv,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Er=function(t,e,n,r){t.sort(e);const i=function(l,c){const u=c-l;let h,f;if(u===0)return null;if(u===1)return h=t[l],f=n?n(h):h,new ae(f,h.node,ae.BLACK,null,null);{const d=parseInt(u/2,10)+l,p=i(l,d),v=i(d+1,c);return h=t[d],f=n?n(h):h,new ae(f,h.node,ae.BLACK,p,v)}},s=function(l){let c=null,u=null,h=t.length;const f=function(p,v){const C=h-p,D=h;h-=p;const O=i(C+1,D),S=t[C],E=n?n(S):S;d(new ae(E,S.node,v,null,O))},d=function(p){c?(c.left=p,c=p):(u=p,c=p)};for(let p=0;p<l.count;++p){const v=l.nextBitIsOne(),C=Math.pow(2,l.count-(p+1));v?f(C,ae.BLACK):(f(C,ae.BLACK),f(C,ae.RED))}return u},o=new Ov(t.length),a=s(o);return new ve(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ii;const Mt={};class qe{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return w(Mt&&re,"ChildrenNode.ts has not been loaded"),Ii=Ii||new qe({".priority":Mt},{".priority":re}),Ii}get(e){const n=zt(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ve?n:null}hasIndex(e){return We(this.indexSet_,e.toString())}addIndex(e,n){w(e!==Lt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=n.getIterator(H.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=Er(r,e.getCompare()):a=Mt;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const u=Object.assign({},this.indexes_);return u[l]=a,new qe(u,c)}addToIndexes(e,n){const r=yr(this.indexes_,(i,s)=>{const o=zt(this.indexSet_,s);if(w(o,"Missing index implementation for "+s),i===Mt)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(H.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Er(a,o.getCompare())}else return Mt;else{const a=n.get(e.name);let l=i;return a&&(l=l.remove(new H(e.name,a))),l.insert(e,e.node)}});return new qe(r,this.indexSet_)}removeFromIndexes(e,n){const r=yr(this.indexes_,i=>{if(i===Mt)return i;{const s=n.get(e.name);return s?i.remove(new H(e.name,s)):i}});return new qe(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hn;class k{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&zc(this.priorityNode_),this.children_.isEmpty()&&w(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return hn||(hn=new k(new ve(Bs),null,qe.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||hn}updatePriority(e){return this.children_.isEmpty()?this:new k(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?hn:n}}getChild(e){const n=W(e);return n===null?this:this.getImmediateChild(n).getChild(Z(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(w(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new H(e,n);let i,s;n.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?hn:this.priorityNode_;return new k(i,o,s)}}updateChild(e,n){const r=W(e);if(r===null)return n;{w(W(e)!==".priority"||ot(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(Z(e),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,i=0,s=!0;if(this.forEachChild(re,(o,a)=>{n[o]=a.val(e),r++,s&&k.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Yc(this.getPriority().val())+":"),this.forEachChild(re,(n,r)=>{const i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":wc(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new H(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new H(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new H(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,H.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,H.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Yn?-1:0}withIndex(e){if(e===Lt||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new k(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Lt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(re),i=n.getIterator(re);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Lt?null:this.indexMap_.get(e.toString())}}k.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Fv extends k{constructor(){super(new ve(Bs),k.EMPTY_NODE,qe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return k.EMPTY_NODE}isEmpty(){return!1}}const Yn=new Fv;Object.defineProperties(H,{MIN:{value:new H(qt,k.EMPTY_NODE)},MAX:{value:new H(vt,Yn)}});Vc.__EMPTY_NODE=k.EMPTY_NODE;oe.__childrenNodeConstructor=k;Av(Yn);kv(Yn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lv=!0;function le(t,e=null){if(t===null)return k.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),w(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new oe(n,le(e))}if(!(t instanceof Array)&&Lv){const n=[];let r=!1;if(fe(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=le(a);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),n.push(new H(o,l)))}}),n.length===0)return k.EMPTY_NODE;const s=Er(n,Mv,o=>o.name,Bs);if(r){const o=Er(n,re.getCompare());return new k(s,le(e),new qe({".priority":o},{".priority":re}))}else return new k(s,le(e),qe.Default)}else{let n=k.EMPTY_NODE;return fe(t,(r,i)=>{if(We(t,r)&&r.substring(0,1)!=="."){const s=le(i);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(r,s))}}),n.updatePriority(le(e))}}Rv(le);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uv extends Wr{constructor(e){super(),this.indexPath_=e,w(!V(e)&&W(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),i=this.extractChild(n.node),s=r.compareTo(i);return s===0?St(e.name,n.name):s}makePost(e,n){const r=le(e),i=k.EMPTY_NODE.updateChild(this.indexPath_,r);return new H(n,i)}maxPost(){const e=k.EMPTY_NODE.updateChild(this.indexPath_,Yn);return new H(vt,e)}toString(){return An(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $v extends Wr{compare(e,n){const r=e.node.compareTo(n.node);return r===0?St(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return H.MIN}maxPost(){return H.MAX}makePost(e,n){const r=le(e);return new H(n,r)}toString(){return".value"}}const Bv=new $v;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(t){return{type:"value",snapshotNode:t}}function Gt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Rn(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function kn(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Wv(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e){this.index_=e}updateChild(e,n,r,i,s,o){w(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(Rn(n,a)):w(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Gt(n,r)):o.trackChildChange(kn(n,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(re,(i,s)=>{n.hasChild(i)||r.trackChildChange(Rn(i,s))}),n.isLeafNode()||n.forEachChild(re,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(kn(i,s,o))}else r.trackChildChange(Gt(i,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?k.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this.indexedFilter_=new Ws(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Dn.getStartPost_(e),this.endPost_=Dn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,i,s,o){return this.matches(new H(n,r))||(r=k.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,s,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=k.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(k.EMPTY_NODE);const s=this;return n.forEachChild(re,(o,a)=>{s.matches(new H(o,a))||(i=i.updateImmediateChild(o,k.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hv{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Dn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,i,s,o){return this.rangedFilter_.matches(new H(n,r))||(r=k.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,s,o):this.fullLimitUpdateChild_(e,n,r,s,o)}updateFullNode(e,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=k.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=k.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(k.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,k.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,i,s){let o;if(this.reverse_){const h=this.index_.getCompare();o=(f,d)=>h(d,f)}else o=this.index_.getCompare();const a=e;w(a.numChildren()===this.limit_,"");const l=new H(n,r),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(n)){const h=a.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||a.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const d=f==null?1:o(f,l);if(u&&!r.isEmpty()&&d>=0)return s!=null&&s.trackChildChange(kn(n,r,h)),a.updateImmediateChild(n,r);{s!=null&&s.trackChildChange(Rn(n,h));const v=a.updateImmediateChild(n,k.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(s!=null&&s.trackChildChange(Gt(f.name,f.node)),v.updateImmediateChild(f.name,f.node)):v}}else return r.isEmpty()?e:u&&o(c,l)>=0?(s!=null&&(s.trackChildChange(Rn(c.name,c.node)),s.trackChildChange(Gt(n,r))),a.updateImmediateChild(n,r).updateImmediateChild(c.name,k.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=re}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return w(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return w(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:qt}hasEnd(){return this.endSet_}getIndexEndValue(){return w(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return w(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:vt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return w(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===re}copy(){const e=new Hs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Vv(t){return t.loadsAllData()?new Ws(t.getIndex()):t.hasLimit()?new Hv(t):new Dn(t)}function $a(t){const e={};if(t.isDefault())return e;let n;if(t.index_===re?n="$priority":t.index_===Bv?n="$value":t.index_===Lt?n="$key":(w(t.index_ instanceof Uv,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ce(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=ce(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+ce(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=ce(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+ce(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Ba(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==re&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br extends $c{constructor(e,n,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=Vn("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(w(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=br.getListenId_(e,r),a={};this.listens_[o]=a;const l=$a(e._queryParams);this.restRequest_(s+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(s,h,!1,r),zt(this.listens_,o)===a){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const r=br.getListenId_(e,n);delete this.listens_[r]}get(e){const n=$a(e._queryParams),r=e._path.toString(),i=new Bn;return this.restRequest_(r+".json",n,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(n.auth=i.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+pm(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Sn(a.responseText)}catch{_e("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,l)}else a.status!==401&&a.status!==404&&_e("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yv{constructor(){this.rootNode_=k.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tr(){return{value:null,children:new Map}}function Kc(t,e,n){if(V(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=W(e);t.children.has(r)||t.children.set(r,Tr());const i=t.children.get(r);e=Z(e),Kc(i,e,n)}}function es(t,e,n){t.value!==null?n(e,t.value):zv(t,(r,i)=>{const s=new K(e.toString()+"/"+r);es(i,s,n)})}function zv(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qv{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&fe(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa=10*1e3,Gv=30*1e3,jv=300*1e3;class Kv{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new qv(e);const r=Wa+(Gv-Wa)*Math.random();yn(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;fe(e,(i,s)=>{s>0&&We(this.statsToReport_,i)&&(n[i]=s,r=!0)}),r&&this.server_.reportStats(n),yn(this.reportStats_.bind(this),Math.floor(Math.random()*2*jv))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(De||(De={}));function Vs(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ys(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function zs(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=De.ACK_USER_WRITE,this.source=Vs()}operationForChild(e){if(V(this.path)){if(this.affectedTree.value!=null)return w(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new K(e));return new Sr(q(),n,this.revert)}}else return w(W(this.path)===e,"operationForChild called for unrelated child."),new Sr(Z(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(e,n){this.source=e,this.path=n,this.type=De.LISTEN_COMPLETE}operationForChild(e){return V(this.path)?new Pn(this.source,q()):new Pn(this.source,Z(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=De.OVERWRITE}operationForChild(e){return V(this.path)?new wt(this.source,q(),this.snap.getImmediateChild(e)):new wt(this.source,Z(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=De.MERGE}operationForChild(e){if(V(this.path)){const n=this.children.subtree(new K(e));return n.isEmpty()?null:n.value?new wt(this.source,q(),n.value):new jt(this.source,q(),n)}else return w(W(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new jt(this.source,Z(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(V(e))return this.isFullyInitialized()&&!this.filtered_;const n=W(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qv{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Xv(t,e,n,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(Wv(o.childName,o.snapshotNode))}),fn(t,i,"child_removed",e,r,n),fn(t,i,"child_added",e,r,n),fn(t,i,"child_moved",s,r,n),fn(t,i,"child_changed",e,r,n),fn(t,i,"value",e,r,n),i}function fn(t,e,n,r,i,s){const o=r.filter(a=>a.type===n);o.sort((a,l)=>Jv(t,a,l)),o.forEach(a=>{const l=Zv(t,a,s);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Zv(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Jv(t,e,n){if(e.childName==null||n.childName==null)throw Xt("Should only compare child_ events.");const r=new H(e.childName,e.snapshotNode),i=new H(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hr(t,e){return{eventCache:t,serverCache:e}}function vn(t,e,n,r){return Hr(new Ct(e,n,r),t.serverCache)}function Qc(t,e,n,r){return Hr(t.eventCache,new Ct(e,n,r))}function ts(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Et(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi;const e0=()=>(xi||(xi=new ve(Uy)),xi);class Q{constructor(e,n=e0()){this.value=e,this.children=n}static fromObject(e){let n=new Q(null);return fe(e,(r,i)=>{n=n.set(new K(r),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:q(),value:this.value};if(V(e))return null;{const r=W(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(Z(e),n);return s!=null?{path:ne(new K(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(V(e))return this;{const n=W(e),r=this.children.get(n);return r!==null?r.subtree(Z(e)):new Q(null)}}set(e,n){if(V(e))return new Q(n,this.children);{const r=W(e),s=(this.children.get(r)||new Q(null)).set(Z(e),n),o=this.children.insert(r,s);return new Q(this.value,o)}}remove(e){if(V(e))return this.children.isEmpty()?new Q(null):new Q(null,this.children);{const n=W(e),r=this.children.get(n);if(r){const i=r.remove(Z(e));let s;return i.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,i),this.value===null&&s.isEmpty()?new Q(null):new Q(this.value,s)}else return this}}get(e){if(V(e))return this.value;{const n=W(e),r=this.children.get(n);return r?r.get(Z(e)):null}}setTree(e,n){if(V(e))return n;{const r=W(e),s=(this.children.get(r)||new Q(null)).setTree(Z(e),n);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new Q(this.value,o)}}fold(e){return this.fold_(q(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(ne(e,i),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,q(),n)}findOnPath_(e,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(V(e))return null;{const s=W(e),o=this.children.get(s);return o?o.findOnPath_(Z(e),ne(n,s),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,q(),n)}foreachOnPath_(e,n,r){if(V(e))return this;{this.value&&r(n,this.value);const i=W(e),s=this.children.get(i);return s?s.foreachOnPath_(Z(e),ne(n,i),r):new Q(null)}}foreach(e){this.foreach_(q(),e)}foreach_(e,n){this.children.inorderTraversal((r,i)=>{i.foreach_(ne(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.writeTree_=e}static empty(){return new Pe(new Q(null))}}function wn(t,e,n){if(V(e))return new Pe(new Q(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=ye(i,e);return s=s.updateChild(o,n),new Pe(t.writeTree_.set(i,s))}else{const i=new Q(n),s=t.writeTree_.setTree(e,i);return new Pe(s)}}}function ns(t,e,n){let r=t;return fe(n,(i,s)=>{r=wn(r,ne(e,i),s)}),r}function Ha(t,e){if(V(e))return Pe.empty();{const n=t.writeTree_.setTree(e,new Q(null));return new Pe(n)}}function rs(t,e){return It(t,e)!=null}function It(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ye(n.path,e)):null}function Va(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(re,(r,i)=>{e.push(new H(r,i))}):t.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new H(r,i.value))}),e}function st(t,e){if(V(e))return t;{const n=It(t,e);return n!=null?new Pe(new Q(n)):new Pe(t.writeTree_.subtree(e))}}function is(t){return t.writeTree_.isEmpty()}function Kt(t,e){return Xc(q(),t.writeTree_,e)}function Xc(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(w(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):n=Xc(ne(t,i),s,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(ne(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qs(t,e){return tu(e,t)}function t0(t,e,n,r,i){w(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=wn(t.visibleWrites,e,n)),t.lastWriteId=r}function n0(t,e,n,r){w(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=ns(t.visibleWrites,e,n),t.lastWriteId=r}function r0(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function i0(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);w(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let i=r.visible,s=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&s0(a,r.path)?i=!1:Ie(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return o0(t),!0;if(r.snap)t.visibleWrites=Ha(t.visibleWrites,r.path);else{const a=r.children;fe(a,l=>{t.visibleWrites=Ha(t.visibleWrites,ne(r.path,l))})}return!0}else return!1}function s0(t,e){if(t.snap)return Ie(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Ie(ne(t.path,n),e))return!0;return!1}function o0(t){t.visibleWrites=Zc(t.allWrites,a0,q()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function a0(t){return t.visible}function Zc(t,e,n){let r=Pe.empty();for(let i=0;i<t.length;++i){const s=t[i];if(e(s)){const o=s.path;let a;if(s.snap)Ie(n,o)?(a=ye(n,o),r=wn(r,a,s.snap)):Ie(o,n)&&(a=ye(o,n),r=wn(r,q(),s.snap.getChild(a)));else if(s.children){if(Ie(n,o))a=ye(n,o),r=ns(r,a,s.children);else if(Ie(o,n))if(a=ye(o,n),V(a))r=ns(r,q(),s.children);else{const l=zt(s.children,W(a));if(l){const c=l.getChild(Z(a));r=wn(r,q(),c)}}}else throw Xt("WriteRecord should have .snap or .children")}}return r}function Jc(t,e,n,r,i){if(!r&&!i){const s=It(t.visibleWrites,e);if(s!=null)return s;{const o=st(t.visibleWrites,e);if(is(o))return n;if(n==null&&!rs(o,q()))return null;{const a=n||k.EMPTY_NODE;return Kt(o,a)}}}else{const s=st(t.visibleWrites,e);if(!i&&is(s))return n;if(!i&&n==null&&!rs(s,q()))return null;{const o=function(c){return(c.visible||i)&&(!r||!~r.indexOf(c.writeId))&&(Ie(c.path,e)||Ie(e,c.path))},a=Zc(t.allWrites,o,e),l=n||k.EMPTY_NODE;return Kt(a,l)}}}function l0(t,e,n){let r=k.EMPTY_NODE;const i=It(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(re,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(n){const s=st(t.visibleWrites,e);return n.forEachChild(re,(o,a)=>{const l=Kt(st(s,new K(o)),a);r=r.updateImmediateChild(o,l)}),Va(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=st(t.visibleWrites,e);return Va(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function c0(t,e,n,r,i){w(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=ne(e,n);if(rs(t.visibleWrites,s))return null;{const o=st(t.visibleWrites,s);return is(o)?i.getChild(n):Kt(o,i.getChild(n))}}function u0(t,e,n,r){const i=ne(e,n),s=It(t.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(n)){const o=st(t.visibleWrites,i);return Kt(o,r.getNode().getImmediateChild(n))}else return null}function h0(t,e){return It(t.visibleWrites,e)}function f0(t,e,n,r,i,s,o){let a;const l=st(t.visibleWrites,e),c=It(l,q());if(c!=null)a=c;else if(n!=null)a=Kt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),f=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let d=f.getNext();for(;d&&u.length<i;)h(d,r)!==0&&u.push(d),d=f.getNext();return u}else return[]}function d0(){return{visibleWrites:Pe.empty(),allWrites:[],lastWriteId:-1}}function Ir(t,e,n,r){return Jc(t.writeTree,t.treePath,e,n,r)}function Gs(t,e){return l0(t.writeTree,t.treePath,e)}function Ya(t,e,n,r){return c0(t.writeTree,t.treePath,e,n,r)}function xr(t,e){return h0(t.writeTree,ne(t.treePath,e))}function _0(t,e,n,r,i,s){return f0(t.writeTree,t.treePath,e,n,r,i,s)}function js(t,e,n){return u0(t.writeTree,t.treePath,e,n)}function eu(t,e){return tu(ne(t.treePath,e),t.writeTree)}function tu(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p0{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;w(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),w(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(r,kn(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(r,Rn(r,i.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(r,Gt(r,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(r,kn(r,e.snapshotNode,i.oldSnap));else throw Xt("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g0{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const nu=new g0;class Ks{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Ct(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return js(this.writes_,e,r)}}getChildAfterChild(e,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Et(this.viewCache_),s=_0(this.writes_,i,n,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m0(t){return{filter:t}}function y0(t,e){w(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),w(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function v0(t,e,n,r,i){const s=new p0;let o,a;if(n.type===De.OVERWRITE){const c=n;c.source.fromUser?o=ss(t,e,c.path,c.snap,r,i,s):(w(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!V(c.path),o=Nr(t,e,c.path,c.snap,r,i,a,s))}else if(n.type===De.MERGE){const c=n;c.source.fromUser?o=C0(t,e,c.path,c.children,r,i,s):(w(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=os(t,e,c.path,c.children,r,i,a,s))}else if(n.type===De.ACK_USER_WRITE){const c=n;c.revert?o=T0(t,e,c.path,r,i,s):o=E0(t,e,c.path,c.affectedTree,r,i,s)}else if(n.type===De.LISTEN_COMPLETE)o=b0(t,e,n.path,r,s);else throw Xt("Unknown operation type: "+n.type);const l=s.getChanges();return w0(e,o,l),{viewCache:o,changes:l}}function w0(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=ts(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push(jc(ts(e)))}}function ru(t,e,n,r,i,s){const o=e.eventCache;if(xr(r,n)!=null)return e;{let a,l;if(V(n))if(w(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Et(e),u=c instanceof k?c:k.EMPTY_NODE,h=Gs(r,u);a=t.filter.updateFullNode(e.eventCache.getNode(),h,s)}else{const c=Ir(r,Et(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,s)}else{const c=W(n);if(c===".priority"){w(ot(n)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=Ya(r,n,u,l);h!=null?a=t.filter.updatePriority(u,h):a=o.getNode()}else{const u=Z(n);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const f=Ya(r,n,o.getNode(),l);f!=null?h=o.getNode().getImmediateChild(c).updateChild(u,f):h=o.getNode().getImmediateChild(c)}else h=js(r,c,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),c,h,u,i,s):a=o.getNode()}}return vn(e,a,o.isFullyInitialized()||V(n),t.filter.filtersNodes())}}function Nr(t,e,n,r,i,s,o,a){const l=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(V(n))c=u.updateFullNode(l.getNode(),r,null);else if(u.filtersNodes()&&!l.isFiltered()){const d=l.getNode().updateChild(n,r);c=u.updateFullNode(l.getNode(),d,null)}else{const d=W(n);if(!l.isCompleteForPath(n)&&ot(n)>1)return e;const p=Z(n),C=l.getNode().getImmediateChild(d).updateChild(p,r);d===".priority"?c=u.updatePriority(l.getNode(),C):c=u.updateChild(l.getNode(),d,C,p,nu,null)}const h=Qc(e,c,l.isFullyInitialized()||V(n),u.filtersNodes()),f=new Ks(i,h,s);return ru(t,h,n,i,f,a)}function ss(t,e,n,r,i,s,o){const a=e.eventCache;let l,c;const u=new Ks(i,e,s);if(V(n))c=t.filter.updateFullNode(e.eventCache.getNode(),r,o),l=vn(e,c,!0,t.filter.filtersNodes());else{const h=W(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),r),l=vn(e,c,a.isFullyInitialized(),a.isFiltered());else{const f=Z(n),d=a.getNode().getImmediateChild(h);let p;if(V(f))p=r;else{const v=u.getCompleteChild(h);v!=null?Ls(f)===".priority"&&v.getChild(Wc(f)).isEmpty()?p=v:p=v.updateChild(f,r):p=k.EMPTY_NODE}if(d.equals(p))l=e;else{const v=t.filter.updateChild(a.getNode(),h,p,f,u,o);l=vn(e,v,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function za(t,e){return t.eventCache.isCompleteForChild(e)}function C0(t,e,n,r,i,s,o){let a=e;return r.foreach((l,c)=>{const u=ne(n,l);za(e,W(u))&&(a=ss(t,a,u,c,i,s,o))}),r.foreach((l,c)=>{const u=ne(n,l);za(e,W(u))||(a=ss(t,a,u,c,i,s,o))}),a}function qa(t,e,n){return n.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function os(t,e,n,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;V(n)?c=r:c=new Q(null).setTree(n,r);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,f)=>{if(u.hasChild(h)){const d=e.serverCache.getNode().getImmediateChild(h),p=qa(t,d,f);l=Nr(t,l,new K(h),p,i,s,o,a)}}),c.children.inorderTraversal((h,f)=>{const d=!e.serverCache.isCompleteForChild(h)&&f.value===null;if(!u.hasChild(h)&&!d){const p=e.serverCache.getNode().getImmediateChild(h),v=qa(t,p,f);l=Nr(t,l,new K(h),v,i,s,o,a)}}),l}function E0(t,e,n,r,i,s,o){if(xr(i,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(r.value!=null){if(V(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Nr(t,e,n,l.getNode().getChild(n),i,s,a,o);if(V(n)){let c=new Q(null);return l.getNode().forEachChild(Lt,(u,h)=>{c=c.set(new K(u),h)}),os(t,e,n,c,i,s,a,o)}else return e}else{let c=new Q(null);return r.foreach((u,h)=>{const f=ne(n,u);l.isCompleteForPath(f)&&(c=c.set(u,l.getNode().getChild(f)))}),os(t,e,n,c,i,s,a,o)}}function b0(t,e,n,r,i){const s=e.serverCache,o=Qc(e,s.getNode(),s.isFullyInitialized()||V(n),s.isFiltered());return ru(t,o,n,r,nu,i)}function T0(t,e,n,r,i,s){let o;if(xr(r,n)!=null)return e;{const a=new Ks(r,e,i),l=e.eventCache.getNode();let c;if(V(n)||W(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Ir(r,Et(e));else{const h=e.serverCache.getNode();w(h instanceof k,"serverChildren would be complete if leaf node"),u=Gs(r,h)}u=u,c=t.filter.updateFullNode(l,u,s)}else{const u=W(n);let h=js(r,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=t.filter.updateChild(l,u,h,Z(n),a,s):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(l,u,k.EMPTY_NODE,Z(n),a,s):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Ir(r,Et(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,s)))}return o=e.serverCache.isFullyInitialized()||xr(r,q())!=null,vn(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S0{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new Ws(r.getIndex()),s=Vv(r);this.processor_=m0(s);const o=n.serverCache,a=n.eventCache,l=i.updateFullNode(k.EMPTY_NODE,o.getNode(),null),c=s.updateFullNode(k.EMPTY_NODE,a.getNode(),null),u=new Ct(l,o.isFullyInitialized(),i.filtersNodes()),h=new Ct(c,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=Hr(h,u),this.eventGenerator_=new Qv(this.query_)}get query(){return this.query_}}function I0(t){return t.viewCache_.serverCache.getNode()}function x0(t,e){const n=Et(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!V(e)&&!n.getImmediateChild(W(e)).isEmpty())?n.getChild(e):null}function Ga(t){return t.eventRegistrations_.length===0}function N0(t,e){t.eventRegistrations_.push(e)}function ja(t,e,n){const r=[];if(n){w(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return r}function Ka(t,e,n,r){e.type===De.MERGE&&e.source.queryId!==null&&(w(Et(t.viewCache_),"We should always have a full cache before handling merges"),w(ts(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,s=v0(t.processor_,i,e,n,r);return y0(t.processor_,s.viewCache),w(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,iu(t,s.changes,s.viewCache.eventCache.getNode(),null)}function M0(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(re,(s,o)=>{r.push(Gt(s,o))}),n.isFullyInitialized()&&r.push(jc(n.getNode())),iu(t,r,n.getNode(),e)}function iu(t,e,n,r){const i=r?[r]:t.eventRegistrations_;return Xv(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mr;class A0{constructor(){this.views=new Map}}function R0(t){w(!Mr,"__referenceConstructor has already been defined"),Mr=t}function k0(){return w(Mr,"Reference.ts has not been loaded"),Mr}function D0(t){return t.views.size===0}function Qs(t,e,n,r){const i=e.source.queryId;if(i!==null){const s=t.views.get(i);return w(s!=null,"SyncTree gave us an op for an invalid query."),Ka(s,e,n,r)}else{let s=[];for(const o of t.views.values())s=s.concat(Ka(o,e,n,r));return s}}function P0(t,e,n,r,i){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let a=Ir(n,i?r:null),l=!1;a?l=!0:r instanceof k?(a=Gs(n,r),l=!1):(a=k.EMPTY_NODE,l=!1);const c=Hr(new Ct(a,l,!1),new Ct(r,i,!1));return new S0(e,c)}return o}function O0(t,e,n,r,i,s){const o=P0(t,e,r,i,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),N0(o,n),M0(o,n)}function F0(t,e,n,r){const i=e._queryIdentifier,s=[];let o=[];const a=at(t);if(i==="default")for(const[l,c]of t.views.entries())o=o.concat(ja(c,n,r)),Ga(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||s.push(c.query));else{const l=t.views.get(i);l&&(o=o.concat(ja(l,n,r)),Ga(l)&&(t.views.delete(i),l.query._queryParams.loadsAllData()||s.push(l.query)))}return a&&!at(t)&&s.push(new(k0())(e._repo,e._path)),{removed:s,events:o}}function su(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Ut(t,e){let n=null;for(const r of t.views.values())n=n||x0(r,e);return n}function ou(t,e){if(e._queryParams.loadsAllData())return Vr(t);{const r=e._queryIdentifier;return t.views.get(r)}}function au(t,e){return ou(t,e)!=null}function at(t){return Vr(t)!=null}function Vr(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ar;function L0(t){w(!Ar,"__referenceConstructor has already been defined"),Ar=t}function U0(){return w(Ar,"Reference.ts has not been loaded"),Ar}let $0=1;class Qa{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Q(null),this.pendingWriteTree_=d0(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function lu(t,e,n,r,i){return t0(t.pendingWriteTree_,e,n,r,i),i?en(t,new wt(Vs(),e,n)):[]}function B0(t,e,n,r){n0(t.pendingWriteTree_,e,n,r);const i=Q.fromObject(n);return en(t,new jt(Vs(),e,i))}function nt(t,e,n=!1){const r=r0(t.pendingWriteTree_,e);if(i0(t.pendingWriteTree_,e)){let s=new Q(null);return r.snap!=null?s=s.set(q(),!0):fe(r.children,o=>{s=s.set(new K(o),!0)}),en(t,new Sr(r.path,s,n))}else return[]}function Yr(t,e,n){return en(t,new wt(Ys(),e,n))}function W0(t,e,n){const r=Q.fromObject(n);return en(t,new jt(Ys(),e,r))}function H0(t,e){return en(t,new Pn(Ys(),e))}function V0(t,e,n){const r=Zs(t,n);if(r){const i=Js(r),s=i.path,o=i.queryId,a=ye(s,e),l=new Pn(zs(o),a);return eo(t,s,l)}else return[]}function as(t,e,n,r,i=!1){const s=e._path,o=t.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||au(o,e))){const l=F0(o,e,n,r);D0(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const c=l.removed;if(a=l.events,!i){const u=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(s,(f,d)=>at(d));if(u&&!h){const f=t.syncPointTree_.subtree(s);if(!f.isEmpty()){const d=q0(f);for(let p=0;p<d.length;++p){const v=d[p],C=v.query,D=hu(t,v);t.listenProvider_.startListening(Cn(C),Rr(t,C),D.hashFn,D.onComplete)}}}!h&&c.length>0&&!r&&(u?t.listenProvider_.stopListening(Cn(e),null):c.forEach(f=>{const d=t.queryToTagMap.get(zr(f));t.listenProvider_.stopListening(Cn(f),d)}))}G0(t,c)}return a}function Y0(t,e,n,r){const i=Zs(t,r);if(i!=null){const s=Js(i),o=s.path,a=s.queryId,l=ye(o,e),c=new wt(zs(a),l,n);return eo(t,o,c)}else return[]}function z0(t,e,n,r){const i=Zs(t,r);if(i){const s=Js(i),o=s.path,a=s.queryId,l=ye(o,e),c=Q.fromObject(n),u=new jt(zs(a),l,c);return eo(t,o,u)}else return[]}function Xa(t,e,n,r=!1){const i=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,d)=>{const p=ye(f,i);s=s||Ut(d,p),o=o||at(d)});let a=t.syncPointTree_.get(i);a?(o=o||at(a),s=s||Ut(a,q())):(a=new A0,t.syncPointTree_=t.syncPointTree_.set(i,a));let l;s!=null?l=!0:(l=!1,s=k.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((d,p)=>{const v=Ut(p,q());v&&(s=s.updateImmediateChild(d,v))}));const c=au(a,e);if(!c&&!e._queryParams.loadsAllData()){const f=zr(e);w(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const d=j0();t.queryToTagMap.set(f,d),t.tagToQueryMap.set(d,f)}const u=qs(t.pendingWriteTree_,i);let h=O0(a,e,n,u,s,l);if(!c&&!o&&!r){const f=ou(a,e);h=h.concat(K0(t,e,f))}return h}function Xs(t,e,n){const i=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=ye(o,e),c=Ut(a,l);if(c)return c});return Jc(i,e,s,n,!0)}function en(t,e){return cu(e,t.syncPointTree_,null,qs(t.pendingWriteTree_,q()))}function cu(t,e,n,r){if(V(t.path))return uu(t,e,n,r);{const i=e.get(q());n==null&&i!=null&&(n=Ut(i,q()));let s=[];const o=W(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,u=eu(r,o);s=s.concat(cu(a,l,c,u))}return i&&(s=s.concat(Qs(i,t,r,n))),s}}function uu(t,e,n,r){const i=e.get(q());n==null&&i!=null&&(n=Ut(i,q()));let s=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=eu(r,o),u=t.operationForChild(o);u&&(s=s.concat(uu(u,a,l,c)))}),i&&(s=s.concat(Qs(i,t,r,n))),s}function hu(t,e){const n=e.query,r=Rr(t,n);return{hashFn:()=>(I0(e)||k.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?V0(t,n._path,r):H0(t,n._path);{const s=Wy(i,n);return as(t,n,null,s)}}}}function Rr(t,e){const n=zr(e);return t.queryToTagMap.get(n)}function zr(t){return t._path.toString()+"$"+t._queryIdentifier}function Zs(t,e){return t.tagToQueryMap.get(e)}function Js(t){const e=t.indexOf("$");return w(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new K(t.substr(0,e))}}function eo(t,e,n){const r=t.syncPointTree_.get(e);w(r,"Missing sync point for query tag that we're tracking");const i=qs(t.pendingWriteTree_,e);return Qs(r,n,i,null)}function q0(t){return t.fold((e,n,r)=>{if(n&&at(n))return[Vr(n)];{let i=[];return n&&(i=su(n)),fe(r,(s,o)=>{i=i.concat(o)}),i}})}function Cn(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(U0())(t._repo,t._path):t}function G0(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const i=zr(r),s=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(s)}}}function j0(){return $0++}function K0(t,e,n){const r=e._path,i=Rr(t,e),s=hu(t,n),o=t.listenProvider_.startListening(Cn(e),i,s.hashFn,s.onComplete),a=t.syncPointTree_.subtree(r);if(i)w(!at(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!V(c)&&u&&at(u))return[Vr(u).query];{let f=[];return u&&(f=f.concat(su(u).map(d=>d.query))),fe(h,(d,p)=>{f=f.concat(p)}),f}});for(let c=0;c<l.length;++c){const u=l[c];t.listenProvider_.stopListening(Cn(u),Rr(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new to(n)}node(){return this.node_}}class no{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ne(this.path_,e);return new no(this.syncTree_,n)}node(){return Xs(this.syncTree_,this.path_)}}const Q0=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Za=function(t,e,n){if(!t||typeof t!="object")return t;if(w(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return X0(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Z0(t[".sv"],e);w(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},X0=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:w(!1,"Unexpected server value: "+t)}},Z0=function(t,e,n){t.hasOwnProperty("increment")||w(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&w(!1,"Unexpected increment value: "+r);const i=e.node();if(w(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},fu=function(t,e,n,r){return ro(e,new no(n,t),r)},du=function(t,e,n){return ro(t,new to(e),n)};function ro(t,e,n){const r=t.getPriority().val(),i=Za(r,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,a=Za(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new oe(a,le(i)):t}else{const o=t;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new oe(i))),o.forEachChild(re,(a,l)=>{const c=ro(l,e.getImmediateChild(a),n);c!==l&&(s=s.updateImmediateChild(a,c))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class io{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function so(t,e){let n=e instanceof K?e:new K(e),r=t,i=W(n);for(;i!==null;){const s=zt(r.node.children,i)||{children:{},childCount:0};r=new io(i,r,s),n=Z(n),i=W(n)}return r}function tn(t){return t.node.value}function _u(t,e){t.node.value=e,ls(t)}function pu(t){return t.node.childCount>0}function J0(t){return tn(t)===void 0&&!pu(t)}function qr(t,e){fe(t.node.children,(n,r)=>{e(new io(n,t,r))})}function gu(t,e,n,r){n&&e(t),qr(t,i=>{gu(i,e,!0)})}function ew(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function zn(t){return new K(t.parent===null?t.name:zn(t.parent)+"/"+t.name)}function ls(t){t.parent!==null&&tw(t.parent,t.name,t)}function tw(t,e,n){const r=J0(n),i=We(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,ls(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,ls(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nw=/[\[\].#$\/\u0000-\u001F\u007F]/,rw=/[\[\].#$\u0000-\u001F\u007F]/,Ni=10*1024*1024,oo=function(t){return typeof t=="string"&&t.length!==0&&!nw.test(t)},mu=function(t){return typeof t=="string"&&t.length!==0&&!rw.test(t)},iw=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),mu(t)},sw=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!ks(t)||t&&typeof t=="object"&&We(t,".sv")},yu=function(t,e,n,r){r&&e===void 0||Gr($r(t,"value"),e,n)},Gr=function(t,e,n){const r=n instanceof K?new Cv(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ft(r));if(typeof e=="function")throw new Error(t+"contains a function "+ft(r)+" with contents = "+e.toString());if(ks(e))throw new Error(t+"contains "+e.toString()+" "+ft(r));if(typeof e=="string"&&e.length>Ni/3&&Br(e)>Ni)throw new Error(t+"contains a string greater than "+Ni+" utf8 bytes "+ft(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(fe(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!oo(o)))throw new Error(t+" contains an invalid key ("+o+") "+ft(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Ev(r,o),Gr(t,a,r),bv(r)}),i&&s)throw new Error(t+' contains ".value" child '+ft(r)+" in addition to actual children.")}},ow=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const s=An(r);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!oo(s[o]))throw new Error(t+"contains an invalid key ("+s[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(wv);let i=null;for(n=0;n<e.length;n++){if(r=e[n],i!==null&&Ie(i,r))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},aw=function(t,e,n,r){const i=$r(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const s=[];fe(e,(o,a)=>{const l=new K(o);if(Gr(i,a,ne(n,l)),Ls(l)===".priority"&&!sw(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(l)}),ow(i,s)},vu=function(t,e,n,r){if(!mu(n))throw new Error($r(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},lw=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),vu(t,e,n)},wu=function(t,e){if(W(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},cw=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!oo(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!iw(n))throw new Error($r(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uw{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function jr(t,e){let n=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();n!==null&&!Us(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(i)}n&&t.eventLists_.push(n)}function Cu(t,e,n){jr(t,n),Eu(t,r=>Us(r,e))}function Oe(t,e,n){jr(t,n),Eu(t,r=>Ie(r,e)||Ie(e,r))}function Eu(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const i=t.eventLists_[r];if(i){const s=i.path;e(s)?(hw(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function hw(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();mn&&he("event: "+n.toString()),Jt(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fw="repo_interrupt",dw=25;class _w{constructor(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new uw,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Tr(),this.transactionQueueTree_=new io,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function pw(t,e,n){if(t.stats_=Os(t.repoInfo_),t.forceRestClient_||zy())t.server_=new br(t.repoInfo_,(r,i,s,o)=>{Ja(t,r,i,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>el(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ce(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new Ge(t.repoInfo_,e,(r,i,s,o)=>{Ja(t,r,i,s,o)},r=>{el(t,r)},r=>{gw(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=Qy(t.repoInfo_,()=>new Kv(t.stats_,t.server_)),t.infoData_=new Yv,t.infoSyncTree_=new Qa({startListening:(r,i,s,o)=>{let a=[];const l=t.infoData_.getNode(r._path);return l.isEmpty()||(a=Yr(t.infoSyncTree_,r._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ao(t,"connected",!1),t.serverSyncTree_=new Qa({startListening:(r,i,s,o)=>(t.server_.listen(r,s,i,(a,l)=>{const c=o(a,l);Oe(t.eventQueue_,r._path,c)}),[]),stopListening:(r,i)=>{t.server_.unlisten(r,i)}})}function bu(t){const n=t.infoData_.getNode(new K(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Kr(t){return Q0({timestamp:bu(t)})}function Ja(t,e,n,r,i){t.dataUpdateCount++;const s=new K(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(r){const l=yr(n,c=>le(c));o=z0(t.serverSyncTree_,s,l,i)}else{const l=le(n);o=Y0(t.serverSyncTree_,s,l,i)}else if(r){const l=yr(n,c=>le(c));o=W0(t.serverSyncTree_,s,l)}else{const l=le(n);o=Yr(t.serverSyncTree_,s,l)}let a=s;o.length>0&&(a=Qt(t,s)),Oe(t.eventQueue_,a,o)}function el(t,e){ao(t,"connected",e),e===!1&&vw(t)}function gw(t,e){fe(e,(n,r)=>{ao(t,n,r)})}function ao(t,e,n){const r=new K("/.info/"+e),i=le(n);t.infoData_.updateSnapshot(r,i);const s=Yr(t.infoSyncTree_,r,i);Oe(t.eventQueue_,r,s)}function lo(t){return t.nextWriteId_++}function mw(t,e,n,r,i){Qr(t,"set",{path:e.toString(),value:n,priority:r});const s=Kr(t),o=le(n,r),a=Xs(t.serverSyncTree_,e),l=du(o,a,s),c=lo(t),u=lu(t.serverSyncTree_,e,l,c,!0);jr(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(f,d)=>{const p=f==="ok";p||_e("set at "+e+" failed: "+f);const v=nt(t.serverSyncTree_,c,!p);Oe(t.eventQueue_,e,v),cs(t,i,f,d)});const h=uo(t,e);Qt(t,h),Oe(t.eventQueue_,h,[])}function yw(t,e,n,r){Qr(t,"update",{path:e.toString(),value:n});let i=!0;const s=Kr(t),o={};if(fe(n,(a,l)=>{i=!1,o[a]=fu(ne(e,a),le(l),t.serverSyncTree_,s)}),i)he("update() called with empty data.  Don't do anything."),cs(t,r,"ok",void 0);else{const a=lo(t),l=B0(t.serverSyncTree_,e,o,a);jr(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,u)=>{const h=c==="ok";h||_e("update at "+e+" failed: "+c);const f=nt(t.serverSyncTree_,a,!h),d=f.length>0?Qt(t,e):e;Oe(t.eventQueue_,d,f),cs(t,r,c,u)}),fe(n,c=>{const u=uo(t,ne(e,c));Qt(t,u)}),Oe(t.eventQueue_,e,[])}}function vw(t){Qr(t,"onDisconnectEvents");const e=Kr(t),n=Tr();es(t.onDisconnect_,q(),(i,s)=>{const o=fu(i,s,t.serverSyncTree_,e);Kc(n,i,o)});let r=[];es(n,q(),(i,s)=>{r=r.concat(Yr(t.serverSyncTree_,i,s));const o=uo(t,i);Qt(t,o)}),t.onDisconnect_=Tr(),Oe(t.eventQueue_,q(),r)}function ww(t,e,n){let r;W(e._path)===".info"?r=Xa(t.infoSyncTree_,e,n):r=Xa(t.serverSyncTree_,e,n),Cu(t.eventQueue_,e._path,r)}function Tu(t,e,n){let r;W(e._path)===".info"?r=as(t.infoSyncTree_,e,n):r=as(t.serverSyncTree_,e,n),Cu(t.eventQueue_,e._path,r)}function Cw(t){t.persistentConnection_&&t.persistentConnection_.interrupt(fw)}function Qr(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),he(n,...e)}function cs(t,e,n,r){e&&Jt(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function Su(t,e,n){return Xs(t.serverSyncTree_,e,n)||k.EMPTY_NODE}function co(t,e=t.transactionQueueTree_){if(e||Xr(t,e),tn(e)){const n=xu(t,e);w(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&Ew(t,zn(e),n)}else pu(e)&&qr(e,n=>{co(t,n)})}function Ew(t,e,n){const r=n.map(c=>c.currentWriteId),i=Su(t,e,r);let s=i;const o=i.hash();for(let c=0;c<n.length;c++){const u=n[c];w(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=ye(e,u.path);s=s.updateChild(h,u.currentOutputSnapshotRaw)}const a=s.val(!0),l=e;t.server_.put(l.toString(),a,c=>{Qr(t,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let f=0;f<n.length;f++)n[f].status=2,u=u.concat(nt(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&h.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();Xr(t,so(t.transactionQueueTree_,e)),co(t,t.transactionQueueTree_),Oe(t.eventQueue_,e,u);for(let f=0;f<h.length;f++)Jt(h[f])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{_e("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}Qt(t,e)}},o)}function Qt(t,e){const n=Iu(t,e),r=zn(n),i=xu(t,n);return bw(t,i,r),r}function bw(t,e,n){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=ye(n,l.path);let u=!1,h;if(w(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,i=i.concat(nt(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=dw)u=!0,h="maxretry",i=i.concat(nt(t.serverSyncTree_,l.currentWriteId,!0));else{const f=Su(t,l.path,o);l.currentInputSnapshot=f;const d=e[a].update(f.val());if(d!==void 0){Gr("transaction failed: Data returned ",d,l.path);let p=le(d);typeof d=="object"&&d!=null&&We(d,".priority")||(p=p.updatePriority(f.getPriority()));const C=l.currentWriteId,D=Kr(t),O=du(p,f,D);l.currentOutputSnapshotRaw=p,l.currentOutputSnapshotResolved=O,l.currentWriteId=lo(t),o.splice(o.indexOf(C),1),i=i.concat(lu(t.serverSyncTree_,l.path,O,l.currentWriteId,l.applyLocally)),i=i.concat(nt(t.serverSyncTree_,C,!0))}else u=!0,h="nodata",i=i.concat(nt(t.serverSyncTree_,l.currentWriteId,!0))}Oe(t.eventQueue_,n,i),i=[],u&&(e[a].status=2,(function(f){setTimeout(f,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(h),!1,null))))}Xr(t,t.transactionQueueTree_);for(let a=0;a<r.length;a++)Jt(r[a]);co(t,t.transactionQueueTree_)}function Iu(t,e){let n,r=t.transactionQueueTree_;for(n=W(e);n!==null&&tn(r)===void 0;)r=so(r,n),e=Z(e),n=W(e);return r}function xu(t,e){const n=[];return Nu(t,e,n),n.sort((r,i)=>r.order-i.order),n}function Nu(t,e,n){const r=tn(e);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);qr(e,i=>{Nu(t,i,n)})}function Xr(t,e){const n=tn(e);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,_u(e,n.length>0?n:void 0)}qr(e,r=>{Xr(t,r)})}function uo(t,e){const n=zn(Iu(t,e)),r=so(t.transactionQueueTree_,e);return ew(r,i=>{Mi(t,i)}),Mi(t,r),gu(r,i=>{Mi(t,i)}),n}function Mi(t,e){const n=tn(e);if(n){const r=[];let i=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(w(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(w(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(nt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?_u(e,void 0):n.length=s+1,Oe(t.eventQueue_,zn(e),i);for(let o=0;o<r.length;o++)Jt(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tw(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function Sw(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):_e(`Invalid query segment '${n}' in query '${t}'`)}return e}const tl=function(t,e){const n=Iw(t),r=n.namespace;n.domain==="firebase.com"&&Ze(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&Ze("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Fy();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new kc(n.host,n.secure,r,i,e,"",r!==n.subdomain),path:new K(n.pathString)}},Iw=function(t){let e="",n="",r="",i="",s="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(i=Tw(t.substring(u,h)));const f=Sw(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const d=e.slice(0,c);if(d.toLowerCase()==="localhost")n="localhost";else if(d.split(".").length<=2)n=d;else{const p=e.indexOf(".");r=e.substring(0,p).toLowerCase(),n=e.substring(p+1),s=r}"ns"in f&&(s=f.ns)}return{host:e,port:l,domain:n,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",xw=(function(){let t=0;const e=[];return function(n){const r=n===t;t=n;let i;const s=new Array(8);for(i=7;i>=0;i--)s[i]=nl.charAt(n%64),n=Math.floor(n/64);w(n===0,"Cannot push at time == 0");let o=s.join("");if(r){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=nl.charAt(e[i]);return w(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nw{constructor(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ce(this.snapshot.exportVal())}}class Mw{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aw{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return w(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return V(this._path)?null:Ls(this._path)}get ref(){return new lt(this._repo,this._path)}get _queryIdentifier(){const e=Ba(this._queryParams),n=Ds(e);return n==="{}"?"default":n}get _queryObject(){return Ba(this._queryParams)}isEqual(e){if(e=Zt(e),!(e instanceof ho))return!1;const n=this._repo===e._repo,r=Us(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+vv(this._path)}}class lt extends ho{constructor(e,n){super(e,n,new Hs,!1)}get parent(){const e=Wc(this._path);return e===null?null:new lt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class kr{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new K(e),r=On(this.ref,e);return new kr(this._node.getChild(n),r,re)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new kr(i,On(this.ref,r),re)))}hasChild(e){const n=new K(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function cC(t,e){return t=Zt(t),t._checkNotDeleted("ref"),e!==void 0?On(t._root,e):t._root}function On(t,e){return t=Zt(t),W(t._path)===null?lw("child","path",e):vu("child","path",e),new lt(t._repo,ne(t._path,e))}function uC(t,e){t=Zt(t),wu("push",t._path),yu("push",e,t._path,!0);const n=bu(t._repo),r=xw(n),i=On(t,r),s=On(t,r);let o;return o=Promise.resolve(s),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function hC(t,e){t=Zt(t),wu("set",t._path),yu("set",e,t._path,!1);const n=new Bn;return mw(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function fC(t,e){aw("update",e,t._path);const n=new Bn;return yw(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}class fo{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new Nw("value",this,new kr(e.snapshotNode,new lt(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Mw(this,e,n):null}matches(e){return e instanceof fo?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Rw(t,e,n,r,i){const s=new Aw(n,void 0),o=new fo(s);return ww(t._repo,t,o),()=>Tu(t._repo,t,o)}function dC(t,e,n,r){return Rw(t,"value",e)}function _C(t,e,n){Tu(t._repo,t,null)}R0(lt);L0(lt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kw="FIREBASE_DATABASE_EMULATOR_HOST",us={};let Dw=!1;function Pw(t,e,n,r){t.repoInfo_=new kc(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function Ow(t,e,n,r,i){let s=r||t.options.databaseURL;s===void 0&&(t.options.projectId||Ze("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),he("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=tl(s,i),a=o.repoInfo,l;typeof process<"u"&&Ea&&(l=Ea[kw]),l?(s=`http://${l}?ns=${a.namespace}`,o=tl(s,i),a=o.repoInfo):o.repoInfo.secure;const c=new Gy(t.name,t.options,e);cw("Invalid Firebase Database URL",o),V(o.path)||Ze("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Lw(a,t,c,new qy(t.name,n));return new Uw(u,t)}function Fw(t,e){const n=us[e];(!n||n[t.key]!==t)&&Ze(`Database ${e}(${t.repoInfo_}) has already been deleted.`),Cw(t),delete n[t.key]}function Lw(t,e,n,r){let i=us[e.name];i||(i={},us[e.name]=i);let s=i[t.toURLString()];return s&&Ze("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new _w(t,Dw,n,r),i[t.toURLString()]=s,s}class Uw{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(pw(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new lt(this._repo,q())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Fw(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ze("Cannot call "+e+" on a deleted database.")}}function $w(t=pc(),e){const n=_y(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=rm("database");r&&Bw(n,...r)}return n}function Bw(t,e,n,r={}){t=Zt(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Ze("Cannot call useEmulator() after instance has already been initialized.");const i=t._repoInternal;let s;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Ze('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new nr(nr.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:im(r.mockUserToken,t.app.options.projectId);s=new nr(o)}Pw(i,e,n,s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ww(t){Ay(my),vr(new In("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return Ow(r,i,s,n)},"PUBLIC").setMultipleInstances(!0)),Ot(ba,Ta,t),Ot(ba,Ta,"esm2017")}Ge.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Ge.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Ww();const Je=globalThis.__sveltekit_adth2z.env,Hw={apiKey:Je.PUBLIC_FIREBASE_API_KEY,authDomain:Je.PUBLIC_FIREBASE_AUTH_DOMAIN,databaseURL:Je.PUBLIC_FIREBASE_DATABASE_URL,projectId:Je.PUBLIC_FIREBASE_PROJECT_ID,storageBucket:Je.PUBLIC_FIREBASE_STORAGE_BUCKET,messagingSenderId:Je.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,appId:Je.PUBLIC_FIREBASE_APP_ID,measurementId:Je.PUBLIC_FIREBASE_MEASUREMENT_ID};let rl=null,Vw=null;rl=yy().length===0?_c(Hw):pc(),Vw=$w(rl);export{oC as a,Xw as b,iC as c,Jw as d,Jl as e,eC as f,Vl as g,Qw as h,Kw as i,lC as j,jw as k,bp as l,aC as m,Gw as n,cC as o,nC as p,Vw as q,Zw as r,tC as s,sC as t,fC as u,uC as v,hC as w,dC as x,_C as y,qw as z};
