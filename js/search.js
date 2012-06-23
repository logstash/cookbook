$(document).ready(function() {
  var params_list = document.location.search.substring(1).split("&");
  var params = { };
  for (var i = 0; i < params_list.length; i++) {
    var p = params_list[i].split("=", 2);
    params[decodeURIComponent(p[0])] = decodeURIComponent(p[1]).replace(/\+/g, " ");
  }
  console.log(params);
});
