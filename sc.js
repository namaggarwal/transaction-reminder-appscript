function SC() {
  this.getTransactionText = function(message) {
    const re = /\+([A-Z]+ \d+\.?(\d+)?).*at (.*)/
    const match = re.exec(message)
    if (Array.isArray(match) && match.length >= 4) {
      return match[1] + " at " + match[3];
    }
  }
}