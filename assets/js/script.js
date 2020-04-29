"use strict";
//Global variable's
let arrayOfTabs;
let catIndex = -243;
let bookmarkIndex = -243;
// weekly reminder array
let arrayWeeklyReminder;
// date reminder array
let arrayDateReminder;
let today = new Date();
let todaysDayCode = today.getDay();
let currentDate = today.getDate();
let currentYear = today.getFullYear();
let currentMonth = 1 + today.getMonth();
const BOOKMARK_STORAGE_KEY = "fileMobileBookmark10122019DEBX";
const REMINDER_STORAGE_KEY = "mobilReminderApril262020DEBX";
const DATE_REMINDER_STORAGE_KEY = "mobilDateReminderApril272020debx";
//Select audio files
let addBookmarkAudio = document.querySelector("#addBookmarkAudio");
let addTabAudio = document.querySelector("#addTabAudio");
let btnAudio = document.querySelector("#btnAudio");
let cancelAudio = document.querySelector("#cancelAudio");
let clickAudio = document.querySelector("#clickAudio");
let deleteAudio = document.querySelector("#deleteAudio");
let tabAudio = document.querySelector("#tabAudio");
let warning1Audio = document.querySelector("#warning1Audio");
let warning2Audio = document.querySelector("#warning2Audio");
// create elements object
const el = new Elements();
// Pass elements to display
const display = new Display(el, $);
let binaryH1tag = document.querySelector("#binaryH1Tag");
// create storage
const bookmarkStorage = new ArrayStorageLS(BOOKMARK_STORAGE_KEY);
const reminderStorage = new ArrayStorageLS(REMINDER_STORAGE_KEY);
const dateReminderStorage = new ArrayStorageLS(DATE_REMINDER_STORAGE_KEY);
//This enables JQuery ToolTips
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
//The start of program exicution.
window.onload = function () {
  startUp();
  showBinary();
};
//Start Up
function startUp() {
  bookmarkStartUp();
  // show the date
  getAndShowDate();
  weeklyReminderStartUp();
  reminderDateStartUp();
}
function bookmarkStartUp() {
  arrayOfTabs = bookmarkStorage.getArrayFromLS();
  renderCategorys();
  // If you have Home catogory display it's bookmarks
  HomeList();
}
function weeklyReminderStartUp() {
  // grad array from file an set to arrayWeeklyReminder
  arrayWeeklyReminder = reminderStorage.getArrayFromLS();
  // send to display
  display.renderEditReminders(arrayWeeklyReminder);

  display.renderShowReminders(filterWeeklyArray(arrayWeeklyReminder));
}

function reminderDateStartUp() {
  // grad array from file an set to arrayWeeklyReminder
  arrayDateReminder = dateReminderStorage.getArrayFromLS();
  // **************************************************
  // delete old date reminders
  let deleteIndexs = [];
  // push delete indexs into a array
  for (let i = 0; i < arrayDateReminder.length; i++) {
    if (arrayDateReminder[i].year < currentYear) {
      deleteIndexs.push(i);
      continue;
    }
    if (
      arrayDateReminder[i].year === currentYear &&
      arrayDateReminder[i].month < currentMonth
    ) {
      deleteIndexs.push(i);
      continue;
    }
    if (
      arrayDateReminder[i].year === currentYear &&
      arrayDateReminder[i].month === currentMonth &&
      arrayDateReminder[i].day < currentDate
    ) {
      deleteIndexs.push(i);
      continue;
    }
  }
  // reverse arrray
  deleteIndexs.reverse();
  // delete all old reminders
  for (let i of deleteIndexs) {
    arrayDateReminder.splice(i, 1);
  }
  saveDateReimnders();
  // *****************************************************
  // send to display
  display.renderEditDateReminders(arrayDateReminder);
  // check list for year and month | show if year and month are current
  display.renderShowDateReminders(filterDateArray(arrayDateReminder));
}

