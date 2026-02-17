(function () {
  var SITE_NAME = "33 JavaScript Concepts";
  var SITE_URL = "https://33jsconcepts.com";
  var AUTHOR = {
    "@type": "Person",
    name: "Leonardo Maldonado",
    url: "https://github.com/leonardomso",
  };
  var PUBLISHER = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };

  function safeText(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function toTitle(segment) {
    var cleaned = decodeURIComponent(segment || "").replace(/[-_]+/g, " ").trim();
    if (!cleaned) return "";
    return cleaned
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  function getCanonicalUrl() {
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) return canonical.href;
    return new URL(window.location.pathname + window.location.search, SITE_URL).toString();
  }

  function getDescription() {
    var meta = document.querySelector('meta[name="description"]');
    return safeText(meta && meta.content);
  }

  function getDatePublished() {
    var publishedMeta = document.querySelector('meta[property="article:published_time"]');
    if (publishedMeta && publishedMeta.content) return publishedMeta.content;

    var timeEl = document.querySelector("time[datetime]");
    if (timeEl) {
      var dateTime = timeEl.getAttribute("datetime");
      if (dateTime) return dateTime;
    }

    if (document.lastModified) {
      var parsed = new Date(document.lastModified);
      if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
    }

    return new Date().toISOString();
  }

  function isConceptArticle(pathname) {
    return /^\/(concepts|beyond\/concepts)\/.+/.test(pathname);
  }

  function buildBreadcrumbList(pathname) {
    var parts = pathname.split("/").filter(Boolean);
    var itemListElement = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL + "/",
      },
    ];

    var runningPath = "";
    for (var i = 0; i < parts.length; i += 1) {
      runningPath += "/" + parts[i];
      itemListElement.push({
        "@type": "ListItem",
        position: i + 2,
        name: toTitle(parts[i]),
        item: SITE_URL + runningPath,
      });
    }

    return {
      "@type": "BreadcrumbList",
      itemListElement: itemListElement,
    };
  }

  function findFaqHeading() {
    var headings = Array.prototype.slice.call(document.querySelectorAll("h2"));
    return (
      headings.find(function (heading) {
        return safeText(heading.textContent).toLowerCase().indexOf("frequently asked questions") !== -1;
      }) || null
    );
  }

  function getFaqSectionNodes(heading) {
    var nodes = [];
    var cursor = heading ? heading.nextElementSibling : null;
    while (cursor) {
      if (cursor.tagName === "H2") break;
      nodes.push(cursor);
      cursor = cursor.nextElementSibling;
    }
    return nodes;
  }

  function extractFaqItems() {
    var heading = findFaqHeading();
    if (!heading) return [];

    var sectionNodes = getFaqSectionNodes(heading);
    if (!sectionNodes.length) return [];

    var questions = [];
    var seen = new Set();
    var triggerSelector = [
      "button",
      "summary",
      "[role='button']",
      "[aria-controls]",
      "[data-state]",
    ].join(",");

    sectionNodes.forEach(function (node) {
      var triggers = Array.prototype.slice.call(node.querySelectorAll(triggerSelector));

      triggers.forEach(function (trigger) {
        var questionText = safeText(trigger.textContent);
        if (!questionText || questionText.length < 10) return;
        if (seen.has(questionText)) return;

        var answerText = "";
        var controlsId = trigger.getAttribute("aria-controls");
        if (controlsId) {
          var controlled = document.getElementById(controlsId);
          answerText = safeText(controlled && controlled.textContent);
        }

        if (!answerText) {
          var itemRoot = trigger.closest("[data-radix-collection-item], details, li, div");
          if (itemRoot) {
            var answerCandidate = Array.prototype.slice
              .call(itemRoot.querySelectorAll("p, div"))
              .map(function (el) {
                if (el === trigger || el.contains(trigger)) return "";
                return safeText(el.textContent);
              })
              .find(function (text) {
                return text && text.length > 20;
              });
            answerText = answerCandidate || "";
          }
        }

        if (!answerText) return;

        seen.add(questionText);
        questions.push({
          "@type": "Question",
          name: questionText,
          acceptedAnswer: {
            "@type": "Answer",
            text: answerText,
          },
        });
      });
    });

    return questions;
  }

  function buildGraph() {
    var pathname = window.location.pathname || "/";
    var headline = safeText(document.title);
    var description = getDescription();
    var canonicalUrl = getCanonicalUrl();
    var graph = [];

    if (pathname === "/") {
      graph.push({
        "@type": "WebSite",
        name: SITE_NAME,
        description: description,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: SITE_URL + "/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      });
    } else if (isConceptArticle(pathname)) {
      graph.push({
        "@type": "TechArticle",
        headline: headline,
        description: description,
        author: AUTHOR,
        publisher: PUBLISHER,
        datePublished: getDatePublished(),
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
      });
    } else {
      graph.push({
        "@type": "WebPage",
        name: headline,
        description: description,
        url: canonicalUrl,
      });
    }

    graph.push(buildBreadcrumbList(pathname));

    var faqItems = extractFaqItems();
    if (faqItems.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: faqItems,
      });
    }

    return graph;
  }

  function injectSchema() {
    try {
      var graph = buildGraph();
      if (!graph.length) return;

      var existing = document.getElementById("structured-data-jsonld");
      if (existing) existing.remove();

      var script = document.createElement("script");
      script.id = "structured-data-jsonld";
      script.type = "application/ld+json";
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": graph,
      });
      document.head.appendChild(script);
    } catch (_error) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectSchema);
  } else {
    injectSchema();
  }
})();
