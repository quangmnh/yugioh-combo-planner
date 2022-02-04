// {
//     "decks":[
//    {
//     "name": "abcxyz",
//     "date_created": "30/12/2021",
//     "date_modified": "31/12/2021",
//     "combo_list":[{
//         "combo_name":"xxxxsuckyyydick",
//         "combo_note":"sssssss", 
//         "combo":["16162312133?faceup-atk-field","attack","1561656123?facedown-def-field","|","6511233331?hand","activate"],
//         "result":["16162312133?graveyard", "6511233331?graveyard"]
//         },
//         {
//         "combo_name":"xxxxsuckyyydick",
//         "combo":["16162312133?faceup-atk-field","attack","1561656123?facedown-def-field","|","6511233331?hand","activate"],
//         "result":["16162312133?graveyard", "6511233331?graveyard"]
//         }
//     ]
//     }]
// };

function storeList(name, deckslist){
    localStorage.setItem(name, JSON.stringify(deckslist));
}

function getList(name){
    var retrieveList = localStorage.getItem(name);
    return JSON.parse(retrieveList);
}
// random_card = {};
// function get_card_info(id){
//     myurl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + id;
//     random_card = $.getJSON(myurl, function(data) {
//         // document.getElementsByClassName("test_place")[0].innerHTML=data.data;
//         // cards_list = document.getElementsByClassName('hidden-value')[0];
//         // cards_list.innerHTML = JSON.stringify(data.data[0]);
//     });
//     // cards_list = document.getElementsByClassName('hidden-value')[0];
//     return ;
// }

// async function get_card_info(id) {
//     myurl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + id;
//     // The await keyword saves us from having to write a .then() block.
//     let json = await axios.get(myurl);

//     // The result of the GET request is available in the json variable.
//     // We return it just like in a regular synchronous function.
//     // console.log(json);
//     return json.data.data[0];
// }

function get_card_info(id) {
    myurl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + id;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", myurl, false );
    xmlHttp.send( null );
    // console.log(JSON.parse(xmlHttp.responseText).data[0]);
    return JSON.parse(xmlHttp.responseText).data[0];
}

function addCombo(name, note){
    
    deck_id = getDeckID(); 
    res = getList("deck_list");
    // console.log(res.decks[deck_id].combo_list)
    // console.log("im here");
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    new_combo = {
        "combo_name": name,
        "combo_note": note,
        "combo": [],
        "result":[]
    }

    res.decks[deck_id].date_modified = dateTime;
    res.decks[deck_id].combo_list.push(new_combo);
    storeList("deck_list", res);
    location.reload();
}

