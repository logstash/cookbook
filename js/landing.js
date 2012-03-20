$(document).ready(function() {
  Site.markdownwrapper("#content h1", ["splash", "logstashize"]);
  Site.markdownwrapper("#content h2", ["featurelet"]);
  Site.markdownwrapper("#content h3", ["info"]);
  $("#content .featurelet").wrapAll("<div class='features'>");
  $("#content .info").wrapAll("<div class='details'>");

  /* Clicking on the featurelet should activate the link inside it */
  $("body").linkify(".featurelet")
});
