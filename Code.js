function doGet(e) {
  var userProperties = PropertiesService.getUserProperties();
  const properties = {userProperties: userProperties, query: e};
  const command = getCommand(e.parameter.type, properties)
  return command.execute();
}


function postTransactionsToGmail() {
  console.log("Posting transactions to gmail start");
  const mailClient = new GMail(GmailApp);
  const bank = new SC();
  const userProperties = PropertiesService.getUserProperties();
  const lastPostedMessage = userProperties.getProperty("lastPostedMessageID") || "noid";
  console.info("Last posted message %s",lastPostedMessage);
  const runner = new Runner(mailClient, bank, lastPostedMessage);
  const newLastPostedMessage = runner.run();
  userProperties.setProperty("lastPostedMessageID", newLastPostedMessage);
  console.info("New Last posted message %s",newLastPostedMessage);
  console.log("Posting transactions to gmail end");
}