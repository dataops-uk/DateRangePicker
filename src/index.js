window.setupPicker = (json) => {
    const obj = JSON.parse(json);
    const {startDate, endDate, singlePicker, showCalendar, timePicker} = obj;
    const pickerOptions = {
                startDate: startDate,
        endDate: endDate,
        minYear: 2010,
        maxYear: parseInt(moment().format('YYYY'),10),
        showWeekNumbers: true,
        showDropdowns: false,
        singleDatePicker: singlePicker,
        // timePicker: timePicker,
        // timePicker24Hour: true,
        alwaysShowCalendars: showCalendar,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 10 Days': [moment().subtract(9, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        locale: {
            applyLabel: 'Submit', // Change the button label from 'Apply'
            cancelLabel: 'Clear', // Change the button label from 'Cancel'
            format: 'DD/MM/YYYY'
        }  

    };


// Capture the response after date(s) picked and applied
$("#datepicker").daterangepicker(
    pickerOptions ,
    function(start, end, label) {
        const obj = { dateStart: start.format('DD/MM/YYYY'), timeStart: start.format('hh:mm '), dateEnd: end.format('DD/MM/YYYY'), label: label };
        FileMaker.PerformScript("Get Data", JSON.stringify(obj) )
    }
);


// Run a script when the Cancel button is pressed
$('#datepicker').on('cancel.daterangepicker', function(ev, picker) {
    FileMaker.PerformScript("Cancel", JSON.stringify(obj) )
});


// Run a script when the picker is closed ousside of the Cancel or Apply buttons, background click
$('#datepicker').on('hide.daterangepicker', function(ev, picker) {
    FileMaker.PerformScript("Close", JSON.stringify(obj) )
});


// added this line to pop open the calendar as soon as the function is run
document.getElementById('datepicker').click();


};