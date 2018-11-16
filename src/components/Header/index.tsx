import React from 'react';
import styled from 'styled-components';
import { SiteTitle, SiteDescription } from '../Styled';
import { graphql, StaticQuery } from 'gatsby';
import { SiteNav } from './SiteNav';

const HeaderWrapper = styled('header')<{isHome: boolean}>`
  position: relative;
  padding: 12px 0;
  color: #fff;
  background: #0a0b0c no-repeat center center;
  background-size: cover;
  position: relative;
  padding: 12px 4vw;
`;

const HeaderInner = styled.div`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10vw 4vw;
  min-height: 200px;
  max-height: 450px;
  text-align: center;
`;

const Header = ({isHome = false, isHeaderBig = false, headerData = {}}: {isHome: boolean; isHeaderBig: boolean; headerData: {title?: string; description?: string}}) => (
  <StaticQuery query={graphql`
    query SiteHeaderQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      cover: file(relativePath: {eq: "blog-cover.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logo: file(relativePath: {eq: "logo.png"}) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `} render={(data: any) => {
    const siteData = data.site.siteMetadata;
    return (
      <HeaderWrapper isHome={isHome} style={isHome ? {backgroundImage: `url(${data.cover.childImageSharp.fluid.src})`} : {}}>
        <HeaderInner>
          {isHeaderBig && <SiteNav isHome={isHome}/>}
          {(isHome || isHeaderBig) && (
            <HeaderContent>
              <SiteTitle>
                {isHome ?
                  data.logo ? (
                    <img style={{maxHeight: 45}} src={data.logo.childImageSharp.fixed.src} alt={siteData.title}/>
                  ) : siteData.title
                  : headerData.title
                }
              </SiteTitle>
              <SiteDescription>{isHome ? siteData.description : headerData.description || ''}</SiteDescription>
            </HeaderContent>
          )}
          {!isHeaderBig && <SiteNav isHome={isHome}/>}
        </HeaderInner>
      </HeaderWrapper>
    );
  }}/>
);

export default Header;
