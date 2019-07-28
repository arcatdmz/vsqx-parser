parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"309l":[function(require,module,exports) {
"use strict";function e(e){return{vbs:parseInt(e.querySelector("vVoice>vBS").textContent),vpc:parseInt(e.querySelector("vVoice>vPC").textContent),name:e.querySelector("vVoice>vVoiceName").textContent}}function t(e){return{tick:parseInt(e.querySelector("tempo>posTick").textContent),bpm:parseInt(e.querySelector("tempo>bpm").textContent)}}function r(e,t){return Array.prototype.slice.call(e.querySelectorAll("vsq3>vsTrack")).map(function(e){return function(e,t){return{no:parseInt(e.querySelector("vsTrack>vsTrackNo").textContent),name:e.querySelector("vsTrack>trackName").textContent,comment:e.querySelector("vsTrack>comment").textContent,content:function(e,t){return{tick:parseInt(e.querySelector("musicalPart>posTick").textContent),playTime:parseInt(e.querySelector("musicalPart>playTime").textContent),singer:function(e,t,r){return e.find(function(e){return e.vbs===t&&e.vpc===r})}(t,parseInt(e.querySelector("musicalPart>singer>vBS").textContent),parseInt(e.querySelector("musicalPart>singer>vPC").textContent)),comment:e.querySelector("musicalPart>comment").textContent,notes:Array.prototype.slice.call(e.querySelectorAll("musicalPart>note")).map(n)}}(e.querySelector("vsTrack>musicalPart"),t)}}(e,t)})}function n(e){var t=["posTick","durTick","noteNum","velocity"].map(function(t){return parseInt(e.querySelector("note>"+t).textContent)}),r=t[0],n=t[1],o=t[2],a=t[3],c=["lyric","phnms"].map(function(t){return e.querySelector("note>"+t).textContent});return{tick:r,duration:n,note:o,velocity:a,lyric:c[0],phonemes:c[1]}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.parse=c;var o="http://www.yamaha.co.jp/vocaloid/schema/vsq3/",a="http://www.yamaha.co.jp/vocaloid/schema/vsq4/";function c(n){var c=(new DOMParser).parseFromString(n,"text/xml");if(function(e){var t=(new DOMParser).parseFromString("<","text/xml").getElementsByTagName("parsererror")[0].namespaceURI;return"http://www.w3.org/1999/xhtml"===t?e.getElementsByTagName("parsererror").length>0:e.getElementsByTagNameNS(t,"parsererror").length>0}(c))return{error:"XML parse error",data:null};if(c.children.length<=0||c.children[0].namespaceURI!==o&&c.children[0].namespaceURI!==a||"vsq3"!==c.children[0].tagName&&"vsq4"!==c.children[0].tagName)return{error:"Unsupported VSQX format",data:null};var l,s=c.children[0],u=s.querySelector("vsq3>vender")||s.querySelector("vsq4>vender"),i=u&&u.textContent,p=s.querySelector("vsq3>version")||s.querySelector("vsq4>version"),m=p&&p.textContent,v="vsq3"===c.children[0].tagName,y=v?(l=s,Array.prototype.slice.call(l.querySelectorAll("vsq3>masterTrack>tempo")).map(t)):function(e){return Array.prototype.slice.call(e.querySelectorAll("vsq4>masterTrack>tempo")).map(function(e){return{tick:parseInt(e.querySelector("t").textContent),bpm:parseInt(e.querySelector("v").textContent)}})}(s),q=v?function(t){return Array.prototype.slice.call(t.querySelectorAll("vsq3>vVoiceTable>vVoice")).map(e)}(s):null;return{data:{vender:i,version:m,voices:q,tempos:y,tracks:v?r(s,q):null,raw:s}}}
},{}],"7QCb":[function(require,module,exports) {
"use strict";var e=require("../"),t=document.querySelector("input");function n(){if(!(t.files.length<=0)){var n=t.files.item(0),a=new FileReader;a.addEventListener("load",function(t){var n=(0,e.parse)(a.result),r=n.data.raw;if(self.vsqx=r,delete n.data.raw,document.querySelector("pre").textContent=JSON.stringify(n,null,"  "),n.data.tracks){var d=document.querySelector("dl");n.data.tracks.forEach(function(e){var t=document.createElement("dt");t.appendChild(document.createTextNode(e.no+":"+e.name));var n=document.createElement("dd");n.appendChild(document.createTextNode(e.content.notes.map(function(e){return e.lyric}).join(""))),d.appendChild(t),d.appendChild(n)})}}),a.readAsBinaryString(n)}}t.addEventListener("change",n);
},{"../":"309l"}]},{},["7QCb"], null)
//# sourceMappingURL=/example.99541c18.js.map