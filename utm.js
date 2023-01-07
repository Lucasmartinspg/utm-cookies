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

// Se o cookie existir
if (cookie != undefined) {
    // Quebra o JSON do cookie
    cookie_array = JSON.parse(cookie);

    // Pega todas as urls presentes no site
    urls = document.querySelectorAll('a');

    // Faz uma varredura e verifica se elas sao do WhatsApp
    for (url in urls) {
        if (typeof(urls[url].href) != 'undefined' && urls[url].href.includes("tracking.agenciarazza.com.br/whatsapp") == 1) {

            // Armazena a url
            var url_modificada = urls[url].href;

            // Adiciona os parametros nela (Se o cookie existir)
            if (cookie_array["source"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "utm_source", cookie_array["source"]);
            }
            if (cookie_array["medium"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "utm_medium", cookie_array["medium"]);
            }
            if (cookie_array["campaign"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "utm_campaign", cookie_array["campaign"]);
            }
            if (cookie_array["content"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "utm_content", cookie_array["content"]);
            }
            if (cookie_array["campaignid"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "campaignid", cookie_array["campaignid"]);
            }
            if (cookie_array["adsetid"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "adsetid", cookie_array["adsetid"]);
            }
            if (cookie_array["fbclid"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "fbclid", cookie_array["fbclid"]);
            }
            if (cookie_array["adset"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "adset", cookie_array["adset"]);
            }
            if (cookie_array["adid"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "adid", cookie_array["adid"]);
            }
            if (cookie_array["term"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "utm_term", cookie_array["term"]);
            }
            if (cookie_array["adgroupid"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "adgroupid", cookie_array["adgroupid"]);
            }
            if (cookie_array["targetid"] !== false) {
                url_modificada = addParamToUrl(url_modificada, "targetid", cookie_array["targetid"]);
            }

            // Faz a troca do href para a nova a url
            urls[url].href = url_modificada;
        }
    }
}
