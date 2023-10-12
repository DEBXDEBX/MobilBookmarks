class Elements {
  constructor() {
    // select the lists
    this.catList = document.querySelector("#catList");
    this.bookmarkList = document.querySelector("#bookmarkList");
    // select headings
    this.catHeading = document.querySelector("#catHeading");
    this.bookmarkHeading = document.querySelector("#bookmarkHeading");

    // online offline status
    this.onLineStatus = document.querySelector("#status");
    // todays date
    this.todayDate = document.querySelector("#todayDate");
    // select message display
    this.messageDisplay = document.querySelector("#displayMessage");
    // select message border
    this.messageBorder = document.querySelector("#modalBorder");

    // select the lists
    this.outUlShowReminder = document.querySelector("#outUlShowReminder");
    this.outULShowDateReminder = document.querySelector(
      "#outULShowDateReminder"
    );

    this.pieBtn = document.querySelector("#pie");

    // Div
    this.remindersDiv = document.querySelector("#remindersDiv");
  }
}
