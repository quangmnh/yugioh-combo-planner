# Yu-gi-oh Combo Planner
Combo planner for Yu-gi-oh! Trading Card Came, has card search can drag-n-drop cards for saving combo, into the browser cache maybe, haven't even started the project yet.

# Why this?
 Since Master Duel came out, I got the urge to try hard and be a pro duelist this time. But I sucked and couldn't memorize a single combo except normal summon Aleister.
 
 This shitty web app can do it for me, taking note of of combos and specific ways to cycle and get rid of opp's annoying cards is nice, i think (especially the f'king *golden retard lord*, or that *p'ssy striker chick*).

 Anyway, since there are numerous deck planner around, not to mention the Master Duel's one itself, i don't want to create one. Nor the combo tester, since I don't know a thing about rulings, maybe you can help me about that? PLease raise an issue or clone the repos, and add that fucntion for me bro.

# Credit
ME and ME, thank me very much for bringing me comfort, memorizing these shite is suck a dick move, how do I even do that if I can't even memorize my homework???

and YOU of course, for choosing to use this shitty app, or if you can add the combo testing function, i will head over and we can have a coffee together.

# Project History

## Prototype
- ~~Do some figma for the views~~
  https://www.figma.com/file/IX30INQBDdxNTEy1rqgDi3/Untitled?node-id=0%3A1
  
- ~~Intitiate the index file and test the Github page thing~~. It worked like a charm.
- Figure out wtf to save in the cache/cookies (combo sets, of course, but what else? card's id? actions?). Also what structure to store?
   + ~~Structure to store~~: JSON object with each combo as a string of keyword and card ID seem good enough.  
   + ~~Where to store~~: At first glance, I considered using cookies but 5KB is like a joke for some fking long string of combo (For real, how tf to store spellbook combo??). Then HTML5 web storage is a solid choice here with 5MB. It should be enough.
   + ~~Combo string~~: action list, simplified ["activate", "negate", "increase", "decrease", "change position", "change collumn", "destroy", "banish", "flip face up", "flip face down", "special summon", "normal summon", "special summon", "tribute", "ritual summon", "synchro summon", "link summon", "xyz summon", "fusion summon", "set", "dice roll", "flip coin", "attack", "chain","excavate", "search", "discard", "choose"].
   +  ~~Sample JSON structure~~: 
```
{
  "decks":[{
    "name": "abcxyz",
    "date-created": "30/12/2021",
    "date-modified": "31/12/2021",
    "combo-list":[{
      "combo-name":"xxxxsuckyyydick",
      "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
      "result":["16162312133<graveyard>", "6511233331<graveyard>"]
      },
      {
      "combo-name":"xxxxsuckyyydick",
      "combo":["16162312133<faceup,atk,field>","attack","1561656123<facedown,def,field","|","6511233331<hand>","activate"],
      "result":["16162312133<graveyard>", "6511233331<graveyard>"]
      }
    ]
  }]
}
```
- Implement the **Deck select / Create** (we aren't going to make a deck planner, this is actually **Combos sets Select / Create**) 
- Implement the **Combo planner view**
   + **Card search engine**: Kinda hard, but I can copycat the Master Duel's one (It is the simplest thing compared to these YGOPro clone out there, what a joke)
   + **Combo planning flow**: The main dish ofc, I might need to create some assets myself.
