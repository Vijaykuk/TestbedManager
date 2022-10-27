function openTestPingSshModal(){
    $('#deviceModal').modal('hide');
    $('#testPingSshModal').modal({
      backdrop: 'static',
      keyboard: false
    }).appendTo("body");
}

function alertClose(element){
    element.parentNode.remove();
}

function changeButtons(){
    number_of_checked_boxes = 0;

    ip_addresses = [];

    var checkbox = document.getElementsByClassName('checkbox_checked');

    for (i = 0; i < checkbox.length; i++) { 
        if (checkbox[i].checked) {
            ip_addresses.push(document.getElementsByClassName('name')[i].innerHTML);
            number_of_checked_boxes += 1;
        }
    }

    document.getElementById('devices-to-delete').innerHTML = ""
    for (i = 0; i < ip_addresses.length; i++) { 
        document.getElementById('devices-to-delete').innerHTML += '<li>' + ip_addresses[i] + '</li>';
    }

    if (number_of_checked_boxes == 0){
        document.getElementById('edit-button').disabled = true;
        document.getElementById('delete-button').disabled = true;
    }
    else if (number_of_checked_boxes == 1){
        document.getElementById('edit-button').disabled = false;
        document.getElementById('delete-button').disabled = false;
    }
    else {
        document.getElementById('edit-button').disabled = true;
        document.getElementById('delete-button').disabled = false;
    }
}

function taskChangeButtons(){
    number_of_checked_boxes = 0;

    id = [];

    var checkbox = document.getElementsByClassName('checkbox_checked');

    for (i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            // +1 to disclude header
            id.push(document.getElementsByClassName('task-id')[i + 1].innerHTML);
            number_of_checked_boxes += 1;
        }
    }

    document.getElementById('tasks-to-delete').innerHTML = ""
    document.getElementById('tasks-to-run').innerHTML = ""

    for (i = 0; i < id.length; i++) {
        document.getElementById('tasks-to-delete').innerHTML += '<li>' + id[i] + '</li>';
        document.getElementById('tasks-to-run').innerHTML += '<li>' + id[i] + '</li>';
    }

    if (number_of_checked_boxes == 0){
        //document.getElementById('edit-button').disabled = true;
        document.getElementById('delete-button').disabled = true;
        document.getElementById('run-button').disabled = true;
    }
    else if (number_of_checked_boxes == 1){
        //document.getElementById('edit-button').disabled = false;
        document.getElementById('delete-button').disabled = false;
        document.getElementById('run-button').disabled = false;
    }
    else {
        //document.getElementById('edit-button').disabled = true;
        document.getElementById('delete-button').disabled = false
        document.getElementById('run-button').disabled = false;    }
}

function deleteTasks(){
    var id = [];

    var ul = document.getElementById('tasks-to-delete');
    var li = ul.getElementsByTagName('li');
    for (var i = 0; i < li.length; i++) {
        id.push(li[i].innerHTML);
    }

    console.log(id)

    $.ajax({
        type: "DELETE",
        url: "/task"+ '?' + $.param({"tasks": JSON.stringify(id)}),
        success: function(msg){
            window.location = "/task";
        }
    });
}

function runTasks(){
    button = document.getElementById('modal-run-button');
    button.innerHTML = '<span class="glyphicon icon-spinner glyphicon-refresh-animate"></span> Running...';
    button.disabled = true;

    var ids = []

    var ul = document.getElementById('tasks-to-run')
    var li = ul.getElementsByTagName('li')
    for (var i = 0; i < li.length; i++) {
        ids.push(li[i].innerHTML);
    }

    $.ajax({
        url: "/task/run/diff"+ '?' + $.param({"tasks": JSON.stringify(id)}),
        type: 'POST',
        success: function(response) {
            setTimeout(() => {
                if(response['result'] == 'success'){
                    window.location = "/task";
                }
                else{
                    window.alert(response['reason']);
                }
            }, 500);
        },
        error: function(error) {
            window.alert(error);
            console.log('error in running diff task')
            console.log(error);
        }
    });
}

function checkAllDevices(){

    document.getElementById('edit-button').disabled = true;
    var checkbox = document.getElementsByClassName('checkbox_checked');

    if (document.getElementById('check-all-devices').checked){

        document.getElementById('delete-button').disabled = false;

        for (i = 0; i < checkbox.length; i++) { 
            checkbox[i].checked = true;
        }

        ip_addresses = [];
        for (i = 0; i < checkbox.length; i++) { 
            if (checkbox[i].checked) {
                ip_addresses.push(document.getElementsByClassName('name')[i].innerHTML);
            }
        }
        document.getElementById('devices-to-delete').innerHTML = ""
        for (i = 0; i < ip_addresses.length; i++) { 
            document.getElementById('devices-to-delete').innerHTML += '<li>' + ip_addresses[i] + '</li>';
        }
    }
    else{

        document.getElementById('delete-button').disabled = true;

        for (i = 0; i < checkbox.length; i++) { 
            checkbox[i].checked = false;
        }
        document.getElementById('devices-to-delete').innerHTML = "";
    }
}