function comboShow(){
// <div class="col-7 combos scroll-collumn">
//     <button class="btn btn-success btn-lg" data-toggle="modal" data-target="#newComboListModal">Add a new Combo List</button>
    
//     <div class="combo-wrap" id = "wrap1">
//         <div class="combo-name" id = "combo-name1" contenteditable="true">Combo 1</div>
//         <div class="combo-note" id = "note1" contenteditable="true">I suck ur dick, u surrender, good deal?</div>                    
//         <div class="row combo-row" data-combo-number = "1" id = "combo1" ondrop="drop(event)" ondragover="allowDrop(event)">
//         </div>
//     </div>

// </div>  
    deck_id = getDeckID();    
    res = getList("deck_list");
    console.log(res);
    i = res.decks[deck_id].combo_list.length-1;
    res.decks[deck_id].combo_list.forEach(element=>{
        combo_wrap = document.createElement('div');
        combo_wrap.setAttribute("class", "combo-wrap");
        combo_wrap.setAttribute("id", "wrap"+i);
        
        combo_name = document.createElement('div');
        combo_name.setAttribute("class", "combo-name");
        combo_name.setAttribute("id", "combo-name"+i);
        combo_name.setAttribute("contenteditable", "true");
        combo_name.innerHTML = res.decks[deck_id].combo_list[i].combo_name;

        // combo_note = document.createElement('div');
        // combo_note.setAttribute("class", "combo-note");
        // combo_note.setAttribute("id", "note"+i);
        // combo_note.setAttribute("contenteditable", "true");
        // combo_note.hidden = true;
        // combo_note.innerHTML = res.decks[deck_id].combo_list[i].combo_note;

        col_10 = document.createElement('div');
        col_10.setAttribute("class", "col-11");
        col_2 = document.createElement('div');
        col_2.setAttribute("class", "col-1");

        combo_del = document.createElement('button');
        combo_del.setAttribute("class", "btn btn-danger btn-sm float-left combo-delete");
        combo_del.setAttribute("value", i);
        combo_del.setAttribute("onclick", "deleteCombo(this.getAttribute('value'))");
        combo_del_i = document.createElement('i');
        combo_del_i.setAttribute("class", "fa fa-trash");
        combo_del.appendChild(combo_del_i);

        combo_row = document.createElement('div');
        combo_row.setAttribute("class", "row combo-row");
        combo_row.setAttribute("id", "combo"+i);
        combo_row.setAttribute("data-combo-number", i);
        combo_row.setAttribute("ondrop", "drop(event)");
        combo_row.setAttribute("ondragover", "allowDrop(event)");

        uti_row = document.createElement('div');
        uti_row.setAttribute("class", "row");
        

        res.decks[deck_id].combo_list[i].combo.forEach(el=>{
            // div class="combo-action-wrapper" oncontextmenu="this.remove();return false;" data-type="card-wrapper" ondrop="drop(event)" ondragover="allowDrop(event)"
            combo_action_wrapper = document.createElement('div');
            combo_action_wrapper.setAttribute("class", "combo-action-wrapper");
            combo_action_wrapper.setAttribute("oncontextmenu", "this.remove();return false;");
            combo_action_wrapper.setAttribute("data-type", "card-wrapper");
            combo_action_wrapper.setAttribute("ondrop", "drop(event)");
            combo_action_wrapper.setAttribute("ondragover", "allowDrop(event)");

            if (el.includes("?")){
                parsed = cardStateParser(el);
                card = get_card_info(parsed["id"]);
    
                new_img = document.createElement('img');
                new_img.setAttribute('src', card.card_images[0].image_url);
                new_img.setAttribute('id', card["id"]);
                new_img.setAttribute('alt', card.name);
                new_img.setAttribute('data-card', JSON.stringify(card))
                new_img.setAttribute('data-type',"card");
                new_img.setAttribute('class', "combo_imgs");
                new_img.setAttribute('draggable', "true");
                new_img.setAttribute('ondragstart', "drag(event)");
                new_img.setAttribute('onclick', "showBigCard(this.getAttribute('data-card'))");
                new_img.setAttribute('oncontextmenu', "removeRow(this);return false;");

                combo_action_wrapper.appendChild(new_img);
                // console.log(parsed);
                if (parsed["states"] && parsed["states"][0]!="")
                parsed["states"].forEach(e=>{
                    new_state = document.createElement('img');
                    new_state.setAttribute('src', "assets/opp/" + e + ".png");
                    new_state.setAttribute('id', e);
                    new_state.setAttribute('alt', card.name);
                    new_state.setAttribute('class', "card-states");
                    new_state.setAttribute('data-card', e)
                    new_state.setAttribute('data-type',"state");
                    new_state.setAttribute('draggable', "true");
                    new_state.setAttribute('ondragstart', "drag(event)");
                    // new_state.setAttribute('onclick', "showBigCard(this.getAttribute('data-card'))");
                    new_state.setAttribute('oncontextmenu', "removeRow(this);return false;");
                    combo_action_wrapper.appendChild(new_state);
                });
            }
            else if (el!="|"){
                combo_action_wrapper.setAttribute("data-type", "action-wrapper");
                combo_action_wrapper.setAttribute("id", "action-wrapper-sample");

                passage = document.createElement('p');
                passage.setAttribute("class", "action-text combo-action");
                passage.setAttribute("contenteditable", "true");
                passage.innerHTML = el;
                passage.addEventListener("input", function(event) {
                    // console.log(event.target.parentNode.getAttribute("data-combo-number"));
                    save_to_storage(event.target.parentNode.getAttribute("data-combo-number"));
                }, false);
                combo_action_wrapper.appendChild(passage);
            }
            combo_action_wrapper.setAttribute("data-combo-number", i);
            combo_action_wrapper.setAttribute("oncontextmenu", "combo_id = this.getAttribute('data-combo-number'); this.remove();  save_to_storage(combo_id);return false;");
            if (combo_action_wrapper.innerHTML!="") combo_row.appendChild(combo_action_wrapper);
            
        });
        // combo_wrap.appendChild(combo_name);
        // combo_wrap.appendChild(combo_note);

        col_10.appendChild(combo_name);
        col_10.appendChild(combo_note);
        col_2.appendChild(combo_del);
        uti_row.appendChild(col_10);
        uti_row.appendChild(col_2);
        combo_wrap.appendChild(uti_row);
        combo_wrap.appendChild(combo_row);
        document.getElementsByClassName("combos")[0].appendChild(combo_wrap);
        i--;
    });

}
function deleteCombo(combo_id){
    deck_id = getDeckID();
    temp = getList("deck_list");
    temp.decks[deck_id].combo_list = temp.decks[deck_id].combo_list.filter(item => item != temp.decks[deck_id].combo_list[parseInt(combo_id)]);
    storeList("deck_list", temp);
    location.reload();
}
function getDeckID(){
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}
function cardStateParser(card_state){
    card_states = card_state.split('?');
    card = {
        "id" : card_states[0],
        "states": card_states[1].split('-')
    }
    // console.log(card);
    return card;
}

