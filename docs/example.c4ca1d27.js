parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"309l":[function(require,module,exports) {
"use strict";function e(e,t,r){return e.find(function(e){return e.vbs===t&&e.vpc===r})}function t(e){return{vbs:parseInt(e.querySelector("vVoice>vBS").textContent),vpc:parseInt(e.querySelector("vVoice>vPC").textContent),name:e.querySelector("vVoice>vVoiceName").textContent}}function r(e){return{tick:parseInt(e.querySelector("tempo>posTick").textContent),bpm:parseInt(e.querySelector("tempo>bpm").textContent)}}function n(t,r){return Array.prototype.slice.call(t.querySelectorAll("vsq3>vsTrack")).map(function(t){return function(t,r){return{no:parseInt(t.querySelector("vsTrack>vsTrackNo").textContent),name:t.querySelector("vsTrack>trackName").textContent,comment:t.querySelector("vsTrack>comment").textContent,content:function(t,r){return{tick:parseInt(t.querySelector("musicalPart>posTick").textContent),playTime:parseInt(t.querySelector("musicalPart>playTime").textContent),singer:e(r,parseInt(t.querySelector("musicalPart>singer>vBS").textContent),parseInt(t.querySelector("musicalPart>singer>vPC").textContent)),comment:t.querySelector("musicalPart>comment").textContent,notes:Array.prototype.slice.call(t.querySelectorAll("musicalPart>note")).map(o)}}(t.querySelector("vsTrack>musicalPart"),r)}}(t,r)})}function o(e){var t=["posTick","durTick","noteNum","velocity"].map(function(t){return parseInt(e.querySelector("note>"+t).textContent)}),r=t[0],n=t[1],o=t[2],c=t[3],a=["lyric","phnms"].map(function(t){return e.querySelector("note>"+t).textContent});return{tick:r,duration:n,note:o,velocity:c,lyric:a[0],phonemes:a[1]}}function c(e){return{vbs:parseInt(e.querySelector("vVoice>bs").textContent),vpc:parseInt(e.querySelector("vVoice>pc").textContent),name:e.querySelector("vVoice>name").textContent}}function a(e){return{tick:parseInt(e.querySelector("t").textContent),bpm:parseInt(e.querySelector("v").textContent)}}function l(t,r){return Array.prototype.slice.call(t.querySelectorAll("vsq4>vsTrack")).map(function(t){return function(t,r){return{no:parseInt(t.querySelector("vsTrack>tNo").textContent),name:t.querySelector("vsTrack>name").textContent,comment:t.querySelector("vsTrack>comment").textContent,content:function(t,r){return{tick:parseInt(t.querySelector("vsPart>t").textContent),playTime:parseInt(t.querySelector("vsPart>playTime").textContent),singer:e(r,parseInt(t.querySelector("vsPart>singer>bs").textContent),parseInt(t.querySelector("vsPart>singer>pc").textContent)),comment:t.querySelector("vsPart>comment").textContent,notes:Array.prototype.slice.call(t.querySelectorAll("vsPart>note")).map(s)}}(t.querySelector("vsTrack>vsPart"),r)}}(t,r)})}function s(e){var t=["t","dur","n","v"].map(function(t){return parseInt(e.querySelector("note>"+t).textContent)}),r=t[0],n=t[1],o=t[2],c=t[3],a=["y","p"].map(function(t){return e.querySelector("note>"+t).textContent});return{tick:r,duration:n,note:o,velocity:c,lyric:a[0],phonemes:a[1]}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.parse=p;var u="http://www.yamaha.co.jp/vocaloid/schema/vsq3/",i="http://www.yamaha.co.jp/vocaloid/schema/vsq4/";function p(e){var o=(new DOMParser).parseFromString(e,"text/xml");if(function(e){var t=(new DOMParser).parseFromString("<","text/xml").getElementsByTagName("parsererror")[0].namespaceURI;return"http://www.w3.org/1999/xhtml"===t?e.getElementsByTagName("parsererror").length>0:e.getElementsByTagNameNS(t,"parsererror").length>0}(o))return{error:"XML parse error",data:null};if(o.children.length<=0||o.children[0].namespaceURI!==u&&o.children[0].namespaceURI!==i||"vsq3"!==o.children[0].tagName&&"vsq4"!==o.children[0].tagName)return{error:"Unsupported VSQX format",data:null};var s,p=o.children[0],m=p.querySelector("vsq3>vender")||p.querySelector("vsq4>vender"),y=m&&m.textContent,v=p.querySelector("vsq3>version")||p.querySelector("vsq4>version"),q=v&&v.textContent,S="vsq3"===o.children[0].tagName,x=S?(s=p,Array.prototype.slice.call(s.querySelectorAll("vsq3>masterTrack>tempo")).map(r)):function(e){return Array.prototype.slice.call(e.querySelectorAll("vsq4>masterTrack>tempo")).map(a)}(p),C=S?function(e){return Array.prototype.slice.call(e.querySelectorAll("vsq3>vVoiceTable>vVoice")).map(t)}(p):function(e){return Array.prototype.slice.call(e.querySelectorAll("vsq4>vVoiceTable>vVoice")).map(c)}(p);return{data:{vender:y,version:q,voices:C,tempos:x,tracks:S?n(p,C):l(p,C),raw:p}}}
},{}],"7QCb":[function(require,module,exports) {
"use strict";var e=require("../"),t=document.querySelector("input");function n(){if(!(t.files.length<=0)){var n=t.files.item(0),a=new FileReader;a.addEventListener("load",function(t){var n=(0,e.parse)(a.result),r=n.data.raw;if(self.vsqx=r,delete n.data.raw,document.querySelector("pre").textContent=JSON.stringify(n,null,"  "),n.data.tracks){var d=document.querySelector("dl");n.data.tracks.forEach(function(e){var t=document.createElement("dt");t.appendChild(document.createTextNode(e.no+":"+e.name));var n=document.createElement("dd");n.appendChild(document.createTextNode(e.content.notes.map(function(e){return e.lyric}).join(""))),d.appendChild(t),d.appendChild(n)})}}),a.readAsText(n)}}t.addEventListener("change",n);
},{"../":"309l"}]},{},["7QCb"], null)
//# sourceMappingURL=/example.c4ca1d27.js.map