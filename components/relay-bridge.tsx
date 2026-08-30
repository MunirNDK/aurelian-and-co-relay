"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

type Highlight = { box: HTMLDivElement; label: HTMLDivElement };

const HIGHLIGHT_ID = "relay-latch-highlight";

function isElement(node: EventTarget | Node | null): node is HTMLElement {
  return Boolean(node) && (node as Node).nodeType === 1;
}

/**
 * A selector that identifies exactly this element.
 *
 * A test id wins outright: it is stable across rebuilds and it is what a scoped fix will target. The
 * structural fallback stops at the nearest id or at body, and uses :nth-of-type only where a tag is
 * ambiguous among its siblings, which keeps the common case readable in the review panel.
 */
function selectorFor(element: HTMLElement): string {
  const testId = element.getAttribute("data-testid");
  if (testId) return '[data-testid="' + testId + '"]';

  const parts: string[] = [];
  let node: HTMLElement | null = element;
  while (node && node !== document.body && parts.length < 10) {
    if (node.id) {
      parts.unshift("#" + CSS.escape(node.id));
      break;
    }
    let part = node.tagName.toLowerCase();
    const parent: HTMLElement | null = node.parentElement;
    if (parent) {
      const sameTag = Array.prototype.filter.call(parent.children, function (child) {
        return (child as HTMLElement).tagName === node!.tagName;
      }) as HTMLElement[];
      if (sameTag.length > 1) part += ":nth-of-type(" + (sameTag.indexOf(node) + 1) + ")";
    }
    parts.unshift(part);
    node = parent;
  }
  return parts.join(" > ") || element.tagName.toLowerCase();
}

/** The nearest ancestor carrying an attribute, including the element itself. */
function nearest(element: HTMLElement, attribute: string): HTMLElement | null {
  return element.closest("[" + attribute + "]") as HTMLElement | null;
}

/** A short human description, so the review panel can name the element without showing markup. */
function describe(element: HTMLElement) {
  const text = (element.textContent || "").replace(/\s+/g, " ").trim();
  return {
    tag: element.tagName.toLowerCase(),
    classes: Array.prototype.slice.call(element.classList).join(" "),
    text: text.length > 90 ? text.slice(0, 88) + "…" : text,
    role: element.getAttribute("role") || "",
  };
}

/** The chain from body down to the element, for the breadcrumb the operator navigates with. */
function ancestry(element: HTMLElement) {
  const chain: Array<{ tag: string; testId: string | null; section: string | null }> = [];
  let node: HTMLElement | null = element;
  while (node && node !== document.body) {
    chain.unshift({
      tag: node.tagName.toLowerCase(),
      testId: node.getAttribute("data-testid"),
      section: node.getAttribute("data-section"),
    });
    node = node.parentElement;
  }
  return chain;
}

function elementChildren(element: HTMLElement): HTMLElement[] {
  return Array.prototype.filter.call(element.children, isElement) as HTMLElement[];
}

