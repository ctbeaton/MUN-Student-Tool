$(document).on('click', '#course-offerings-tab-btn', function(event){
    event.preventDefault();
    $("#class-table").hide();
    $("#delete-class-table").hide();
    $("#exam-note-table").hide();
    $("#assignment-note-table").hide();

    let profileButton = document.getElementById('profile-btn');
    let currentText = profileButton.innerHTML;
    let username = currentText.replace('Hello, ','');

    $.ajax({
        url: '/selectsessionandsubject',
        type: 'GET',
        contentType: 'application/json',
        success: function(response){    
                },   
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });
});