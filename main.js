const settings = {
    "groupId": 123, // group id
    "gameId": 123, // game id
    "roles": {
      /*
      HD ADMIN Rank : Group Rank
      */
        0: 5, // owner of game
        4.3: 235 // random role
    }
}

const express = require('express');
const app = express();
const axios = require('axios').default;
const rbx = require('noblox.js')
const cookie = "" // bot cookie
async function startBot(){
    await rbx.setCookie(cookie);
    let suanki = await rbx.getCurrentUser();
    console.log("Kullanici acildi : " + suanki.UserName);
}
startBot();
async function httpGet(url="undefined", headers){
if (url == "undefined")return "invalid parameter";
if (headers != null){
    var callback = await axios.get(url,headers);
}
else {
    var callback = await axios.get(url);
}

return callback.data;
}
const config= {
    headers: {"x-api-key": "Apikey"/*api key */} 
}
httpGet("https://groups.roblox.com/v1/groups/"+settings["groupId"]+"/users?limit=100&sortOrder=Asc",config).then((callback)=>{
    const data = callback["data"];
    data.forEach((i,v) => {
        var userid = i["user"]["userId"];
        // var groupRank = i["role"]["rank"];
        httpGet("https://apis.roblox.com/datastores/v1/universes/"+settings["gameId"]+"/standard-datastores/datastore/entries/entry?datastoreName=HDAdminPlayerDataV1.0&entrykey="+userid,config).then((callback)=>{
        if (settings["roles"][callback["Rank"]] != undefined){
            var groupusrid = settings["roles"][callback["Rank"]];
            if  (!userid == 3739588469) {
                rbx.setRank(parseInt(settings["groupId"]), parseInt(userid), parseInt(groupusrid));
                console.log("Changed user")
            }
            
        }else{
            console.log("Bu kullanici icin bir rol ayartilmamis.");
        }
    })
    });
})
