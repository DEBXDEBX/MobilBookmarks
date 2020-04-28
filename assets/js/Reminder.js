class Reminder {
  constructor(dayCode, text) {
    this.dayCode = parseInt(dayCode);
    this.day = this.getDayFromDayCode(dayCode);
    this.text = text;
  }
  //Method
  getDayFromDayCode(dayCode) {
    switch (parseInt(dayCode)) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursdau";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        console.log("Error in day code");
    }
  }
} // End Reminder class
