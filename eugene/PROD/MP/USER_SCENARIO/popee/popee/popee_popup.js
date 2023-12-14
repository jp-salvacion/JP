const POPEE_POPUP_DIV_ID = 'popup_popee';
let isPopeeShowed = false;

// original client liff url : "targetUrl": "https://liff.line.me/1661207487-GoXg7jp9/1f973ccfd901445f985d48defee0e988",

const popeeData = `{
  "isOption": true,
  "targetUrl": "https://liff.line.me/1653848195-JgdLbQj7/c5b2bc1ada2c4df4aa2eb3674223d0f5",
  "mobileImage": {
    "url": "https://d1hpw071j6batb.cloudfront.net/uploads/browserback_option/mobile_image/1272/%E3%83%9D%E3%83%83%E3%83%97%E3%82%A2%E3%83%83%E3%83%97%E3%83%90%E3%83%8A%E3%83%BC-1.png"
  },
  "pcImage": {
    "url": "https://d1hpw071j6batb.cloudfront.net/uploads/browserback_option/pc_image/1272/%E3%83%9D%E3%83%83%E3%83%97%E3%82%A2%E3%83%83%E3%83%97%E3%83%90%E3%83%8A%E3%83%BC-1.png"
  },
  "mobileImagePosition": 4,
  "pcImagePosition": 4,
  "isMobileGrayout": true,
  "isPcGrayout": true,
  "couponCode": "",
  "isCoupon": false,
  "couponCodeIsDisplay": false,
  "referer": {
    "isOption": false,
    "options": [
      {
        "isOption": false,
        "coupon": {
          "isOption": false
        }
      }
    ]
  },
  "isBackground": true,
  "saletime": {
    "isOption": false,
    "time": 1
  }
}`;

function setPopImage(popContent) {
  let ua = navigator.userAgent;
  isMobileDevice =
    ua.indexOf('iPhone') > 0 ||
    (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0);
  const image = isMobileDevice ? popContent.mobileImage : popContent.pcImage;
  return !!image ? image.url : '';
}

function createCloseButton() {
  var _a;
  const closeButton = document.createElement('div');
  closeButton.setAttribute('id', 'closePopupBtn_popee');
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('class', 'close_popee');
  return closeButton;
}

function createPopup(popContents) {
  let targetUrl = popContents.targetUrl;
  let params = targetUrl && targetUrl.match(/(?:\${)(\w+)(?:\})/g);
  // 変数がなければそのまま。
  if (!!params) {
    params = params.map(function (val) {
      const result = val.match(/\w+/);
      if (!result) return '';
      return result[0];
    });
    let createdUrl = '';
    // urlから変数を削除
    targetUrl
      .split(/\${(\w+)}/g)
      .map(function (partUrl) {
        return originalParams(params, partUrl)
          ? partUrl + '=' + queryParams(partUrl)
          : partUrl;
      })
      .forEach(function (part) {
        createdUrl += part;
      });
    targetUrl = createdUrl;
  }
  let createElement = function (tag, attr = null, ext = null) {
    let element = document.createElement(tag);
    if (attr != null) {
      Object.keys(attr).forEach(function (e) {
        element.setAttribute(e, attr[e]);
      });
    }
    ext ? ext(element) : {};
    return element;
  };

  let popUpTarget = document.getElementById(POPEE_POPUP_DIV_ID);
  !!popUpTarget && popUpTarget.remove();
  const optionPopImage = setPopImage(popContents);
  if (!optionPopImage) {
    return false;
  }

  let popUpBackground = document.createElement('div');
  popUpBackground.setAttribute('id', POPEE_POPUP_DIV_ID);
  popUpBackground.setAttribute('class', 'overlay_popee');
  popUpBackground.setAttribute('style', 'visibility: hidden');
  let popUpContentWrapper = document.createElement('div');
  popUpContentWrapper.setAttribute('id', 'popee_pop_position');
  popUpContentWrapper.setAttribute('class', 'popup_popee');
  let closeBtn = createCloseButton();
  let popUpContent = document.createElement('div');
  popUpContent.setAttribute('id', 'popupLink_popee');
  popUpContent.setAttribute('class', 'content_popee');
  let popupAnker = document.getElementById('popee_bot');
  let popUpImage = document.createElement('img');
  popUpImage.setAttribute('src', optionPopImage);
  popUpImage.setAttribute('class', 'img_popee');
  if (!!targetUrl) {
    if (/#/.test(targetUrl)) {
      let targetId = targetUrl.split('#')[1];
      let ankerElement = document.createElement('div');
      ankerElement.setAttribute('class', 'a_popee');
      ankerElement.addEventListener('click', () => {
        let content = document.getElementById(targetId);
        if (content) {
          content.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center',
          });
        }
      });
      ankerElement.appendChild(popUpImage);
      popUpContent.appendChild(ankerElement);
    } else {
      let ankerElement = document.createElement('a');
      ankerElement.setAttribute('class', 'a_popee');
      ankerElement.appendChild(popUpImage);
      popUpContent.appendChild(ankerElement);
      if (!popContents.couponCode) {
        ankerElement.setAttribute('target', 'blank');
        ankerElement.setAttribute('href', targetUrl);
      }
    }
  } else if (popupAnker) {
    popupAnker.appendChild(popUpImage);
    popupAnker.appendChild(
      createElement(
        'div',
        { id: 'sale_time_popee', class: 'sale_time_popee' },
        null
      )
    );
    popUpContent.appendChild(popupAnker);
  } else {
    popUpContent.appendChild(popUpImage);
    popUpContent.appendChild(
      createElement(
        'div',
        { id: 'sale_time_popee', class: 'sale_time_popee' },
        null
      )
    );
  }
  popUpContentWrapper.appendChild(closeBtn);
  popUpContentWrapper.appendChild(popUpContent);
  popUpBackground.appendChild(popUpContentWrapper);
  document.body.appendChild(popUpBackground);
}

function showPop() {
  let targetPopUp = document.getElementById(POPEE_POPUP_DIV_ID);
  if (!targetPopUp) {
    return;
  }

  targetPopUp.style.visibility = 'visible';
  targetPopUp.style.opacity = 1;
}

function showPopAction(e, type) {
  if (type == 'browserback' && e.state != 'beforeunload') {
    return;
  }
  if (!location.hash && type == 'browserback' && !!isPopeeShowed) {
    return history.back();
  }

  isPopeeShowed = true;
  const popupData = JSON.parse(popeeData);
  createPopup(popupData);
  showPop();
}

document.addEventListener('visibilitychange', function (e) {
  showPopAction(e, 'background|tab');
});

window.onpopstate = function (e) {
  showPopAction(e, 'browserback');
};