//*************************************************** */
// Helper functions
//*************************************************** */
const filterWeeklyArray = (arrayWeeklyReminder) => {
  return arrayWeeklyReminder.filter((item) => {
    return item.dayCode === todaysDayCode;
  });
  return;
};
const filterDateArray = (arrayDateReminder) => {
  let showArray = arrayDateReminder.filter((item) => {
    return currentYear === item.year && currentMonth === item.month;
  });
  if (currentMonth !== 12) {
    let nextMonthArray = arrayDateReminder.filter((item) => {
      return currentYear === item.year && currentMonth + 1 === item.month;
    });
    return [...showArray, ...nextMonthArray];
  } else {
    let nextJanuaryArray = arrayDateReminder.filter((item) => {
      return currentYear + 1 === item.year && 1 === item.month;
    });
    return [...showArray, ...nextJanuaryArray];
  }
};
const showBinary = () => {
  // binary code
  let textOne = "0000 0001 0010 0011 0100 0101 0110 1000";

  // binary code
  let textTwo = "0001 0010 0011 0100 0101 0110 1000 1001";

  // binary code
  let textThree = "0010 0011 0100 0101 0110 1000 1001 1010";

  // binary code
  let textFour = "0011 0100 0101 0110 1000 1001 1010 1011";

  // binary code
  let textFive = "0100 0101 0110 1000 1001 1010 1011 1100";

  let binaryArray = [textOne, textTwo, textThree, textFour, textFive];

  let index = 0;
  setInterval(function () {
    if (index === 5) {
      binaryH1tag.textContent = binaryArray[index];
      index = 0;
    }
    binaryH1tag.textContent = binaryArray[index];
    index++;
  }, 800);
};
const getAndShowDate = () => {
  el.todayDate.textContent = new Date().toDateString();
};
const HomeList = () => {
  // grab all the catorgory's
  let tabList = document.getElementsByClassName("cat");
  // create an array from an array like object
  let newArray = Array.from(tabList);
  // Check for Home
  let index = -243;
  newArray.forEach((item) => {
    if (item.textContent === "Home") {
      // get index form Html
      index = parseInt(item.dataset.index);
    }
  });
  //  if you found Home display it's bookmarks and and active class
  if (index >= 0) {
    newArray[index].classList.add("active");
    catIndex = index;
    renderBookmarks();
  }
};

function saveBookmarks() {
  // save
  bookmarkStorage.saveArrayToLS(arrayOfTabs);
}

function saveWeeklyReminders() {
  reminderStorage.saveArrayToLS(arrayWeeklyReminder);
}
function saveDateReimnders() {
  dateReminderStorage.saveArrayToLS(arrayDateReminder);
}
// create a new array with only the items name
function mapNamesOut(array) {
  let mapedArray = array.map((item) => {
    return item.name;
  });
  return mapedArray;
} // End mapNamesOut(array)

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be eimagePathual
    return 0;
  }); //End sort function
} // End sortArrayByName(array)

function renderCategorys() {
  display.paintCategorys(mapNamesOut(arrayOfTabs));
}

function renderBookmarks() {
  // tabAudio.play();
  display.paintBookmarks(arrayOfTabs[catIndex].arrayOfBookmarks);
}
// when You click on the +/icon in the cat  heading
el.addShowFormCat.addEventListener("click", (e) => {
  clickAudio.play();
  display.showCatForm();
  display.displayNone(el.bookmarkList);
  this.textCat.focus();
});
// when You click on the +/icon in the bookmark  heading
el.addShowFormBookmark.addEventListener("click", (e) => {
  clickAudio.play();
  display.showBookmarkForm();
  this.textBookmark.focus();
});

el.catList.addEventListener("click", (e) => {
  //You have to use the name to delete the index won't always work
  // event delegation
  if (e.target.classList.contains("delete-category")) {
    let deleteName = e.target.parentElement.parentElement.textContent;
    console.log(e.target.parentElement.parentElement.textContent);
    if (
      confirm(
        `Do you want to delete the ${e.target.parentElement.parentElement.textContent} category?`
      )
    ) {
      // let index = e.target.dataset.index;
      // index = parseInt(index);
      // catIndex = index;
      // arrayOfTabs.splice(catIndex, 1);

      //Delete by name
      arrayOfTabs.forEach(function (item, index) {
        if (item.name === deleteName) {
          arrayOfTabs.splice(index, 1);
        }
      });

      deleteAudio.play();
      // saveBookmarks
      saveBookmarks();

      if (arrayOfTabs.length === 0) {
        startUp();
        return;
      }

      renderCategorys();
      display.showAlert("You deleted a catagory!", "error");
      return;
    }
  }
  // event delegation
  if (e.target.classList.contains("cat")) {
    // set's the current target active
    e.target.classList.add("active");
    //The Next code is to set the current tab color white with the active class
    var el = document.querySelectorAll(".cat");
    for (let i = 0; i < el.length; i++) {
      el[i].onclick = function () {
        var c = 0;
        while (c < el.length) {
          el[c++].className = "cat";
        }
        el[i].className = "cat active";
      };
    } // End code to set the active class

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    catIndex = index;
    tabAudio.play();
    renderBookmarks();
  }
});

