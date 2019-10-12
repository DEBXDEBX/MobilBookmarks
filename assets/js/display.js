class Display {
  constructor(elements, $) {
    this.elements = elements;
    //JQuery
    this.$ = $;
    this.tabColorIndex = 0;
  } // End constructor

  //Method
  displayNone(element) {
    this.$(element).slideUp("slow");
  } // End displayNone(element)

  //Method
  displayBlock(element) {
    this.$(element).slideDown("slow");
  } // End displayBlock(element)

  //Method
  clearCategoryDisplay() {
    this.elements.catList.innerHTML = "";
  } // End clearFileCabDisplay()

  //Method
  clearBookmarkDisplay() {
    this.elements.bookmarkList.innerHTML = "";
  } // End clearPrimaryDisplay()
  //Method
  showCatForm() {
    this.displayNone(this.elements.bookmarkHeading);
    this.displayNone(this.elements.bookmarkForm);
    this.displayBlock(this.elements.catForm);
  }
  hideCatForm() {
    this.displayNone(this.elements.catForm);
  }
  //Method
  showBookmarkForm() {
    this.displayBlock(this.elements.bookmarkForm);
  }
  paintCategorys(mappedArray) {
    this.displayBlock(this.elements.catHeading);
    this.displayNone(catList);
    this.displayNone(bookmarkList);
    this.clearCategoryDisplay();
    this.clearBookmarkDisplay();
    this.displayNone(this.elements.catHeading);
    this.displayNone(this.elements.bookmarkHeading);
    this.displayBlock(this.elements.catHeading);
    // make variable for html
    let html = "";

    mappedArray.forEach((element, index) => {
      html += `<li data-index="${index}" class="cat">${element}</li>`;
    });
    this.elements.catList.innerHTML = html;

    this.displayBlock(this.elements.catList);
    // color tabs
    let tabList = document.getElementsByClassName("cat");
    this.colorSetOfTabs(tabList);
  }

  paintBookmarks(bookmarkArray) {
    this.clearBookmarkDisplay();
    this.displayNone(this.elements.bookmarkHeading);
    this.displayBlock(this.elements.bookmarkHeading);
    this.displayNone(this.elements.bookmarkList);
    this.displayNone(this.elements.bookmarkForm);
    this.displayNone(this.elements.catForm);
    //build bookmark div

    bookmarkArray.forEach((bm, index) => {
      // createNewBookMarkDiv(bm.name, bm.address);
      this.createNewBookMarkDiv(bm.name, bm.url, index);
      //create a new div for each bookmark
    });
    this.displayBlock(this.elements.bookmarkList);
  }

  //Method
  createNewBookMarkDiv(name, address, index) {
    // This function creates the div and append's it to the div.
    let newElement = document.createElement("div");
    //add a title with the web address
    newElement.innerHTML = `<div class='myFlexItem'><h4><a href="${address}" >${name}</a></h4><div class='spanDiv'><span data-index="${index}" title='Move Left' class='moveUp'>&lArr;</span><span title='Delete' data-index="${index}" ><i
    title="Delete Bookmark"
    class="delete-item fas fa-trash-alt"
  ></i
></span><span title='Move Right' data-index="${index}" class='moveDown'>&rArr;</span></div>`;

    this.elements.bookmarkList.appendChild(newElement);
  }

  colorSetOfTabs(tabList) {
    let tabColors = [
      "#4848e8",
      "#e84d4d",
      "Orange",
      "Violet",
      "#820ee8",
      "#2de11d",
      "#8e7fc7",
      "#ff008b",
      "#17abf5",
      "#4c69bd",
      "#0c10de",
      "#e251dc",
      "#bbb70e"
    ];
    // create an array from an array like object
    let newArray = Array.from(tabList);
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].style.backgroundColor = tabColors[this.tabColorIndex];
      if (this.tabColorIndex === tabColors.length - 1) {
        this.tabColorIndex = 0;
      } else {
        this.tabColorIndex++;
      }
    }
  } // End colorSetOfTabs(tabList)

  // Method
  showAlert(message, className, displayTime = 4000) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector("body");
    // Insert alert other element
    container.insertBefore(div, this.elements.catform);
    // Timeout after 4 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, displayTime);
  } // End showAlert()
} // End class
