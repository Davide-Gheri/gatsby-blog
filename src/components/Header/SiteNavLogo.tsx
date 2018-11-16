import React from 'react';
import styled from 'styled-components';
import { graphql, Link, StaticQuery } from 'gatsby';

const LogoLink = styled(Link)`
  flex-shrink: 0;
  display: block;
  margin-right: 24px;
  padding: 11px 0;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1em;
  font-weight: bold;
  letter-spacing: -0.5px;
  :hover {
    text-decoration: none;
  }
  img {
    display: block;
    width: auto;
    height: 21px;
  }
`;

export const SiteNavLogo = ({title}: {title: string}) => (
  <StaticQuery query={graphql`
    query HeaderLogoQuery {
      logo: file(relativePath: {eq: "logo.png"}) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `} render={(data: any) => (
    <LogoLink to="/">
      {data.logo ? (
        <img src={data.logo.childImageSharp.fixed.src} alt={title}/>
      ) : title}
    </LogoLink>
  )}/>
);
