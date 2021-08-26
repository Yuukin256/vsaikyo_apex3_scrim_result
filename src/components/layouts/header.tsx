import { Link } from 'gatsby';
import React from 'react';

const Header: React.VFC<{ siteTitle: string }> = ({ siteTitle = '' }) => (
  <header
    id="top"
    style={{
      background: `#6d00e2`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0, textAlign: 'center' }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
