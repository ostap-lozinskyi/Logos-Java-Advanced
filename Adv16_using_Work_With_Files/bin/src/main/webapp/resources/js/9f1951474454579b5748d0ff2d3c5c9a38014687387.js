(function ($, undefined) {
    var PROP_NAME = "selectbox"
        , FALSE = false
        , TRUE = true;

    function Selectbox() {
        this._state = [];
        this._defaults = {
            classHolder: "sbHolder"
            , classHolderDisabled: "sbHolderDisabled"
            , classSelector: "sbSelector"
            , classOptions: "sbOptions"
            , classGroup: "sbGroup"
            , classSub: "sbSub"
            , classDisabled: "sbDisabled"
            , classToggleOpen: "sbToggleOpen"
            , classToggle: "sbToggle"
            , classFocus: "sbFocus"
            , speed: 200
            , effect: "slide"
            , onChange: null
            , onOpen: null
            , onClose: null
        }
    }
    $.extend(Selectbox.prototype, {
        _isOpenSelectbox: function (target) {
            if (!target) {
                return FALSE
            }
            var inst = this._getInst(target);
            return inst.isOpen
        }
        , _isDisabledSelectbox: function (target) {
            if (!target) {
                return FALSE
            }
            var inst = this._getInst(target);
            return inst.isDisabled
        }
        , _attachSelectbox: function (target, settings) {
            if (this._getInst(target)) {
                return FALSE
            }
            var $target = $(target)
                , self = this
                , inst = self._newInst($target)
                , sbHolder, sbSelector, sbToggle, sbOptions, s = FALSE
                , optGroup = $target.find("optgroup")
                , opts = $target.find("option")
                , olen = opts.length;
            $target.attr("sb", inst.uid);
            $.extend(inst.settings, self._defaults, settings);
            self._state[inst.uid] = FALSE;
            $target.hide();

            function closeOthers() {
                var key, sel, uid = this.attr("id").split("_")[1];
                for (key in self._state) {
                    if (key !== uid) {
                        if (self._state.hasOwnProperty(key)) {
                            sel = $("select[sb='" + key + "']")[0];
                            if (sel) {
                                self._closeSelectbox(sel)
                            }
                        }
                    }
                }
            }
            sbHolder = $("<div>", {
                id: "sbHolder_" + inst.uid
                , "class": inst.settings.classHolder
                , tabindex: $target.attr("tabindex")
            });
            sbSelector = $("<a>", {
                id: "sbSelector_" + inst.uid
                , href: "#"
                , "class": inst.settings.classSelector
                , click: function (e) {
                    e.preventDefault();
                    closeOthers.apply($(this), []);
                    var uid = $(this).attr("id").split("_")[1];
                    if (self._state[uid]) {
                        self._closeSelectbox(target)
                    }
                    else {
                        self._openSelectbox(target)
                    }
                }
            });
            sbToggle = $("<a>", {
                id: "sbToggle_" + inst.uid
                , href: "#"
                , "class": inst.settings.classToggle
                , click: function (e) {
                    e.preventDefault();
                    closeOthers.apply($(this), []);
                    var uid = $(this).attr("id").split("_")[1];
                    if (self._state[uid]) {
                        self._closeSelectbox(target)
                    }
                    else {
                        self._openSelectbox(target)
                    }
                }
            });
            sbToggle.appendTo(sbHolder);
            sbOptions = $("<ul>", {
                id: "sbOptions_" + inst.uid
                , "class": inst.settings.classOptions
                , css: {
                    display: "none"
                }
            });
            $target.children().each(function (i) {
                var that = $(this)
                    , li, config = {};
                if (that.is("option")) {
                    getOptions(that)
                }
                else {
                    if (that.is("optgroup")) {
                        li = $("<li>");
                        $("<span>", {
                            text: that.attr("label")
                        }).addClass(inst.settings.classGroup).appendTo(li);
                        li.appendTo(sbOptions);
                        if (that.is(":disabled")) {
                            config.disabled = true
                        }
                        config.sub = true;
                        getOptions(that.find("option"), config)
                    }
                }
            });

            function getOptions() {
                var sub = arguments[1] && arguments[1].sub ? true : false
                    , disabled = arguments[1] && arguments[1].disabled ? true : false;
                arguments[0].each(function (i) {
                    var that = $(this)
                        , li = $("<li>")
                        , child;
                    if (that.is(":selected")) {
                        sbSelector.text(that.text());
                        s = TRUE
                    }
                    if (i === olen - 1) {
                        li.addClass("last")
                    }
                    if (!that.is(":disabled") && !disabled) {
                        child = $("<a>", {
                            href: "#" + that.val()
                            , rel: that.val()
                        }).text(that.text()).bind("click.sb", function (e) {
                            if (e && e.preventDefault) {
                                e.preventDefault()
                            }
                            var t = sbToggle
                                , $this = $(this)
                                , uid = t.attr("id").split("_")[1];
                            self._changeSelectbox(target, $this.attr("rel"), $this.text());
                            self._closeSelectbox(target)
                        }).bind("mouseover.sb", function () {
                            var $this = $(this);
                            $this.parent().siblings().find("a").removeClass(inst.settings.classFocus);
                            $this.addClass(inst.settings.classFocus)
                        }).bind("mouseout.sb", function () {
                            $(this).removeClass(inst.settings.classFocus)
                        });
                        if (sub) {
                            child.addClass(inst.settings.classSub)
                        }
                        if (that.is(":selected")) {
                            child.addClass(inst.settings.classFocus)
                        }
                        child.appendTo(li)
                    }
                    else {
                        child = $("<span>", {
                            text: that.text()
                        }).addClass(inst.settings.classDisabled);
                        if (sub) {
                            child.addClass(inst.settings.classSub)
                        }
                        child.appendTo(li)
                    }
                    li.appendTo(sbOptions)
                })
            }
            if (!s) {
                sbSelector.text(opts.first().text())
            }
            $.data(target, PROP_NAME, inst);
            sbHolder.data("uid", inst.uid).bind("keydown.sb", function (e) {
                var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0
                    , $this = $(this)
                    , uid = $this.data("uid")
                    , inst = $this.siblings("select[sb='" + uid + "']").data(PROP_NAME)
                    , trgt = $this.siblings(["select[sb='", uid, "']"].join("")).get(0)
                    , $f = $this.find("ul").find("a." + inst.settings.classFocus);
                switch (key) {
                case 37:
                case 38:
                    if ($f.length > 0) {
                        var $next;
                        $("a", $this).removeClass(inst.settings.classFocus);
                        $next = $f.parent().prevAll("li:has(a)").eq(0).find("a");
                        if ($next.length > 0) {
                            $next.addClass(inst.settings.classFocus).focus();
                            $("#sbSelector_" + uid).text($next.text())
                        }
                    }
                    break;
                case 39:
                case 40:
                    var $next;
                    $("a", $this).removeClass(inst.settings.classFocus);
                    if ($f.length > 0) {
                        $next = $f.parent().nextAll("li:has(a)").eq(0).find("a")
                    }
                    else {
                        $next = $this.find("ul").find("a").eq(0)
                    }
                    if ($next.length > 0) {
                        $next.addClass(inst.settings.classFocus).focus();
                        $("#sbSelector_" + uid).text($next.text())
                    }
                    break;
                case 13:
                    if ($f.length > 0) {
                        self._changeSelectbox(trgt, $f.attr("rel"), $f.text())
                    }
                    self._closeSelectbox(trgt);
                    break;
                case 9:
                    if (trgt) {
                        var inst = self._getInst(trgt);
                        if (inst) {
                            if ($f.length > 0) {
                                self._changeSelectbox(trgt, $f.attr("rel"), $f.text())
                            }
                            self._closeSelectbox(trgt)
                        }
                    }
                    var i = parseInt($this.attr("tabindex"), 10);
                    if (!e.shiftKey) {
                        i++
                    }
                    else {
                        i--
                    }
                    $("*[tabindex='" + i + "']").focus();
                    break;
                case 27:
                    self._closeSelectbox(trgt);
                    break
                }
                e.stopPropagation();
                return false
            }).delegate("a", "mouseover", function (e) {
                $(this).addClass(inst.settings.classFocus)
            }).delegate("a", "mouseout", function (e) {
                $(this).removeClass(inst.settings.classFocus)
            });
            sbSelector.appendTo(sbHolder);
            sbOptions.appendTo(sbHolder);
            sbHolder.insertAfter($target);
            $("html").on("mousedown", function (e) {
                e.stopPropagation();
                $("select").selectbox("close")
            });
            $([".", inst.settings.classHolder, ", .", inst.settings.classSelector].join("")).mousedown(function (e) {
                e.stopPropagation()
            })
        }
        , _detachSelectbox: function (target) {
            var inst = this._getInst(target);
            if (!inst) {
                return FALSE
            }
            $("#sbHolder_" + inst.uid).remove();
            $.data(target, PROP_NAME, null);
            $(target).show()
        }
        , _changeSelectbox: function (target, value, text) {
            var onChange, inst = this._getInst(target);
            if (inst) {
                onChange = this._get(inst, "onChange");
                $("#sbSelector_" + inst.uid).text(text)
            }
            value = value.replace(/\'/g, "\\'");
            $(target).find("option").prop("selected", FALSE);
            $(target).find("option[value='" + value + "']").prop("selected", "selected");
            if (inst && onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [value, inst])
            }
            else {
                if (inst && inst.input) {
                    inst.input.trigger("change")
                }
            }
        }
        , _enableSelectbox: function (target) {
            var inst = this._getInst(target);
            if (!inst || !inst.isDisabled) {
                return FALSE
            }
            $("#sbHolder_" + inst.uid).removeClass(inst.settings.classHolderDisabled);
            inst.isDisabled = FALSE;
            $.data(target, PROP_NAME, inst)
        }
        , _disableSelectbox: function (target) {
            var inst = this._getInst(target);
            if (!inst || inst.isDisabled) {
                return FALSE
            }
            $("#sbHolder_" + inst.uid).addClass(inst.settings.classHolderDisabled);
            inst.isDisabled = TRUE;
            $.data(target, PROP_NAME, inst)
        }
        , _optionSelectbox: function (target, name, value) {
            var inst = this._getInst(target);
            if (!inst) {
                return FALSE
            }
            inst[name] = value;
            $.data(target, PROP_NAME, inst)
        }
        , _openSelectbox: function (target) {
            var inst = this._getInst(target);
            if (!inst || inst.isOpen || inst.isDisabled) {
                return
            }
            var el = $("#sbOptions_" + inst.uid)
                , viewportHeight = parseInt($(window).height(), 10)
                , offset = $("#sbHolder_" + inst.uid).offset()
                , scrollTop = $(window).scrollTop()
                , height = el.prev().height()
                , diff = viewportHeight - (offset.top - scrollTop) - height / 2
                , onOpen = this._get(inst, "onOpen");
            el.css({
                top: height + "px"
                , maxHeight: (diff - height) + "px"
            });
            inst.settings.effect === "fade" ? el.fadeIn(inst.settings.speed) : el.slideDown(inst.settings.speed);
            $("#sbToggle_" + inst.uid).addClass(inst.settings.classToggleOpen);
            this._state[inst.uid] = TRUE;
            inst.isOpen = TRUE;
            if (onOpen) {
                onOpen.apply((inst.input ? inst.input[0] : null), [inst])
            }
            $.data(target, PROP_NAME, inst)
        }
        , _closeSelectbox: function (target) {
            var inst = this._getInst(target);
            if (!inst || !inst.isOpen) {
                return
            }
            var onClose = this._get(inst, "onClose");
            inst.settings.effect === "fade" ? $("#sbOptions_" + inst.uid).fadeOut(inst.settings.speed) : $("#sbOptions_" + inst.uid).slideUp(inst.settings.speed);
            $("#sbToggle_" + inst.uid).removeClass(inst.settings.classToggleOpen);
            this._state[inst.uid] = FALSE;
            inst.isOpen = FALSE;
            if (onClose) {
                onClose.apply((inst.input ? inst.input[0] : null), [inst])
            }
            $.data(target, PROP_NAME, inst)
        }
        , _newInst: function (target) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: id
                , input: target
                , uid: Math.floor(Math.random() * 99999999)
                , isOpen: FALSE
                , isDisabled: FALSE
                , settings: {}
            }
        }
        , _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME)
            }
            catch (err) {
                throw "Missing instance data for this selectbox"
            }
        }
        , _get: function (inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        }
    });
    $.fn.selectbox = function (options) {
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string" && options == "isDisabled") {
            return $.selectbox["_" + options + "Selectbox"].apply($.selectbox, [this[0]].concat(otherArgs))
        }
        if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
            return $.selectbox["_" + options + "Selectbox"].apply($.selectbox, [this[0]].concat(otherArgs))
        }
        return this.each(function () {
            typeof options == "string" ? $.selectbox["_" + options + "Selectbox"].apply($.selectbox, [this].concat(otherArgs)) : $.selectbox._attachSelectbox(this, options)
        })
    };
    $.selectbox = new Selectbox();
    $.selectbox.version = "0.2"
})(jQuery);
! function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof module && module.exports ? require("jquery") : jQuery)
}(function (a) {
    function b(b) {
        var c = {}
            , d = /^jQuery\d+$/;
        return a.each(b.attributes, function (a, b) {
            b.specified && !d.test(b.name) && (c[b.name] = b.value)
        }), c
    }

    function c(b, c) {
        var d = this
            , f = a(d);
        if (d.value == f.attr("placeholder") && f.hasClass(m.customClass))
            if (f.data("placeholder-password")) {
                if (f = f.hide().nextAll('input[type="password"]:first').show().attr("id", f.removeAttr("id").data("placeholder-id")), b === !0) return f[0].value = c;
                f.focus()
            }
            else d.value = "", f.removeClass(m.customClass), d == e() && d.select()
    }

    function d() {
        var d, e = this
            , f = a(e)
            , g = this.id;
        if ("" === e.value) {
            if ("password" === e.type) {
                if (!f.data("placeholder-textinput")) {
                    try {
                        d = f.clone().attr({
                            type: "text"
                        })
                    }
                    catch (h) {
                        d = a("<input>").attr(a.extend(b(this), {
                            type: "text"
                        }))
                    }
                    d.removeAttr("name").data({
                        "placeholder-password": f
                        , "placeholder-id": g
                    }).bind("focus.placeholder", c), f.data({
                        "placeholder-textinput": d
                        , "placeholder-id": g
                    }).before(d)
                }
                f = f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", g).show()
            }
            f.addClass(m.customClass), f[0].value = f.attr("placeholder")
        }
        else f.removeClass(m.customClass)
    }

    function e() {
        try {
            return document.activeElement
        }
        catch (a) {}
    }
    var f, g, h = "[object OperaMini]" == Object.prototype.toString.call(window.operamini)
        , i = "placeholder" in document.createElement("input") && !h
        , j = "placeholder" in document.createElement("textarea") && !h
        , k = a.valHooks
        , l = a.propHooks;
    if (i && j) g = a.fn.placeholder = function () {
        return this
    }, g.input = g.textarea = !0;
    else {
        var m = {};
        g = a.fn.placeholder = function (b) {
            var e = {
                customClass: "placeholder"
            };
            m = a.extend({}, e, b);
            var f = this;
            return f.filter((i ? "textarea" : ":input") + "[placeholder]").not("." + m.customClass).bind({
                "focus.placeholder": c
                , "blur.placeholder": d
            }).data("placeholder-enabled", !0).trigger("blur.placeholder"), f
        }, g.input = i, g.textarea = j, f = {
            get: function (b) {
                var c = a(b)
                    , d = c.data("placeholder-password");
                return d ? d[0].value : c.data("placeholder-enabled") && c.hasClass(m.customClass) ? "" : b.value
            }
            , set: function (b, f) {
                var g = a(b)
                    , h = g.data("placeholder-password");
                return h ? h[0].value = f : g.data("placeholder-enabled") ? ("" === f ? (b.value = f, b != e() && d.call(b)) : g.hasClass(m.customClass) ? c.call(b, !0, f) || (b.value = f) : b.value = f, g) : b.value = f
            }
        }, i || (k.input = f, l.value = f), j || (k.textarea = f, l.value = f), a(function () {
            a(document).delegate("form", "submit.placeholder", function () {
                var b = a("." + m.customClass, this).each(c);
                setTimeout(function () {
                    b.each(d)
                }, 10)
            })
        }), a(window).bind("beforeunload.placeholder", function () {
            a("." + m.customClass).each(function () {
                this.value = ""
            })
        })
    }
});
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 * http://imagesloaded.desandro.com/
 */
