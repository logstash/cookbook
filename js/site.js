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
    list = $("<ol>");
    $(selector).each(function(i, element) {
      var el = $(element);
      //console.log($(element));
      var entry = $("<li>");
      var link = $("<a>").attr("href", "#" + el.text()).text(el.text());
      /* Add a 'topic-h2' or similar class */
      entry.addClass("topic-" + element.tagName.toLowerCase());
      entry.append(link);
      list.append(entry);
    });
    toc.append(list);
    toc.insertBefore($(selector).first());
    //toc.appendTo(".article-splash .inner");
  }; /* Site.table_of_contents */

  /* If the first element of an article is a 'ul' then fix it up all pretty
   * and move it into the '.article-splash .inner' */
  Site.fix_intro = function(selector) {
    /* Upgrade items of 'Goal: Hello World' to something more than just text. */
    var el = $(selector + " > *").first();
    if (el.is("ul")) {
      el.addClass("bullet-list")
      $("li", el).each(function() {
        var item = $(this);
        var text = item.text();
        var text_a = text.split(/: */)
        var subject = text_a[0];
        var message = text_a[1];

        var title = $("<span>").addClass("bullet-title").text(subject + ":");
        var text = $("<span>").addClass("bullet-text").text(message);
        item.addClass("bullet").empty().append(title).append(text);
      });
      el.appendTo(".article-splash .inner");
    }
  }; /* Site.fix_intro */

  /* Make the text of matching elements into anchors. */
  Site.anchor = function(selector) {
    $(selector).each(function() {
      var el = $(this);
      var anchor = $("<a>").attr("name", el.text());
      $(this).prepend(anchor);
    });
  };

  Site.template = function(element) {
    var template_block_re = /^{% *(.*?) *%}$/;
    var blocks = $("p", element).filter(function() { 
      return template_block_re.test(this.innerHTML) ;
    });
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      var code = template_block_re.exec(block.innerHTML)[1];
      var args = code.split(/\s+/);
      var func = args.shift();
      if (typeof(Site.template[func]) === "function") {
        /* Call 'Site.template.somefunc(args ...)' with the 
         * element to replace as 'this' */
        Site.template[func].apply($(block), args);
        console.log(args);
      } else {
        $(block).append("<i>(Unknown template function '" + func + "')</i>");
      }
    }
  }; /* Site.template */

  Site.template.include_code = function(file) {
    var self = this;
    self.empty();

    var header = $("<pre></pre>");
    header.append("# ");
    var link = $("<a></a>");
    link.attr("href", file);
    link.append(file);
    header.append(link);
    header.addClass("code-header");
    self.append(header)
    
    $.ajax(file).done(function(content) {
      var text = $("<pre></pre>");
      text.addClass("code");
      text.append(document.createTextNode(content));
      self.append(text);
      Site.add_view_plain_text_link(self);
    });
  }; /* Site.template.include_code */

  Site.add_view_plain_text_link = function(jq) {
    jq.each(function() { 
      /* btoa() convrts text to base64 */
      var data_url = "data:text/plain;base64," + btoa($(this).text());
      var plain_text_view = $("<a></a>");
      plain_text_view.attr("href", data_url);
      plain_text_view.append("view plain text")
      var div = $("<div>").addClass("plain-text-link").append(plain_text_view)
      div.insertBefore(this);
      $(this).addClass("has-view-text-link");
    });
  };

  jQuery.fn.linkify = function(selector) {
    this.delegate(selector, "click", function(event) {
      event.preventDefault();
      $("a:first-of-type", this).each(function(i, el) {
        document.location = $(el).attr("href");
      });
    });
  };
  
});
