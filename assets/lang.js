// Dil secimi: ?lang=tr|en > daha once secilen > tarayici dili (Turkce -> tr, digerleri en).
// <html data-lang> ayarlanir, CSS oteki dilin bloklarini gizler.
(function () {
	var html = document.documentElement;
	var LANGS = ["tr", "en"];

	function pick() {
		var q = new URLSearchParams(location.search).get("lang");
		if (LANGS.indexOf(q) >= 0) return q;
		try {
			var s = localStorage.getItem("lang");
			if (LANGS.indexOf(s) >= 0) return s;
		} catch (e) {}
		var n = ((navigator.languages && navigator.languages[0]) || navigator.language || "en").toLowerCase();
		return n.indexOf("tr") === 0 ? "tr" : "en";
	}

	function set(l) {
		html.setAttribute("data-lang", l);
		html.lang = l;
		var t = html.getAttribute("data-title-" + l);
		if (t) document.title = t;
		var bs = document.querySelectorAll("[data-set-lang]");
		for (var i = 0; i < bs.length; i++) {
			bs[i].setAttribute("aria-pressed", String(bs[i].getAttribute("data-set-lang") === l));
		}
	}

	set(pick());
	document.addEventListener("DOMContentLoaded", function () {
		set(html.getAttribute("data-lang"));
	});
	document.addEventListener("click", function (e) {
		var b = e.target.closest ? e.target.closest("[data-set-lang]") : null;
		if (!b) return;
		var l = b.getAttribute("data-set-lang");
		try { localStorage.setItem("lang", l); } catch (err) {}
		set(l);
	});
})();
