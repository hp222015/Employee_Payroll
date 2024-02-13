$('#s1').click(function (){
    f2();
});
    function f2() 
    {        
        let name = $('#Name').val();
        let sprof = $("input[name='prof']:checked").val();
        let gender = $('#Male').is(':checked');
        let dept1 = $('#dept1').is(':checked');
        let dept2 = $('#dept2').is(':checked');
        let dept3 = $('#dept3').is(':checked');
        let dept4 = $('#dept4').is(':checked');
        let dept5 = $('#dept5').is(':checked');

        let dept = [];

        if (dept1)
            dept.push("HR");
        if (dept2)
            dept.push("Sales");
        if (dept3)
            dept.push("Finance");
        if (dept4)
            dept.push("Engineer");
        if (dept5)
            dept.push("Others");

        let salary = $('#sal').val();
        let start_date = $('#startDate').val();
        let notes = $('#notes').val();

        const employee = {
            Name: name,
            Profile: sprof,
            Gender: (gender ? "Male" : "Female"),
            Department: dept,
            Salary: salary,
            Start_Date: start_date,
            Notes: notes
        }
        const jsonData = JSON.stringify(employee);

        // Both post and put together

        $(document).ready(function () {
            
            var urlParams = new URLSearchParams(window.location.search);
            var editId = urlParams.get("id");
            console.log(editId);
        
        var method = editId ? 'PUT' : 'POST';
        var url = editId ? "http://localhost:3000/data/" + editId : "http://localhost:3000/data";

        $.ajax({
            url: url,
            method: method,
            data: jsonData,
            contentType: "application/json",
            success: function (data)
            {
                console.log("Success:", data);
                // Redirect back to the dashboard or show a success message
                window.location.href = "dashboard.html";
            },
            error: function (xhr, status, error)
            {
                console.error("Error submitting data:", status, error);
                console.log("Server response:", xhr.responseText);
             }
            });
        });
    }
    // for getting posted rows in dashboard
$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:3000/data',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data.forEach(function (employee) {
                var newRow = "<tr><td><img src='" + employee.Profile + "'>" + employee.Name + "</td><td>"
                    + employee.Gender + "</td><td>" + employee.Department
                    + "</td><td>" + employee.Salary + "</td><td>" +
                    employee.Start_Date +
                    "</td><td> <img class='update-icon' src='../assets/icons/update.svg' alt='Update' data-id='"
                    + employee.id + "'><img class='delete-icon' src='../assets/icons/delete.svg' alt='Delete' data-id='"
                    + employee.id + "'></td></tr>";
                $('#employee-table').append(newRow);
            });
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });

    // for update

    $('#employee-table').on('click', '.update-icon', function() {
        var employeeId = $(this).data('id'); 
        console.log(employeeId);        
        window.location.href = 'index.html?id=' + employeeId;
     });


    // delete
    $('#employee-table').on('click', '.delete-icon', function () {
        var employeeId = $(this).data('id');
        var $row = $(this).closest('tr');

        $.ajax({
            url: 'http://localhost:3000/data/' + employeeId,
            type: 'DELETE',
            success: function (response) {
                console.log('Item deleted successfully:', response);
                $row.remove();
            },
            error: function (xhr, status, error) {
                console.error('Error deleting item:', xhr.responseText);
            }
        });
    });
});

