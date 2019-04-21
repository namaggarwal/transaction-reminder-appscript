function getCommand(type, properties) {
  switch(type) {
    case 'WunderListLogin':
      return new Wunderlist(properties, "login");
    case 'WunderListRedirect':
      return new Wunderlist(properties, "redirect");
  }
}