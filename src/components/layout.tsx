import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Header from './Header';
import Footer from './Footer';

import './layout.css';

const Layout = ({ children, isHome = false, isHeaderBig = false, headerData = {} }: any) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header isHome={isHome} isHeaderBig={isHeaderBig} headerData={headerData}/>
        <main style={{margin: '0 auto', width: '100%', maxWidth: '1040px', padding: '0 4vw'}}>
          {children}
        </main>
        <Footer/>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
