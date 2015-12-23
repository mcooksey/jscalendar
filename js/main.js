/// <reference path="jquery-2.1.4.min.js" />
/// <reference path="xdate.js" />
/// <reference path="controlpanel.js" />

var Calendar = (function () {
    function Calendar(divName) {
        var self = this;
        self.divName = divName;
        self.currentDate = new XDate();
        self.selectedDivNames = new Array();
        self.disabledDivNames = new Array();
        self.markedDivNames = new Array();
        self.disabledTooltip = "This day is disabled.";
        self.markedTooltip = "This day is marked.";
        

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
            $('#' + divName).html('<div id="titleDiv" class="titleDiv">'
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
                    $('#' + divName).append('<div id="dayDiv_' + dayToShow.getMonth() + '_' + prevMonthDay + '" class="dayDiv otherMonth weekendDay">' + prevMonthDay + '</div>');
                    $('#' + 'dayDiv_' + dayToShow.getMonth() + '_' + prevMonthDay).click(function (event) {
                        self.backMonth();
                    });
                }
                else {
                    $('#' + divName).append('<div id="dayDiv_' + dayToShow.getMonth() + '_' + prevMonthDay + '" class="dayDiv otherMonth">' + prevMonthDay + '</div>');
                    $('#' + 'dayDiv_' + dayToShow.getMonth() + '_' + prevMonthDay).click(function (event) {
                        self.backMonth();
                    });
                }
                prevMonthCounter++;
                prevMonthDay++;
            }
            
            //draw in the days for the current month
            for (var i = 1; i <= daysInMonth; i++) {
                var dayToShow = new XDate(date.getFullYear(), date.getMonth(), i);
                if (dayToShow.getDay() === 0 || dayToShow.getDay() === 6) {
                    if (i === self.currentDate.getDate() &&
                        date.getMonth() === self.currentDate.getMonth() &&
                        date.getFullYear() === self.currentDate.getFullYear()) {
                        $('#' + divName).append('<div id="dayDiv_' + dayToShow.getMonth() + '_' + i + '" class="dayDiv currentDay weekendDay">' + i + '</div>');
                    }
                    else {
                        $('#' + divName).append('<div id="dayDiv_' + dayToShow.getMonth() + '_' + i + '" class="dayDiv weekendDay">' + i + '</div>');

                    }
                }
                else {
                    if (i === self.currentDate.getDate() &&
                        date.getMonth() === self.currentDate.getMonth() &&
                        date.getFullYear() === self.currentDate.getFullYear()) {
                        $('#' + divName).append('<div id="dayDiv_' + dayToShow.getMonth() + '_' + i + '" class="dayDiv currentDay">' + i + '</div>');
                    }
                    else {
                        $('#' + divName).append('<div id="dayDiv_' + dayToShow.getMonth() + '_' + i + '" class="dayDiv">' + i + '</div>');
                        
                    }
                }
                $('#' + 'dayDiv_' + dayToShow.getMonth() + '_' + i).click(function (event) {
                    if (event.ctrlKey) {
                        self.addSelected(event.target.id);
                    }
                    else {
                        self.toggleSelected(event.target.id);
                    }
                });
            }

            //draw in the days for next month
            var nextMonthCounter = lastDayOfMonth;
            var i = 1;
            while (nextMonthCounter < 6) {
                var dayToShow = new XDate(date.getFullYear(), date.getMonth() + 1, i);
                if (dayToShow.getDay() === 0 || dayToShow.getDay() === 6) {
                    $('#' + divName).append('<div id="dayDiv_' + dayToShow.getMonth() + '_' + i + '" class="dayDiv otherMonth weekendDay">' + i + '</div>');
                }
                else {
                    $('#' + divName).append('<div id="dayDiv_' + dayToShow.getMonth() + '_' + i + '" class="dayDiv otherMonth">' + i + '</div>');
                }
                $('#' + 'dayDiv_' + dayToShow.getMonth() + '_' + i).click(function (event) {
                    self.forwardMonth();
                });
                nextMonthCounter++;
                i++;
            }
            self.redrawHighlights();
        }

        self.backMonth = function () {
            self.drawDate(self.displayDate.addMonths(-1), self.divName);
        };

        self.forwardMonth = function () {
            self.drawDate(self.displayDate.addMonths(1), self.divName);
        };

        self.jumpToDate = function (date) {
            self.displayDate = date;
            self.drawDate(self.displayDate, divName);
        }

        self.redrawHighlights = function () {
            $('#' + self.divName).children().removeClass("selectedDay");
            $('#' + self.divName).children().removeClass("disabledDay");
            $('#' + self.divName).children().removeClass("markedDay");
            $('#' + self.divName).children().attr('title', null);

            self.selectedDivNames.forEach(function (divName) {
                $('#' + divName).addClass('selectedDay');
            });
            self.markedDivNames.forEach(function (divName) {
                $('#' + divName).addClass('markedDay');
                $('#' + divName).attr('title', self.markedTooltip);
            });
            self.disabledDivNames.forEach(function (divName) {
                $('#' + divName).addClass('disabledDay');
                $('#' + divName).attr('title', self.disabledTooltip);
                
            });
        }

        self.markSelected = function () {
            self.selectedDivNames.forEach(function (divName) {
                self.markedDivNames.push(divName);
                self.redrawHighlights();
            });
        }

        self.enableSelected = function () {
            self.selectedDivNames.forEach(function (divName) {
                var index = self.disabledDivNames.indexOf(divName);
                self.disabledDivNames.splice(index, 1);
                self.redrawHighlights();
            });
        }

        self.disableSelected = function () {
            self.selectedDivNames.forEach(function (divName) {
                self.disabledDivNames.push(divName);
                self.redrawHighlights();
            });
        }

        self.unmarkSelected = function () {
            self.selectedDivNames.forEach(function (divName) {
                var index = self.markedDivNames.indexOf(divName);
                self.markedDivNames.splice(index, 1);
                self.redrawHighlights();
            });
            
        }

        self.unmarkAll = function () {
            self.markedDivNames = [];
            self.redrawHighlights();
        }

        self.enableAll = function () {
            self.disabledDivNames = [];
            self.redrawHighlights();
        }

        self.addSelected = function (dayID) {
            if (!$('#' + dayID).hasClass('disabledDay')) {
                var index = self.selectedDivNames.indexOf(dayID);
                if (index === -1) {
                    self.selectedDivNames.push(dayID);
                }
                else {
                    self.selectedDivNames.splice(index, 1);
                }
                self.redrawHighlights();

                //update the control panel
                var split = dayID.split("_");
                var day = split[2];
                self.selectedDate = new XDate(self.displayDate.getFullYear(), self.displayDate.getMonth(), day);
                self.controlPanel.updateLastSelected(self.selectedDate);
            }
        }

        self.toggleSelected = function (dayID) {
            if (!$('#' + dayID).hasClass('disabledDay')) {
                if ($('#' + dayID).hasClass('selectedDay') && self.selectedDivNames.length === 1) {
                    $('#' + dayID).removeClass('selectedDay');
                }
                else {
                    self.selectedDivNames = [];
                    self.selectedDivNames.push(dayID);
                    self.redrawHighlights();

                    //update the control panel
                    var split = dayID.split("_");
                    var day = split[2];
                    self.selectedDate = new XDate(self.displayDate.getFullYear(), self.displayDate.getMonth(), day);
                    self.controlPanel.updateLastSelected(self.selectedDate);

                }
            }
        }

        //draw the current date when we initialize
        //Can later take in an XDate as a parameter and set displayDate equal to it, if needed.
        self.displayDate = self.currentDate.clone();
        self.selectedDate = self.currentDate.clone();
        self.drawDate(self.displayDate, divName);        
    }
    return Calendar;
}());

var calendar1 = new Calendar("calendarDiv");

var controlPanel1 = new ControlPanel(calendar1, "controlPanel1");
calendar1.controlPanel = controlPanel1;