function deleteComboList(comboNumber){
    temp = getList("deck_list");
    temp.decks = temp.decks.filter(item => item != temp.decks[parseInt(comboNumber)]);
    storeList("deck_list", temp);
    location.reload();
}

function addComboList(name){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    temp = 
    {
        "name": name,
        "date_created": dateTime,
        "date_modified": dateTime,
        "combo_list":[]
    }

    res = getList("deck_list");
    res.decks.push(temp);
    storeList("deck_list", res);
    location.reload();
}

function openComboPlanner(id){
    new_window = window.open("combo-planner.html?id="+id,"_self");
    new_window.ivalue = i;
}


function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />&nbsp;&nbsp;&nbsp;' : '<br>&nbsp;&nbsp;&nbsp;';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function showBigCard(element){
    res = JSON.parse(element);
    show_place = document.getElementsByClassName("card-show")[0];

    header = document.getElementById("card-title");
    header.innerHTML = res.name;

    card_title = document.createElement('div');

    big_img = document.getElementById("big-img");
    big_img.setAttribute('src', res.card_images[0].image_url);
    big_img.setAttribute('alt', res.name);
 
    attr = document.getElementById("attr-img");
    attr_src = "";
    if (res.type == "Trap Card") attr_src = "assets/attribute/TRAP1.png";
    else if (res.type == "Spell Card") attr_src = "assets/attribute/SPELL1.png";
    else if (res.type.split(' ').slice(-1)[0] == "Monster"){
        attr_src = "assets/attribute/" + res.attribute + "1.png";
    }

    attr.setAttribute('src', attr_src);
    attr.setAttribute('alt', res.name);
    
    detail_row_1_col_1 = document.getElementById("detail-row-1-col-1");
    detail_row_1_col_2 = document.getElementById("detail-row-1-col-2");
    detail_row_2_col_1 = document.getElementById("detail-row-2-col-1");
    detail_row_2_col_2 = document.getElementById("detail-row-2-col-2");
    detail_row_3_col_1 = document.getElementById("detail-row-3-col-1");
    detail_row_3_col_2 = document.getElementById("detail-row-3-col-2");
    detail_row_4_col_1 = document.getElementById("detail-row-4-col-1");
    detail_row_4_col_2 = document.getElementById("detail-row-4-col-2");

    detail_row_1_col_1.innerHTML = '';
    detail_row_1_col_2.innerHTML = '';
    detail_row_2_col_1.innerHTML = '';
    detail_row_2_col_2.innerHTML = '';
    detail_row_3_col_1.innerHTML = '';
    detail_row_3_col_2.innerHTML = '';
    detail_row_4_col_1.innerHTML = '';
    detail_row_4_col_2.innerHTML = '';

    type_row = document.getElementsByClassName("row-type")[0];

    if (res.type.includes("Trap")) {
        detail_row_1_col_2.innerHTML = res.race + ' ' + 'Trap';
        type_row.innerHTML = "[Trap]";
    }
    else if (res.type.includes("Spell")) {
        detail_row_1_col_2.innerHTML = res.race + ' ' + 'Spell';
        type_row.innerHTML = "[Spell]";
    }
    else if ((res.type.includes("Monster"))){
        type_row.innerHTML="[";
        type_row.innerHTML+=res.race;
        res.type.split(' ').forEach(element=>{
            if (element!="Monster"){
                type_row.innerHTML+='|'+element;
            }
        })
        type_row.innerHTML+="]";
        if (res.type.includes("Link")){
            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/link1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_1_col_1.appendChild(link_icon);
            detail_row_1_col_1.innerHTML+=' '+res.linkval;

            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/atk1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_2_col_1.appendChild(link_icon);
            detail_row_2_col_2.innerHTML+=' '+res.atk;
            
            detail_row_1_col_2.innerHTML = res.race;
        }       
        else if (res.type.includes("XYZ")){
            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/rank1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_1_col_1.appendChild(link_icon);
            detail_row_1_col_1.innerHTML+=' '+res.level;

            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/atk1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_2_col_1.appendChild(link_icon);
            detail_row_2_col_2.innerHTML+=' '+res.atk;

            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/def1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_3_col_1.appendChild(link_icon);
            detail_row_3_col_2.innerHTML+=' '+res.def;

            detail_row_1_col_2.innerHTML = res.race;
        }
        
        else if (res.type.includes("Pendulum")){
            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/level1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_1_col_1.appendChild(link_icon);
            detail_row_1_col_1.innerHTML+=' '+res.level;

            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/pen1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_2_col_1.appendChild(link_icon);
            detail_row_2_col_1.innerHTML+=' '+res.scale;

            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/atk1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_3_col_1.appendChild(link_icon);
            detail_row_3_col_2.innerHTML+=' '+res.atk;

            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/def1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_4_col_1.appendChild(link_icon);
            detail_row_4_col_2.innerHTML+=' '+res.def;

            detail_row_1_col_2.innerHTML = res.race;
        }
        else {
            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/star1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_1_col_1.appendChild(link_icon);
            detail_row_1_col_1.innerHTML+=' '+res.level;

            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/atk1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_2_col_1.appendChild(link_icon);
            detail_row_2_col_2.innerHTML+=' '+res.atk;

            link_icon = document.createElement('img');
            link_icon.setAttribute('src','assets/detail/def1.png');
            link_icon.setAttribute('width',"50%")
            link_icon.setAttribute('class',"detail-icon");
            detail_row_3_col_1.appendChild(link_icon);
            detail_row_3_col_2.innerHTML+=' '+res.def;

            detail_row_1_col_2.innerHTML = res.race;
        }
    }

    
    des = document.getElementById('card-desc');
    des.innerHTML ="&nbsp;&nbsp;&nbsp;" +nl2br(res.desc);
    
    scale_text = Math.round(($("h1").width()*res.name.length)/show_place.offsetWidth);
    // console.log(scale_text);

    document.getElementById("card-title").animate([
        // keyframes
        { transform: 'translateX(0%)' }, 
        { transform: 'translateX(-'+ scale_text +'%)' }
      ], { 
        // timing options
        duration: 3000,
        iterations: Infinity
      });

}
function removeRow(element) {
    $(element).closest('.combo-action-wrapper').remove();
  }