function deleteDevices(){
    $.ajax({
        type: "DELETE",
        url: "/device"+ '?' + $.param({"devices": JSON.stringify(ip_addresses)}),
        success: function(msg){
            window.location = "/device";
        }
    });
}

function editDevice(){

    document.getElementById('device-modal-title').innerHTML = 'Edit';
    document.getElementById('device-modal-alerts').innerHTML = "";


    document.getElementById('cluster-name').disabled = true;
    var idx = 0;

    var checkbox = document.getElementsByClassName('checkbox_checked');
    for (dummy_idx = 0; dummy_idx < checkbox.length; dummy_idx++) { 
        if (checkbox[dummy_idx].checked) {
            idx = dummy_idx;
        }
    }

    if(document.getElementById('hidden-method') != null){
        document.getElementById('hidden-method').remove()
    }
    var node = document.createElement('input');
    node.type = 'hidden';
    node.id = 'hidden-method';
    node.name = '_method';
    node.value = 'PUT';
    document.getElementById('device-form').appendChild(node);

    var ip_address = document.getElementsByClassName('ip-address')[idx].innerHTML;
    var type = document.getElementsByClassName('type')[idx].innerHTML;
    var cluster_name = document.getElementsByClassName('cluster-name')[idx].innerHTML;

    document.getElementById('ip-address').value = ip_address;
    document.getElementById('ip-address').disabled = true;
    document.getElementById('hidden-ip-address').value = ip_address;
    document.getElementById('hidden-cluster-name').value = cluster_name;
    
    var device_type_options = document.getElementById('device-type').options;
    for (dummy_idx = 0; dummy_idx < device_type_options.length; dummy_idx++) { 
        if(device_type_options[dummy_idx].value == type){
            device_type_options[dummy_idx].selected == true;
        }
    }
    document.getElementById('cluster-name').value = cluster_name;
    $('#deviceModal').appendTo('body')

}

function addDevice(){
    if (document.getElementById('hidden-method') !=null) {
        document.getElementById('hidden-method').remove();
    }


    document.getElementById('device-modal-title').innerHTML = 'Add';
    document.getElementById('ip-address').value = "";
    document.getElementById('ip-address').disabled = false;
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('confirm_password').value = "";
    var device_type_options = document.getElementById('device-type').options;
    for (dummy_idx = 0; dummy_idx < device_type_options.length; dummy_idx++) { 
        device_type_options[dummy_idx].selected == false;
    }
    document.getElementById('cluster-name').value = "";
    document.getElementById('cluster-name').disabled = false;


    document.getElementById('device-modal-alerts').innerHTML = "";

    $('#deviceModal').appendTo('body')

}

function get_devices(filter){
    if(filter){
        url = "/api/device?filterQuery=" + filter;
    }
    else{
        url = "/api/device";
    }

    if(document.getElementById('check-all-devices').checked){
        document.getElementById('check-all-devices').checked = false;
        checkAllDevices();
    }
    ios_status = check_ios_status();

    $.ajax({
        type: "GET",
        url: url,
        success: function(data){
            parent = data['tree']

            devices = data['devices']
            table_body = document.getElementById('table-body-devices');
            table_body.innerHTML = '';

            for (var i = 0; i <= devices.length - 1; i++) {

                tr = document.createElement('tr');

                td_label = document.createElement('td');
                label = document.createElement('label');
                label.classList.add('checkbox');
                input = document.createElement('input');
                input.classList.add('checkbox_checked');
                input.type = 'checkbox';
                input.onclick = function(){changeButtons()};
                span = document.createElement('span');
                span.classList.add('checkbox__input');
                label.appendChild(input);
                label.appendChild(span)
                td_label.appendChild(label);

                td_name = document.createElement('td');
                td_name.classList.add('name');
                td_name.innerHTML = devices[i]['name'];
                td_name.style.fontWeight = 'bold';
                if(devices[i]['ping_result'] == 'success'){
                    td_name.style.color = '#6cc04a';
                }
                else if(devices[i]['ping_result'] == 'failure'){
                    td_name.style.color = '#cf2030';
                }

                td_ip_address = document.createElement('td');
                td_ip_address.classList.add('ip-address');
                td_ip_address.innerHTML = devices[i]['ipaddr'];

                td_device_type = document.createElement('td');
                td_device_type.classList.add('type');
                td_device_type.innerHTML = devices[i]['type'];

                td_cluster_name = document.createElement('td');
                td_cluster_name.classList.add('cluster-name');
                td_cluster_name.innerHTML = devices[i]['cluster_name'];

                td_description = document.createElement('td');
                td_description.classList.add('description');
                td_description.innerHTML = devices[i]['description'];

                td_last_update = document.createElement('td');
                td_last_update.classList.add('last-update');
                td_last_update.innerHTML = devices[i]['updated_on'];

                if (devices[i]['type'] == 'ios'){
                    if (ios_status[devices[i]['ipaddr']] == 'UNREACHABLE'){
                    td_name.style.color = '#8B0000';
                    }
                    else {
                    td_name.style.color = '#6cc04a';
                    }
                }

                tr.appendChild(td_label);
                tr.appendChild(td_name);
                tr.appendChild(td_ip_address);
                tr.appendChild(td_device_type);
                tr.appendChild(td_cluster_name);
                tr.appendChild(td_description);
                tr.appendChild(td_last_update);

                table_body.appendChild(tr);
            }

            if ($('#treeview7').html() == "") {
                var defaultData = parent;

                $('#treeview7').treeview({
                  color: "#428bca",
                  showBorder: false,
                  data: defaultData,
                  enableLinks: true
                });  
            }
        }
    });
}

