function GMail(GmailApp) {
  this.app = GmailApp

  this.getTransactionMessages = function() {
    const threads = this.app.search("label:bank-sc transaction alert primary newer_than:1d");
    const messages = threads.map(getMessages).reduce(messagesFlatter, [])
    return messages
  }

  function getMessages(thread) {
    return thread.getMessages().reverse()
  }

  function messagesFlatter(accumulator, messages) {
    const messagesDetail = messages.map(getMessageObject)
    return accumulator.concat(messagesDetail)
  }

  function getMessageObject(message) {
    return {
      id: message.getId(),
      text: message.getPlainBody()
    }
  }

}