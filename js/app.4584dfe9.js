(function(e){function t(t){for(var r,o,a=t[0],l=t[1],c=t[2],p=0,d=[];p<a.length;p++)o=a[p],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(d.length)d.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var l=n[a];0!==i[l]&&(r=!1)}r&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},i={app:0},s=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("8074");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app",empty:0===e.counts.length}},[n("table",[n("caption",{attrs:{highlighted:""}},[n("img",{staticClass:"btn",attrs:{alt:"리셋",src:"reset.png"},on:{click:function(t){e.counter={}}}}),n("img",{staticClass:"btn",attrs:{alt:e.collapsed?"펼치기":"접기",src:"filter_"+e.collapsed+".png"},on:{click:function(t){e.collapsed=!e.collapsed}}})]),n("transition-group",{attrs:{name:"counter",tag:"tbody"}},e._l(e.counts,(function(t){return n("tr",{key:t[0],staticClass:"counter-entry",attrs:{collapsed:e.collapsed,highlighted:e.highlighted.includes(t[0])},on:{click:function(n){return e.toggleHighlight(t[0])},contextmenu:function(n){return e.remove(t[0])}}},[n("td",[e._v(e._s(t[0]))]),e._v(" "),n("td",[e._v(e._s(t[1]))])])})),0)],1),n("footer",{on:{click:e.openRepository}},[e._v("v"+e._s(e.pkg.version))]),e.me?e._e():n("div",[e._v("플레이어 인식 불가!")])])},s=[],o=(n("caad"),n("c975"),n("4e82"),n("a434"),n("4fad"),n("2532"),n("b85c")),a=n("9224"),l=[/^(You) defeat the (.+?)\.$/,/^(.+?)は、(.+?)を倒した。$/,/^(.+?)[이가] (.+?)[을를] 쓰러뜨렸습니다\.$/],c={name:"App",data:function(){return{me:null,pets:[],counter:{},pkg:a,highlighted:[],collapsed:!1}},created(){this.addOverlayListener("LogLine"),this.addOverlayListener("ChangePrimaryPlayer"),window.startOverlayEvents()},computed:{counts(){var e=Object.entries(this.counter);return e.sort((function(e,t){return t[1]-e[1]||e[0].localeCompare(t[0])}))}},methods:{addOverlayListener(e){window.addOverlayListener(e,this["on"+e].bind(this))},onChangePrimaryPlayer(e){var t=e.charID,n=e.charName;this.me={name:n,id:parseInt(t,10)}},onLogLine(e){var t=e.line;switch(t[0]){case"00":return this.onGameLogLine(t);case"03":return this.onAddCombatant(t);case"04":return this.onRemoveCombatant(t);case"25":return this.onNetworkDeath(t)}},onGameLogLine(e){switch(e[2].toLowerCase()){case"0b3a":var t,n=[this.me.name,"You"],r=Object(o["a"])(l);try{for(r.s();!(t=r.n()).done;){var i=t.value,s=i.exec(e[4]);if(null!==s&&n.includes(s[1]))return this.count(s[2])}}catch(a){r.e(a)}finally{r.f()}}},onAddCombatant(e){var t=parseInt(e[6],16);t===this.me.id&&this.pets.push(parseInt(e[2],16))},onRemoveCombatant(e){var t=this.pets.indexOf(parseInt(e[2],16));t>-1&&this.pets.splice(t,1)},onNetworkDeath(e){var t={name:e[3],id:parseInt(e[2],16)},n={name:e[5],id:parseInt(e[4],16)};n.id!==this.me.id&&this.pets.includes(n.id)&&this.count(t.name)},count(e){var t=this.counter[e]||0;this.$set(this.counter,e,t+1)},remove(e){this.$delete(this.counter,e)},toggleHighlight(e){var t=this.highlighted.indexOf(e);t<0?this.highlighted.push(e):this.highlighted.splice(t,1)},openRepository(){window.open(this.pkg.repository,"_blank")}}},u=c,p=(n("5c0b"),n("2877")),d=Object(p["a"])(u,i,s,!1,null,null,null),h=d.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(h)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),i=n.n(r);i.a},9224:function(e){e.exports=JSON.parse('{"name":"ffxiv-kill-counter","version":"0.3.1","private":true,"repository":"https://github.com/ChalkPE/ffxiv-kill-counter","author":"ChalkPE","license":"MIT","scripts":{"serve":"vue-cli-service serve","build":"vue-cli-service build","lint":"vue-cli-service lint","deploy":"push-dir --dir=dist --branch=gh-pages --cleanup"},"dependencies":{"OverlayPlugin":"https://github.com/ngld/OverlayPlugin","core-js":"^3.3.2","vue":"^2.6.10"},"devDependencies":{"@vue/cli-plugin-babel":"^4.0.0","@vue/cli-plugin-eslint":"^4.0.0","@vue/cli-service":"^4.0.0","@vue/eslint-config-standard":"^4.0.0","babel-eslint":"^10.0.3","eslint":"^5.16.0","eslint-plugin-vue":"^5.0.0","lint-staged":"^9.4.2","push-dir":"^0.4.1","sass":"^1.19.0","sass-loader":"^8.0.0","vue-template-compiler":"^2.6.10"},"eslintConfig":{"root":true,"env":{"browser":true},"extends":["plugin:vue/essential","@vue/standard"],"rules":{},"parserOptions":{"parser":"babel-eslint"}},"postcss":{"plugins":{"autoprefixer":{}}},"browserslist":["chrome 45"],"gitHooks":{"pre-commit":"lint-staged"},"lint-staged":{"*.{js,vue}":["vue-cli-service lint","git add"]},"vue":{"publicPath":"./"}}')},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.4584dfe9.js.map