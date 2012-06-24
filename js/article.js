$(document).ready(function() {
  $("#content").addClass("article");
  Site.anchor("h1, h2, h3, h4, h5, h6");
  Site.table_of_contents("#content h1, #content h2, #content h3");
  Site.fix_intro("div.article");

  /* Add a 'view plain text' link to pre tags */
  Site.add_view_plain_text_link($(".article pre:not(.code-header)"))
  Site.template("div.article");
});
