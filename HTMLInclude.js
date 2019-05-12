/*! HTMLInclude v1.0.1 | MIT License | github.com/paul-browne/HTMLInclude */
! function(w) {
    if (!w.HTMLInclude) {
        w.HTMLInclude = function() {
            function ajax(element) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var dataReplace = element.getAttribute("data-replace");
                        var out = xhr.responseText;
                        if (dataReplace) {
                            dataReplace.split(",").forEach(function(el) {
                                var o = el.split(":");
                                out = out.replace(new RegExp(o[0].trim(), "g"), o[1].trim());
                            });
                        }
                        if(element.parentNode){
                            element.outerHTML = out;
                            var scripts = new DOMParser().parseFromString(out, 'text/html').querySelectorAll("SCRIPT");
                            var i = 0;
                            var j = scripts.length;
                            while (i < j) {
                                var newScript = document.createElement("SCRIPT");
                                scripts[i].src ? newScript.src = scripts[i].src : newScript.innerHTML = scripts[i].innerHTML;
                                document.head.appendChild(newScript);
                                i++;
                            }
                        }
                    }
                };
                xhr.open("GET", element.getAttribute("data-include"), true);
                xhr.send();
            }
            var dis = document.querySelectorAll('[data-include]');
            var i = dis.length;
            while (i--) {
                ajax(dis[i]);
            }
        }
    }
    w.HTMLInclude();
}(window)
