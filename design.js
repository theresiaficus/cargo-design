/***imagesLoaded() program***/
!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return-1==n.indexOf(t)&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return-1!=n&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=0,o=i[n];t=t||[];for(var r=this._onceEvents&&this._onceEvents[e];o;){var s=r&&r[o];s&&(this.off(e,o),delete r[o]),o.apply(this,t),n+=s?0:1,o=i[n]}return this}},t.allOff=t.removeAllListeners=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){var t=[];if(Array.isArray(e))t=e;else if("number"==typeof e.length)for(var i=0;i<e.length;i++)t.push(e[i]);else t.push(e);return t}function o(e,t,r){return this instanceof o?("string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=n(e),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(e,t,r)}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&d[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

$(function() {
  /***Home functionality***/
  $(this).scrollTop(0);
  const route = Cargo.Helper.GetCurrentRoute();
  // console.log(route);
  const windowHeight = $(window).outerHeight(true);
  const headerHeight = $('header').outerHeight(true);
  const footerHeight = $('footer').outerHeight(true );
  const home = $('#home');
  const doubleBorderWidth = 5;
  const homeHeight = windowHeight - headerHeight - footerHeight;

  if (route === '') {
    home.show();
    home.imagesLoaded( { background: '.cover' }, function() {
      home.height(homeHeight);
    });
    $(window).resize(function() {
      const newWindowHeight = $(window).height();
      home.height(newWindowHeight - headerHeight - footerHeight);
    });
  } else {
    home.hide();
  }

  /***Navigation Patches***/
  $('.header-image').click(function(event) {
    event.preventDefault();
    window.location.reload();
  });
  $('a[data-url-id]').click(function(event) {
    event.preventDefault();
    const id = $(this).data('url-id');
    const projectUrl = Cargo.Helper.GetPurlFromPid(id);
    if (projectUrl !== 0) {
      location.href = Cargo.Helper.GetPurlFromPid(id);
    } else {
      const pageUrl = Cargo.Collection.Pages._byId[id.toString()].attributes.project_url;
      location.href = pageUrl;
    }
  });
});	

/**
 * Polaris
 */

var Design = {
  bindKeys : function() {
    Cargo.Core.KeyboardShortcut.Add("Left", 37, function() {
      Action.Project.Prev();
      return false;
    });

    Cargo.Core.KeyboardShortcut.Add("Right", 39, function() {
      Action.Project.Next();
      return false;
    });
  },
  
  hoverProject: function() {
    // Thumbnail hover
    $(".thumbnails")
      .on("mouseenter", ".project_thumb", function(e) {
        $(".project_link[data-id='" + $(this).attr("data-id") +"'] a").addClass("hover");
      })
      .on("mouseleave", ".project_thumb", function(e) {
        $(".project_link[data-id='" + $(this).attr("data-id") +"'] a").removeClass("hover");
      });

    // Navigation
    $(".navigation")
      .on("mouseenter", ".project_link a", function(e) {
        $(".project_thumb[data-id='" + $(this).closest('.project_link').attr("data-id") +"']").addClass("hover");
      })
      .on("mouseleave", ".project_link a", function(e) {
        $(".project_thumb[data-id='" + $(this).closest('.project_link').attr("data-id") +"']").removeClass("hover");
      });
  },

  checkNavigationHeight: function() {


    var navigation = $(".navigation");
    
    if(navigation.length === 0){
      return;
    }

    var	pad_top = (navigation.css('padding-top')) ? Math.floor(navigation.css('padding-top').replace("px","")) : 0,
      margin_top = (navigation.css('margin-top')) ? Math.floor(navigation.css('margin-top').replace("px","")) : 0,
      top_height = navigation.position().top + pad_top + margin_top;
    
    if (navigation.length > 0) {
      if (navigation.height() + top_height > $(window).height()) {
        if (!navigation.hasClass("scroll")) {
          navigation.add(".site_header").removeClass("fixed").addClass("scroll");
        }
      } else {
        if (!navigation.hasClass("fixed")) {
          navigation.add(".site_header").removeClass("scroll").addClass("fixed");
        }
      }
    }
  },

  checkSetVisibility: function() {
    // Find the active set based on the project ID
    var parentSet = $("[data-setid='" + Cargo.Model.Project.GetSetId() + "']"),
      otherSets = $("[data-setid]").not(parentSet);

    // If the set exists, set active/inactive
    if (parentSet.length > 0) {
      otherSets.removeClass("active").addClass("inactive");
      parentSet.removeClass("inactive").addClass("active");

      // Show the footer link
      $(".set_footer").show();
    } else {
      $(".set_footer").hide();
    }
  },

  checkSetSpacing: function() {
    $(".set_link").removeClass("first-set last-set spacer");

    var first_set = $(".set_link:first"),
      last_set = $(".set_link:last");

    first_set.addClass("first-set");
    last_set.addClass("last-set");

    if (Cargo.Model.DisplayOptions.attributes.use_set_links) {
      var setLinksPosition = Cargo.Model.DisplayOptions.GetSetLinksPosition();

      if (first_set.attr("id") == last_set.attr("id")) {
        // Only one set
        if (setLinksPosition == "top") {
          last_set.addClass("spacer").removeClass("first-set");
        } else if (setLinksPosition == "bottom") {
          first_set.addClass("spacer");
        }
      } else {
        if (setLinksPosition == "top") {
          last_set.addClass("spacer");
        } else if (setLinksPosition == "bottom") {
          first_set.add(last_set).addClass("spacer");
        }
      }
    }
  }
};

/**
 * Events
 */

$(function() {
  Cargo.Core.ReplaceLoadingAnims.init();

  Design.bindKeys();
  Design.hoverProject();
  Design.checkSetSpacing();
  Design.checkNavigationHeight();
});

// Window Resize
$(window).resize(function() {
  Design.checkNavigationHeight();
});

// Project Load Complete
Cargo.Event.on("project_load_complete", function(pid) {
  Design.checkSetVisibility();

  /*
   *   Move the project navigation if the default image width is > 670px.
   */
  
  var defaultImageWidth = parseInt(Cargo.Model.DisplayOptions.GetImageWidth());

  if (defaultImageWidth < 670) {
    defaultImageWidth = 670;
  }

  defaultImageWidth += 305;

  $(".project_navigation").css("left", defaultImageWidth + "px");
});

// Project Close Complete
Cargo.Event.on("show_index_complete", function(pid) {
  setTimeout(function() {
    // Reset sets
    $("[data-setid]").removeClass("active inactive");
    $(".set_footer").hide();
  }, 20);
});

Cargo.Event.on("navigation_reset", function(new_page) {
  Design.checkSetSpacing();
});

Cargo.Event.on("navigation_set_toggle", function() {
  Design.checkNavigationHeight();
});

// Pagination
Cargo.Event.on("pagination_complete", function(new_page) {
  Design.checkSetVisibility();
  Design.checkSetSpacing();
  window.setTimeout(function() {
    Design.checkNavigationHeight();
  }, 10);
});

Cargo.Event.on("project_collection_reset", function(new_page) {
  Design.checkSetVisibility();
  Design.checkSetSpacing();
  window.setTimeout(function() {
    Design.checkNavigationHeight();
  }, 10);
});

Cargo.Event.on("fullscreen_destroy_hotkeys", function() {
    Design.bindKeys();
});

/**
 * Typography
 */

WebFontConfig = {
  google: { families: ["Istok+Web:400,700,400italic,700italic:latin"] }
};

(function() {
  var wf = document.createElement("script");
  wf.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
  wf.type = "text/javascript";
  wf.async = "true";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(wf, s);
})();
