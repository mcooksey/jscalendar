/// <reference path="jquery-2.1.4.min.js" />
/// <reference path="xdate.js" />
/// <reference path="main.js" />

var ControlPanel = (function () {
    function ControlPanel(calendar, controlPanelDivName) {
        var self = this;
        self.controlPanelDivName = controlPanelDivName;
        self.calendarControl = calendar;

        //$('#' + controlPanelDivName).html('<div id="titleDiv" class="titleDiv">Control Panel</div>');
        self.drawControlPanel = function () {
            $('#' + self.controlPanelDivName).html('<div id="titleDiv" class="titleDiv">Control Panel</div>'
                + '<p class="controlPanelHeader">LAST SELECTED DATE</p>'
                + '<p class="controlPanelText" id="' + self.controlPanelDivName + '_selectedDate">' + self.calendarControl.selectedDate.toString("MMMM dd, yyyy") + '</p>'
                + '<p class="controlPanelHeader">SELECTED DATE PROPERTIES</p>'
                + '<ul class="propertyList">'
                + '<li><button id="' + self.controlPanelDivName + '_markedOn" class="button propertyButton">Mark</button></li>'
                + '<li><button id="' + self.controlPanelDivName + '_markedOff" class="button propertyButton">Unmark</button></li>'
                + '<li><button id="' + self.controlPanelDivName + '_unmarkAll" class="button propertyButton">Unmark All</button></li>'
                + '<li><button id="' + self.controlPanelDivName + '_enabled" class="button propertyButton">Enabled</button></li>'
                + '<li><button id="' + self.controlPanelDivName + '_disabled" class="button propertyButton">Disabled</button></li>'
                + '<li><button id="' + self.controlPanelDivName + '_enableAll" class="button propertyButton">Enable All</button></li>'
                + '</ul>'
                +'<p class="controlPanelHeader">CALENDAR NAVIGATION</p>'
                + '<div>'
                + '<button id="'+ self.controlPanelDivName +'_back" class="button controlPanelButton">Previous Month</button>'
                + '<button id="' + self.controlPanelDivName + '_today" class="button controlPanelButton">Today</button>'
                + '<button id="' + self.controlPanelDivName + '_next" class="button controlPanelButton">Next Month</button>'
                + '</div>'
                + '<div class="controlPanelDiv">'
                + '<input type="text" id="' + self.controlPanelDivName + '_dateField" placeholder="Enter a date (MM/dd/yyyy)" class="controlPanelText" />'
                + '<button id="' + self.controlPanelDivName + '_goToDateButton" class="button controlPanelButton nextButton goToDateButton">Go to Date</button>'
                + '</div>');
            $('#' + self.controlPanelDivName + '_markedOn').click(function () {
                self.calendarControl.markSelected();
            });
            $('#' + self.controlPanelDivName + '_disabled').click(function () {
                self.calendarControl.disableSelected();
            });
            $('#' + self.controlPanelDivName + '_markedOff').click(function () {
                self.calendarControl.unmarkSelected();
            });
            $('#' + self.controlPanelDivName + '_enabled').click(function () {
                self.calendarControl.enableSelected();
            });
            $('#' + self.controlPanelDivName + '_unmarkAll').click(function () {
                self.calendarControl.unmarkAll();
            });
            $('#' + self.controlPanelDivName + '_enableAll').click(function () {
                self.calendarControl.enableAll();
            });
            $('#' + self.controlPanelDivName + '_back').click(function () {
                self.calendarControl.backMonth();
            });
            $('#' + self.controlPanelDivName + '_today').click(function () {
                var today = new XDate();
                self.calendarControl.jumpToDate(today);
            });
            $('#' + self.controlPanelDivName + '_next').click(function () {
                self.calendarControl.forwardMonth();
            });
            $('#' + self.controlPanelDivName + '_goToDateButton').click(function () {
                var dateToDisplay = new XDate($('#' + self.controlPanelDivName + '_dateField').val());
                self.calendarControl.jumpToDate(dateToDisplay);
            });
        }
        self.updateLastSelected = function (date) {
            $('#' + self.controlPanelDivName + '_selectedDate').text(date.toString("MMMM dd, yyyy"));
        }
        self.drawControlPanel();
    }
    return ControlPanel;
}());