function addTask(){
}

function addSftp(){
    //<div class="help-block text-danger">
    //  <span class="icon-error"></span>
    //  <span>Special characters not allowed</span>
    //</div>
    var buttonTmp = document.getElementById('modal-add-sftp').cloneNode(true);

    button = document.getElementById('modal-add-sftp');
    button.innerHTML = '<span class="glyphicon icon-spinner glyphicon-refresh-animate"></span> Saving...';
    button.disabled = true;

    $.ajax({
        url: '/task/sftp',
        data: $('#sftp-form').serialize(),
        type: 'POST',
        success: function(response) {
            window.location.href = "/task";
        },
        error: function(error) {
            console.log(error);
            error = JSON.parse(error.responseText)['error'];

            input_invalid = document.getElementsByClassName('input--invalid');
            for (var i = 0; i < input_invalid.length; i++) {
                input_invalid[i].classList.remove('input--invalid');
            }

            input_dirty = document.getElementsByClassName('input--dirty');
            for (var i = 0; i < input_invalid.length; i++) {
                input_invalid[i].classList.remove('input--dirty');
            }

            help_block = document.getElementsByClassName('help-block');
            num = help_block.length;
            for (var i = 0; i < num; i++) {
                help_block[num - i - 1].remove();
            }

            for(var propt in error){
                document.getElementById(propt).classList.add('input--invalid');
                document.getElementById(propt).classList.add('input--dirty');

                div = document.createElement('div');
                div.classList.add('help-block');
                div.classList.add('text-danger');

                span1 = document.createElement('span');
                span1.classList.add('icon-error');

                span2 = document.createElement('span');
                span2.innerHTML = error[propt];

                div.appendChild(span1);
                div.appendChild(span2);

                element = document.getElementById(propt + '_form_group');
                element.appendChild(div);
            }
        document.getElementById('modal-add-sftp').innerHTML = buttonTmp.innerHTML;
        button.disabled = false;
        }
    });
}

function addTaskNextForm(form){

    //<input type="hidden" id="hidden-cluster-name" name="cluster_name" value="">

    if(form == 'step1'){
        var deviceType = document.getElementById('device-type').value;
        var step2 = document.getElementById('step2');

        var step3 = document.getElementById('step-3-form');
        var url = "/api/device?filterQuery=" + deviceType;

        var cluster = []


        $.ajax({
            type: "GET",
            url: url,
            success: function(data){

                var cucmClusterElem = document.getElementById('cucm-cluster');
                if (cucmClusterElem){
                    cucmClusterElem.remove();
                }

                var select = document.createElement('select')
                select.classList.add('form-control');
                select.id = 'cucm-cluster';
                select.name = 'cucm-cluster';

                option = document.createElement('option');
                select.appendChild(option);

                option = document.createElement('option');
                option.value = 'custom';
                option.innerHTML = 'custom';
                option.disabled = true;
                select.appendChild(option);

                device = data['devices'];
                for (var i = 0; i < device.length; i++) {
                    if (cluster.indexOf(device[i]['cluster_name']) === -1) {
                        cluster.push(device[i]['cluster_name']);

                        option = document.createElement('option');
                        option.value = device[i]['cluster_name'];
                        option.innerHTML = device[i]['cluster_name'];
                        select.appendChild(option);
                    }
                }
                step3.append(select);
            }
        });
    }
}

function displayTaskRunDateForm(param){
    console.log(param);
    if(param.value == "now"){
        document.getElementById('task-date-form').hidden = true;
        document.getElementById('task-time-form').hidden = true;
    }
    else{
        document.getElementById('task-date-form').hidden = false;
        document.getElementById('task-time-form').hidden = false;
    }
}

function check_ios_status(){
    var ios_status = {}
    $.ajax({
            url: '/api/ios/devices',
            type: 'GET',
            //data: JSON.stringify(jsonData, null, '\t'),
            contentType: "application/json",
            success: function(data) {
                device = data['devices'];
                for (var i = 0; i < device.length; i++){
                    ios_status[device[i]['ip']] = device[i]['status'];
                }
            }
        });
    return ios_status;
}
