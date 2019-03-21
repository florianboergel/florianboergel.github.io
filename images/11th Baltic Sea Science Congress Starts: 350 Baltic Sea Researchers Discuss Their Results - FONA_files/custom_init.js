//Modernizr
window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.flexboxlegacy=function(){return J("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var K in s)C(s,K)&&(x=K.toLowerCase(),e[x]=s[K](),v.push((e[x]?"":"no-")+x));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}function v(a){var b,c=a.getElementsByTagName("*"),d=c.length,e=RegExp("^(?:"+l().join("|")+")$","i"),f=[];while(d--)b=c[d],e.test(b.nodeName)&&f.push(b.applyElement(w(b)));return f}function w(a){var b,c=a.attributes,d=c.length,e=a.ownerDocument.createElement(t+":"+a.nodeName);while(d--)b=c[d],b.specified&&e.setAttribute(b.nodeName,b.nodeValue);return e.style.cssText=a.style.cssText,e}function x(a){var b,c=a.split("{"),d=c.length,e=RegExp("(^|[\\s,>+~])("+l().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),f="$1"+t+"\\:$2";while(d--)b=c[d]=c[d].split("}"),b[b.length-1]=b[b.length-1].replace(e,f),c[d]=b.join("}");return c.join("{")}function y(a){var b=a.length;while(b--)a[b].removeNode()}function z(a){function g(){clearTimeout(d._removeSheetTimer),b&&b.removeNode(!0),b=null}var b,c,d=m(a),e=a.namespaces,f=a.parentWindow;return!u||a.printShived?a:(typeof e[t]=="undefined"&&e.add(t),f.attachEvent("onbeforeprint",function(){g();var d,e,f,h=a.styleSheets,i=[],j=h.length,l=Array(j);while(j--)l[j]=h[j];while(f=l.pop())if(!f.disabled&&s.test(f.media)){try{d=f.imports,e=d.length}catch(m){e=0}for(j=0;j<e;j++)l.push(d[j]);try{i.push(f.cssText)}catch(m){}}i=x(i.reverse().join("")),c=v(a),b=k(a,i)}),f.attachEvent("onafterprint",function(){y(c),clearTimeout(d._removeSheetTimer),d._removeSheetTimer=setTimeout(g,500)}),a.printShived=!0,a)}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b);var s=/^$|\b(?:all|print)\b/,t="html5shiv",u=!j&&function(){var c=b.documentElement;return typeof b.namespaces!="undefined"&&typeof b.parentWindow!="undefined"&&typeof c.applyElement!="undefined"&&typeof c.removeNode!="undefined"&&typeof a.attachEvent!="undefined"}();r.type+=" print",r.shivPrint=z,z(b)}(this,document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

// Funktion f�r Startseite B�hne
// tiny helper function to add breakpoints
// use smallGrid = true if only in col3, else use smallGrid = false
// read from bottom to top - show 4 items (browser width > 1280), show 3 items (browser width > 800), show 1 item (browser width < 800)
function getGridSize(smallGrid) {
  if(smallGrid) {    
    return ($('body').innerWidth() < 600) ? 1 :
           ($('body').innerWidth() < 800) ? 2 : 
           ($('body').innerWidth() < 1281) ? 3 :
                                             3;
 } else {
    return ($('body').innerWidth() < 600) ? 1 :
           ($('body').innerWidth() < 800) ? 2 :
           ($('body').innerWidth() < 1281) ? 3 :
                                            4;  
  }
}

function getItemSize(smallGrid) {
  if(smallGrid) {    
    return ($('body').innerWidth() < 800) ? 150 :
           ($('body').innerWidth() < 1281) ? 160 :
                                            200;
 } else {
    return ($('body').innerWidth() < 800) ? 150 :
           ($('body').innerWidth() < 1281) ? 300 :
                                            200;  
  }
}

// Funktion um die Sliderpfeile richtig zu positionieren
function positionArrows() {
$('.bmbf-carousel .flexslider .slides li:first-child').each(function() {
    var height = $(this).parent().parent().parent().parent().height();
    var heightHeading = $(this).parent().parent().parent().parent().find('.bmbf-slider-headline').height();
    var heightImg = $(this).find('img:first').height();
    
    if(heightImg != null) {
      //var ratio = ((heightImg) / ((height+25)/100));
      var ratio = (heightImg / 2) + heightHeading + 25;
      $(this).parent().parent().parent().parent().find($('.flex-direction-nav li a')).css('top', ratio+'px'); //css('top', ratio);
}})}

// Can also be used with $(document).ready()
$(window).load(function() {
$('body').removeClass('bmbf-no-js');

$('#rechte_seite .medien_kasten_slider .flexslider:not(.portrait_slider,.podcast_slider)').flexslider({
    animation: "slide",
    animationLoop: true,
    slideshow: false,
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",
    startAt: 0,
    touch: true,
    controlsContainer: "#rechte_seite .flexslider_medien_kasten_navigation",
    controlNav: false
});
  
$('#rechte_seite .portrait_slider').flexslider({
    animation: "slide",
    animationLoop: true,
    slideshow: true,
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",
    startAt: 0,
    touch: true,
    controlsContainer: "#rechte_seite .flexslider_portrait_kasten_navigation",
    controlNav: false
});

$('#rechte_seite .podcast_slider').flexslider({
    animation: "slide",
    animationLoop: true,
    slideshow: true,
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",
    startAt: 0,
    touch: true,
    controlsContainer: "#rechte_seite .flexslider_medien_kasten_navigation",
    controlNav: false
});

$('.bmbf-topic .flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    itemWidth: getItemSize(false),
    itemMargin: 0,
    minItems: getGridSize(true),
    maxItems: getGridSize(true),
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",   
    controlsContainer: ".bmbf-topic.bmbf-carousel",
    start: positionArrows    
});
  
$('.bmbf-press .flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    itemWidth: getItemSize(true),
    itemMargin: 0,
    minItems: getGridSize(true),
    maxItems: getGridSize(true),
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement", 
    controlsContainer: ".bmbf-press.bmbf-carousel",
    start: positionArrows    
});
  
  $('.bmbf-publication .flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    itemWidth: getItemSize(true),
    itemMargin: 0,
    minItems: getGridSize(true),
    maxItems: getGridSize(true),
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement", 
    controlsContainer: ".bmbf-publication.bmbf-carousel",
    start: positionArrows    
  });
  
  $('.bmbf-video .flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    itemWidth: getItemSize(false),
    itemMargin: 0,
    minItems: getGridSize(false),
    maxItems: getGridSize(false),
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement", 
    controlsContainer: ".bmbf-video.bmbf-carousel",
    start: positionArrows    
  });
  
  $('.bmbf-fokus .flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    itemWidth: getItemSize(false),
    itemMargin: 0,
    minItems: getGridSize(false),
    maxItems: getGridSize(false),
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement", 
    controlsContainer: ".bmbf-fokus.bmbf-carousel",
    start: positionArrows  
  });
  
