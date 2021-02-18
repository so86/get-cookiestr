var ui_lang={
  copyok:'Copied to clipboard',
  nocookie:'No cookie record',
  btntext:'Copy',
  zh_CN:{
    copyok:'已复制到剪贴板',
    nocookie:'没有Cookie记录',
    btntext:'复制',
  },
};
if(chrome){
  var browser=chrome;
}
function get_ui_lang(lang_key){
  let primary_lang=navigator.language.replace('-','_');
  //primary_lang=undefined;
  if(!ui_lang[primary_lang]){
    return ui_lang[lang_key];
  }else{
    return ui_lang[primary_lang][lang_key];
  }
}
function showCookiesForTab(tabs) {
  var clipboard = new ClipboardJS('button.btn');
  //以下是复制过后的提示
  clipboard.on('success', function(e) {
    message.innerHTML='<div class="center text-green">'+get_ui_lang('copyok')+'</div>';
  });

  //get the first tab object in the array
  let tab = tabs.pop();

  //get all cookies in the domain
  var gettingAllCookies = browser.cookies.getAll({url: tab.url},function (cookies){
    var cUrl = new URL(tab.url);
    //set the header of the panel
    var activeTabUrl = document.getElementById('header-title');
    var text = document.createTextNode("Cookies: "+cUrl.hostname);
    var cookieList = document.getElementById('cookie-text');
    var message = document.getElementById('message');
    var btn = document.getElementById('btn');
    activeTabUrl.appendChild(text);
    btn.innerHTML=get_ui_lang('btntext');
    if (cookies.length > 0) {
      let cookieStr = '';
      for (let cookie of cookies) {
        cookieStr += cookie.name + "=" + cookie.value + ";"
      }
      cookieList.value = cookieStr;
    } else {
      message.innerHTML='<div class="center text-darkred">'+get_ui_lang('nocookie')+'</div>';
      btn.disabled=true;
    }
  });
  gettingAllCookies.then((cookies) => {


  });
}

//get active tab to run an callback function.
//it sends to our callback an array of tab objects
browser.tabs.query({currentWindow: true, active: true}, function (tabs) {
  showCookiesForTab(tabs);
});