var e="http://www.yamaha.co.jp/vocaloid/schema/vsq3/",r="http://www.yamaha.co.jp/vocaloid/schema/vsq4/";function t(t){var n=(new DOMParser).parseFromString(t,"text/xml");if(function(e){var r=(new DOMParser).parseFromString("<","text/xml").getElementsByTagName("parsererror")[0].namespaceURI;if("http://www.w3.org/1999/xhtml"===r)return e.getElementsByTagName("parsererror").length>0;return e.getElementsByTagNameNS(r,"parsererror").length>0}(n))return{error:"XML parse error",data:null};if(n.children.length<=0||n.children[0].namespaceURI!==e&&n.children[0].namespaceURI!==r||"vsq3"!==n.children[0].tagName&&"vsq4"!==n.children[0].tagName)return{error:"Unsupported VSQX format",data:null};var a,o=n.children[0],l=o.querySelector("vsq3>vender")||o.querySelector("vsq4>vender"),s=l&&l.textContent,c=o.querySelector("vsq3>version")||o.querySelector("vsq4>version");return{data:{vender:s,version:c&&c.textContent,tempos:"vsq3"===n.children[0].tagName?(a=o,Array.prototype.slice.call(a.querySelectorAll("vsq3>masterTrack>tempo")).map(function(e){return{tick:parseInt(e.querySelector("posTick").textContent),bpm:parseInt(e.querySelector("bpm").textContent)}})):function(e){return Array.prototype.slice.call(e.querySelectorAll("vsq4>masterTrack>tempo")).map(function(e){return{tick:parseInt(e.querySelector("t").textContent),bpm:parseInt(e.querySelector("v").textContent)}})}(o),raw:o}}}export{t as parse};
