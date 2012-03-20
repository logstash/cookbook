$(document).ready(function() {
  $("#content").addClass("article");
  Site.table_of_contents("#content h1, #content h2, #content h3");
  Site.fix_intro("div.article");
});
