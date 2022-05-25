

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
        timePicker: timePicker,
        timePicker24Hour: true,
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
            format: 'DD/MM/YYYY' // hh:mm a'
        }
    };

$("#datepicker").daterangepicker(
    pickerOptions ,
    function(start, end, label) {
        const obj = { dateStart: start.format('DD/MM/YYYY'), timeStart: start.format('hh:mm '), dateEnd: end.format('DD/MM/YYYY'), label: label };
        FileMaker.PerformScript("Get Data", JSON.stringify(obj) )
    }
);



};



window.setDateRange = (json) => {
    const obj = JSON.parse(json);
    const {startDate, endDate} = obj;
    console.log (startDate);
    $('#daterange').data('daterangepicker').setStartDate(startDate);

};

