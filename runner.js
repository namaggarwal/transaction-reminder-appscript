function Runner(gmail, sc, lastReadMessage) {
  this.gmail = gmail;
  this.sc = sc;
  this.lastReadMessage = lastReadMessage;

  this.run = function() {
    const messages = this.gmail.getTransactionMessages()
    const messagesToPost = this.getPostMessages(messages)
    this.postMessagesToWunderList(messagesToPost)
    return messages.length > 0 && messages[0].id || this.lastReadMessage
  }


  this.postMessagesToWunderList = function(messages) {
    const userProperties = PropertiesService.getUserProperties();
    const wl = new Wunderlist({userProperties: userProperties})
    messages.forEach(function(message){
      wl.postReminder(message);
    });
  }

  this.getPostMessages = function(messages) {
    const postTransactions = []    
    for(var index in messages) {
      var message = messages[index];
      if(message.id === this.lastReadMessage) {
        return postTransactions;
      }
      postTransactions.push(this.sc.getTransactionText(messages[index].text));
    }
    return postTransactions;
  }
  
}



