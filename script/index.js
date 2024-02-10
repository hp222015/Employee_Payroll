document.getElementById('cB').addEventListener('click', function() {
  // Redirect to dashboard.html
  window.location.href = './dashboard.html';
});

document.getElementById('s1').addEventListener('click',
function (){
  window.location.href='./dashboard.html';
  let name =$('#Name').val();
  let sprof=$("input[name='prof']:checked").val();
  let gender=$('#Male').is(':checked');
  let dept1=$('#dept1').is(':checked');
  let dept2=$('#dept2').is(':checked');
  let dept3=$('#dept3').is(':checked');
  let dept4=$('#dept4').is(':checked');
  let dept5=$('#dept5').is(':checked');

  let dept=[];
  
  if(dept1)
  dept.push("HR");
  if(dept2)
  dept.push("Sales");
  if(dept3)
  dept.push("Finance");
  if(dept4)
  dept.push("Engineer");
  if(dept5)
  dept.push("Others");
 
 let salary=$('#sal').val();
 let start_date=$('#startDate').val();
 let notes=$('#notes').val();

  const employee ={
    Name: name,
    Profile: sprof,
    Gender: (gender ? "male" : "female"),
    Department:dept,
    Salary: salary,
    Start_Date: start_date,
    Notes: notes
  }
  const jsonData = JSON.stringify(employee);

  $.ajax({
    url: "http://localhost:3000/data",
    method: "POST",
    contentType: "application/json",
    data: jsonData,
    success: function(response) {
        console.log("Server response:", response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
    }
  });
  
  
 
});