function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
randotron = 0;
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    img_src = document.getElementById(data);
    smaller_img = img_src.cloneNode(true);
    smaller_img.setAttribute("oncontextmenu", "removeRow(this);return false;");
    
    combo_id = parseInt(ev.target.getAttribute("data-combo-number"));
    if (isNaN(combo_id)) combo_id = parseInt(ev.target.parentNode.getAttribute("data-combo-number"));
    smaller_img.setAttribute("data-combo-number", combo_id);
    wrapper =document.createElement('div');
    wrapper.setAttribute("class", "combo-action-wrapper");
    

    if (smaller_img.getAttribute("data-type")=="card"){
        smaller_img.setAttribute('class', "combo_imgs");
        wrapper.setAttribute("data-type", "card-wrapper");
        wrapper.appendChild(smaller_img);
        wrapper.setAttribute("ondrop", "drop(event)");
        wrapper.setAttribute("ondragover", "allowDrop(event)");
        wrapper.setAttribute("data-combo-number", combo_id);

    } 
    else if (smaller_img.getAttribute("data-type")=="combo-action-wrapper"){
        wrapper = smaller_img;
        wrapper.setAttribute("data-combo-number", combo_id);
    }
    else if (smaller_img.getAttribute("data-type")=="action-wrapper"){
        wrapper = smaller_img;
        wrapper.setAttribute("data-combo-number", combo_id);
        wrapper.firstChild.setAttribute("contenteditable","true");
        
    }
    // else if (smaller_img.getAttribute("data-type") == "state" && ev.target.getAttribute("class") == "combo_imgs"){
    //     wrapper = smaller_img;
    // }
    
    wrapper.setAttribute("oncontextmenu", "combo_id = this.getAttribute('combo-data-type'); this.remove(); save_to_storage(combo_id);return false;");
    
    // NOT DONE YET
    i = 0;
    flag = 0;
    x = 0;

    if (ev.target.getAttribute("class") == "row combo-row"){
        // for (i = 0; i<ev.target.children.length; i++){
        //     rect = ev.target.children[i].getBoundingClientRect();
        //     if (rect.bottom>ev.clientY && rect.right>ev.clientX && rect.top<ev.clientY && rect.left<ev.clientX){
        //         flag = 1;
        //         x = i;
        //         break;
        //     }
        // } 
        ev.target.appendChild(wrapper);
    }
    
    else if (ev.target.getAttribute("class") == "combo-action-wrapper"){
        // console.log(ev.target.getAttribute("class") );
        for (i = 0; i<ev.target.parentNode.children.length; i++){
            rect = ev.target.parentNode.children[i].getBoundingClientRect();
            if (rect.bottom>ev.clientY && rect.right>ev.clientX && rect.top<ev.clientY && rect.left<ev.clientX){
                if (ev.clientX>(rect.left+rect.right)/2)
                    flag = 1;
                else flag = 0;
                x = i;
                break;
            }
        }
        if (randotron ==0){
            if (flag == 0) {
                ev.target.parentNode.insertBefore(wrapper, ev.target.parentNode.children[x]);
                // console.log("hmm" );
            } 
            else {
                ev.target.parentNode.insertBefore(wrapper, ev.target.parentNode.children[x].nextSibling);
                // console.log("hmmmmmm" );
            }
            randotron =1;
        }
        else randotron = 0;
        
    }
    else if (ev.target.getAttribute("class") == "combo_imgs" &&smaller_img.getAttribute("data-type") == "state"){
        small_flag = 0;
        Array.from(ev.target.parentNode.children).forEach(element=>{
            if (smaller_img.getAttribute("id")==element.getAttribute("id")) small_flag = 1;
        });
        if (small_flag == 0)
            ev.target.parentNode.appendChild(smaller_img);
    }

    // save to storage here
    save_to_storage(combo_id);
  }

