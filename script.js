// ====== MOBILE NAVIGATION TOGGLE ======

// Select the hamburger button element
const navToggle = document.querySelector('.nav-toggle');

// Select the navigation links container
const navLinks = document.querySelector('.nav-links');

// Add click event listener to hamburger button
navToggle.addEventListener('click', () => {
  // Toggle 'active' class on nav-links to show/hide menu on mobile
  navLinks.classList.toggle('active');
});


// ====== SMOOTH SCROLL FOR ANCHOR LINKS ======

// Select all anchor links that link to an id within the page (href starts with '#')
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default jump to anchor

    // Get the target element to scroll to using href attribute value
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      // Smoothly scroll the target element into view, aligned at the top
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // If mobile nav is open, close it after clicking a link
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });
});















/* LinkedIn badge JS modified to open all LinkedIn links in a new tab safely */
(function(window) {
  window.LIRenderAll = function () {
    var CALLBACK_NAME     = 'LIBadgeCallback',
        BADGE_NAMES       = '.LI-profile-badge, .LI-entity-badge',
        TRACKING_PARAM    = 'profile-badge',
        responsesReceived = 0,
        expectedResponses = 0,
        scripts           = [],
        childScripts      = {},
        badges            = Array.prototype.slice.call(document.querySelectorAll(BADGE_NAMES));

    var i, len, badge, rendered;
    for (i = 0, len = badges.length;  i < len; i++) {
      badge    = badges[i];
      rendered = badge.getAttribute('data-rendered');
      if (!rendered) {
        expectedResponses++;
        badge.setAttribute('data-rendered', true);
        renderBadge(badge);
      }
    }

    function isCNDomain() {
      if (typeof window !== "undefined") {
        var hostName = window.location && window.location.hostname ||  '';
        return (/linkedin(-ei)?.cn$/).test(hostName);
      }
      return false;
    }

    function generateUrl(isEI) {
      var domainPrefix = isEI ? 'https://badges.linkedin-ei' : 'https://badges.linkedin';
      if (isCNDomain()) return domainPrefix + ".cn/";
      return domainPrefix + ".com/";
    }

    function getBadgeKeyQueryParams(badge) {
      return Array.prototype.slice.call(badge.attributes).filter(function (attr) {
        return attr.name.lastIndexOf('data-key-', 0) !== -1;
      }).map(function (attr) {
        return encodeURIComponent(attr.name.replace('data-', '').toLowerCase()) + '=' + encodeURIComponent(attr.value);
      });
    }

    function renderBadge(badge) {
      var size       = badge.getAttribute('data-size'),
          locale     = badge.getAttribute('data-locale'),
          type       = badge.getAttribute('data-type'),
          theme      = badge.getAttribute('data-theme'),
          vanity     = badge.getAttribute('data-vanity'),
          version    = badge.getAttribute('data-version'),
          isEI       = badge.hasAttribute('data-ei'),
          entity     = badge.getAttribute('data-entity'),
          isCreatePage = badge.hasAttribute('data-iscreate'),
          uid        = Math.round(1000000 * Math.random()),
          baseUrl = generateUrl(isEI),
          queryParams = [
            'locale=' + encodeURIComponent(locale),
            'badgetype=' + encodeURIComponent(type),
            'badgetheme=' + encodeURIComponent(theme),
            'uid=' + encodeURIComponent(uid),
            'version=' + encodeURIComponent(version)
          ],
          url;

      if (version === 'v2') {
        baseUrl += 'view';
        queryParams.push('badgesize=' + encodeURIComponent(size));
        queryParams.push('entity=' + encodeURIComponent(entity));
        queryParams = queryParams.concat(getBadgeKeyQueryParams(badge));
      } else {
        baseUrl += 'profile';
        queryParams.push('maxsize=' + encodeURIComponent(size));
        queryParams.push('trk=' + encodeURIComponent(TRACKING_PARAM));
        queryParams.push('vanityname=' + encodeURIComponent(vanity));
      }

      if (isCreatePage) queryParams.push('fromCreate=true');

      url = baseUrl + '?' + queryParams.join('&');
      badge.setAttribute('data-uid' , uid);
      jsonp(url);
    }

    // Sanitizes badge HTML: forces all LinkedIn links to open in new tab
    function sanitizeBadgeHtml(badgeHtml) {
      var container = document.createElement("div");
      container.innerHTML = badgeHtml;

      container.querySelectorAll("a").forEach(link => {
        if (link.href.includes("linkedin.com")) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
          link.onclick = null; // remove any existing onclick that may override target
        }
      });

      return container.innerHTML;
    }

    function responseHandler(badgeHtml, badgeUid) {
      responsesReceived ++;
      var i, badge, uid, isCreate;
      var defaultWidth = 330, defaultHeight = 300;

      for (i = 0, len = badges.length; i < len; i++) {
        badge = badges[i];
        isCreate = badge.getAttribute('data-iscreate');
        uid   = parseInt(badge.getAttribute('data-uid'), 10);
        if (uid === badgeUid) {
          var cleanHtml = sanitizeBadgeHtml(badgeHtml);
          var badgeMarkup = `<body>${cleanHtml}</body>`;
          var iframe = document.createElement('iframe');

          iframe.onload = function() {
            var iframeBody = iframe.contentWindow.document.body;
            iframe.setAttribute('height', (iframeBody.scrollHeight || defaultHeight) + 5);
            iframe.setAttribute('width', (iframeBody.scrollWidth || defaultWidth) + 5);
          };

          iframe.setAttribute('frameBorder', '0');
          iframe.style.display = 'block';
          badge.appendChild(iframe);

          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write(badgeMarkup);
          iframe.contentWindow.document.close();

          replaceScriptTags(badge, isCreate);
        }
      }
      tryClean();
    }

    function replaceScriptTags(node, isCreate) {
      if (shouldReplaceNode(node, isCreate)) {
        node.parentNode.replaceChild(cloneScriptNode(node), node);
        childScripts[node.src] = true;
      } else {
        var i = 0, children = node.childNodes;
        while (i < children.length) {
          replaceScriptTags(children[i++], isCreate);
        }
      }
      return node;
    }

    function shouldReplaceNode(node, isCreate) {
      return isScriptNode(node) && !childScripts[node.src] &&
             (!isCreate || (isCreate && !node.getAttribute('data-isartdeco')));
    }

    function isScriptNode(node) {
      return node.tagName === 'SCRIPT';
    }

    function cloneScriptNode(node){
      var script  = document.createElement("script");
      for(var i = node.attributes.length-1; i >= 0; i-- ) {
        script.setAttribute(node.attributes[i].name, node.attributes[i].value);
      }
      return script;
    }

    window[CALLBACK_NAME] = responseHandler;

    function tryClean() {
      var done = (responsesReceived >= expectedResponses && expectedResponses > 0) ||
                 responsesReceived >= badges.length;
      if (done) {
        delete window[CALLBACK_NAME];
        scripts.map(function(script){
          document.body.removeChild(script);
        });
      }
    }

    function jsonp(url) {
      var script = document.createElement('script');
      script.src = url;
      scripts.push(script);
      document.body.appendChild(script);
    }
  };

  if (document.readyState === 'complete') {
    window.LIRenderAll();
  } else {
    window.addEventListener('load', window.LIRenderAll, false);
  }

})(window);
