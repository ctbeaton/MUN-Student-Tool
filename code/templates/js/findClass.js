$(document).on('click', '#add-class-tab-btn', function(event){
    event.preventDefault();
    $("#class-table").show();
    $("#delete-class-table").hide();
    $("#exam-note-table").hide();
    $("#assignment-note-table").hide();

    $(document).on('click', '#btn-find-class', function(event){
        event.preventDefault();
        let class_subject = $("#find-subject-search").val();
        let class_number = $("#find-number-search").val();
        $.ajax({
            url: '/courses/'+class_subject+'.'+class_number,
            type: 'GET',
            contentType: 'application/json',
            success: function(response){
                //$("#find-class-out").text(response);  
                $("#class-table").show();
                $("#class-table thead").show();
                let tableBody = $('#class-table tbody');
                tableBody.empty();
                for(let i=0; i<response.length; i++) {
                    let classInfo = response[i];
                    let row = $('<tr>');
                    row.append($('<td>').text(classInfo.subject));
                    row.append($('<td>').text(classInfo.number));
                    row.append($('<td>').text(classInfo.name));
                    row.append($('<td>').text(classInfo.section));
                    row.append($('<td>').text(classInfo.days));
                    row.append($('<td>').text(classInfo.start));
                    row.append($('<td>').text(classInfo.end));

                    let addButton = $('<td>');
                    let addButtonElement = $('<button>').text('Add').attr('class', 'btn-add-class');
                    addButton.append(addButtonElement);
                    row.append(addButton);

                    tableBody.append(row);
                }

                $(".btn-add-class").click(function(){
                    let row = $(this).closest('tr');
                    let subject = row.find('td:eq(0)').text();
                    let number = row.find('td:eq(1)').text();
                    let section = row.find('td:eq(3)').text();
                    let profileButton = document.getElementById("profile-btn");
                    let currentText = profileButton.innerHTML;
                    let student = currentText.replace("Hello, ", "");
                    let data = {
                        subject: subject,
                        number: number,
                        section: section
                    };
                    $.ajax({
                        url: '/student/'+subject+'.'+number+'.'+section+'.'+student,
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        success: function(response){
                            // Handle success response
                            console.log("Successfully added course to student's schedule.");
                            let responseTD = $('<td>').text(response).attr('class', 'response-td');
                            row.append(responseTD);
                            setTimeout(function() {
                                responseTD.remove();
                            }, 3000);
                            $.ajax({
                                url: '/student/'+subject+'.'+number+'.'+student,
                                type: 'PUT',
                                contentType: 'application/json',
                                data: JSON.stringify(data),
                                success: function(response){
                                    // Handle success response
                                    console.log("Successfully added name to course.");
                                },
                                error: function(xhr, status, error){
                                    // Handle error response
                                    var errorMessage = xhr.status + ': ' + xhr.statusText
                                    alert('Error - ' + errorMessage);
                                }
                            });
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