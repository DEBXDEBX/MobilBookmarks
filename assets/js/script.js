"use strict";
//Global variable's
let arrayOfTabs = [];
let catIndex = -243;
let bookmarkIndex = -243;
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
let binaryPtag = document.querySelector("#binaryPtag");
//This enables JQuery ToolTips
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
//The start of program exicution.
window.onload = function() {
  // binary code
  let textOne = "";
  for (let i = 0; i < 243; i++) {
    textOne += "0001\t0010\t0011\t0100\t0101\t0110\t0111\t1000\t";
  }
  // binary code
  let textTwo = "";
  for (let i = 0; i < 243; i++) {
    textTwo += "1000\t0111\t0110\t0100\t0100\t0011\t0010\t0001\t";
  }
  // binary code
  let textThree = "";
  for (let i = 0; i < 243; i++) {
    textThree += "0100\t0011\t0010\t0001\t0111\t0011\t0110\t0101\t";
  }
  // binary code
  let textFour = "";
  for (let i = 0; i < 243; i++) {
    textFour += "0101\t0100\t0011\t0010\t0001\t0111\t0011\t0110\t";
  }
  // binary code
  let textFive = "";
  for (let i = 0; i < 243; i++) {
    textFive += "0011\t0010\t0111\t0110\t1101\t1011\t1100\t1110\t";
  }
  let binaryArray = [textOne, textTwo, textThree, textFour, textFive];

  let index = 0;
  setInterval(function() {
    if (index === 5) {
      binaryPtag.textContent = binaryArray[index];
      index = 0;
    }
    binaryPtag.textContent = binaryArray[index];
    index++;
  }, 800);
  startUp();
};
//Start Up
function startUp() {
  let storageLs = new StoreageLS();
  arrayOfTabs = storageLs.getArrayFromFile();
  renderCategorys();
}

//*************************************************** */
// Helper functions
//*************************************************** */

function save() {
  // save
  let storageLs = new StoreageLS();
  storageLs.setArrayToFileName(arrayOfTabs);
}

// create a new array with only the items name
function mapNamesOut(array) {
  let mapedArray = array.map(item => {
    return item.name;
  });
  return mapedArray;
} // End mapNamesOut(array)

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function(a, b) {
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
  // tabAudio.play();
  display.paintCategorys(mapNamesOut(arrayOfTabs));
}

function renderBookmarks() {
  // tabAudio.play();
  display.paintBookmarks(arrayOfTabs[catIndex].arrayOfBookmarks);
}
// when You click on the +/icon in the cat  heading
el.addShowFormCat.addEventListener("click", e => {
  clickAudio.play();
  display.showCatForm();
  display.displayNone(el.bookmarkList);
});
// when You click on the +/icon in the bookmark  heading
el.addShowFormBookmark.addEventListener("click", e => {
  clickAudio.play();
  display.showBookmarkForm();
});

el.catList.addEventListener("click", e => {
  //You have to uyse the name to delete the index won't always work
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
      arrayOfTabs.forEach(function(item, index) {
        if (item.name === deleteName) {
          arrayOfTabs.splice(index, 1);
        }
      });

      deleteAudio.play();
      // save
      save();

      if (arrayOfTabs.length === 0) {
        startUp();
        return;
      }

      renderCategorys();
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
      el[i].onclick = function() {
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

el.addCatBtn.addEventListener("click", e => {
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
  arrayOfTabs.forEach(element => {
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
    save();
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
el.cancelCatBtn.addEventListener("click", e => {
  cancelAudio.play();
  // reset form
  el.catForm.reset();
  // hide form
  display.displayNone(el.catForm);
}); // End

el.addBookmarkBtn.addEventListener("click", e => {
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
  save();
  el.bookmarkForm.reset();
  display.displayNone(el.bookmarkForm);
  renderBookmarks();
});

// when You click on cancel btn on the bookmark form
el.cancelBookmarkBtn.addEventListener("click", e => {
  cancelAudio.play();
  // reset form
  el.bookmarkForm.reset();
  // hide form
  display.displayNone(el.bookmarkForm);
}); // End

el.bookmarkList.addEventListener("click", e => {
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
    save();
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
    save();
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
      save();
      renderBookmarks();
      return;
    }
  }
}); // End
