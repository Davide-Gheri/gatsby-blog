import React from 'react';
import styled from 'styled-components';
import { media } from '../../utils/styled';
import { graphql, Link, StaticQuery } from 'gatsby';
import { SIteMetedataQuery } from '../../interfaces';

const FooterWrapper = styled.footer`
  position: relative;
  color: #fff;
  background: #000;
  padding: 20px 4vw 60px;
`;

const FooterContent = styled.div`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  a {
    color: rgba(255, 255, 255, 0.7);
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
  }
  ${media.md`
    flex-direction: row;
  `}
`;

const FooterNav = styled.nav`
  display: flex;
  a {
    position: relative;
    margin-left: 20px;
  }
  a:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }
  a:first-of-type:before {
    display: none;
  }
  a:first-child {
    margin-left: 0;
  }
  ${media.md`
    a:first-child {
      margin-left: 20px;
    }
  `}
`;

const Footer = () => (
  <StaticQuery query={graphql`
      query SiteFooterQuery {
        site {
          siteMetadata {
            title
            facebook
            twitter
          }
        }
      }
  `} render={(data: SIteMetedataQuery) => {
    const config = data.site.siteMetadata;
    return (
      <FooterWrapper>
        <FooterContent>
          <section><Link to="/">{config.title}</Link></section>
          <FooterNav>
            <Link to="/">Latest posts</Link>
            {config.facebook && (
              <a href={config.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
            {config.twitter && (
              <a href={config.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
            <a href="https://davidegheri.com" target="_blank" rel="noopener noreferrer">
              DavideGheri
            </a>
            <Link to="/rss.xml">RSS</Link>
          </FooterNav>
        </FooterContent>
      </FooterWrapper>
    );
  }}/>
);

export default Footer;