(function () {
    function e() {}

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function () {
            return this[e].apply(this, arguments)
        }
    }
    var i = e.prototype
        , r = this
        , o = r.EventEmitter;
    i.getListeners = function (e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        }
        else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function (e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function (e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function (e, n) {
        var i, r = this.getListenersAsObject(e)
            , o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
            listener: n
            , once: !1
        });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (e, t) {
        return this.addListener(e, {
            listener: t
            , once: !0
        })
    }, i.once = n("addOnceListener"), i.defineEvent = function (e) {
        return this.getListeners(e), this
    }, i.defineEvents = function (e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function (e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function (e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener
            , s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function (e) {
        var t, n = typeof e
            , i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s)
            if (s.hasOwnProperty(r))
                for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function (e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, e.noConflict = function () {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this)
    , function (e) {
        function t(t) {
            var n = e.event;
            return n.target = n.target || n.srcElement || t, n
        }
        var n = document.documentElement
            , i = function () {};
        n.addEventListener ? i = function (e, t, n) {
            e.addEventListener(t, n, !1)
        } : n.attachEvent && (i = function (e, n, i) {
            e[n + i] = i.handleEvent ? function () {
                var n = t(e);
                i.handleEvent.call(i, n)
            } : function () {
                var n = t(e);
                i.call(e, n)
            }, e.attachEvent("on" + n, e[n + i])
        });
        var r = function () {};
        n.removeEventListener ? r = function (e, t, n) {
            e.removeEventListener(t, n, !1)
        } : n.detachEvent && (r = function (e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            }
            catch (i) {
                e[t + n] = void 0
            }
        });
        var o = {
            bind: i
            , unbind: r
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
    }(this)
    , function (e, t) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
            return t(e, n, i)
        }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
    }(window, function (e, t, n) {
        function i(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function r(e) {
            return "[object Array]" === d.call(e)
        }

        function o(e) {
            var t = [];
            if (r(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function s(e, t, n) {
            if (!(this instanceof s)) return new s(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
            var r = this;
            setTimeout(function () {
                r.check()
            })
        }

        function f(e) {
            this.img = e
        }

        function c(e) {
            this.src = e, v[e] = this
        }
        var a = e.jQuery
            , u = e.console
            , h = u !== void 0
            , d = Object.prototype.toString;
        s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                var i = n.nodeType;
                if (i && (1 === i || 9 === i || 11 === i))
                    for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
                        var f = r[o];
                        this.addImage(f)
                    }
            }
        }, s.prototype.addImage = function (e) {
            var t = new f(e);
            this.images.push(t)
        }, s.prototype.check = function () {
            function e(e, r) {
                return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
            }
            var t = this
                , n = 0
                , i = this.images.length;
            if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
            for (var r = 0; i > r; r++) {
                var o = this.images[r];
                o.on("confirm", e), o.check()
            }
        }, s.prototype.progress = function (e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function () {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
            })
        }, s.prototype.complete = function () {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function () {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t)
                }
            })
        }, a && (a.fn.imagesLoaded = function (e, t) {
            var n = new s(this, e, t);
            return n.jqDeferred.promise(a(this))
        }), f.prototype = new t, f.prototype.check = function () {
            var e = v[this.img.src] || new c(this.img.src);
            if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
            if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
            var t = this;
            e.on("confirm", function (e, n) {
                return t.confirm(e.isLoaded, n), !0
            }), e.check()
        }, f.prototype.confirm = function (e, t) {
            this.isLoaded = e, this.emit("confirm", this, t)
        };
        var v = {};
        return c.prototype = new t, c.prototype.check = function () {
            if (!this.isChecked) {
                var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, c.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, c.prototype.onload = function (e) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(e)
        }, c.prototype.onerror = function (e) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
        }, c.prototype.confirm = function (e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, c.prototype.unbindProxyEvents = function (e) {
            n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
        }, s
    });
(function (b, c) {
    var $ = b.jQuery || b.Cowboy || (b.Cowboy = {})
        , a;
    $.throttle = a = function (e, f, j, i) {
        var h, d = 0;
        if (typeof f !== "boolean") {
            i = j;
            j = f;
            f = c
        }

        function g() {
            var o = this
                , m = +new Date() - d
                , n = arguments;

            function l() {
                d = +new Date();
                j.apply(o, n)
            }

            function k() {
                h = c
            }
            if (i && !h) {
                l()
            }
            h && clearTimeout(h);
            if (i === c && m > e) {
                l()
            }
            else {
                if (f !== true) {
                    h = setTimeout(i ? k : l, i === c ? e - m : e)
                }
            }
        }
        if ($.guid) {
            g.guid = j.guid = j.guid || $.guid++
        }
        return g
    };
    $.debounce = function (d, e, f) {
        return f === c ? a(d, e, false) : a(d, f, e !== false)
    }
})(this);
! function t(e, n, r) {
    function o(l, s) {
        if (!n[l]) {
            if (!e[l]) {
                var a = "function" == typeof require && require;
                if (!s && a) return a(l, !0);
                if (i) return i(l, !0);
                var c = new Error("Cannot find module '" + l + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[l] = {
                exports: {}
            };
            e[l][0].call(u.exports, function (t) {
                var n = e[l][1][t];
                return o(n ? n : t)
            }, u, u.exports, t, e, n, r)
        }
        return n[l].exports
    }
    for (var i = "function" == typeof require && require, l = 0; l < r.length; l++) o(r[l]);
    return o
}({
    1: [function (t, e) {
        "use strict";

        function n(t) {
            t.fn.perfectScrollbar = function (e) {
                return this.each(function () {
                    if ("object" == typeof e || "undefined" == typeof e) {
                        var n = e;
                        o.get(this) || r.initialize(this, n)
                    }
                    else {
                        var i = e;
                        "update" === i ? r.update(this) : "destroy" === i && r.destroy(this)
                    }
                    return t(this)
                })
            }
        }
        var r = t("../main")
            , o = t("../plugin/instances");
        if ("function" == typeof define && define.amd) define(["jquery"], n);
        else {
            var i = window.jQuery ? window.jQuery : window.$;
            "undefined" != typeof i && n(i)
        }
        e.exports = n
    }, {
        "../main": 7
        , "../plugin/instances": 18
    }]
    , 2: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            var n = t.className.split(" ");
            n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
        }

        function o(t, e) {
            var n = t.className.split(" ")
                , r = n.indexOf(e);
            r >= 0 && n.splice(r, 1), t.className = n.join(" ")
        }
        n.add = function (t, e) {
            t.classList ? t.classList.add(e) : r(t, e)
        }, n.remove = function (t, e) {
            t.classList ? t.classList.remove(e) : o(t, e)
        }, n.list = function (t) {
            return t.classList ? t.classList : t.className.split(" ")
        }
    }, {}]
    , 3: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            return window.getComputedStyle(t)[e]
        }

        function o(t, e, n) {
            return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
        }

        function i(t, e) {
            for (var n in e) {
                var r = e[n];
                "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r
            }
            return t
        }
        n.e = function (t, e) {
            var n = document.createElement(t);
            return n.className = e, n
        }, n.appendTo = function (t, e) {
            return e.appendChild(t), t
        }, n.css = function (t, e, n) {
            return "object" == typeof e ? i(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n)
        }, n.matches = function (t, e) {
            return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
        }, n.remove = function (t) {
            "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
        }
    }, {}]
    , 4: [function (t, e) {
        "use strict";
        var n = function (t) {
            this.element = t, this.events = {}
        };
        n.prototype.bind = function (t, e) {
            "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
        }, n.prototype.unbind = function (t, e) {
            var n = "undefined" != typeof e;
            this.events[t] = this.events[t].filter(function (r) {
                return n && r !== e ? !0 : (this.element.removeEventListener(t, r, !1), !1)
            }, this)
        }, n.prototype.unbindAll = function () {
            for (var t in this.events) this.unbind(t)
        };
        var r = function () {
            this.eventElements = []
        };
        r.prototype.eventElement = function (t) {
            var e = this.eventElements.filter(function (e) {
                return e.element === t
            })[0];
            return "undefined" == typeof e && (e = new n(t), this.eventElements.push(e)), e
        }, r.prototype.bind = function (t, e, n) {
            this.eventElement(t).bind(e, n)
        }, r.prototype.unbind = function (t, e, n) {
            this.eventElement(t).unbind(e, n)
        }, r.prototype.unbindAll = function () {
            for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
        }, r.prototype.once = function (t, e, n) {
            var r = this.eventElement(t)
                , o = function (t) {
                    r.unbind(e, o), n(t)
                };
            r.bind(e, o)
        }, e.exports = r
    }, {}]
    , 5: [function (t, e) {
        "use strict";
        e.exports = function () {
            function t() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return function () {
                return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
            }
        }()
    }, {}]
    , 6: [function (t, e, n) {
        "use strict";
        var r = t("./class")
            , o = t("./dom");
        n.toInt = function (t) {
            return "string" == typeof t ? parseInt(t, 10) : ~~t
        }, n.clone = function (t) {
            if (null === t) return null;
            if ("object" == typeof t) {
                var e = {};
                for (var n in t) e[n] = this.clone(t[n]);
                return e
            }
            return t
        }, n.extend = function (t, e) {
            var n = this.clone(t);
            for (var r in e) n[r] = this.clone(e[r]);
            return n
        }, n.isEditable = function (t) {
            return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
        }, n.removePsClasses = function (t) {
            for (var e = r.list(t), n = 0; n < e.length; n++) {
                var o = e[n];
                0 === o.indexOf("ps-") && r.remove(t, o)
            }
        }, n.outerWidth = function (t) {
            return this.toInt(o.css(t, "width")) + this.toInt(o.css(t, "paddingLeft")) + this.toInt(o.css(t, "paddingRight")) + this.toInt(o.css(t, "borderLeftWidth")) + this.toInt(o.css(t, "borderRightWidth"))
        }, n.startScrolling = function (t, e) {
            r.add(t, "ps-in-scrolling"), "undefined" != typeof e ? r.add(t, "ps-" + e) : (r.add(t, "ps-x"), r.add(t, "ps-y"))
        }, n.stopScrolling = function (t, e) {
            r.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? r.remove(t, "ps-" + e) : (r.remove(t, "ps-x"), r.remove(t, "ps-y"))
        }, n.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style
            , supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch
            , supportsIePointer: null !== window.navigator.msMaxTouchPoints
        }
    }, {
        "./class": 2
        , "./dom": 3
    }]
    , 7: [function (t, e) {
        "use strict";
        var n = t("./plugin/destroy")
            , r = t("./plugin/initialize")
            , o = t("./plugin/update");
        e.exports = {
            initialize: r
            , update: o
            , destroy: n
        }
    }, {
        "./plugin/destroy": 9
        , "./plugin/initialize": 17
        , "./plugin/update": 20
    }]
    , 8: [function (t, e) {
        "use strict";
        e.exports = {
            wheelSpeed: 1
            , wheelPropagation: !1
            , swipePropagation: !0
            , minScrollbarLength: null
            , maxScrollbarLength: null
            , useBothWheelAxes: !1
            , useKeyboard: !0
            , suppressScrollX: !1
            , suppressScrollY: !1
            , scrollXMarginOffset: 0
            , scrollYMarginOffset: 0
        }
    }, {}]
    , 9: [function (t, e) {
        "use strict";
        var n = t("../lib/dom")
            , r = t("../lib/helper")
            , o = t("./instances");
        e.exports = function (t) {
            var e = o.get(t);
            e.event.unbindAll(), n.remove(e.scrollbarX), n.remove(e.scrollbarY), n.remove(e.scrollbarXRail), n.remove(e.scrollbarYRail), r.removePsClasses(t), o.remove(t)
        }
    }, {
        "../lib/dom": 3
        , "../lib/helper": 6
        , "./instances": 18
    }]
    , 10: [function (t, e) {
        "use strict";

        function n(t, e) {
            function n(t) {
                return t.getBoundingClientRect()
            }
            var o = window.Event.prototype.stopPropagation.bind;
            e.event.bind(e.scrollbarY, "click", o), e.event.bind(e.scrollbarYRail, "click", function (o) {
                var l = r.toInt(e.scrollbarYHeight / 2)
                    , s = o.pageY - n(e.scrollbarYRail).top - l
                    , a = e.containerHeight - e.scrollbarYHeight
                    , c = s / a;
                0 > c ? c = 0 : c > 1 && (c = 1), t.scrollTop = (e.contentHeight - e.containerHeight) * c, i(t)
            }), e.event.bind(e.scrollbarX, "click", o), e.event.bind(e.scrollbarXRail, "click", function (o) {
                var l = r.toInt(e.scrollbarXWidth / 2)
                    , s = o.pageX - n(e.scrollbarXRail).left - l;
                console.log(o.pageX, e.scrollbarXRail.offsetLeft);
                var a = e.containerWidth - e.scrollbarXWidth
                    , c = s / a;
                0 > c ? c = 0 : c > 1 && (c = 1), t.scrollLeft = (e.contentWidth - e.containerWidth) * c, i(t)
            })
        }
        var r = t("../../lib/helper")
            , o = t("../instances")
            , i = t("../update-geometry");
        e.exports = function (t) {
            var e = o.get(t);
            n(t, e)
        }
    }, {
        "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
    }]
    , 11: [function (t, e) {
        "use strict";

        function n(t, e) {
            function n(n) {
                var o = r + n
                    , l = e.containerWidth - e.scrollbarXWidth;
                e.scrollbarXLeft = 0 > o ? 0 : o > l ? l : o;
                var s = i.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.scrollbarXWidth));
                t.scrollLeft = s
            }
            var r = null
                , l = null
                , a = function (e) {
                    n(e.pageX - l), s(t), e.stopPropagation(), e.preventDefault()
                }
                , c = function () {
                    i.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", a)
                };
            e.event.bind(e.scrollbarX, "mousedown", function (n) {
                l = n.pageX, r = i.toInt(o.css(e.scrollbarX, "left")), i.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", a), e.event.once(e.ownerDocument, "mouseup", c), n.stopPropagation(), n.preventDefault()
            })
        }

        function r(t, e) {
            function n(n) {
                var o = r + n
                    , l = e.containerHeight - e.scrollbarYHeight;
                e.scrollbarYTop = 0 > o ? 0 : o > l ? l : o;
                var s = i.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.scrollbarYHeight));
                t.scrollTop = s
            }
            var r = null
                , l = null
                , a = function (e) {
                    n(e.pageY - l), s(t), e.stopPropagation(), e.preventDefault()
                }
                , c = function () {
                    i.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", a)
                };
            e.event.bind(e.scrollbarY, "mousedown", function (n) {
                l = n.pageY, r = i.toInt(o.css(e.scrollbarY, "top")), i.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", a), e.event.once(e.ownerDocument, "mouseup", c), n.stopPropagation(), n.preventDefault()
            })
        }
        var o = t("../../lib/dom")
            , i = t("../../lib/helper")
            , l = t("../instances")
            , s = t("../update-geometry");
        e.exports = function (t) {
            var e = l.get(t);
            n(t, e), r(t, e)
        }
    }, {
        "../../lib/dom": 3
        , "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
    }]
    , 12: [function (t, e) {
        "use strict";

        function n(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && 0 > r) return !e.settings.wheelPropagation
                }
                var i = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === i && 0 > n || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }
            var o = !1;
            e.event.bind(t, "mouseenter", function () {
                o = !0
            }), e.event.bind(t, "mouseleave", function () {
                o = !1
            });
            var l = !1;
            e.event.bind(e.ownerDocument, "keydown", function (s) {
                if ((!s.isDefaultPrevented || !s.isDefaultPrevented()) && o) {
                    var a = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                    if (a) {
                        for (; a.shadowRoot;) a = a.shadowRoot.activeElement;
                        if (r.isEditable(a)) return
                    }
                    var c = 0
                        , u = 0;
                    switch (s.which) {
                    case 37:
                        c = -30;
                        break;
                    case 38:
                        u = 30;
                        break;
                    case 39:
                        c = 30;
                        break;
                    case 40:
                        u = -30;
                        break;
                    case 33:
                        u = 90;
                        break;
                    case 32:
                    case 34:
                        u = -90;
                        break;
                    case 35:
                        u = s.ctrlKey ? -e.contentHeight : -e.containerHeight;
                        break;
                    case 36:
                        u = s.ctrlKey ? t.scrollTop : e.containerHeight;
                        break;
                    default:
                        return
                    }
                    t.scrollTop = t.scrollTop - u, t.scrollLeft = t.scrollLeft + c, i(t), l = n(c, u), l && s.preventDefault()
                }
            })
        }
        var r = t("../../lib/helper")
            , o = t("../instances")
            , i = t("../update-geometry");
        e.exports = function (t) {
            var e = o.get(t);
            n(t, e)
        }
    }, {
        "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
    }]
    , 13: [function (t, e) {
        "use strict";

        function n(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && 0 > r) return !e.settings.wheelPropagation
                }
                var i = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === i && 0 > n || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }

            function o(t) {
                var e = t.deltaX
                    , n = -1 * t.deltaY;
                return ("undefined" == typeof e || "undefined" == typeof n) && (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), [e, n]
            }

            function l(e, n) {
                var r = t.querySelector("textarea:hover");
                if (r) {
                    var o = r.scrollHeight - r.clientHeight;
                    if (o > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === o && 0 > n)) return !0;
                    var i = r.scrollLeft - r.clientWidth;
                    if (i > 0 && !(0 === r.scrollLeft && 0 > e || r.scrollLeft === i && e > 0)) return !0
                }
                return !1
            }

            function s(s) {
                if (r.env.isWebKit || !t.querySelector("select:focus")) {
                    var c = o(s)
                        , u = c[0]
                        , d = c[1];
                    l(u, d) || (a = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (t.scrollTop = d ? t.scrollTop - d * e.settings.wheelSpeed : t.scrollTop + u * e.settings.wheelSpeed, a = !0) : e.scrollbarXActive && !e.scrollbarYActive && (t.scrollLeft = u ? t.scrollLeft + u * e.settings.wheelSpeed : t.scrollLeft - d * e.settings.wheelSpeed, a = !0) : (t.scrollTop = t.scrollTop - d * e.settings.wheelSpeed, t.scrollLeft = t.scrollLeft + u * e.settings.wheelSpeed), i(t), a = a || n(u, d), a && (s.stopPropagation(), s.preventDefault()))
                }
            }
            var a = !1;
            "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", s) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", s)
        }
        var r = t("../../lib/helper")
            , o = t("../instances")
            , i = t("../update-geometry");
        e.exports = function (t) {
            var e = o.get(t);
            n(t, e)
        }
    }, {
        "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
    }]
    , 14: [function (t, e) {
        "use strict";

        function n(t, e) {
            e.event.bind(t, "scroll", function () {
                o(t)
            })
        }
        var r = t("../instances")
            , o = t("../update-geometry");
        e.exports = function (t) {
            var e = r.get(t);
            n(t, e)
        }
    }, {
        "../instances": 18
        , "../update-geometry": 19
    }]
    , 15: [function (t, e) {
        "use strict";

        function n(t, e) {
            function n() {
                var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
            }

            function l() {
                a || (a = setInterval(function () {
                    return o.get(t) ? (t.scrollTop = t.scrollTop + c.top, t.scrollLeft = t.scrollLeft + c.left, void i(t)) : void clearInterval(a)
                }, 50))
            }

            function s() {
                a && (clearInterval(a), a = null), r.stopScrolling(t)
            }
            var a = null
                , c = {
                    top: 0
                    , left: 0
                }
                , u = !1;
            e.event.bind(e.ownerDocument, "selectionchange", function () {
                t.contains(n()) ? u = !0 : (u = !1, s())
            }), e.event.bind(window, "mouseup", function () {
                u && (u = !1, s())
            }), e.event.bind(window, "mousemove", function (e) {
                if (u) {
                    var n = {
                            x: e.pageX
                            , y: e.pageY
                        }
                        , o = {
                            left: t.offsetLeft
                            , right: t.offsetLeft + t.offsetWidth
                            , top: t.offsetTop
                            , bottom: t.offsetTop + t.offsetHeight
                        };
                    n.x < o.left + 3 ? (c.left = -5, r.startScrolling(t, "x")) : n.x > o.right - 3 ? (c.left = 5, r.startScrolling(t, "x")) : c.left = 0, n.y < o.top + 3 ? (c.top = o.top + 3 - n.y < 5 ? -5 : -20, r.startScrolling(t, "y")) : n.y > o.bottom - 3 ? (c.top = n.y - o.bottom + 3 < 5 ? 5 : 20, r.startScrolling(t, "y")) : c.top = 0, 0 === c.top && 0 === c.left ? s() : l()
                }
            })
        }
        var r = t("../../lib/helper")
            , o = t("../instances")
            , i = t("../update-geometry");
        e.exports = function (t) {
            var e = o.get(t);
            n(t, e)
        }
    }, {
        "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
    }]
    , 16: [function (t, e) {
        "use strict";

        function n(t, e, n, i) {
            function l(n, r) {
                var o = t.scrollTop
                    , i = t.scrollLeft
                    , l = Math.abs(n)
                    , s = Math.abs(r);
                if (s > l) {
                    if (0 > r && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation
                }
                else if (l > s && (0 > n && i === e.contentWidth - e.containerWidth || n > 0 && 0 === i)) return !e.settings.swipePropagation;
                return !0
            }

            function s(e, n) {
                t.scrollTop = t.scrollTop - n, t.scrollLeft = t.scrollLeft - e, o(t)
            }

            function a() {
                w = !0
            }

            function c() {
                w = !1
            }

            function u(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }

            function d(t) {
                return t.targetTouches && 1 === t.targetTouches.length ? !0 : t.pointerType && "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE ? !0 : !1
            }

            function p(t) {
                if (d(t)) {
                    y = !0;
                    var e = u(t);
                    b.pageX = e.pageX, b.pageY = e.pageY, g = (new Date).getTime(), null !== m && clearInterval(m), t.stopPropagation()
                }
            }

            function f(t) {
                if (!w && y && d(t)) {
                    var e = u(t)
                        , n = {
                            pageX: e.pageX
                            , pageY: e.pageY
                        }
                        , r = n.pageX - b.pageX
                        , o = n.pageY - b.pageY;
                    s(r, o), b = n;
                    var i = (new Date).getTime()
                        , a = i - g;
                    a > 0 && (v.x = r / a, v.y = o / a, g = i), l(r, o) && (t.stopPropagation(), t.preventDefault())
                }
            }

            function h() {
                !w && y && (y = !1, clearInterval(m), m = setInterval(function () {
                    return r.get(t) ? Math.abs(v.x) < .01 && Math.abs(v.y) < .01 ? void clearInterval(m) : (s(30 * v.x, 30 * v.y), v.x *= .8, void(v.y *= .8)) : void clearInterval(m)
                }, 10))
            }
            var b = {}
                , g = 0
                , v = {}
                , m = null
                , w = !1
                , y = !1;
            n && (e.event.bind(window, "touchstart", a), e.event.bind(window, "touchend", c), e.event.bind(t, "touchstart", p), e.event.bind(t, "touchmove", f), e.event.bind(t, "touchend", h)), i && (window.PointerEvent ? (e.event.bind(window, "pointerdown", a), e.event.bind(window, "pointerup", c), e.event.bind(t, "pointerdown", p), e.event.bind(t, "pointermove", f), e.event.bind(t, "pointerup", h)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", a), e.event.bind(window, "MSPointerUp", c), e.event.bind(t, "MSPointerDown", p), e.event.bind(t, "MSPointerMove", f), e.event.bind(t, "MSPointerUp", h)))
        }
        var r = t("../instances")
            , o = t("../update-geometry");
        e.exports = function (t, e, o) {
            var i = r.get(t);
            n(t, i, e, o)
        }
    }, {
        "../instances": 18
        , "../update-geometry": 19
    }]
    , 17: [function (t, e) {
        "use strict";
        var n = t("../lib/class")
            , r = t("../lib/helper")
            , o = t("./instances")
            , i = t("./update-geometry")
            , l = t("./handler/click-rail")
            , s = t("./handler/drag-scrollbar")
            , a = t("./handler/keyboard")
            , c = t("./handler/mouse-wheel")
            , u = t("./handler/native-scroll")
            , d = t("./handler/selection")
            , p = t("./handler/touch");
        e.exports = function (t, e) {
            e = "object" == typeof e ? e : {}, n.add(t, "ps-container");
            var f = o.add(t);
            f.settings = r.extend(f.settings, e), l(t), s(t), c(t), u(t), d(t), (r.env.supportsTouch || r.env.supportsIePointer) && p(t, r.env.supportsTouch, r.env.supportsIePointer), f.settings.useKeyboard && a(t), i(t)
        }
    }, {
        "../lib/class": 2
        , "../lib/helper": 6
        , "./handler/click-rail": 10
        , "./handler/drag-scrollbar": 11
        , "./handler/keyboard": 12
        , "./handler/mouse-wheel": 13
        , "./handler/native-scroll": 14
        , "./handler/selection": 15
        , "./handler/touch": 16
        , "./instances": 18
        , "./update-geometry": 19
    }]
    , 18: [function (t, e, n) {
        "use strict";

        function r(t) {
            var e = this;
            e.settings = d.clone(a), e.containerWidth = null, e.containerHeight = null, e.contentWidth = null, e.contentHeight = null, e.isRtl = "rtl" === s.css(t, "direction"), e.event = new c, e.ownerDocument = t.ownerDocument || document, e.scrollbarXRail = s.appendTo(s.e("div", "ps-scrollbar-x-rail"), t), e.scrollbarX = s.appendTo(s.e("div", "ps-scrollbar-x"), e.scrollbarXRail), e.scrollbarXActive = null, e.scrollbarXWidth = null, e.scrollbarXLeft = null, e.scrollbarXBottom = d.toInt(s.css(e.scrollbarXRail, "bottom")), e.isScrollbarXUsingBottom = e.scrollbarXBottom === e.scrollbarXBottom, e.scrollbarXTop = e.isScrollbarXUsingBottom ? null : d.toInt(s.css(e.scrollbarXRail, "top")), e.railBorderXWidth = d.toInt(s.css(e.scrollbarXRail, "borderLeftWidth")) + d.toInt(s.css(e.scrollbarXRail, "borderRightWidth")), e.railXMarginWidth = d.toInt(s.css(e.scrollbarXRail, "marginLeft")) + d.toInt(s.css(e.scrollbarXRail, "marginRight")), e.railXWidth = null, e.scrollbarYRail = s.appendTo(s.e("div", "ps-scrollbar-y-rail"), t), e.scrollbarY = s.appendTo(s.e("div", "ps-scrollbar-y"), e.scrollbarYRail), e.scrollbarYActive = null, e.scrollbarYHeight = null, e.scrollbarYTop = null, e.scrollbarYRight = d.toInt(s.css(e.scrollbarYRail, "right")), e.isScrollbarYUsingRight = e.scrollbarYRight === e.scrollbarYRight, e.scrollbarYLeft = e.isScrollbarYUsingRight ? null : d.toInt(s.css(e.scrollbarYRail, "left")), e.scrollbarYOuterWidth = e.isRtl ? d.outerWidth(e.scrollbarY) : null, e.railBorderYWidth = d.toInt(s.css(e.scrollbarYRail, "borderTopWidth")) + d.toInt(s.css(e.scrollbarYRail, "borderBottomWidth")), e.railYMarginHeight = d.toInt(s.css(e.scrollbarYRail, "marginTop")) + d.toInt(s.css(e.scrollbarYRail, "marginBottom")), e.railYHeight = null
        }

        function o(t) {
            return "undefined" == typeof t.dataset ? t.getAttribute("data-ps-id") : t.dataset.psId
        }

        function i(t, e) {
            "undefined" == typeof t.dataset ? t.setAttribute("data-ps-id", e) : t.dataset.psId = e
        }

        function l(t) {
            "undefined" == typeof t.dataset ? t.removeAttribute("data-ps-id") : delete t.dataset.psId
        }
        var s = t("../lib/dom")
            , a = t("./default-setting")
            , c = t("../lib/event-manager")
            , u = t("../lib/guid")
            , d = t("../lib/helper")
            , p = {};
        n.add = function (t) {
            var e = u();
            return i(t, e), p[e] = new r(t), p[e]
        }, n.remove = function (t) {
            delete p[o(t)], l(t)
        }, n.get = function (t) {
            return p[o(t)]
        }
    }, {
        "../lib/dom": 3
        , "../lib/event-manager": 4
        , "../lib/guid": 5
        , "../lib/helper": 6
        , "./default-setting": 8
    }]
    , 19: [function (t, e) {
        "use strict";

        function n(t, e) {
            return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
        }

        function r(t, e) {
            var n = {
                width: e.railXWidth
            };
            n.left = e.isRtl ? t.scrollLeft + e.containerWidth - e.contentWidth : t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, i.css(e.scrollbarXRail, n);
            var r = {
                top: t.scrollTop
                , height: e.railYHeight
            };
            e.isScrollbarYUsingRight ? r.right = e.isRtl ? e.contentWidth - t.scrollLeft - e.scrollbarYRight - e.scrollbarYOuterWidth : e.scrollbarYRight - t.scrollLeft : r.left = e.isRtl ? t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : e.scrollbarYLeft + t.scrollLeft, i.css(e.scrollbarYRail, r), i.css(e.scrollbarX, {
                left: e.scrollbarXLeft
                , width: e.scrollbarXWidth - e.railBorderXWidth
            }), i.css(e.scrollbarY, {
                top: e.scrollbarYTop
                , height: e.scrollbarYHeight - e.railBorderYWidth
            })
        }
        var o = t("../lib/class")
            , i = t("../lib/dom")
            , l = t("../lib/helper")
            , s = t("./instances");
        e.exports = function (t) {
            var e = s.get(t);
            e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || i.appendTo(e.scrollbarXRail, t), t.contains(e.scrollbarYRail) || i.appendTo(e.scrollbarYRail, t), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.scrollbarXWidth = n(e, l.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = l.toInt(t.scrollLeft * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : (e.scrollbarXActive = !1, e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = 0), !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.scrollbarYHeight = n(e, l.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = l.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : (e.scrollbarYActive = !1, e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0), e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), r(t, e), o[e.scrollbarXActive ? "add" : "remove"](t, "ps-active-x"), o[e.scrollbarYActive ? "add" : "remove"](t, "ps-active-y")
        }
    }, {
        "../lib/class": 2
        , "../lib/dom": 3
        , "../lib/helper": 6
        , "./instances": 18
    }]
    , 20: [function (t, e) {
        "use strict";
        var n = t("../lib/dom")
            , r = t("./instances")
            , o = t("./update-geometry");
        e.exports = function (t) {
            var e = r.get(t);
            n.css(e.scrollbarXRail, "display", "none"), n.css(e.scrollbarYRail, "display", "none"), o(t), n.css(e.scrollbarXRail, "display", "block"), n.css(e.scrollbarYRail, "display", "block")
        }
    }, {
        "../lib/dom": 3
        , "./instances": 18
        , "./update-geometry": 19
    }]
}, {}, [1]);
! function t(e, n, r) {
    function o(l, a) {
        if (!n[l]) {
            if (!e[l]) {
                var s = "function" == typeof require && require;
                if (!a && s) return s(l, !0);
                if (i) return i(l, !0);
                var c = new Error("Cannot find module '" + l + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[l] = {
                exports: {}
            };
            e[l][0].call(u.exports, function (t) {
                var n = e[l][1][t];
                return o(n ? n : t)
            }, u, u.exports, t, e, n, r)
        }
        return n[l].exports
    }
    for (var i = "function" == typeof require && require, l = 0; l < r.length; l++) o(r[l]);
    return o
}({
    1: [function (t, e, n) {
        "use strict";

        function r(t) {
            t.fn.perfectScrollbar = function (t) {
                return this.each(function () {
                    if ("object" == typeof t || "undefined" == typeof t) {
                        var e = t;
                        i.get(this) || o.initialize(this, e)
                    }
                    else {
                        var n = t;
                        "update" === n ? o.update(this) : "destroy" === n && o.destroy(this)
                    }
                })
            }
        }
        var o = t("../main")
            , i = t("../plugin/instances");
        if ("function" == typeof define && define.amd) define(["jquery"], r);
        else {
            var l = window.jQuery ? window.jQuery : window.$;
            "undefined" != typeof l && r(l)
        }
        e.exports = r
    }, {
        "../main": 7
        , "../plugin/instances": 18
    }]
    , 2: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            var n = t.className.split(" ");
            n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
        }

        function o(t, e) {
            var n = t.className.split(" ")
                , r = n.indexOf(e);
            r >= 0 && n.splice(r, 1), t.className = n.join(" ")
        }
        n.add = function (t, e) {
            t.classList ? t.classList.add(e) : r(t, e)
        }, n.remove = function (t, e) {
            t.classList ? t.classList.remove(e) : o(t, e)
        }, n.list = function (t) {
            return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ")
        }
    }, {}]
    , 3: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            return window.getComputedStyle(t)[e]
        }

        function o(t, e, n) {
            return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
        }

        function i(t, e) {
            for (var n in e) {
                var r = e[n];
                "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r
            }
            return t
        }
        var l = {};
        l.e = function (t, e) {
            var n = document.createElement(t);
            return n.className = e, n
        }, l.appendTo = function (t, e) {
            return e.appendChild(t), t
        }, l.css = function (t, e, n) {
            return "object" == typeof e ? i(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n)
        }, l.matches = function (t, e) {
            return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
        }, l.remove = function (t) {
            "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
        }, l.queryChildren = function (t, e) {
            return Array.prototype.filter.call(t.childNodes, function (t) {
                return l.matches(t, e)
            })
        }, e.exports = l
    }, {}]
    , 4: [function (t, e, n) {
        "use strict";
        var r = function (t) {
            this.element = t, this.events = {}
        };
        r.prototype.bind = function (t, e) {
            "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
        }, r.prototype.unbind = function (t, e) {
            var n = "undefined" != typeof e;
            this.events[t] = this.events[t].filter(function (r) {
                return !(!n || r === e) || (this.element.removeEventListener(t, r, !1), !1)
            }, this)
        }, r.prototype.unbindAll = function () {
            for (var t in this.events) this.unbind(t)
        };
        var o = function () {
            this.eventElements = []
        };
        o.prototype.eventElement = function (t) {
            var e = this.eventElements.filter(function (e) {
                return e.element === t
            })[0];
            return "undefined" == typeof e && (e = new r(t), this.eventElements.push(e)), e
        }, o.prototype.bind = function (t, e, n) {
            this.eventElement(t).bind(e, n)
        }, o.prototype.unbind = function (t, e, n) {
            this.eventElement(t).unbind(e, n)
        }, o.prototype.unbindAll = function () {
            for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
        }, o.prototype.once = function (t, e, n) {
            var r = this.eventElement(t)
                , o = function (t) {
                    r.unbind(e, o), n(t)
                };
            r.bind(e, o)
        }, e.exports = o
    }, {}]
    , 5: [function (t, e, n) {
        "use strict";
        e.exports = function () {
            function t() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return function () {
                return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
            }
        }()
    }, {}]
    , 6: [function (t, e, n) {
        "use strict";
        var r = t("./class")
            , o = t("./dom")
            , i = n.toInt = function (t) {
                return parseInt(t, 10) || 0
            }
            , l = n.clone = function (t) {
                if (null === t) return null;
                if (t.constructor === Array) return t.map(l);
                if ("object" == typeof t) {
                    var e = {};
                    for (var n in t) e[n] = l(t[n]);
                    return e
                }
                return t
            };
        n.extend = function (t, e) {
            var n = l(t);
            for (var r in e) n[r] = l(e[r]);
            return n
        }, n.isEditable = function (t) {
            return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
        }, n.removePsClasses = function (t) {
            for (var e = r.list(t), n = 0; n < e.length; n++) {
                var o = e[n];
                0 === o.indexOf("ps-") && r.remove(t, o)
            }
        }, n.outerWidth = function (t) {
            return i(o.css(t, "width")) + i(o.css(t, "paddingLeft")) + i(o.css(t, "paddingRight")) + i(o.css(t, "borderLeftWidth")) + i(o.css(t, "borderRightWidth"))
        }, n.startScrolling = function (t, e) {
            r.add(t, "ps-in-scrolling"), "undefined" != typeof e ? r.add(t, "ps-" + e) : (r.add(t, "ps-x"), r.add(t, "ps-y"))
        }, n.stopScrolling = function (t, e) {
            r.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? r.remove(t, "ps-" + e) : (r.remove(t, "ps-x"), r.remove(t, "ps-y"))
        }, n.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style
            , supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch
            , supportsIePointer: null !== window.navigator.msMaxTouchPoints
        }
    }, {
        "./class": 2
        , "./dom": 3
    }]
    , 7: [function (t, e, n) {
        "use strict";
        var r = t("./plugin/destroy")
            , o = t("./plugin/initialize")
            , i = t("./plugin/update");
        e.exports = {
            initialize: o
            , update: i
            , destroy: r
        }
    }, {
        "./plugin/destroy": 9
        , "./plugin/initialize": 17
        , "./plugin/update": 21
    }]
    , 8: [function (t, e, n) {
        "use strict";
        e.exports = {
            handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"]
            , maxScrollbarLength: null
            , minScrollbarLength: null
            , scrollXMarginOffset: 0
            , scrollYMarginOffset: 0
            , stopPropagationOnClick: !0
            , suppressScrollX: !1
            , suppressScrollY: !1
            , swipePropagation: !0
            , useBothWheelAxes: !1
            , wheelPropagation: !1
            , wheelSpeed: 1
            , theme: "default"
        }
    }, {}]
    , 9: [function (t, e, n) {
        "use strict";
        var r = t("../lib/helper")
            , o = t("../lib/dom")
            , i = t("./instances");
        e.exports = function (t) {
            var e = i.get(t);
            e && (e.event.unbindAll(), o.remove(e.scrollbarX), o.remove(e.scrollbarY), o.remove(e.scrollbarXRail), o.remove(e.scrollbarYRail), r.removePsClasses(t), i.remove(t))
        }
    }, {
        "../lib/dom": 3
        , "../lib/helper": 6
        , "./instances": 18
    }]
    , 10: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(t) {
                return t.getBoundingClientRect()
            }
            var r = function (t) {
                t.stopPropagation()
            };
            e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarY, "click", r), e.event.bind(e.scrollbarYRail, "click", function (r) {
                var i = o.toInt(e.scrollbarYHeight / 2)
                    , s = e.railYRatio * (r.pageY - window.pageYOffset - n(e.scrollbarYRail).top - i)
                    , c = e.railYRatio * (e.railYHeight - e.scrollbarYHeight)
                    , u = s / c;
                u < 0 ? u = 0 : u > 1 && (u = 1), a(t, "top", (e.contentHeight - e.containerHeight) * u), l(t), r.stopPropagation()
            }), e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarX, "click", r), e.event.bind(e.scrollbarXRail, "click", function (r) {
                var i = o.toInt(e.scrollbarXWidth / 2)
                    , s = e.railXRatio * (r.pageX - window.pageXOffset - n(e.scrollbarXRail).left - i)
                    , c = e.railXRatio * (e.railXWidth - e.scrollbarXWidth)
                    , u = s / c;
                u < 0 ? u = 0 : u > 1 && (u = 1), a(t, "left", (e.contentWidth - e.containerWidth) * u - e.negativeScrollAdjustment), l(t), r.stopPropagation()
            })
        }
        var o = t("../../lib/helper")
            , i = t("../instances")
            , l = t("../update-geometry")
            , a = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {
        "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
        , "../update-scroll": 20
    }]
    , 11: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n) {
                var o = r + n * e.railXRatio
                    , l = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                o < 0 ? e.scrollbarXLeft = 0 : o > l ? e.scrollbarXLeft = l : e.scrollbarXLeft = o;
                var a = i.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                c(t, "left", a)
            }
            var r = null
                , o = null
                , a = function (e) {
                    n(e.pageX - o), s(t), e.stopPropagation(), e.preventDefault()
                }
                , u = function () {
                    i.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", a)
                };
            e.event.bind(e.scrollbarX, "mousedown", function (n) {
                o = n.pageX, r = i.toInt(l.css(e.scrollbarX, "left")) * e.railXRatio, i.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", a), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }

        function o(t, e) {
            function n(n) {
                var o = r + n * e.railYRatio
                    , l = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                o < 0 ? e.scrollbarYTop = 0 : o > l ? e.scrollbarYTop = l : e.scrollbarYTop = o;
                var a = i.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                c(t, "top", a)
            }
            var r = null
                , o = null
                , a = function (e) {
                    n(e.pageY - o), s(t), e.stopPropagation(), e.preventDefault()
                }
                , u = function () {
                    i.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", a)
                };
            e.event.bind(e.scrollbarY, "mousedown", function (n) {
                o = n.pageY, r = i.toInt(l.css(e.scrollbarY, "top")) * e.railYRatio, i.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", a), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }
        var i = t("../../lib/helper")
            , l = t("../../lib/dom")
            , a = t("../instances")
            , s = t("../update-geometry")
            , c = t("../update-scroll");
        e.exports = function (t) {
            var e = a.get(t);
            r(t, e), o(t, e)
        }
    }, {
        "../../lib/dom": 3
        , "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
        , "../update-scroll": 20
    }]
    , 12: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                }
                var i = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === i && n < 0 || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }
            var r = !1;
            e.event.bind(t, "mouseenter", function () {
                r = !0
            }), e.event.bind(t, "mouseleave", function () {
                r = !1
            });
            var l = !1;
            e.event.bind(e.ownerDocument, "keydown", function (c) {
                if (!(c.isDefaultPrevented && c.isDefaultPrevented() || c.defaultPrevented)) {
                    var u = i.matches(e.scrollbarX, ":focus") || i.matches(e.scrollbarY, ":focus");
                    if (r || u) {
                        var d = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                        if (d) {
                            if ("IFRAME" === d.tagName) d = d.contentDocument.activeElement;
                            else
                                for (; d.shadowRoot;) d = d.shadowRoot.activeElement;
                            if (o.isEditable(d)) return
                        }
                        var p = 0
                            , f = 0;
                        switch (c.which) {
                        case 37:
                            p = -30;
                            break;
                        case 38:
                            f = 30;
                            break;
                        case 39:
                            p = 30;
                            break;
                        case 40:
                            f = -30;
                            break;
                        case 33:
                            f = 90;
                            break;
                        case 32:
                            f = c.shiftKey ? 90 : -90;
                            break;
                        case 34:
                            f = -90;
                            break;
                        case 35:
                            f = c.ctrlKey ? -e.contentHeight : -e.containerHeight;
                            break;
                        case 36:
                            f = c.ctrlKey ? t.scrollTop : e.containerHeight;
                            break;
                        default:
                            return
                        }
                        s(t, "top", t.scrollTop - f), s(t, "left", t.scrollLeft + p), a(t), l = n(p, f), l && c.preventDefault()
                    }
                }
            })
        }
        var o = t("../../lib/helper")
            , i = t("../../lib/dom")
            , l = t("../instances")
            , a = t("../update-geometry")
            , s = t("../update-scroll");
        e.exports = function (t) {
            var e = l.get(t);
            r(t, e)
        }
    }, {
        "../../lib/dom": 3
        , "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
        , "../update-scroll": 20
    }]
    , 13: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                }
                var i = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === i && n < 0 || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }

            function r(t) {
                var e = t.deltaX
                    , n = -1 * t.deltaY;
                return "undefined" != typeof e && "undefined" != typeof n || (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), [e, n]
            }

            function o(e, n) {
                var r = t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                if (r) {
                    if ("TEXTAREA" !== r.tagName && !window.getComputedStyle(r).overflow.match(/(scroll|auto)/)) return !1;
                    var o = r.scrollHeight - r.clientHeight;
                    if (o > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === o && n < 0)) return !0;
                    var i = r.scrollLeft - r.clientWidth;
                    if (i > 0 && !(0 === r.scrollLeft && e < 0 || r.scrollLeft === i && e > 0)) return !0
                }
                return !1
            }

            function a(a) {
                var c = r(a)
                    , u = c[0]
                    , d = c[1];
                o(u, d) || (s = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (d ? l(t, "top", t.scrollTop - d * e.settings.wheelSpeed) : l(t, "top", t.scrollTop + u * e.settings.wheelSpeed), s = !0) : e.scrollbarXActive && !e.scrollbarYActive && (u ? l(t, "left", t.scrollLeft + u * e.settings.wheelSpeed) : l(t, "left", t.scrollLeft - d * e.settings.wheelSpeed), s = !0) : (l(t, "top", t.scrollTop - d * e.settings.wheelSpeed), l(t, "left", t.scrollLeft + u * e.settings.wheelSpeed)), i(t), s = s || n(u, d), s && (a.stopPropagation(), a.preventDefault()))
            }
            var s = !1;
            "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", a) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", a)
        }
        var o = t("../instances")
            , i = t("../update-geometry")
            , l = t("../update-scroll");
        e.exports = function (t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 18
        , "../update-geometry": 19
        , "../update-scroll": 20
    }]
    , 14: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            e.event.bind(t, "scroll", function () {
                i(t)
            })
        }
        var o = t("../instances")
            , i = t("../update-geometry");
        e.exports = function (t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 18
        , "../update-geometry": 19
    }]
    , 15: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n() {
                var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
            }

            function r() {
                c || (c = setInterval(function () {
                    return i.get(t) ? (a(t, "top", t.scrollTop + u.top), a(t, "left", t.scrollLeft + u.left), void l(t)) : void clearInterval(c)
                }, 50))
            }

            function s() {
                c && (clearInterval(c), c = null), o.stopScrolling(t)
            }
            var c = null
                , u = {
                    top: 0
                    , left: 0
                }
                , d = !1;
            e.event.bind(e.ownerDocument, "selectionchange", function () {
                t.contains(n()) ? d = !0 : (d = !1, s())
            }), e.event.bind(window, "mouseup", function () {
                d && (d = !1, s())
            }), e.event.bind(window, "mousemove", function (e) {
                if (d) {
                    var n = {
                            x: e.pageX
                            , y: e.pageY
                        }
                        , i = {
                            left: t.offsetLeft
                            , right: t.offsetLeft + t.offsetWidth
                            , top: t.offsetTop
                            , bottom: t.offsetTop + t.offsetHeight
                        };
                    n.x < i.left + 3 ? (u.left = -5, o.startScrolling(t, "x")) : n.x > i.right - 3 ? (u.left = 5, o.startScrolling(t, "x")) : u.left = 0, n.y < i.top + 3 ? (i.top + 3 - n.y < 5 ? u.top = -5 : u.top = -20, o.startScrolling(t, "y")) : n.y > i.bottom - 3 ? (n.y - i.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? s() : r()
                }
            })
        }
        var o = t("../../lib/helper")
            , i = t("../instances")
            , l = t("../update-geometry")
            , a = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {
        "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
        , "../update-scroll": 20
    }]
    , 16: [function (t, e, n) {
        "use strict";

        function r(t, e, n, r) {
            function o(n, r) {
                var o = t.scrollTop
                    , i = t.scrollLeft
                    , l = Math.abs(n)
                    , a = Math.abs(r);
                if (a > l) {
                    if (r < 0 && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation
                }
                else if (l > a && (n < 0 && i === e.contentWidth - e.containerWidth || n > 0 && 0 === i)) return !e.settings.swipePropagation;
                return !0
            }

            function s(e, n) {
                a(t, "top", t.scrollTop - n), a(t, "left", t.scrollLeft - e), l(t)
            }

            function c() {
                Y = !0
            }

            function u() {
                Y = !1
            }

            function d(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }

            function p(t) {
                return !(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE)
            }

            function f(t) {
                if (p(t)) {
                    w = !0;
                    var e = d(t);
                    v.pageX = e.pageX, v.pageY = e.pageY, g = (new Date).getTime(), null !== y && clearInterval(y), t.stopPropagation()
                }
            }

            function h(t) {
                if (!w && e.settings.swipePropagation && f(t), !Y && w && p(t)) {
                    var n = d(t)
                        , r = {
                            pageX: n.pageX
                            , pageY: n.pageY
                        }
                        , i = r.pageX - v.pageX
                        , l = r.pageY - v.pageY;
                    s(i, l), v = r;
                    var a = (new Date).getTime()
                        , c = a - g;
                    c > 0 && (m.x = i / c, m.y = l / c, g = a), o(i, l) && (t.stopPropagation(), t.preventDefault())
                }
            }

            function b() {
                !Y && w && (w = !1, clearInterval(y), y = setInterval(function () {
                    return i.get(t) ? Math.abs(m.x) < .01 && Math.abs(m.y) < .01 ? void clearInterval(y) : (s(30 * m.x, 30 * m.y), m.x *= .8, void(m.y *= .8)) : void clearInterval(y)
                }, 10))
            }
            var v = {}
                , g = 0
                , m = {}
                , y = null
                , Y = !1
                , w = !1;
            n && (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), e.event.bind(t, "touchstart", f), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", b)), r && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", f), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", b)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", f), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", b)))
        }
        var o = t("../../lib/helper")
            , i = t("../instances")
            , l = t("../update-geometry")
            , a = t("../update-scroll");
        e.exports = function (t) {
            if (o.env.supportsTouch || o.env.supportsIePointer) {
                var e = i.get(t);
                r(t, e, o.env.supportsTouch, o.env.supportsIePointer)
            }
        }
    }, {
        "../../lib/helper": 6
        , "../instances": 18
        , "../update-geometry": 19
        , "../update-scroll": 20
    }]
    , 17: [function (t, e, n) {
        "use strict";
        var r = t("../lib/helper")
            , o = t("../lib/class")
            , i = t("./instances")
            , l = t("./update-geometry")
            , a = {
                "click-rail": t("./handler/click-rail")
                , "drag-scrollbar": t("./handler/drag-scrollbar")
                , keyboard: t("./handler/keyboard")
                , wheel: t("./handler/mouse-wheel")
                , touch: t("./handler/touch")
                , selection: t("./handler/selection")
            }
            , s = t("./handler/native-scroll");
        e.exports = function (t, e) {
            e = "object" == typeof e ? e : {}, o.add(t, "ps-container");
            var n = i.add(t);
            n.settings = r.extend(n.settings, e), o.add(t, "ps-theme-" + n.settings.theme), n.settings.handlers.forEach(function (e) {
                a[e](t)
            }), s(t), l(t)
        }
    }, {
        "../lib/class": 2
        , "../lib/helper": 6
        , "./handler/click-rail": 10
        , "./handler/drag-scrollbar": 11
        , "./handler/keyboard": 12
        , "./handler/mouse-wheel": 13
        , "./handler/native-scroll": 14
        , "./handler/selection": 15
        , "./handler/touch": 16
        , "./instances": 18
        , "./update-geometry": 19
    }]
    , 18: [function (t, e, n) {
        "use strict";

        function r(t) {
            function e() {
                s.add(t, "ps-focus")
            }

            function n() {
                s.remove(t, "ps-focus")
            }
            var r = this;
            r.settings = a.clone(c), r.containerWidth = null, r.containerHeight = null, r.contentWidth = null, r.contentHeight = null, r.isRtl = "rtl" === u.css(t, "direction"), r.isNegativeScroll = function () {
                var e = t.scrollLeft
                    , n = null;
                return t.scrollLeft = -1, n = t.scrollLeft < 0, t.scrollLeft = e, n
            }(), r.negativeScrollAdjustment = r.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, r.event = new d, r.ownerDocument = t.ownerDocument || document, r.scrollbarXRail = u.appendTo(u.e("div", "ps-scrollbar-x-rail"), t), r.scrollbarX = u.appendTo(u.e("div", "ps-scrollbar-x"), r.scrollbarXRail), r.scrollbarX.setAttribute("tabindex", 0), r.event.bind(r.scrollbarX, "focus", e), r.event.bind(r.scrollbarX, "blur", n), r.scrollbarXActive = null, r.scrollbarXWidth = null, r.scrollbarXLeft = null, r.scrollbarXBottom = a.toInt(u.css(r.scrollbarXRail, "bottom")), r.isScrollbarXUsingBottom = r.scrollbarXBottom === r.scrollbarXBottom, r.scrollbarXTop = r.isScrollbarXUsingBottom ? null : a.toInt(u.css(r.scrollbarXRail, "top")), r.railBorderXWidth = a.toInt(u.css(r.scrollbarXRail, "borderLeftWidth")) + a.toInt(u.css(r.scrollbarXRail, "borderRightWidth")), u.css(r.scrollbarXRail, "display", "block"), r.railXMarginWidth = a.toInt(u.css(r.scrollbarXRail, "marginLeft")) + a.toInt(u.css(r.scrollbarXRail, "marginRight")), u.css(r.scrollbarXRail, "display", ""), r.railXWidth = null, r.railXRatio = null, r.scrollbarYRail = u.appendTo(u.e("div", "ps-scrollbar-y-rail"), t), r.scrollbarY = u.appendTo(u.e("div", "ps-scrollbar-y"), r.scrollbarYRail), r.scrollbarY.setAttribute("tabindex", 0), r.event.bind(r.scrollbarY, "focus", e), r.event.bind(r.scrollbarY, "blur", n), r.scrollbarYActive = null, r.scrollbarYHeight = null, r.scrollbarYTop = null, r.scrollbarYRight = a.toInt(u.css(r.scrollbarYRail, "right")), r.isScrollbarYUsingRight = r.scrollbarYRight === r.scrollbarYRight, r.scrollbarYLeft = r.isScrollbarYUsingRight ? null : a.toInt(u.css(r.scrollbarYRail, "left")), r.scrollbarYOuterWidth = r.isRtl ? a.outerWidth(r.scrollbarY) : null, r.railBorderYWidth = a.toInt(u.css(r.scrollbarYRail, "borderTopWidth")) + a.toInt(u.css(r.scrollbarYRail, "borderBottomWidth")), u.css(r.scrollbarYRail, "display", "block"), r.railYMarginHeight = a.toInt(u.css(r.scrollbarYRail, "marginTop")) + a.toInt(u.css(r.scrollbarYRail, "marginBottom")), u.css(r.scrollbarYRail, "display", ""), r.railYHeight = null, r.railYRatio = null
        }

        function o(t) {
            return t.getAttribute("data-ps-id")
        }

        function i(t, e) {
            t.setAttribute("data-ps-id", e)
        }

        function l(t) {
            t.removeAttribute("data-ps-id")
        }
        var a = t("../lib/helper")
            , s = t("../lib/class")
            , c = t("./default-setting")
            , u = t("../lib/dom")
            , d = t("../lib/event-manager")
            , p = t("../lib/guid")
            , f = {};
        n.add = function (t) {
            var e = p();
            return i(t, e), f[e] = new r(t), f[e]
        }, n.remove = function (t) {
            delete f[o(t)], l(t)
        }, n.get = function (t) {
            return f[o(t)]
        }
    }, {
        "../lib/class": 2
        , "../lib/dom": 3
        , "../lib/event-manager": 4
        , "../lib/guid": 5
        , "../lib/helper": 6
        , "./default-setting": 8
    }]
    , 19: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
        }

        function o(t, e) {
            var n = {
                width: e.railXWidth
            };
            e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, a.css(e.scrollbarXRail, n);
            var r = {
                top: t.scrollTop
                , height: e.railYHeight
            };
            e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft, a.css(e.scrollbarYRail, r), a.css(e.scrollbarX, {
                left: e.scrollbarXLeft
                , width: e.scrollbarXWidth - e.railBorderXWidth
            }), a.css(e.scrollbarY, {
                top: e.scrollbarYTop
                , height: e.scrollbarYHeight - e.railBorderYWidth
            })
        }
        var i = t("../lib/helper")
            , l = t("../lib/class")
            , a = t("../lib/dom")
            , s = t("./instances")
            , c = t("./update-scroll");
        e.exports = function (t) {
            var e = s.get(t);
            e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
            var n;
            t.contains(e.scrollbarXRail) || (n = a.queryChildren(t, ".ps-scrollbar-x-rail"), n.length > 0 && n.forEach(function (t) {
                a.remove(t)
            }), a.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (n = a.queryChildren(t, ".ps-scrollbar-y-rail"), n.length > 0 && n.forEach(function (t) {
                a.remove(t)
            }), a.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = r(e, i.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = i.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = r(e, i.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = i.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), o(t, e), e.scrollbarXActive ? l.add(t, "ps-active-x") : (l.remove(t, "ps-active-x"), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, c(t, "left", 0)), e.scrollbarYActive ? l.add(t, "ps-active-y") : (l.remove(t, "ps-active-y"), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, c(t, "top", 0))
        }
    }, {
        "../lib/class": 2
        , "../lib/dom": 3
        , "../lib/helper": 6
        , "./instances": 18
        , "./update-scroll": 20
    }]
    , 20: [function (t, e, n) {
        "use strict";
        var r, o, i = t("./instances")
            , l = document.createEvent("Event")
            , a = document.createEvent("Event")
            , s = document.createEvent("Event")
            , c = document.createEvent("Event")
            , u = document.createEvent("Event")
            , d = document.createEvent("Event")
            , p = document.createEvent("Event")
            , f = document.createEvent("Event")
            , h = document.createEvent("Event")
            , b = document.createEvent("Event");
        l.initEvent("ps-scroll-up", !0, !0), a.initEvent("ps-scroll-down", !0, !0), s.initEvent("ps-scroll-left", !0, !0), c.initEvent("ps-scroll-right", !0, !0), u.initEvent("ps-scroll-y", !0, !0), d.initEvent("ps-scroll-x", !0, !0), p.initEvent("ps-x-reach-start", !0, !0), f.initEvent("ps-x-reach-end", !0, !0), h.initEvent("ps-y-reach-start", !0, !0), b.initEvent("ps-y-reach-end", !0, !0), e.exports = function (t, e, n) {
            if ("undefined" == typeof t) throw "You must provide an element to the update-scroll function";
            if ("undefined" == typeof e) throw "You must provide an axis to the update-scroll function";
            if ("undefined" == typeof n) throw "You must provide a value to the update-scroll function";
            "top" === e && n <= 0 && (t.scrollTop = n = 0, t.dispatchEvent(h)), "left" === e && n <= 0 && (t.scrollLeft = n = 0, t.dispatchEvent(p));
            var v = i.get(t);
            "top" === e && n >= v.contentHeight - v.containerHeight && (n = v.contentHeight - v.containerHeight, n - t.scrollTop <= 1 ? n = t.scrollTop : t.scrollTop = n, t.dispatchEvent(b)), "left" === e && n >= v.contentWidth - v.containerWidth && (n = v.contentWidth - v.containerWidth, n - t.scrollLeft <= 1 ? n = t.scrollLeft : t.scrollLeft = n, t.dispatchEvent(f)), r || (r = t.scrollTop), o || (o = t.scrollLeft), "top" === e && n < r && t.dispatchEvent(l), "top" === e && n > r && t.dispatchEvent(a), "left" === e && n < o && t.dispatchEvent(s), "left" === e && n > o && t.dispatchEvent(c), "top" === e && (t.scrollTop = r = n, t.dispatchEvent(u)), "left" === e && (t.scrollLeft = o = n, t.dispatchEvent(d))
        }
    }, {
        "./instances": 18
    }]
    , 21: [function (t, e, n) {
        "use strict";
        var r = t("../lib/helper")
            , o = t("../lib/dom")
            , i = t("./instances")
            , l = t("./update-geometry")
            , a = t("./update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, o.css(e.scrollbarXRail, "display", "block"), o.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = r.toInt(o.css(e.scrollbarXRail, "marginLeft")) + r.toInt(o.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = r.toInt(o.css(e.scrollbarYRail, "marginTop")) + r.toInt(o.css(e.scrollbarYRail, "marginBottom")), o.css(e.scrollbarXRail, "display", "none"), o.css(e.scrollbarYRail, "display", "none"), l(t), a(t, "top", t.scrollTop), a(t, "left", t.scrollLeft), o.css(e.scrollbarXRail, "display", ""), o.css(e.scrollbarYRail, "display", ""))
        }
    }, {
        "../lib/dom": 3
        , "../lib/helper": 6
        , "./instances": 18
        , "./update-geometry": 19
        , "./update-scroll": 20
    }]
}, {}, [1]);
! function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    "use strict";
    var b = window.Slick || {};
    b = function () {
        function c(c, d) {
            var f, e = this;
            e.defaults = {
                accessibility: !0
                , adaptiveHeight: !1
                , appendArrows: a(c)
                , appendDots: a(c)
                , arrows: !0
                , asNavFor: null
                , prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>'
                , nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>'
                , autoplay: !1
                , autoplaySpeed: 3e3
                , centerMode: !1
                , centerPadding: "50px"
                , cssEase: "ease"
                , customPaging: function (a, b) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (b + 1) + "</button>"
                }
                , dots: !1
                , dotsClass: "slick-dots"
                , draggable: !0
                , easing: "linear"
                , edgeFriction: .35
                , fade: !1
                , focusOnSelect: !1
                , infinite: !0
                , initialSlide: 0
                , lazyLoad: "ondemand"
                , mobileFirst: !1
                , pauseOnHover: !0
                , pauseOnDotsHover: !1
                , respondTo: "window"
                , responsive: null
                , rows: 1
                , rtl: !1
                , slide: ""
                , slidesPerRow: 1
                , slidesToShow: 1
                , slidesToScroll: 1
                , speed: 500
                , swipe: !0
                , swipeToSlide: !1
                , touchMove: !0
                , touchThreshold: 5
                , useCSS: !0
                , variableWidth: !1
                , vertical: !1
                , verticalSwiping: !1
                , waitForAnimate: !0
                , zIndex: 1e3
            }, e.initials = {
                animating: !1
                , dragging: !1
                , autoPlayTimer: null
                , currentDirection: 0
                , currentLeft: null
                , currentSlide: 0
                , direction: 1
                , $dots: null
                , listWidth: null
                , listHeight: null
                , loadIndex: 0
                , $nextArrow: null
                , $prevArrow: null
                , slideCount: null
                , slideWidth: null
                , $slideTrack: null
                , $slides: null
                , sliding: !1
                , slideOffset: 0
                , swipeLeft: null
                , $list: null
                , touchObject: {}
                , transformsEnabled: !1
                , unslicked: !1
            }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.hidden = "hidden", e.paused = !1, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, f, d), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0), e.checkResponsive(!0)
        }
        var b = 0;
        return c
    }(), b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null;
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b)
        }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function () {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({
                height: b
            }, a.options.speed)
        }
    }, b.prototype.animateSlide = function (b, c) {
        var d = {}
            , e = this;
        e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed
            , easing: e.options.easing
            , step: function (a) {
                a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            }
            , complete: function () {
                c && c.call()
            }
        })) : (e.applyTransition(), b = Math.ceil(b), d[e.animType] = e.options.vertical === !1 ? "translate3d(" + b + "px, 0px, 0px)" : "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.asNavFor = function (b) {
        var c = this
            , d = c.options.asNavFor;
        d && null !== d && (d = a(d).not(c.$slider)), null !== d && "object" == typeof d && d.each(function () {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }, b.prototype.applyTransition = function (a) {
        var b = this
            , c = {};
        c[b.transitionType] = b.options.fade === !1 ? b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function () {
        var a = this;
        a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (0 === a.currentSlide - 1 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
    }, b.prototype.buildArrows = function () {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true"
            , tabindex: "-1"
        }))
    }, b.prototype.buildDots = function () {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (d = '<ul class="' + b.options.dotsClass + '">', c = 0; c <= b.getDotCount(); c += 1) d += "<li>" + b.options.customPaging.call(this, b, c) + "</li>";
            d += "</ul>", b.$dots = a(d).appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, b.prototype.buildOut = function () {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }), b.$slidesCache = b.$slides, b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function () {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.html(e), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%"
                , display: "inline-block"
            })
        }
    }, b.prototype.checkResponsive = function (b, c) {
        var e, f, g, d = this
            , h = !1
            , i = d.$slider.width()
            , j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
            f = null;
            for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }, b.prototype.changeSlide = function (b, c) {
        var f, g, h, d = this
            , e = a(b.target);
        switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = 0 !== d.slideCount % d.options.slidesToScroll, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
        case "previous":
            g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
            break;
        case "next":
            g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
            break;
        case "index":
            var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
            d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
            break;
        default:
            return
        }
    }, b.prototype.checkNavigable = function (a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
        else
            for (var e in c) {
                if (a < c[e]) {
                    a = d;
                    break
                }
                d = c[e]
            }
        return a
    }, b.prototype.cleanUpEvents = function () {
        var b = this;
        b.options.dots && null !== b.$dots && (a("li", b.$dots).off("click.slick", b.changeSlide), b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).off("mouseenter.slick", a.proxy(b.setPaused, b, !0)).off("mouseleave.slick", a.proxy(b.setPaused, b, !1))), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.$list.off("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpRows = function () {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.html(b))
    }, b.prototype.clickHandler = function (a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function (b) {
        var c = this;
        c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.options.arrows === !0 && (c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove())), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            a(this).attr("style", a(this).data("originalStyling"))
        }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function (a) {
        var b = this
            , c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function (a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex
        }), c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1
            , zIndex: c.options.zIndex
        }), b && setTimeout(function () {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.fadeSlideOut = function (a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 0
            , zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
            opacity: 0
            , zIndex: b.options.zIndex - 2
        }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
        var b = this;
        null !== a && (b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
        var a = this;
        return a.currentSlide
    }, b.prototype.getDotCount = function () {
        var a = this
            , b = 0
            , c = 0
            , d = 0;
        if (a.options.infinite === !0)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToShow, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (a.options.centerMode === !0) d = a.slideCount;
        else
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToShow, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d - 1
    }, b.prototype.getLeft = function (a) {
        var c, d, f, b = this
            , e = 0;
        return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = -1 * b.slideWidth * b.options.slidesToShow, e = -1 * d * b.options.slidesToShow), 0 !== b.slideCount % b.options.slidesToScroll && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = -1 * (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth, e = -1 * (b.options.slidesToShow - (a - b.slideCount)) * d) : (b.slideOffset = -1 * b.slideCount % b.options.slidesToScroll * b.slideWidth, e = -1 * b.slideCount % b.options.slidesToScroll * d))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? -1 * a * b.slideWidth + b.slideOffset : -1 * a * d + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
    }, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
        var b = this;
        return b.options[a]
    }, b.prototype.getNavigableIndexes = function () {
        var e, a = this
            , b = 0
            , c = 0
            , d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }, b.prototype.getSlick = function () {
        return this
    }, b.prototype.getSlideCount = function () {
        var c, d, e, b = this;
        return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
            return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
        }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
        var c = this;
        c.changeSlide({
            data: {
                message: "index"
                , index: parseInt(a)
            }
        }, b)
    }, b.prototype.init = function (b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA()
    }, b.prototype.initArrowEvents = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {
            message: "previous"
        }, a.changeSlide), a.$nextArrow.on("click.slick", {
            message: "next"
        }, a.changeSlide))
    }, b.prototype.initDotEvents = function () {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.setPaused, b, !0)).on("mouseleave.slick", a.proxy(b.setPaused, b, !1))
    }, b.prototype.initializeEvents = function () {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.$list.on("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay()
    }, b.prototype.keyHandler = function (a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
            data: {
                message: "previous"
            }
        }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
            data: {
                message: "next"
            }
        }))
    }, b.prototype.lazyLoad = function () {
        function g(b) {
            a("img[data-lazy]", b).each(function () {
                var b = a(this)
                    , c = a(this).attr("data-lazy")
                    , d = document.createElement("img");
                d.onload = function () {
                    b.animate({
                        opacity: 0
                    }, 100, function () {
                        b.attr("src", c).animate({
                            opacity: 1
                        }, 200, function () {
                            b.removeAttr("data-lazy").removeClass("slick-loading")
                        })
                    })
                }, d.src = c
            })
        }
        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = e + b.options.slidesToShow, b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
    }, b.prototype.loadSlider = function () {
        var a = this;
        a.setPosition(), a.$slideTrack.css({
            opacity: 1
        }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function () {
        var a = this;
        a.changeSlide({
            data: {
                message: "next"
            }
        })
    }, b.prototype.orientationChange = function () {
        var a = this;
        a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function () {
        var a = this;
        a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function () {
        var a = this;
        a.paused = !1, a.autoPlay()
    }, b.prototype.postSlide = function (a) {
        var b = this;
        b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay(), b.options.accessibility === !0 && b.initADA()
    }, b.prototype.prev = b.prototype.slickPrev = function () {
        var a = this;
        a.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, b.prototype.preventDefault = function (a) {
        a.preventDefault()
    }, b.prototype.progressiveLazyLoad = function () {
        var c, d, b = this;
        c = a("img[data-lazy]", b.$slider).length, c > 0 && (d = a("img[data-lazy]", b.$slider).first(), d.attr("src", d.attr("data-lazy")).removeClass("slick-loading").load(function () {
            d.removeAttr("data-lazy"), b.progressiveLazyLoad(), b.options.adaptiveHeight === !0 && b.setPosition()
        }).error(function () {
            d.removeAttr("data-lazy"), b.progressiveLazyLoad()
        }))
    }, b.prototype.refresh = function (b) {
        var c = this
            , d = c.currentSlide;
        c.destroy(!0), a.extend(c, c.initials, {
            currentSlide: d
        }), c.init(), b || c.changeSlide({
            data: {
                message: "index"
                , index: d
            }
        }, !1)
    }, b.prototype.registerBreakpoints = function () {
        var c, d, e, b = this
            , f = b.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f)
                if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                    for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                    b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
                }
            b.breakpoints.sort(function (a, c) {
                return b.options.mobileFirst ? a - c : c - a
            })
        }
    }, b.prototype.reinit = function () {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses(0), b.setPosition(), b.$slider.trigger("reInit", [b]), b.options.autoplay === !0 && b.focusHandler()
    }, b.prototype.resize = function () {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
            b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
        }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, d.reinit(), void 0)
    }, b.prototype.setCSS = function (a) {
        var d, e, b = this
            , c = {};
        b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
    }, b.prototype.setDimensions = function () {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function () {
        var c, b = this;
        b.$slides.each(function (d, e) {
            c = -1 * b.slideWidth * d, b.options.rtl === !0 ? a(e).css({
                position: "relative"
                , right: c
                , top: 0
                , zIndex: b.options.zIndex - 2
                , opacity: 0
            }) : a(e).css({
                position: "relative"
                , left: c
                , top: 0
                , zIndex: b.options.zIndex - 2
                , opacity: 0
            })
        }), b.$slides.eq(b.currentSlide).css({
            zIndex: b.options.zIndex - 1
            , opacity: 1
        })
    }, b.prototype.setHeight = function () {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }, b.prototype.setOption = b.prototype.slickSetOption = function (b, c, d) {
        var f, g, e = this;
        if ("responsive" === b && "array" === a.type(c))
            for (g in c)
                if ("array" !== a.type(e.options.responsive)) e.options.responsive = [c[g]];
                else {
                    for (f = e.options.responsive.length - 1; f >= 0;) e.options.responsive[f].breakpoint === c[g].breakpoint && e.options.responsive.splice(f, 1), f--;
                    e.options.responsive.push(c[g])
                }
        else e.options[b] = c;
        d === !0 && (e.unload(), e.reinit())
    }, b.prototype.setPosition = function () {
        var a = this;
        a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function () {
        var a = this
            , b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = null !== a.animType && a.animType !== !1
    }, b.prototype.setSlideClasses = function (a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }, b.prototype.setupInfinite = function () {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.setPaused = function (a) {
        var b = this;
        b.options.autoplay === !0 && b.options.pauseOnHover === !0 && (b.paused = a, a ? b.autoPlayClear() : b.autoPlay())
    }, b.prototype.selectHandler = function (b) {
        var c = this
            , d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide")
            , e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), c.asNavFor(e), void 0) : (c.slideHandler(e), void 0)
    }, b.prototype.slideHandler = function (a, b, c) {
        var d, e, f, g, h = null
            , i = this;
        return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
            i.postSlide(d)
        }) : i.postSlide(d)), void 0) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
            i.postSlide(d)
        }) : i.postSlide(d)), void 0) : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer), e = 0 > d ? 0 !== i.slideCount % i.options.slidesToScroll ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? 0 !== i.slideCount % i.options.slidesToScroll ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () {
            i.postSlide(e)
        })) : i.postSlide(e), i.animateHeight(), void 0) : (c !== !0 ? i.animateSlide(h, function () {
            i.postSlide(e)
        }) : i.postSlide(e), void 0)))
    }, b.prototype.startLoad = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function () {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "left" : "right" : "vertical"
    }, b.prototype.swipeEnd = function () {
        var c, b = this;
        if (b.dragging = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) switch (b.swipeDirection()) {
        case "left":
            c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.slideHandler(c), b.currentDirection = 0, b.touchObject = {}, b.$slider.trigger("swipe", [b, "left"]);
            break;
        case "right":
            c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.slideHandler(c), b.currentDirection = 1, b.touchObject = {}, b.$slider.trigger("swipe", [b, "right"])
        }
        else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
    }, b.prototype.swipeHandler = function (a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
        case "start":
            b.swipeStart(a);
            break;
        case "move":
            b.swipeMove(a);
            break;
        case "end":
            b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function (a) {
        var d, e, f, g, h, b = this;
        return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.swipeLeft = b.options.vertical === !1 ? d + f * g : d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : (b.setCSS(b.swipeLeft), void 0)) : void 0)
    }, b.prototype.swipeStart = function (a) {
        var c, b = this;
        return 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, b.dragging = !0, void 0)
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function () {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function (a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function () {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function () {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, b.prototype.visibility = function () {
        var a = this;
        document[a.hidden] ? (a.paused = !0, a.autoPlayClear()) : a.options.autoplay === !0 && (a.paused = !1, a.autoPlay())
    }, b.prototype.initADA = function () {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true"
            , tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
            a(this).attr({
                role: "option"
                , "aria-describedby": "slick-slide" + b.instanceUid + c
            })
        }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) {
            a(this).attr({
                role: "presentation"
                , "aria-selected": "false"
                , "aria-controls": "navigation" + b.instanceUid + c
                , id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
    }, b.prototype.activateADA = function () {
        var a = this
            , b = a.$slider.find("*").is(":focus");
        a.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
            , tabindex: "0"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        }), b && a.$slideTrack.find(".slick-active").focus()
    }, b.prototype.focusHandler = function () {
        var b = this;
        b.$slider.on("focus.slick blur.slick", "*", function (c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function () {
                b.isPlay && (d.is(":focus") ? (b.autoPlayClear(), b.paused = !0) : (b.paused = !1, b.autoPlay()))
            }, 0)
        })
    }, a.fn.slick = function () {
        var g, a = this
            , c = arguments[0]
            , d = Array.prototype.slice.call(arguments, 1)
            , e = a.length
            , f = 0;
        for (f; e > f; f++)
            if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
        return a
    }
});
! function (t) {
    var s, e;
    return e = "jqRating", s = function () {
        function s(s, e) {
            this.$this = t(s), this.settings = {
                value: 3.5
                , retainValue: null
                , levelsClasses: ["level-xlow", "level-low", "level-medium", "level-high", "level-xhigh"]
                , updateOn: "click"
                , starsCount: 5
                , basedOn: 5
                , iconClass: "fa fa-star"
                , editable: !1
                , onChange: null
            }, this.$refs = {
                starsContainer: null
                , base: null
                , hover: null
                , grade: null
                , starsBase: null
                , starsHover: null
            }, this.levelClass = null, this.hoverValue = null, this.retainValue = null, this._init(e)
        }
        return s.prototype._init = function (t) {
            return this._extendSettings(t), this.retainValue = this.settings.retainValue, this.$refs.starsContainer = this.$this.find("[data-jq-rating-stars]:first"), this.$refs.starsContainer.length || (this.$refs.starsContainer = this.$this), this.$refs.grade = this.$this.find("[data-jq-rating-grade]"), this._generateHtml(), this._applyBaseCss(), this._addEventsListeners(), this.setValue(this.settings.value)
        }, s.prototype.destroy = function () {
            return this.$refs.starsInteraction.unbind("mouseover"), this.$refs.starsInteraction.unbind("click"), this.$refs.starsContainer.unbind("mouseleave"), this.$refs.starsContainer.empty(), this.$refs.starsContainer = null, this.$refs.base = null, this.$refs.hover = null, this.$refs.grade = null, this.$refs.starsBase = null, this.$refs.starsHover = null, this.$refs.formField = null, this.$this.removeClass("jq-rating"), this.levelClass && this.$this.removeClass(this.levelClass), this.isEditable() ? this.$this.removeClass("jq-rating--editable") : void 0
        }, s.prototype.update = function () {
            return this.destroy(), this._init()
        }, s.prototype.retain = function (t) {
            return this.retainValue = t, this.render()
        }, s.prototype.release = function () {
            return typeof this.retainValue !== !1 && typeof this.retainValue !== !1 ? (this.retainValue = null, this.render()) : void 0
        }, s.prototype._generateHtml = function () {
            var s, e, i, n;
            for (this.$this.addClass("jq-rating"), this.isEditable() && this.$this.addClass("jq-rating--editable"), this.$refs.base = t('<span class="jq-rating-group" />'), this.$refs.hover = t('<span class="jq-rating-group--hover" />'), this.$refs.interaction = t('<span class="jq-rating-group--hover jq-rating-group--interaction" />'), e = [], s = i = 0, n = this.settings.starsCount; n >= 0 ? n > i : i > n; s = n >= 0 ? ++i : --i) e.push(['<span class="jq-rating-star">', '<i class="' + this.settings.iconClass + '"></i>', "</span>"].join(""));
            return this.$refs.starsContainer.append(this.$refs.base).append(this.$refs.hover).append(this.$refs.interaction), this.$refs.base.append(t(e.join(""))), this.$refs.hover.append(t(e.join(""))), this.$refs.interaction.append(t(e.join(""))), this.$refs.starsBase = this.$refs.base.children(), this.$refs.starsHover = this.$refs.hover.children(), this.$refs.starsInteraction = this.$refs.interaction.children()
        }, s.prototype._applyBaseCss = function () {
            var t;
            return this.$refs.starsContainer.length && this.$refs.starsContainer.css({
                position: "relative"
                , display: "inline-block"
            }), this.$refs.base.css({
                top: 0
                , left: 0
            }), t = {
                position: "absolute"
                , top: 0
                , left: 0
                , overflow: "hidden"
                , "white-space": "nowrap"
            }, this.$refs.hover.css(t), this.$refs.interaction.css(t), this.$refs.starsBase.css({
                display: "inline-block"
            }), this.$refs.starsHover.css({
                display: "inline-block"
            }), this.$refs.starsInteraction.css({
                color: "transparent"
            })
        }, s.prototype._addEventsListeners = function () {
            return this.$this.find("input[data-jq-rating-grade], textarea[data-jq-rating-grade]").on("change", function (t) {
                return function (s) {
                    var e;
                    return e = parseInt(s.currentTarget.value), 0 > e && (e = 0), e > t.settings.basedOn && (e = t.settings.basedOn), t.setValue(e)
                }
            }(this)), this.isEditable() ? (this.$refs.starsInteraction.bind("mouseover", function (s) {
                return function (e) {
                    var i, n;
                    return i = t(e.currentTarget).index() + 1, n = s.settings.basedOn / s.settings.starsCount * i, "hover" === s.settings.updateOn ? s.setValue(n) : (s.hoverValue = n, s.render())
                }
            }(this)), this.$refs.starsInteraction.bind("click", function (s) {
                return function (e) {
                    var i;
                    return i = t(e.currentTarget).index() + 1, s.setValue(s.settings.basedOn / s.settings.starsCount * i)
                }
            }(this)), this.$refs.starsContainer.bind("mouseleave", function (t) {
                return function () {
                    return t.hoverValue = null, t.render()
                }
            }(this))) : void 0
        }, s.prototype.setValue = function (s) {
            return this.value = s, this.render(), this.$refs.grade.each(function (s) {
                return function (e, i) {
                    switch (i.nodeName.toLowerCase()) {
                    case "textarea":
                    case "input":
                        return t(i).val(s.value).attr("value", s.value);
                    default:
                        return t(i).html(s.value)
                    }
                }
            }(this)), this.settings.onChange && this.settings.onChange(this.value, this), this.$this.trigger("jqRating.change")
        }, s.prototype.render = function () {
            var t, s, e;
            return s = this.hoverValue || this.value, ("number" == typeof this.retainValue || "string" == typeof this.retainValue) && (s = this.retainValue), e = 100 / this.settings.basedOn * s, this.$refs.hover.css({
                width: e + "%"
            }), t = Math.round(this.settings.levelsClasses.length / this.settings.basedOn * s - 1), 0 > t && (t = 0), t >= this.settings.levelsClasses.length && (t = this.settings.levelsClasses.length - 1), this.levelClass && this.$this.removeClass(this.levelClass), this.levelClass = "jq-rating--" + this.settings.levelsClasses[t], this.$this.addClass(this.levelClass)
        }, s.prototype.isEditable = function () {
            var t;
            return t = this.settings.editable && "true" === this.settings.editable
        }, s.prototype._extendSettings = function (s) {
            return null != s && (this.settings = t.extend(this.settings, s, !0)), t.each(this.$this.get(0).attributes, function (t) {
                return function (s, e) {
                    var i;
                    return i = e.name, i = i.substr("data-jq-rating-".length), (i = i.replace(/-([a-z])/g, function (t) {
                        return t[1].toUpperCase()
                    })) && void 0 !== t.settings[i] ? t.settings[i] = e.value : void 0
                }
            }(this))
        }, s
    }(), t.fn.jqRating = function (i) {
        var n;
        return s.prototype[i] ? (n = Array.prototype.slice.call(arguments, 1), this.each(function () {
            var s;
            return s = t(this).data(e + "_api"), s[i].apply(s, n)
        })) : "object" != typeof i && i ? t.error("Method " + i + " does not exist on jQuery.jqRating") : (n = Array.prototype.slice.call(arguments), this.each(function () {
            var i, r;
            return i = t(this), null == i.data(e + "_api") || "" === i.data(e + "_api") ? (r = new s(this, n[0]), t(this).data(e + "_api", r)) : void 0
        }))
    }
}(jQuery);
/*! jQuery Validation Plugin - v1.13.0 - 7/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
! function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function (a) {
    a.extend(a.fn, {
        validate: function (b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function (b) {
                c.settings.submitHandler && (c.submitButton = b.target), a(b.target).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(b.target).attr("formnovalidate") && (c.cancelSubmit = !0)
            }), this.submit(function (b) {
                function d() {
                    var d;
                    return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), !1) : !0
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        }
        , valid: function () {
            var b, c;
            return a(this[0]).is("form") ? b = this.validate().form() : (b = !0, c = a(this[0].form).validate(), this.each(function () {
                b = c.element(this) && b
            })), b
        }
        , removeAttrs: function (b) {
            var c = {}
                , d = this;
            return a.each(b.split(/\s/), function (a, b) {
                c[b] = d.attr(b), d.removeAttr(b)
            }), c
        }
        , rules: function (b, c) {
            var d, e, f, g, h, i, j = this[0];
            if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
            case "add":
                a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                break;
            case "remove":
                return c ? (i = {}, a.each(c.split(/\s/), function (b, c) {
                    i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required")
                }), i) : (delete e[j.name], f)
            }
            return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                required: h
            }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                remote: h
            })), g
        }
    }), a.extend(a.expr[":"], {
        blank: function (b) {
            return !a.trim("" + a(b).val())
        }
        , filled: function (b) {
            return !!a.trim("" + a(b).val())
        }
        , unchecked: function (b) {
            return !a(b).prop("checked")
        }
    }), a.validator = function (b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function (b, c) {
        return 1 === arguments.length ? function () {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
                return c
            })
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {}
            , groups: {}
            , rules: {}
            , errorClass: "error"
            , validClass: "valid"
            , errorElement: "label"
            , focusInvalid: !0
            , errorContainer: a([])
            , errorLabelContainer: a([])
            , onsubmit: !0
            , ignore: ":hidden"
            , ignoreTitle: !1
            , onfocusin: function (a) {
                this.lastActive = a, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
            }
            , onfocusout: function (a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            }
            , onkeyup: function (a, b) {
                (9 !== b.which || "" !== this.elementValue(a)) && (a.name in this.submitted || a === this.lastElement) && this.element(a)
            }
            , onclick: function (a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            }
            , highlight: function (b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            }
            , unhighlight: function (b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        }
        , setDefaults: function (b) {
            a.extend(a.validator.defaults, b)
        }
        , messages: {
            required: "This field is required."
            , remote: "Please fix this field."
            , email: "Please enter a valid email address."
            , url: "Please enter a valid URL."
            , date: "Please enter a valid date."
            , dateISO: "Please enter a valid date ( ISO )."
            , number: "Please enter a valid number."
            , digits: "Please enter only digits."
            , creditcard: "Please enter a valid credit card number."
            , equalTo: "Please enter the same value again."
            , maxlength: a.validator.format("Please enter no more than {0} characters.")
            , minlength: a.validator.format("Please enter at least {0} characters.")
            , rangelength: a.validator.format("Please enter a value between {0} and {1} characters long.")
            , range: a.validator.format("Please enter a value between {0} and {1}.")
            , max: a.validator.format("Please enter a value less than or equal to {0}.")
            , min: a.validator.format("Please enter a value greater than or equal to {0}.")
        }
        , autoCreateRanges: !1
        , prototype: {
            init: function () {
                function b(b) {
                    var c = a.data(this[0].form, "validator")
                        , d = "on" + b.type.replace(/^validate/, "")
                        , e = c.settings;
                    e[d] && !this.is(e.ignore) && e[d].call(c, this[0], b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function (b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) {
                        d[c] = b
                    })
                }), c = this.settings.rules, a.each(c, function (b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", b).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", b), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            }
            , form: function () {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            }
            , checkForm: function () {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            }
            , element: function (b) {
                var c = this.clean(b)
                    , d = this.validationTargetFor(c)
                    , e = !0;
                return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e
            }
            , showErrors: function (b) {
                if (b) {
                    a.extend(this.errorMap, b), this.errorList = [];
                    for (var c in b) this.errorList.push({
                        message: b[c]
                        , element: this.findByName(c)[0]
                    });
                    this.successList = a.grep(this.successList, function (a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            }
            , resetForm: function () {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            }
            , numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            }
            , objectLength: function (a) {
                var b, c = 0;
                for (b in a) c++;
                return c
            }
            , hideErrors: function () {
                this.hideThese(this.toHide)
            }
            , hideThese: function (a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide()
            }
            , valid: function () {
                return 0 === this.size()
            }
            , size: function () {
                return this.errorList.length
            }
            , focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                }
                catch (b) {}
            }
            , findLastActive: function () {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function (a) {
                    return a.element.name === b.name
                }).length && b
            }
            , elements: function () {
                var b = this
                    , c = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
                })
            }
            , clean: function (b) {
                return a(b)[0]
            }
            , errors: function () {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            }
            , reset: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
            }
            , prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            }
            , prepareElement: function (a) {
                this.reset(), this.toHide = this.errorsFor(a)
            }
            , elementValue: function (b) {
                var c, d = a(b)
                    , e = b.type;
                return "radio" === e || "checkbox" === e ? a("input[name='" + b.name + "']:checked").val() : "number" === e && "undefined" != typeof b.validity ? b.validity.badInput ? !1 : d.val() : (c = d.val(), "string" == typeof c ? c.replace(/\r/g, "") : c)
            }
            , check: function (b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f = a(b).rules()
                    , g = a.map(f, function (a, b) {
                        return b
                    }).length
                    , h = !1
                    , i = this.elementValue(b);
                for (d in f) {
                    e = {
                        method: d
                        , parameters: f[d]
                    };
                    try {
                        if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                            h = !0;
                            continue
                        }
                        if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1
                    }
                    catch (j) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j
                    }
                }
                if (!h) return this.objectLength(f) && this.successList.push(b), !0
            }
            , customDataMessage: function (b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
            }
            , customMessage: function (a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            }
            , findDefined: function () {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a];
                return void 0
            }
            , defaultMessage: function (b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            }
            , formatAndAdd: function (b, c) {
                var d = this.defaultMessage(b, c.method)
                    , e = /\$?\{(\d+)\}/g;
                "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({
                    message: d
                    , element: b
                    , method: c.method
                }), this.errorMap[b.name] = d, this.submitted[b.name] = d
            }
            , addWrapper: function (a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            }
            , defaultShowErrors: function () {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            }
            , validElements: function () {
                return this.currentElements.not(this.invalidElements())
            }
            , invalidElements: function () {
                return a(this.errorList).map(function () {
                    return this.element
                })
            }
            , showLabel: function (b, c) {
                var d, e, f, g = this.errorsFor(b)
                    , h = this.idOrName(b)
                    , i = a(b).attr("aria-describedby");
                g.length ? (g.removeClass(this.settings.validClass).addClass(this.settings.errorClass), g.html(c)) : (g = a("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(c || ""), d = g, this.settings.wrapper && (d = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), g.is("label") ? g.attr("for", h) : 0 === g.parents("label[for='" + h + "']").length && (f = g.attr("id"), i ? i.match(new RegExp("\b" + f + "\b")) || (i += " " + f) : i = f, a(b).attr("aria-describedby", i), e = this.groups[b.name], e && a.each(this.groups, function (b, c) {
                    c === e && a("[name='" + b + "']", this.currentForm).attr("aria-describedby", g.attr("id"))
                }))), !c && this.settings.success && (g.text(""), "string" == typeof this.settings.success ? g.addClass(this.settings.success) : this.settings.success(g, b)), this.toShow = this.toShow.add(g)
            }
            , errorsFor: function (b) {
                var c = this.idOrName(b)
                    , d = a(b).attr("aria-describedby")
                    , e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + d.replace(/\s+/g, ", #")), this.errors().filter(e)
            }
            , idOrName: function (a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            }
            , validationTargetFor: function (a) {
                return this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]), a
            }
            , checkable: function (a) {
                return /radio|checkbox/i.test(a.type)
            }
            , findByName: function (b) {
                return a(this.currentForm).find("[name='" + b + "']")
            }
            , getLength: function (b, c) {
                switch (c.nodeName.toLowerCase()) {
                case "select":
                    return a("option:selected", c).length;
                case "input":
                    if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            }
            , depend: function (a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
            }
            , dependTypes: {
                "boolean": function (a) {
                    return a
                }
                , string: function (b, c) {
                    return !!a(b, c.form).length
                }
                , "function": function (a, b) {
                    return a(b)
                }
            }
            , optional: function (b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            }
            , startRequest: function (a) {
                this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
            }
            , stopRequest: function (b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            }
            , previousValue: function (b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null
                    , valid: !0
                    , message: this.defaultMessage(b, "remote")
                })
            }
        }
        , classRuleSettings: {
            required: {
                required: !0
            }
            , email: {
                email: !0
            }
            , url: {
                url: !0
            }
            , date: {
                date: !0
            }
            , dateISO: {
                dateISO: !0
            }
            , number: {
                number: !0
            }
            , digits: {
                digits: !0
            }
            , creditcard: {
                creditcard: !0
            }
        }
        , addClassRules: function (b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        }
        , classRules: function (b) {
            var c = {}
                , d = a(b).attr("class");
            return d && a.each(d.split(" "), function () {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        }
        , attributeRules: function (b) {
            var c, d, e = {}
                , f = a(b)
                , g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), /min|max/.test(c) && (null === g || /number|range|text/.test(g)) && (d = Number(d)), d || 0 === d ? e[c] = d : g === c && "range" !== g && (e[c] = !0);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        }
        , dataRules: function (b) {
            var c, d, e = {}
                , f = a(b);
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), void 0 !== d && (e[c] = d);
            return e
        }
        , staticRules: function (b) {
            var c = {}
                , d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        }
        , normalizeRules: function (b, c) {
            return a.each(b, function (d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                    case "string":
                        f = !!a(e.depends, c.form).length;
                        break;
                    case "function":
                        f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d]
                }
            }), a.each(b, function (d, e) {
                b[d] = a.isFunction(e) ? e(c) : e
            }), a.each(["minlength", "maxlength"], function () {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function () {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (b.min && b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), b.minlength && b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        }
        , normalizeRule: function (b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function () {
                    c[this] = !0
                }), b = c
            }
            return b
        }
        , addMethod: function (b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        }
        , methods: {
            required: function (b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : a.trim(b).length > 0
            }
            , email: function (a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
            }
            , url: function (a, b) {
                return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
            }
            , date: function (a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
            }
            , dateISO: function (a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
            }
            , number: function (a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            }
            , digits: function (a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            }
            , creditcard: function (a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a)) return !1;
                var c, d, e = 0
                    , f = 0
                    , g = !1;
                if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19) return !1;
                for (c = a.length - 1; c >= 0; c--) d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), e += f, g = !g;
                return e % 10 === 0
            }
            , minlength: function (b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || e >= d
            }
            , maxlength: function (b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || d >= e
            }
            , rangelength: function (b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            }
            , min: function (a, b, c) {
                return this.optional(b) || a >= c
            }
            , max: function (a, b, c) {
                return this.optional(b) || c >= a
            }
            , range: function (a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            }
            , equalTo: function (b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                    a(c).valid()
                }), b === e.val()
            }
            , remote: function (b, c, d) {
                if (this.optional(c)) return "dependency-mismatch";
                var e, f, g = this.previousValue(c);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, d = "string" == typeof d && {
                    url: d
                } || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, f[c.name] = b, a.ajax(a.extend(!0, {
                    url: d
                    , mode: "abort"
                    , port: "validate" + c.name
                    , dataType: "json"
                    , data: f
                    , context: e.currentForm
                    , success: function (d) {
                        var f, h, i, j = d === !0 || "true" === d;
                        e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    }), a.format = function () {
        throw "$.format has been deprecated. Please use $.validator.format instead."
    };
    var b, c = {};
    a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) {
        var e = a.port;
        "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
    }) : (b = a.ajax, a.ajax = function (d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode
            , f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
    }), a.extend(a.fn, {
        validateDelegate: function (b, c, d) {
            return this.bind(c, function (c) {
                var e = a(c.target);
                return e.is(b) ? d.apply(e, arguments) : void 0
            })
        }
    })
});
/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 Jörn Zaefferer; Licensed MIT */
! function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "./jquery.validate.min"], a) : a(jQuery)
}(function (a) {
    ! function () {
        function b(a) {
            return a.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "")
        }
        a.validator.addMethod("maxWords", function (a, c, d) {
            return this.optional(c) || b(a).match(/\b\w+\b/g).length <= d
        }, a.validator.format("Please enter {0} words or less.")), a.validator.addMethod("minWords", function (a, c, d) {
            return this.optional(c) || b(a).match(/\b\w+\b/g).length >= d
        }, a.validator.format("Please enter at least {0} words.")), a.validator.addMethod("rangeWords", function (a, c, d) {
            var e = b(a)
                , f = /\b\w+\b/g;
            return this.optional(c) || e.match(f).length >= d[0] && e.match(f).length <= d[1]
        }, a.validator.format("Please enter between {0} and {1} words."))
    }(), a.validator.addMethod("accept", function (b, c, d) {
        var e, f, g = "string" == typeof d ? d.replace(/\s/g, "").replace(/,/g, "|") : "image/*"
            , h = this.optional(c);
        if (h) return h;
        if ("file" === a(c).attr("type") && (g = g.replace(/\*/g, ".*"), c.files && c.files.length))
            for (e = 0; e < c.files.length; e++)
                if (f = c.files[e], !f.type.match(new RegExp("\\.?(" + g + ")$", "i"))) return !1;
        return !0
    }, a.validator.format("Please enter a value with a valid mimetype.")), a.validator.addMethod("alphanumeric", function (a, b) {
        return this.optional(b) || /^\w+$/i.test(a)
    }, "Letters, numbers, and underscores only please"), a.validator.addMethod("bankaccountNL", function (a, b) {
        if (this.optional(b)) return !0;
        if (!/^[0-9]{9}|([0-9]{2} ){3}[0-9]{3}$/.test(a)) return !1;
        var c, d, e, f = a.replace(/ /g, "")
            , g = 0
            , h = f.length;
        for (c = 0; h > c; c++) d = h - c, e = f.substring(c, c + 1), g += d * e;
        return g % 11 === 0
    }, "Please specify a valid bank account number"), a.validator.addMethod("bankorgiroaccountNL", function (b, c) {
        return this.optional(c) || a.validator.methods.bankaccountNL.call(this, b, c) || a.validator.methods.giroaccountNL.call(this, b, c)
    }, "Please specify a valid bank or giro account number"), a.validator.addMethod("bic", function (a, b) {
        return this.optional(b) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(a)
    }, "Please specify a valid BIC code"), a.validator.addMethod("cifES", function (a) {
        "use strict";
        var b, c, d, e, f, g, h = [];
        if (a = a.toUpperCase(), !a.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)")) return !1;
        for (d = 0; 9 > d; d++) h[d] = parseInt(a.charAt(d), 10);
        for (c = h[2] + h[4] + h[6], e = 1; 8 > e; e += 2) f = (2 * h[e]).toString(), g = f.charAt(1), c += parseInt(f.charAt(0), 10) + ("" === g ? 0 : parseInt(g, 10));
        return /^[ABCDEFGHJNPQRSUVW]{1}/.test(a) ? (c += "", b = 10 - parseInt(c.charAt(c.length - 1), 10), a += b, h[8].toString() === String.fromCharCode(64 + b) || h[8].toString() === a.charAt(a.length - 1)) : !1
    }, "Please specify a valid CIF number."), a.validator.addMethod("cpfBR", function (a) {
        if (a = a.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, ""), 11 !== a.length) return !1;
        var b, c, d, e, f = 0;
        if (b = parseInt(a.substring(9, 10), 10), c = parseInt(a.substring(10, 11), 10), d = function (a, b) {
                var c = 10 * a % 11;
                return (10 === c || 11 === c) && (c = 0), c === b
            }, "" === a || "00000000000" === a || "11111111111" === a || "22222222222" === a || "33333333333" === a || "44444444444" === a || "55555555555" === a || "66666666666" === a || "77777777777" === a || "88888888888" === a || "99999999999" === a) return !1;
        for (e = 1; 9 >= e; e++) f += parseInt(a.substring(e - 1, e), 10) * (11 - e);
        if (d(f, b)) {
            for (f = 0, e = 1; 10 >= e; e++) f += parseInt(a.substring(e - 1, e), 10) * (12 - e);
            return d(f, c)
        }
        return !1
    }, "Please specify a valid CPF number"), a.validator.addMethod("creditcardtypes", function (a, b, c) {
        if (/[^0-9\-]+/.test(a)) return !1;
        a = a.replace(/\D/g, "");
        var d = 0;
        return c.mastercard && (d |= 1), c.visa && (d |= 2), c.amex && (d |= 4), c.dinersclub && (d |= 8), c.enroute && (d |= 16), c.discover && (d |= 32), c.jcb && (d |= 64), c.unknown && (d |= 128), c.all && (d = 255), 1 & d && /^(5[12345])/.test(a) ? 16 === a.length : 2 & d && /^(4)/.test(a) ? 16 === a.length : 4 & d && /^(3[47])/.test(a) ? 15 === a.length : 8 & d && /^(3(0[012345]|[68]))/.test(a) ? 14 === a.length : 16 & d && /^(2(014|149))/.test(a) ? 15 === a.length : 32 & d && /^(6011)/.test(a) ? 16 === a.length : 64 & d && /^(3)/.test(a) ? 16 === a.length : 64 & d && /^(2131|1800)/.test(a) ? 15 === a.length : 128 & d ? !0 : !1
    }, "Please enter a valid credit card number."), a.validator.addMethod("currency", function (a, b, c) {
        var d, e = "string" == typeof c
            , f = e ? c : c[0]
            , g = e ? !0 : c[1];
        return f = f.replace(/,/g, ""), f = g ? f + "]" : f + "]?", d = "^[" + f + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$", d = new RegExp(d), this.optional(b) || d.test(a)
    }, "Please specify a valid currency"), a.validator.addMethod("dateFA", function (a, b) {
        return this.optional(b) || /^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/.test(a)
    }, a.validator.messages.date), a.validator.addMethod("dateITA", function (a, b) {
        var c, d, e, f, g, h = !1
            , i = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        return i.test(a) ? (c = a.split("/"), d = parseInt(c[0], 10), e = parseInt(c[1], 10), f = parseInt(c[2], 10), g = new Date(Date.UTC(f, e - 1, d, 12, 0, 0, 0)), h = g.getUTCFullYear() === f && g.getUTCMonth() === e - 1 && g.getUTCDate() === d ? !0 : !1) : h = !1, this.optional(b) || h
    }, a.validator.messages.date), a.validator.addMethod("dateNL", function (a, b) {
        return this.optional(b) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(a)
    }, a.validator.messages.date), a.validator.addMethod("extension", function (a, b, c) {
        return c = "string" == typeof c ? c.replace(/,/g, "|") : "png|jpe?g|gif", this.optional(b) || a.match(new RegExp("\\.(" + c + ")$", "i"))
    }, a.validator.format("Please enter a value with a valid extension.")), a.validator.addMethod("giroaccountNL", function (a, b) {
        return this.optional(b) || /^[0-9]{1,7}$/.test(a)
    }, "Please specify a valid giro account number"), a.validator.addMethod("iban", function (a, b) {
        if (this.optional(b)) return !0;
        var c, d, e, f, g, h, i, j, k, l = a.replace(/ /g, "").toUpperCase()
            , m = ""
            , n = !0
            , o = ""
            , p = "";
        if (c = l.substring(0, 2), h = {
                AL: "\\d{8}[\\dA-Z]{16}"
                , AD: "\\d{8}[\\dA-Z]{12}"
                , AT: "\\d{16}"
                , AZ: "[\\dA-Z]{4}\\d{20}"
                , BE: "\\d{12}"
                , BH: "[A-Z]{4}[\\dA-Z]{14}"
                , BA: "\\d{16}"
                , BR: "\\d{23}[A-Z][\\dA-Z]"
                , BG: "[A-Z]{4}\\d{6}[\\dA-Z]{8}"
                , CR: "\\d{17}"
                , HR: "\\d{17}"
                , CY: "\\d{8}[\\dA-Z]{16}"
                , CZ: "\\d{20}"
                , DK: "\\d{14}"
                , DO: "[A-Z]{4}\\d{20}"
                , EE: "\\d{16}"
                , FO: "\\d{14}"
                , FI: "\\d{14}"
                , FR: "\\d{10}[\\dA-Z]{11}\\d{2}"
                , GE: "[\\dA-Z]{2}\\d{16}"
                , DE: "\\d{18}"
                , GI: "[A-Z]{4}[\\dA-Z]{15}"
                , GR: "\\d{7}[\\dA-Z]{16}"
                , GL: "\\d{14}"
                , GT: "[\\dA-Z]{4}[\\dA-Z]{20}"
                , HU: "\\d{24}"
                , IS: "\\d{22}"
                , IE: "[\\dA-Z]{4}\\d{14}"
                , IL: "\\d{19}"
                , IT: "[A-Z]\\d{10}[\\dA-Z]{12}"
                , KZ: "\\d{3}[\\dA-Z]{13}"
                , KW: "[A-Z]{4}[\\dA-Z]{22}"
                , LV: "[A-Z]{4}[\\dA-Z]{13}"
                , LB: "\\d{4}[\\dA-Z]{20}"
                , LI: "\\d{5}[\\dA-Z]{12}"
                , LT: "\\d{16}"
                , LU: "\\d{3}[\\dA-Z]{13}"
                , MK: "\\d{3}[\\dA-Z]{10}\\d{2}"
                , MT: "[A-Z]{4}\\d{5}[\\dA-Z]{18}"
                , MR: "\\d{23}"
                , MU: "[A-Z]{4}\\d{19}[A-Z]{3}"
                , MC: "\\d{10}[\\dA-Z]{11}\\d{2}"
                , MD: "[\\dA-Z]{2}\\d{18}"
                , ME: "\\d{18}"
                , NL: "[A-Z]{4}\\d{10}"
                , NO: "\\d{11}"
                , PK: "[\\dA-Z]{4}\\d{16}"
                , PS: "[\\dA-Z]{4}\\d{21}"
                , PL: "\\d{24}"
                , PT: "\\d{21}"
                , RO: "[A-Z]{4}[\\dA-Z]{16}"
                , SM: "[A-Z]\\d{10}[\\dA-Z]{12}"
                , SA: "\\d{2}[\\dA-Z]{18}"
                , RS: "\\d{18}"
                , SK: "\\d{20}"
                , SI: "\\d{15}"
                , ES: "\\d{20}"
                , SE: "\\d{20}"
                , CH: "\\d{5}[\\dA-Z]{12}"
                , TN: "\\d{20}"
                , TR: "\\d{5}[\\dA-Z]{17}"
                , AE: "\\d{3}\\d{16}"
                , GB: "[A-Z]{4}\\d{14}"
                , VG: "[\\dA-Z]{4}\\d{16}"
            }, g = h[c], "undefined" != typeof g && (i = new RegExp("^[A-Z]{2}\\d{2}" + g + "$", ""), !i.test(l))) return !1;
        for (d = l.substring(4, l.length) + l.substring(0, 4), j = 0; j < d.length; j++) e = d.charAt(j), "0" !== e && (n = !1), n || (m += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(e));
        for (k = 0; k < m.length; k++) f = m.charAt(k), p = "" + o + f, o = p % 97;
        return 1 === o
    }, "Please specify a valid IBAN"), a.validator.addMethod("integer", function (a, b) {
        return this.optional(b) || /^-?\d+$/.test(a)
    }, "A positive or negative non-decimal number please"), a.validator.addMethod("ipv4", function (a, b) {
        return this.optional(b) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(a)
    }, "Please enter a valid IP v4 address."), a.validator.addMethod("ipv6", function (a, b) {
        return this.optional(b) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(a)
    }, "Please enter a valid IP v6 address."), a.validator.addMethod("lettersonly", function (a, b) {
        return this.optional(b) || /^[a-z]+$/i.test(a)
    }, "Letters only please"), a.validator.addMethod("letterswithbasicpunc", function (a, b) {
        return this.optional(b) || /^[a-z\-.,()'"\s]+$/i.test(a)
    }, "Letters or punctuation only please"), a.validator.addMethod("mobileNL", function (a, b) {
        return this.optional(b) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(a)
    }, "Please specify a valid mobile number"), a.validator.addMethod("mobileUK", function (a, b) {
        return a = a.replace(/\(|\)|\s+|-/g, ""), this.optional(b) || a.length > 9 && a.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/)
    }, "Please specify a valid mobile number"), a.validator.addMethod("nieES", function (a) {
        "use strict";
        return a = a.toUpperCase(), a.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") ? /^[T]{1}/.test(a) ? a[8] === /^[T]{1}[A-Z0-9]{8}$/.test(a) : /^[XYZ]{1}/.test(a) ? a[8] === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(a.replace("X", "0").replace("Y", "1").replace("Z", "2").substring(0, 8) % 23) : !1 : !1
    }, "Please specify a valid NIE number."), a.validator.addMethod("nifES", function (a) {
        "use strict";
        return a = a.toUpperCase(), a.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") ? /^[0-9]{8}[A-Z]{1}$/.test(a) ? "TRWAGMYFPDXBNJZSQVHLCKE".charAt(a.substring(8, 0) % 23) === a.charAt(8) : /^[KLM]{1}/.test(a) ? a[8] === String.fromCharCode(64) : !1 : !1
    }, "Please specify a valid NIF number."), jQuery.validator.addMethod("notEqualTo", function (b, c, d) {
        return this.optional(c) || !a.validator.methods.equalTo.call(this, b, c, d)
    }, "Please enter a different value, values must not be the same."), a.validator.addMethod("nowhitespace", function (a, b) {
        return this.optional(b) || /^\S+$/i.test(a)
    }, "No white space please"), a.validator.addMethod("pattern", function (a, b, c) {
        return this.optional(b) ? !0 : ("string" == typeof c && (c = new RegExp("^(?:" + c + ")$")), c.test(a))
    }, "Invalid format."), a.validator.addMethod("phoneNL", function (a, b) {
        return this.optional(b) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(a)
    }, "Please specify a valid phone number."), a.validator.addMethod("phoneUK", function (a, b) {
        return a = a.replace(/\(|\)|\s+|-/g, ""), this.optional(b) || a.length > 9 && a.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/)
    }, "Please specify a valid phone number"), a.validator.addMethod("phoneUS", function (a, b) {
        return a = a.replace(/\s+/g, ""), this.optional(b) || a.length > 9 && a.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/)
    }, "Please specify a valid phone number"), a.validator.addMethod("phonesUK", function (a, b) {
        return a = a.replace(/\(|\)|\s+|-/g, ""), this.optional(b) || a.length > 9 && a.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$/)
    }, "Please specify a valid uk phone number"), a.validator.addMethod("postalCodeCA", function (a, b) {
        return this.optional(b) || /^[ABCEGHJKLMNPRSTVXY]\d[A-Z] \d[A-Z]\d$/.test(a)
    }, "Please specify a valid postal code"), a.validator.addMethod("postalcodeBR", function (a, b) {
        return this.optional(b) || /^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(a)
    }, "Informe um CEP válido."), a.validator.addMethod("postalcodeIT", function (a, b) {
        return this.optional(b) || /^\d{5}$/.test(a)
    }, "Please specify a valid postal code"), a.validator.addMethod("postalcodeNL", function (a, b) {
        return this.optional(b) || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(a)
    }, "Please specify a valid postal code"), a.validator.addMethod("postcodeUK", function (a, b) {
        return this.optional(b) || /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(a)
    }, "Please specify a valid UK postcode"), a.validator.addMethod("require_from_group", function (b, c, d) {
        var e = a(d[1], c.form)
            , f = e.eq(0)
            , g = f.data("valid_req_grp") ? f.data("valid_req_grp") : a.extend({}, this)
            , h = e.filter(function () {
                return g.elementValue(this)
            }).length >= d[0];
        return f.data("valid_req_grp", g), a(c).data("being_validated") || (e.data("being_validated", !0), e.each(function () {
            g.element(this)
        }), e.data("being_validated", !1)), h
    }, a.validator.format("Please fill at least {0} of these fields.")), a.validator.addMethod("skip_or_fill_minimum", function (b, c, d) {
        var e = a(d[1], c.form)
            , f = e.eq(0)
            , g = f.data("valid_skip") ? f.data("valid_skip") : a.extend({}, this)
            , h = e.filter(function () {
                return g.elementValue(this)
            }).length
            , i = 0 === h || h >= d[0];
        return f.data("valid_skip", g), a(c).data("being_validated") || (e.data("being_validated", !0), e.each(function () {
            g.element(this)
        }), e.data("being_validated", !1)), i
    }, a.validator.format("Please either skip these fields or fill at least {0} of them.")), a.validator.addMethod("stateUS", function (a, b, c) {
        var d, e = "undefined" == typeof c
            , f = e || "undefined" == typeof c.caseSensitive ? !1 : c.caseSensitive
            , g = e || "undefined" == typeof c.includeTerritories ? !1 : c.includeTerritories
            , h = e || "undefined" == typeof c.includeMilitary ? !1 : c.includeMilitary;
        return d = g || h ? g && h ? "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$" : g ? "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$" : "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$" : "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$", d = f ? new RegExp(d) : new RegExp(d, "i"), this.optional(b) || d.test(a)
    }, "Please specify a valid state"), a.validator.addMethod("strippedminlength", function (b, c, d) {
        return a(b).text().length >= d
    }, a.validator.format("Please enter at least {0} characters")), a.validator.addMethod("time", function (a, b) {
        return this.optional(b) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test(a)
    }, "Please enter a valid time, between 00:00 and 23:59"), a.validator.addMethod("time12h", function (a, b) {
        return this.optional(b) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(a)
    }, "Please enter a valid time in 12-hour am/pm format"), a.validator.addMethod("url2", function (a, b) {
        return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
    }, a.validator.messages.url), a.validator.addMethod("vinUS", function (a) {
        if (17 !== a.length) return !1;
        var b, c, d, e, f, g, h = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            , i = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9]
            , j = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]
            , k = 0;
        for (b = 0; 17 > b; b++) {
            if (e = j[b], d = a.slice(b, b + 1), 8 === b && (g = d), isNaN(d)) {
                for (c = 0; c < h.length; c++)
                    if (d.toUpperCase() === h[c]) {
                        d = i[c], d *= e, isNaN(g) && 8 === c && (g = h[c]);
                        break
                    }
            }
            else d *= e;
            k += d
        }
        return f = k % 11, 10 === f && (f = "X"), f === g ? !0 : !1
    }, "The specified vehicle identification number (VIN) is invalid."), a.validator.addMethod("zipcodeUS", function (a, b) {
        return this.optional(b) || /^\d{5}(-\d{4})?$/.test(a)
    }, "The specified US ZIP Code is invalid"), a.validator.addMethod("ziprange", function (a, b) {
        return this.optional(b) || /^90[2-5]\d\{2\}-\d{4}$/.test(a)
    }, "Your ZIP-code must be in the range 902xx-xxxx to 905xx-xxxx")
});
/*!
 * # Semantic UI 2.1.7 - Transition
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
! function (n, e, i, t) {
    "use strict";
    n.fn.transition = function () {
        var a, o = n(this)
            , r = o.selector || ""
            , s = (new Date).getTime()
            , l = []
            , u = arguments
            , c = u[0]
            , d = [].slice.call(arguments, 1)
            , m = "string" == typeof c;
        e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || e.msRequestAnimationFrame || function (n) {
            setTimeout(n, 0)
        };
        return o.each(function (e) {
            var f, p, g, v, b, y, h, w, C, A = n(this)
                , S = this;
            C = {
                initialize: function () {
                    f = C.get.settings.apply(S, u), v = f.className, g = f.error, b = f.metadata, w = "." + f.namespace, h = "module-" + f.namespace, p = A.data(h) || C, y = C.get.animationEndEvent(), m && (m = C.invoke(c)), m === !1 && (C.verbose("Converted arguments into settings object", f), f.interval ? C.delay(f.animate) : C.animate(), C.instantiate())
                }
                , instantiate: function () {
                    C.verbose("Storing instance of module", C), p = C, A.data(h, p)
                }
                , destroy: function () {
                    C.verbose("Destroying previous module for", S), A.removeData(h)
                }
                , refresh: function () {
                    C.verbose("Refreshing display type on next animation"), delete C.displayType
                }
                , forceRepaint: function () {
                    C.verbose("Forcing element repaint");
                    var n = A.parent()
                        , e = A.next();
                    0 === e.length ? A.detach().appendTo(n) : A.detach().insertBefore(e)
                }
                , repaint: function () {
                    C.verbose("Repainting element");
                    S.offsetWidth
                }
                , delay: function (n) {
                    var i, a, r = C.get.animationDirection();
                    r || (r = C.can.transition() ? C.get.direction() : "static"), n = n !== t ? n : f.interval, i = "auto" == f.reverse && r == v.outward, a = i || 1 == f.reverse ? (o.length - e) * f.interval : e * f.interval, C.debug("Delaying animation by", a), setTimeout(C.animate, a)
                }
                , animate: function (n) {
                    if (f = n || f, !C.is.supported()) return C.error(g.support), !1;
                    if (C.debug("Preparing animation", f.animation), C.is.animating()) {
                        if (f.queue) return !f.allowRepeats && C.has.direction() && C.is.occurring() && C.queuing !== !0 ? C.debug("Animation is currently occurring, preventing queueing same animation", f.animation) : C.queue(f.animation), !1;
                        if (!f.allowRepeats && C.is.occurring()) return C.debug("Animation is already occurring, will not execute repeated animation", f.animation), !1;
                        C.debug("New animation started, completing previous early", f.animation), p.complete()
                    }
                    C.can.animate() ? C.set.animating(f.animation) : C.error(g.noAnimation, f.animation, S)
                }
                , reset: function () {
                    C.debug("Resetting animation to beginning conditions"), C.remove.animationCallbacks(), C.restore.conditions(), C.remove.animating()
                }
                , queue: function (n) {
                    C.debug("Queueing animation of", n), C.queuing = !0, A.one(y + ".queue" + w, function () {
                        C.queuing = !1, C.repaint(), C.animate.apply(this, f)
                    })
                }
                , complete: function (n) {
                    C.debug("Animation complete", f.animation), C.remove.completeCallback(), C.remove.failSafe(), C.is.looping() || (C.is.outward() ? (C.verbose("Animation is outward, hiding element"), C.restore.conditions(), C.hide()) : C.is.inward() ? (C.verbose("Animation is outward, showing element"), C.restore.conditions(), C.show()) : (C.verbose("Static animation completed"), C.restore.conditions(), f.onComplete.call(S)))
                }
                , force: {
                    visible: function () {
                        var n = A.attr("style")
                            , e = C.get.userStyle()
                            , i = C.get.displayType()
                            , a = e + "display: " + i + " !important;"
                            , o = A.css("display")
                            , r = n === t || "" === n;
                        o !== i ? (C.verbose("Overriding default display to show element", i), A.attr("style", a)) : r && A.removeAttr("style")
                    }
                    , hidden: function () {
                        var n = A.attr("style")
                            , e = A.css("display")
                            , i = n === t || "" === n;
                        "none" === e || C.is.hidden() ? i && A.removeAttr("style") : (C.verbose("Overriding default display to hide element"), A.css("display", "none"))
                    }
                }
                , has: {
                    direction: function (e) {
                        var i = !1;
                        return e = e || f.animation, "string" == typeof e && (e = e.split(" "), n.each(e, function (n, e) {
                            (e === v.inward || e === v.outward) && (i = !0)
                        })), i
                    }
                    , inlineDisplay: function () {
                        var e = A.attr("style") || "";
                        return n.isArray(e.match(/display.*?;/, ""))
                    }
                }
                , set: {
                    animating: function (n) {
                        var e;
                        C.remove.completeCallback(), n = n || f.animation, e = C.get.animationClass(n), C.save.animation(e), C.force.visible(), C.remove.hidden(), C.remove.direction(), C.start.animation(e)
                    }
                    , duration: function (n, e) {
                        e = e || f.duration, e = "number" == typeof e ? e + "ms" : e, (e || 0 === e) && (C.verbose("Setting animation duration", e), A.css({
                            "animation-duration": e
                        }))
                    }
                    , direction: function (n) {
                        n = n || C.get.direction(), n == v.inward ? C.set.inward() : C.set.outward()
                    }
                    , looping: function () {
                        C.debug("Transition set to loop"), A.addClass(v.looping)
                    }
                    , hidden: function () {
                        A.addClass(v.transition).addClass(v.hidden)
                    }
                    , inward: function () {
                        C.debug("Setting direction to inward"), A.removeClass(v.outward).addClass(v.inward)
                    }
                    , outward: function () {
                        C.debug("Setting direction to outward"), A.removeClass(v.inward).addClass(v.outward)
                    }
                    , visible: function () {
                        A.addClass(v.transition).addClass(v.visible)
                    }
                }
                , start: {
                    animation: function (n) {
                        n = n || C.get.animationClass(), C.debug("Starting tween", n), A.addClass(n).one(y + ".complete" + w, C.complete), f.useFailSafe && C.add.failSafe(), C.set.duration(f.duration), f.onStart.call(S)
                    }
                }
                , save: {
                    animation: function (n) {
                        C.cache || (C.cache = {}), C.cache.animation = n
                    }
                    , displayType: function (n) {
                        "none" !== n && A.data(b.displayType, n)
                    }
                    , transitionExists: function (e, i) {
                        n.fn.transition.exists[e] = i, C.verbose("Saving existence of transition", e, i)
                    }
                }
                , restore: {
                    conditions: function () {
                        var n = C.get.currentAnimation();
                        n && (A.removeClass(n), C.verbose("Removing animation class", C.cache)), C.remove.duration()
                    }
                }
                , add: {
                    failSafe: function () {
                        var n = C.get.duration();
                        C.timer = setTimeout(function () {
                            A.triggerHandler(y)
                        }, n + f.failSafeDelay), C.verbose("Adding fail safe timer", C.timer)
                    }
                }
                , remove: {
                    animating: function () {
                        A.removeClass(v.animating)
                    }
                    , animationCallbacks: function () {
                        C.remove.queueCallback(), C.remove.completeCallback()
                    }
                    , queueCallback: function () {
                        A.off(".queue" + w)
                    }
                    , completeCallback: function () {
                        A.off(".complete" + w)
                    }
                    , display: function () {
                        A.css("display", "")
                    }
                    , direction: function () {
                        A.removeClass(v.inward).removeClass(v.outward)
                    }
                    , duration: function () {
                        A.css("animation-duration", "")
                    }
                    , failSafe: function () {
                        C.verbose("Removing fail safe timer", C.timer), C.timer && clearTimeout(C.timer)
                    }
                    , hidden: function () {
                        A.removeClass(v.hidden)
                    }
                    , visible: function () {
                        A.removeClass(v.visible)
                    }
                    , looping: function () {
                        C.debug("Transitions are no longer looping"), C.is.looping() && (C.reset(), A.removeClass(v.looping))
                    }
                    , transition: function () {
                        A.removeClass(v.visible).removeClass(v.hidden)
                    }
                }
                , get: {
                    settings: function (e, i, t) {
                        return "object" == typeof e ? n.extend(!0, {}, n.fn.transition.settings, e) : "function" == typeof t ? n.extend({}, n.fn.transition.settings, {
                            animation: e
                            , onComplete: t
                            , duration: i
                        }) : "string" == typeof i || "number" == typeof i ? n.extend({}, n.fn.transition.settings, {
                            animation: e
                            , duration: i
                        }) : "object" == typeof i ? n.extend({}, n.fn.transition.settings, i, {
                            animation: e
                        }) : "function" == typeof i ? n.extend({}, n.fn.transition.settings, {
                            animation: e
                            , onComplete: i
                        }) : n.extend({}, n.fn.transition.settings, {
                            animation: e
                        })
                    }
                    , animationClass: function (n) {
                        var e = n || f.animation
                            , i = C.can.transition() && !C.has.direction() ? C.get.direction() + " " : "";
                        return v.animating + " " + v.transition + " " + i + e
                    }
                    , currentAnimation: function () {
                        return C.cache && C.cache.animation !== t ? C.cache.animation : !1
                    }
                    , currentDirection: function () {
                        return C.is.inward() ? v.inward : v.outward
                    }
                    , direction: function () {
                        return C.is.hidden() || !C.is.visible() ? v.inward : v.outward
                    }
                    , animationDirection: function (e) {
                        var i;
                        return e = e || f.animation, "string" == typeof e && (e = e.split(" "), n.each(e, function (n, e) {
                            e === v.inward ? i = v.inward : e === v.outward && (i = v.outward)
                        })), i ? i : !1
                    }
                    , duration: function (n) {
                        return n = n || f.duration, n === !1 && (n = A.css("animation-duration") || 0), "string" == typeof n ? n.indexOf("ms") > -1 ? parseFloat(n) : 1e3 * parseFloat(n) : n
                    }
                    , displayType: function () {
                        return f.displayType ? f.displayType : (A.data(b.displayType) === t && C.can.transition(!0), A.data(b.displayType))
                    }
                    , userStyle: function (n) {
                        return n = n || A.attr("style") || "", n.replace(/display.*?;/, "")
                    }
                    , transitionExists: function (e) {
                        return n.fn.transition.exists[e]
                    }
                    , animationStartEvent: function () {
                        var n, e = i.createElement("div")
                            , a = {
                                animation: "animationstart"
                                , OAnimation: "oAnimationStart"
                                , MozAnimation: "mozAnimationStart"
                                , WebkitAnimation: "webkitAnimationStart"
                            };
                        for (n in a)
                            if (e.style[n] !== t) return a[n];
                        return !1
                    }
                    , animationEndEvent: function () {
                        var n, e = i.createElement("div")
                            , a = {
                                animation: "animationend"
                                , OAnimation: "oAnimationEnd"
                                , MozAnimation: "mozAnimationEnd"
                                , WebkitAnimation: "webkitAnimationEnd"
                            };
                        for (n in a)
                            if (e.style[n] !== t) return a[n];
                        return !1
                    }
                }
                , can: {
                    transition: function (e) {
                        var i, a, o, r, s, l, u, c = f.animation
                            , d = C.get.transitionExists(c);
                        if (d === t || e) {
                            if (C.verbose("Determining whether animation exists"), i = A.attr("class"), a = A.prop("tagName"), o = n("<" + a + " />").addClass(i).insertAfter(A), r = o.addClass(c).removeClass(v.inward).removeClass(v.outward).addClass(v.animating).addClass(v.transition).css("animationName"), s = o.addClass(v.inward).css("animationName"), u = o.attr("class", i).removeAttr("style").removeClass(v.hidden).removeClass(v.visible).show().css("display"), C.verbose("Determining final display state", u), C.save.displayType(u), o.remove(), r != s) C.debug("Direction exists for animation", c), l = !0;
                            else {
                                if ("none" == r || !r) return void C.debug("No animation defined in css", c);
                                C.debug("Static animation found", c, u), l = !1
                            }
                            C.save.transitionExists(c, l)
                        }
                        return d !== t ? d : l
                    }
                    , animate: function () {
                        return C.can.transition() !== t
                    }
                }
                , is: {
                    animating: function () {
                        return A.hasClass(v.animating)
                    }
                    , inward: function () {
                        return A.hasClass(v.inward)
                    }
                    , outward: function () {
                        return A.hasClass(v.outward)
                    }
                    , looping: function () {
                        return A.hasClass(v.looping)
                    }
                    , occurring: function (n) {
                        return n = n || f.animation, n = "." + n.replace(" ", "."), A.filter(n).length > 0
                    }
                    , visible: function () {
                        return A.is(":visible")
                    }
                    , hidden: function () {
                        return "hidden" === A.css("visibility")
                    }
                    , supported: function () {
                        return y !== !1
                    }
                }
                , hide: function () {
                    C.verbose("Hiding element"), C.is.animating() && C.reset(), S.blur(), C.remove.display(), C.remove.visible(), C.set.hidden(), C.force.hidden(), f.onHide.call(S), f.onComplete.call(S)
                }
                , show: function (n) {
                    C.verbose("Showing element", n), C.remove.hidden(), C.set.visible(), C.force.visible(), f.onShow.call(S), f.onComplete.call(S)
                }
                , toggle: function () {
                    C.is.visible() ? C.hide() : C.show()
                }
                , stop: function () {
                    C.debug("Stopping current animation"), A.triggerHandler(y)
                }
                , stopAll: function () {
                    C.debug("Stopping all animation"), C.remove.queueCallback(), A.triggerHandler(y)
                }
                , clear: {
                    queue: function () {
                        C.debug("Clearing animation queue"), C.remove.queueCallback()
                    }
                }
                , enable: function () {
                    C.verbose("Starting animation"), A.removeClass(v.disabled)
                }
                , disable: function () {
                    C.debug("Stopping animation"), A.addClass(v.disabled)
                }
                , setting: function (e, i) {
                    if (C.debug("Changing setting", e, i), n.isPlainObject(e)) n.extend(!0, f, e);
                    else {
                        if (i === t) return f[e];
                        f[e] = i
                    }
                }
                , internal: function (e, i) {
                    if (n.isPlainObject(e)) n.extend(!0, C, e);
                    else {
                        if (i === t) return C[e];
                        C[e] = i
                    }
                }
                , debug: function () {
                    f.debug && (f.performance ? C.performance.log(arguments) : (C.debug = Function.prototype.bind.call(console.info, console, f.name + ":"), C.debug.apply(console, arguments)))
                }
                , verbose: function () {
                    f.verbose && f.debug && (f.performance ? C.performance.log(arguments) : (C.verbose = Function.prototype.bind.call(console.info, console, f.name + ":"), C.verbose.apply(console, arguments)))
                }
                , error: function () {
                    C.error = Function.prototype.bind.call(console.error, console, f.name + ":"), C.error.apply(console, arguments)
                }
                , performance: {
                    log: function (n) {
                        var e, i, t;
                        f.performance && (e = (new Date).getTime(), t = s || e, i = e - t, s = e, l.push({
                            Name: n[0]
                            , Arguments: [].slice.call(n, 1) || ""
                            , Element: S
                            , "Execution Time": i
                        })), clearTimeout(C.performance.timer), C.performance.timer = setTimeout(C.performance.display, 500)
                    }
                    , display: function () {
                        var e = f.name + ":"
                            , i = 0;
                        s = !1, clearTimeout(C.performance.timer), n.each(l, function (n, e) {
                            i += e["Execution Time"]
                        }), e += " " + i + "ms", r && (e += " '" + r + "'"), o.length > 1 && (e += " (" + o.length + ")"), (console.group !== t || console.table !== t) && l.length > 0 && (console.groupCollapsed(e), console.table ? console.table(l) : n.each(l, function (n, e) {
                            console.log(e.Name + ": " + e["Execution Time"] + "ms")
                        }), console.groupEnd()), l = []
                    }
                }
                , invoke: function (e, i, o) {
                    var r, s, l, u = p;
                    return i = i || d, o = S || o, "string" == typeof e && u !== t && (e = e.split(/[\. ]/), r = e.length - 1, n.each(e, function (i, a) {
                        var o = i != r ? a + e[i + 1].charAt(0).toUpperCase() + e[i + 1].slice(1) : e;
                        if (n.isPlainObject(u[o]) && i != r) u = u[o];
                        else {
                            if (u[o] !== t) return s = u[o], !1;
                            if (!n.isPlainObject(u[a]) || i == r) return u[a] !== t ? (s = u[a], !1) : !1;
                            u = u[a]
                        }
                    })), n.isFunction(s) ? l = s.apply(o, i) : s !== t && (l = s), n.isArray(a) ? a.push(l) : a !== t ? a = [a, l] : l !== t && (a = l), s !== t ? s : !1
                }
            }, C.initialize()
        }), a !== t ? a : this
    }, n.fn.transition.exists = {}, n.fn.transition.settings = {
        name: "Transition"
        , debug: !1
        , verbose: !1
        , performance: !0
        , namespace: "transition"
        , interval: 0
        , reverse: "auto"
        , onStart: function () {}
        , onComplete: function () {}
        , onShow: function () {}
        , onHide: function () {}
        , useFailSafe: !0
        , failSafeDelay: 100
        , allowRepeats: !1
        , displayType: !1
        , animation: "fade"
        , duration: !1
        , queue: !0
        , metadata: {
            displayType: "display"
        }
        , className: {
            animating: "animating"
            , disabled: "disabled"
            , hidden: "hidden"
            , inward: "in"
            , loading: "loading"
            , looping: "looping"
            , outward: "out"
            , transition: "transition"
            , visible: "visible"
        }
        , error: {
            noAnimation: "Element is no longer attached to DOM. Unable to animate."
            , repeated: "That animation is already occurring, cancelling repeated animation"
            , method: "The method you called is not defined"
            , support: "This browser does not support CSS animations"
        }
    }
}(jQuery, window, document);
/*!
 * # Semantic UI 2.1.7 - Dropdown
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
! function (e, t, n, i) {
    "use strict";
    e.fn.dropdown = function (a) {
        var o, s = e(this)
            , r = e(n)
            , l = s.selector || ""
            , c = "ontouchstart" in n.documentElement
            , u = (new Date).getTime()
            , d = []
            , v = arguments[0]
            , m = "string" == typeof v
            , f = [].slice.call(arguments, 1);
        return s.each(function (h) {
            var g, p, b, w, x, C, S, y = e.isPlainObject(a) ? e.extend(!0, {}, e.fn.dropdown.settings, a) : e.extend({}, e.fn.dropdown.settings)
                , T = y.className
                , A = y.message
                , k = y.fields
                , L = y.keys
                , D = y.metadata
                , I = y.namespace
                , R = y.regExp
                , q = y.selector
                , V = y.error
                , E = y.templates
                , O = "." + I
                , F = "module-" + I
                , P = e(this)
                , M = e(y.context)
                , H = P.find(q.text)
                , z = P.find(q.search)
                , j = P.find(q.input)
                , U = P.find(q.icon)
                , N = P.prev().find(q.text).length > 0 ? P.prev().find(q.text) : P.prev()
                , B = P.children(q.menu)
                , W = B.find(q.item)
                , K = !1
                , $ = !1
                , Q = !1
                , Y = this
                , G = P.data(F);
            S = {
                initialize: function () {
                    S.debug("Initializing dropdown", y), S.is.alreadySetup() ? S.setup.reference() : (S.setup.layout(), S.refreshData(), S.save.defaults(), S.restore.selected(), S.create.id(), S.bind.events(), S.observeChanges(), S.instantiate())
                }
                , instantiate: function () {
                    S.verbose("Storing instance of dropdown", S), G = S, P.data(F, S)
                }
                , destroy: function () {
                    S.verbose("Destroying previous dropdown", P), S.remove.tabbable(), P.off(O).removeData(F), B.off(O), r.off(b), x && x.disconnect(), C && C.disconnect()
                }
                , observeChanges: function () {
                    "MutationObserver" in t && (x = new MutationObserver(function (e) {
                        S.debug("<select> modified, recreating menu"), S.setup.select()
                    }), C = new MutationObserver(function (e) {
                        S.debug("Menu modified, updating selector cache"), S.refresh()
                    }), S.has.input() && x.observe(j[0], {
                        childList: !0
                        , subtree: !0
                    }), S.has.menu() && C.observe(B[0], {
                        childList: !0
                        , subtree: !0
                    }), S.debug("Setting up mutation observer", x, C))
                }
                , create: {
                    id: function () {
                        w = (Math.random().toString(16) + "000000000").substr(2, 8), b = "." + w, S.verbose("Creating unique id for element", w)
                    }
                    , userChoice: function (t) {
                        var n, a, o;
                        return (t = t || S.get.userValues()) ? (t = e.isArray(t) ? t : [t], e.each(t, function (t, s) {
                            S.get.item(s) === !1 && (o = y.templates.addition(S.add.variables(A.addResult, s)), a = e("<div />").html(o).attr("data-" + D.value, s).attr("data-" + D.text, s).addClass(T.addition).addClass(T.item), n = n === i ? a : n.add(a), S.verbose("Creating user choices for value", s, a))
                        }), n) : !1
                    }
                    , userLabels: function (t) {
                        var n = S.get.userValues();
                        n && (S.debug("Adding user labels", n), e.each(n, function (e, t) {
                            S.verbose("Adding custom user value"), S.add.label(t, t)
                        }))
                    }
                    , menu: function () {
                        B = e("<div />").addClass(T.menu).appendTo(P)
                    }
                }
                , search: function (e) {
                    e = e !== i ? e : S.get.query(), S.verbose("Searching for query", e), S.filter(e)
                }
                , select: {
                    firstUnfiltered: function () {
                        S.verbose("Selecting first non-filtered element"), S.remove.selectedItem(), W.not(q.unselectable).eq(0).addClass(T.selected)
                    }
                    , nextAvailable: function (e) {
                        e = e.eq(0);
                        var t = e.nextAll(q.item).not(q.unselectable).eq(0)
                            , n = e.prevAll(q.item).not(q.unselectable).eq(0)
                            , i = t.length > 0;
                        i ? (S.verbose("Moving selection to", t), t.addClass(T.selected)) : (S.verbose("Moving selection to", n), n.addClass(T.selected))
                    }
                }
                , setup: {
                    api: function () {
                        var e = {
                            debug: y.debug
                            , on: !1
                        };
                        S.verbose("First request, initializing API"), P.api(e)
                    }
                    , layout: function () {
                        P.is("select") && (S.setup.select(), S.setup.returnedObject()), S.has.menu() || S.create.menu(), S.is.search() && !S.has.search() && (S.verbose("Adding search input"), z = e("<input />").addClass(T.search).prop("autocomplete", "off").insertBefore(H)), y.allowTab && S.set.tabbable()
                    }
                    , select: function () {
                        var t = S.get.selectValues();
                        S.debug("Dropdown initialized on a select", t), P.is("select") && (j = P), j.parent(q.dropdown).length > 0 ? (S.debug("UI dropdown already exists. Creating dropdown menu only"), P = j.closest(q.dropdown), S.has.menu() || S.create.menu(), B = P.children(q.menu), S.setup.menu(t)) : (S.debug("Creating entire dropdown from select"), P = e("<div />").attr("class", j.attr("class")).addClass(T.selection).addClass(T.dropdown).html(E.dropdown(t)).insertBefore(j), j.hasClass(T.multiple) && j.prop("multiple") === !1 && (S.error(V.missingMultiple), j.prop("multiple", !0)), j.is("[multiple]") && S.set.multiple(), j.prop("disabled") && (S.debug("Disabling dropdown"), P.addClass(T.disabled)), j.removeAttr("class").detach().prependTo(P)), S.refresh()
                    }
                    , menu: function (e) {
                        B.html(E.menu(e, k)), W = B.find(q.item)
                    }
                    , reference: function () {
                        S.debug("Dropdown behavior was called on select, replacing with closest dropdown"), P = P.parent(q.dropdown), S.refresh(), S.setup.returnedObject(), m && (G = S, S.invoke(v))
                    }
                    , returnedObject: function () {
                        var e = s.slice(0, h)
                            , t = s.slice(h + 1);
                        s = e.add(P).add(t)
                    }
                }
                , refresh: function () {
                    S.refreshSelectors(), S.refreshData()
                }
                , refreshSelectors: function () {
                    S.verbose("Refreshing selector cache"), H = P.find(q.text), z = P.find(q.search), j = P.find(q.input), U = P.find(q.icon), N = P.prev().find(q.text).length > 0 ? P.prev().find(q.text) : P.prev(), B = P.children(q.menu), W = B.find(q.item)
                }
                , refreshData: function () {
                    S.verbose("Refreshing cached metadata"), W.removeData(D.text).removeData(D.value), P.removeData(D.defaultText).removeData(D.defaultValue).removeData(D.placeholderText)
                }
                , toggle: function () {
                    S.verbose("Toggling menu visibility"), S.is.active() ? S.hide() : S.show()
                }
                , show: function (t) {
                    if (t = e.isFunction(t) ? t : function () {}, S.can.show() && !S.is.active()) {
                        if (S.debug("Showing dropdown"), S.is.multiple() && !S.has.search() && S.is.allFiltered()) return !0;
                        !S.has.message() || S.has.maxSelections() || S.has.allResultsFiltered() || S.remove.message(), y.onShow.call(Y) !== !1 && S.animate.show(function () {
                            S.can.click() && S.bind.intent(), S.set.visible(), t.call(Y)
                        })
                    }
                }
                , hide: function (t) {
                    t = e.isFunction(t) ? t : function () {}, S.is.active() && (S.debug("Hiding dropdown"), y.onHide.call(Y) !== !1 && S.animate.hide(function () {
                        S.remove.visible(), t.call(Y)
                    }))
                }
                , hideOthers: function () {
                    S.verbose("Finding other dropdowns to hide"), s.not(P).has(q.menu + "." + T.visible).dropdown("hide")
                }
                , hideMenu: function () {
                    S.verbose("Hiding menu  instantaneously"), S.remove.active(), S.remove.visible(), B.transition("hide")
                }
                , hideSubMenus: function () {
                    var e = B.children(q.item).find(q.menu);
                    S.verbose("Hiding sub menus", e), e.transition("hide")
                }
                , bind: {
                    events: function () {
                        c && S.bind.touchEvents(), S.bind.keyboardEvents(), S.bind.inputEvents(), S.bind.mouseEvents()
                    }
                    , touchEvents: function () {
                        S.debug("Touch device detected binding additional touch events"), S.is.searchSelection() || S.is.single() && P.on("touchstart" + O, S.event.test.toggle), B.on("touchstart" + O, q.item, S.event.item.mouseenter)
                    }
                    , keyboardEvents: function () {
                        S.verbose("Binding keyboard events"), P.on("keydown" + O, S.event.keydown), S.has.search() && P.on(S.get.inputEvent() + O, q.search, S.event.input), S.is.multiple() && r.on("keydown" + b, S.event.document.keydown)
                    }
                    , inputEvents: function () {
                        S.verbose("Binding input change events"), P.on("change" + O, q.input, S.event.change)
                    }
                    , mouseEvents: function () {
                        S.verbose("Binding mouse events"), S.is.multiple() && P.on("click" + O, q.label, S.event.label.click).on("click" + O, q.remove, S.event.remove.click), S.is.searchSelection() ? (P.on("mousedown" + O, q.menu, S.event.menu.mousedown).on("mouseup" + O, q.menu, S.event.menu.mouseup).on("click" + O, q.icon, S.event.icon.click).on("click" + O, q.search, S.show).on("focus" + O, q.search, S.event.search.focus).on("blur" + O, q.search, S.event.search.blur).on("click" + O, q.text, S.event.text.focus), S.is.multiple() && P.on("click" + O, S.event.click)) : ("click" == y.on ? P.on("click" + O, q.icon, S.event.icon.click).on("click" + O, S.event.test.toggle) : "hover" == y.on ? P.on("mouseenter" + O, S.delay.show).on("mouseleave" + O, S.delay.hide) : P.on(y.on + O, S.toggle), P.on("mousedown" + O, S.event.mousedown).on("mouseup" + O, S.event.mouseup).on("focus" + O, S.event.focus).on("blur" + O, S.event.blur)), B.on("mouseenter" + O, q.item, S.event.item.mouseenter).on("mouseleave" + O, q.item, S.event.item.mouseleave).on("click" + O, q.item, S.event.item.click)
                    }
                    , intent: function () {
                        S.verbose("Binding hide intent event to document"), c && r.on("touchstart" + b, S.event.test.touch).on("touchmove" + b, S.event.test.touch), r.on("click" + b, S.event.test.hide)
                    }
                }
                , unbind: {
                    intent: function () {
                        S.verbose("Removing hide intent event from document"), c && r.off("touchstart" + b).off("touchmove" + b), r.off("click" + b)
                    }
                }
                , filter: function (e) {
                    var t = e !== i ? e : S.get.query()
                        , n = function () {
                            S.is.multiple() && S.filterActive(), S.select.firstUnfiltered(), S.has.allResultsFiltered() ? y.onNoResults.call(Y, t) ? y.allowAdditions || (S.verbose("All items filtered, showing message", t), S.add.message(A.noResults)) : (S.verbose("All items filtered, hiding dropdown", t), S.hideMenu()) : S.remove.message(), y.allowAdditions && S.add.userSuggestion(e), S.is.searchSelection() && S.can.show() && S.is.focusedOnSearch() && S.show()
                        };
                    y.useLabels && S.has.maxSelections() || (y.apiSettings ? S.can.useAPI() ? S.queryRemote(t, function () {
                        n()
                    }) : S.error(V.noAPI) : (S.filterItems(t), n()))
                }
                , queryRemote: function (t, n) {
                    var i = {
                        errorDuration: !1
                        , throttle: y.throttle
                        , urlData: {
                            query: t
                        }
                        , onError: function () {
                            S.add.message(A.serverError), n()
                        }
                        , onFailure: function () {
                            S.add.message(A.serverError), n()
                        }
                        , onSuccess: function (e) {
                            S.remove.message(), S.setup.menu({
                                values: e[k.remoteValues]
                            }), n()
                        }
                    };
                    P.api("get request") || S.setup.api(), i = e.extend(!0, {}, i, y.apiSettings), P.api("setting", i).api("query")
                }
                , filterItems: function (t) {
                    var n = t !== i ? t : S.get.query()
                        , a = null
                        , o = S.escape.regExp(n)
                        , s = new RegExp("^" + o, "igm");
                    S.has.query() && (a = [], S.verbose("Searching for matching values", n), W.each(function () {
                        var t, i, o = e(this);
                        if ("both" == y.match || "text" == y.match) {
                            if (t = String(S.get.choiceText(o, !1)), -1 !== t.search(s)) return a.push(this), !0;
                            if (y.fullTextSearch && S.fuzzySearch(n, t)) return a.push(this), !0
                        }
                        if ("both" == y.match || "value" == y.match) {
                            if (i = String(S.get.choiceValue(o, t)), -1 !== i.search(s)) return a.push(this), !0;
                            if (y.fullTextSearch && S.fuzzySearch(n, i)) return a.push(this), !0
                        }
                    })), S.debug("Showing only matched items", n), S.remove.filteredItem(), a && W.not(a).addClass(T.filtered)
                }
                , fuzzySearch: function (e, t) {
                    var n = t.length
                        , i = e.length;
                    if (e = e.toLowerCase(), t = t.toLowerCase(), i > n) return !1;
                    if (i === n) return e === t;
                    e: for (var a = 0, o = 0; i > a; a++) {
                        for (var s = e.charCodeAt(a); n > o;)
                            if (t.charCodeAt(o++) === s) continue e;
                        return !1
                    }
                    return !0
                }
                , filterActive: function () {
                    y.useLabels && W.filter("." + T.active).addClass(T.filtered)
                }
                , focusSearch: function () {
                    S.is.search() && !S.is.focusedOnSearch() && z[0].focus()
                }
                , forceSelection: function () {
                    var e = W.not(T.filtered).filter("." + T.selected).eq(0)
                        , t = W.not(T.filtered).filter("." + T.active).eq(0)
                        , n = e.length > 0 ? e : t
                        , i = n.size() > 0;
                    if (S.has.query()) {
                        if (i) return S.debug("Forcing partial selection to selected item", n), void S.event.item.click.call(n);
                        S.remove.searchTerm()
                    }
                    S.hide()
                }
                , event: {
                    change: function () {
                        Q || (S.debug("Input changed, updating selection"), S.set.selected())
                    }
                    , focus: function () {
                        y.showOnFocus && !K && S.is.hidden() && !p && S.show()
                    }
                    , click: function (t) {
                        var n = e(t.target);
                        n.is(P) && !S.is.focusedOnSearch() && S.focusSearch()
                    }
                    , blur: function (e) {
                        p = n.activeElement === this, K || p || (S.remove.activeLabel(), S.hide())
                    }
                    , mousedown: function () {
                        K = !0
                    }
                    , mouseup: function () {
                        K = !1
                    }
                    , search: {
                        focus: function () {
                            K = !0, S.is.multiple() && S.remove.activeLabel(), y.showOnFocus && (S.search(), S.show())
                        }
                        , blur: function (e) {
                            p = n.activeElement === this, $ || p ? p && y.forceSelection && S.forceSelection() : S.is.multiple() ? (S.remove.activeLabel(), S.hide()) : y.forceSelection ? S.forceSelection() : S.hide()
                        }
                    }
                    , icon: {
                        click: function (e) {
                            S.toggle(), e.stopPropagation()
                        }
                    }
                    , text: {
                        focus: function (e) {
                            K = !0, S.focusSearch()
                        }
                    }
                    , input: function (e) {
                        (S.is.multiple() || S.is.searchSelection()) && S.set.filtered(), clearTimeout(S.timer), S.timer = setTimeout(S.search, y.delay.search)
                    }
                    , label: {
                        click: function (t) {
                            var n = e(this)
                                , i = P.find(q.label)
                                , a = i.filter("." + T.active)
                                , o = n.nextAll("." + T.active)
                                , s = n.prevAll("." + T.active)
                                , r = o.length > 0 ? n.nextUntil(o).add(a).add(n) : n.prevUntil(s).add(a).add(n);
                            t.shiftKey ? (a.removeClass(T.active), r.addClass(T.active)) : t.ctrlKey ? n.toggleClass(T.active) : (a.removeClass(T.active), n.addClass(T.active)), y.onLabelSelect.apply(this, i.filter("." + T.active))
                        }
                    }
                    , remove: {
                        click: function () {
                            var t = e(this).parent();
                            t.hasClass(T.active) ? S.remove.activeLabels() : S.remove.activeLabels(t)
                        }
                    }
                    , test: {
                        toggle: function (e) {
                            var t = S.is.multiple() ? S.show : S.toggle;
                            S.determine.eventOnElement(e, t) && e.preventDefault()
                        }
                        , touch: function (e) {
                            S.determine.eventOnElement(e, function () {
                                "touchstart" == e.type ? S.timer = setTimeout(function () {
                                    S.hide()
                                }, y.delay.touch) : "touchmove" == e.type && clearTimeout(S.timer)
                            }), e.stopPropagation()
                        }
                        , hide: function (e) {
                            S.determine.eventInModule(e, S.hide)
                        }
                    }
                    , menu: {
                        mousedown: function () {
                            $ = !0
                        }
                        , mouseup: function () {
                            $ = !1
                        }
                    }
                    , item: {
                        mouseenter: function (t) {
                            var n = e(this).children(q.menu)
                                , i = e(this).siblings(q.item).children(q.menu);
                            n.length > 0 && (clearTimeout(S.itemTimer), S.itemTimer = setTimeout(function () {
                                S.verbose("Showing sub-menu", n), e.each(i, function () {
                                    S.animate.hide(!1, e(this))
                                }), S.animate.show(!1, n)
                            }, y.delay.show), t.preventDefault())
                        }
                        , mouseleave: function (t) {
                            var n = e(this).children(q.menu);
                            n.length > 0 && (clearTimeout(S.itemTimer), S.itemTimer = setTimeout(function () {
                                S.verbose("Hiding sub-menu", n), S.animate.hide(!1, n)
                            }, y.delay.hide))
                        }
                        , touchend: function () {}
                        , click: function (t) {
                            var n = e(this)
                                , i = e(t ? t.target : "")
                                , a = n.find(q.menu)
                                , o = S.get.choiceText(n)
                                , s = S.get.choiceValue(n, o)
                                , r = a.length > 0
                                , l = a.find(i).length > 0;
                            l || r && !y.allowCategorySelection || (y.useLabels || (S.remove.filteredItem(), S.remove.searchTerm(), S.set.scrollPosition(n)), S.determine.selectAction.call(this, o, s))
                        }
                    }
                    , document: {
                        keydown: function (e) {
                            var t = e.which
                                , n = S.is.inObject(t, L);
                            if (n) {
                                var i = P.find(q.label)
                                    , a = i.filter("." + T.active)
                                    , o = (a.data(D.value), i.index(a))
                                    , s = i.length
                                    , r = a.length > 0
                                    , l = a.length > 1
                                    , c = 0 === o
                                    , u = o + 1 == s
                                    , d = S.is.searchSelection()
                                    , v = S.is.focusedOnSearch()
                                    , m = S.is.focused()
                                    , f = v && 0 === S.get.caretPosition();
                                if (d && !r && !v) return;
                                t == L.leftArrow ? !m && !f || r ? r && (e.shiftKey ? S.verbose("Adding previous label to selection") : (S.verbose("Selecting previous label"), i.removeClass(T.active)), c && !l ? a.addClass(T.active) : a.prev(q.siblingLabel).addClass(T.active).end(), e.preventDefault()) : (S.verbose("Selecting previous label"), i.last().addClass(T.active)) : t == L.rightArrow ? (m && !r && i.first().addClass(T.active), r && (e.shiftKey ? S.verbose("Adding next label to selection") : (S.verbose("Selecting next label"), i.removeClass(T.active)), u ? d ? v ? i.removeClass(T.active) : S.focusSearch() : l ? a.next(q.siblingLabel).addClass(T.active) : a.addClass(T.active) : a.next(q.siblingLabel).addClass(T.active), e.preventDefault())) : t == L.deleteKey || t == L.backspace ? r ? (S.verbose("Removing active labels"), u && d && !v && S.focusSearch(), a.last().next(q.siblingLabel).addClass(T.active), S.remove.activeLabels(a), e.preventDefault()) : f && !r && t == L.backspace && (S.verbose("Removing last label on input backspace"), a = i.last().addClass(T.active), S.remove.activeLabels(a)) : a.removeClass(T.active)
                            }
                        }
                    }
                    , keydown: function (e) {
                        var t = e.which
                            , n = S.is.inObject(t, L);
                        if (n) {
                            var i, a, o = W.not(q.unselectable).filter("." + T.selected).eq(0)
                                , s = B.children("." + T.active).eq(0)
                                , r = o.length > 0 ? o : s
                                , l = r.length > 0 ? r.siblings(":not(." + T.filtered + ")").andSelf() : B.children(":not(." + T.filtered + ")")
                                , c = r.children(q.menu)
                                , u = r.closest(q.menu)
                                , d = u.hasClass(T.visible) || u.hasClass(T.animating) || u.parent(q.menu).length > 0
                                , v = c.length > 0
                                , m = r.length > 0
                                , f = r.not(q.unselectable).length > 0
                                , h = t == L.delimiter && y.allowAdditions && S.is.multiple();
                            if (S.is.visible()) {
                                if ((t == L.enter || h) && (t == L.enter && m && v && !y.allowCategorySelection ? (S.verbose("Pressed enter on unselectable category, opening sub menu"), t = L.rightArrow) : f && (S.verbose("Selecting item from keyboard shortcut", r), S.event.item.click.call(r, e), S.is.searchSelection() && S.remove.searchTerm()), e.preventDefault()), t == L.leftArrow && (a = u[0] !== B[0], a && (S.verbose("Left key pressed, closing sub-menu"), S.animate.hide(!1, u), r.removeClass(T.selected), u.closest(q.item).addClass(T.selected), e.preventDefault())), t == L.rightArrow && v && (S.verbose("Right key pressed, opening sub-menu"), S.animate.show(!1, c), r.removeClass(T.selected), c.find(q.item).eq(0).addClass(T.selected), e.preventDefault()), t == L.upArrow) {
                                    if (i = m && d ? r.prevAll(q.item + ":not(" + q.unselectable + ")").eq(0) : W.eq(0), l.index(i) < 0) return S.verbose("Up key pressed but reached top of current menu"), void e.preventDefault();
                                    S.verbose("Up key pressed, changing active item"), r.removeClass(T.selected), i.addClass(T.selected), S.set.scrollPosition(i), e.preventDefault()
                                }
                                if (t == L.downArrow) {
                                    if (i = m && d ? i = r.nextAll(q.item + ":not(" + q.unselectable + ")").eq(0) : W.eq(0), 0 === i.length) return S.verbose("Down key pressed but reached bottom of current menu"), void e.preventDefault();
                                    S.verbose("Down key pressed, changing active item"), W.removeClass(T.selected), i.addClass(T.selected), S.set.scrollPosition(i), e.preventDefault()
                                }
                                t == L.pageUp && (S.scrollPage("up"), e.preventDefault()), t == L.pageDown && (S.scrollPage("down"), e.preventDefault()), t == L.escape && (S.verbose("Escape key pressed, closing dropdown"), S.hide())
                            }
                            else h && e.preventDefault(), t == L.downArrow && (S.verbose("Down key pressed, showing dropdown"), S.show(), e.preventDefault())
                        }
                        else S.is.selection() && !S.is.search() && S.set.selectedLetter(String.fromCharCode(t))
                    }
                }
                , trigger: {
                    change: function () {
                        var e = n.createEvent("HTMLEvents")
                            , t = j[0];
                        t && (S.verbose("Triggering native change event"), e.initEvent("change", !0, !1), t.dispatchEvent(e))
                    }
                }
                , determine: {
                    selectAction: function (t, n) {
                        S.verbose("Determining action", y.action), e.isFunction(S.action[y.action]) ? (S.verbose("Triggering preset action", y.action, t, n), S.action[y.action].call(this, t, n)) : e.isFunction(y.action) ? (S.verbose("Triggering user action", y.action, t, n), y.action.call(this, t, n)) : S.error(V.action, y.action)
                    }
                    , eventInModule: function (t, i) {
                        var a = e(t.target)
                            , o = a.closest(n.documentElement).length > 0
                            , s = a.closest(P).length > 0;
                        return i = e.isFunction(i) ? i : function () {}, o && !s ? (S.verbose("Triggering event", i), i(), !0) : (S.verbose("Event occurred in dropdown, canceling callback"), !1)
                    }
                    , eventOnElement: function (t, n) {
                        var i = e(t.target)
                            , a = i.closest(q.siblingLabel)
                            , o = 0 === P.find(a).length
                            , s = 0 === i.closest(B).length;
                        return n = e.isFunction(n) ? n : function () {}, o && s ? (S.verbose("Triggering event", n), n(), !0) : (S.verbose("Event occurred in dropdown menu, canceling callback"), !1)
                    }
                }
                , action: {
                    nothing: function () {}
                    , activate: function (t, n) {
                        if (n = n !== i ? n : t, S.can.activate(e(this))) {
                            if (S.set.selected(n, e(this)), S.is.multiple() && !S.is.allFiltered()) return;
                            S.hideAndClear()
                        }
                    }
                    , select: function (e, t) {
                        S.action.activate.call(this)
                    }
                    , combo: function (t, n) {
                        n = n !== i ? n : t, S.set.selected(n, e(this)), S.hideAndClear()
                    }
                    , hide: function (e, t) {
                        S.set.value(t), S.hideAndClear()
                    }
                }
                , get: {
                    id: function () {
                        return w
                    }
                    , defaultText: function () {
                        return P.data(D.defaultText)
                    }
                    , defaultValue: function () {
                        return P.data(D.defaultValue)
                    }
                    , placeholderText: function () {
                        return P.data(D.placeholderText) || ""
                    }
                    , text: function () {
                        return H.text()
                    }
                    , query: function () {
                        return e.trim(z.val())
                    }
                    , searchWidth: function (e) {
                        return e * y.glyphWidth + "em"
                    }
                    , selectionCount: function () {
                        var t, n = S.get.values();
                        return t = S.is.multiple() ? e.isArray(n) ? n.length : 0 : "" !== S.get.value() ? 1 : 0
                    }
                    , transition: function (e) {
                        return "auto" == y.transition ? S.is.upward(e) ? "slide up" : "slide down" : y.transition
                    }
                    , userValues: function () {
                        var t = S.get.values();
                        return t ? (t = e.isArray(t) ? t : [t], e.grep(t, function (e) {
                            return S.get.item(e) === !1
                        })) : !1
                    }
                    , uniqueArray: function (t) {
                        return e.grep(t, function (n, i) {
                            return e.inArray(n, t) === i
                        })
                    }
                    , caretPosition: function () {
                        var e, t, i = z.get(0);
                        return "selectionStart" in i ? i.selectionStart : n.selection ? (i.focus(), e = n.selection.createRange(), t = e.text.length, e.moveStart("character", -i.value.length), e.text.length - t) : void 0
                    }
                    , value: function () {
                        var t = j.length > 0 ? j.val() : P.data(D.value);
                        return e.isArray(t) && 1 === t.length && "" === t[0] ? "" : t
                    }
                    , values: function () {
                        var e = S.get.value();
                        return "" === e ? "" : !S.has.selectInput() && S.is.multiple() ? "string" == typeof e ? e.split(y.delimiter) : "" : e
                    }
                    , remoteValues: function () {
                        var t = S.get.values()
                            , n = !1;
                        return t && ("string" == typeof t && (t = [t]), n = {}, e.each(t, function (e, t) {
                            var i = S.read.remoteData(t);
                            S.verbose("Restoring value from session data", i, t), n[t] = i ? i : t
                        })), n
                    }
                    , choiceText: function (t, n) {
                        return n = n !== i ? n : y.preserveHTML, t ? (t.find(q.menu).length > 0 && (S.verbose("Retreiving text of element with sub-menu"), t = t.clone(), t.find(q.menu).remove(), t.find(q.menuIcon).remove()), t.data(D.text) !== i ? t.data(D.text) : n ? e.trim(t.html()) : e.trim(t.text())) : void 0
                    }
                    , choiceValue: function (t, n) {
                        return n = n || S.get.choiceText(t), t ? t.data(D.value) !== i ? String(t.data(D.value)) : "string" == typeof n ? e.trim(n.toLowerCase()) : String(n) : !1
                    }
                    , inputEvent: function () {
                        var e = z[0];
                        return e ? e.oninput !== i ? "input" : e.onpropertychange !== i ? "propertychange" : "keyup" : !1
                    }
                    , selectValues: function () {
                        var t = {};
                        return t.values = [], P.find("option").each(function () {
                            var n = e(this)
                                , a = n.html()
                                , o = n.attr("disabled")
                                , s = n.attr("value") !== i ? n.attr("value") : a;
                            "auto" === y.placeholder && "" === s ? t.placeholder = a : t.values.push({
                                name: a
                                , value: s
                                , disabled: o
                            })
                        }), y.placeholder && "auto" !== y.placeholder && (S.debug("Setting placeholder value to", y.placeholder), t.placeholder = y.placeholder), y.sortSelect ? (t.values.sort(function (e, t) {
                            return e.name > t.name ? 1 : -1
                        }), S.debug("Retrieved and sorted values from select", t)) : S.debug("Retreived values from select", t), t
                    }
                    , activeItem: function () {
                        return W.filter("." + T.active)
                    }
                    , selectedItem: function () {
                        var e = W.not(q.unselectable).filter("." + T.selected);
                        return e.length > 0 ? e : W.eq(0)
                    }
                    , itemWithAdditions: function (e) {
                        var t = S.get.item(e)
                            , n = S.create.userChoice(e)
                            , i = n && n.length > 0;
                        return i && (t = t.length > 0 ? t.add(n) : n), t
                    }
                    , item: function (t, n) {
                        var a, o, s = !1;
                        return t = t !== i ? t : S.get.values() !== i ? S.get.values() : S.get.text(), a = o ? t.length > 0 : t !== i && null !== t, o = S.is.multiple() && e.isArray(t), n = "" === t || 0 === t ? !0 : n || !1, a && W.each(function () {
                            var a = e(this)
                                , r = S.get.choiceText(a)
                                , l = S.get.choiceValue(a, r);
                            if (null !== l && l !== i)
                                if (o)(-1 !== e.inArray(String(l), t) || -1 !== e.inArray(r, t)) && (s = s ? s.add(a) : a);
                                else if (n) {
                                if (S.verbose("Ambiguous dropdown value using strict type check", a, t), l === t || r === t) return s = a, !0
                            }
                            else if (String(l) == String(t) || r == t) return S.verbose("Found select item by value", l, t), s = a, !0
                        }), s
                    }
                }
                , check: {
                    maxSelections: function (e) {
                        return y.maxSelections ? (e = e !== i ? e : S.get.selectionCount(), e >= y.maxSelections ? (S.debug("Maximum selection count reached"), y.useLabels && (W.addClass(T.filtered), S.add.message(A.maxSelections)), !0) : (S.verbose("No longer at maximum selection count"), S.remove.message(), S.remove.filteredItem(), S.is.searchSelection() && S.filterItems(), !1)) : !0
                    }
                }
                , restore: {
                    defaults: function () {
                        S.clear(), S.restore.defaultText(), S.restore.defaultValue()
                    }
                    , defaultText: function () {
                        var e = S.get.defaultText()
                            , t = S.get.placeholderText;
                        e === t ? (S.debug("Restoring default placeholder text", e), S.set.placeholderText(e)) : (S.debug("Restoring default text", e), S.set.text(e))
                    }
                    , defaultValue: function () {
                        var e = S.get.defaultValue();
                        e !== i && (S.debug("Restoring default value", e), "" !== e ? (S.set.value(e), S.set.selected()) : (S.remove.activeItem(), S.remove.selectedItem()))
                    }
                    , labels: function () {
                        y.allowAdditions && (y.useLabels || (S.error(V.labels), y.useLabels = !0), S.debug("Restoring selected values"), S.create.userLabels()), S.check.maxSelections()
                    }
                    , selected: function () {
                        S.restore.values(), S.is.multiple() ? (S.debug("Restoring previously selected values and labels"), S.restore.labels()) : S.debug("Restoring previously selected values")
                    }
                    , values: function () {
                        S.set.initialLoad(), y.apiSettings ? y.saveRemoteData ? S.restore.remoteValues() : S.clearValue() : S.set.selected(), S.remove.initialLoad()
                    }
                    , remoteValues: function () {
                        var t = S.get.remoteValues();
                        S.debug("Recreating selected from session data", t), t && (S.is.single() ? e.each(t, function (e, t) {
                            S.set.text(t)
                        }) : e.each(t, function (e, t) {
                            S.add.label(e, t)
                        }))
                    }
                }
                , read: {
                    remoteData: function (e) {
                        var n;
                        return t.Storage === i ? void S.error(V.noStorage) : (n = sessionStorage.getItem(e), n !== i ? n : !1)
                    }
                }
                , save: {
                    defaults: function () {
                        S.save.defaultText(), S.save.placeholderText(), S.save.defaultValue()
                    }
                    , defaultValue: function () {
                        var e = S.get.value();
                        S.verbose("Saving default value as", e), P.data(D.defaultValue, e)
                    }
                    , defaultText: function () {
                        var e = S.get.text();
                        S.verbose("Saving default text as", e), P.data(D.defaultText, e)
                    }
                    , placeholderText: function () {
                        var e;
                        y.placeholder !== !1 && H.hasClass(T.placeholder) && (e = S.get.text(), S.verbose("Saving placeholder text as", e), P.data(D.placeholderText, e))
                    }
                    , remoteData: function (e, n) {
                        return t.Storage === i ? void S.error(V.noStorage) : (S.verbose("Saving remote data to session storage", n, e), void sessionStorage.setItem(n, e))
                    }
                }
                , clear: function () {
                    S.is.multiple() ? S.remove.labels() : (S.remove.activeItem(), S.remove.selectedItem()), S.set.placeholderText(), S.clearValue()
                }
                , clearValue: function () {
                    S.set.value("")
                }
                , scrollPage: function (e, t) {
                    var n, i, a, o = t || S.get.selectedItem()
                        , s = o.closest(q.menu)
                        , r = s.outerHeight()
                        , l = s.scrollTop()
                        , c = W.eq(0).outerHeight()
                        , u = Math.floor(r / c)
                        , d = (s.prop("scrollHeight"), "up" == e ? l - c * u : l + c * u)
                        , v = W.not(q.unselectable);
                    a = "up" == e ? v.index(o) - u : v.index(o) + u, n = "up" == e ? a >= 0 : a < v.length, i = n ? v.eq(a) : "up" == e ? v.first() : v.last(), i.length > 0 && (S.debug("Scrolling page", e, i), o.removeClass(T.selected), i.addClass(T.selected), s.scrollTop(d))
                }
                , set: {
                    filtered: function () {
                        var e = S.is.multiple()
                            , t = S.is.searchSelection()
                            , n = e && t
                            , i = t ? S.get.query() : ""
                            , a = "string" == typeof i && i.length > 0
                            , o = S.get.searchWidth(i.length)
                            , s = "" !== i;
                        e && a && (S.verbose("Adjusting input width", o, y.glyphWidth), z.css("width", o)), a || n && s ? (S.verbose("Hiding placeholder text"), H.addClass(T.filtered)) : (!e || n && !s) && (S.verbose("Showing placeholder text"), H.removeClass(T.filtered))
                    }
                    , loading: function () {
                        P.addClass(T.loading)
                    }
                    , placeholderText: function (e) {
                        e = e || S.get.placeholderText(), S.debug("Setting placeholder text", e), S.set.text(e), H.addClass(T.placeholder)
                    }
                    , tabbable: function () {
                        S.has.search() ? (S.debug("Added tabindex to searchable dropdown"), z.val("").attr("tabindex", 0), B.attr("tabindex", -1)) : (S.debug("Added tabindex to dropdown"), P.attr("tabindex") === i && (P.attr("tabindex", 0), B.attr("tabindex", -1)))
                    }
                    , initialLoad: function () {
                        S.verbose("Setting initial load"), g = !0
                    }
                    , activeItem: function (e) {
                        y.allowAdditions && e.filter(q.addition).length > 0 ? e.addClass(T.filtered) : e.addClass(T.active)
                    }
                    , scrollPosition: function (e, t) {
                        var n, a, o, s, r, l, c, u, d, v = 5;
                        e = e || S.get.selectedItem(), n = e.closest(q.menu), a = e && e.length > 0, t = t !== i ? t : !1, e && n.length > 0 && a && (s = e.position().top, n.addClass(T.loading), l = n.scrollTop(), r = n.offset().top, s = e.offset().top, o = l - r + s, t || (c = n.height(), d = o + v > l + c, u = l > o - v), S.debug("Scrolling to active item", o), (t || u || d) && n.scrollTop(o), n.removeClass(T.loading))
                    }
                    , text: function (e) {
                        "select" !== y.action && ("combo" == y.action ? (S.debug("Changing combo button text", e, N), y.preserveHTML ? N.html(e) : N.text(e)) : (e !== S.get.placeholderText() && H.removeClass(T.placeholder), S.debug("Changing text", e, H), H.removeClass(T.filtered), y.preserveHTML ? H.html(e) : H.text(e)))
                    }
                    , selectedLetter: function (t) {
                        var n, i = W.filter("." + T.selected)
                            , a = i.length > 0 && S.has.firstLetter(i, t)
                            , o = !1;
                        a && (n = i.nextAll(W).eq(0), S.has.firstLetter(n, t) && (o = n)), o || W.each(function () {
                            return S.has.firstLetter(e(this), t) ? (o = e(this), !1) : void 0
                        }), o && (S.verbose("Scrolling to next value with letter", t), S.set.scrollPosition(o), i.removeClass(T.selected), o.addClass(T.selected))
                    }
                    , direction: function (e) {
                        "auto" == y.direction ? S.is.onScreen(e) ? S.remove.upward(e) : S.set.upward(e) : "upward" == y.direction && S.set.upward(e)
                    }
                    , upward: function (e) {
                        var t = e || P;
                        t.addClass(T.upward)
                    }
                    , value: function (e, t, n) {
                        var a = j.length > 0
                            , o = (!S.has.value(e), S.get.values())
                            , s = e !== i ? String(e) : e;
                        if (a) {
                            if (s == o && (S.verbose("Skipping value update already same value", e, o), !S.is.initialLoad())) return;
                            S.is.single() && S.has.selectInput() && S.can.extendSelect() && (S.debug("Adding user option", e), S.add.optionValue(e)), S.debug("Updating input value", e, o), Q = !0, j.val(e), y.fireOnInit === !1 && S.is.initialLoad() ? S.debug("Input native change event ignored on initial load") : S.trigger.change(), Q = !1
                        }
                        else S.verbose("Storing value in metadata", e, j), e !== o && P.data(D.value, s);
                        y.fireOnInit === !1 && S.is.initialLoad() ? S.verbose("No callback on initial load", y.onChange) : y.onChange.call(Y, e, t, n)
                    }
                    , active: function () {
                        P.addClass(T.active)
                    }
                    , multiple: function () {
                        P.addClass(T.multiple)
                    }
                    , visible: function () {
                        P.addClass(T.visible)
                    }
                    , exactly: function (e, t) {
                        S.debug("Setting selected to exact values"), S.clear(), S.set.selected(e, t)
                    }
                    , selected: function (t, n) {
                        var i = S.is.multiple();
                        n = y.allowAdditions ? n || S.get.itemWithAdditions(t) : n || S.get.item(t), n && (S.debug("Setting selected menu item to", n), S.is.single() ? (S.remove.activeItem(), S.remove.selectedItem()) : y.useLabels && S.remove.selectedItem(), n.each(function () {
                            var t = e(this)
                                , a = S.get.choiceText(t)
                                , o = S.get.choiceValue(t, a)
                                , s = t.hasClass(T.filtered)
                                , r = t.hasClass(T.active)
                                , l = t.hasClass(T.addition)
                                , c = i && 1 == n.length;
                            i ? !r || l ? (y.apiSettings && y.saveRemoteData && S.save.remoteData(a, o), y.useLabels ? (S.add.value(o, a, t), S.add.label(o, a, c), S.set.activeItem(t), S.filterActive(), S.select.nextAvailable(n)) : (S.add.value(o, a, t), S.set.text(S.add.variables(A.count)), S.set.activeItem(t))) : s || (S.debug("Selected active value, removing label"), S.remove.selected(o)) : (y.apiSettings && y.saveRemoteData && S.save.remoteData(a, o), S.set.text(a), S.set.value(o, a, t), t.addClass(T.active).addClass(T.selected))
                        }))
                    }
                }
                , add: {
                    label: function (t, n, i) {
                        var a, o = S.is.searchSelection() ? z : H;
                        return a = e("<a />").addClass(T.label).attr("data-value", t).html(E.label(t, n)), a = y.onLabelCreate.call(a, t, n), S.has.label(t) ? void S.debug("Label already exists, skipping", t) : (y.label.variation && a.addClass(y.label.variation), void(i === !0 ? (S.debug("Animating in label", a), a.addClass(T.hidden).insertBefore(o).transition(y.label.transition, y.label.duration)) : (S.debug("Adding selection label", a), a.insertBefore(o))))
                    }
                    , message: function (t) {
                        var n = B.children(q.message)
                            , i = y.templates.message(S.add.variables(t));
                        n.length > 0 ? n.html(i) : n = e("<div/>").html(i).addClass(T.message).appendTo(B)
                    }
                    , optionValue: function (t) {
                        var n = j.find('option[value="' + t + '"]')
                            , i = n.length > 0;
                        i || (x && (x.disconnect(), S.verbose("Temporarily disconnecting mutation observer", t)), S.is.single() && (S.verbose("Removing previous user addition"), j.find("option." + T.addition).remove()), e("<option/>").prop("value", t).addClass(T.addition).html(t).appendTo(j), S.verbose("Adding user addition as an <option>", t), x && x.observe(j[0], {
                            childList: !0
                            , subtree: !0
                        }))
                    }
                    , userSuggestion: function (e) {
                        var t, n = B.children(q.addition)
                            , i = S.get.item(e)
                            , a = i && i.not(q.addition).length
                            , o = n.length > 0;
                        if (!y.useLabels || !S.has.maxSelections()) {
                            if ("" === e || a) return void n.remove();
                            W.removeClass(T.selected), o ? (t = y.templates.addition(S.add.variables(A.addResult, e)), n.html(t).attr("data-" + D.value, e).attr("data-" + D.text, e).removeClass(T.filtered).addClass(T.selected), S.verbose("Replacing user suggestion with new value", n)) : (n = S.create.userChoice(e), n.prependTo(B).addClass(T.selected), S.verbose("Adding item choice to menu corresponding with user choice addition", n))
                        }
                    }
                    , variables: function (e, t) {
                        var n, i, a = -1 !== e.search("{count}")
                            , o = -1 !== e.search("{maxCount}")
                            , s = -1 !== e.search("{term}");
                        return S.verbose("Adding templated variables to message", e), a && (n = S.get.selectionCount(), e = e.replace("{count}", n)), o && (n = S.get.selectionCount(), e = e.replace("{maxCount}", y.maxSelections)), s && (i = t || S.get.query(), e = e.replace("{term}", i)), e
                    }
                    , value: function (t, n, i) {
                        var a, o = S.get.values();
                        return "" === t ? void S.debug("Cannot select blank values from multiselect") : (e.isArray(o) ? (a = o.concat([t]), a = S.get.uniqueArray(a)) : a = [t], S.has.selectInput() ? S.can.extendSelect() && (S.debug("Adding value to select", t, a, j), S.add.optionValue(t)) : (a = a.join(y.delimiter), S.debug("Setting hidden input to delimited value", a, j)), y.fireOnInit === !1 && S.is.initialLoad() ? S.verbose("Skipping onadd callback on initial load", y.onAdd) : y.onAdd.call(Y, t, n, i), S.set.value(a, t, n, i), void S.check.maxSelections())
                    }
                }
                , remove: {
                    active: function () {
                        P.removeClass(T.active)
                    }
                    , activeLabel: function () {
                        P.find(q.label).removeClass(T.active)
                    }
                    , loading: function () {
                        P.removeClass(T.loading)
                    }
                    , initialLoad: function () {
                        g = !1
                    }
                    , upward: function (e) {
                        var t = e || P;
                        t.removeClass(T.upward)
                    }
                    , visible: function () {
                        P.removeClass(T.visible)
                    }
                    , activeItem: function () {
                        W.removeClass(T.active)
                    }
                    , filteredItem: function () {
                        y.useLabels && S.has.maxSelections() || (y.useLabels && S.is.multiple() ? W.not("." + T.active).removeClass(T.filtered) : W.removeClass(T.filtered))
                    }
                    , optionValue: function (e) {
                        var t = j.find('option[value="' + e + '"]')
                            , n = t.length > 0;
                        n && t.hasClass(T.addition) && (x && (x.disconnect(), S.verbose("Temporarily disconnecting mutation observer", e)), t.remove(), S.verbose("Removing user addition as an <option>", e), x && x.observe(j[0], {
                            childList: !0
                            , subtree: !0
                        }))
                    }
                    , message: function () {
                        B.children(q.message).remove()
                    }
                    , searchTerm: function () {
                        S.verbose("Cleared search term"), z.val(""), S.set.filtered()
                    }
                    , selected: function (t, n) {
                        return (n = y.allowAdditions ? n || S.get.itemWithAdditions(t) : n || S.get.item(t)) ? void n.each(function () {
                            var t = e(this)
                                , n = S.get.choiceText(t)
                                , i = S.get.choiceValue(t, n);
                            S.is.multiple() ? y.useLabels ? (S.remove.value(i, n, t), S.remove.label(i)) : (S.remove.value(i, n, t), 0 === S.get.selectionCount() ? S.set.placeholderText() : S.set.text(S.add.variables(A.count))) : S.remove.value(i, n, t), t.removeClass(T.filtered).removeClass(T.active), y.useLabels && t.removeClass(T.selected)
                        }) : !1
                    }
                    , selectedItem: function () {
                        W.removeClass(T.selected)
                    }
                    , value: function (e, t, n) {
                        var i, a = S.get.values();
                        S.has.selectInput() ? (S.verbose("Input is <select> removing selected option", e), i = S.remove.arrayValue(e, a), S.remove.optionValue(e)) : (S.verbose("Removing from delimited values", e), i = S.remove.arrayValue(e, a), i = i.join(y.delimiter)), y.fireOnInit === !1 && S.is.initialLoad() ? S.verbose("No callback on initial load", y.onRemove) : y.onRemove.call(Y, e, t, n), S.set.value(i, t, n), S.check.maxSelections()
                    }
                    , arrayValue: function (t, n) {
                        return e.isArray(n) || (n = [n]), n = e.grep(n, function (e) {
                            return t != e
                        }), S.verbose("Removed value from delimited string", t, n), n
                    }
                    , label: function (e, t) {
                        var n = P.find(q.label)
                            , i = n.filter('[data-value="' + e + '"]');
                        S.verbose("Removing label", i), i.remove()
                    }
                    , activeLabels: function (e) {
                        e = e || P.find(q.label).filter("." + T.active), S.verbose("Removing active label selections", e), S.remove.labels(e)
                    }
                    , labels: function (t) {
                        t = t || P.find(q.label), S.verbose("Removing labels", t), t.each(function () {
                            var t = e(this)
                                , n = t.data(D.value)
                                , a = n !== i ? String(n) : n
                                , o = S.is.userValue(a);
                            return y.onLabelRemove.call(t, n) === !1 ? void S.debug("Label remove callback cancelled removal") : void(o ? (S.remove.value(a), S.remove.label(a)) : S.remove.selected(a))
                        })
                    }
                    , tabbable: function () {
                        S.has.search() ? (S.debug("Searchable dropdown initialized"), z.removeAttr("tabindex"), B.removeAttr("tabindex")) : (S.debug("Simple selection dropdown initialized"), P.removeAttr("tabindex"), B.removeAttr("tabindex"))
                    }
                }
                , has: {
                    search: function () {
                        return z.length > 0
                    }
                    , selectInput: function () {
                        return j.is("select")
                    }
                    , firstLetter: function (e, t) {
                        var n, i;
                        return e && 0 !== e.length && "string" == typeof t ? (n = S.get.choiceText(e, !1), t = t.toLowerCase(), i = String(n).charAt(0).toLowerCase(), t == i) : !1
                    }
                    , input: function () {
                        return j.length > 0
                    }
                    , items: function () {
                        return W.length > 0
                    }
                    , menu: function () {
                        return B.length > 0
                    }
                    , message: function () {
                        return 0 !== B.children(q.message).length
                    }
                    , label: function (e) {
                        var t = P.find(q.label);
                        return t.filter('[data-value="' + e + '"]').length > 0
                    }
                    , maxSelections: function () {
                        return y.maxSelections && S.get.selectionCount() >= y.maxSelections
                    }
                    , allResultsFiltered: function () {
                        return W.filter(q.unselectable).length === W.length
                    }
                    , query: function () {
                        return "" !== S.get.query()
                    }
                    , value: function (t) {
                        var n = S.get.values()
                            , i = e.isArray(n) ? n && -1 !== e.inArray(t, n) : n == t;
                        return i ? !0 : !1
                    }
                }
                , is: {
                    active: function () {
                        return P.hasClass(T.active)
                    }
                    , alreadySetup: function () {
                        return P.is("select") && P.parent(q.dropdown).length > 0 && 0 === P.prev().length
                    }
                    , animating: function (e) {
                        return e ? e.transition && e.transition("is animating") : B.transition && B.transition("is animating")
                    }
                    , disabled: function () {
                        return P.hasClass(T.disabled)
                    }
                    , focused: function () {
                        return n.activeElement === P[0]
                    }
                    , focusedOnSearch: function () {
                        return n.activeElement === z[0]
                    }
                    , allFiltered: function () {
                        return (S.is.multiple() || S.has.search()) && !S.has.message() && S.has.allResultsFiltered()
                    }
                    , hidden: function (e) {
                        return !S.is.visible(e)
                    }
                    , initialLoad: function () {
                        return g
                    }
                    , onScreen: function (e) {
                        var t, n = e || B
                            , i = !0
                            , a = {};
                        return n.addClass(T.loading), t = {
                            context: {
                                scrollTop: M.scrollTop()
                                , height: M.outerHeight()
                            }
                            , menu: {
                                offset: n.offset()
                                , height: n.outerHeight()
                            }
                        }, a = {
                            above: t.context.scrollTop <= t.menu.offset.top - t.menu.height
                            , below: t.context.scrollTop + t.context.height >= t.menu.offset.top + t.menu.height
                        }, a.below ? (S.verbose("Dropdown can fit in context downward", a), i = !0) : a.below || a.above ? (S.verbose("Dropdown cannot fit below, opening upward", a), i = !1) : (S.verbose("Dropdown cannot fit in either direction, favoring downward", a), i = !0), n.removeClass(T.loading), i
                    }
                    , inObject: function (t, n) {
                        var i = !1;
                        return e.each(n, function (e, n) {
                            return n == t ? (i = !0, !0) : void 0
                        }), i
                    }
                    , multiple: function () {
                        return P.hasClass(T.multiple)
                    }
                    , single: function () {
                        return !S.is.multiple()
                    }
                    , selectMutation: function (t) {
                        var n = !1;
                        return e.each(t, function (t, i) {
                            return i.target && e(i.target).is("select") ? (n = !0, !0) : void 0
                        }), n
                    }
                    , search: function () {
                        return P.hasClass(T.search)
                    }
                    , searchSelection: function () {
                        return S.has.search() && 1 === z.parent(q.dropdown).length
                    }
                    , selection: function () {
                        return P.hasClass(T.selection)
                    }
                    , userValue: function (t) {
                        return -1 !== e.inArray(t, S.get.userValues())
                    }
                    , upward: function (e) {
                        var t = e || P;
                        return t.hasClass(T.upward)
                    }
                    , visible: function (e) {
                        return e ? e.hasClass(T.visible) : B.hasClass(T.visible)
                    }
                }
                , can: {
                    activate: function (e) {
                        return y.useLabels ? !0 : S.has.maxSelections() ? S.has.maxSelections() && e.hasClass(T.active) ? !0 : !1 : !0
                    }
                    , click: function () {
                        return c || "click" == y.on
                    }
                    , extendSelect: function () {
                        return y.allowAdditions || y.apiSettings
                    }
                    , show: function () {
                        return !S.is.disabled() && (S.has.items() || S.has.message())
                    }
                    , useAPI: function () {
                        return e.fn.api !== i
                    }
                }
                , animate: {
                    show: function (t, n) {
                        var a, o = n || B
                            , s = n ? function () {} : function () {
                                S.hideSubMenus(), S.hideOthers(), S.set.active()
                            };
                        t = e.isFunction(t) ? t : function () {}, S.verbose("Doing menu show animation", o), S.set.direction(n), a = S.get.transition(n), S.is.selection() && S.set.scrollPosition(S.get.selectedItem(), !0), (S.is.hidden(o) || S.is.animating(o)) && ("none" == a ? (s(), o.transition("show"), t.call(Y)) : e.fn.transition !== i && P.transition("is supported") ? o.transition({
                            animation: a + " in"
                            , debug: y.debug
                            , verbose: y.verbose
                            , duration: y.duration
                            , queue: !0
                            , onStart: s
                            , onComplete: function () {
                                t.call(Y)
                            }
                        }) : S.error(V.noTransition, a))
                    }
                    , hide: function (t, n) {
                        var a = n || B
                            , o = (n ? .9 * y.duration : y.duration, n ? function () {} : function () {
                                S.can.click() && S.unbind.intent(), S.remove.active()
                            })
                            , s = S.get.transition(n);
                        t = e.isFunction(t) ? t : function () {}, (S.is.visible(a) || S.is.animating(a)) && (S.verbose("Doing menu hide animation", a), "none" == s ? (o(), a.transition("hide"), t.call(Y)) : e.fn.transition !== i && P.transition("is supported") ? a.transition({
                            animation: s + " out"
                            , duration: y.duration
                            , debug: y.debug
                            , verbose: y.verbose
                            , queue: !0
                            , onStart: o
                            , onComplete: function () {
                                "auto" == y.direction && S.remove.upward(n), t.call(Y)
                            }
                        }) : S.error(V.transition))
                    }
                }
                , hideAndClear: function () {
                    S.remove.searchTerm(), S.has.maxSelections() || (S.has.search() ? S.hide(function () {
                        S.remove.filteredItem()
                    }) : S.hide())
                }
                , delay: {
                    show: function () {
                        S.verbose("Delaying show event to ensure user intent"), clearTimeout(S.timer), S.timer = setTimeout(S.show, y.delay.show)
                    }
                    , hide: function () {
                        S.verbose("Delaying hide event to ensure user intent"), clearTimeout(S.timer), S.timer = setTimeout(S.hide, y.delay.hide)
                    }
                }
                , escape: {
                    regExp: function (e) {
                        return e = String(e), e.replace(R.escape, "\\$&")
                    }
                }
                , setting: function (t, n) {
                    if (S.debug("Changing setting", t, n), e.isPlainObject(t)) e.extend(!0, y, t);
                    else {
                        if (n === i) return y[t];
                        y[t] = n
                    }
                }
                , internal: function (t, n) {
                    if (e.isPlainObject(t)) e.extend(!0, S, t);
                    else {
                        if (n === i) return S[t];
                        S[t] = n
                    }
                }
                , debug: function () {
                    y.debug && (y.performance ? S.performance.log(arguments) : (S.debug = Function.prototype.bind.call(console.info, console, y.name + ":"), S.debug.apply(console, arguments)))
                }
                , verbose: function () {
                    y.verbose && y.debug && (y.performance ? S.performance.log(arguments) : (S.verbose = Function.prototype.bind.call(console.info, console, y.name + ":"), S.verbose.apply(console, arguments)))
                }
                , error: function () {
                    S.error = Function.prototype.bind.call(console.error, console, y.name + ":"), S.error.apply(console, arguments)
                }
                , performance: {
                    log: function (e) {
                        var t, n, i;
                        y.performance && (t = (new Date).getTime(), i = u || t, n = t - i, u = t, d.push({
                            Name: e[0]
                            , Arguments: [].slice.call(e, 1) || ""
                            , Element: Y
                            , "Execution Time": n
                        })), clearTimeout(S.performance.timer), S.performance.timer = setTimeout(S.performance.display, 500)
                    }
                    , display: function () {
                        var t = y.name + ":"
                            , n = 0;
                        u = !1, clearTimeout(S.performance.timer), e.each(d, function (e, t) {
                            n += t["Execution Time"]
                        }), t += " " + n + "ms", l && (t += " '" + l + "'"), (console.group !== i || console.table !== i) && d.length > 0 && (console.groupCollapsed(t), console.table ? console.table(d) : e.each(d, function (e, t) {
                            console.log(t.Name + ": " + t["Execution Time"] + "ms")
                        }), console.groupEnd()), d = []
                    }
                }
                , invoke: function (t, n, a) {
                    var s, r, l, c = G;
                    return n = n || f, a = Y || a, "string" == typeof t && c !== i && (t = t.split(/[\. ]/), s = t.length - 1, e.each(t, function (n, a) {
                        var o = n != s ? a + t[n + 1].charAt(0).toUpperCase() + t[n + 1].slice(1) : t;
                        if (e.isPlainObject(c[o]) && n != s) c = c[o];
                        else {
                            if (c[o] !== i) return r = c[o], !1;
                            if (!e.isPlainObject(c[a]) || n == s) return c[a] !== i ? (r = c[a], !1) : (S.error(V.method, t), !1);
                            c = c[a]
                        }
                    })), e.isFunction(r) ? l = r.apply(a, n) : r !== i && (l = r), e.isArray(o) ? o.push(l) : o !== i ? o = [o, l] : l !== i && (o = l), r
                }
            }, m ? (G === i && S.initialize(), S.invoke(v)) : (G !== i && G.invoke("destroy"), S.initialize())
        }), o !== i ? o : s
    }, e.fn.dropdown.settings = {
        debug: !1
        , verbose: !1
        , performance: !0
        , on: "click"
        , action: "activate"
        , apiSettings: !1
        , saveRemoteData: !0
        , throttle: 200
        , context: t
        , direction: "auto"
        , keepOnScreen: !0
        , match: "both"
        , fullTextSearch: !1
        , placeholder: "auto"
        , preserveHTML: !0
        , sortSelect: !1
        , forceSelection: !0
        , allowAdditions: !1
        , maxSelections: !1
        , useLabels: !0
        , delimiter: ","
        , showOnFocus: !0
        , allowTab: !0
        , allowCategorySelection: !1
        , fireOnInit: !1
        , transition: "auto"
        , duration: 200
        , glyphWidth: 1.0714
        , label: {
            transition: "scale"
            , duration: 200
            , variation: !1
        }
        , delay: {
            hide: 300
            , show: 200
            , search: 20
            , touch: 50
        }
        , onChange: function (e, t, n) {}
        , onAdd: function (e, t, n) {}
        , onRemove: function (e, t, n) {}
        , onLabelSelect: function (e) {}
        , onLabelCreate: function (t, n) {
            return e(this)
        }
        , onLabelRemove: function (e) {
            return !0
        }
        , onNoResults: function (e) {
            return !0
        }
        , onShow: function () {}
        , onHide: function () {}
        , name: "Dropdown"
        , namespace: "dropdown"
        , message: {
            addResult: "Add <b>{term}</b>"
            , count: "{count} selected"
            , maxSelections: "Max {maxCount} selections"
            , noResults: "No results found."
            , serverError: "There was an error contacting the server"
        }
        , error: {
            action: "You called a dropdown action that was not defined"
            , alreadySetup: "Once a select has been initialized behaviors must be called on the created ui dropdown"
            , labels: "Allowing user additions currently requires the use of labels."
            , missingMultiple: "<select> requires multiple property to be set to correctly preserve multiple values"
            , method: "The method you called is not defined."
            , noAPI: "The API module is required to load resources remotely"
            , noStorage: "Saving remote data requires session storage"
            , noTransition: "This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>"
        }
        , regExp: {
            escape: /[-[\]{}()*+?.,\\^$|#\s]/g
        }
        , metadata: {
            defaultText: "defaultText"
            , defaultValue: "defaultValue"
            , placeholderText: "placeholder"
            , text: "text"
            , value: "value"
        }
        , fields: {
            remoteValues: "results"
            , values: "values"
            , name: "name"
            , value: "value"
        }
        , keys: {
            backspace: 8
            , delimiter: 188
            , deleteKey: 46
            , enter: 13
            , escape: 27
            , pageUp: 33
            , pageDown: 34
            , leftArrow: 37
            , upArrow: 38
            , rightArrow: 39
            , downArrow: 40
        }
        , selector: {
            addition: ".addition"
            , dropdown: ".ui.dropdown"
            , icon: "> .dropdown.icon"
            , input: '> input[type="hidden"], > select'
            , item: ".item"
            , label: "> .label"
            , remove: "> .label > .delete.icon"
            , siblingLabel: ".label"
            , menu: ".menu"
            , message: ".message"
            , menuIcon: ".dropdown.icon"
            , search: "input.search, .menu > .search > input"
            , text: "> .text:not(.icon)"
            , unselectable: ".disabled, .filtered"
        }
        , className: {
            active: "active"
            , addition: "addition"
            , animating: "animating"
            , disabled: "disabled"
            , dropdown: "ui dropdown"
            , filtered: "filtered"
            , hidden: "hidden transition"
            , item: "item"
            , label: "ui label"
            , loading: "loading"
            , menu: "menu"
            , message: "message"
            , multiple: "multiple"
            , placeholder: "default"
            , search: "search"
            , selected: "selected"
            , selection: "selection"
            , upward: "upward"
            , visible: "visible"
        }
    }, e.fn.dropdown.settings.templates = {
        dropdown: function (t) {
            var n = t.placeholder || !1
                , i = (t.values || {}, "");
            return i += '<i class="dropdown icon"></i>', i += t.placeholder ? '<div class="default text">' + n + "</div>" : '<div class="text"></div>', i += '<div class="menu">', e.each(t.values, function (e, t) {
                i += t.disabled ? '<div class="disabled item" data-value="' + t.value + '">' + t.name + "</div>" : '<div class="item" data-value="' + t.value + '">' + t.name + "</div>"
            }), i += "</div>"
        }
        , menu: function (t, n) {
            var i = t[n.values] || {}
                , a = "";
            return e.each(i, function (e, t) {
                a += '<div class="item" data-value="' + t[n.value] + '">' + t[n.name] + "</div>"
            }), a
        }
        , label: function (e, t) {
            return t + '<i class="delete icon"></i>'
        }
        , message: function (e) {
            return e
        }
        , addition: function (e) {
            return e
        }
    }
}(jQuery, window, document);
console.log('window width ' + $(window).width());
var useragents = ['android', 'astel', 'audiovox', 'blackberry', 'chtml', 'docomo', 'ericsson', 'hand', 'iphone ', 'ipod', '2me', 'ava', 'j-phone', 'kddi', 'lg', 'midp', 'mini', 'minimo', 'mobi', 'mobile', 'mobileexplorer', 'mot-e', 'motorola', 'mot-v', 'netfront', 'nokia', 'palm', 'palmos', 'palmsource', 'pda', 'pdxgw', 'phone', 'plucker', 'portable', 'portalmmm', 'sagem', 'samsung', 'sanyo', 'sgh', 'sharp', 'sie-m', 'sie-s', 'smartphone', 'softbank', 'sprint', 'symbian', 'telit', 'tsm', 'vodafone', 'wap', 'windowsce', 'wml', 'xiino'];
var agt = navigator.userAgent.toLowerCase();
var is_mobile = false;
for (i = 0; i < useragents.length; i++) {
    if (agt.indexOf(useragents[i]) != -1) {
        is_mobile = true;
        user_agent = agt;
        break;
    }
}
/*!mobile*/
function height_blocks(selector) {
    imagesLoaded(document.querySelector(selector), function (instance) {
        var height = 0;
        jQuery(selector).each(function () {
            (jQuery(this).innerHeight() > height) ? height = jQuery(this).innerHeight(): false
        });
        jQuery(selector).css('height', height + 'px');
    });
}
jQuery(function () {
    if (jQuery('#banner_slider').length) {
        jQuery('#banner_slider').slick({
            autoplay: true
            , infinite: true
            , fade: true
            , dots: true
            , arrows: true
            , prevArrow: '<button type="button" class="slick-prev"></button>'
            , nextArrow: '<button type="button" class="slick-next"></button>'
            , slidesToShow: 1
            , slidesToScroll: 1
        });
        if (jQuery('#banner_slider .slick-dots').length) {
            var ul = jQuery('#banner_slider .slick-dots');
            ul.css('margin-left', '-' + ul.innerWidth() / 2 + 'px');
        }
    }
    if (jQuery('.carousel').length) {
        jQuery('.carousel').slick({
            autoplay: false
            , infinite: false
            , fade: false
            , dots: false
            , arrows: true
            , prevArrow: '<button type="button" class="slick-prev"></button>'
            , nextArrow: '<button type="button" class="slick-next"></button>'
            , slidesToShow: 3
            , slidesToScroll: 2
            , responsive: [{
                breakpoint: 1920
                , settings: {
                    slidesToShow: 3
                    , slidesToScroll: 2
                }
            }, {
                breakpoint: 960
                , settings: {
                    slidesToShow: 2
                    , slidesToScroll: 1
                }
            }, {
                breakpoint: 768
                , settings: {
                    slidesToShow: 1
                    , slidesToScroll: 1
                }
            }]
        });
    }
    if (jQuery('#action_slider').length) {
        jQuery('#action_slider').slick({
            autoplay: true
            , fade: true
            , dots: true
            , arrows: true
            , prevArrow: '<button type="button" class="slick-prev"></button>'
            , nextArrow: '<button type="button" class="slick-next"></button>'
            , slidesToShow: 1
        });
    }
    if (jQuery('.banner').length) {
        var mX = jQuery('.banner').width() / 2;
        jQuery('.banner').mousemove(function (e) {
            if (e.pageX < mX) {
                jQuery(this).css('background-position', '49.5% center');
            }
            else {
                jQuery(this).css('background-position', '50.5% center');
            }
        });
        jQuery('.banner').mouseout(function (e) {
            jQuery(this).css('background-position', 'center center');
        });
    }
    jQuery(document).on('scroll', $.throttle(200, function (event) {}));
    $('#slider_restaurant').slick({
        autoplay: false
        , infinite: false
        , fade: false
        , dots: false
        , arrows: true
        , prevArrow: '<button type="button" class="slick-prev"></button>'
        , nextArrow: '<button type="button" class="slick-next"></button>'
        , slidesToShow: 5
        , slidesToScroll: 1
        , responsive: [{
            breakpoint: 1920
            , settings: {
                slidesToShow: 5
                , slidesToScroll: 1
            }
        }, {
            breakpoint: 1420
            , settings: {
                slidesToShow: 4
                , slidesToScroll: 1
            }
        }, {
            breakpoint: 1030
            , settings: {
                slidesToShow: 3
                , slidesToScroll: 1
            }
        }, {
            breakpoint: 975
            , settings: {
                slidesToShow: 2
                , slidesToScroll: 1
            }
        }, {
            breakpoint: 629
            , settings: {
                slidesToShow: 1
                , slidesToScroll: 1
                , dots: true
            }
        }]
    });
    $('.carousel_address').slick({
        autoplay: false
        , infinite: false
        , fade: false
        , dots: false
        , arrows: true
        , prevArrow: '<button type="button" class="slick-prev"></button>'
        , nextArrow: '<button type="button" class="slick-next"></button>'
        , slidesToShow: 4
        , slidesToScroll: 1
        , responsive: [{
            breakpoint: 1920
            , settings: {
                slidesToShow: 4
                , slidesToScroll: 1
            }
        }, {
            breakpoint: 1030
            , settings: {
                slidesToShow: 3
                , slidesToScroll: 1
            }
        }, {
            breakpoint: 975
            , settings: {
                slidesToShow: 2
                , slidesToScroll: 1
            }
        }, {
            breakpoint: 629
            , settings: {
                slidesToShow: 1
                , slidesToScroll: 1
                , dots: true
            }
        }]
    });
    $('.top_btn').click(function () {
        var parent = $(this).parents('.last_orders')
            , centerPart = $(parent).find('.center_part');
        $(this).toggleClass('open');
        $(centerPart).slideToggle();
    });
    $('.entry').click(function () {
        var closePopUp = $(this).parents(".popup-container");
        if (closePopUp) {
            closePopUp.removeClass('active');
        }
        Popup.show('#entry');
    });
    $('.regist_up').click(function () {
        var closePopUp = $('#entry').hasClass('active');
        if (closePopUp) {
            $('#entry').removeClass('active');
            $('div.popup-bg').remove();
        }
        $(".registration_form_error").html("");
        Popup.show('#regist');
    });
    $('.feedback_link_id').click(function () {
        Popup.show('#call_back');
    });
    $('.congratulations').click(function () {
        var closeBasket = $('#basket').hasClass('active');
        if (closeBasket) {
            $('#basket').removeClass('active');
            $('div.popup-bg').remove();
        }
        Popup.show('#congratulations');
    });
    if ($('#tel').length) {
        $("#tel").mask("(999) 999-99-99");
    }
    if ($('#date').length) {
        $("#date").mask("99.99.9999");
    }
    jQuery('#basket').on('show.popup', function () {
        setTimeout(function () {
            $('.entry_container_inside  .scrol_container').perfectScrollbar();
            $('.entry_container_inside  .scrol_container').perfectScrollbar('update');
        }, 500);
    });
    $(window).on('load', function () {
        $('.preloader').hide();
    });
    $('.redact').click(function () {
        $(this).parents('.info_item').find('.data-block').hide();
        $(this).parents('.info_item').find('.redact_item').show();
    });
    if ($(window).outerWidth() < 980) {
        $('.delivery_link').click(function (e) {
            var activeLinck = $('.delivery_link')
                , parentActive = $('.delivery_link').parent().hasClass("active")
                , deliveryLinck = $('.delivery_link').attr('href');
            if (!parentActive) {
                location.href = 'deliveryLinck';
            }
            else {
                $(activeLinck).addClass('active');
                e.preventDefault();
            }
        });
    }
    if ($(window).outerWidth() < 980) {
        $('.link_restorans').click(function (e) {
            var activeLinck = $('.link_restorans')
                , parentActive = $('.link_restorans').parent().hasClass("active")
                , restoranLinck = $('.link_restorans').attr('href');
            if (!parentActive) {
                location.href = 'restoranLinck';
            }
            else {
                $(activeLinck).addClass('active');
                e.preventDefault();
            }
        });
    }
});