export function RelayBridge() {
  useEffect(function () {
    let annotationMode = false;
    let linkCapture = false;
    let latched: HTMLElement | null = null;
    let highlight: Highlight | null = null;

    window.dataLayer = window.dataLayer || [];

    function ensureHighlight(): Highlight {
      if (highlight) return highlight;
      const box = document.createElement("div");
      box.id = HIGHLIGHT_ID;
      box.style.cssText = [
        "position:fixed", "pointer-events:none", "z-index:2147483646",
        "border:2px solid #63e8c7", "background:rgba(99,232,199,.12)",
        "box-shadow:0 0 0 1px rgba(0,0,0,.45)", "transition:all .08s linear",
      ].join(";");
      const label = document.createElement("div");
      label.style.cssText = [
        "position:absolute", "left:0", "top:-21px", "padding:2px 6px",
        "background:#63e8c7", "color:#08120f", "font:600 10px/1.4 ui-monospace,monospace",
        "white-space:nowrap", "max-width:70vw", "overflow:hidden", "text-overflow:ellipsis",
      ].join(";");
      box.appendChild(label);
      document.body.appendChild(box);
      highlight = { box: box, label: label };
      return highlight;
    }

    function clearHighlight() {
      if (!highlight) return;
      highlight.box.remove();
      highlight = null;
    }

    function paint() {
      if (!latched || !annotationMode) { clearHighlight(); return; }
      const marker = ensureHighlight();
      const rect = latched.getBoundingClientRect();
      marker.box.style.left = rect.left + "px";
      marker.box.style.top = rect.top + "px";
      marker.box.style.width = rect.width + "px";
      marker.box.style.height = rect.height + "px";
      const testId = latched.getAttribute("data-testid");
      marker.label.textContent = testId ? testId : latched.tagName.toLowerCase() +
        (latched.classList.length ? "." + latched.classList[0] : "");
    }

    /**
     * Tell the parent what is latched.
     *
     * Coordinates are still reported, as percentages of the document, because the review surface
     * draws a pin. They are derived from the element rather than from where the pointer happened to
     * be, so the pin sits on the thing the annotation is about even after a rebuild moves it.
     */
    function reportTarget(reason: string) {
      if (!latched) return;
      const rect = latched.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 1);
      const sourceHost = nearest(latched, "data-src");
      const sectionHost = nearest(latched, "data-section");
      const testId = latched.getAttribute("data-testid");

      window.parent.postMessage({
        type: "relay:target",
        reason: reason,
        srcRef: (sourceHost && sourceHost.getAttribute("data-src")) || "unresolved",
        srcRefIsAncestor: sourceHost !== latched,
        section: (sectionHost && sectionHost.getAttribute("data-section")) || null,
        testId: testId,
        selector: selectorFor(latched),
        describe: describe(latched),
        ancestry: ancestry(latched),
        hasChildren: elementChildren(latched).length > 0,
        hasParent: Boolean(latched.parentElement && latched.parentElement !== document.body),
        x: Math.max(0, Math.min(100, ((rect.left + rect.width / 2) / Math.max(1, window.innerWidth)) * 100)),
        y: Math.max(0, Math.min(100, ((rect.top + scrollY + rect.height / 2) / pageHeight) * 100)),
        rect: { top: rect.top + scrollY, left: rect.left, width: rect.width, height: rect.height },
      }, "*");
    }

    function latch(element: HTMLElement | null, reason: string) {
      if (!element || element === document.body || element === document.documentElement) return;
      latched = element;
      paint();
      const rect = element.getBoundingClientRect();
      if (rect.top < 40 || rect.bottom > window.innerHeight - 40) {
        element.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      reportTarget(reason);
    }

    /**
     * Move the latch through the DOM.
     *
     * "down" goes to the first element child rather than the deepest, so a hold of the key walks
     * inward one level at a time and the operator can stop at the level they meant.
     */
    function move(direction: string) {
      if (!latched) return;
      if (direction === "up") {
        const parent = latched.parentElement;
        if (parent && parent !== document.body) latch(parent, "move:up");
        return;
      }
      if (direction === "down") {
        const children = elementChildren(latched);
        if (children.length) latch(children[0], "move:down");
        return;
      }
      const parent = latched.parentElement;
      if (!parent) return;
      const siblings = elementChildren(parent);
      const index = siblings.indexOf(latched);
      if (index < 0) return;
      const next = direction === "next" ? siblings[index + 1] : siblings[index - 1];
      if (next) latch(next, "move:" + direction);
    }

    function onMessage(event: MessageEvent) {
      if (event.source !== window.parent) return;
      const data = event.data as { type?: string; enabled?: boolean; direction?: string; selector?: string };
      if (data.type === "relay:annotation-mode") {
        annotationMode = Boolean(data.enabled);
        document.body.classList.toggle("relay-annotation-mode", annotationMode);
        if (!annotationMode) { latched = null; clearHighlight(); }
        else paint();
        return;
      }
      if (data.type === "relay:link-capture") {
        linkCapture = Boolean(data.enabled);
        return;
      }
      // The operator is typing in the parent's composer but still wants to refine the selection.
      // Mirroring the shortcuts here means the same keys work wherever focus happens to be.
      if (data.type === "relay:dom-move" && data.direction) {
        move(data.direction);
        return;
      }
      if (data.type === "relay:latch" && data.selector) {
        const found = document.querySelector(data.selector);
        if (isElement(found)) latch(found, "latch:selector");
        return;
      }
      if (data.type === "relay:describe-links") {
        reportLinks();
      }
    }

    function onAnalyticsClick(event: MouseEvent) {
      const target = isElement(event.target) ? event.target.closest("[data-analytics-event]") as HTMLElement | null : null;
      if (!target) return;
      window.dataLayer.push({
        event: target.getAttribute("data-analytics-event"),
        test_id: target.getAttribute("data-testid"),
        source_ref: target.getAttribute("data-src"),
        timestamp: new Date().toISOString(),
      });
    }

    function onCaptureClick(event: MouseEvent) {
      if (!isElement(event.target)) return;

      if (annotationMode) {
        event.preventDefault();
        event.stopPropagation();
        latch(event.target, "click");
        return;
      }

      if (!linkCapture) return;
      const anchor = event.target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      // External and in-page links behave normally. Only a route change would replace the page
      // under the reviewer, and that is the one the canvas wants to handle itself.
      if (!href.startsWith("/") || href.startsWith("//")) return;
      event.preventDefault();
      event.stopPropagation();
      window.parent.postMessage({
        type: "relay:navigate",
        href: href,
        label: (anchor.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80),
        srcRef: anchor.getAttribute("data-src") || null,
        testId: anchor.getAttribute("data-testid") || null,
        section: (function () { const host = nearest(anchor, "data-section"); return host ? host.getAttribute("data-section") : null; })(),
      }, "*");
    }

    function onKeyDown(event: KeyboardEvent) {
      if (!annotationMode) return;
      const direction = event.key === "ArrowUp" ? "up"
        : event.key === "ArrowDown" ? "down"
        : event.key === "ArrowRight" ? "next"
        : event.key === "ArrowLeft" ? "previous"
        : null;
      if (direction) {
        event.preventDefault();
        move(direction);
        return;
      }
      if (event.key === "Escape") {
        latched = null;
        clearHighlight();
        window.parent.postMessage({ type: "relay:unlatch" }, "*");
      }
    }

    /**
     * Report every internal link on the page.
     *
     * The canvas draws an edge for each one. An edge nobody declared but the source actually
     * contains is the more truthful graph: the package's flow says what was intended, and this says
     * what was built.
     */
    function reportLinks() {
      const seen: Record<string, { href: string; labels: string[]; sections: string[]; count: number }> = {};
      const anchors = document.querySelectorAll("a[href]");
      for (let index = 0; index < anchors.length; index += 1) {
        const anchor = anchors[index] as HTMLAnchorElement;
        const href = anchor.getAttribute("href") || "";
        if (!href.startsWith("/") || href.startsWith("//")) continue;
        const key = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
        if (!seen[key]) seen[key] = { href: key, labels: [], sections: [], count: 0 };
        seen[key].count += 1;
        const label = (anchor.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
        if (label && seen[key].labels.indexOf(label) < 0 && seen[key].labels.length < 4) seen[key].labels.push(label);
        const host = nearest(anchor, "data-section");
        const section = host ? host.getAttribute("data-section") : null;
        if (section && seen[key].sections.indexOf(section) < 0) seen[key].sections.push(section);
      }
      const links = Object.keys(seen).map(function (key) { return seen[key]; });
      window.parent.postMessage({ type: "relay:links", links: links, path: window.location.pathname }, "*");
    }

    function reportHeight() {
      window.parent.postMessage({
        type: "relay:height",
        height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
        path: window.location.pathname,
      }, "*");
    }

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onAnalyticsClick, true);
    document.addEventListener("click", onCaptureClick, true);
    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("scroll", paint, true);
    window.addEventListener("resize", paint);

    reportHeight();
    reportLinks();
    const heightTimer = window.setInterval(reportHeight, 600);
    const observer = new ResizeObserver(function () { reportHeight(); paint(); });
    observer.observe(document.body);
    window.parent.postMessage({ type: "relay:ready", path: window.location.pathname }, "*");

    return function () {
      window.clearInterval(heightTimer);
      observer.disconnect();
      clearHighlight();
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onAnalyticsClick, true);
      document.removeEventListener("click", onCaptureClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("scroll", paint, true);
      window.removeEventListener("resize", paint);
    };
  }, []);

  return null;
}
