$(document).on('click', '#extra-note-tab-btn', function(event){
    event.preventDefault();
    $("#class-table").hide();
    $("#delete-class-table").hide();
    $("#exam-note-table").hide();
    $("#assignment-note-table").hide();

    $(document.body).on('click', '#btn-add-exam', function(event){
        event.preventDefault();
        let subject = $("#add-exam-subject").val();
        let number = $("#add-exam-number").val();
        let date = $("#add-exam-date").val();
        let time = $("#add-exam-time").val();
        let profileButton = document.getElementById("profile-btn");
        let currentText = profileButton.innerHTML;
        let student = currentText.replace("Hello, ", ""); 
        $.ajax({
            url: '/exam/'+subject+'.'+number+'.'+student+'.'+date+'.'+time,
            type: 'POST',
            contentType: 'application/json',
            success: function(response){
                $('#extra-note-response-container').text(response);
                setTimeout(function() {
                    $('#extra-note-response-container').text('');
                }, 3000);
                
                console.log("Successfully added exam to database.");
            },
            error: function(xhr, status, error){
                // Handle error response
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    $(document.body).on('click', '#btn-add-assignment', function(event){
        event.preventDefault();
        let subject = $("#add-assignment-subject").val();
        let number = $("#add-assignment-number").val();
        let date = $("#add-assignment-date").val();
        let time = $("#add-assignment-time").val();
        let profileButton = document.getElementById("profile-btn");
        let currentText = profileButton.innerHTML;
        let student = currentText.replace("Hello, ", "");
        $.ajax({
            url: '/assignment/'+subject+'.'+number+'.'+student+'.'+date+'.'+time,
            type: 'POST',
            contentType: 'application/json',
            success: function(response){
                $('#extra-note-response-container').text(response);
                setTimeout(function() {
                    $('#extra-note-response-container').text('');
                }, 3000);
                console.log("Successfully added assignment to database.");
            },
            error: function(xhr, status, error){
                // Handle error response
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    $(document.body).on('click', '#btn-view-exams', function(event){
        event.preventDefault();
        let profileButton = document.getElementById("profile-btn");
        let currentText = profileButton.innerHTML;
        let student = currentText.replace("Hello, ", "");
        $.ajax({
            url: '/exam/'+student,
            type: 'GET',
            contentType: 'application/json',
            success: function(response){
                $("#assignment-note-table").hide();
                $("#exam-note-table").show();
                $("#exam-note-table thead").show();
                let tableBody = $('#exam-note-table tbody');
                tableBody.empty();
                for(let i=0; i<response.length; i++) {
                    let noteInfo = response[i];
                    let row = $('<tr>');
                    row.append($('<td>').text(noteInfo.type));
                    row.append($('<td>').text(noteInfo.subject));
                    row.append($('<td>').text(noteInfo.number));
                    row.append($('<td>').text(noteInfo.date));
                    row.append($('<td>').text(noteInfo.time));

                    let deleteButton = $('<td>');
                    let deleteButtonElement = $('<button>').text('Delete').attr('class', 'btn-delete-exam');
                    deleteButton.append(deleteButtonElement);
                    row.append(deleteButton);

                    tableBody.append(row);
                }
                $(".btn-delete-exam").click(function(){
                    let row = $(this).closest('tr');
                    let subject = row.find('td:eq(1)').text();
                    let number = row.find('td:eq(2)').text();

                    let data = {
                        subject: subject,
                        number: number,
                        student: student
                    };
                    $.ajax({
                        url: '/exam/'+subject+'.'+number+'.'+student,
                        type: 'DELETE',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        success: function(response){
                            // Handle success response
                            console.log("Successfully deleted note from database.");
                            $('#extra-note-response-container').text(response);
                            setTimeout(function() {
                                $('#extra-note-response-container').text('');
                            }, 3000);
                            row.remove();
                        },
                        error: function(xhr, status, error){
                            // Handle error response
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


    $(document.body).on('click', '#btn-view-assignments', function(event){
        event.preventDefault();
        let profileButton = document.getElementById("profile-btn");
        let currentText = profileButton.innerHTML;
        let student = currentText.replace("Hello, ", "");
        $.ajax({
            url: '/assignment/'+student,
            type: 'GET',
            contentType: 'application/json',
            success: function(response){
                $("#exam-note-table").hide();
                $("#assignment-note-table").show();
                $("#assignment-note-table thead").show();
                let tableBody = $('#assignment-note-table tbody');
                tableBody.empty();
                for(let i=0; i<response.length; i++) {
                    let noteInfo = response[i];
                    let row = $('<tr>');
                    row.append($('<td>').text(noteInfo.type));
                    row.append($('<td>').text(noteInfo.subject));
                    row.append($('<td>').text(noteInfo.number));
                    row.append($('<td>').text(noteInfo.date));
                    row.append($('<td>').text(noteInfo.time));

                    let deleteButton = $('<td>');
                    let deleteButtonElement = $('<button>').text('Delete').attr('class', 'btn-delete-assignment');
                    deleteButton.append(deleteButtonElement);
                    row.append(deleteButton);

                    tableBody.append(row);
                }
                $(".btn-delete-assignment").click(function(){
                    let row = $(this).closest('tr');
                    let subject = row.find('td:eq(1)').text();
                    let number = row.find('td:eq(2)').text();

                    let data = {
                        subject: subject,
                        number: number,
                        student: student
                    };
                    
                    $.ajax({
                        url: '/assignment/'+subject+'.'+number+'.'+student,
                        type: 'DELETE',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        success: function(response){
                            // Handle success response
                            console.log("Successfully deleted note from database.");
                            $('#extra-note-response-container').text(response);
                            setTimeout(function() {
                                $('#extra-note-response-container').text('');
                            }, 3000);
                            row.remove();
                            row.remove();
                        },
                        error: function(xhr, status, error){
                            // Handle error response
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
});