function gradien() {
    console.log($('.name').width());
    if ($('.name').width() === 77) {
        $('.gradient_white').css('display', 'block');
    }
}
if ($('.name').length) {
    gradien();
}

function heightVideo() {
    $('.container_video').css('height', $(window).height());
}
$(window).on('load ', function (e) {
    heightVideo();
});
$(window).on('resize', function (e) {
    if (!is_mobile) {
        heightVideo();
    }
});
$(window).on("orientationchange", function () {
    setTimeout(function () {
        heightVideo();
    }, 500)
});
$('.mouse').click(function () {
    $("html,body").animate({
        "scrollTop": $(window).height()
    }, 800);
});
if (jQuery('select').length) {
    jQuery('select:not(.search-select)').selectbox({
        speed: 400
    });
}
if (jQuery('select.search-select').length) {
    $('select.search-select').dropdown();
}
$('.front_inside .scrol_container').perfectScrollbar();
$('.banner_info_main_rest .scrol_container').perfectScrollbar();
var HeaderDropdown = {
    init: function () {
        this.events();
    }
    , toggleMenu: function () {
        if (jQuery('html').hasClass('header-menu-open')) {
            HeaderDropdown.hideMenu();
        }
        else {
            HeaderDropdown.showMenu();
        }
    }
    , showMenu: function () {
        HeaderDropdown.hidePhone();
        var button = jQuery('[data-header-navicon]')
            , header_home = jQuery('.header_home')
            , openSubmenu = $('.menu_child.active').hasClass('open');
        if (openSubmenu == true) {
            $('.menu_child.active').removeClass('open');
            $('.submenu').hide();
        }
        button.addClass('active');
        button.find('.navicon').addClass('x close');
        if (header_home.length) {
            header_home.addClass('active');
        }
        jQuery('.mobile_header_dropdown').css('top', jQuery('header').innerHeight() + 'px').addClass('open');
        jQuery('html').addClass('header-menu-open');
    }
    , hideMenu: function () {
        var button = jQuery('[data-header-navicon]')
            , header_home = jQuery('.header_home');
        button.removeClass('active');
        button.find('.navicon').removeClass('x close');
        if (header_home.length) {
            header_home.removeClass('active');
        }
        jQuery('.mobile_header_dropdown').removeClass('open');
        jQuery('html').removeClass('header-menu-open');
    }
    , togglePhone: function () {
        if (jQuery('html').hasClass('header-phone-open')) {
            HeaderDropdown.hidePhone();
        }
        else {
            HeaderDropdown.showPhone();
        }
    }
    , showPhone: function () {
        HeaderDropdown.hideMenu();
        var button = jQuery('[data-header-phone]')
            , header_home = jQuery('.header_home');
        button.addClass('active');
        if (header_home.length) {
            header_home.addClass('active');
        }
        jQuery('.mobile_header_dropdown2').css('top', jQuery('header').innerHeight() + 'px').addClass('open');
        jQuery('html').addClass('header-phone-open');
    }
    , hidePhone: function () {
        var button = jQuery('[data-header-phone]')
            , header_home = jQuery('.header_home');
        button.removeClass('active');
        if (header_home.length) {
            header_home.removeClass('active');
        }
        jQuery('.mobile_header_dropdown2').removeClass('open');
        jQuery('html').removeClass('header-phone-open');
    }
    , events: function () {
        jQuery('[data-header-navicon]').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            HeaderDropdown.toggleMenu();
        });
        jQuery('[data-header-phone]').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            HeaderDropdown.togglePhone();
        });
        jQuery('html').on('click', function (e) {
            if (jQuery(e.target).closest('[data-header-dropdown]').length || e.target.hasAttribute('data-header-dropdown')) {}
            else {
                HeaderDropdown.hideMenu();
                HeaderDropdown.hidePhone();
            }
        });
        jQuery('.tel .tel_link_home, .feedback_link_container').click(function () {
            var close = $('.search_dropdown, .search').hasClass('open');
            if (close == true) {
                $('.search_dropdown, .search').removeClass('open');
            }
            jQuery(this).closest('.tel').toggleClass('open');
            jQuery('.header_dropdown').toggleClass('open');
        });
        $('.feedback_link_container').click(function () {
            $('.logo_tel').toggleClass('open');
        });
    }
};
$('.search').click(function () {
    var close = $('.search_dropdown, .tel').hasClass('open')
        , logoTelClass = $('.logo_tel').hasClass('open');
    if (close == true) {
        $('.header_dropdown, .tel').removeClass('open');
    }
    if (logoTelClass == true) {
        $('.logo_tel').removeClass('open');
    }
    $('.search_dropdown').toggleClass('open');
    $('.search').toggleClass('open');
});
var MenuCarousel = {
    speed: 400
    , count: 2
    , step: 60
    , stopAnimate: false
    , init: function (id) {
        this.events();
        var container = jQuery(id)
            , containerWidth = container.width()
            , list = container.find('.submenu_list')
            , elementsWidth = this.getElementsWidth(container);
        if ((elementsWidth > containerWidth) && jQuery(window).width() > 942) {
            container.addClass('active');
            list.css('width', elementsWidth + 2 + 'px');
            container.attr('scrollWidth', Math.abs(container.find('.carousel_menu_overflow').width() - (elementsWidth + 2)));
            if ($('.submenu_link').hasClass('active')) {
                var positionElem = $('.submenu_link.active').parent().position().left
                    , widthContain = containerWidth - 150;
                if (positionElem > widthContain) {
                    $('.carousel_menu_btn.next').trigger('click');
                    setTimeout(function () {
                        $('.carousel_menu_btn.next').trigger('click');
                    }, 500);
                }
            }
        }
        else {
            container.removeClass('active');
            list.css('width', 'auto').css('margin-left', '0');
        }
    }
    , getElementsWidth: function (container) {
        width = 0;
        container.find('.submenu_child').each(function () {
            width += (jQuery(this).innerWidth() + 2 + 2);
        });
        return width;
    }
    , scrollPrev: function (currentPos, list, scrollWidth) {
        var margin = currentPos + (scrollWidth / this.count);
        if (margin > 0) {
            margin = 0;
        }
        MenuCarousel.stopAnimate = true;
        list.stop().animate({
            'marginLeft': margin + 'px'
        }, MenuCarousel.speed, function () {
            MenuCarousel.stopAnimate = false;
        });
    }
    , scrollNext: function (currentPos, list, scrollWidth) {
        var margin = currentPos - (scrollWidth / this.count);
        if (Math.abs(margin) > Math.abs(scrollWidth)) {
            return false;
        }
        MenuCarousel.stopAnimate = true;
        list.stop().animate({
            'marginLeft': margin + 'px'
        }, MenuCarousel.speed, function () {
            MenuCarousel.stopAnimate = false;
        });
    }
    , events: function () {
        jQuery('.carousel_menu_btn').click(function () {
            var list = jQuery(this).closest('.carousel_menu').find('.submenu_list')
                , currentPos = parseInt(list.css('margin-left').split('px')[0])
                , scrollWidth = parseInt(jQuery(this).closest('.carousel_menu').attr('scrollWidth'));
            if (!MenuCarousel.stopAnimate && jQuery(this).hasClass('prev')) {
                MenuCarousel.scrollPrev(currentPos, list, scrollWidth);
            }
            else if (!MenuCarousel.stopAnimate && jQuery(this).hasClass('next')) {
                MenuCarousel.scrollNext(currentPos, list, scrollWidth);
            }
        });
    }
}
var Submenu = {
    init: function () {
        this.events();
    }
    , toggle: function (el) {
        var submenu = jQuery('.submenu')
            , height = jQuery(window).height() - jQuery('header').innerHeight() - 80
            , colseActive = $('.navicon_btn').hasClass('active');
        if (colseActive == true) {
            $('.navicon_btn').removeClass('active');
            $('.navicon').removeClass('close');
            $('.navicon').removeClass('x');
            $('.mobile_header_dropdown').removeClass('open');
        }
        el.toggleClass('open');
        submenu.css('top', jQuery('header').innerHeight() - 2 + 'px').toggle();
        if (submenu.find('.container').innerHeight() > height) {
            submenu.find('.container').css('height', height + 'px').perfectScrollbar();
        }
    }
    , fixed: function () {
        jQuery(document).on('scroll', $.throttle(200, function (event) {
            if (jQuery(document).scrollTop() > (jQuery('header').innerHeight() + 55)) {
                jQuery('.submenu').addClass('fixed');
            }
            else {
                jQuery('.submenu').removeClass('fixed');
            }
        }));
    }
    , events: function () {
        jQuery('.menu_child.active').click(function () {
            if (jQuery(window).width() <= 975) {
                Submenu.toggle(jQuery(this));
            }
        });
        if (jQuery(window).width() > 975) {
            Submenu.fixed();
        }
    }
}
jQuery(function () {
    HeaderDropdown.init();
    Submenu.init();
    if (jQuery('#carousel_menu').length) {
        MenuCarousel.init('#carousel_menu');
        jQuery(window).on('resize', function () {
            MenuCarousel.init('#carousel_menu');
        });
    }
});
jQuery('#slider_preview').slick({
    dots: false
    , infinite: true
    , speed: 300
    , slidesToShow: 2
    , centerMode: true
    , variableWidth: true
});
jQuery('.preview_link_restauran').click(function () {
    var self = jQuery(this)
        , index = parseInt(self.attr('data-index'))
        , quantityImg = $('#slider_preview').attr('data-count');
    Popup.show('#photo_restoran');
    jQuery('.preview_link').removeClass('active');
    self.addClass('active');
    if (quantityImg > 5) {
        $('.photo_slider').slick({
            infinite: true
            , asNavFor: '#slider_preview_photo'
            , initialSlide: index
        });
        $('.slider_preview_photo').slick({
            infinite: true
            , slidesToShow: 6
            , asNavFor: '.photo_slider'
            , slidesToScroll: 1
            , initialSlide: index
        });
    }
    else {
        $('.photo_slider').slick({
            infinite: true
            , initialSlide: index
        });
        $('#slider_preview_photo .slide_preview').parent().addClass('no_slider');
    }
});
$(function () {
    $('.slider_preview_photo').on('click', '.slick-slide', function () {
        var slide = $(this)
            , popUpIndexs = parseInt(slide.attr('data-slick-index'));
        console.log(popUpIndexs);
        $('.photo_slider').slick("slickGoTo", popUpIndexs, true);
    });
    jQuery('#photo_restoran').on('hide.popup', function () {
        if ($('.photo_slider').hasClass('slick-initialized')) {
            $('.photo_slider').slick('unslick');
        }
        if ($('.slider_preview_photo').hasClass('slick-initialized')) {
            $('.slider_preview_photo').slick('unslick');
        }
    });
});
var Footer = {
    container: 'footer'
    , emptyFooter: '.empty_footer'
    , init: function () {
        this.setHeight();
        this.events();
    }
    , setHeight: function () {
        imagesLoaded(jQuery(Footer.container), function () {
            var height = jQuery(Footer.container).find('.container').innerHeight();
            jQuery(Footer.container).css({
                'height': height + 'px'
                , 'marginTop': '-' + height + 'px'
            });
            jQuery(Footer.emptyFooter).css({
                'height': height + 'px'
            });
        });
    }
    , events: function () {
        jQuery(window).on('resize', function () {
            Footer.setHeight();
        });
    }
}
jQuery(function () {
    Footer.init();
});
var Input = {
    events: function () {
        jQuery('input,textarea').placeholder();
        jQuery('input[type="radio"]').change(function () {
            var id = jQuery(this).attr('id')
                , name = jQuery(this).attr('name');
            if (jQuery(this).prop('checked')) {
                jQuery('label[ data-input-name="' + name + '" ]').removeClass('active');
                jQuery('label[ for="' + id + '" ]').addClass('active');
            }
        });
        jQuery('input[type="checkbox"]').change(function () {
            var name = jQuery(this).attr('name');
            if (jQuery(this).prop('checked')) {
                jQuery('label[ data-input-name="' + name + '" ]').addClass('active');
            }
            else {
                jQuery('label[ data-input-name="' + name + '" ]').removeClass('active');
            }
        });
    }
}
jQuery(function () {
    (jQuery('input').length || $('textarea').length) ? Input.events(): false;
});
! function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
    var b, c = navigator.userAgent
        , d = /iphone/i.test(c)
        , e = /chrome/i.test(c)
        , f = /android/i.test(c);
    a.mask = {
        definitions: {
            9: "[0-9]"
            , a: "[A-Za-z]"
            , "*": "[A-Za-z0-9]"
        }
        , autoclear: !0
        , dataName: "rawMaskFn"
        , placeholder: "_"
    }, a.fn.extend({
        caret: function (a, b) {
            var c;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
            })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
                begin: a
                , end: b
            })
        }
        , unmask: function () {
            return this.trigger("unmask")
        }
        , mask: function (c, g) {
            var h, i, j, k, l, m, n, o;
            if (!c && this.length > 0) {
                h = a(this[0]);
                var p = h.data(a.mask.dataName);
                return p ? p() : void 0
            }
            return g = a.extend({
                autoclear: a.mask.autoclear
                , placeholder: a.mask.placeholder
                , completed: null
            }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
                "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null)
            }), this.trigger("unmask").each(function () {
                function h() {
                    if (g.completed) {
                        for (var a = l; m >= a; a++)
                            if (j[a] && C[a] === p(a)) return;
                        g.completed.call(B)
                    }
                }

                function p(a) {
                    return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
                }

                function q(a) {
                    for (; ++a < n && !j[a];);
                    return a
                }

                function r(a) {
                    for (; --a >= 0 && !j[a];);
                    return a
                }

                function s(a, b) {
                    var c, d;
                    if (!(0 > a)) {
                        for (c = a, d = q(b); n > c; c++)
                            if (j[c]) {
                                if (!(n > d && j[c].test(C[d]))) break;
                                C[c] = C[d], C[d] = p(d), d = q(d)
                            }
                        z(), B.caret(Math.max(l, a))
                    }
                }

                function t(a) {
                    var b, c, d, e;
                    for (b = a, c = p(a); n > b; b++)
                        if (j[b]) {
                            if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
                            c = e
                        }
                }

                function u() {
                    var a = B.val()
                        , b = B.caret();
                    if (o && o.length && o.length > a.length) {
                        for (A(!0); b.begin > 0 && !j[b.begin - 1];) b.begin--;
                        if (0 === b.begin)
                            for (; b.begin < l && !j[b.begin];) b.begin++;
                        B.caret(b.begin, b.begin)
                    }
                    else {
                        for (A(!0); b.begin < n && !j[b.begin];) b.begin++;
                        B.caret(b.begin, b.begin)
                    }
                    h()
                }

                function v() {
                    A(), B.val() != E && B.change()
                }

                function w(a) {
                    if (!B.prop("readonly")) {
                        var b, c, e, f = a.which || a.keyCode;
                        o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
                    }
                }

                function x(b) {
                    if (!B.prop("readonly")) {
                        var c, d, e, g = b.which || b.keyCode
                            , i = B.caret();
                        if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
                            if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                                if (t(c), C[c] = d, z(), e = q(c), f) {
                                    var k = function () {
                                        a.proxy(a.fn.caret, B, e)()
                                    };
                                    setTimeout(k, 0)
                                }
                                else B.caret(e);
                                i.begin <= m && h()
                            }
                            b.preventDefault()
                        }
                    }
                }

                function y(a, b) {
                    var c;
                    for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c))
                }

                function z() {
                    B.val(C.join(""))
                }

                function A(a) {
                    var b, c, d, e = B.val()
                        , f = -1;
                    for (b = 0, d = 0; n > b; b++)
                        if (j[b]) {
                            for (C[b] = p(b); d++ < e.length;)
                                if (c = e.charAt(d - 1), j[b].test(c)) {
                                    C[b] = c, f = b;
                                    break
                                }
                            if (d > e.length) {
                                y(b + 1, n);
                                break
                            }
                        }
                        else C[b] === e.charAt(d) && d++, k > b && (f = b);
                    return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l
                }
                var B = a(this)
                    , C = a.map(c.split(""), function (a, b) {
                        return "?" != a ? i[a] ? p(b) : a : void 0
                    })
                    , D = C.join("")
                    , E = B.val();
                B.data(a.mask.dataName, function () {
                    return a.map(C, function (a, b) {
                        return j[b] && a != p(b) ? a : null
                    }).join("")
                }), B.one("unmask", function () {
                    B.off(".mask").removeData(a.mask.dataName)
                }).on("focus.mask", function () {
                    if (!B.prop("readonly")) {
                        clearTimeout(b);
                        var a;
                        E = B.val(), a = A(), b = setTimeout(function () {
                            B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a))
                        }, 10)
                    }
                }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
                    B.prop("readonly") || setTimeout(function () {
                        var a = A(!0);
                        B.caret(a), h()
                    }, 0)
                }), e && f && B.off("input.mask").on("input.mask", u), A()
            })
        }
    })
});
var Cart = {
    cartBtn: '.cart_btn'
    , init: function () {
        this.events();
    }
    , addToCart: function (id, price, count, el) {
        if (el.hasClass('active')) {
            return false;
        }
        el.addClass('active');
        el.parent().parent().parent().find(".animate-cart").removeClass("start");
        var category = $(el).attr('data-category');
        jQuery.ajax({
            url: '/add-to-cart'
            , type: 'POST'
            , dataType: 'json'
            , cache: false
            , data: {
                id: id
                , price: price
                , count: count
                , category: category
            }
            , success: function (response) {
                if (response.status) {
                    Cart.changeCart(response.total_price);
                    $(el).find('.steps_val').attr("data-row-id", response.rowId);
                    Cart.showAnimationCart(el);
                    if (response.night_notify) {
                        Popup.show('#night_notification');
                    }
                }
            }
        });
    }
    , showAnimationCart: function (e) {
        e.parent().parent().parent().find(".animate-cart").addClass("start");
    }
    , addToOrderCart: function (id, price, count, el) {
        if (el.hasClass('active')) {
            return false;
        }
        el.addClass('active');
        var category = $(el).attr('data-category');
        jQuery.ajax({
            url: '/add-to-cart'
            , type: 'POST'
            , dataType: 'json'
            , cache: false
            , data: {
                id: id
                , price: price
                , count: count
                , category: category
                , ordering: 1
            }
            , success: function (response) {
                if (response.status) {
                    $("#order_product").html(response.html);
                    Cart.changeCart(response.total_price);
                    $("#total_price_order").html(response.total_price + " грн");
                    $("#total_price_order").attr("data-price", response.total_price);
                    $(el).find('.steps_val').attr("data-row-id", response.rowId);
                    Cart.showAnimationCart(el);
                }
            }
        });
    }
    , removeItem: function (id) {
        jQuery.ajax({
            url: '/delete-from-cart'
            , type: 'POST'
            , dataType: 'json'
            , cache: false
            , data: {
                id: id
            }
            , success: function (response) {
                if (response.status) {
                    $("#basket_content").html(response.html);
                    jQuery('#total_price').html(response.price);
                    jQuery('.cart_price').html(response.price);
                    var data_id = $("#catalog_row .steps_val[data-row-id='" + id + "']");
                    data_id.parent().parent().removeClass('active');
                    data_id.parent().parent().attr('data-count', 1);
                    data_id.text(1);
                    if ($("#product-page").length) {
                        var data_id2 = $("#product-page .steps_val[data-row-id='" + id + "']");
                        data_id2.parent().parent().removeClass('active');
                        data_id2.parent().parent().attr('data-count', 1);
                        data_id2.text(1);
                    }
                    jQuery('#basket .buy_steps .steps_nav').click(function () {
                        Cart.changeCount(jQuery(this));
                    });
                }
                else if (response.money_limit) {
                    $('#basket').removeClass('active');
                    $('div.popup-bg').remove();
                    showErrorMessage(response.message);
                }
            }
        });
    }
    , removeItemFromOrder: function (id) {
        jQuery.ajax({
            url: '/delete-from-cart'
            , type: 'POST'
            , dataType: 'json'
            , cache: false
            , data: {
                id: id
                , ordering: 1
            }
            , success: function (response) {
                if (response.status) {
                    $("#order_product").html(response.html);
                    jQuery('#total_price_order').html(response.price + " грн");
                    $("#total_price_order").attr("data-price", response.price);
                    jQuery('.cart_price').html(response.price);
                    if (response.htmlRecom) {
                        console.log('a');
                        jQuery('.recom').html(response.htmlRecom);
                    }
                    var data_id = $("#order_product .steps_val[data-row-id='" + id + "']");
                    data_id.parent().parent().removeClass('active'); + data_id.parent().parent().attr('data-count', 1);
                    data_id.text(1);
                    Cart.init();
                    Reyting.init();
                }
                else if (response.money_limit) {
                    $('#basket').removeClass('active');
                    $('div.popup-bg').remove();
                    showMinPriceMessage(response.message);
                }
            }
        });
    }
    , changeCount: function (el) {
        var btnContainer = el.closest('.buy')
            , price = parseInt(btnContainer.attr('data-price'))
            , count = parseInt(btnContainer.attr('data-count'))
            , stepsVal = btnContainer.find('.steps_val');
        if (el.hasClass('minus')) {
            var res = count - 1;
        }
        else if (el.hasClass('plus')) {
            var res = count + 1;
        }
        if (res < 1) {
            var id = stepsVal.attr('data-row-id');
            if ($("#catalog_row").length) {
                Cart.removeItem(id);
            }
            if ($("#product-page").length) {
                Cart.removeItem(id);
            }
            if ($("#order_product").length) {
                Cart.removeItemFromOrder(id);
            }
            return false;
        }
        var id = stepsVal.attr('data-row-id');
        btnContainer.attr('data-count', res);
        stepsVal.html(res);
        jQuery.ajax({
            url: '/change-count-item'
            , type: 'POST'
            , dataType: 'json'
            , cache: false
            , data: {
                id: id
                , count: res
            }
            , success: function (response) {
                if (response.status) {
                    jQuery('.cart_price').html(response.price);
                    jQuery('#total_price').html(response.price);
                    if (jQuery('#total_price_order').length) {
                        jQuery('#total_price_order').html(response.price + " грн");
                        $("#total_price_order").attr("data-price", response.price);
                    }
                    if ($("#catalog_row").length) {
                        var data_id = $("#catalog_row .steps_val[data-row-id='" + id + "']");
                        data_id.parent().parent().attr('data-count', res);
                        data_id.text(res);
                    }
                    if ($("#order_product").length) {
                        var data_id = $("#order_product .steps_val[data-row-id='" + id + "']");
                        data_id.parent().parent().attr('data-count', res);
                        data_id.text(res);
                    }
                    if ($("#product-page").length) {
                        var data_id = $("#product-page .steps_val[data-row-id='" + id + "']");
                        data_id.parent().parent().attr('data-count', res);
                        data_id.text(res);
                    }
                }
                else {}
            }
        });
    }
    , changeCart: function (price) {
        var valueContainer = jQuery('.cart_btn .cart_price');
        valueContainer.html(price);
        Cart.animateCart();
    }
    , animateCart: function () {
        if (jQuery(this.cartBtn).length) {
            if (!jQuery(Cart.cartBtn).hasClass('active')) {
                jQuery(Cart.cartBtn).addClass('active');
            }
        }
        setTimeout(function () {
            jQuery(Cart.cartBtn).addClass('animate');
        }, 500);
        setTimeout(function () {
            jQuery(Cart.cartBtn).removeClass('animate');
        }, 1500);
    }
    , showCart: function () {
        jQuery.ajax({
            url: '/show-cart'
            , type: 'POST'
            , dataType: 'json'
            , cache: false
            , success: function (response) {
                if (response.status) {
                    $("#basket_content").html(response.html);
                    jQuery('#total_price').html(response.price);
                    Popup.init();
                    Popup.show('#basket');
                    jQuery('#basket .buy_steps .steps_nav').click(function () {
                        Cart.changeCount(jQuery(this));
                    });
                }
            }
        });
    }
    , checkOrder: function () {
        jQuery.ajax({
            url: '/check-order'
            , type: 'POST'
            , dataType: 'json'
            , cache: false
            , success: function (response) {
                if (response.status) {
                    window.location.replace(response.url);
                }
                else if (response.money_limit) {
                    $('#basket').removeClass('active');
                    $('div.popup-bg').remove();
                    showMinPriceMessage(response.message);
                }
                else if (response.blocked) {
                    $('#basket').removeClass('active');
                    $('div.popup-bg').remove();
                    showErrorMessage(response.message);
                }
            }
        });
    }
    , events: function () {
        jQuery('.show_cart').click(function () {
            Cart.showCart();
        });
        jQuery('#check_order').click(function () {
            Cart.checkOrder();
        });
        jQuery(document).on("click", ".buy_steps .steps_nav", function (e) {
            Cart.changeCount(jQuery(this));
        });
        jQuery(document).on("click", ".delete-btn", function (e) {
            var id = $(this).attr('data-row');
            Cart.removeItemFromOrder(id);
        });
    }
}
jQuery(function () {
    Cart.init();
});
var Reyting = {
    init: function () {
        jQuery('[data-jq-rating]').jqRating();
    }
    , change: function (_this) {
        var data = {}
            , editable = _this.find('.jq-rating').attr('data-jq-rating-editable')
            , value = _this.find('.reyting_input').val();
        if (editable == 'false') {
            return false;
        }
        data['value'] = value;
        jQuery.post("/", {
            data: data
        }, function (response) {
            if (response.status == "error") {
                _this.find('.message').html(response.error_messages);
            }
            else {
                _this.find('.message').html(response.ok_messages);
            }
        }, "json");
    }
    , events: function () {
        jQuery('.jq-rating-star').on('click', function () {
            var _this = jQuery(this).closest('.reyting');
            Reyting.change(_this);
        });
    }
}
jQuery(function () {
    Reyting.init();
    jQuery('.jq-rating').on('click', function () {
        Reyting.change(jQuery(this).closest('.reyting'));
    });
});
var ScrollTop = {
    top: '100'
    , scrollTime: '500'
    , element: '.scroll-top'
    , init: function () {
        this.events();
    }
    , events: function () {
        jQuery(document).on('scroll', $.throttle(200, function (event) {
            (jQuery(document).scrollTop() > ScrollTop.top) ? jQuery(ScrollTop.element).fadeIn(): jQuery(ScrollTop.element).fadeOut();
        }));
        jQuery('body').on('click', ScrollTop.element, function (event) {
            event.preventDefault();
            jQuery('body,html').animate({
                'scrollTop': 0
            }, ScrollTop.scrollTime);
        });
    }
}
jQuery(function () {
    ScrollTop.init();
}); + function ($) {
    'use strict';
    var Tooltip = function (element, options) {
        this.type = null
        this.options = null
        this.enabled = null
        this.timeout = null
        this.hoverState = null
        this.$element = null
        this.inState = null
        this.init('tooltip', element, options)
    }
    Tooltip.VERSION = '3.3.5'
    Tooltip.TRANSITION_DURATION = 150
    Tooltip.DEFAULTS = {
        animation: true
        , placement: 'top'
        , selector: false
        , template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        , trigger: 'hover focus'
        , title: ''
        , delay: 0
        , html: false
        , container: false
        , viewport: {
            selector: 'body'
            , padding: 0
        }
    }
    Tooltip.prototype.init = function (type, element, options) {
        this.enabled = true
        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
        this.inState = {
            click: false
            , hover: false
            , focus: false
        }
        if (this.$element[0] instanceof document.constructor && !this.options.selector) {
            throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
        }
        var triggers = this.options.trigger.split(' ')
        for (var i = triggers.length; i--;) {
            var trigger = triggers[i]
            if (trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            }
            else if (trigger != 'manual') {
                var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
                this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }
        this.options.selector ? (this._options = $.extend({}, this.options, {
            trigger: 'manual'
            , selector: ''
        })) : this.fixTitle()
    }
    Tooltip.prototype.getDefaults = function () {
        return Tooltip.DEFAULTS
    }
    Tooltip.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)
        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay
                , hide: options.delay
            }
        }
        return options
    }
    Tooltip.prototype.getDelegateOptions = function () {
        var options = {}
        var defaults = this.getDefaults()
        this._options && $.each(this._options, function (key, value) {
            if (defaults[key] != value) options[key] = value
        })
        return options
    }
    Tooltip.prototype.enter = function (obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type)
        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }
        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
        }
        if (self.tip().hasClass('in') || self.hoverState == 'in') {
            self.hoverState = 'in'
            return
        }
        clearTimeout(self.timeout)
        self.hoverState = 'in'
        if (!self.options.delay || !self.options.delay.show) return self.show()
        self.timeout = setTimeout(function () {
            if (self.hoverState == 'in') self.show()
        }, self.options.delay.show)
    }
    Tooltip.prototype.isInStateTrue = function () {
        for (var key in this.inState) {
            if (this.inState[key]) return true
        }
        return false
    }
    Tooltip.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type)
        if (!self) {
            self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }
        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
        }
        if (self.isInStateTrue()) return
        clearTimeout(self.timeout)
        self.hoverState = 'out'
        if (!self.options.delay || !self.options.delay.hide) return self.hide()
        self.timeout = setTimeout(function () {
            if (self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
    }
    Tooltip.prototype.show = function () {
        var e = $.Event('show.bs.' + this.type)
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e)
            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
            if (e.isDefaultPrevented() || !inDom) return
            var that = this
            var $tip = this.tip()
            var tipId = this.getUID(this.type)
            this.setContent()
            $tip.attr('id', tipId)
            this.$element.attr('aria-describedby', tipId)
            if (this.options.animation) $tip.addClass('fade')
            var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement
            var autoToken = /\s?auto?\s?/i
            var autoPlace = autoToken.test(placement)
            if (autoPlace) placement = placement.replace(autoToken, '') || 'top'
            $tip.detach().css({
                top: 0
                , left: 0
                , display: 'block'
            }).addClass(placement).data('bs.' + this.type, this)
            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
            this.$element.trigger('inserted.bs.' + this.type)
            var pos = this.getPosition()
            var actualWidth = $tip[0].offsetWidth
            var actualHeight = $tip[0].offsetHeight
            if (autoPlace) {
                var orgPlacement = placement
                var viewportDim = this.getPosition(this.$viewport)
                placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement
                $tip.removeClass(orgPlacement).addClass(placement)
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)
            this.applyPlacement(calculatedOffset, placement)
            var complete = function () {
                var prevHoverState = that.hoverState
                that.$element.trigger('shown.bs.' + that.type)
                that.hoverState = null
                if (prevHoverState == 'out') that.leave(that)
            }
            $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete()
        }
    }
    Tooltip.prototype.applyPlacement = function (offset, placement) {
        var $tip = this.tip()
        var width = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)
        if (isNaN(marginTop)) marginTop = 0
        if (isNaN(marginLeft)) marginLeft = 0
        offset.top += marginTop
        offset.left += marginLeft
        $.offset.setOffset($tip[0], $.extend({
            using: function (props) {
                $tip.css({
                    top: Math.round(props.top)
                    , left: Math.round(props.left)
                })
            }
        }, offset), 0)
        $tip.addClass('in')
        var actualWidth = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight
        if (placement == 'top' && actualHeight != height) {
            offset.top = offset.top + height - actualHeight
        }
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)
        if (delta.left) offset.left += delta.left
        else offset.top += delta.top
        var isVertical = /top|bottom/.test(placement)
        var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'
        $tip.offset(offset)
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
    }
    Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
        this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '')
    }
    Tooltip.prototype.setContent = function () {
        var $tip = this.tip()
        var title = this.getTitle()
        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }
    Tooltip.prototype.hide = function (callback) {
        var that = this
        var $tip = $(this.$tip)
        var e = $.Event('hide.bs.' + this.type)

        function complete() {
            if (that.hoverState != 'in') $tip.detach()
            that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type)
            callback && callback()
        }
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip.removeClass('in')
        $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete()
        this.hoverState = null
        return this
    }
    Tooltip.prototype.fixTitle = function () {
        var $e = this.$element
        if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }
    Tooltip.prototype.hasContent = function () {
        return this.getTitle()
    }
    Tooltip.prototype.getPosition = function ($element) {
        $element = $element || this.$element
        var el = $element[0]
        var isBody = el.tagName == 'BODY'
        var elRect = el.getBoundingClientRect()
        if (elRect.width == null) {
            elRect = $.extend({}, elRect, {
                width: elRect.right - elRect.left
                , height: elRect.bottom - elRect.top
            })
        }
        var elOffset = isBody ? {
            top: 0
            , left: 0
        } : $element.offset()
        var scroll = {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
        }
        var outerDims = isBody ? {
            width: $(window).width()
            , height: $(window).height()
        } : null
        return $.extend({}, elRect, scroll, outerDims, elOffset)
    }
    Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {
            top: pos.top + pos.height
            , left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'top' ? {
            top: pos.top - actualHeight
            , left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'left' ? {
            top: pos.top + pos.height / 2 - actualHeight / 2
            , left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2
            , left: pos.left + pos.width
        }
    }
    Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0
            , left: 0
        }
        if (!this.$viewport) return delta
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
        var viewportDimensions = this.getPosition(this.$viewport)
        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
            if (topEdgeOffset < viewportDimensions.top) {
                delta.top = viewportDimensions.top - topEdgeOffset
            }
            else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
            }
        }
        else {
            var leftEdgeOffset = pos.left - viewportPadding
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth
            if (leftEdgeOffset < viewportDimensions.left) {
                delta.left = viewportDimensions.left - leftEdgeOffset
            }
            else if (rightEdgeOffset > viewportDimensions.right) {
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
            }
        }
        return delta
    }
    Tooltip.prototype.getTitle = function () {
        var title
        var $e = this.$element
        var o = this.options
        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)
        return title
    }
    Tooltip.prototype.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))
        return prefix
    }
    Tooltip.prototype.tip = function () {
        if (!this.$tip) {
            this.$tip = $(this.options.template)
            if (this.$tip.length != 1) {
                throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
            }
        }
        return this.$tip
    }
    Tooltip.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
    }
    Tooltip.prototype.enable = function () {
        this.enabled = true
    }
    Tooltip.prototype.disable = function () {
        this.enabled = false
    }
    Tooltip.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }
    Tooltip.prototype.toggle = function (e) {
        var self = this
        if (e) {
            self = $(e.currentTarget).data('bs.' + this.type)
            if (!self) {
                self = new this.constructor(e.currentTarget, this.getDelegateOptions())
                $(e.currentTarget).data('bs.' + this.type, self)
            }
        }
        if (e) {
            self.inState.click = !self.inState.click
            if (self.isInStateTrue()) self.enter(self)
            else self.leave(self)
        }
        else {
            self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
        }
    }
    Tooltip.prototype.destroy = function () {
        var that = this
        clearTimeout(this.timeout)
        this.hide(function () {
            that.$element.off('.' + that.type).removeData('bs.' + that.type)
            if (that.$tip) {
                that.$tip.detach()
            }
            that.$tip = null
            that.$arrow = null
            that.$viewport = null
        })
    }

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.tooltip')
            var options = typeof option == 'object' && option
            if (!data && /destroy|hide/.test(option)) return
            if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }
    var old = $.fn.tooltip
    $.fn.tooltip = Plugin
    $.fn.tooltip.Constructor = Tooltip
    $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old
        return this
    }
}(jQuery);
var Popup = {
    init: function () {
        this.getScrollbarWidth();
        this.events();
    }
    , show: function (id) {
        jQuery('body').addClass('popup-open').css('padding-right', scrollWidth + 'px');
        jQuery('<div class="popup-bg"></div>').appendTo(jQuery('body'));
        jQuery(id).addClass('active').css('padding-right', scrollWidth + 'px');
        this.centerMode(id);
        jQuery(id).trigger("show.popup");
    }
    , hide: function (id) {
        jQuery('body').removeClass('popup-open').css('padding-right', 0);
        jQuery('.popup-bg').remove();
        jQuery(id).removeClass('active');
        jQuery(id).trigger("hide.popup");
    }
    , centerMode: function (id) {
        var popup = jQuery(id).find('.popup');
        imagesLoaded(popup, function (instance) {
            var popup_h = popup.height()
                , margin = jQuery(window).height() - popup_h;
            (margin > 0) ? popup.css('margin-top', (margin / 2) + 'px'): false;
        });
    }
    , getScrollbarWidth: function () {
        var div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        window.scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
    }
    , events: function () {
        jQuery('.popup-container').on('click', function () {
            Popup.hide('.popup-container');
        });
        jQuery('.popup').on('click', function (event) {
            event.stopPropagation();
        });
        jQuery('[data-popup]').on('click', function () {
            var id = jQuery(this).data('target');
            Popup.show(id);
            return false;
        });
        jQuery('[data-popup-close]').on('click', function () {
            var id = jQuery(this).closest('.popup-container').attr('id');
            if (id) {
                Popup.hide('#' + id);
                return false;
            }
        });
        jQuery('.ok').on('click', function () {
            var id = jQuery(this).closest('.popup-container').attr('id');
            if (id) {
                Popup.hide('#' + id);
                return false;
            }
        });
    }
}
jQuery(function () {
    Popup.init();
});
'use strict';
var Search = {
    init: function () {
        Search.initValidate();
        Search.initValidateMobile();
    }
    , initAddNextItems: function () {
        if ($('#load_search_products').length) {
            var button = jQuery('#load_search_products')
                , itemsContainer = jQuery('.search-block');
            button.click(function () {
                jQuery.ajax({
                    type: "POST"
                    , url: '/search/load'
                    , data: {
                        q: jQuery('#query').val().trim()
                        , skip: jQuery('#load-skip-items').val().trim()
                    , }
                    , dataType: 'json'
                    , success: function (response) {
                        if (response.status) {
                            jQuery(response.html).appendTo(itemsContainer);
                            jQuery('#load-skip-items').val(response.skip);
                            if (!response.exist) {
                                button.hide();
                            }
                        }
                    }
                });
            });
        }
    }
    , initValidate: function () {
        jQuery("[name=header-search-form]").validate({
            rules: {
                q: {
                    required: true
                    , minlength: 3
                }
            }
            , highlight: function (element) {
                $(element).addClass("error");
            }
            , unhighlight: function (element) {
                $(element).removeClass("error");
            }
            , errorPlacement: function (error, element) {}
            , submitHandler: function (form) {
                form.submit();
            }
        });
    }
    , initValidateMobile: function () {
        jQuery("[name=header-search-form-mobile]").validate({
            rules: {
                q: {
                    required: true
                    , minlength: 3
                }
            }
            , highlight: function (element) {
                $(element).addClass("error");
            }
            , unhighlight: function (element) {
                $(element).removeClass("error");
            }
            , errorPlacement: function (error, element) {}
            , submitHandler: function (form) {
                form.submit();
            }
        });
    }
};
jQuery(document).ready(function () {
    Search.init();
});
var Reyting = {
    init: function () {
        $('[data-jq-rating]').jqRating();
    }
    , change: function (_this) {
        var data = {}
        id = parseInt(_this.data('id')), value = _this.find('.reyting_input').val();
        data['id'] = id;
        data['value'] = value;
        data['model'] = _this.data('model');
        $.post("/rating/add_vote", {
            data: data
        }, function (response) {
            if (response.status == "error") {
                _this.find('.message').html("<span class='rating_error'>" + response.error_messages + "</span>");
            }
            else {
                _this.find('.message').html("<span class='rating_success'>" + response.ok_messages + "</span>");
            }
        }, "json");
    }
    , events: function () {
        $('.jq-rating-star').on('click', function () {
            var _this = $(this).closest('.reyting');
            Reyting.change(_this);
        });
    }
};
$(function () {
    Reyting.init();
    $('.jq-rating').click(function () {
        Reyting.change($(this).closest('.reyting'));
    });
});
'use strict';
var User = {
    init: function () {
        if ($('#login').length) {
            $("#login_btn").click(function () {
                User.login();
                $("#login").submit();
            });
            $("#forget_pass_btn").click(function () {
                Popup.hide('#entry');
                Popup.show('#remind_password');
            });
        }
        if ($('#remind_password').length) {
            $("#remember_pss_btn").click(function () {
                Popup.hide('#remind_password');
                Popup.show('#entry');
            });
            $("#remember_btn").click(function () {
                User.forgetPass();
                $("#forget_pass_form").submit();
            });
        }
        if ($('#regist').length) {
            $("#regit_btn").click(function () {
                User.registr();
                $("#registration_form").submit();
            });
        }
        if ($('#form_upload_user_photo').length) {
            $('#file').change(function () {
                User.changeUserPhoto();
                $('#form_upload_user_photo').submit();
            });
            $('#delete_btn').click(function () {
                User.deleteUserPhoto();
            });
        }
        $('#showMore').click(function () {
            var lastOrders = $('.container').find('.last_orders');
            $(lastOrders).each(function (key, value) {
                if ($(value).css('display') == 'none') {
                    $(value).show();
                }
                $('#showMore').hide();
            });
        });
    }
    , login: function () {
        jQuery("#login").validate({
            rules: {
                email: {
                    required: true
                    , email: true
                }
                , password: {
                    required: true
                    , minlength: 5
                    , maxlength: 20
                }
            }
            , messages: {
                email: {
                    required: 'Введите адрес эл.почты'
                    , email: 'Введите валидный адрес эл.почты'
                }
                , password: {
                    required: 'Введите пароль'
                    , minlength: 'Введите больше 5-и символов'
                    , maxlength: 'Введите меньше 20-и символов'
                }
            }
            , highlight: function (element) {
                $(element).addClass("error");
                $("#response_message").html("");
            }
            , unhighlight: function (element) {
                $(element).removeClass("error");
            }
            , errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
            , submitHandler: function (form) {
                var filds = $("#login").serialize();
                jQuery.ajax({
                    url: '/auth/login'
                    , type: 'POST'
                    , dataType: 'json'
                    , cache: false
                    , data: {
                        filds: filds
                    }
                    , success: function (response) {
                        if (response.status == "error") {
                            $("#response_message").html(response.errors_messages);
                        }
                        else {
                            $("#response_message").html(response.ok_messages);
                            setTimeout("location.href = '/profile'", 1000);
                        }
                    }
                });
            }
        });
    }
    , forgetPass: function () {
        jQuery("#forget_pass_form").validate({
            rules: {
                email: {
                    required: true
                    , email: true
                }
            }
            , messages: {
                email: {
                    required: 'Введите адрес эл.почты'
                    , email: 'Введите валидный адрес эл.почты'
                }
            }
            , errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
            , submitHandler: function (form) {
                var filds = $("#forget_pass_form").serialize();
                jQuery.ajax({
                    url: '/auth/forgot_pass'
                    , type: 'POST'
                    , dataType: 'json'
                    , cache: false
                    , data: {
                        filds: filds
                    }
                    , success: function (response) {
                        console.log(response);
                        if (response.status == "error") {
                            $("#response_message_forget_pass").html(response.errors_messages);
                        }
                        else {
                            $("#response_message_forget_pass").html(response.ok_messages);
                        }
                    }
                });
            }
        });
    }
    , registr: function () {
        jQuery("#registration_form").validate({
            rules: {
                name: {
                    required: true
                }
                , email: {
                    required: true
                    , email: true
                }
                , password: {
                    required: true
                    , minlength: 5
                }
                , re_password: {
                    required: true
                }
            }
            , messages: {
                name: {
                    required: 'Введите имя'
                }
                , email: {
                    required: 'Введите адрес эл.почты'
                    , email: 'Введите валидный адрес эл.почты'
                }
                , password: {
                    required: 'Введите пароль'
                    , minlength: 'Введите больше 5-и символов'
                }
                , re_password: {
                    required: 'Введите пароль еще раз'
                }
            }
            , errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
            , submitHandler: function (form) {
                if ($("[name=regist] [name=password]").val() == $("[name=regist] [name=re_password]").val()) {
                    $.post("/auth/registration", {
                        filds: $("[name=regist]").serialize()
                    }, function (data) {
                        if (data.status == "error") {
                            $(".registration_form_error").html(data.errors_messages);
                        }
                        else {
                            $(".registration_form_error").html("<span style='color:green'>" + data.ok_messages + "</span>");
                            setTimeout("Popup.hide('#regist')", 3000);
                        }
                    }, "json");
                }
                else {
                    $("[name=regist] .registration_form_error").html("Ошибка! Пароли не совпадают");
                }
            }
        });
    }
    , changeUserPhoto: function () {
        $('#form_upload_user_photo').on('submit', (function (e) {
            e.preventDefault();
            var formData = new FormData(this);
            console.log(formData);
            jQuery.ajax({
                url: '/profile/change-photo'
                , type: 'POST'
                , cache: false
                , contentType: false
                , processData: false
                , data: formData
                , success: function (response) {
                    if (response.status) {
                        $('.avatar').css('background-image', 'url(' + response.picture + ')');
                        $('.user_img').css('background-image', 'url(' + response.picture + ')');
                    }
                }
            });
        }));
    }
    , changeUserInfo: function (element, button) {
        var val = $("#" + element).val()
            , url = '/profile/change-' + element;
        if (val) {
            jQuery.ajax({
                url: url
                , type: 'POST'
                , dataType: 'json'
                , cache: false
                , data: {
                    data: val
                }
                , success: function (response) {
                    if (response.status) {
                        $("#" + element).parents('.info_item').find('.data').text(val);
                        $("#" + element).parents('.info_item').find('.data-block').show();
                        $("#" + element).parents('.info_item').find('.redact_item').hide();
                    }
                }
            });
        }
        else {
            $("#" + element).addClass('error');
            $(button).parents('.info_item').find('.redact_item').show();
        }
    }
    , deleteUserPhoto: function () {
        jQuery.ajax({
            url: '/profile/delete-photo'
            , type: 'POST'
            , cache: false
            , contentType: false
            , processData: false
            , success: function (response) {
                if (response.status) {
                    $('.avatar').css('background-image', 'url(' + response.picture + ')');
                    $('.user_img').css('background-image', 'url(' + response.picture + ')');
                }
            }
        });
    }
    , repeateOrder: function (orderBtn) {
        var orderId = $(orderBtn).attr('data-id');
        jQuery.ajax({
            url: '/profile/repeate-order'
            , type: 'POST'
            , cache: false
            , data: {
                orderId: orderId
            }
            , success: function (response) {
                if (response.status) {
                    showSuccessMessage(response.message);
                    setTimeout(location.reload(), 1000);
                }
                else {
                    showErrorMessage(response.message);
                }
            }
        });
    }
};
jQuery(document).ready(function () {
    User.init();
});
$(document).ready(function () {
    if ($("input.day").length) {
        $("input.day").mask("99");
    }
    if ($("input.month").length) {
        $("input.month").mask("99");
    }
    if ($("input.year").length) {
        $("input.year").mask("9999");
    }
    if ($("input.hour").length) {
        $("input.hour").mask("99");
    }
    if ($("input.minutes").length) {
        $("input.minutes").mask("99");
    }
    if ($("input.code").length) {
        $("input.code").mask("999");
    }
    if ($("input.number").length) {
        $("input.number").mask("9999999");
    }
    if ($("input.phone").length) {
        $("input.phone").mask("+38(099)999-99-99");
    }
    $(".tab-btn").click(function (e) {
        e.preventDefault();
        var type = $(this).attr('data-tab')
            , price = $('#total_price_order').attr('data-price');
        $('#total_price_order').html(price + " грн");
        if (!$(this).hasClass("act")) {
            $(".tab-btn").removeClass("act");
            $(this).addClass("act");
            $(".tab-block").hide();
            $(".tab-block[data-id='" + $(this).data("tab") + "']").show();
        }
    })
    $('.rest-popup-btn').click(function () {
        Popup.show('#rest');
        $('#rest .text').perfectScrollbar();
    });
});

