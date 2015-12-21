/// <reference path="jquery-2.1.4.min.js" />
/// <reference path="xdate.js" />

var Calendar = (function () {
    function Calendar(divName) {
        var self = this;
        self.divName = divName;
        self.currentDate = new XDate();

        //Draws the month and year of a given XDate object into the div name supplied.
        self.drawDate = function (date, divName) {
            var firstDayOfMonth = new XDate(date.getFullYear(),
                                                date.getMonth(),
                                                1).getDay();

            var lastDayOfMonth = new XDate(date.getFullYear(),
                                                    date.getMonth(),
                                                    XDate.getDaysInMonth(date.getYear(),
                                                    date.getMonth())).getDay();

            var daysInMonth = XDate.getDaysInMonth(date.getYear(), date.getMonth());

            var lastMonth = date.clone().addMonths(-1);
            var daysInLastMonth = XDate.getDaysInMonth(lastMonth.getYear(), lastMonth.getMonth());

            //Draw in the header + back and forward buttons + days of week
            $('#' + divName).html('<div id="monthDiv" class="monthDiv">'
                + '<button id="' + divName + 'back" class="prevButton button">Prev</button>'
                + date.toString("MMMM yyyy")
                + '<button id="' + divName + 'forward" class="nextButton button">Next</button>'
                + '</div>');
            $('#' + divName + 'back').click(function () {
                self.backMonth();
            });
            $('#' + divName + 'forward').click(function () {
                self.forwardMonth();
            });
            $('#' + divName).append('<div id="sunDiv" class="dayOfWeekDiv">Sun</div>' +
                                    '<div id="monDiv" class="dayOfWeekDiv">Mon</div>' +
                                    '<div id="tueDiv" class="dayOfWeekDiv">Tue</div>' +
                                    '<div id="wedDiv" class="dayOfWeekDiv">Wed</div>' +
                                    '<div id="thuDiv" class="dayOfWeekDiv">Thu</div>' +
                                    '<div id="friDiv" class="dayOfWeekDiv">Fri</div>' +
                                    '<div id="satDiv" class="dayOfWeekDiv">Sat</div>');
            
            //draw in the days from the previous month
            var prevMonthCounter = 0;
            var prevMonthDay = daysInLastMonth - firstDayOfMonth + 1;
            while (prevMonthCounter < firstDayOfMonth) {
                var dayToShow = new XDate(date.getFullYear(), date.getMonth() -1, prevMonthDay);
                if (dayToShow.getDay() === 0 || dayToShow.getDay() === 6) {
                    $('#' + divName).append('<div id="dayDiv" class="dayDiv otherMonth weekendDay">' + prevMonthDay++ + '</div>');
                }
                else {
                    $('#' + divName).append('<div id="dayDiv" class="dayDiv otherMonth">' + prevMonthDay++ + '</div>');
                }
                prevMonthCounter++;
            }
            
            //draw in the days for the current month
            for (var i = 1; i <= daysInMonth; i++) {
                var dayToShow = new XDate(date.getFullYear(), date.getMonth(), i);
                if (dayToShow.getDay() === 0 || dayToShow.getDay() === 6) {
                    if (i === self.currentDate.getDate() &&
                        date.getMonth() === self.currentDate.getMonth() &&
                        date.getFullYear() === self.currentDate.getFullYear()) {
                        $('#' + divName).append('<div id="dayDiv" class="dayDiv currentDay weekendDay">' + i + '</div>');
                    }
                    else {
                        $('#' + divName).append('<div id="dayDiv" class="dayDiv weekendDay">' + i + '</div>');
                    }
                }
                else {
                    if (i === self.currentDate.getDate() &&
                        date.getMonth() === self.currentDate.getMonth() &&
                        date.getFullYear() === self.currentDate.getFullYear()) {
                        $('#' + divName).append('<div id="dayDiv" class="dayDiv currentDay">' + i + '</div>');
                    }
                    else {
                        $('#' + divName).append('<div id="dayDiv" class="dayDiv">' + i + '</div>');
                    }
                }
            }

            //draw in the days for next month
            var nextMonthCounter = lastDayOfMonth;
            var i = 1;
            while (nextMonthCounter < 6) {
                var dayToShow = new XDate(date.getFullYear(), date.getMonth() + 1, i);
                if (dayToShow.getDay() === 0 || dayToShow.getDay() === 6) {
                    $('#' + divName).append('<div id="dayDiv" class="dayDiv otherMonth weekendDay">' + i++ + '</div>');
                }
                else {
                    $('#' + divName).append('<div id="dayDiv" class="dayDiv otherMonth">' + i++ + '</div>');
                }
                nextMonthCounter++;
            }
        }

        self.backMonth = function () {
            self.drawDate(self.displayDate.addMonths(-1), self.divName);
        };

        self.forwardMonth = function () {
            self.drawDate(self.displayDate.addMonths(1), self.divName);
        };

        //draw the current date when we initialize
        //Can later take in an XDate as a parameter and set displayDate equal to it, if needed.
        self.displayDate = self.currentDate.clone();
        self.drawDate(self.displayDate, divName);
    }
    return Calendar;
}());

var calendar1 = new Calendar("calendarDiv");
var calendar2 = new Calendar("calendar2Div");
