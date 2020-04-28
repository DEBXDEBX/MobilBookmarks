class DateReminder {
  constructor(dateToSet, text) {
    // dateToSet comes in as a string
    let dateToSetArray = dateToSet.split("-");
    this.year = parseInt(dateToSetArray[0]);
    this.month = parseInt(dateToSetArray[1]);
    this.day = parseInt(dateToSetArray[2]);
    this.stringDate = `${this.month}-${this.day}-${this.year}`;
    this.text = text;
  }
} // End Reminder class