function showSuccessMessage(message) {
    if (typeof message != "string") return;
    $('.congratulations_text').html(message);
    Popup.show('#congratulations');
}

function showErrorMessage(message) {
    if (typeof message != "string") return;
    $('#error_text').html(message);
    Popup.show('#error');
}

function showMinPriceMessage(message) {
    if (typeof message != "string") return;
    $('#error_min_text').html(message);
    Popup.show('#min_price');
}
var Order = {
    init: function () {
        Order.courier();
        Order.pickup();
        Order.choseForm();
        jQuery('#call_back_btn').click(function (e) {
            e.preventDefault();
            Order.call_back();
            $("#apply_form_call_back").submit();
        });
    }
    , choseForm: function () {
        jQuery('#ordering_btn').on("click", function () {
            var type = jQuery('.tab-btn.act').attr('data-tab');
            if (type == 'courier') {
                $("#apply_form_courier").submit();
            }
            if (type == 'pickup') {
                $("#apply_form_pickup").submit();
            }
        });
    }
    , pickup: function () {
        var $validator = jQuery('#apply_form_pickup').validate({
            rules: {
                'pickup_name': {
                    required: true
                    , minlength: 2
                    , regex: /^[а-яіґїєё ]+(’[а-яіґїєё ]+)?$/ig
                }
                , 'pickup_phone_code': {
                    required: true
                    , digits: true
                    , minlength: 3
                    , maxlength: 3
                }
                , 'pickup_phone_number': {
                    required: true
                }
                , 'pickup_email': {
                    email: true
                    , maxlength: 32
                }
                , 'pickup_street': {
                    required: true
                }
                , 'pickup_delivery_day': {
                    required: true
                    , digits: true
                    , minlength: 2
                    , maxlength: 2
                }
                , 'pickup_delivery_month': {
                    required: true
                    , digits: true
                    , minlength: 2
                    , maxlength: 2
                }
                , 'pickup_delivery_hour': {
                    required: true
                    , digits: true
                    , minlength: 2
                    , maxlength: 2
                }
                , 'pickup_delivery_minutes': {
                    required: true
                    , digits: true
                    , minlength: 2
                    , maxlength: 2
                }
                , 'is_pickup_cash_type': {
                    required: true
                }
                , 'checkbox21': {
                    required: true
                }
            }
            , messages: {
                'pickup_name': {
                    required: ''
                }
                , 'pickup_phone_code': {
                    required: ''
                    , digits: ''
                }
                , 'pickup_phone_number': {
                    required: ''
                }
                , 'pickup_email': {
                    required: ''
                    , email: ''
                }
                , 'pickup_street': {
                    required: ''
                }
                , 'pickup_delivery_day': {
                    required: ''
                    , digits: ''
                }
                , 'pickup_delivery_month': {
                    required: ''
                    , digits: ''
                }
                , 'pickup_delivery_hour': {
                    required: ''
                    , digits: ''
                }
                , 'pickup_delivery_minutes': {
                    required: ''
                    , digits: ''
                }
                , 'is_pickup_cash_type': {
                    required: ''
                }
                , 'checkbox21': {
                    required: ''
                }
            }
            , submitHandler: function (form) {
                var valSelect = $(form).find('[name=pickup_street]').val()
                    , positionForm = $(".address-form").offset().top;
                console.log(positionForm);
                if (valSelect == '') {
                    $('[name=pickup_street]').parent().addClass("error");
                    $("html, body").animate({
                        scrollTop: positionForm
                    }, 600);
                    return false;
                }
                else {
                    $('[name=pickup_street]').parent().removeClass("error");
                }
                jQuery('#ordering_btn').prop('disabled', true);
                var data = jQuery(form).serializeArray();
                data.push({
                    name: "delivery_type"
                    , value: jQuery('.tab-btn.act').attr('data-tab')
                });
                jQuery.ajax({
                    url: '/apply-form/pickup'
                    , type: 'POST'
                    , dataType: 'json'
                    , cache: false
                    , data: data
                    , success: function (response) {
                        jQuery('#ordering_btn').prop('disabled', false);
                        if (response.status) {
                            if (response.platon || response.liqpay) {
                                window.location.href = response.url;
                            }
                            else {
                                jQuery(form)[0].reset();
                                Popup.show('#congratulations');
                                ga('send', 'pageview', '/virtual/cart');
                                ga('ecommerce:addTransaction', {
                                    'id': response.id
                                    , 'affiliation': 'pestocafe.ua'
                                    , 'revenue': response.total
                                });
                                ga('ecommerce:send');
                                setTimeout("location.href = '/'", 1000);
                            }
                        }
                        else if (response.night_notify) {
                            Popup.show('#night_notification');
                        }
                        else {
                            $('#error_text').html(response.message);
                            Popup.show('#error');
                        }
                    }
                });
            }
            , errorPlacement: function (error, element) {}
        });
    }
    , courier: function () {
        $.validator.addMethod("regex", function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        });
        var $validator = jQuery('#apply_form_courier').validate({
            rules: {
                'pickup_name': {
                    required: true
                    , minlength: 2
                    , regex: /^[а-яіґїєё ]+(’[а-яіґїєё ]+)?$/ig
                }
                , 'pickup_phone_code': {
                    required: true
                    , digits: true
                    , minlength: 3
                    , maxlength: 3
                }
                , 'pickup_phone_number': {
                    required: true
                }
                , 'pickup_email': {
                    email: true
                    , maxlength: 32
                }
                , 'delivery_home': {
                    required: true
                    , regex: /[0-9]+([ /\-]{1}[а-яіґїєё]{1})?$/ig
                }
                , 'delivery_flat': {
                    digits: true
                }
                , 'pickup_delivery_day': {
                    required: true
                    , digits: true
                    , minlength: 2
                    , maxlength: 2
                }
                , 'pickup_delivery_month': {
                    required: true
                    , digits: true
                    , minlength: 2
                    , maxlength: 2
                }
                , 'pickup_delivery_hour': {
                    required: true
                    , digits: true
                    , minlength: 2
                    , maxlength: 2
                }
                , 'pickup_delivery_minutes': {
                    required: true
                    , digits: true
                    , minlength: 2
                    , maxlength: 2
                }
                , 'is_pickup_cash_type': {
                    required: true
                }
                , 'pickup_street': {
                    required: ''
                }
                , 'checkbox2': {
                    required: true
                }
            }
            , messages: {
                'pickup_name': {
                    required: ''
                }
                , 'pickup_phone_code': {
                    required: ''
                    , digits: ''
                }
                , 'pickup_phone_number': {
                    required: ''
                }
                , 'pickup_email': {
                    required: ''
                    , email: ''
                }
                , 'delivery_home': {
                    required: ''
                }
                , 'delivery_flat': {
                    digits: ''
                }
                , 'pickup_delivery_day': {
                    required: ''
                    , digits: ''
                }
                , 'pickup_delivery_month': {
                    required: ''
                    , digits: ''
                }
                , 'pickup_delivery_hour': {
                    required: ''
                    , digits: ''
                }
                , 'pickup_delivery_minutes': {
                    required: ''
                    , digits: ''
                }
                , 'is_pickup_cash_type': {
                    required: ''
                }
                , 'pickup_street': {
                    required: ''
                }
                , 'checkbox2': {
                    required: ''
                }
            }
            , submitHandler: function (form) {
                var valSelect = $(form).find('[name=pickup_street]').val()
                    , positionForm = $(".address-form").offset().top;
                console.log(positionForm);
                if (valSelect == '') {
                    $('[name=pickup_street]').parent().addClass("error");
                    $("html, body").animate({
                        scrollTop: positionForm
                    }, 600);
                    return false;
                }
                else {
                    $('[name=pickup_street]').parent().removeClass("error");
                }
                jQuery('#ordering_btn').prop('disabled', true);
                var data = jQuery(form).serializeArray();
                data.push({
                    name: "delivery_type"
                    , value: jQuery('.tab-btn.act').attr('data-tab')
                });
                jQuery.ajax({
                    url: '/apply-form/courier'
                    , type: 'POST'
                    , dataType: 'json'
                    , cache: false
                    , data: data
                    , success: function (response) {
                        jQuery('#ordering_btn').prop('disabled', false);
                        if (response.status) {
                            if (response.platon || response.liqpay) {
                                window.location.href = response.url;
                            }
                            else {
                                jQuery(form)[0].reset();
                                showSuccessMessage(response.message);
                                ga('send', 'pageview', '/virtual/cart');
                                setTimeout("location.href = '/'", 1000);
                            }
                        }
                        else if (response.validation) {
                            $('#error_text').html(response.message);
                            Popup.show('#error');
                        }
                        else if (response.night_notify) {
                            Popup.show('#night_notification');
                        }
                    }
                });
            }
            , errorPlacement: function (error, element) {}
        });
    }
    , call_back: function () {
        var $validator = jQuery('#apply_form_call_back').validate({
            rules: {
                'name': {
                    required: true
                    , minlength: 2
                }
                , 'phone': {
                    required: true
                }
            }
            , messages: {
                'name': {
                    required: ''
                }
                , 'phone': {
                    required: ''
                }
            }
            , submitHandler: function (form) {
                jQuery('#call_back_btn').prop('disabled', true);
                var data = jQuery(form).serializeArray();
                jQuery.ajax({
                    url: '/apply-form/callback'
                    , type: 'POST'
                    , dataType: 'json'
                    , cache: false
                    , data: data
                    , success: function (response) {
                        jQuery('#call_back_btn').prop('disabled', false);
                        if (response.status) {
                            jQuery(form)[0].reset();
                            yaCounter34974900.reachGoal('cart');
                            ga('send', 'pageview', '/virtual/cart');
                            ga('ecommerce:addTransaction', {
                                'id': response.id
                                , 'affiliation': 'pestocafe.ua'
                                , 'revenue': response.total
                            });
                            Popup.hide('#call_back');
                            showSuccessMessage(response.message);
                        }
                        else {
                            showErrorMessage(response.message);
                        }
                    }
                });
            }
            , errorPlacement: function (error, element) {}
        });
    }
    , changeDeliveryDay: function (day) {
        var dayVal = $(day).val()
            , monthVal = $(day).parent().find('select[name="pickup_delivery_month"]').val()
            , yearVal = $(day).parent().find('select[name="pickup_delivery_year"]').val()
            , type = jQuery('.tab-btn.act').attr('data-tab');
        if (dayVal && monthVal && yearVal) {
            var date = dayVal + '.' + monthVal + '.' + yearVal;
        }
        jQuery.ajax({
            url: '/ordering/take-time'
            , type: 'POST'
            , dataType: 'json'
            , cache: false
            , data: {
                type: type
                , date: date
            }
            , success: function (response) {
                if (response.status) {
                    if (response.type == 'courier') {
                        var pickup_delivery_time_courier = $('#apply_form_courier').find('select[name="pickup_delivery_time"]');
                        pickup_delivery_time_courier.html(response.html);
                        pickup_delivery_time_courier.selectbox("detach");
                        pickup_delivery_time_courier.selectbox({
                            speed: 400
                        });
                    }
                    if (response.type == 'pickup') {
                        var pickup_delivery_time_pickup = $('#apply_form_pickup').find('select[name="pickup_delivery_time"]');
                        pickup_delivery_time_pickup.html(response.html);
                        pickup_delivery_time_pickup.selectbox("detach");
                        pickup_delivery_time_pickup.selectbox({
                            speed: 400
                        });
                    }
                }
            }
        });
    }
};
jQuery(function () {
    Order.init();
    $('[name=comment]').keyup(function () {
        var val = $(this).val()
            , newVal = val.replace(/\"/gi, "\'");
        $(this).val(newVal);
    });
    $('[name=delivery_flat]').keyup(function () {
        this.value = this.value.replace(/[^0-9]/i, "");
    });
});
'use strict';
var App = {
    lang: 'ua'
    , lang_segment: ''
    , token: ''
    , show_modal_timeout: 5000
    , latitude: ''
    , longitude: ''
    , init: function () {
        App.ScrollTo();
    }
    , prepareLangSegment: function () {
        if (App.lang != 'ru') {
            App.lang_segment = '/' + App.lang;
        }
    }
    , getUrlParameter: function (param) {
        var pageURL = window.location.search.substring(1);
        var urlVariables = pageURL.split('&');
        for (var i = 0; i < urlVariables.length; i++) {
            var parameterName = urlVariables[i].split('=');
            if (parameterName[0] == param) {
                return parameterName[1];
            }
        }
    }
    , redirectTo: function (url) {
        window.location = url;
    }
    , onlyNumeric: function (val) {
        var val = String(val);
        var newstr = val.replace(/[^0-9]/gi, "");
        return newstr;
    }
    , ScrollTo: function () {
        if ($('[data-scrollto]').length) {
            $('[data-scrollto]').click(function (e) {
                var target = $(this).attr('data-scrollto');
                if ($('.' + target).length) {
                    e.preventDefault();
                    $('html, body').stop(1, 1).animate({
                        scrollTop: $('.' + target).first().offset().top - $('.main-menu-block').height() - $('.fixed-header').height()
                    }, 600);
                }
            });
        }
    }
    , renderCaptcha: function (id) {
        if ($('#' + id).length) {
            setTimeout(function () {
                var captchaId = grecaptcha.render(id, {
                    'sitekey': '6Lel-AwUAAAAADhGGYFD7oqYHyOL1Ur5cck_amc5'
                    , 'theme': 'light'
                });
                $('#' + id).attr('data-captcha-id', captchaId)
            }, 1000);
        }
    }
    , resetCaptcha: function (id) {
        if ($('#' + id).length) {
            var captchaId = $('#' + id).attr('data-captcha-id');
            grecaptcha.reset(captchaId);
        }
    }
    , numberWithSpaces: function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    , inputNumberValidation: function (el) {
        var value = $(el).val()
            , min_val = $(el).attr('data-min')
            , max_val = $(el).attr('data-max');
        value = value.replace(' ', '');
        if (parseInt(value) > parseInt(max_val)) {
            $(el).val(max_val);
        }
        else if (parseInt(value) < parseInt(min_val)) {
            $(el).val(min_val);
        }
        else {
            $(el).val(value);
        }
    }
    , ScrollToElement: function (index) {
        var element = $('[data-id-element=' + index + ']');
        if (!element.length) {
            return;
        }
        element.toggleClass("open");
        $('html, body').animate({
            scrollTop: $(element).first().offset().top - 100
        }, 600);
    }
    , getCurrentPosition: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                App.latitude = position.coords.latitude;
                App.longitude = position.coords.longitude;
                App.getLocation();
            }, function () {});
        }
        else {}
    }
    , getLocation: function () {
        jQuery.ajax({
            url: App.lang_segment + '/get-nearest-location'
            , type: 'POST'
            , dataType: 'json'
            , cache: false
            , data: {
                _token: App.token
                , lat: App.latitude
                , long: App.longitude
            }
            , success: function (response) {
                if (response.status) {
                    App.showSuccessModal(response.city + ' -- ' + response.coord);
                }
            }
        });
    }
};
jQuery(document).ready(function () {
    App.init();
});