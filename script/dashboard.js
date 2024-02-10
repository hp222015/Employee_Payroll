$(document).ready(function(){
      $.ajax({
          url: 'http://localhost:3000/data',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
              data.forEach(function(employee) {                
                  var newRow = "<tr><td><img src='" +employee.Profile + "'>"  + employee.Name + "</td><td>" 
                  + employee.Gender + "</td><td>" + employee.Department 
                  + "</td><td>" + employee.Salary + "</td><td>" + 
                  employee.Start_Date +
                   "</td><td> <img class='update-icon' src='../assets/icons/create-black-18dp.svg' alt='Update' data-id='"
                    + employee.id + "'><img class='delete-icon' src='../assets/icons/delete-black-18dp.svg' alt='Delete' data-id='" 
                    + employee.id + "'></td></tr>";
                  $('#employee-table').append(newRow);
              });
          },
          error: function(xhr, status, error) {
              console.error(xhr.responseText);
          }
      });
  
      // Event listener for update icon
      $('#employee-table').on('click', '.update-icon', function() {
          var employeeId = $(this).data('id');
          window.location.href = 'index.html?id=' + employeeId;
      });
  
      // Event listener for delete icon
      $('#employee-table').on('click', '.delete-icon', function() {
          var employeeId = $(this).data('id');
          var $row = $(this).closest('tr'); // Store reference to the row
  
          $.ajax({
              url: 'http://localhost:3000/data/' + employeeId,
              type: 'DELETE',
              success: function(response) {
                  console.log('Item deleted successfully:', response);
                  // Remove the row from the table upon successful deletion
                  $row.remove();
              },
              error: function(xhr, status, error) {
                  console.error('Error deleting item:', xhr.responseText);
              }
          });
      });
  });
  