// Erstellt den Flexslider mit CB-Funktionen f�r den Z�hler
$('.bmbf-image-gallery .flexslider').flexslider({
    animation: "slide",
    slideshow: false,
    controlNav: "thumbnails",
    controlsContainer: ".bmbf-image-gallery.bmbf-carousel",
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",
    smoothHeight: true, 
    start: function(slider) {
        $('.flex-current-slide').text(slider.currentSlide+1);
        $('.flex-total-slides').text(slider.count);
        $('.flex-control-nav.flex-control-thumbs').hide();
        positionArrows();
    },after: function(slider) {
    $('.flex-current-slide').text(slider.currentSlide+1);
    }
  });
  
// F�gt HTML-Code zum Flexslider hinzu (Z�hler, Minimieren/Maximieren Link)                      
$('.bmbf-image-gallery .flexslider').append('<div class="flex-counter">Bild <span class="flex-current-slide"></span>/<span class="flex-total-slides"></span></div>');
  
$('.bmbf-image-gallery').append('<a href="#" class="flex-control-thumbs-toggle" title="Vorschaubilder anzeigen">Vorschaubilder maximieren</a>');
  
// Click-Event f�r den Minimieren/Maximieren Link / Setzt auch eine spezifische Klasse und Text f�r den Link                      
  $('.flex-control-thumbs-toggle').click(function(event) {
    event.preventDefault();
    $(this).prev('.flex-control-nav.flex-control-thumbs').toggle();
    $(this)
    .removeClass('flex-thumbnails-is-visible')
    .removeClass('flex-thumbnails-is-hidden')
    .addClass(
    $('.flex-control-nav.flex-control-thumbs').is(':visible') ? 'flex-thumbnails-is-visible' : 'flex-thumbnails-is-hidden')
    .text($('.flex-control-nav.flex-control-thumbs').is(':visible') ? 'Vorschaubilder minimieren' : 'Vorschaubilder maximieren');
  });
  
// Dreht die Reihenfolge der Vor- und Zur�ckpfeile im DOM um: Sinnvoll, da ansonsten beim Aufklappen und Zuklappen der Thumbnail-Vorschau die Pfeile bei rel. Positionierung springen
  var directionNav = $(".bmbf-image-gallery .flex-direction-nav").detach();
  $(".flexslider .flex-viewport").append(directionNav);