function save_to_storage(combo_id){
    console.log(combo_id);
    deck_id = getDeckID();
    temp = document.getElementById("combo"+combo_id);
    new_combo = [];
    if (temp.children!=null){
        Array.from(temp.children).forEach(element=>{
            if (element.getAttribute("class") == "combo-action-wrapper" && element.innerHTML!=""){
                temp_card =""
                if (element.getAttribute("data-type")=="card-wrapper"){
                    temp_card += element.firstChild.id + "?";
                    if (element.children.length>1){
                        for (i = 1; i<element.children.length;i++){
                            if (i==element.children.length-1) temp_card+=element.children[i].id;
                            else temp_card += element.children[i].id + "-";
                        }
                    } 
                } 
                else if (element.getAttribute("data-type")=="action-wrapper"){
                    if (element.firstChild.innerHTML !=""){
                        temp_card+=element.firstChild.innerHTML.replace('?', '');;
                    }
                }
                new_combo.push(temp_card);
                new_combo.push("|");
            }
        });
        if (new_combo[new_combo.length-1]=="|") new_combo.pop();
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    res = getList("deck_list");
    res.decks[deck_id].date_modified = dateTime;
    res.decks[deck_id].combo_list[combo_id].combo_name = document.getElementById("combo-name"+combo_id).innerHTML;
    // res.decks[deck_id].combo_list[combo_id].combo_note = document.getElementById("note"+combo_id).innerHTML;
    res.decks[deck_id].combo_list[combo_id].combo = new_combo;

    storeList("deck_list", res);
    test_storage();
}

function test_storage(){
    res = getList("deck_list");
    console.log(res);

}
function comboListPageStartup(){
    res = getList("deck_list");
    if (!res){
        temp = {
            "decks": [
            ]
        };
        storeList("deck_list", temp);
        res = getList("deck_list");
    }
    res = getList("deck_list");
    i = 0;
    index = res.decks.length-1;
    // test_div = document.getElementsByClassName("test_place")[0];
    if (res.decks.length>0)
    res.decks.forEach(element => {
        // test_div.innerHTML=i/4;
        if (i%4 == 0){
            grid_container = document.getElementsByClassName("container-combo-lists")[0];
            var new_row = document.createElement('div');
            new_row.className  = "row row" + Math.floor(i/4);
            new_row.setAttribute("style","margin-bottom:15px;")
            grid_container.appendChild(new_row);
        }
        if (res.decks[i]){
            row = document.getElementsByClassName('row row' + Math.floor(i/4))[0];
            big_col = document.createElement('div');
            medium_col = document.createElement('div');
            big_col.setAttribute("class", "col-3");
            medium_col.setAttribute("class", "col-12");
            big_col.appendChild(medium_col);
            
            
            // What to do with the cell?
            small_col = document.createElement('div');
            small_col.setAttribute("class", "col cell-combo-list");
            small_col.setAttribute("data-value", index);
            small_col.setAttribute("onclick", "openComboPlanner(this.getAttribute('data-value'))");
            small_col.innerHTML = res.decks[index].name;
            // <button onclick="myFunction()">Click me</button>
            delete_button = document.createElement('button');
            delete_button.setAttribute("onclick", "deleteComboList(this.getAttribute('value'))");
            // delete_button.innerHTML = "Delete";
            delete_button.setAttribute("value", index);
            delete_button.setAttribute("class", "btn btn-danger btn-sm float-right");
            // delete_button.setAttribute("style","float: right;");
            del_icon = document.createElement('i');
            del_icon.setAttribute("class","fa fa-trash");
            delete_button.appendChild(del_icon);

            small_col.appendChild(delete_button)
            small_col.appendChild
            medium_col.appendChild(small_col);
            row.appendChild(big_col);
        }
        i+=1;
        index-=1;
    });


}