el.addCatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // grab the text
  let catName = el.textCat.value.trim();
  // check if text is empty
  if (catName === "") {
    warning1Audio.play();
    display.showAlert("Please enter a name for the Categroy!", "error");
    return;
  }
  // create a tab
  let newTab = new Tab(catName);

  // check if the name already exists if it does alert and return and set current main folder to -243
  // make a variable to return
  let isTaken = false;
  arrayOfTabs.forEach((element) => {
    if (catName === element.name) {
      isTaken = true;
    }
  });
  // check for taken name
  if (isTaken) {
    warning2Audio.play();
    display.showAlert("That name is taken", "error");
    catIndex = -243;
  } else {
    // push newTab into the array
    arrayOfTabs.push(newTab);
    addBookmarkAudio.play();
    // sort array by name
    sortArrayByName(arrayOfTabs);
    // save
    saveBookmarks();
    // addAudio.play();
    display.showAlert("A new category was added", "success", 1500);
    // hide form
    display.hideCatForm();
    // reset form
    el.catForm.reset();

    // send array to display
    renderCategorys();
  } // End else statement
});

// when You click on cancel btn on the cat form
el.cancelCatBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // reset form
  el.catForm.reset();
  // hide form
  display.displayNone(el.catForm);
  // get rid of active class
  let activeTabList = document.getElementsByClassName("cat active");
  if (activeTabList) {
    let newArray = Array.from(activeTabList);
    for (let item of newArray) {
      item.classList.remove("active");
    }
  }
}); // End

el.addBookmarkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let bookmarkName = el.textBookmark.value.trim();
  let bookmarkURL = el.textURL.value.trim();
  if (!bookmarkName) {
    warning1Audio.play();
    display.showAlert("Please enter a name for the bookmark!", "error");
    return;
  }
  if (!bookmarkURL) {
    warning2Audio.play();
    display.showAlert("Please enter an address for the bookmark!", "error");
    return;
  }
  let newBookmark = new Bookmark(bookmarkName, bookmarkURL);
  arrayOfTabs[catIndex].arrayOfBookmarks.push(newBookmark);
  addBookmarkAudio.play();

  // save
  saveBookmarks();
  el.bookmarkForm.reset();
  display.displayNone(el.bookmarkForm);
  display.showAlert("You added a bookmark!", "success");
  renderBookmarks();
});

// when You click on cancel btn on the bookmark form
el.cancelBookmarkBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // reset form
  el.bookmarkForm.reset();
  // hide form
  display.displayNone(el.bookmarkForm);
}); // End

el.bookmarkList.addEventListener("click", (e) => {
  //look for the span with a class of 'moveUp'
  if (e.target.classList.contains("moveUp")) {
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    //If index is zero. You can't move it any more so return
    if (index === 0) {
      return;
    }
    // get move to index
    let moveTo = index - 1;
    let arr = arrayOfTabs[catIndex].arrayOfBookmarks;

    // swap array elements
    [arr[index], arr[moveTo]] = [arr[moveTo], arr[index]];
    btnAudio.play();
    // save
    saveBookmarks();
    renderBookmarks();
    return;
  }

  if (e.target.classList.contains("moveDown")) {
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);

    let arr = arrayOfTabs[catIndex].arrayOfBookmarks;

    //If index is equal to length - 1. You can't move it any more so return
    if (index === arr.length - 1) {
      return;
    }
    // get move to index
    let moveTo = index + 1;

    // swap array elements
    [arr[index], arr[moveTo]] = [arr[moveTo], arr[index]];
    btnAudio.play();
    // save
    saveBookmarks();
    renderBookmarks();
    return;
  }

  if (e.target.classList.contains("delete-item")) {
    if (
      confirm(
        `Do you want to delete the ${e.target.parentElement.parentElement.previousSibling.textContent} bookmark?`
      )
    ) {
      let deleteIndex = e.target.parentElement.dataset.index;
      deleteIndex = parseInt(deleteIndex);
      arrayOfTabs[catIndex].arrayOfBookmarks.splice(deleteIndex, 1);
      deleteAudio.play();
      // save
      saveBookmarks();
      renderBookmarks();
      display.showAlert("You deleted a bookmark!", "success");
      return;
    }
  }
}); // End

// check if on or off line
if (navigator.onLine) {
  display.onlineMessage();
} else {
  display.offlineMessage();
}
// listen for events on or off line
window.addEventListener("online", (e) => display.onlineMessage());
window.addEventListener("offline", (e) => display.offlineMessage());

