// ==UserScript==
// @name         Daum Search
// @namespace    https://www.daum.net/
// @version      0.1
// @description  parameter controller
// @author       whale
// @grant        none
// @match        https://*.daum.net/*
// ==/UserScript==

(function() {
    'use strict';

    function toggleReload(param) {
        const url = window.location.href;
        const target = param + "=1";
        const regex = new RegExp("[?|&]".concat(target));

        if (url.search(regex) >= 0) {
            return url.replace(regex, "")
        } else if (window.location.search === "") {
            return url.concat("?".concat(target));
        } else {
            return url.concat("&".concat(target));
        }
    }

    function toggleTestService() {
        const loc = window.location;
        const host = loc.host;
        const pcHostList = ["pwhale.dev.daum.net", "test.search.daum.net", "search.daum.net"];
        const moHostList = ["mwhale.dev.daum.net", "mtest.search.daum.net", "m.search.daum.net"];

        if (pcHostList.includes(host)) {
            return loc.protocol + "//" + pcHostList[(pcHostList.indexOf(host) + 1) % pcHostList.length] + loc.pathname + loc.search
        }
        if (moHostList.includes(host)) {
            return loc.protocol + "//" + moHostList[(moHostList.indexOf(host) + 1) % moHostList.length] + loc.pathname + loc.search
        }
    }

    function toggleMobilePc() {
        const loc = window.location;
        const host = loc.host;
        const localList = ["mwhale.dev.daum.net", "pwhale.dev.daum.net"];
        const testList = ["mtest.search.daum.net", "test.search.daum.net"];
        const serviceList = ["m.search.daum.net", "search.daum.net"];

        function toggleUrl(host, urlList) {
            if (urlList.includes(host)) {
                return loc.protocol + "//" + urlList[(urlList.indexOf(host) + 1) % urlList.length] + loc.pathname + loc.search
            } else {
                return ""
            }
        }
        return toggleUrl(host, localList) + toggleUrl(host, testList) + toggleUrl(host, serviceList);
    }

    function clearUrl() {
        const loc = window.location;
        const host = loc.host;

        if (host.search(".daum.net")) {
            const origin = new URL(loc.href);

            let result = new URL(loc.protocol + "//" + loc.host + loc.pathname);
            result.searchParams.set("w", origin.searchParams.get("w"));
            result.searchParams.set("q", origin.searchParams.get("q"));
            result.searchParams.set("reload", "1");
            return result.toString();
        }
    }


    function KeyPress(e) {
        const eventObject = window.event? event : e;
        if (eventObject.code === "KeyR" && eventObject.altKey) {
            const redirectUrl = toggleReload("reload");
            if (!!redirectUrl) {
                window.location.assign(redirectUrl);
            }
        }

        if (eventObject.code === "KeyT" && eventObject.altKey) {
            const redirectUrl = toggleReload("tdebug");
            if (!!redirectUrl) {
                window.location.assign(redirectUrl);
            }
        }

        if (eventObject.code === "KeyM" && eventObject.altKey) {
            const redirectUrl = toggleReload("mdebug");
            if (!!redirectUrl) {
                window.location.assign(redirectUrl);
            }
        }

        if (eventObject.code === "KeyC" && eventObject.altKey) {
            const redirectUrl = clearUrl();
            if (!!redirectUrl) {
                window.location.assign(redirectUrl);
            }
        }

        if (eventObject.code === "KeyA" && eventObject.altKey) {
            const redirectUrl = toggleMobilePc();
            if (!!redirectUrl) {
                window.location.assign(redirectUrl);
            }
        }

        if (eventObject.code === "KeyS" && eventObject.altKey) {
            const redirectUrl = toggleTestService();
            if (!!redirectUrl) {
                window.location.assign(redirectUrl);
            }
        }
    }
    document.onkeydown = KeyPress;
})();
