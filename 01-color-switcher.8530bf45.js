const t={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};let e=null;function n(t){t.setAttribute("disabled","")}function o(t){t.removeAttribute("disabled")}n(t.btnStop),t.btnStart.addEventListener("click",(function(r){n(t.btnStart),o(t.btnStop),e=setInterval((()=>{document.querySelector("body").style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.btnStop.addEventListener("click",(function(r){n(t.btnStop),o(t.btnStart),clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.8530bf45.js.map