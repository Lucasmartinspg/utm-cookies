// Recebe os meus parâmetros de UTM
function getParameter(theParameter) {
  var params = window.location.search.substr(1).split('&');
  for (var i = 0; i < params.length; i++) {
    var p=params[i].split('=');
     if (p[0] == theParameter) {
      return decodeURIComponent(p[1]);
    }
  }
  return false;
}
url_src = getParameter('utm_source');
url_mdm = getParameter('utm_medium');
url_cpn = getParameter('utm_campaign');

// Recupero dados do meu cookie (se existir) e crio um objeto em JavaScript.
var pepites = new Object();
var pate_cookie = Cookies.get('cookie_utms');

// Se pelo menos um parâmetro de URL existir e o cookie não existir
if((url_src!== false || url_mdm!==false || url_cpn!==false) && (pate_cookie == null || pate_cookie == "" )) {
  if(url_src!== false){ 
    pepites["source"] = url_src; 
  }
  if(url_mdm!==false){
    pepites["medium"] = url_mdm; 
  }
  if (url_cpn!==false) {
    pepites["campaign"] = url_cpn;
  }
  Cookies.set('cookie_utms', pepites, { expires: 120 } );
}

// Caso contrário, se obtivermos pelo menos o parâmetro de URL e o cookie existir
else if((url_src!== false || url_mdm!==false || url_cpn!==false) && (pate_cookie != null || pate_cookie != "")) {
  pate_cookie_choco = JSON.parse(pate_cookie);

  if(pate_cookie_choco["source"] != undefined) {
    if(url_src!== false && pate_cookie_choco["source"].indexOf(url_src) != -1 ){
      pepites["source"] = pate_cookie_choco["source"]; 
    }
    else if(url_src!== false){
    pepites["source"] = pate_cookie_choco["source"]+"-"+url_src; 
    }
    else if ( url_src == false && pate_cookie_choco["source"] != undefined) { 
    pepites["source"] = pate_cookie_choco["source"]; 
    }
  }                            
  else if ( url_src!== false ) { 
      pepites["source"] = url_src; 
  }

  if(pate_cookie_choco["medium"] != undefined) {
    if(url_mdm!== false && pate_cookie_choco["medium"].indexOf(url_mdm) != -1 ){
      pepites["medium"] = pate_cookie_choco["medium"];
    }
    else if(url_mdm!== false ) { 
    pepites["medium"] = pate_cookie_choco["medium"]+"-"+url_mdm; 
    }
    else if(url_mdm == false){
    pepites["medium"] = pate_cookie_choco["medium"]; 
    }
  }
  else if(url_mdm!== false){
    pepites["medium"] = url_mdm; 
  }

  if(pate_cookie_choco["campaign"] != undefined) {
    if(url_cpn!== false && pate_cookie_choco["campaign"].indexOf(url_cpn) != -1 ){
      pepites["campaign"] = pate_cookie_choco["campaign"];
    }
    else if(url_cpn!== false) { 
    pepites["campaign"] = pate_cookie_choco["campaign"]+"-"+url_cpn; 
    }  
    else if(url_cpn == false){
      pepites["campaign"] = pate_cookie_choco["campaign"]; 
    } 
  }
  else if(url_cpn!== false){
    pepites["campaign"] = url_cpn; 
  }
  Cookies.set('cookie_utms', pepites, { expires: 120 } );
}

// Recupera os dados do cookie
var cookie = Cookies.get('cookie_utms');
if(cookie != undefined){
  cookie_choco = JSON.parse(cookie);
  cookie_source = cookie_choco["source"];
  cookie_medium = cookie_choco["medium"];
  cookie_campaign = cookie_choco["campaign"];
}

/**
* Add um parâmetro em URL ou modificar se já existir
*/
var addParamToUrl = function(url, param, value) {
    param = encodeURIComponent(param);
    var r = "([&?]|&amp;)" + param + "\\b(?:=(?:[^&#]*))*";
    var a = document.createElement('a');
    var regex = new RegExp(r);
    var str = param + (value ? "=" + encodeURIComponent(value) : ""); 
    a.href = url;
    var q = a.search.replace(regex, "$1"+str);
    if (q === a.search) {
        a.search += (a.search ? "&" : "") + str;
    } else {
        a.search = q;
    }
    return a.href;
}

// Pega todas as urls presentes no site
urls = document.querySelectorAll('a'); 

// Faz uma varredura e verifica se elas sao do WhatsApp
for (url in urls) {
	if ( typeof(urls[url].href) != 'undefined' && urls[url].href.includes("https://api.whatsapp.com/") == 1) {
		
		// Adiciona os parametros nela
		var url_modificada = addParamToUrl( urls[url].href, "utm_source", cookie_source);
		var url_modificada = addParamToUrl( url_modificada, "utm_medium", cookie_medium);
		var url_modificada = addParamToUrl( url_modificada, "utm_campaign", cookie_campaign);
		
		// Faz a troca do href para a nova a url
		urls[url].href = url_modificada;
	}
}
