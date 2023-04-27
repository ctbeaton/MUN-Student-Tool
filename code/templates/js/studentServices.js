$(document).on('click', '#student-services-tab-btn', function(event){
    event.preventDefault();
    $("#class-table").hide();
    $("#delete-class-table").hide();
    $("#exam-note-table").hide();
    $("#assignment-note-table").hide();
});