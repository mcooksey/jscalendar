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
                + '<p class="controlPanelHeader">SELECTED DATE</p>'
                + '<p class="controlPanelText" id="selectedDate">' + self.calendarControl.selectedDate.toString("MMMM dd, yyyy") + '</p>'
                + '<p class="controlPanelHeader">DATE PROPERTIES</p>'
                + '<ul class="checkboxList">'
                + '<li><input type="checkbox" id="flaggedCheckbox"/>Flagged</li>'
                + '<li><input type="checkbox" id="disabledCheckbox"/>Disabled</li>'
                + '</ul>'
                +'<p class="controlPanelHeader">CALENDAR NAVIGATION</p>'
                + '<div>'
                + '<button id="'+ self.controlPanelDivName +'_back" class="button controlPanelButton">Previous Month</button>'
                + '<button id="' + self.controlPanelDivName + '_today" class="button controlPanelButton">Today</button>'
                + '<button id="' + self.controlPanelDivName + '_next" class="button controlPanelButton">Next Month</button>'
                + '</div>'
                + '<div class="controlPanelDiv">'
                + '<input type="text" id="' + self.controlPanelDivName + '_dateField" placeholder="Enter a date (MM/dd/yyyy)" class="controlPanelText" />'
                + '<button id="' + self.controlPanelDivName + '_goToDateButton" class="button controlPanelButton nextButton">Go to Date</button>'
                + '</div>');
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
        self.drawControlPanel();
    }
    return ControlPanel;
}());