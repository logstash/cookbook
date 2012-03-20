$(document).ready(function() {

  var Site = window.Site = {}
  /* Wrap markdown sections
   *
   * Take the a selector (h1, h2, etc) up until the next tag 
   * that usually marks a section (h1, h2, etc), and wrap all of
   * that in a <div> with a given css_class */
  Site.markdownwrapper = function(selector, css_class_list) {
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
  }; /* Site.markdownwrapper */

  Site.table_of_contents = function(selector) {
    var toc = $("<div>").addClass("table-of-contents");
    toc.append("<h1>Table of Contents</h1>");
    $(selector).each(function(i, element) {
      console.log($(element));
      var entry = $("<div>");
      entry.html($(element).text());
      toc.append(entry);
    });
    toc.insertBefore($(selector).first());
  }; /* Site.table_of_contents */

  jQuery.fn.linkify = function(selector) {
    this.delegate(selector, "click", function(event) {
      event.preventDefault();
      $("a:first-of-type", this).each(function(i, el) {
        document.location = $(el).attr("href");
      });
    });
  };
  
});
