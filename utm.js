/**
 * Add um parâmetro em URL ou modificar se já existir
 */
 function addParamToUrl(url, param, value) {
    param = encodeURIComponent(param);
    var r = "([&?]|&amp;)" + param + "\\b(?:=(?:[^&#]*))*";
    var a = document.createElement('a');
    var regex = new RegExp(r);
    var str = param + (value ? "=" + encodeURIComponent(value) : "");
    a.href = url;
    var q = a.search.replace(regex, "$1" + str);
    if (q === a.search) {
        a.search += (a.search ? "&" : "") + str;
    } else {
        a.search = q;
    }
    return a.href;
}

/**
 * Recebe os meus parâmetros de UTM
 */
function getParameter(theParameter) {
    var params = window.location.search.substr(1).split('&');
    for (var i = 0; i < params.length; i++) {
        var p = params[i].split('=');
        if (p[0] == theParameter) {
            return decodeURIComponent(p[1]);
        }
    }
    return false;
}
utm_source = getParameter('utm_source');
utm_medium = getParameter('utm_medium');

// Facebook Ads
utm_campaign = getParameter('utm_campaign');
utm_content = getParameter('utm_content');
campaignid = getParameter('campaignid'); // No Google também
adsetid = getParameter('adsetid');
fbclid = getParameter('fbclid');
adset = getParameter('adset');
adid = getParameter('adid'); // No Google também

// Google Ads
utm_term = getParameter('utm_term');
adgroupid = getParameter('adgroupid');
targetid = getParameter('targetid');


// Recupero dados do meu cookie (se existir) e crio um objeto em JavaScript.
var pepites = new Object();
var pate_cookie = Cookies.get('cookie_utms');

// Se pelo menos um parâmetro de URL existir e o cookie não existir
if ((utm_source !== false || utm_medium !== false || campaignid !== false) && (pate_cookie == null || pate_cookie == "")) {
    if (utm_source !== false) {
        pepites["source"] = utm_source;
    }
    if (utm_medium !== false) {
        pepites["medium"] = utm_medium;
    }
    if (utm_campaign !== false) {
        pepites["campaign"] = utm_campaign;
    }
    if (utm_content !== false) {
        pepites["content"] = utm_content;
    }
    if (campaignid !== false) {
        pepites["campaignid"] = campaignid;
    }
    if (adsetid !== false) {
        pepites["adsetid"] = adsetid;
    }
    if (fbclid !== false) {
        pepites["fbclid"] = fbclid;
    }
    if (adset !== false) {
        pepites["adset"] = adset;
    }
    if (adid !== false) {
        pepites["adid"] = adid;
    }
    if (utm_term !== false) {
        pepites["term"] = utm_term;
    }
    if (adgroupid !== false) {
        pepites["adgroupid"] = adgroupid;
    }
    if (targetid !== false) {
        pepites["targetid"] = targetid;
    }

    Cookies.set('cookie_utms', pepites, {
        expires: 120
    });
}

// Recupera os dados do cookie
var cookie = Cookies.get('cookie_utms');
if (cookie != undefined) {
    cookie_array = JSON.parse(cookie);

    cookie_source = cookie_array["source"];
    cookie_medium = cookie_array["medium"];
    cookie_campaign = cookie_array["campaign"];

    cookie_content = cookie_array["content"];
    cookie_campaignid = cookie_array["campaignid"];
    cookie_adsetid = cookie_array["adsetid"];
    cookie_fbclid = cookie_array["fbclid"];
    cookie_adset = cookie_array["adset"];
    cookie_adid = cookie_array["adid"];
    cookie_term = cookie_array["term"];
    cookie_adgroupid = cookie_array["adgroupid"];
    cookie_targetid = cookie_array["targetid"];

    // Pega todas as urls presentes no site
    urls = document.querySelectorAll('a');

    // Faz uma varredura e verifica se elas sao do WhatsApp
    for (url in urls) {
        if (typeof(urls[url].href) != 'undefined' && urls[url].href.includes("tracking.agenciarazza.com.br/whatsapp") == 1) {

            // Armazena a url
            var url_modificada = urls[url].href;

            // Adiciona os parametros nela (Se o cookie existir)
            if (cookie_source) {
                var url_modificada = addParamToUrl(url_modificada, "utm_source", cookie_source);
            }
            if (cookie_medium) {
                var url_modificada = addParamToUrl(url_modificada, "utm_medium", cookie_medium);
            }
            if (cookie_campaign) {
                var url_modificada = addParamToUrl(url_modificada, "utm_campaign", cookie_campaign);
            }
            if (cookie_content) {
                var url_modificada = addParamToUrl(url_modificada, "utm_content", cookie_content);
            }
            if (cookie_campaignid) {
                var url_modificada = addParamToUrl(url_modificada, "campaignid", cookie_campaignid);
            }
            if (cookie_adsetid) {
                var url_modificada = addParamToUrl(url_modificada, "adsetid", cookie_adsetid);
            }
            if (cookie_fbclid) {
                var url_modificada = addParamToUrl(url_modificada, "fbclid", cookie_fbclid);
            }
            if (cookie_adset) {
                var url_modificada = addParamToUrl(url_modificada, "adset", cookie_adset);
            }
            if (cookie_adid) {
                var url_modificada = addParamToUrl(url_modificada, "adid", cookie_adid);
            }
            if (cookie_term) {
                var url_modificada = addParamToUrl(url_modificada, "utm_term", cookie_term);
            }
            if (cookie_adgroupid) {
                var url_modificada = addParamToUrl(url_modificada, "adgroupid", cookie_adgroupid);
            }
            if (cookie_targetid) {
                var url_modificada = addParamToUrl(url_modificada, "targetid", cookie_targetid);
            }

            // Faz a troca do href para a nova a url
            urls[url].href = url_modificada;
        }
    }
}