// Search box
document.querySelector("#googleBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  let inputBox = document.querySelector("#googleSearchInput");
  let searchTerm = inputBox.value;

  inputBox.value = "";
  //search google
  window.open("http://google.com/search?q=" + searchTerm);
});

document.querySelector("#mdnBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  let inputBox = document.querySelector("#googleSearchInput");
  let searchTerm = inputBox.value;
  inputBox.value = "";
  // search MDN
  window.open("https://developer.mozilla.org/en-US/search?q=" + searchTerm);
});
document.querySelector("#youTubeBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  let inputBox = document.querySelector("#googleSearchInput");
  let searchTerm = inputBox.value;
  inputBox.value = "";
  // search Youtube
  window.open("https://www.youtube.com/results?search_query=" + searchTerm);
});
document.querySelector("#stackOverflowBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  let inputBox = document.querySelector("#googleSearchInput");
  let searchTerm = inputBox.value;
  inputBox.value = "";
  // search stack overflow
  window.open("https://stackoverflow.com/search?q=" + searchTerm);
});

// ******************************* date reminder code **************
el.inBtnSaveDateReminder.addEventListener("click", (e) => {
  e.preventDefault();
  let dateToSet = this.inDateDateReminder.value;
  if (!dateToSet) {
    warning1Audio.play();
    display.showAlert("Please choose a date!", "error");
    return;
  }

  let text = this.inTextDateReminder.value.trim();
  if (!text) {
    warning1Audio.play();
    display.showAlert(
      "Please enter a message for your date reminder!",
      "error"
    );
    return;
  }

  let dateReminder = new DateReminder(dateToSet, text);
  arrayDateReminder.push(dateReminder);
  display.showAlert("A date reminder was saved", "success", 1500);
  addTabAudio.play();
  this.formDateReminder.reset();
  saveDateReimnders();
  display.renderEditDateReminders(arrayDateReminder);

  display.renderShowDateReminders(filterDateArray(arrayDateReminder));
});

el.inBtnCancelDateReminder.addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  display.displayNone(this.remindersDiv);
  this.formDateReminder.reset();
});

el.outULEditDateReminder.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-date-reminder")) {
    let deleteIndex = e.target.parentElement.dataset.index;

    arrayDateReminder.splice(deleteIndex, 1);
    display.showAlert("A date reminder was deleted", "success", 1500);
    deleteAudio.play();
    // save to  local storage
    saveDateReimnders();
    // redisplay
    display.renderEditDateReminders(arrayDateReminder);
    display.renderShowDateReminders(filterDateArray(arrayDateReminder));
  }
});

el.inDateDateReminder.addEventListener("change", (e) => {
  tabAudio.play();
});
// *********************************** End Date reminder code ************

//************************************** Weekly reminder code **************************************************** */
el.inBtnSaveReminder.addEventListener("click", (e) => {
  e.preventDefault();
  // get Input
  let tempDay = inSelectDayCode.value;

  let tempReminder = inTextReminder.value.trim();
  if (!tempReminder) {
    warning1Audio.play();
    display.showAlert(
      "Please enter a message for your weekly reminder!",
      "error"
    );
    return;
  }
  // create reminder
  let reminder = new Reminder(tempDay, tempReminder);
  // push reminder
  arrayWeeklyReminder.push(reminder);
  addTabAudio.play();
  display.showAlert("A weekly reminder was saved", "success", 1500);
  this.formReminder.reset();
  // save to  local storage
  saveWeeklyReminders();
  // redisplay
  display.renderEditReminders(arrayWeeklyReminder);
  display.renderShowReminders(filterWeeklyArray(arrayWeeklyReminder));
});
el.inBtnCancelReminder.addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  display.displayNone(this.remindersDiv);
  this.formReminder.reset();
});

el.outUlEditReminder.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-reminder")) {
    let deleteIndex = e.target.parentElement.dataset.index;
    display.showAlert("A weekly reminder was deleted", "success", 1500);
    arrayWeeklyReminder.splice(deleteIndex, 1);
    deleteAudio.play();
    // save to  local storage
    saveWeeklyReminders();
    // redisplay
    display.renderEditReminders(arrayWeeklyReminder);
    display.renderShowReminders(filterWeeklyArray(arrayWeeklyReminder));
  }
});

el.pieBtn.addEventListener("click", (e) => {
  clickAudio.play();
  display.displayBlock(this.remindersDiv);
});
el.inSelectDayCode.addEventListener("change", (e) => {
  tabAudio.play();
});
