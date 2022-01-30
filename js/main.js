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
    res.decks.unshift(temp)
    storeList("deck_list", res);
    location.reload();
}

function openComboPlanner(id){
    new_window = window.open("combo-planner.html?id="+id);
    // new_window.document.getElementsByClassName("test_place")[0].innerHTML = id;
    // new_window.document.getElementsByClassName("hidden-value")[0].innerHTML = id;
    // new_window.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
    new_window.ivalue = i;
}

function showBigCard(element){
    res = JSON.parse(element);
    show_place = document.getElementsByClassName("card-show")[0];
    show_place.innerHTML = '';

    header = document.createElement('h1');
    header.innerHTML = res.name;
    header.id = 'card-title';

    big_img = document.createElement('img');
    big_img.setAttribute('src', res.card_images[0].image_url);
    big_img.setAttribute('alt', res.name);
    big_img.setAttribute('width', "40%");
    big_img.setAttribute('margin-top', "10px");
    // big_img.setAttribute('style', 'float:left;');
    
    attr = document.createElement('img')
    attr_src = "";
    if (res.type == "Trap Card") attr_src = "assets/attribute/TRAP.png";
    else if (res.type == "Spell Card") attr_src = "assets/attribute/SPELL.png";
    else if (res.type.split(' ').slice(-1)[0] == "Monster"){
        attr_src = "assets/attribute/" + res.attribute + ".png";
    }
    console.log(res.type.split(' ').slice(-1)[0]);
    attr.setAttribute('src', attr_src);
    attr.setAttribute('alt', res.name);
    attr.setAttribute('width', "20%");
    attr.setAttribute('style', 'float:right;');


    des = document.createElement('p');
    des.innerHTML = res.desc;

    show_place.appendChild(attr);
    show_place.appendChild(header);
    show_place.appendChild(big_img);
    show_place.appendChild(des);
    
    scale_text = Math.round(($("h1").width()*res.name.length)/show_place.offsetWidth);
    console.log(scale_text);

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
    // temp = {
    //     "decks": [
    //         {
    //             "name": "abcxyz",
    //             "date-created": "30/12/2021",
    //             "date-modified": "31/12/2021",
    //             "combo-list":[{
    //             "combo-name":"xxxxsuckyyydick",
    //             "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
    //             "result":["16162312133<graveyard>", "6511233331<graveyard>"]
    //             },
    //             {
    //             "combo-name":"xxxxsuckyyydick",
    //             "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
    //             "result":["16162312133<graveyard>", "6511233331<graveyard>"]
    //             }
    //             ]
    //         },
    //         {
    //             "name": "abcxyz",
    //             "date-created": "30/12/2021",
    //             "date-modified": "31/12/2021",
    //             "combo-list":[{
    //             "combo-name":"xxxxsuckyyydick",
    //             "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
    //             "result":["16162312133<graveyard>", "6511233331<graveyard>"]
    //             },
    //             {
    //             "combo-name":"xxxxsuckyyydick",
    //             "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
    //             "result":["16162312133<graveyard>", "6511233331<graveyard>"]
    //             }
    //             ]
    //         },
    //         {
    //             "name": "abcxyz",
    //             "date-created": "30/12/2021",
    //             "date-modified": "31/12/2021",
    //             "combo-list":[{
    //             "combo-name":"xxxxsuckyyydick",
    //             "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
    //             "result":["16162312133<graveyard>", "6511233331<graveyard>"]
    //             },
    //             {
    //             "combo-name":"xxxxsuckyyydick",
    //             "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
    //             "result":["16162312133<graveyard>", "6511233331<graveyard>"]
    //             }
    //             ]
    //         },
    //         {
    //             "name": "abcxyz",
    //             "date-created": "30/12/2021",
    //             "date-modified": "31/12/2021",
    //             "combo-list":[{
    //             "combo-name":"xxxxsuckyyydick",
    //             "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
    //             "result":["16162312133<graveyard>", "6511233331<graveyard>"]
    //             },
    //             {
    //             "combo-name":"xxxxsuckyyydick",
    //             "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
    //             "result":["16162312133<graveyard>", "6511233331<graveyard>"]
    //             }
    //             ]
    //         }
    //     ]
    // };
    // storeList("deck_list", temp);
    res = getList("deck_list");
    /* <div class="row">
        <div class="col"><div class="col"><div class="col-4 cell-combo-list">col</div></div></div>
        <div class="col"><div class="col"><div class="col-4 cell-combo-list">col</div></div></div>
        <div class="col"><div class="col"><div class="col-4 cell-combo-list">col</div></div></div>
        <div class="col"><div class="col"><div class="col-4 cell-combo-list">col</div></div></div>
    </div> */
    i = 0;
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
            small_col.setAttribute("data-value", i);
            small_col.setAttribute("onclick", "openComboPlanner(this.getAttribute('data-value'))");
            small_col.innerHTML = res.decks[i].name;
            // <button onclick="myFunction()">Click me</button>
            delete_button = document.createElement('button');
            delete_button.setAttribute("onclick", "deleteComboList(this.getAttribute('value'))");
            // delete_button.innerHTML = "Delete";
            delete_button.setAttribute("value", i);
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
    });


}