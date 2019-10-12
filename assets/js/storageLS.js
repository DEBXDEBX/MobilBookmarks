class StoreageLS {
  constructor() {
    this.file = "fileMobileBookmark10122019DEBX";
  }

  //Method setArrayToFileName
  setArrayToFileName(array) {
    let myHomeJSON = JSON.stringify(array);
    localStorage.setItem(this.file, myHomeJSON);
  }

  // Method getArrayFromFile
  getArrayFromFile() {
    let defaultArray = [];
    // debugger;
    let tab = new Tab("Home");
    let bookmarkOne = new Bookmark("Google", "https://www.google.com/");
    tab.arrayOfBookmarks.push(bookmarkOne);
    let bookmarkTwo = new Bookmark("Amazon", "https://www.amazon.com/");
    tab.arrayOfBookmarks.push(bookmarkTwo);
    defaultArray.push(tab);

    // Read file
    let textFromFile = localStorage.getItem(this.file);

    if (textFromFile) {
      //parse file
      let array = JSON.parse(textFromFile);

      if (array.length === 0) {
        return defaultArray;
      }
      // return array
      return array;
    } else {
      // return array
      return defaultArray;
    }
  } // End getArrayFromFile method
}
