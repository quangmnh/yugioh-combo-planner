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