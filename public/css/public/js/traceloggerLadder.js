var callidentifier = $('#callidentifier')[0].innerText;
var cluster = $('#cluster')[0].innerText;
var jsonData = {};
var hidden_entities = [];
var hidden_messages = [];

jsonData['callidentifier'] = callidentifier;
jsonData['cluster'] = cluster;

$.ajax({
    url: '/api/callsearch/ladder/data',
    type: 'POST',
    dataType: "json",
    data: JSON.stringify(jsonData),
    contentType: "application/json",
    success: function(response) {
        setTimeout(() => {
            new_data = response['data'];

            //getting # of entities/nodes to calculate total width
            json_new_data = JSON.parse(new_data);
            nodes_count = parseInt(json_new_data['entities'].length);

            if (nodes_count > 3)
                x_nodes_calcWidth =  nodes_count * 300;
            else
                x_nodes_calcWidth =  nodes_count * 450;

            document.getElementById('esQueryModalBody').innerHTML = 'GET ' + response['index'] + '/_search<br/>' + JSON.stringify(response['body'], null, 2);
            document.getElementById('ladderDataModalBody').innerHTML = response['data'];
            $("#ladder").empty();

            if (response['data'].length <= 0) { //No Ladder Data received from CI
                document.getElementById('ladder_box').innerHTML = "<center><span style='color:red;font-size:1.2em;'>No Ladder Data Available for this Call</span></center>";
            } else {
                SvgLadderGen.draw('ladder', new_data, x_nodes_calcWidth);
                $("foreignObject").click(function(event) {
                    var message_id = $(event.currentTarget).attr("message_id");
                    if (message_id != null) {
                        getSipMsg(message_id);
                    }
                });
            }
        }, 500);
        var loader = document.getElementsByClassName('loader');
        for (var i = 0; i < loader.length; i++) {
            loader[i].style.display = 'none';
        }
    },
    error: function(error) {
        $('#search-call-form-button').attr("disabled", false);
        console.log('error searching call')
        console.log(error);
        var loader = document.getElementsByClassName('loader');
        for (var i = 0; i < loader.length; i++) {
            loader[i].style.display = 'none';
        }
        document.getElementById('ladder_box').innerHTML = "<center><span style='color:red;font-weight:bold;font-size:1.2em;'>Error Communication with Ladder Builder</span></center>";
    }
});

var test_data= {
    "entities": [
        {
            "displayIpAddresses": [
                "10.30.26.13",
                "10.0.255.90"
            ],
            "name": "",
            "ipAddresses": []
        },
        {
            "name": "",
            "ipAddresses": [
                "10.30.26.13"]
        },
        {
            "name": "",
            "ipAddresses": [
                "10.0.255.90"]
        }
    ],
    "messages": [
        {
            "color": "#58585b",
            "timestamp": "12:52:40",
            "html_bottom": "",
            "line_type": "solid",
            "marker_type": "cross",
            "html_top": "INVITE",
            "id": 0,
            "destination": "10.0.255.90",
            "detail": "",
            "source": "10.30.26.13",
            "message_id":"123412222"
        },
        {
            "color": "#58585b",
            "timestamp": "12:52:40",
            "html_bottom": "BOTTOM",
            "line_type": "solid",
            "marker_type": "cross",
            "html_top": "100 Trying",
            "id": 1,
            "destination": "10.30.26.13",
            "detail": "SOME DETAIL",
            "source": "10.0.255.90",
            "message_id":"12341234"
        },
            {"color": "#58585b", "timestamp": "12:52:40", "html_bottom": "", "line_type": "solid", "marker_type": "cross", "html_top": "CANCEL", "id": 2, "destination": "10.0.255.90", "detail": "", "source": "10.30.26.13", },
            {"color": "#58585b", "timestamp": "12:52:40", "html_bottom": "", "line_type": "solid", "marker_type": "cross", "html_top": "200 Ok", "id": 3, "destination": "10.30.26.13", "detail": "", "source": "10.0.255.90", },
            {"color": "#58585b", "timestamp": "12:52:40", "html_bottom": "", "line_type": "solid", "marker_type": "cross", "html_top": "487 Request Cancelled", "id": 4, "destination": "10.0.255.90", "detail": "", "source": "10.30.26.13", },
            {"color": "#58585b", "timestamp": "12:52:40", "html_bottom": "", "line_type": "solid", "marker_type": "cross", "html_top": "ACK", "id": 5, "destination": "10.0.255.90", "detail": "", "source": "10.30.26.13", }
        ]
};

function getSipMsg(message_id){
    jsonData = {};
    jsonData['message_id'] = message_id;

    $.ajax({
        url: '/api/calllsearch/sip',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(jsonData, null, '\t'),
        contentType: "application/json",
        success: function(response) {
            //console.log(response);
            document.getElementById('sipMsgModalBody').innerHTML = response['data'];
            $('#sipMsgModal').appendTo("body").modal('show');

        },
        error: function(error) {
            console.log(error);
        }
    });
}

function move_ladder_dev(){
    //alert("entered");
    //alert(new_data);

    var dev = this.name;
    var dir = this.id;

    new_data = update_entities_order(new_data,dev,dir)

    document.getElementById('ladderDataModalBody').innerHTML = new_data;

    $("#ladder").empty();

    //getting # of entities/nodes to calculate total width
    json_new_data = JSON.parse(new_data);
    nodes_count = parseInt(json_new_data['entities'].length);

    if (nodes_count > 3)
        x_nodes_calcWidth =  nodes_count * 300;
    else
        x_nodes_calcWidth =  nodes_count * 450;

    SvgLadderGen.draw('ladder', new_data, x_nodes_calcWidth);

    $("foreignObject").click(function(event) {
        var message_id = $(event.currentTarget).attr("message_id");
        if (message_id != null) {
            getSipMsg(message_id);
        }
    });

    var loader = document.getElementsByClassName('loader');
    for (var i = 0; i < loader.length; i++) {
        loader[i].style.display = 'none';
    }

}

