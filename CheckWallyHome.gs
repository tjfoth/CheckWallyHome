/* This is the Wally API Security Token, found in the Wally Settings page */
var token  = "ece84478-2c30-42ac-ab3f-49116b52b4af";

/* This is the email address to receive the updates */
var mailTo = "tom@fothmail.com";


function CheckOnWallyHome() { 

 var URL    = "https://api.snsr.net/v2/places";
  
 var wallyOptions = {
      "headers" : {
        "Authorization" : "Bearer " + token
      },
   "method" : "GET",
   "muteHttpExceptions" : true
    };
  try {
    var wallyResponse = UrlFetchApp.fetch(URL, wallyOptions);
    var nodeObjects = JSON.parse(wallyResponse.getContentText());
  }  
  catch (e) {
    Logger.log("Caught getting nodes");
    Logger.log(e.toString());
    MailApp.sendEmail(mailTo,"Wally Home eMail failed getting nodes",e.toString());
    return;
  }

  for (i in nodeObjects) {
    var mailBody = "Place: "+nodeObjects[i].label+"\n\n";

    try {
      var sensorsResponse = UrlFetchApp.fetch(URL+"/"+nodeObjects[i].id+"/sensors", wallyOptions);
      var sensorObjects = JSON.parse(sensorsResponse.getContentText());
      }  
      catch (e) {
      Logger.log("Caught getting sensors for node");
      Logger.log(e.toString());
      MailApp.sendEmail(mailTo,"Wally Home eMail failed getting sensors",e.toString());
      return;
    }

    for (j in sensorObjects) {
      mailBody = mailBody + "\tLocation: "+sensorObjects[j].location.floor+"/"+sensorObjects[j].location.room+"/"+sensorObjects[j].location.appliance+":\n";

      if (sensorObjects[j].offline) {
          var sensorStatus = "Offline! ";
        } else {
          var sensorStatus = "Online ";
        };

      if (sensorObjects[j].suspended) {
          sensorStatus = sensorStatus + "Suspended!";
        } else {
          sensorStatus = sensorStatus + "Not suspended"
        };


      mailBody = mailBody + "\t\tStatus: "+sensorStatus+"\n";

      var tempC = sensorObjects[j].state.TEMP.value;
      var tempF = Math.round(tempC * 9 / 5 + 32);
      var tempTime = Utilities.formatDate(new Date(sensorObjects[j].state.TEMP.at), Session.getScriptTimeZone(), "'on 'yyyy-MM-dd' at 'HH:mm:ss z");
      
      var relHum = sensorObjects[j].state.RH.value;
      var relHumTime = Utilities.formatDate(new Date(sensorObjects[j].state.RH.at), Session.getScriptTimeZone(), "'on 'yyyy-MM-dd' at 'HH:mm:ss z");
      
      mailBody = mailBody + "\t\tTemperature: "+tempF+"F / "+tempC+"C ("+tempTime+")\n\t\tRelative Humidity: "+relHum+"% ("+relHumTime+")\n\n";
    }
  }
  MailApp.sendEmail(mailTo,"Wally Home Report",mailBody);

}
