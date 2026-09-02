(function () {
  "use strict";

  var SITE_NAME = "33 JavaScript Concepts";
  var SCHEMA_SCRIPT_ID = "structured-data-jsonld";
  var AUTHOR = {
    "@type": "Person",
    name: "Leonardo Maldonado",
    url: "https://github.com/leonardomso",
  };
  var PUBLISHER = {
    "@type": "Organization",
    name: SITE_NAME,
  };

  function safeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function withoutHash(url) {
    return String(url || "").split("#")[0];
  }

  function getSiteOrigin() {
    try {
      if (window.location && window.location.origin) return window.location.origin;
      return window.location.protocol + "//" + window.location.host;
    } catch (_error) {
      return "";
    }
  }

  function normalizePath(pathname) {
    var path = pathname || "/";
    if (path !== "/") path = path.replace(/\/+$/, "");
    return path || "/";
  }

  function toTitle(segment) {
    var cleaned = decodeURIComponent(segment || "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleaned) return "";

    return cleaned
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  function toAbsoluteUrl(pathOrUrl) {
    try {
      return new URL(pathOrUrl, getSiteOrigin()).toString();
    } catch (_error) {
      return String(pathOrUrl || "");
    }
  }

  function getCanonicalUrl() {
    try {
      var canonical = document.querySelector('link[rel="canonical"]');
      if (canonical && canonical.href) return withoutHash(canonical.href);
    } catch (_error) {}

    return withoutHash(window.location.href);
  }

  function getDescription() {
    try {
      var meta = document.querySelector('meta[name="description"]');
      if (meta && meta.content) return safeText(meta.content);
    } catch (_error) {}

    return "";
  }

  function getPageTitle() {
    try {
      var h1 = document.querySelector("h1");
      if (h1) {
        var headingText = safeText(h1.textContent);
        if (headingText) return headingText;
      }
    } catch (_error) {}

    return safeText(document.title);
  }

  function getDatePublished() {
    try {
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
    } catch (_error) {}

    return new Date().toISOString();
  }

  function isHomePage(pathname) {
    return normalizePath(pathname) === "/";
  }

  function isConceptArticle(pathname) {
    return /^\/(concepts|beyond\/concepts)\/[^/]+$/.test(normalizePath(pathname));
  }

  function isConceptLink(pathname) {
    return /^\/concepts\/[^/]+$/.test(normalizePath(pathname));
  }

  function textFromCandidates(candidates, questionText) {
    for (var i = 0; i < candidates.length; i += 1) {
      var node = candidates[i];
      if (!node) continue;
      if (node.tagName === "BUTTON") continue;

      var content = safeText(node.textContent);
      if (!content) continue;
      if (content === questionText) continue;

      if (questionText && content.indexOf(questionText) === 0) {
        content = safeText(content.slice(questionText.length));
      }

      if (content.length >= 20) return content;
    }

    return "";
  }

  function findFaqHeading() {
    try {
      var headings = Array.prototype.slice.call(document.querySelectorAll("h2"));
      for (var i = 0; i < headings.length; i += 1) {
        var headingText = safeText(headings[i].textContent).toLowerCase();
        if (headingText === "frequently asked questions") return headings[i];
      }
    } catch (_error) {}

    return null;
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

  function getFaqAnswerText(trigger, questionText) {
    var candidates = [];

    var controlsId = trigger.getAttribute("aria-controls");
    if (controlsId) candidates.push(document.getElementById(controlsId));

    candidates.push(trigger.nextElementSibling);

    if (trigger.parentElement) {
      candidates.push(trigger.parentElement.nextElementSibling);
      candidates.push(trigger.parentElement);
    }

    var detailsRoot = trigger.closest("details");
    if (detailsRoot) {
      candidates.push(detailsRoot.querySelector("[role='region']"));
      candidates.push(detailsRoot.querySelector("div"));
      candidates.push(detailsRoot);
    }

    var itemRoot = trigger.closest("li, section, article, div");
    if (itemRoot) {
      candidates.push(itemRoot.querySelector("[role='region']"));
      candidates.push(itemRoot.querySelector("[data-state='open']"));
      candidates.push(itemRoot.querySelector("[data-state='closed']"));
      candidates.push(itemRoot.querySelector("div"));
      candidates.push(itemRoot);
    }

    return textFromCandidates(candidates, questionText);
  }

  function extractFaqItems() {
    try {
      var heading = findFaqHeading();
      if (!heading) return [];

      var sectionNodes = getFaqSectionNodes(heading);
      if (!sectionNodes.length) return [];

      var questions = [];
      var seen = new Set();

      sectionNodes.forEach(function (node) {
        var triggers = Array.prototype.slice.call(
          node.querySelectorAll("button[aria-controls], button[data-state], button, summary, [role='button']")
        );

        triggers.forEach(function (trigger) {
          var questionText = safeText(trigger.textContent);
          if (!questionText || questionText.length < 8) return;
          if (seen.has(questionText)) return;

          var answerText = getFaqAnswerText(trigger, questionText);
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
    } catch (_error) {
      return [];
    }
  }

  function buildBreadcrumbList(pathname) {
    var parts = normalizePath(pathname).split("/").filter(Boolean);
    var itemListElement = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: toAbsoluteUrl("/"),
      },
    ];

    var runningPath = "";
    for (var i = 0; i < parts.length; i += 1) {
      runningPath += "/" + parts[i];
      itemListElement.push({
        "@type": "ListItem",
        position: i + 2,
        name: toTitle(parts[i]),
        item: toAbsoluteUrl(runningPath),
      });
    }

    return {
      "@type": "BreadcrumbList",
      itemListElement: itemListElement,
    };
  }

  function buildConceptItemList() {
    try {
      var root = document.querySelector("main") || document.body;
      var links = Array.prototype.slice.call(root.querySelectorAll("a[href]"));
      var seen = new Set();
      var concepts = [];

      links.forEach(function (link) {
        if (!link || !link.href) return;

        var url;
        try {
          url = new URL(link.href, getSiteOrigin());
        } catch (_error) {
          return;
        }

        if (url.origin !== getSiteOrigin()) return;
        if (!isConceptLink(url.pathname)) return;

        var canonical = withoutHash(url.toString());
        if (seen.has(canonical)) return;

        seen.add(canonical);
        concepts.push({
          name: safeText(link.textContent) || toTitle(url.pathname.split("/").pop()),
          item: canonical,
        });
      });

      if (!concepts.length) return null;

      var limited = concepts.slice(0, 33);
      var itemListElement = limited.map(function (concept, index) {
        return {
          "@type": "ListItem",
          position: index + 1,
          name: concept.name,
          item: concept.item,
        };
      });

      return {
        "@type": "ItemList",
        name: "33 JavaScript Concepts",
        numberOfItems: itemListElement.length,
        itemListElement: itemListElement,
      };
    } catch (_error) {
      return null;
    }
  }

  function buildGraph() {
    var pathname = normalizePath(window.location.pathname || "/");
    var canonicalUrl = getCanonicalUrl();
    var headline = getPageTitle();
    var description = getDescription();
    var graph = [];

    if (isHomePage(pathname)) {
      graph.push({
        "@type": "WebSite",
        name: SITE_NAME,
        description: description,
        url: toAbsoluteUrl("/"),
        potentialAction: {
          "@type": "SearchAction",
          target: toAbsoluteUrl("/search?q={search_term_string}"),
          "query-input": "required name=search_term_string",
        },
      });

      var conceptList = buildConceptItemList();
      if (conceptList) graph.push(conceptList);
      return graph;
    }

    if (isConceptArticle(pathname)) {
      graph.push({
        "@type": "TechArticle",
        headline: headline,
        description: description,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        datePublished: getDatePublished(),
        dateModified: getDatePublished(),
        author: AUTHOR,
        publisher: PUBLISHER,
      });

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

    graph.push({
      "@type": "WebPage",
      name: headline,
      description: description,
      url: canonicalUrl,
    });
    graph.push(buildBreadcrumbList(pathname));

    return graph;
  }

  function injectSchema() {
    try {
      var graph = buildGraph();
      if (!graph.length) return;

      var payload = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": graph,
      });

      var existing = document.getElementById(SCHEMA_SCRIPT_ID);
      if (existing) {
        if (existing.text === payload) return;
        existing.text = payload;
        return;
      }

      var script = document.createElement("script");
      script.id = SCHEMA_SCRIPT_ID;
      script.type = "application/ld+json";
      script.text = payload;
      document.head.appendChild(script);
    } catch (_error) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectSchema, { once: true });
  } else {
    injectSchema();
  }
})();