// stage
  $('.bmbf-stage-slider').flexslider({
    animation: "slide",
    slideshow: true,
    slideshowSpeed: 9000,
    directionNav: false,
    pausePlay: true,
    start: function(slider) {
        $(".bmbf-stage-slider .flex-control-nav").wrap('<div class="bmbf-stage-controls"></div>');
        var pausePlayHtml = $(".bmbf-stage-slider .flex-pauseplay").detach();
        $(".bmbf-stage-slider .bmbf-stage-controls").append(pausePlayHtml);
    }
  });

// teaser-gallery
  $('.teaser-gallery').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",   
    controlsContainer: ".teaser_gallery_slider-carousel",
    startAt: 0,
start: function(slider) {}
});

// teaser-gallery
  $('.teaser-gallery_auto').flexslider({
    animation: "slide",
    animationLoop: true,
    slideshow: true,
    controlNav: false,
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",   
    controlsContainer: ".teaser_gallery_slider-carousel",
    startAt: 0,
start: function(slider) {}
});
});

$(document).ready(function() {

//Email Anti-Spam Captcha
function activate_links(div,mc){

$("#"+div+" a").click(function() {
var id = $(this).attr('id');
var lang = $(this).attr('lang');
if (id=="Akteur"){
}else{
load_mail_captcha(lang,id,div,mc);
location.href = "#ansprechpartner";
return false;
}})
}

function load_mail_captcha(lang,id,div,mc){
$.ajax({
   type: "GET",
   url: "/get_captcha.php",
   data: "id="+id+"&lang="+lang,
   success: function(msg){
$("#"+div).html(msg);
get_captcha(lang,id,div,mc);
}});
}

function get_captcha(lang,getid,div,mc){

$("#captcha_alternative a").click(function() {
$.ajax({
   type: "GET",
   url: "/captcha/captcha.php",
   data: "alternative=1",
   success: function(msg){
$("#captcha_alternative").html(msg);
}});
return false;
})

$("#captcha_"+getid+" a").click(function() {
var code = $("#code_"+getid).val();
var id = $(this).attr('id');
var lang = $(this).attr('lang');
if (id=="akteur"){
}else{
load_mail(lang,id,code,div,mc);
return false;
}})

function load_mail(lang,id,code,div,mc){
$.ajax({
   type: "GET",
   url: "/get_captcha2.php",
   data: "do=captcha&mc="+mc+"&id="+id+"&lang_captcha="+lang+"&code="+code,
   success: function(msg){
$("#"+div).html(msg);
activate_links("captcha_"+id,mc);
}})}
}

activate_links("ansprechpartner","0");

$("#captcha_alternative a").click(function() {
$.ajax({
   type: "GET",
   url: "/captcha/captcha.php",
   data: "alternative=1",
   success: function(msg){
$("#captcha_alternative").html(msg);
}});
return false;
})

// Markiere Last-Childs
$(".mainnavlist li:last-child").addClass('bmbf-menu-last-child');
  
$(window).resize(function () { 
$("#navispacer,#navispacer_small").trigger("sticky_kit:recalc");

//unstick sticky menu
$("#navispacer,#navispacer_small").trigger("sticky_kit:detach");
$("header").css("display","block");
$("#sticky").css("display","none");
$("#navispacer,#navispacer_small").stick_in_parent({parent: '#body_main'})
.on("sticky_kit:stick", function(e) {
$(e.target).css("display","none");
$("#sticky").css("display","block");
})
.on("sticky_kit:unstick", function(e) {
$(e.target).css("display","block");
$("#sticky").css("display","none");
});

if($('body').innerWidth() < 600) {
$("#stage .teaser-media").css("width","100%");
$("#stage .teaser-media").css("float","none");
$("#stage .teaser-content").css("width","90%");
}

if($('body').innerWidth() > 601) {
$("#stage .teaser-media").css("width","55.1379%");
$("#stage .teaser-media").css("float","left");
$("#stage .teaser-content").css("width","35.8621%");
}

if($('body').innerWidth() < 800) {

//event_navi verschieben 
var event_navi = $("#event_navi").detach();
$("#content").before(event_navi);          

//Suchfeld verschieben 
var search_main = $('#search_main').detach();
$(".header-content").after(search_main);

//unstick sticky menu
$("#navispacer,#navispacer_small").trigger("sticky_kit:detach");
$("header").css("display","block");
$("#sticky").css("display","none");
}

if($('body').innerWidth() > 800) {

//event_navi verschieben 
var event_navi = $("#event_navi").detach();
$("#event_navi_before").before(event_navi);          

//Suchfeld verschieben 
var search_main = $('#search_main').detach();
$("#search_main_before").after(search_main);
}})

if($('body').innerWidth() < 600) {
$("#stage .teaser-media").css("width","100%");
$("#stage .teaser-media").css("float","none");
$("#stage .teaser-content").css("width","90%");
}

if($('body').innerWidth() > 601) {
$("#stage .teaser-media").css("width","55.1379%");
$("#stage .teaser-media").css("float","left");
$("#stage .teaser-content").css("width","35.8621%");
}

if($('body').innerWidth() < 800) {
//event_navi verschieben 
var event_navi = $("#event_navi").detach();
$("#content").before(event_navi);          

//Suchfeld verschieben 
var search_main = $('#search_main').detach();
$(".header-content").after(search_main); 
}

//mobiles Seitenmen� Klick
$("#sidenav a").click(function (event) { 
varlink=$(this).attr("linkid");
varid=$(this).attr("id");

if (typeof varlink!="undefined"){
$("#sidemenu_"+varlink).slideToggle();
myparent = $(event.target).parent();myparent="#"+myparent[0].id;

var iteration2=$(this).data('iteration2')||1
switch ( iteration2) {
case 1:
$("#"+varid).css('background-image',"url('/css/images/pfeil_oben_weiss.svg')");
break;

case 2:
$("#"+varid).css('background-image',"url('/css/images/pfeil_unten_weiss.svg')");
break;
};
iteration2++;
if (iteration2>2) iteration2=1
$(this).data('iteration2',iteration2)
return false;
}else{}
});

$("body").prepend("<div id ='overlay' class=\"overlay\"></div>");

if($('body').innerWidth() > 800) {
$("#navispacer,#navispacer_small").stick_in_parent({parent: '#body_main'})
 .on("sticky_kit:stick", function(e) {
$(e.target).css("display","none");
$("#sticky").css("display","block");
   // console.log("has stuck!", e.target);
  })
.on("sticky_kit:unstick", function(e) {
$(e.target).css("display","block");
$("#sticky").css("display","none");
})}

$(".contextbox h2").click(function (event) {
$('#rechte_seite_mobile .medien_kasten_slider .flexslider:not(.portrait_slider,.podcast_slider)').flexslider({
    animation: "slide",
    animationLoop: true,
    slideshow: true,
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",
    startAt: 0,
    touch: true,
    controlsContainer: "#rechte_seite_mobile .flexslider_medien_kasten_navigation",
    controlNav: true
})

$('#rechte_seite_mobile .portrait_slider').flexslider({
    animation: "slide",
    animationLoop: true,
    slideshow: true,
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",
    startAt: 0,
    touch: true,
    controlsContainer: "#rechte_seite_mobile .flexslider_portrait_kasten_navigation",
    controlNav: true
})

$('#rechte_seite .podcast_slider').flexslider({
    animation: "slide",
    animationLoop: true,
    slideshow: true,
    prevText: "Voriges Sliderelement",
    nextText: "N�chstes Sliderelement",
    startAt: 0,
    touch: true,
    controlsContainer: "#rechte_seite .flexslider_medien_kasten_navigation",
    controlNav: false
});

myparent = $(event.target).parent();myparent="#"+myparent[0].id;

$("#rechte_seite_mobile "+myparent+" .cb-text-content").slideToggle();
var iteration=$(this).data('iteration')||1
switch ( iteration) {
case 1:
if (myparent=="#themen_tagcloud"){
$("#rechte_seite_mobile "+myparent+" h2").css('background-image',"url('/css/images/pfeil_oben_weiss.svg')");
}else{
$("#rechte_seite_mobile "+myparent+" h2").css('background-image',"url('/css/images/pfeil_oben.svg')");
}
break;
      
case 2:
if (myparent=="#themen_tagcloud"){
$("#rechte_seite_mobile "+myparent+" h2").css('background-image',"url('/css/images/pfeil_unten_weiss.svg')");
}else{
$("#rechte_seite_mobile "+myparent+" h2").css('background-image',"url('/css/images/pfeil_unten.svg')");
}
break;
};
iteration++;
if (iteration>2) iteration=1
$(this).data('iteration',iteration)

$('#rechte_seite_mobile .medien_kasten_slider .flexslider').resize();
return false;});
    
$('.bmbf-nav-menu-button').click(function(event) {
event.preventDefault();
$('#sidenav').toggle(100);

$("#overlay").css({height: $(document).height()});
$("#overlay").css({"opacity" : "0.7"}).fadeIn("slow");
return false;});
    
$("#overlay").click(function(){$("#overlay").fadeOut("slow");$('#sidenav').toggle(100);});

$('.bmbf-nav-search-button').click(function(event) {
event.preventDefault();
$('.ym-searchform2').toggle();
if ($('.ym-searchform2').is(':visible')) {
$('#header').css('height', '205px');
$('.ym-searchform2').css('margin-top', '160px');
} else {
$('#header').css('height', '150px'); 
$('.ym-searchform2').css('margin-top', '0'); 
}})
})