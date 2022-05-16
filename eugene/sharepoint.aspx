<html>
  <head>
      <script type="text/javascript">
    const appid = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' //PEPのアプリケーション識別id
    const domain = 'XXXXXXXXXX.sharepoint.com' //PEPを設置するSPOのドメイン
    const targetSite = 'XXXXXXXXXXXXXXX'; //SPOのサイト名またはページ単位で設置する場合は.aspxファイル名まで指定

    const urlPattern = '^https://'+domain+'/sites/'+targetSite+'/?.*'
    const appurl = 'https://app.pep.work/api/chatbox?appid='+appid;


    const reloadFunc = '(function() {let url = location.href;const re = new RegExp(\''+urlPattern+'\');setInterval(function () {if (url !== location.href) {url = location.href;if (!re.test(location.href)) {location.reload();}}},100)})();'
    //下記は上記スクリプトと同等。テンプレートリテラルでIEでは動作せず
    // const reloadFunc = `
    // (function() {
    // let url = location.href;
    // const re = new RegExp('${urlPattern}');
    // setInterval(function () {
    // if (url !== location.href) {
    // url = location.href;
    // if (!re.test(location.href)) {
    // location.reload();
    // }
    // }
    // },100)
    // })();`

    function loadBot() {
    //他ページ遷移後、再度PEP設置ページに戻ってきた際に同じscriptタグを複数埋め込まないように確認
    if (!window.parent.document.querySelector('script[src=\''+appurl+'\']')) {
    const loaderScript = document.createElement('script');
    loaderScript.setAttribute('src', appurl);
    //PEPのスクリプトをdocument.headなどからwindow.parent.document.head(SPOのサイト)に埋め込むように調整してあります
    window.parent.document.head.appendChild(loaderScript);

    //ページ切替時のページ更新用スクリプトをSPOサイトに埋め込む
    const reloaderScript = document.createElement('script');
    reloaderScript.innerHTML = reloadFunc;
    window.parent.document.head.appendChild(reloaderScript);
    }
    }

    if (document.readyState == 'complete') {
    loadBot();
    } else {
    self.addEventListener('load', loadBot);
    }
    </script>
  </head>
  <body>
      <div>
         <span>PEP STG Bot</span>
      </div>
  </body>
</html>
