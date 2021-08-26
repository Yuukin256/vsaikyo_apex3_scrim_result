/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import FabToTop from '../blocks/fabToTop';
import Header from './header';
import './layout.css';

const Layout: React.VFC<{ children: React.ReactNode }> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#6d00e2',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <FabToTop />
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © 2021 Yuukin256 (<a href="https://twitter.com/Yuukin256">@Yuukin256</a>), Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
