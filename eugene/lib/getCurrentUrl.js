function getCurrentUrl() {
    const currentUrl = window.location.href;
    document.querySelector('#currentUrl').innerText = "[URL]: " + currentUrl;
}