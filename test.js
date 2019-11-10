function printToken() {
  Logger.log(PropertiesService.getUserProperties().getProperty("wunderlist_token"))
}


function printLists() {
  var userProperties = PropertiesService.getUserProperties();
  const properties = {userProperties: userProperties};
  const wunderList = new Wunderlist(properties)
  const list = wunderList.getLists()
  Logger.log(list)
}

function postReminder() {
  var userProperties = PropertiesService.getUserProperties();
  const properties = {userProperties: userProperties};
  const wunderList = new Wunderlist(properties)
  const list = wunderList.postReminder("siddharth is chu")
  Logger.log(list)
}

function printThreads() {
  const gmail = new GMail(GmailApp)
  const messages = gmail.getTransactionMessages()
  messages.forEach(function(message){
     Logger.log(message.id)
  });
  return messages;
}

function getSimplifiedMessages() {
  const messages = printThreads();
  const sc = new SC();
  messages.forEach(function(message){
    Logger.log(sc.getTransactionText(message.text))
  });
}

function printISODate() {
  var date = new Date();
  Logger.log(date.toISOString())
}


function getLastPostedMessageID() {
  Logger.log(PropertiesService.getUserProperties().getProperty("lastPostedMessageID"))
}