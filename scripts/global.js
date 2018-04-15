/**
 * 添加函数到window.onload中
 * @param {*} func 
 */
function addLoadEvent(func) {
    var oldOnLoad = window.onload;

    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldOnLoad();
            func();
        }
    }
}

/**
 * 将newElemnet添加到targetElement后面
 * @param {*} newElement 新添加的元素
 * @param {*} targetElement 要添加到后面的元素
 */
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;

    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/**
 * 给element节点添加class
 * @param {*} element 
 * @param {*} value 
 */
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

/**
 * 高亮与当前页面对应的导航栏
 */
function highLightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;

    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var linkurl;

        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
        }

    }
}

/**
 * 移动某个元素
 * @param {*} elementID 
 * @param {*} final_x 
 * @param {*} final_y 
 * @param {*} interval 
 */
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;

    var elem = document.getElementById(elementID);
    if (elem.moveElement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }

    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos) / 10);
        ypos += dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y) / 10);
        ypos -= dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval);
}

/**
 * 用于实现移动鼠标，切换对应的图片
 */
function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;

    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "");
    frame.setAttribute("id", "frame")
    slideshow.appendChild(frame);

    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var links = document.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover = function() {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -150, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -300, 0, 5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -450, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -600, 0, 5);
            }
        }
    }
}

/**
 * 作用于about.html
 * 将 对应id的sections显示出来
 * @param {*} id 
 */
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

/**
 * 将about.html中的section元素隐藏起来，并添加nav的点集事件
 */
function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;

    var articles = document.getElementsByTagName("article");

    if (articles.length == 0)
        return false;

    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0)
        return false;

    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId))
            continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }
}

/**
 * photos.html
 * 准备占位图片
 */
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;


    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var descText = document.createTextNode("Choose an image");
    description.appendChild(descText);

    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);

}

/**
 * 实现点击某个小图片，在占位符中显示大图片
 * @param {*} whichpic 
 */
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return true;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if (!document.getElementById("description")) return false;
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}

/**
 * 为图片添加事件
 */
function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return showPic(this);
        };
        links[i].onkeypress = links[i].onclick;
    }
}

/**
 * 一行隔一行添加class为odd
 */
function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                rows[j].className = "odd";
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

/**
 * 当鼠标移到某一行上，该行高亮，移开后变会原样
 */
function highLightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        alert(rows[i].oldClassName);
        rows[i].onmouseover = function() {
            this.className = "hightlight";
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}

/**
 * 显示表格中WA,OR等字母缩写的全名
 */
function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    var dlist = document.createElement("dl");
    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
}

function getHttPObject() {
    if (typeof XMLHttpRequest == "undefined") {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {}
        return false;
    }

    return new XMLHttpRequest();
}

/**
 * 在ajax申请时，显示加载图片
 * @param {*} element 
 */
function displayAjaxloading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }

    var content = document.createElement("img");
    content.setAttribute("src", "images/loading.gif");
    content.setAttribute("alt", "Loading");
    element.appendChild(content);
}

/**
 * 通过ajax发出请求
 * @param {*} whichform 
 * @param {*} theTarget 
 */
function submitFormWithAjax(whichform, theTarget) {
    var request = getHttPObject();
    if (!request) {
        return false;
    }

    // 显示加载页面
    displayAjaxloading(theTarget);

    var dataParts = [];
    var element;
    //提取表单中的元素
    for (var i = 0; i < whichform.elements.length; i++) {
        element = whichform.elements[i];
        dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
    }

    // 将所有元素连接成一个字符串
    var data = dataParts.join('&');

    // 发出请求
    request.open('POST', whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                // 使用正则表达式 获取<article>标签内的内容
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matches.length > 0) {
                    theTarget.innerHTML = matches[1];
                } else {
                    theTarget.innerHTML = '<p>碰到了点问题，我们已经把前端工程师拿去祭天了，bug马上就能修好了</p>'
                }
            } else {
                theTarget.innerHTML = '<p>' + request.statusText + '<p>';
            }
        }
    };

    request.send(data);
    return true;
}

/**
 * 重设表单，当焦点在该标签上时，将预设值删除，焦点离开，则显示预设值
 * @param {*} whichform 
 */
function resetFields(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        if (!element.getAttribute('placeholder')) continue;
        element.onfocus = function() {
            if (this.value == this.getAttribute('placeholder')) {
                this.value = "";
            }
        }
        element.onblur = function() {
            if (this.value == "") {
                this.value = this.getAttribute('placeholder');
            }
        }
        element.onblur();
    }
}

/**
 * 点击label，则将焦点移到对应的文本框
 */
function focusLabels() {
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function() {
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}

/**
 * 验证表单中的个字段是否符合要求
 * @param {*} whichform 
 */
function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.getAttribute("required") == 'required') {
            if (!isFilled(element)) {
                alert("Please fill in the " + element.name + " field.");
                return false;
            }
        }
        if (element.getAttribute("type") == 'email') {
            if (!isEmail(element)) {
                alert("The " + element.name + " field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}

function isFilled(field) {
    return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

/**
 * 给表单的onsubmit设置事件
 */
function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function() {
            if (!validateForm(this)) return false;
            var article = document.getElementsByTagName('article')[0];
            if (submitFormWithAjax(this, article)) return false;
            return true;
        }
    }
}

addLoadEvent(prepareForms);
addLoadEvent(displayAbbreviations);
addLoadEvent(stripeTables);
addLoadEvent(highLightRows);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(highLightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);