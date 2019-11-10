var WUNDERLIST_CLIENT_ID = ""
var WUNDERLIST_CLIENT_SECRET = ""
var WUNDERLIST_REDIRECT_URI = "";
var WUNDERLIST_AUTHORIZE_URL = "https://www.wunderlist.com/oauth/authorize?client_id=" + WUNDERLIST_CLIENT_ID + "&redirect_uri=" + WUNDERLIST_REDIRECT_URI;
var WUNDERLIST_TOKEN_URL = "https://www.wunderlist.com/oauth/access_token"
var WUNDERLIST_API_BASE_URL = "https://a.wunderlist.com/api/v1/"
var WUNDERLIST_LIST_ID = -1

function Wunderlist(properties, type) {
  this.properties = properties;
  this.type = type;

  this.login = function () {
    const state = Math.random().toString(36).substring(2);
    this.properties.userProperties.setProperty("state", state);
    const wunderListURL = WUNDERLIST_AUTHORIZE_URL + "&state=" + state;
    return redirect(wunderListURL)
  }

  this.getToken = function () {
    const query = this.properties.query.parameter;
    const returnedState = query.state;
    const storedState = this.properties.userProperties.getProperty("state");
    if (returnedState !== storedState) {
      return "State not same";
    }
    const code = query.code;
    const tokenResponse = getAccessToken(code);
    this.properties.userProperties.setProperty("wunderlist_token", tokenResponse.access_token);
    return tokenResponse.access_token;
  }

  this.execute = function () {
    switch (this.type) {
      case 'login':
        return this.login();
    }

    return this.getToken();
  }

  function redirect(url) {
    return HtmlService.createHtmlOutput(
      "<script>window.top.location.href=\"" + url + "\";</script>"
    );
  }

  this.getAuthHeaders = function() {
    const access_token =  this.properties.userProperties.getProperty("wunderlist_token");

    return {
      'X-Access-Token': access_token,
      'X-Client-ID': WUNDERLIST_CLIENT_ID
    };
  }

  this.getLists = function() {
    const options = {
      headers: this.getAuthHeaders()
    };
    const response = UrlFetchApp.fetch(WUNDERLIST_API_BASE_URL+"lists", options);
    return JSON.parse(response.getContentText());
  }

  this.postReminder = function(text) {
    var data = {
      list_id: WUNDERLIST_LIST_ID,
      title: text,
      due_date: new Date().toISOString()
    };
    var options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(data),
      headers: this.getAuthHeaders()
    };
    const response = UrlFetchApp.fetch(WUNDERLIST_API_BASE_URL+'tasks', options);
    return JSON.parse(response.getContentText());
  }

  function getAccessToken(code) {
    var data = {
      code: code,
      client_id: WUNDERLIST_CLIENT_ID,
      client_secret: WUNDERLIST_CLIENT_SECRET
    };
    var options = {
      'method': 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload': JSON.stringify(data)
    };
    const response = UrlFetchApp.fetch(WUNDERLIST_TOKEN_URL, options);
    return JSON.parse(response.getContentText());
  }
}

