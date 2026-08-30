"use client";

import styles from "./screen.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Band 1: Navigation */}
      <nav className={styles.band1} data-section="band-1">
        <div className={styles.navBrand}>
          <a href="#" data-analytics-event="nav_click" data-testid="nav-brand" data-src="app/home/page.tsx#home">
            AURELIAN & CO
          </a>
        </div>
        <ul className={styles.navMenu}>
          <li>
            <a href="#" data-analytics-event="nav_click" data-testid="nav-collections" data-src="app/home/page.tsx#home">
              COLLECTIONS
            </a>
          </li>
          <li>
            <a href="#" data-analytics-event="nav_click" data-testid="nav-heritage" data-src="app/home/page.tsx#home">
              HERITAGE
            </a>
          </li>
          <li>
            <a href="#" data-analytics-event="nav_click" data-testid="nav-movements" data-src="app/home/page.tsx#home">
              MOVEMENTS
            </a>
          </li>
          <li>
            <a href="#" data-analytics-event="nav_click" data-testid="nav-atelier" data-src="app/home/page.tsx#home">
              ATELIER
            </a>
          </li>
          <li>
            <a href="#" data-analytics-event="nav_click" data-testid="nav-journal" data-src="app/home/page.tsx#home">
              JOURNAL
            </a>
          </li>
        </ul>
        <div className={styles.navIcons}>
          <button
            data-analytics-event="icon_click" data-testid="icon-search" data-src="app/home/page.tsx#home"
            aria-label="Search"
          >
            🔍
          </button>
          <button
            data-analytics-event="icon_click" data-testid="icon-profile" data-src="app/home/page.tsx#home"
            aria-label="Profile"
          >
            👤
          </button>
          <button
            data-analytics-event="icon_click" data-testid="icon-cart" data-src="app/home/page.tsx#home"
            aria-label="Cart"
          >
            🛒
          </button>
        </div>
      </nav>

      {/* Band 2: Hero */}
      <section className={styles.band2} data-section="band-2">
        <div className={styles.heroText}>
          <h1>Time, measured in centuries.</h1>
          <p>MECHANICAL MASTERY. ENDURING DESIGN. HEIRLOOMS FOR GENERATIONS.</p>
          <div className={styles.heroButtons}>
            <button
              data-analytics-event="cta_click" data-testid="cta-explore-collection" data-src="app/home/page.tsx#home"
            >
              EXPLORE THE COLLECTION
            </button>
            <button
              data-analytics-event="cta_click" data-testid="cta-discover-heritage" data-src="app/home/page.tsx#home"
            >
              DISCOVER OUR HERITAGE →
            </button>
          </div>
        </div>
        <div
          className={styles.heroImage}
          aria-label="Luxury watch with gold case and white dial"
        ></div>
      </section>

      {/* Band 3: 3-up cards */}
      <section className={styles.band3} data-section="band-3">
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div
              className={styles.cardImage}
              aria-label="Watch with black leather strap"
            ></div>
            <h3>CLASSIC COLLECTION</h3>
            <p>Timeless proportion. Enduring elegance.</p>
            <span>FROM £4,950</span>
          </div>
          <div className={styles.card}>
            <div
              className={styles.cardImage}
              aria-label="Watch with silver metal strap"
            ></div>
            <h3>SPORT COLLECTION</h3>
            <p>Purpose-built. Refined. Engineered to perform.</p>
            <span>FROM £6,450</span>
          </div>
          <div className={styles.card}>
            <div
              className={styles.cardImage}
              aria-label="Watch with gold leather strap"
            ></div>
            <h3>COMPLICATIONS</h3>
            <p>Where art meets mechanics. For the connoisseur.</p>
            <span>FROM £12,500</span>
          </div>
        </div>
      </section>

      {/* Band 4: Movement split */}
      <section className={styles.band4} data-section="band-4">
        <div
          className={styles.movementImage}
          aria-label="Close-up of watch movement with gears"
        ></div>
        <div className={styles.movementText}>
          <h4>FEATURED CALIBRE</h4>
          <h2>CALIBRE A&CO-01 Automatic</h2>
          <ul>
            <li>DIAMETER 28.80 MM</li>
            <li>POWER RESERVE 72 HOURS</li>
            <li>FREQUENCY 28,800 VPH</li>
          </ul>
          <button
            data-analytics-event="cta_click" data-testid="cta-explore-movement" data-src="app/home/page.tsx#home"
          >
            EXPLORE THE MOVEMENT
          </button>
        </div>
      </section>

      {/* Band 5: 4-up cards */}
      <section className={styles.band5} data-section="band-5">
        <div className={styles.cardGrid4}>
          <div className={styles.card}>
            <div
              className={styles.cardImage}
              aria-label="Watch with black leather strap"
            ></div>
            <h3>CLASSIC COLLECTION</h3>
            <p>Timeless proportion. Enduring elegance.</p>
            <span>FROM £4,950</span>
          </div>
          <div className={styles.card}>
            <div
              className={styles.cardImage}
              aria-label="Watch with silver metal strap"
            ></div>
            <h3>SPORT COLLECTION</h3>
            <p>Purpose-built. Refined. Engineered to perform.</p>
            <span>FROM £6,450</span>
          </div>
          <div className={styles.card}>
            <div
              className={styles.cardImage}
              aria-label="Watch with gold leather strap"
            ></div>
            <h3>COMPLICATIONS</h3>
            <p>Where art meets mechanics. For the connoisseur.</p>
            <span>FROM £12,500</span>
          </div>
          <div className={styles.card}>
            <div
              className={styles.cardImage}
              aria-label="Watch with blue dial and steel bracelet"
            ></div>
            <h3>PILOT COLLECTION</h3>
            <p>Adventure-ready. Precision in motion.</p>
            <span>FROM £8,200</span>
          </div>
        </div>
      </section>

      {/* Band 6: 3 unequal content groups */}
      <section className={styles.band6} data-section="band-6">
        <div className={styles.groupWide}>
          <h3>Our Heritage</h3>
          <p>Founded in 1835, Aurelian & Co has been crafting timepieces that transcend generations.</p>
        </div>
        <div className={styles.groupMedium}>
          <h3>Our Craft</h3>
          <p>Each movement is assembled by hand in our atelier.</p>
        </div>
        <div className={styles.groupNarrow}>
          <h3>Our Promise</h3>
          <p>Lifetime warranty.</p>
        </div>
      </section>

      {/* Band 7: Single column */}
      <section className={styles.band7} data-section="band-7">
        <blockquote>"Time is the most valuable thing a man can spend."</blockquote>
      </section>

      {/* Band 8: 4 unequal content groups */}
      <section className={styles.band8} data-section="band-8">
        <div className={styles.groupWide}>
          <h3>Our Heritage</h3>
          <p>Founded in 1835, Aurelian & Co has been crafting timepieces that transcend generations.</p>
        </div>
        <div className={styles.groupMedium}>
          <h3>Our Craft</h3>
          <p>Each movement is assembled by hand in our atelier.</p>
        </div>
        <div className={styles.groupMedium}>
          <h3>Our Design</h3>
          <p>Timeless aesthetics meet modern engineering.</p>
        </div>
        <div className={styles.groupNarrow}>
          <h3>Our Promise</h3>
          <p>Lifetime warranty.</p>
        </div>
      </section>

      {/* Band 9: 6 unequal content groups */}
      <section className={styles.band9} data-section="band-9">
        <div className={styles.groupWide}>
          <h3>Our Heritage</h3>
          <p>Founded in 1835, Aurelian & Co has been crafting timepieces that transcend generations.</p>
        </div>
        <div className={styles.groupMedium}>
          <h3>Our Craft</h3>
          <p>Each movement is assembled by hand in our atelier.</p>
        </div>
        <div className={styles.groupNarrow}>
          <h3>Our Promise</h3>
          <p>Lifetime warranty.</p>
        </div>
        <div className={styles.groupWide}>
          <h3>Our Design</h3>
          <p>Timeless aesthetics meet modern engineering.</p>
        </div>
        <div className={styles.groupMedium}>
          <h3>Our Materials</h3>
          <p>Only the finest metals and sapphire crystals.</p>
        </div>
        <div className={styles.groupNarrow}>
          <h3>Our Service</h3>
          <p>Worldwide concierge.</p>
        </div>
      </section>
    </div>
  );
}