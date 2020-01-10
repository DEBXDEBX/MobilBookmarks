class Elements {
  constructor() {
    // select the lists
    this.catList = document.querySelector("#catList");
    this.bookmarkList = document.querySelector("#bookmarkList");
    // select headings
    this.catHeading = document.querySelector("#catHeading");
    this.bookmarkHeading = document.querySelector("#bookmarkHeading");

    // select forms
    this.catForm = document.querySelector("#catForm");
    this.bookmarkForm = document.querySelector("#bookmarkForm");
    // select btns
    this.addCatBtn = document.querySelector("#catAddBtn");
    this.cancelCatBtn = document.querySelector("#catCancel");
    this.addBookmarkBtn = document.querySelector("#bookmarkAddBtn");
    this.cancelBookmarkBtn = document.querySelector("#bookmarkCancel");

    // select add show forms + / icon
    this.addShowFormCat = document.querySelector("#catAdd");
    this.addShowFormBookmark = document.querySelector("#bookmarkAdd");
    // select textName and and url
    this.textCat = document.querySelector("#textCat");
    this.textBookmark = document.querySelector("#textBookmark");
    this.textURL = document.querySelector("#textURL");
    // online offline status
    this.onLineStatus = document.querySelector("#status");
  }
}
