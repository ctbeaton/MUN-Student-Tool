$(document).on('click', '#view-schedule-tab-btn', function(event){
    event.preventDefault();
    $("#class-table").hide();
    $("#delete-class-table").hide();
    $("#exam-note-table").hide();
    $("#assignment-note-table").hide();

    let profileButton = document.getElementById('profile-btn');
    let currentText = profileButton.innerHTML;
    let username = currentText.replace('Hello, ','');

    $.ajax({
        url: '/gettitle/'+username,
        type: 'GET',
        contentType: 'application/json',
        success: function(response){    
            document.getElementById('title').value = response;
            document.getElementById('title').style.textAlign = 'center';
            $(document).on('click', '#update-title', function(event){
                let title = document.getElementById('title').value;
                console.log(title);
                $.ajax({
                    url: '/settitle/'+username +'.'+ title,
                    type: 'GET',
                    contentType: 'application/json',
                    success: function(response){    
                        document.getElementById('title').value = title;
                        document.getElementById('title').style.textAlign = 'center';
                    },   
                    error: function(xhr, status, error){
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        alert('Error - ' + errorMessage);
                    }
                });  
            });
        },   
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });
});