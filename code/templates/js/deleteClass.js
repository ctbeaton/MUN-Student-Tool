
$(document).on('click', '#delete-class-tab-btn', function(event){
    event.preventDefault();
    $("#class-table").hide();
    $("#delete-class-table").show();
    $("#delete-class-table thead").show();
    $("#exam-note-table").hide();
    $("#assignment-note-table").hide();
    $.ajax({
        url: '/student',
        type: 'GET',
        contentType: 'application/json',
        success: function(response){
            let tableBody = $('#delete-class-table tbody');
            tableBody.empty();
            let profileButton = document.getElementById("profile-btn");
            let currentText = profileButton.innerHTML;
            let student = currentText.replace("Hello, ", "");
            for(let i=0; i<response.length; i++) {
                let classInfo = response[i];
                if (classInfo.student == student) {
                    let row = $('<tr>');
                    row.append($('<td>').text(classInfo.subject));
                    row.append($('<td>').text(classInfo.number));
                    row.append($('<td>').text(classInfo.name));
                    row.append($('<td>').text(classInfo.section));
                    row.append($('<td>').text(classInfo.days));
                    row.append($('<td>').text(classInfo.start));
                    row.append($('<td>').text(classInfo.end));

                    let deleteButton = $('<td>');
                    let deleteButtonElement = $('<button>').text('Delete').attr('class', 'btn-delete-class');
                    deleteButton.append(deleteButtonElement);
                    row.append(deleteButton);

                    tableBody.append(row);
                }
            }

            $(".btn-delete-class").click(function(){
                // Get the selected class information
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
                    student: student
                };
                $.ajax({
                    url: '/specific/'+subject+'.'+number+'.'+student,
                    type: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function(response){
                        // Handle success response
                        console.log("Successfully deleted course from student's schedule.");
                        row.remove();


                        // Find course, get day and time data, then delete it
                        // from the schedule table
                        $.ajax({
                            url: '/specificcourses/'+subject+'.'+number+'.'+section,
                            type: 'GET',
                            contentType: 'application/json',
                            data: JSON.stringify(data),
                            success: function(response){
                                let course = response[0];
                                let days = course.days.split(' ');
                                days = days.filter(day => day != '');
                                for (var j = 0; j < days.length; j++) {
                                    let day = days[j]
                                    let dayIndex = getDayIndex(day);
                                    if (dayIndex != -1) {
                                        let subject = course.subject;
                                        let number = course.number;
                                        let start = course.start;
                                        let end = course.end;
                                        let courseName = subject + " " + number;
            
                                        let i = start;
                                        $('#'+dayIndex+'_'+i).text('');

                                        while (parseInt(i) <= parseInt(end)) {
                                            let hours = Math.floor(i / 100); 
                                            let minutes = i % 100; 
                                            
                                            minutes += 30; 
                                            
                                            if (minutes >= 60) {
                                                hours += 1;
                                                minutes -= 60;
                                            }
                                            
                                            if (hours >= 24) {
                                                hours -= 24;
                                            }
                                            
                                            let hoursString = hours.toString().padStart(2, '0'); 
                                            let minutesString = minutes.toString().padStart(2, '0'); 
                                            
                                            let updatedI = hoursString + minutesString;
                                            i = parseInt(updatedI);
                                            if (parseInt(i) >= parseInt(end)) {
                                                $('#'+dayIndex+'_'+updatedI).text('');
                                            }
                                            else {
                                                $('#'+dayIndex+'_'+updatedI).text('');
                                            }

                                        }
                                    }
                                }      
                                

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


function getDayIndex(day) {
    switch(day) {
        case 'M':
            return 'mon';
        case 'T':
            return 'tue';
        case 'W':
            return 'wed';
        case 'R':
            return 'thu';
        case 'F':
            return 'fri';
        default:
            return -1;
    }
}