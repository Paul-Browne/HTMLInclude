/*! HTMLInclude v1.0.2 | MIT License | github.com/paul-browne/HTMLInclude */ 
! function(w) {
    if (!w.HTMLInclude) {
        w.HTMLInclude = function() {
            function callback(response, elements) {
                elements.forEach(function(element) {
                    var dataReplace = element.getAttribute("data-replace");
                    var z = response;
                    if (dataReplace) {
                        dataReplace.split(",").forEach(function(el) {
                            var o = el.split(":");
                            z = response.replace(new RegExp(o[0].trim(), "g"), o[1].trim());
                        });
                    }
                    if (element.parentNode) {
                        element.outerHTML = z;
                        var scripts = new DOMParser().parseFromString(z, 'text/html').querySelectorAll("SCRIPT");
                        var i = 0;
                        var j = scripts.length;
                        while (i < j) {
                            var newScript = document.createElement("SCRIPT");
                            scripts[i].src ? newScript.src = scripts[i].src : newScript.innerHTML = scripts[i].innerHTML;
                            document.head.appendChild(newScript);
                            i++;
                        }
                    }
                });
            }

            function ajax(url, els) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        callback(xhr.responseText, els);
                    }
                };
                xhr.open("GET", url, true);
                xhr.send();
            }
            var store = {};
            var dis = document.querySelectorAll('[data-include]');
            var i = dis.length;
            while (i--) {
                var di = dis[i].getAttribute('data-include');
                store[di] = store[di] || [];
                store[di].push(dis[i]);
            }
            for (var key in store) {
                ajax(key, store[key]);
            }
        }
    }
    w.HTMLInclude();
}(window)