const url = window.location.href;
const target = "reload=1";
const regex = new RegExp("[?|&]".concat(target));

function getUrl(url) {
    if (url.search(regex) >= 0) {
        return url.replace(regex, "")
    } else if (window.location.search === "") {
        return url.concat("?".concat(target));
    } else {
        return url.concat("&".concat(target));
    }
}

window.location.assign(getUrl(url));


// test <-> service

const loc = window.location;
const host = loc.host;
const pcHostList = ["pwhale.dev.daum.net", "test.search.daum.net", "search.daum.net"];
const moHostList = ["mwhale.dev.daum.net", "mtest.search.daum.net", "m.search.daum.net"];

function getUrl(host) {
    if (pcHostList.includes(host)) {
        return loc.protocol + "//" + pcHostList[(pcHostList.indexOf(host) + 1) % pcHostList.length] + loc.pathname + loc.search
    }
    if (moHostList.includes(host)) {
        return loc.protocol + "//" + moHostList[(moHostList.indexOf(host) + 1) % moHostList.length] + loc.pathname + loc.search
    }
}

const redirectUrl = getUrl(host);
if (!!redirectUrl) {
    window.location.assign(redirectUrl);
}


// PC <-> MO

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

function getUrl(host) {
    return toggleUrl(host, localList) + toggleUrl(host, testList) + toggleUrl(host, serviceList);
}

const redirectUrl = getUrl(host);
if (!!redirectUrl) {
    window.location.assign(redirectUrl);
}


// Clear
const loc = window.location;
const host = loc.host;

function getUrl(host) {
    if (host.search(".daum.net")) {
        const origin = new URL(loc.href);

        let result = new URL(loc.protocol + "//" + loc.host + loc.pathname);
        result.searchParams.set("w", origin.searchParams.get("w"));
        result.searchParams.set("q", origin.searchParams.get("q"));
        result.searchParams.set("reload", "1");
        return result.toString();
    }
}

const redirectUrl = getUrl(host);
if (!!redirectUrl) {
    window.location.assign(redirectUrl);
}