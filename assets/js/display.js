class Display {
  constructor(elements, $) {
    this.elements = elements;
    //JQuery
    this.$ = $;
    this.tabColorIndex = 0;
    this.tabColors = [
      "#2de11d",
      "#4848e8",
      "#e84d4d",
      "Orange",
      "Violet",
      "#820ee8",
      "#8e7fc7",
      "#ff008b",
      "#4dc6e8",
      "#17abf5",
      "#4c69bd",
      "#e251dc",
      "#bbb70e",
    ];
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
      html += `<li class="catClass"><span data-index="${index}" class="cat" id="catSpan">${element}</span></li>`;
    });
    this.elements.catList.innerHTML = html;

    this.displayBlock(this.elements.catList);
    // color tabs
    let tabList = document.getElementsByClassName("catClass");
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
    newElement.innerHTML = `<div class='myFlexItem'><h4><a href="${address}" target="_blank">${name}</a></h4></div>`;

    this.elements.bookmarkList.appendChild(newElement);
  }
  //Method
  colorSetOfTabs(htmlCollection) {
    for (const item of htmlCollection) {
      item.style.backgroundColor = this.tabColors[this.tabColorIndex];
      if (this.tabColorIndex === this.tabColors.length - 1) {
        this.tabColorIndex = 0;
      } else {
        this.tabColorIndex++;
      }
    }
  } // End colorSetOfTabs(htmlCollection)

  // Method
  showAlert(message, className, displayTime = 4000) {
    if (className === "success") {
      // remove error
      this.elements.messageDisplay.classList.remove("error");
      // add success
      this.elements.messageDisplay.classList.add("success");
      // remove red border
      this.elements.messageBorder.classList.remove("redBorder");
      // add green border
      this.elements.messageBorder.classList.add("greenBorder");
    } else {
      // remove success
      this.elements.messageDisplay.classList.remove("success");
      // add error
      this.elements.messageDisplay.classList.add("error");
      // remove green border
      this.elements.messageBorder.classList.remove("greenBorder");
      // add red border
      this.elements.messageBorder.classList.add("redBorder");
    }
    this.elements.messageDisplay.textContent = message;
    $("#myMessageModal").modal("hide");
    $("#myMessageModal").modal("show");
    setTimeout(() => {
      $("#myMessageModal").modal("hide");
    }, displayTime);
  } // End showAlert()

  //Method
  onlineMessage() {
    this.elements.onLineStatus.innerHTML = `<h1 class="online">Online</h1>`;
    // Timeout after 4 sec
    let displayTime = 7000;
    setTimeout(function () {
      document.querySelector(".online").remove();
    }, displayTime);
  }

  //Method
  offlineMessage() {
    this.elements.onLineStatus.innerHTML = `<h1 class="offline">Offline</h1>`;
  }

  //Method
  renderShowReminders(array) {
    let html = "";

    array.forEach((element, index) => {
      html += `<h4 data-index="${index}" class="showReminders">${element.day} ${element.text}</h4>`;
    });
    // paint reminders
    this.elements.outUlShowReminder.innerHTML = html;
  }

  //Method
  renderShowDateReminders(array) {
    let html = "";

    array.forEach((element, index) => {
      html += `<h4 data-index="${index}" class="showDateReminders">${element.stringDate} ${element.text}</h4>`;
    });
    // paint reminders
    this.elements.outULShowDateReminder.innerHTML = html;
  }

    //Method
    showReminderDiv() {
      this.displayBlock(this.elements.remindersDiv);
    }

    //Method
    hideReminderDiv() {
      this.displayNone(this.elements.remindersDiv);
    }
} // End class
