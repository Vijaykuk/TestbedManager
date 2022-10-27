//enable datatables
  $(document).ready(function() {
    var eTable = $('#deviceList').DataTable({
    "lengthMenu": [[10, 30, 100, -1], [10, 30, 100, "All"]]});
   $('div.dataTables_filter input').focus();
  } );

//This is for the cron picker
  $(document).ready(function() {
	$('#scheduler').cron({
            	onChange: function() {
        			cron = $(this).cron("value");
    			}
            });
    //Lets hide some stuff - this is the cron scheduler
    $('#scheduler').hide();
    $('#relativeSelectors').hide();

    //initialize the datetime pickers for absolute time log gathering.
    $('#start_date').datetimepicker({
                format: "MM/YY/DD hh:mm A"
            });
    $('#end_date').datetimepicker({
                format: "MM/YY/DD hh:mm A"
            });

  });

//if edit device button is pressed
function editDevice(){
    //if a device is selected populate the fields to edit.
    var radios = document.getElementsByName("device");
    var devID = "";
    for(var i=0;i<radios.length;i++) {
        if (radios[i].checked) {
            devID = String(i+1);
           }
    }
    document.getElementById("CUCM_Name").value = document.getElementById(devID).cells[1].innerHTML;
    document.getElementById("CUCM_IP").value = document.getElementById(devID).cells[2].innerHTML;
    document.getElementById("CUCM_login").value = document.getElementById(devID).cells[3].innerHTML;
    document.getElementById("CUCM_password").value = document.getElementById(devID).cells[4].firstChild.value;
    document.getElementById("ESIPaddr").value = document.getElementById(devID).cells[1].innerHTML;
    document.getElementById("ESPort").value = document.getElementById(devID).cells[1    ].innerHTML;
}

//if new device, clear the fields
function clearFields(){
    document.getElementById("CUCM_Name").value = "";
    document.getElementById("CUCM_IP").value = "";
    document.getElementById("CUCM_login").value = "";
    document.getElementById("CUCM_password").value = "";
    document.getElementById("ESIPaddr").value = "";
    document.getElementById("ESPort").value = "";
}

//make the cron schedular appear and disapear.
function showCron(){
    $('#scheduler').show();
    $('#timeSelectors').hide();

}

//make the time ranges show and the cron disappear
function showTimeOptions(){
    $('#scheduler').hide();
    $('#timeSelectors').show();
}

//make the relative section disappear
function showAbsolute(){
    $('#relativeSelectors').hide();
    $('#date_absolute_form').show();
}

//make the absolute time range section disappear
function showRelative(){
    $('#date_absolute_form').hide();
    $('#relativeSelectors').show();
}

//adding in accordion toggle (as seen in CUCM services options)
function toggleAccordion(param){
        $id = param.hash.substr(1);
        if(param.className){
            console.log("collapsed");
            console.log(document.getElementById($id + "_glyphicon").className);
            document.getElementById($id + "_glyphicon").className = "glyphicon  icon-chevron-down";
        }
        else{
            console.log("not collapsed");
            document.getElementById($id + "_glyphicon").className = "glyphicon  icon-chevron-right";
        };
    }
//Write function to disable dopdowns for single device or cluster selection
function toggleDeviceAvailability(button){
    if (button.value == "single") {
        document.getElementById('cluster').disabled= true;
        document.getElementById('dev').disabled= false;
    } else {
        document.getElementById('dev').disabled= true;
        document.getElementById('cluster').disabled= false;
    }
}

// function to turn on/off sdl logging globally
// TODO: need to make proper success function 
function sdl(){
    if (document.getElementsByName('sdl_switch')[0].checked){
        console.log('sdl: the configuration is turned on. will turn off')
        $.ajax({
            url: '/assist/sdl',
            type: 'DELETE',
            success: function(data, status) {
              alert("Data: " + data + "\nStatus: " + status);
            }
        });
    }
    else {
        console.log('sdl: the configuration is turned off. will turn on')
        $.ajax({
            url: '/assist/sdl',
            type: 'POST',
            success: function(data, status) {
              alert("Data: " + data + "\nStatus: " + status);
            }
        });
    }
}