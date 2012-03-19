$(document).ready(function() {

  /* Wrap markdown sections
   *
   * Take the a selector (h1, h2, etc) up until the next tag 
   * that usually marks a section (h1, h2, etc), and wrap all of
   * that in a <div> with a given css_class */
  var markdownwrapper = function(selector, css_class_list) {
    var section_break_elements = [ "H1", "H2", "H3" ]
    var count = 0;
    $(selector).each(function(i, element) {
      var current = $(element)
      var contents = [current];
      for (var el = current.next(); el && el.size() > 0 ; el = el.next()) {
        var tag = el.get(0).tagName;
        if ($.inArray(tag, section_break_elements) >= 0) {
          break;
        }
        contents.push(el);
      }

      var outer = $("<div>");
      outer.insertAfter(current);
      var inner = $("<div>")
      $.each(css_class_list, function(i, value) { outer.addClass(value) })
      $.each(contents, function(i, value) {
        inner.append(value);
      });
      outer.addClass("outer")
      inner.addClass("inner")
      outer.append(inner)

    }); /* $(selector).each */
  }; /* markdownwrapper */

  var maketoc = function(selector) {
    var toc = $("<div>").addClass("table-of-contents");
    toc.append("<h1>Table of Contents</h1>");
    $(selector).each(function(i, element) {
      console.log($(element));
      var entry = $("<div>");
      entry.html($(element).text());
      toc.append(entry);
    });
    toc.insertBefore($(selector).first());
  };

  $("#content").addClass("article");

  maketoc("#content h1, #content h2, #content h3");
});
