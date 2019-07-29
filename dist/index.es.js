function e(e,t,r){return e.find(function(e){return e.vbs===t&&e.vpc===r})}function t(e){return{vbs:parseInt(e.querySelector("vVoice>vBS").textContent),vpc:parseInt(e.querySelector("vVoice>vPC").textContent),name:e.querySelector("vVoice>vVoiceName").textContent}}function r(e){return{tick:parseInt(e.querySelector("tempo>posTick").textContent),duration:-1,bpm:parseInt(e.querySelector("tempo>bpm").textContent)}}function n(t,r){return Array.prototype.slice.call(t.querySelectorAll("vsq3>vsTrack")).map(function(t){return function(t,r){var n=parseInt(t.querySelector("vsTrack>vsTrackNo").textContent),a=t.querySelector("vsTrack>trackName").textContent,c=t.querySelector("vsTrack>comment").textContent,u=function(t,r){var n=parseInt(t.querySelector("musicalPart>posTick").textContent),a=parseInt(t.querySelector("musicalPart>playTime").textContent),c=parseInt(t.querySelector("musicalPart>singer>vBS").textContent),u=parseInt(t.querySelector("musicalPart>singer>vPC").textContent),i=e(r,c,u),s=t.querySelector("musicalPart>comment").textContent,l=Array.prototype.slice.call(t.querySelectorAll("musicalPart>note")).map(o);return{tick:n,duration:a,singer:i,comment:s,notes:l}}(t.querySelector("vsTrack>musicalPart"),r);return{no:n,name:a,comment:c,content:u}}(t,r)})}function o(e){var t=["posTick","durTick","noteNum","velocity"].map(function(t){return parseInt(e.querySelector("note>"+t).textContent)}),r=t[0],n=t[1],o=t[2],a=t[3],c=["lyric","phnms"].map(function(t){return e.querySelector("note>"+t).textContent});return{tick:r,duration:n,note:o,velocity:a,lyric:c[0],phonemes:c[1]}}function a(e){return{vbs:parseInt(e.querySelector("vVoice>bs").textContent),vpc:parseInt(e.querySelector("vVoice>pc").textContent),name:e.querySelector("vVoice>name").textContent}}function c(e){return{tick:parseInt(e.querySelector("t").textContent),duration:-1,bpm:parseInt(e.querySelector("v").textContent)}}function u(t,r){return Array.prototype.slice.call(t.querySelectorAll("vsq4>vsTrack")).map(function(t){return function(t,r){var n=parseInt(t.querySelector("vsTrack>tNo").textContent),o=t.querySelector("vsTrack>name").textContent,a=t.querySelector("vsTrack>comment").textContent,c=function(t,r){var n=parseInt(t.querySelector("vsPart>t").textContent),o=parseInt(t.querySelector("vsPart>playTime").textContent),a=parseInt(t.querySelector("vsPart>singer>bs").textContent),c=parseInt(t.querySelector("vsPart>singer>pc").textContent),u=e(r,a,c),s=t.querySelector("vsPart>comment").textContent,l=Array.prototype.slice.call(t.querySelectorAll("vsPart>note")).map(i);return{tick:n,duration:o,singer:u,comment:s,notes:l}}(t.querySelector("vsTrack>vsPart"),r);return{no:n,name:o,comment:a,content:c}}(t,r)})}function i(e){var t=["t","dur","n","v"].map(function(t){return parseInt(e.querySelector("note>"+t).textContent)}),r=t[0],n=t[1],o=t[2],a=t[3],c=["y","p"].map(function(t){return e.querySelector("note>"+t).textContent});return{tick:r,duration:n,note:o,velocity:a,lyric:c[0],phonemes:c[1]}}var s="http://www.yamaha.co.jp/vocaloid/schema/vsq3/",l="http://www.yamaha.co.jp/vocaloid/schema/vsq4/";function m(e){var o=(new DOMParser).parseFromString(e,"text/xml");if(function(e){var t=(new DOMParser).parseFromString("<","text/xml").getElementsByTagName("parsererror")[0].namespaceURI;if("http://www.w3.org/1999/xhtml"===t)return e.getElementsByTagName("parsererror").length>0;return e.getElementsByTagNameNS(t,"parsererror").length>0}(o))return{error:"XML parse error",data:null};if(o.children.length<=0||o.children[0].namespaceURI!==s&&o.children[0].namespaceURI!==l||"vsq3"!==o.children[0].tagName&&"vsq4"!==o.children[0].tagName)return{error:"Unsupported VSQX format",data:null};var i,m=o.children[0],p=m.querySelector("vsq3>vender")||m.querySelector("vsq4>vender"),v=p&&p.textContent,y=m.querySelector("vsq3>version")||m.querySelector("vsq4>version"),q=y&&y.textContent,S="vsq3"===o.children[0].tagName,f=(S?["vsq3>masterTrack>resolution","vsq3>masterTrack>preMeasure","vsq3>masterTrack>timeSig>nume","vsq3>masterTrack>timeSig>denomi"]:["vsq4>masterTrack>resolution","vsq4>masterTrack>preMeasure","vsq4>masterTrack>timeSig>nu","vsq4>masterTrack>timeSig>de"]).map(function(e){return parseInt(m.querySelector(e).textContent)}),k=f[0],d=f[1],x=f[2],g=f[3],T=S?function(e){var t=Array.prototype.slice.call(e.querySelectorAll("vsq3>masterTrack>tempo")).map(r);return t.forEach(function(e,r){r<t.length-1&&(e.duration=t[r+1].tick-e.tick)}),t}(m):function(e){var t=Array.prototype.slice.call(e.querySelectorAll("vsq4>masterTrack>tempo")).map(c);return t.forEach(function(e,r){r<t.length-1&&(e.duration=t[r+1].tick-e.tick)}),t}(m),h=S?(i=m,Array.prototype.slice.call(i.querySelectorAll("vsq3>vVoiceTable>vVoice")).map(t)):function(e){return Array.prototype.slice.call(e.querySelectorAll("vsq4>vVoiceTable>vVoice")).map(a)}(m);return{data:{vender:v,version:q,resolution:k,preMeasure:d,timeSig:{nume:x,denomi:g},voices:h,tempos:T,tracks:S?n(m,h):u(m,h),raw:m}}}var p=function(){function e(e){this.result=e}return Object.defineProperty(e.prototype,"data",{get:function(){return this.result.data},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ticksPerMeasure",{get:function(){return 4*this.result.data.resolution/this.result.data.timeSig.denomi*this.result.data.timeSig.nume},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"offsetTick",{get:function(){return this.result.data.preMeasure*this.ticksPerMeasure},enumerable:!0,configurable:!0}),e.prototype.getOffsetTickForTrack=function(e){return e.content.tick+this.offsetTick},e.prototype.tickToTime=function(e){for(var t=this.result.data,r=t.tempos,n=t.resolution,o=0,a=0,c=r;a<c.length;a++){var u=c[a],i=v(u,n);if(!(-1!==u.duration&&u.tick+u.duration<e)){o+=(e-u.tick)*i;break}o+=u.duration*i}return o},e}();function v(e,t){return 6e4/(e.bpm/100)/t}export{p as VSQXParseResultUtil,e as findVoice,m as parse,v as timePerTick};
