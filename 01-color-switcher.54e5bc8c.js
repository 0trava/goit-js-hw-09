document.querySelector("body");const e=document.querySelector("button[data-start]"),t=document.querySelector("button[data-stop]");let o=!0;t.disabled=!0,e.addEventListener("click",(function(){e.disabled=!0,t.disabled=!1,colorInterval=setInterval((()=>{o?document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`:clearInterval(colorInterval)}),1e3),o=!0})),t.addEventListener("click",(function(){e.disabled=!1,t.disabled=!0,clearInterval(colorInterval),clearTimeout(colorInterval),o=!1}));
//# sourceMappingURL=01-color-switcher.54e5bc8c.js.map
