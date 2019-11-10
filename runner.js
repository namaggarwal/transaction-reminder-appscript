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
      console.info("Message %s posted",message)
    });
  }

  this.getPostMessages = function(messages) {
    const postTransactions = []    
    for(var index in messages) {
      var message = messages[index];
      console.info("Message found with id %s", message.id)
      if(message.id === this.lastReadMessage) {
        return postTransactions;
      }
      const text = this.sc.getTransactionText(message.text) || 'Unknown message with id '+message.id;
      console.info("Text to be pushed %s",text)
      postTransactions.push(text);
    }
    return postTransactions;
  }
  
}



