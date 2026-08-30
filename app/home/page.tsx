"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./screen.module.css";

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointmentError, setAppointmentError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [footerEmailValue, setFooterEmailValue] = useState("");
  const appointmentCtaRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const scrollToCollection = () => {
    document.getElementById("collection-categories")?.scrollIntoView({ behavior: "smooth" });
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setAppointmentError("");
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setAppointmentError("");
    appointmentCtaRef.current?.focus();
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue.trim()) {
      setAppointmentError("Please enter your email address.");
      return;
    }
    // In a real app, submit to server. For now, close dialog.
    closeDialog();
  };

  const handleFooterEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No navigation, just prevent default.
  };

  useEffect(() => {
    if (isDialogOpen) {
      emailInputRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeDialog();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isDialogOpen]);

  return (
    <div className={styles.page}>
      {/* Band 1: Header */}
      <header data-section="header" className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#home" className={styles.wordmark} data-analytics-event="click_header_wordmark" data-testid="header-wordmark" data-src="app/home/page.tsx#header-wordmark">
            AURELIAN &amp; CO
          </a>
          <nav className={styles.nav} aria-label="Main navigation">
            <a href="#collection-categories" data-analytics-event="click_header_collections" data-testid="header-nav-collections" data-src="app/home/page.tsx#header-nav-collections">COLLECTIONS</a>
            <a href="#heritage" data-analytics-event="click_header_heritage" data-testid="header-nav-heritage" data-src="app/home/page.tsx#header-nav-heritage">HERITAGE</a>
            <a href="#movements" data-analytics-event="click_header_movements" data-testid="header-nav-movements" data-src="app/home/page.tsx#header-nav-movements">MOVEMENTS</a>
            <a href="#atelier" data-analytics-event="click_header_atelier" data-testid="header-nav-atelier" data-src="app/home/page.tsx#header-nav-atelier">ATELIER</a>
            <a href="#journal" data-analytics-event="click_header_journal" data-testid="header-nav-journal" data-src="app/home/page.tsx#header-nav-journal">JOURNAL</a>
          </nav>
          <div className={styles.utilities}>
            <button aria-label="Search" data-analytics-event="click_header_search" data-testid="header-search" data-src="app/home/page.tsx#header-search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <button aria-label="Account" data-analytics-event="click_header_account" data-testid="header-account" data-src="app/home/page.tsx#header-account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </button>
            <button aria-label="Shopping bag" data-analytics-event="click_header_bag" data-testid="header-bag" data-src="app/home/page.tsx#header-bag">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className={styles.badge}>0</span>
            </button>
          </div>
        </div>
        <div className={styles.headerRule} />
      </header>

      {/* Band 2: Hero */}
      <section id="home" data-section="hero" className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1 className={styles.display}>
            Time,
            <br />
            measured in
            <br />
            centuries.
          </h1>
          <p className={styles.eyebrow}>
            MECHANICAL MASTERY. ENDURING DESIGN.
            <br />
            HEIRLOOMS FOR GENERATIONS.
          </p>
          <div className={styles.heroCtas}>
            <button
              className={styles.outlineButton}
              onClick={scrollToCollection}
              data-analytics-event="click_hero_explore" data-testid="hero-explore-collection" data-src="app/home/page.tsx#hero-explore-collection"
            >
              EXPLORE THE COLLECTION
            </button>
            <a href="#collection-categories" className={styles.textLink} data-analytics-event="click_hero_heritage" data-testid="hero-discover-heritage" data-src="app/home/page.tsx#hero-discover-heritage">
              DISCOVER OUR HERITAGE →
            </a>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <img src="/assets/images/hero-tourbillon.webp" alt="Rose gold tourbillon dress watch" className={styles.heroImage} />
        </div>
      </section>

      {/* Band 3: Collection Categories */}
      <section id="collection-categories" data-section="collection-categories" className={styles.collectionCategories}>
        <div className={styles.collectionGrid}>
          <article className={styles.collectionCard}>
            <img src="/assets/images/collection-classic.webp" alt="Classic collection watch" className={styles.collectionImage} />
            <h2 className={styles.cardTitle}>CLASSIC COLLECTION</h2>
            <p className={styles.body}>
              Timeless proportion.
              <br />
              Enduring elegance.
            </p>
            <p className={styles.price}>FROM £4,950</p>
          </article>
          <article className={styles.collectionCard}>
            <img src="/assets/images/collection-sport.webp" alt="Sport collection watch" className={styles.collectionImage} />
            <h2 className={styles.cardTitle}>SPORT COLLECTION</h2>
            <p className={styles.body}>
              Purpose-built. Refined.
              <br />
              Engineered to perform.
            </p>
            <p className={styles.price}>FROM £6,450</p>
          </article>
          <article className={styles.collectionCard}>
            <img src="/assets/images/collection-complications.webp" alt="Complications collection watch" className={styles.collectionImage} />
            <h2 className={styles.cardTitle}>COMPLICATIONS</h2>
            <p className={styles.body}>
              Where art meets mechanics.
              <br />
              For the connoisseur.
            </p>
            <p className={styles.price}>FROM £12,500</p>
          </article>
        </div>
      </section>

      {/* Band 4: Featured Calibre */}
      <section id="movements" data-section="featured-calibre" className={styles.featuredCalibre}>
        <div className={styles.calibreMedia}>
          <img src="/assets/images/calibre-movement.webp" alt="Calibre A&CO-01 movement macro" className={styles.calibreImage} />
        </div>
        <div className={styles.calibreSpecs}>
          <p className={styles.eyebrowMetal}>FEATURED CALIBRE</p>
          <h2 className={styles.headingInverse}>
            CALIBRE A&amp;CO-01
            <br />
            Automatic
          </h2>
          <div className={styles.specRows}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>DIAMETER</span>
              <span className={styles.specValue}>28.80 MM</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>POWER RESERVE</span>
              <span className={styles.specValue}>72 HOURS</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>FREQUENCY</span>
              <span className={styles.specValue}>28,800 VPH</span>
            </div>
          </div>
          <a href="#movements" className={styles.textLinkInverse} data-analytics-event="click_calibre_explore" data-testid="calibre-explore-movement" data-src="app/home/page.tsx#calibre-explore-movement">
            EXPLORE THE MOVEMENT →
          </a>
        </div>
      </section>

      {/* Band 5: Product Grid */}
      <section id="products" data-section="product-grid" className={styles.productGrid}>
        <div className={styles.productGridInner}>
          {[
            { img: "/assets/images/product-heritage-small-seconds.webp", name: "HERITAGE SMALL SECONDS", ref: "REF. HS501", price: "£4,950" },
            { img: "/assets/images/product-mariner-300.webp", name: "MARINER 300", ref: "REF. MR300", price: "£6,750" },
            { img: "/assets/images/product-perpetual-calendar.webp", name: "PERPETUAL CALENDAR", ref: "REF. PC01", price: "£12,800" },
            { img: "/assets/images/product-tourbillon-sovereign.webp", name: "TOURBILLON SOVEREIGN", ref: "REF. TS01", price: "£24,500" },
          ].map((product, index) => (
            <article key={index} className={styles.productCard}>
              <button
                className={styles.wishlist}
                aria-label="Add to wishlist"
                data-analytics-event={`click_product_wishlist_${index + 1}`} data-testid={`product-wishlist-${index + 1}`} data-src={`app/home/page.tsx#product-wishlist-${index + 1}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
              <img src={product.img} alt={product.name} className={styles.productImage} />
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.meta}>{product.ref}</p>
              <p className={styles.price}>{product.price}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Band 6: Atelier Story */}
      <section id="atelier" data-section="atelier-story" className={styles.atelierStory}>
        <div className={styles.atelierCopy}>
          <p className={styles.eyebrow}>THE ATELIER</p>
          <h2 className={styles.heading}>
            Crafted by hand.
            <br />
            Perfected by time.
          </h2>
          <div className={styles.atelierColumns}>
            <p className={styles.body}>
              In our atelier, tradition is not preserved behind glass—it lives in the hands that build, finish and assemble every timepiece.
            </p>
            <p className={styles.body}>
              From the shaping of bridges to the polishing of the last screw, every detail is executed with patience, pride and purpose.
            </p>
          </div>
          <a href="#atelier" className={styles.textLink} data-analytics-event="click_atelier_step_inside" data-testid="atelier-step-inside" data-src="app/home/page.tsx#atelier-step-inside">
            STEP INSIDE OUR ATELIER →
          </a>
        </div>
        <div className={styles.atelierMedia}>
          <img src="/assets/images/atelier-bench.webp" alt="Watchmaker's bench" className={styles.atelierImage} />
        </div>
      </section>

      {/* Band 7: Press Statement */}
      <section id="journal" data-section="press-statement" className={styles.pressStatement}>
        <blockquote className={styles.quote}>
          “Aurelian &amp; Co. makes the kind of watches future generations will fight over.”
        </blockquote>
        <p className={styles.meta}>— HODINKEE</p>
        <div className={styles.pressLogos}>
          <img src="/assets/logos/press-hodinkee.svg" alt="HODINKEE" className={styles.pressLogo} />
          <img src="/assets/logos/press-monochrome.svg" alt="Monochrome" className={styles.pressLogo} />
          <img src="/assets/logos/press-watchpro.svg" alt="WATCHPRO" className={styles.pressLogo} />
          <img src="/assets/logos/press-revolution.svg" alt="REVOLUTION" className={styles.pressLogo} />
          <img src="/assets/logos/press-the-rake.svg" alt="THE RAKE" className={styles.pressLogo} />
        </div>
      </section>

      {/* Band 8: Appointment */}
      <section data-section="appointment" className={styles.appointment}>
        <div className={styles.appointmentInner}>
          <img src="/assets/logos/crest.svg" alt="Aurelian & Co crest" className={styles.crest} />
          <h2 className={styles.appointmentHeading}>Private appointments, worldwide.</h2>
          <p className={styles.body}>
            Our concierge team is available to guide you through collections, bespoke commissions and private viewings.
          </p>
          <button
            ref={appointmentCtaRef}
            className={styles.outlineButton}
            onClick={openDialog}
            data-analytics-event="click_appointment_book" data-testid="appointment-book" data-src="app/home/page.tsx#appointment-book"
          >
            BOOK AN APPOINTMENT
          </button>
        </div>
      </section>

      {/* Band 9: Footer */}
      <footer data-section="footer" className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <a href="#home" className={styles.wordmarkFooter} data-analytics-event="click_footer_wordmark" data-testid="footer-wordmark" data-src="app/home/page.tsx#footer-wordmark">
              AURELIAN &amp; CO
            </a>
            <p className={styles.meta}>
              MECHANICAL MASTERY.
              <br />
              ENDURING DESIGN.
              <br />
              MADE TO BE PASSED ON.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Instagram" data-analytics-event="click_footer_instagram" data-testid="footer-instagram" data-src="app/home/page.tsx#footer-instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" data-analytics-event="click_footer_facebook" data-testid="footer-facebook" data-src="app/home/page.tsx#footer-facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" data-analytics-event="click_footer_youtube" data-testid="footer-youtube" data-src="app/home/page.tsx#footer-youtube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" data-analytics-event="click_footer_linkedin" data-testid="footer-linkedin" data-src="app/home/page.tsx#footer-linkedin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4V8h4v2a6 6 0 012-2z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>COLLECTIONS</h4>
            <ul className={styles.footerList}>
              <li><a href="#collection-categories" data-analytics-event="click_footer_classic" data-testid="footer-classic" data-src="app/home/page.tsx#footer-classic">Classic</a></li>
              <li><a href="#collection-categories" data-analytics-event="click_footer_sport" data-testid="footer-sport" data-src="app/home/page.tsx#footer-sport">Sport</a></li>
              <li><a href="#collection-categories" data-analytics-event="click_footer_complications" data-testid="footer-complications" data-src="app/home/page.tsx#footer-complications">Complications</a></li>
              <li><a href="#collection-categories" data-analytics-event="click_footer_limited" data-testid="footer-limited" data-src="app/home/page.tsx#footer-limited">Limited Editions</a></li>
              <li><a href="#collection-categories" data-analytics-event="click_footer_all_watches" data-testid="footer-all-watches" data-src="app/home/page.tsx#footer-all-watches">All Watches</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>THE HOUSE</h4>
            <ul className={styles.footerList}>
              <li><a href="#heritage" data-analytics-event="click_footer_heritage" data-testid="footer-heritage" data-src="app/home/page.tsx#footer-heritage">Heritage</a></li>
              <li><a href="#atelier" data-analytics-event="click_footer_atelier" data-testid="footer-atelier" data-src="app/home/page.tsx#footer-atelier">Atelier</a></li>
              <li><a href="#movements" data-analytics-event="click_footer_movements" data-testid="footer-movements" data-src="app/home/page.tsx#footer-movements">Movements</a></li>
              <li><a href="#quality-care" data-analytics-event="click_footer_quality" data-testid="footer-quality" data-src="app/home/page.tsx#footer-quality">Quality &amp; Care</a></li>
              <li><a href="#bespoke" data-analytics-event="click_footer_bespoke" data-testid="footer-bespoke" data-src="app/home/page.tsx#footer-bespoke">Bespoke</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>JOURNAL</h4>
            <ul className={styles.footerList}>
              <li><a href="#journal" data-analytics-event="click_footer_stories" data-testid="footer-stories" data-src="app/home/page.tsx#footer-stories">Stories</a></li>
              <li><a href="#journal" data-analytics-event="click_footer_craft" data-testid="footer-craft" data-src="app/home/page.tsx#footer-craft">Craft</a></li>
              <li><a href="#journal" data-analytics-event="click_footer_collecting" data-testid="footer-collecting" data-src="app/home/page.tsx#footer-collecting">Collecting</a></li>
              <li><a href="#journal" data-analytics-event="click_footer_news" data-testid="footer-news" data-src="app/home/page.tsx#footer-news">News &amp; Events</a></li>
              <li><a href="#journal" data-analytics-event="click_footer_interviews" data-testid="footer-interviews" data-src="app/home/page.tsx#footer-interviews">Interviews</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>SERVICE</h4>
            <ul className={styles.footerList}>
              <li><a href="#service" data-analytics-event="click_footer_client_services" data-testid="footer-client-services" data-src="app/home/page.tsx#footer-client-services">Client Services</a></li>
              <li><a href="#service" data-analytics-event="click_footer_warranty" data-testid="footer-warranty" data-src="app/home/page.tsx#footer-warranty">Warranty</a></li>
              <li><a href="#service" data-analytics-event="click_footer_care" data-testid="footer-care" data-src="app/home/page.tsx#footer-care">Care &amp; Maintenance</a></li>
              <li><a href="#service" data-analytics-event="click_footer_shipping" data-testid="footer-shipping" data-src="app/home/page.tsx#footer-shipping">Shipping &amp; Returns</a></li>
              <li><a href="#service" data-analytics-event="click_footer_faqs" data-testid="footer-faqs" data-src="app/home/page.tsx#footer-faqs">FAQs</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>STAY IN TIME</h4>
            <p className={styles.body}>Subscribe to our journal and be the first to know.</p>
            <form onSubmit={handleFooterEmailSubmit} className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Your email address"
                value={footerEmailValue}
                onChange={(e) => setFooterEmailValue(e.target.value)}
                className={styles.emailInput}
                aria-label="Email address"
                data-analytics-event="input_footer_email" data-testid="footer-email-input" data-src="app/home/page.tsx#footer-email-input"
              />
              <button type="submit" className={styles.submitArrow} aria-label="Subscribe" data-analytics-event="submit_footer_newsletter" data-testid="footer-newsletter-submit" data-src="app/home/page.tsx#footer-newsletter-submit">
                →
              </button>
            </form>
            <h4 className={styles.footerHeading}>BOUTIQUES</h4>
            <p className={styles.meta}>
              LONDON · GENEVA · NEW YORK
              <br />
              HONG KONG · TOKYO
            </p>
          </div>
        </div>
        <div className={styles.legalStrip}>
          <span className={styles.legalText}>© AURELIAN &amp; CO 2024</span>
          <div className={styles.legalLinks}>
            <a href="#privacy" data-analytics-event="click_footer_privacy" data-testid="footer-privacy" data-src="app/home/page.tsx#footer-privacy">PRIVACY POLICY</a>
            <a href="#terms" data-analytics-event="click_footer_terms" data-testid="footer-terms" data-src="app/home/page.tsx#footer-terms">TERMS &amp; CONDITIONS</a>
            <a href="#cookies" data-analytics-event="click_footer_cookies" data-testid="footer-cookies" data-src="app/home/page.tsx#footer-cookies">COOKIE POLICY</a>
          </div>
          <div className={styles.paymentMarks}>
            <span>VISA</span>
            <span>Mastercard</span>
            <span>AMEX</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </footer>

      {/* Appointment Dialog */}
      {isDialogOpen && (
        <div className={styles.dialogOverlay} onClick={closeDialog}>
          <div
            className={styles.dialog}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.dialogClose} onClick={closeDialog} aria-label="Close dialog" data-analytics-event="click_appointment_close" data-testid="appointment-close" data-src="app/home/page.tsx#appointment-close">
              ×
            </button>
            <h2 id="appointment-dialog-title" className={styles.dialogTitle}>Book an Appointment</h2>
            <form onSubmit={handleAppointmentSubmit} className={styles.appointmentForm}>
              <label htmlFor="appointment-email" className={styles.visuallyHidden}>Email address</label>
              <input
                id="appointment-email"
                type="email"
                placeholder="Your email address"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                ref={emailInputRef}
                className={styles.emailInput}
                data-analytics-event="input_appointment_email" data-testid="appointment-email-input" data-src="app/home/page.tsx#appointment-email-input"
              />
              {appointmentError && <p className={styles.errorMessage} role="alert">{appointmentError}</p>}
              <button type="submit" className={styles.outlineButton} data-analytics-event="submit_appointment_form" data-testid="appointment-submit" data-src="app/home/page.tsx#appointment-submit">
                REQUEST APPOINTMENT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}