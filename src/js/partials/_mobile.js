(function () {
    this.android = -1 < navigator.userAgent.toLowerCase().indexOf("android");
    this.iPhone = navigator.userAgent.match(/iPhone/i);
    this.iPad = navigator.userAgent.match(/iPad/i);
    this.mobile = this.android || this.iPhone || this.iPad;
    this.mobile && $("body").addClass("no-animation");
})();