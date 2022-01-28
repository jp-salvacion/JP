var satori = (function (){
  function getCookie(name) {
    var result = null;

    var cookieName = name + '=';
    var allcookies = document.cookie;
    var position = allcookies.indexOf(cookieName);
    if (position != -1) {
      var startIndex = position + cookieName.length;

      var endIndex = allcookies.indexOf(';', startIndex);
      if (endIndex == -1) {
        endIndex = allcookies.length;
      }

      result = decodeURIComponent(
        allcookies.substring(startIndex, endIndex));
    }

    return result;
  }

  return {
    onLoad: function () {
      var st_segs = getCookie("st_segs");
      if (st_segs === null || !st_segs.length) {
        return;
      }
      const array = st_segs.split(',');
      synalio.addExtVal("st_segs", array);
    },
  }

})();
window.addEventListener("load", satori.onLoad, true);
