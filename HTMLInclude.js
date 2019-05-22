/*! HTMLInclude v1.1.0 | MIT License | github.com/paul-browne/HTMLInclude */ 
! function(w,d) {
    if (!w.HTMLInclude) {
        w.HTMLInclude = function() {
            function isInViewport(element, offset) {
                return element.getBoundingClientRect().top <= (+offset + w.innerHeight);
            }
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
                            var newScript = d.createElement("SCRIPT");
                            scripts[i].src ? newScript.src = scripts[i].src : newScript.innerHTML = scripts[i].innerHTML;
                            d.head.appendChild(newScript);
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
            function lazyLoad(element, offset){
                w.addEventListener("scroll", function scrollFunc(){
                    if( isInViewport(element, offset) ){
                        w.removeEventListener("scroll", scrollFunc);
                        ajax(element.getAttribute("data-include"), [element]);
                    }
                })
            }
            var store = {};
            var dis = d.querySelectorAll('[data-include]');
            var i = dis.length;
            while (i--) {
                var di = dis[i].getAttribute('data-include');
                var laziness = dis[i].getAttribute('data-lazy');
                if( !laziness || ( laziness && isInViewport(dis[i], laziness) ) ){
                    store[di] = store[di] || [];
                    store[di].push(dis[i]);
                }else{
                    lazyLoad(dis[i], laziness);
                }
            }
            for (var key in store) {
                ajax(key, store[key]);
            }
        }
    }
    w.HTMLInclude();
}(window, document)