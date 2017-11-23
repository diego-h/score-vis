//~ Version: 42, Copyright (C) 2014-2017: Willem Vree, contributions Stéphane David.
//~ This program is free software; you can redistribute it and/or modify it under the terms of the
//~ GNU General Public License as published by the Free Software Foundation; either version 2 of
//~ the License, or (at your option) any later version.
//~ This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
//~ without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//~ See the GNU General Public License for more details. <http://www.gnu.org/licenses/gpl.html>.
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, m, n) {
    if (n.get || n.set) throw new TypeError("ES3 does not support getters and setters.");
    e != Array.prototype && e != Object.prototype && (e[m] = n.value)
};
$jscomp.getGlobal = function(e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(e) {
    return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var e = $jscomp.global.Symbol.iterator;
    e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function() {}
};
$jscomp.arrayIterator = function(e) {
    var m = 0;
    return $jscomp.iteratorPrototype(function() {
        return m < e.length ? {
            done: !1,
            value: e[m++]
        } : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function(e) {
    $jscomp.initSymbolIterator();
    e = {
        next: e
    };
    e[$jscomp.global.Symbol.iterator] = function() {
        return this
    };
    return e
};
$jscomp.iteratorFromArray = function(e, m) {
    $jscomp.initSymbolIterator();
    e instanceof String && (e += "");
    var n = 0,
        t = {
            next: function() {
                if (n < e.length) {
                    var u = n++;
                    return {
                        value: m(u, e[u]),
                        done: !1
                    }
                }
                t.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return t.next()
            }
        };
    t[Symbol.iterator] = function() {
        return t
    };
    return t
};
$jscomp.polyfill = function(e, m, n, t) {
    if (m) {
        n = $jscomp.global;
        e = e.split(".");
        for (t = 0; t < e.length - 1; t++) {
            var u = e[t];
            u in n || (n[u] = {});
            n = n[u]
        }
        e = e[e.length - 1];
        t = n[e];
        m = m(t);
        m != t && null != m && $jscomp.defineProperty(n, e, {
            configurable: !0,
            writable: !0,
            value: m
        })
    }
};
$jscomp.polyfill("Array.prototype.keys", function(e) {
    return e ? e : function() {
        return $jscomp.iteratorFromArray(this, function(e) {
            return e
        })
    }
}, "es6-impl", "es3");
$jscomp.findInternal = function(e, m, n) {
    e instanceof String && (e = String(e));
    for (var t = e.length, u = 0; u < t; u++) {
        var A = e[u];
        if (m.call(n, A, u, e)) return {
            i: u,
            v: A
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.polyfill("Array.prototype.find", function(e) {
    return e ? e : function(e, n) {
        return $jscomp.findInternal(this, e, n).v
    }
}, "es6-impl", "es3");
var msc_VERSION = 42,
    opt, onYouTubeIframeAPIReady, msc_credits, media_height, times_arr, offset_js, endtime_js, abc_arr, lpRec;
(function() {
    function e() {
        opt = {
            jump: 0,
            no_menu: 0,
            repufld: 0,
            noplyr: 0,
            nocsr: 0,
            media_height: "",
            btns: 1,
            ipadr: "",
            mstr: 0,
            autscl: 0,
            ctrmed: 0,
            ctrnot: 0,
            lncsr: 0,
            opacity: .2,
            synbox: 0,
            speed: 1,
            top_margin: 0,
            yubvid: "",
            nomed: 0,
            delay: 0,
            repskip: 0,
            spdctl: 0,
            lopctl: 0,
            metro: 0
        };
        $("#yubuse").prop("checked", !1);
        $("#yvdlbl, #vidyub").css("display", "none");
        msc_credits = void 0;
        $("#credits").html("");
        media_height = void 0;
        $("#buttons").css("height", "");
        V = "";
        r = 0;
        h = null
    }

    function m(b, c, d, g, f, e, k) {
        this.xs = b;
        this.ymin = c;
        this.ymax = d;
        this.times =
            g;
        this.times.unshift(0);
        this.tixbts = k;
        this.line = 0;
        this.msre = 1;
        this.width = 0;
        this.wijzer = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
        this.wijzer.attr("id", "wijzer");
        this.wijzer.css("overflow", "visible");
        this.shade = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
        this.shade.attr({
            width: "100%",
            height: "100%"
        });
        this.wijzer.append(this.shade);
        this.tiktak = $(document.createElementNS("http://www.w3.org/2000/svg", "text"));
        this.tiktak.attr("y", 5);
        this.tiktak.css({
            fill: "green",
            stroke: "green",
            "text-anchor": "end",
            "font-size": "xx-large"
        });
        this.wijzer.append(this.tiktak);
        this.atag = $(document.createElementNS("http://www.w3.org/2000/svg", "text"));
        this.atag.attr("id", "atag");
        this.atag.text("<");
        this.atag.css({
            fill: "red",
            stroke: "red",
            "text-anchor": "middle"
        });
        this.btag = $(document.createElementNS("http://www.w3.org/2000/svg", "text"));
        this.btag.attr("id", "btag");
        this.btag.text(">");
        this.btag.css({
            fill: "red",
            stroke: "red",
            "text-anchor": "middle"
        });
        "undefined" == typeof lpRec && (lpRec = {
            loopBtn: 1,
            loopStart: 0,
            loopEnd: g[g.length - 1]
        }, $("#lopctl").prop("checked", !1), opt.lopctl = 0);
        this.hmargin = 100;
        this.vmargin = 50;
        this.tmargin = 0 <= opt.top_margin ? opt.top_margin : this.vmargin;
        this.lastSync = 0;
        this.setScale();
        this.cursorTime = 0;
        this.time_ix = 1;
        this.tixlb = f;
        this.lbtix = e;
        this.repcnt = 1;
        this.noCursor = 0
    }

    function n() {
        this.paused = !0;
        this.currentTime = 0;
        this.klok = -1;
        this.step = 200;
        this.playing = 0;
        ca(.1, 4, .05)
    }

    function t() {
        var b = $("#abclbl"),
            c = b.html(),
            d = $("#impbox").prop("checked");
        b.toggleClass("abcimp", d);
        b.html(d ?
            c.replace("score file", "<b>import</b>") : c.replace("<b>import</b>", "score file"));
        d && !opt.btns && $("#btns").click()
    }

    function u(b, c) {
        if (0 > b.indexOf("//# This page")) alert("not a preload file");
        else {
            b = c.replace(/\n/g, "");
            var d = b.match(/offset_js = (.*);/);
            1 < d.length && (q = offset_js = parseFloat(d[1]));
            d = b.match(/times_arr = (.*);abc_arr/);
            1 < d.length && (times = da(JSON.parse(d[1])));
            l && (l.times = times, l.times.unshift(0));
            $("#impbox").prop("checked", !1);
            t()
        }
    }

    function A(b) {
        var c = b.slice(0, 4E3);
        $("#impbox").prop("checked") ?
            u(c, b) : 0 <= c.indexOf("//# This page") ? (e(), eval(b), G()) : 0 <= c.indexOf("X:") ? ea(b) : -1 == c.indexOf("<?xml ") ? alert("not an xml file nor an abc file") : (b = $.parseXML(b), b = vertaal(b, {
                p: "f",
                t: 1,
                u: opt.repufld,
                v: 3
            }), b[1] && $("#err").append(b[1] + "\n"), ea(b[0]))
    }

    function ua(b) {
        $("#err").text("");
        lpRec = offset_js = times_arr = void 0;
        var c = b[0].link;
        C = b[0].name.split(".")[0];
        $("#wait").toggle(!0);
        $("#err").text("link: " + c + "\n");
        $.get(c, "", null, "text").done(function(b, c) {
            $("#err").append("preload: " + c + "\n");
            abc_arr = b.split("\n");
            G()
        }).fail(function(b, c, f) {
            $("#wait").append("\npreload failed: " + c)
        })
    }

    function fa(b, c) {
        $("#err").text("");
        offset_js = times_arr = void 0;
        $("#impbox").prop("checked") || (lpRec = void 0);
        var d = new FileReader;
        d.onload = function(b) {
            A(d.result)
        };
        var g = "dd" == b ? c[0] : $("#fknp").prop("files")[0];
        g && (C = g.name.split(".")[0], d.readAsText(g))
    }

    function va(b) {
        b.stopPropagation();
        b.preventDefault();
        $("body").toggleClass("indrag", !1);
        b = b.dataTransfer.files;
        /video|audio/.test(b[0].type) ? W("dd", b) : fa("dd", b)
    }

    function W(b,
        c) {
        var d, g;
        "dbx" == b ? (d = c[0], g = d.link) : (d = "dd" == b ? c[0] : $("#mknp").prop("files")[0], g = window.URL.createObjectURL(d));
        J(d.name, g)
    }

    function wa() {
        $("#yubid")[0].checkValidity() ? (opt.yubvid = $("#yubid").val(), J("", "")) : alert("The youtube video id should be 11 characters long,\neach from 'A' to 'Z', 'a' to 'z', '0' to '9', '-' or '_'")
    }

    function ca(b, c, d) {
        for (v = []; b <= c + .001; b += d) b = Math.round(100 * b) / 100, v.push(b)
    }

    function ga(b) {
        function c(b) {
            $("#yubuse").attr("disabled", b);
            $("#yublbl").css("color", b ? "#aaa" :
                "#000");
            $("#yubload").toggle(b)
        }
        b && (ha = b);
        "undefined" == typeof YT ? (c(!0), $("#yubuse").prop("checked", !1), $.getScript("https://www.youtube.com/iframe_api")) : (c(!1), ha())
    }

    function J(b, c) {
        c = c.replace("www.dropbox", "dl.dropboxusercontent").split("?")[0];
        V = 0 == c.indexOf("http") ? c : b;
        var d;
        b = b.split("?")[0];
        $("#vid, #aud").attr("src", "");
        K && K.stopVideo();
        H.clearKlok();
        if (b) {
            r = 0;
            if (/\.webm$|\.mp4$/i.test(b)) {
                d = $("#vid");
                if (0 == d.length) return;
                $("#vidyub, #aud").css("display", "none");
                d.css("display", "inline-block");
                $("#buttons").toggleClass("video", !0)
            } else {
                d = $("#aud");
                if (0 == d.length) return;
                $("#vidyub, #vid").css("display", "none");
                d.css("display", "inline-block");
                $("#buttons").toggleClass("video", !1)
            }
            h = d.get(0);
            /\.ogg$/i.test(c) && (h.canPlayType("audio/ogg") || (c = c.replace(/\.ogg$/i, ".mp3")));
            /\.webm$/i.test(c) && (h.canPlayType("video/webm") || (c = c.replace(/\.webm$/i, ".mp4")));
            d.attr("src", c + (q ? "#t=" + q : ""));
            d.on("timeupdate", P);
            d.on("playing", function() {
                H.setKlok(null, 0);
                h.playbackRate = opt.speed
            });
            d.on("pause", function() {
                H.pause()
            });
            d.on("loadedmetadata", B);
            ca(.5, 2, .05);
            D(0);
            B()
        } else r = 1, $("#vid, #aud").css("display", "none"), $("#vidyub").css("display", "inline-block"), $("#buttons").toggleClass("video", !0), ga(function() {
            h = K;
            v = h.getAvailablePlaybackRates();
            D(0);
            B();
            h.cueVideoById({
                videoId: opt.yubvid,
                startSeconds: q
            })
        })
    }

    function ia() {
        var b = $("#yubuse").prop("checked");
        $("#medlbl").css("display", b ? "none" : "block");
        $("#yvdlbl").css("display", b ? "block" : "none")
    }

    function X() {
        var b = parseInt($("body").css("width")) / 2,
            c = parseInt($("#vid").css("width")) /
            2,
            d = parseInt($("#vidyub").css("width")) / 2,
            g = parseInt($("#aud").css("width")) / 2;
        $("#vid").css("margin-left", opt.ctrmed ? (b - c).toFixed() + "px" : "0px");
        $("#vidyub").css("margin-left", opt.ctrmed ? (b - d).toFixed() + "px" : "0px");
        $("#aud").css("margin-left", opt.ctrmed ? (b - g).toFixed() + "px" : "0px");
        $("#meddiv").css("text-align", opt.ctrmed ? "left" : "center")
    }

    function B() {
        h && $(h).toggle(!opt.noplyr);
        $("#buttons").toggleClass("noheight", !!opt.noplyr);
        var b = $("#btns").prop("checked"),
            c = parseFloat($("#buttons").css("height")),
            d = parseFloat($("body").css("height")),
            b = b ? parseFloat($("#err").css("height")) : 0,
            d = 100 - (100 * (c + b) / d).toFixed();
        $("#notation").css("height", d + "%");
        $("#vidyub").css("width", (1.52 * c).toFixed());
        X()
    }

    function ea(b) {
        function c(b) {
            b = Object.keys(b).map(function(b) {
                return parseFloat(b)
            });
            b.sort(function(b, c) {
                return b - c
            });
            return b
        }

        function d(b) {
            var c = {
                    diamond: 1,
                    triangle: 1,
                    rectangle: 1
                },
                d = ['%%beginsvg\n<defs>\n<text id="x" x="-3" y="0">&#xe263;</text>\n<text id="normal" x="-3.7" y="0">&#xe0a4;</text>\n<g id="circle-x"><text x="-3" y="0">&#xe263;</text><circle r="4" class="stroke"/></g>\n<path id="triangle" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="stroke-width:1.4"/>\n<path id="triangle+" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="fill:#000"/>\n<path id="rectangle" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="rectangle+" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="fill:#000"/>\n<path id="diamond" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="diamond+" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="fill:#000"/>\n</defs>\n%%endsvg'],
                g, f, e, z = "default",
                k = {
                    "default": []
                };
            b = b.split("\n");
            for (g = 0; g < b.length; ++g)
                if (f = b[g], 0 <= f.indexOf("I:percmap") && (f = f.split(" "), e = f[4], e in c && (e = e + "+," + e), f = "%%map perc" + z + " " + f[1] + " print=" + f[2] + " midi=" + f[3] + " heads=" + e, k[z].push(f)), 0 <= f.indexOf("V:") && (e = f.match(/V:\s*(\S+)/))) z = e[1], z in k || (k[z] = []);
            for (z in k) d = d.concat(k[z]);
            for (g = 0; g < b.length; ++g) f = b[g], 0 <= f.indexOf("I:percmap") || (0 <= f.indexOf("V:") || 0 <= f.indexOf("K:") ? ((e = f.match(/V:\s*(\S+)/)) && (z = e[1]), 0 == k[z].length && (z = "default"), d.push(f),
                0 <= f.indexOf("perc") && -1 == f.indexOf("map=") && (f += " map=perc"), 0 <= f.indexOf("map=perc") && 0 < k[z].length && d.push("%%voicemap perc" + z), 0 <= f.indexOf("map=off") && d.push("%%voicemap")) : d.push(f));
            return d.join("\n")
        }
        var g = "",
            f = "",
            e, k = {},
            M = {},
            n = [],
            p, I = [],
            r = [],
            t = [],
            u = [],
            x = [],
            F = [],
            y = [],
            L = [
                [0, 0, 1]
            ],
            v = [];
        Q = "";
        w = [];
        R = [];
        l = null;
        q = 0;
        N = .1;
        S = 0;
        var E = $("#notation");
        $("body").attr("title", "");
        E.html("");
        var B = function(b) {
            var c, d;
            b = b.replace(/\r\n/g, "\n");
            b = b.split(/^\s*X:/m);
            if (1 == b.length) return [];
            c = b[1].split(/^\s*$/m);
            c = b[0] + "X:" + c[0];
            b = c.split(/\r\n|[\n\r\u0085\u2028\u2029]/);
            for (c = 0; c < Math.min(100, b.length); ++c)(d = b[c].match(/%%scale\s*([\d.]+)/)) && 1 == d[1] && (b[c] = "%%scale 0.99");
            return b
        }(b);
        b = B.join("\n");
        0 <= b.indexOf("percmap") && (b = d(b));
        e = new Abc({
            img_out: function(b) {
                -1 != b.indexOf("<svg") && (b = b.replace(/width="(\d*)px"\s*height="(\d*)px"/, 'width="$1px" height="$2px" viewbox="0 0 $1 $2"'), k = c(k), M = c(M), 1 < k.length && k[1] < Math.min.apply(null, r) && k.splice(0, 1), n.push({
                    xs: k,
                    ys: M
                }), k = {}, M = {}, r = []);
                g += b
            },
            errmsg: function(b,
                c, d) {
                f += b + "\n"
            },
            read_file: function(b) {
                return ""
            },
            anno_start: function(b, c, d, g, f, h, l) {
                "note" != b && "rest" != b || r.push(e.sx(g));
                "bar" == b && (g = e.sx(g).toFixed(2), f = e.sy(f).toFixed(2), k[g] = 1, M[f] = 1, p = e.sx(0).toFixed(2), k[p] = 1)
            },
            get_abcmodel: function(b, c, d) {
                var g = 768;
                d = 0;
                var f, e = 0;
                try {
                    f = c[0].meter.a_meter[0].top
                } catch (Ga) {
                    f = "4"
                }
                for (; b; b = b.ts_next)
                    if (0 == b.v) switch (b.type) {
                        case 14:
                            c = b.tempo_notes.reduce(function(b, c) {
                                return b + c
                            });
                            g = c * b.tempo / 60;
                            break;
                        case 8:
                        case 10:
                            d += b.dur / g;
                            break;
                        case 0:
                            if (b.time == e) {
                                F[F.length -
                                    1] += b.bar_type;
                                break
                            }
                            "eoln" in b && (e = b.time);
                            y.push(d);
                            d = 0;
                            f = f.replace("C|", "2").replace("C", "4");
                            x.push(parseInt(f));
                            F.push(b.bar_type);
                            t.push(b.text);
                            break;
                        case 6:
                            f = b.a_meter[0].top
                    }
            }
        });
        e.tosvg("abc2svg", b);
        "" != f && $("#err").append(f);
        E.html(g);
        initializeRectangleActions();
        w = E.find("svg");
        w.css("overflow", "visible");
        w.children("title").text("");
        E = w.children("g");
        for (b = 0; b < E.length; ++b) R.push(E.eq(b));
        var E = [],
            C = [],
            D = [];
        for (b = 0; b < n.length; ++b) {
            var A = n[b];
            E[b] = A.xs;
            C[b] = A.ys[0];
            D[b] = A.ys[A.ys.length - 1]
        }(function() {
            for (var b = 0,
                    c = 1, d = n[b].xs.length, f = 0, g = 0, e = 1, k = 0, h = 1, l = 0, ba = {};;) {
                var m = t[f - 1];
                if (m = m ? m.match(/[,\d]*(\d)/) : null) m = parseInt(m[1]), m != l && (l = m);
                if (!l || l >= h) g += y[f], I.push(g), u.push(x[f]), v[b] || (v[b] = []), v[b][c] || (v[b][c] = []), v[b][c][h] = L.length, L.push([b, c, h]);
                "|" != F[f] && (l = 0);
                m = /^:/.test(F[f]);
                if (!m || 1 != h || ba[f] || opt.repskip) {
                    if (m && (h = 1), /:$/.test(F[f]) && (e = L.length, k = f + 1, h = 1), f += 1, c += 1, c >= d) {
                        c = 1;
                        b += 1;
                        if (b >= n.length) break;
                        d = n[b].xs.length
                    }
                } else h = 2, ba[f] = 1, f = k, c = L[e][1], b = L[e][0], d = n[b].xs.length
            }
        })();
        "undefined" !=
        typeof times_arr && (I = da(times_arr));
        "undefined" != typeof offset_js && (q = offset_js);
        if ("undefined" != typeof endtime_js) var G = endtime_js - q,
            J = I[I.length - 1],
            I = I.map(function(b) {
                return b * G / J
            });
        Q = B;
        l = new m(E, C, D, I, L, v, u);
        l.setline(0);
        w.each(function() {
            $(this).mousedown(xa)
        });
        h || (h = H);
        var K = lpRec.loopStart + q + .01;
        setTimeout(function() {
            O("false:" + K + ":false", 0);
            ja()
        }, 0)
    }

    function da(b) {
        b = b.map(function(b) {
            return b.slice(1)
        });
        return b = b.reduce(function(b, d) {
            return b.concat(d)
        })
    }

    function P() {
        if (h) {
            var b = (r ? h.getCurrentTime() :
                    h.currentTime) - q,
                c = b;
            0 > b && (b = 0);
            opt.lopctl && (b > lpRec.loopEnd && (b = lpRec.loopStart), b < lpRec.loopStart && (b = lpRec.loopStart + .01), b != c && (r ? h.seekTo(b + q, !0) : h.currentTime = b + q));
            l && l.time2x(b)
        }
    }

    function xa(b) {
        b.preventDefault();
        b.stopPropagation();
        var c = w.get().indexOf(this);
        b = b.clientX;
        b -= $(this).position().left;
        l.x2time(b, c)
    }

    function ka() {
        $("#sync_out").css("display", opt.synbox ? "block" : "none");
        l && opt.synbox && l.showSyncInfo()
    }

    function la() {
        $("#medbts").css("display", opt.btns ? "inline" : "none");
        $("#err").css("display",
            opt.btns ? "block" : "none");
        B();
        opt.btns && "undefined" == typeof FileReader && $("#notation").prepend("<h3>Your browser does not support reading of local files ...</h3>but you can use the preload feature.")
    }

    function Y() {
        l && l.time2x(l.cursorTime);
        $("#notation").css("text-align", opt.ctrnot ? "center" : "left")
    }

    function ma() {
        var b = $("#spdctl").prop("checked");
        $("#spdlbl").css("display", b ? "block" : "none")
    }

    function na() {
        function b(b) {
            $("#drpuse").prop("checked", !b);
            $("#drpuse").attr("disabled", b);
            $("#drplbl").css("color",
                b ? "#aaa" : "#000")
        }
        if ("undefined" == typeof Dropbox) b(!0), $.ajax({
            url: "https://www.dropbox.com/static/api/2/dropins.js",
            dataType: "script",
            cache: !0
        }).done(function() {
            b(!1);
            Dropbox.init({
                appKey: "ckknarypgq10318"
            });
            ya();
            na()
        });
        else {
            var c = $("#drpuse").prop("checked");
            $(".dropbox-dropin-btn").css("display", c ? "inline-block" : "none");
            $("#fknp, #mknp").css("display", c ? "none" : "inline-block")
        }
    }

    function za(b, c) {
        function d() {
            f <= g && (y = setTimeout(d, e), l.tiktak.text(f), f += 1)
        }
        var g, f, e;
        clearInterval(y);
        y = 0;
        g = l.tixbts[b -
            1];
        f = 1;
        e = (l.times[b] - c) / g / opt.speed * 1E3;
        y = setTimeout(d, 0)
    }

    function oa() {
        l && setTimeout(function() {
            clearInterval(y);
            y = 0;
            l.tiktak.text("")
        }, 0)
    }

    function Aa(b, c) {
        function d() {
            $("#countin").toggle(!1);
            clearInterval(y);
            y = 0
        }

        function g() {
            $("#countin").html("<b>" + f.num + "</b>").toggle(!0);
            0 == f.num-- && (d(), O(b, c))
        }
        if (y) d();
        else {
            b = b.replace(":true", ":false");
            var f = l.compCountIn();
            g();
            y = setInterval(g, 1E3 * f.time)
        }
    }

    function O(b, c) {
        if (h) {
            var d = b.split(":"),
                g = "true" == d[0],
                f = parseFloat(d[1]),
                d = "true" == d[2],
                e = r ? h.getPlayerState() :
                0,
                k = r ? 1 != e : h.paused;
            r ? 5 != e && h.seekTo(f, !0) : h.currentTime = f;
            if (k && g || !k && !g) {
                if (d) {
                    Aa(b, c);
                    return
                }
                if (c) {
                    setTimeout(function() {
                        O(b, 0)
                    }, c);
                    return
                }
                r ? h.playVideo() : h.play();
                opt.metro && l && (l.time_ix = 0)
            } else r ? 5 != e && h.pauseVideo() : h.pause(), opt.metro && oa();
            g = !opt.lncsr && !g;
            l && l.time2x(f - q, g)
        }
    }

    function Z(b, c) {
        var d = b + ":" + c.toFixed(2) + ":" + (b && $("#cntin").prop("checked"));
        x ? x.send(d) : O(d, 0)
    }

    function T(b) {
        var c = b.keyCode ? b.keyCode : b.which,
            d = 1;
        switch (c) {
            case 219:
            case 88:
                l.goMsre(0);
                break;
            case 221:
            case 67:
                l.goMsre(1);
                break;
            case 80:
            case 89:
            case 90:
                if (!h) break;
                Z(!0, r ? h.getCurrentTime() : h.currentTime);
                break;
            case 65:
                $("#autscl").click();
                break;
            case 70:
                $("#btns").click();
                break;
            case 72:
                $("#help").toggleClass("showhlp");
            case 76:
                $("#lncsr").click();
                break;
            case 77:
                $("#menu label").toggle();
                break;
            case 83:
                opt.spdctl && !opt.lopctl ? $("#lopctl").click() : opt.lopctl && !opt.spdctl ? $("#spdctl").click() : $("#spdctl, #lopctl").click();
                break;
            case 171:
            case 61:
            case 107:
                D(1);
                break;
            case 173:
            case 109:
                D(-1);
                break;
            default:
                d = 0
        }
        if (opt.synbox &&
            l && !d) {
            switch (c) {
                case 190:
                    b.ctrlKey ? q += N : l.changeTimesKeyb(N);
                    break;
                case 188:
                    b.ctrlKey ? q -= N : l.changeTimesKeyb(-N);
                    break;
                case 87:
                    pa()
            }
            b.preventDefault();
            l.showSyncInfo()
        }
    }

    function aa() {
        X();
        l && (w[0].width.baseVal.value > screen.width || opt.autscl) && (l.setSize.call(l), l.setScale.call(l))
    }

    function Ba(b) {
        b = b.map(function(b) {
            return window.btoa(unescape(encodeURIComponent(b)))
        }).join("+");
        for (var c = [], d = 0; d <= b.length;) c.push(b.substr(d, 150)), d += 150;
        return c
    }

    function Ca(b) {
        return b.join("").split("+").map(function(b) {
            return decodeURIComponent(escape(window.atob(b)))
        }).join("\n")
    }

    function pa() {
        var b, c, d = [],
            g, f, e = "[",
            k, h, m, n;
        g = 'media_file = "' + (r ? "" : V) + '";\n';
        h = "undefined" != typeof msc_credits ? "msc_credits = " + JSON.stringify(msc_credits) + ";\n" : "";
        f = "offset_js = " + q.toFixed(2) + ";\n";
        opt.synbox = 0;
        m = "opt = " + JSON.stringify(opt) + ";\n";
        opt.synbox = 1;
        n = lpRec.loopBtn ? "lpRec = " + JSON.stringify(lpRec) + ";\n" : "";
        for (c = l.times.map(function(b) {
                return b.toFixed(2)
            }); c.length;) k = c[9], d.push(e + c.splice(0, 10).join(",") + "]"), e = "[" + k + ",";
        c = "times_arr = [" + d.join(",\n") + "];\n";
        $("#encr").prop("checked") ?
            (e = Ba(Q).map(function(b) {
                return JSON.stringify(b)
            }), d = ['"X:1"']) : (e = [""], d = Q.map(function(b) {
                return JSON.stringify(b)
            }));
        e = "abc_enc = [" + e.join(",\n") + "];\n";
        d = "abc_arr = [" + d.join(",\n") + "];\n";
        c = '//########################################\n//# This page contains score data, timing data and the media file path. Save it as a text file in\n//# the same folder as abcweb.html. Abcweb preloads score and media when it is opened with the\n//# file name as parameter in the url, for example: http://your.domain.org/abcweb.html?file_name\n//# Also works locally with file:///path/to/abcweb.html?file_name\n//# **** You have to correct the path to the media file below! (media_file="...";) ****\n//########################################\n//#\n' +
            (g + h + f + m + n + c + d + e);
        var p = "data:text/plain;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(c)));
        if ($("#drpuse").prop("checked")) $("#err").text(""), Dropbox.save(p, C + ".js", {
            success: function() {
                $("#err").text('"' + C + '.js" saved to your Dropbox.\n')
            },
            progress: function(b) {},
            cancel: function() {},
            error: function(b) {
                $("#err").text("Error: " + b + "\n");
                $("#err").append("fnm: " + C + ", len: " + p.length + "\n")
            }
        });
        else try {
            b = document.createElement("a"), b.href = p, b.download = C + ".js", b.text = "Save synchronization data",
                $("#saveDiv").append(b), b.click()
        } catch (Ha) {
            confirm("Do you want to save your synchronization data?") && (document.open("text/html"), document.write("<pre>" + c + "</pre>"), document.close())
        }
    }

    function Da() {
        e();
        $("#err").text("");
        var b, c = "",
            d = "",
            g, f, h, k, l = "",
            m;
        b = window.location.href.replace("?dl=0", "").split("?");
        if (f = b[0].match(/:\/\/([^/:]+)/)) m = f[1];
        if (1 < b.length) {
            h = b[1].split("&");
            for (k = 0; k < h.length; k++) b = h[k].replace(/d:(\w{15}\/[^.]+\.)/, "https://dl.dropboxusercontent.com/s/$1"), (f = b.match(/xml=(.*)/)) ?
                c = decodeURIComponent(f[1]).replace("www.dropbox", "dl.dropboxusercontent") : (f = b.match(/med=(.*)/)) ? l = f[1] : (f = b.match(/tmr=(.*)/)) ? p.top_margin = parseInt(f[1]) : (f = b.match(/tb=([\d.]*)/)) ? offset_js = parseFloat(f[1]) : (f = b.match(/te=([\d.]*)/)) ? endtime_js = parseFloat(f[1]) : (f = b.match(/ip=(\d+.\d+.\d+.\d+)/)) ? p.ipadr = f[1] : (f = b.match(/^d([\d.]+)$/)) ? p.delay = parseFloat(f[1]) : b.match(/ip=host/) && m ? p.ipadr = m : "mstr" == b ? p.mstr = 1 : "jmp" == b ? p.jump = 1 : "syn" == b ? p.synbox = 1 : "nb" == b ? p.no_menu = 1 : "sp" == b ? p.spdctl = p.lopctl =
                1 : "ur" == b ? p.repufld = 1 : "npl" == b ? p.noplyr = 1 : "ncr" == b ? p.nocsr = 1 : "asc" == b ? p.autscl = 1 : "cm" == b ? p.ctrmed = 1 : "cs" == b ? p.ctrnot = 1 : "nomed" == b ? (p.nomed = 1, p.noplyr = 1) : d = b, /(\.xml$)|(\.abc$)/.test(d) && (c = d, d = ""), /(\.mp3$)|(\.mp4$)|(\.ogg$)|(\.webm$)/.test(d) && (l = d, d = "");
            l && (11 == l.length && -1 == l.indexOf(".") ? opt.yubvid = l : media_file = decodeURIComponent(l).replace("www.dropbox", "dl.dropboxusercontent"));
            (d || c) && $("#wait").toggle(!0);
            c ? $.get(c, "", null, "text").done(function(b, c) {
                $("#err").append("preload: " + c + "\n");
                abc_arr =
                    b.split("\n");
                G()
            }).fail(function(b, c, d) {
                $("#wait").append("\npreload failed: " + c)
            }) : d && (0 <= d.indexOf("dropbox.com") && (d += "?dl=1"), $.getScript(d).done(function(b, c) {
                $("#err").append("preload: " + c + "\n");
                G()
            }).fail(function(b, c, f) {
                $("#wait,#err").append("preload failed: " + f + ", trying script tag ...\n");
                g = document.createElement("script");
                g.src = d;
                g.onload = function() {
                    G()
                };
                g.onerror = function() {
                    $("#wait").append("\npreload failed")
                };
                document.head.appendChild(g);
                document.head.removeChild(g)
            }))
        }
        return d ||
            c
    }

    function G() {
        if ("undefined" != typeof abc_arr) {
            var b = abc_arr.join("\n");
            "undefined" != typeof abc_enc && abc_enc.length && (b = Ca(abc_enc), opt.no_menu = 1);
            A(b)
        }
        for (var c in p) opt[c] = p[c];
        "nospd" in opt && (opt.spdctl = !opt.nospd, opt.nospd = void 0);
        "undefined" != typeof media_file && media_file && !opt.nomed && (J(media_file, media_file), opt.btns = 0);
        opt.yubvid && !opt.nomed && (J("", ""), opt.btns = 0);
        "undefined" != typeof msc_credits && (b = msc_credits.reduce(function(b, c) {
            return b + c
        }), $("#credits").html(b));
        "undefined" != typeof media_height &&
            (opt.media_height = media_height);
        opt.no_menu && ($("#sync").css("display", "none"), opt.btns = 0, $("body").off("dragenter dragleave drop dragover"), $("body").on("contextmenu", function(b) {
            b.preventDefault()
        }));
        $("#wait").toggle(!1);
        qa(!1)
    }

    function qa(b) {
        if (b)
            for (var c in p) opt[c] = p[c];
        opt.ipadr && Ea(opt.ipadr);
        opt.media_height && $("#buttons").css("height", opt.media_height);
        for (c in opt) $("#" + c).prop("checked", opt[c]);
        la();
        Y();
        ma();
        ka();
        aa();
        $("#sync, #medbts, #meddiv, #err").css("visibility", "visible")
    }

    function U(b) {
        $("#err").append(b +
            "\n")
    }

    function Ea(b) {
        x ? U("websocket already open") : (x = new WebSocket("ws://" + b + ":8091/"), x.onmessage = function(b) {
            "master" == b.data ? $("#mbar").css("background", "rgba(255,0,0,0.2)") : O(b.data, 100 * opt.delay)
        }, x.onerror = function(b) {
            U("socket error (server inaccessible?)");
            x = null
        }, x.onopen = function(b) {
            $("#mbar").css("background", "rgba(0,255,0,0.2)");
            opt.mstr && x.send("master");
            U("connection opened")
        }, x.onclose = function(b) {
            $("#mbar").css("background", "");
            U("connection closed: " + b.code);
            x = null
        })
    }

    function Fa(b) {
        if (!ra() &&
            "meddiv" == b.target.id) {
            $("#buttons").css("opacity", "0.5");
            $("#streep").css("opacity", "1.0");
            var c = "touchstart" == b.type,
                d = $("#meddiv"),
                g = c ? b.originalEvent.touches[0].clientY : b.pageY,
                f = $("#buttons").height();
            d.css("cursor", "row-resize");
            d.on("mousemove touchmove", function(b) {
                var d = $("body").height();
                opt.media_height = (100 * (f + (c ? b.originalEvent.touches[0].clientY : b.pageY) - g) / d).toFixed() + "%";
                $("#buttons").css("height", opt.media_height)
            });
            d.on("mouseup touchend", function(b) {
                $("#buttons").css("opacity",
                    "1.0");
                $("#streep").css("opacity", "0.0");
                d.off("mousemove touchmove mouseup touchend");
                d.css("cursor", "initial");
                B()
            })
        }
    }

    function D(b) {
        if (2 == b) {
            b = $("#speed").val();
            var c = b - opt.speed;
            .06 >= Math.abs(c) ? b = 0 < c ? 1 : -1 : (opt.speed = b, b = 0)
        }
        c = v.map(function(b, c) {
            return {
                x: Math.abs(b - opt.speed),
                i: c
            }
        }).sort(function(b, c) {
            return b.x - c.x
        })[0].i; - 1 == b && 0 < c && (opt.speed = v[c + b]);
        1 == b && c < v.length - 1 && (opt.speed = v[c + b]);
        0 == b && (opt.speed = v[c]);
        $("#speed").val(opt.speed.toFixed(2));
        h && !r && (h.playbackRate = opt.speed);
        h && r && h.setPlaybackRate(opt.speed)
    }

    function ja() {
        l && l.drawTags();
        opt.lopctl = $("#lopctl").prop("checked");
        $("#atag").css("display", opt.lopctl ? "block" : "none");
        $("#btag").css("display", opt.lopctl ? "block" : "none")
    }

    function ya() {
        var b = Dropbox.createChooseButton({
                success: ua,
                cancel: function() {},
                linkType: "direct",
                multiselect: !1,
                extensions: [".xml", ".abc", ".txt", ".js"]
            }),
            c = Dropbox.createChooseButton({
                success: function(b) {
                    W("dbx", b)
                },
                cancel: function() {},
                linkType: "preview",
                multiselect: !1,
                extensions: [".ogg", ".mp3", ".webm", ".mp4"]
            });
        $("#abcfile").append(b);
        $("#mediafile").append(c)
    }

    function sa(b) {
        b = $(this).prop("checked");
        var c = $(this).attr("id");
        opt[c] = b;
        switch (c) {
            case "ctrnot":
                Y();
                break;
            case "ctrmed":
                X();
                break;
            case "spdctl":
                ma();
                break;
            case "autscl":
                aa();
                break;
            case "lncsr":
                Y();
                break;
            case "btns":
                la();
                break;
            case "synbox":
                ka();
                break;
            case "noplyr":
                B();
                break;
            case "nocsr":
                l && !H.paused && (l.noCursor = b);
                break;
            case "metro":
                b || oa()
        }
    }

    function ta() {
        $("#menu label").css("display", "none")
    }

    function ra() {
        var b = "none" != $("#menu label").css("display") || $("#help").hasClass("showhlp");
        b && ($("#help").toggleClass("showhlp", !1), setTimeout(ta, 0));
        return b
    }
    var w, R, l, q, V, Q, h, C, K, r = 0,
        v = [],
        S = 0,
        ha, p = {},
        x = null,
        N, H = new n;
    opt = {};
    onYouTubeIframeAPIReady = function() {
        K = new YT.Player("vidyub", {
            events: {
                onReady: function() {
                    $("#yubuse").prop("checked", !0);
                    ia();
                    ga()
                },
                onStateChange: function(b) {
                    b.data == YT.PlayerState.PLAYING ? (H.setKlok(P, 100), D(0)) : H.pause();
                    b.data == YT.PlayerState.CUED && B()
                }
            }
        })
    };
    m.prototype.setline = function(b) {
        $("#wijzer").remove();
        this.sety(this.ymin[b], this.ymax[b]);
        this.setx(0, 0, 0);
        this.line = b;
        this.wijzer.prependTo(R[b]);
        this.width = w[b].width.baseVal.value;
        var c = $("#notation"),
            d = c.scrollTop(),
            g = d + c.height() - this.vmargin;
        (this.line_offsets[b + 1] > g || this.line_offsets[b] < d + this.vmargin) && c.scrollTop(this.line_offsets[b] - this.tmargin)
    };
    m.prototype.sety = function(b, c) {
        this.wijzer.attr("y", b.toFixed(2));
        this.wijzer.attr("width", "2");
        this.wijzer.attr("height", (30 + c - b).toFixed(2));
        this.shade.attr("fill", "blue")
    };
    m.prototype.setx = function(b, c, d) {
        var g = $("#notation"),
            f = g.scrollLeft(),
            e =
            f + g.width() - this.hmargin;
        opt.lncsr ? (this.wijzer.attr("x", b.toFixed(2)), this.wijzer.attr("width", "2"), this.shade.attr("fill-opacity", this.noCursor ? "0.0" : "0.5"), b /= this.scale, (b > e || b < f + this.hmargin) && g.scrollLeft(b - this.hmargin)) : (this.wijzer.attr("x", c.toFixed(2)), this.wijzer.attr("width", (d - c).toFixed(2)), this.shade.attr("fill-opacity", this.noCursor ? "0.0" : "" + opt.opacity), c /= this.scale, d /= this.scale, (d > e || c < f + this.hmargin) && g.scrollLeft(c - this.hmargin))
    };
    m.prototype.time2x = function(b, c) {
        if (!S) {
            this.cursorTime =
                b;
            var d, g, f, e, k;
            d = this.times;
            for (k = this.time_ix; k < d.length && b > d[k];) k += 1;
            if (k == d.length) r ? 1 == h.getPlayerState() && h.pauseVideo() : h.paused || h.pause();
            else {
                for (; 0 < k && b < d[k - 1];) --k;
                c && .3 > d[k] - b && (d[k] = b - .01, console.log("tijdcor: " + (b - .01) + ", maat: " + k), k < d.length - 1 && (k += 1));
                opt.metro && k != this.time_ix && za(k, b);
                this.time_ix = k;
                this.repcnt = this.tixlb[k][2];
                this.msre = e = this.tixlb[k][1];
                g = this.tixlb[k][0];
                this.line != g && this.setline(g);
                f = this.xs[g];
                g = d[k - 1];
                k = d[k];
                d = f[e - 1] + 10;
                e = f[e] + 10;
                g = d + (e - d) * (b - g) / (k - g);
                f = this.times[this.times.length - 1];
                0 >= b || b > f ? this.setx(0, 0, 0) : this.setx(g, d, e);
                opt.synbox && this.showSyncInfo()
            }
        }
    };
    m.prototype.drawTags = function() {
        for (var b in {
                atag: 1,
                btag: 1
            }) b in lpRec && (a = lpRec[b], this[b].prependTo(R[a.line]), this[b].attr("x", a.x), this[b].attr("y", this.ymin[a.line]))
    };
    m.prototype.doLoopTag = function(b, c, d, e, f) {
        function g(b, c, d, f, e, g, h, k) {
            if (!opt.lncsr) {
                var m = l.xs[d];
                g = l.times;
                c = m[h - 1];
                m = m[h];
                h = g[k - 1];
                k = g[k];
                lpRec.loopStart == h + .01 && (b = "btag", e = "loopEnd");
                lpRec.loopEnd == k - .01 && (b = "atag",
                    e = "loopStart");
                "loopStart" == e ? g = h + .01 : (c = m, g = k - .01)
            }
            lpRec[b] = {
                x: c.toFixed(2),
                line: d
            };
            lpRec.loopBtn = f;
            lpRec[e] = g;
            l.drawTags()
        }
        var k, h, l = this;
        switch (lpRec.loopBtn) {
            case 1:
                g("atag", b, c, 2, "loopStart", d, e, f);
                break;
            case 2:
                d > lpRec.loopStart && g("btag", b, c, 3, "loopEnd", d, e, f);
                break;
            case 3:
                k = Math.abs(lpRec.loopStart - d), h = Math.abs(lpRec.loopEnd - d), k < h ? g("atag", b, c, 3, "loopStart", d, e, f) : g("btag", b, c, 3, "loopEnd", d, e, f)
        }
    };
    m.prototype.x2time = function(b, c) {
        var d, e, f, l, k, m;
        b *= this.scale;
        d = this.xs[c];
        f = 1;
        if (b < d[0]) T({
            keyCode: 80
        });
        else {
            for (; f < d.length && d[f] < b;) f += 1;
            f == d.length ? T({
                keyCode: 80
            }) : (m = this.lbtix[c][f], m[this.repcnt] || (this.repcnt = 1), m = m[this.repcnt], e = this.times, l = d[f - 1], k = d[f], d = e[m - 1], e = d + (e[m] - d) * (b - l) / (k - l), opt.lopctl ? this.doLoopTag(b, c, e, f, m) : opt.synbox && (r ? h.getPlayerState() == YT.PlayerState.PLAYING : !h.paused) ? this.syncTimes(b, f, c, m) : Z(!1, (opt.lncsr ? e : d + .01) + q))
        }
    };
    m.prototype.goMsre = function(b) {
        var c = this.time_ix;
        h && (b = b ? this.times[c] + .01 : 2 >= c ? .01 : this.times[c - 2] + .01, Z(!1, b + q))
    };
    m.prototype.showSyncInfo = function() {
        var b =
            this.time_ix,
            b = this.times[b] - this.times[b - 1];
        $("#sync_info").html("duration&nbsp;measure:<br>" + b.toFixed(3) + " sec.<br>");
        $("#sync_info").append("media&nbsp;offset:<br>" + q.toFixed(3) + " sec.")
    };
    m.prototype.changeTimesKeyb = function(b) {
        this.changeTimes(this.lbtix[this.line][this.msre][this.repcnt] - 1, b, 0)
    };
    m.prototype.changeTimes = function(b, c, d) {
        var e, f = this.times;
        for (b += 1; b < f.length; ++b) e = d ? f[b - 1] + d : f[b] + c, f[b] = e
    };
    m.prototype.syncTimes = function(b, c, d, e) {
        b = this.lbtix[d][c][this.repcnt] - 1;
        d = (r ? h.getCurrentTime() :
            h.currentTime) - q - .2;
        0 == b ? (q += d, r ? h.seekTo(q + .01, !0) : h.currentTime = q + .01, S && $("#woff").click()) : (--b, c = 2 == e ? 0 : this.times[e - 2], e = this.times[e - 1], d < c + .5 ? alert("tempo faster than 240 bpm: first sync previous measures") : (this.lastSync > b ? this.changeTimes(b, d - e, 0) : (this.changeTimes(b, 0, d - c), this.lastSync = b), opt.jump && (r ? h.seekTo(c + q + .01, !0) : h.currentTime = c + q + .01)))
    };
    m.prototype.setSize = function() {
        var b, c, d, e, f;
        for (b = 0; b < w.length; ++b) c = w[b], d = c.width.baseVal.value, e = c.height.baseVal.value, f = $("#notation").prop("clientWidth"),
            c.width.baseVal.value = f, c.height.baseVal.value = f * e / d
    };
    m.prototype.setScale = function() {
        var b, c, d, e;
        c = w[0];
        b = c.getBoundingClientRect().width;
        c = c.viewBox.baseVal.width;
        d = $("svg>g").get(0).transform.baseVal;
        d = d.length ? d.getItem(0).matrix.a : 1;
        this.scale = c / d / b;
        d = $("#notation").position();
        e = $("#notation").scrollTop();
        this.line_offsets = [];
        for (b = 0; b < w.length; ++b) c = $(w[b]).position(), this.line_offsets[b] = e + c.top - d.top;
        this.line_offsets[b] = $("#notation").prop("scrollHeight")
    };
    m.prototype.compCountIn = function() {
        var b = {
                time: .25,
                num: 4
            },
            c = 1 < this.time_ix ? this.time_ix - 1 : this.time_ix,
            d = Math.min(this.times.length - 1, c + 3);
        if (d > c) {
            var e = this.tixbts.slice(c, d).reduce(function(b, c) {
                return b + c
            }, 0);
            b.time = (this.times[d] - this.times[c]) / e / opt.speed;
            b.num = this.tixbts[c]
        }
        return b
    };
    n.prototype.pause = function() {
        this.clearKlok();
        P()
    };
    n.prototype.play = function() {
        this.paused = !1;
        if (-1 == this.klok) {
            var b = this;
            this.setKlok(function() {
                b.currentTime += b.step / 1E3 * opt.speed;
                P()
            }, this.step)
        }
    };
    n.prototype.setKlok = function(b, c) {
        -1 != this.klok &&
            clearInterval(this.klok);
        this.klok = b ? setInterval(b, c) : -1;
        this.paused = !1;
        l && opt.nocsr && (l.noCursor = 1)
    };
    n.prototype.clearKlok = function() {
        -1 != this.klok && clearInterval(this.klok);
        this.klok = -1;
        this.paused = !0;
        l && (l.noCursor = 0)
    };
    var y = 0;
    $(document).ready(function() {
        $("#drpuse").prop("checked", !1);
        Da() || qa(!0);
        $(window).resize(aa);
        $("body").keydown(T);
        $("#save").click(pa);
        $("#speed").change(function() {
            D(2)
        });
        $("#lopctl").click(ja);
        var b = '<a href="http://wim.vree.org/js/">abcweb</a> (version: ' + msc_VERSION +
            ")</br>\u00a9Willem Vree",
            b = b + '<br>using:<br><a href="http://moinejf.free.fr/js/">abc2svg</a>, \u00a9Jef Moine';
        $("#help").prepend('<div style="position: absolute; right: 5px;">' + b + "</div>");
        $("#helpm").click(function() {
            $("#help").toggleClass("showhlp")
        });
        $("#meddiv").on("mousedown touchstart", Fa);
        $("#fknp").change(function() {
            fa("btn", [])
        });
        $("#mknp").change(function() {
            W("btn", [])
        });
        $("#yknp").click(wa);
        $("#yubid").keydown(function(b) {
            b.stopPropagation()
        });
        $("#yubuse").change(ia);
        $("#drpuse").click(na);
        $("#notation").mousedown(function() {
            ra() || T({
                keyCode: 80
            })
        });
        $("#jump").change(sa);
        $("#impbox").change(t);
        $("#menu * input").change(sa);
        $("#menu label").toggle();
        $("#mbar").click(function() {
            "none" == $("#menu label").css("display") ? $("#menu label").toggle(!0) : ta()
        });
        $("#woff").change(function() {
            S = $(this).prop("checked")
        });
        $.event.props.push("dataTransfer");
        $("body").on("drop", va);
        $("body").on("dragover", function(b) {
            b.stopPropagation();
            b.preventDefault();
            b.dataTransfer.dropEffect = "copy"
        });
        $("body").on("dragenter dragleave",
            function() {
                $(this).toggleClass("indrag")
            })
    })
})();