// {
//     "decks":[
//    {
//     "name": "abcxyz",
//     "date_created": "30/12/2021",
//     "date_modified": "31/12/2021",
//     "combo_list":[{
//         "combo_name":"xxxxsuckyyydick",
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
    new_window = window.open("combo-planner.html?id="+id);
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
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    img_src = document.getElementById(data);
    smaller_img = img_src.cloneNode(true);
    smaller_img.setAttribute("oncontextmenu", "removeRow(this);return false;");

    wrapper =document.createElement('div');
    wrapper.setAttribute("class", "combo-action-wrapper");
    wrapper.setAttribute("oncontextmenu", "this.remove();return false;");

    if (smaller_img.getAttribute("data-type")=="card"){
        smaller_img.setAttribute('class', "combo_imgs");
        wrapper.setAttribute("data-type", "card-wrapper");
        wrapper.appendChild(smaller_img);
        // gonna implement the drop function of card state here
        //gonna update the combo right away.
        // add new drag event: cut the element
    } 
    else if (smaller_img.getAttribute("data-type")=="action"){
        wrapper.setAttribute("data-type", "action-wrapper");
        wrapper.appendChild(smaller_img);
    }

    ev.target.appendChild(wrapper);
  }
function comboListPageStartup(){
    res = getList("deck_list");
    if (!res){
        temp = {
            "decks": [
                {
                    "combo_name":"xxxxsuckyyydick",
                    "combo":["16162312133?faceup-atk-field","attack","1561656123?facedown-def-field","|","6511233331?hand","activate"],
                    "result":["16162312133?graveyard", "6511233331?graveyard"]
                    }
            ]
        };
        storeList("deck_list", temp);
        res = getList("deck_list");
    }
    res = getList("deck_list");
    i = 0;
    index = res.decks.length-1;
    // test_div = document.getElementsByClassName("test_place")[0];
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