Array.prototype.move = function (old_index, new_index) {
    if ( ( new_index >= this.length) || (new_index < 0 ) ) {
        return;
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    // return this; // for testing purposes
};

function update_entities_order(data, dev_ip, dir){

    json_data = JSON.parse(data);

    for(i=0; i < json_data['entities'].length ; i++){
        dict_i = json_data['entities'][i];

        if (dict_i['ipAddresses'] == dev_ip){
            if(dir == "R"){
                json_data['entities'].move(i, i+1);
                data = JSON.stringify(json_data);
                return data;
            } else if (dir == "L") {
                json_data['entities'].move(i, i-1);
                data = JSON.stringify(json_data);
                return data;
            }
        }
    }
}

$(".move-ladder-dev").on("click", move_ladder_dev);

function hide_ladder_dev(){
    //alert("entered");
    //alert(new_data);

    var dev = this.name;
    var action = this.id;

    new_data = update_entities_vis(new_data,dev,action)
    //new_data = update_messages_vis(new_data,dev,action)
    
    //update button text and id
    if (this.id == 0){
        this.innerText = "Show"
        this.id = 1;
        this.style= "background-color:#cfd0d2;margin-left:5px;";

    } else if (this.id == 1){
        this.innerText = "Hide"
        this.id = 0;       
        this.style= "background-color:#cf2030;margin-left:5px;";
    }


    document.getElementById('ladderDataModalBody').innerHTML = new_data;

    $("#ladder").empty();

    //getting # of entities/nodes to calculate total width
    json_new_data = JSON.parse(new_data);
    nodes_count = parseInt(json_new_data['entities'].length);

    if (nodes_count > 3)
        x_nodes_calcWidth =  nodes_count * 300;
    else
        x_nodes_calcWidth =  nodes_count * 450;  

    SvgLadderGen.draw('ladder', new_data, x_nodes_calcWidth);

    $("foreignObject").click(function(event) {
        var message_id = $(event.currentTarget).attr("message_id");
        if (message_id != null) {
            getSipMsg(message_id);
        }
    });

    var loader = document.getElementsByClassName('loader');
    for (var i = 0; i < loader.length; i++) {
        loader[i].style.display = 'none';
    }

}

function update_entities_vis(data, dev_ip, action){
    json_data = JSON.parse(data);
    entities_lst = json_data['entities'];

    if(action == 0){ //hide action
        for(i=0; i < entities_lst.length ; i++){
            
            dict_i = entities_lst[i];

            if (dict_i['ipAddresses'] == dev_ip){
                
                    hidden_entities.push(dict_i) //store it to hidden_entities to be able to show later
                    json_data = update_messages_vis(json_data,dev_ip,action)
                    res = entities_lst.splice(i,1)
                    i--;
            }
        }

        data = JSON.stringify(json_data);
        return data;

    } if (action == 1) { //show action
                    
        for(i=0; i < hidden_entities.length ; i++){
            
            dict_i = hidden_entities[i];

            if (dict_i['ipAddresses'] == dev_ip){
                entities_lst.push(dict_i);
                json_data = update_messages_vis(json_data,dev_ip,action)
                res = hidden_entities.splice(i,1)
                i--;
            }
        }

        data = JSON.stringify(json_data);
        return data;        
    }
}

function update_messages_vis(data, dev_ip, action){
    //json_data = JSON.parse(data);
    messages_lst = json_data['messages'];

    if(action == 0){ //hide action
        for(i=0; i < messages_lst.length ; i++){
            
            dict_i = messages_lst[i];

            if ( (dict_i['source'] == dev_ip) || (dict_i['destination'] == dev_ip)  ){
                
                    hidden_messages.push(dict_i) //store it to hidden_entities to be able to show later
                    res = messages_lst.splice(i,1)
                    i--;
            }
        }

        //data = JSON.stringify(json_data);
        return json_data;

    } if (action == 1) { //show action
                    
        for(i=0; i < hidden_messages.length ; i++){
            
            dict_i = hidden_messages[i];

            if ( (dict_i['source'] == dev_ip) || (dict_i['destination'] == dev_ip) ){
                messages_lst.push(dict_i);
                res = hidden_messages.splice(i,1)
                i--;
            }
        }

        //data = JSON.stringify(json_data);
        return json_data;        
    }
}

$(".hide-ladder-dev").on("click", hide_ladder_dev);

function d3_entity_move_dev(dev, dir){

    new_data = update_entities_order(new_data,dev,dir)

    document.getElementById('ladderDataModalBody').innerHTML = new_data;

    $("#ladder").empty();

    //getting # of entities/nodes to calculate total width
    json_new_data = JSON.parse(new_data);
    nodes_count = parseInt(json_new_data['entities'].length);

    if (nodes_count > 3)
        x_nodes_calcWidth =  nodes_count * 300;
    else
        x_nodes_calcWidth =  nodes_count * 450;

    SvgLadderGen.draw('ladder', new_data, x_nodes_calcWidth);

    $("foreignObject").click(function(event) {
        var message_id = $(event.currentTarget).attr("message_id");
        if (message_id != null) {
            getSipMsg(message_id);
        }
    });

    var loader = document.getElementsByClassName('loader');
    for (var i = 0; i < loader.length; i++) {
        loader[i].style.display = 'none';
    }

}    
