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
//Select audio files
let clickAudio = document.querySelector("#clickAudio");
let tabAudio = document.querySelector("#tabAudio");

// create elements object
const el = new Elements();
// Pass elements to display
const display = new Display(el, $);

//This enables JQuery ToolTips
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
//The start of program exicution.
window.onload = function () {
  startUp();
};
//Start Up
function startUp() {
  loadJSONData("./bookMark.json");
    getAndShowDate();
}


async function loadJSONData(END_POINT) {
  try {
    const response = await fetch(END_POINT);
    const myData = await response.json();
    let {arrayDateReminder, arrayOfTabs, arrayWeeklyReminder } = myData;

    bookmarkStartUp(arrayOfTabs);
    weeklyReminderStartUp(arrayWeeklyReminder);
    reminderDateStartUp(arrayDateReminder)
  } catch (error) {
    console.log(error);
  }
}
// **************************************************
function bookmarkStartUp(data) {
  arrayOfTabs = data;
  renderCategorys();
  // If you have Home catogory display it's bookmarks
  HomeList();
}

function weeklyReminderStartUp(data) {
  arrayWeeklyReminder = data;
  // send to display
  // display.renderEditReminders(arrayWeeklyReminder);

  display.renderShowReminders(filterWeeklyArray(arrayWeeklyReminder));
}

function reminderDateStartUp(data) {
  arrayDateReminder = data;
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
  // saveDateReimnders();
  // *****************************************************
  // send to display
  // display.renderEditDateReminders(arrayDateReminder);
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
    newArray[index].parentElement.classList.add("active");
    catIndex = index;
    renderBookmarks();
  }
};

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

el.catList.addEventListener("click", (e) => {
  // event delegation
  if (e.target.classList.contains("cat")) {
    const element = document.querySelector(".catClass.active");
    if (element) {
      element.classList.remove("active");
    }
    // add active class
    e.target.parentElement.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    catIndex = index;
    tabAudio.play();
    renderBookmarks();
  }
});


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

el.pieBtn.addEventListener("click", (e) => {
  clickAudio.play();
  // display.displayBlock(this.remindersDiv);
});
