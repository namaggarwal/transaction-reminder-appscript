function doGet(e) {
  var userProperties = PropertiesService.getUserProperties();
  const properties = {userProperties: userProperties, query: e};
  const command = getCommand(e.parameter.type, properties)
  return command.execute();
}


function postTransactionsToGmail() {
  const mailClient = new GMail(GmailApp);
  const bank = new SC();
  const userProperties = PropertiesService.getUserProperties();
  const lastPostedMessage = userProperties.getProperty("lastPostedMessageID") || "noid";
  const runner = new Runner(mailClient, bank, lastPostedMessage);
  const newLastPostedMessage = runner.run();
  userProperties.setProperty("lastPostedMessageID", newLastPostedMessage)
}