import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { media } from '../../utils/styled';
import { graphql, Link, StaticQuery } from 'gatsby';
import { SocialLink } from '../Styled';
import { SiteNavQuery } from '../../interfaces';
import { Facebook, Twitter } from '../icons';
import { SiteNavLogo } from './SiteNavLogo';

const Nav = styled('nav')<{isHome: boolean}>`
  position:relative;
  z-index: 300;
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  overflow-y: hidden;
  height: 40px;
  font-size: 1.2rem;
  ${props => props.isHome && css`
    //top: -70px;
    ${media.md`
      top: 0px;
    `}
  `};
`;

const NavList = styled.ul`
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;
`;

const NavListItem = styled.li`
  display: block;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  line-height: 1.6em;
`;

const NavListItemLink = styled(Link)`
  display: block;
  margin: 0;
  padding: 10px 12px;
  color: #fff;
  opacity: 0.8;
  :hover {
    text-decoration: none;
    opacity: 1;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-scrolling: touch;
  letter-spacing: 0.4px;
  white-space: nowrap;
  margin-right: 0;
  padding-left: 4vw;
  ${media.md`
    margin-right: 10px;
    padding-left: 0;
  `}
`;

const NavRight = styled.div`
  flex-shrink: 0;
  display: none;
  align-items: center;
  height: 40px;
  ${media.md`
    display: flex;
  `}
`;

const Socials = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  a:last-of-type {
    padding-right: 20px;
  }
`;

const SubscribeButton = styled.a`
  display: block;
  padding: 4px 10px;
  border: #fff 1px solid;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1em;
  border-radius: 10px;
  opacity: 0.8;
  :hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }
`;

export interface SiteNavProps {
  isHome?: boolean;
}

export interface SiteNavState {
  isOpen: boolean;
}

export class SiteNav extends PureComponent<SiteNavProps, SiteNavState> {
  sub = React.createRef<any>();

  state: SiteNavState = {
    isOpen: false,
  };

  openModal = () => {
    if (this.sub.current) {
      this.sub.current.open();
    }
  };

  render() {
    const { isHome = false } = this.props;
    return(
      <StaticQuery query={graphql`
        query SiteNavQuery {
          site {
            siteMetadata {
              title
              facebook
              twitter
              showSubscribe
            }
          }
          strapiMenu(position: {eq: "header"}) {
            name
            items {
              slug
              title
            }
          }
        }
      `} render={(data: SiteNavQuery) => {
        const config = data.site.siteMetadata;
        const menuItems = data.strapiMenu ? data.strapiMenu.items || [] : [];
        return (
          <Nav isHome={isHome}>
            <NavLeft>
              {!isHome && <SiteNavLogo title={config.title as string}/>}
              <NavList role="menu">
                <NavListItem role="menuitem">
                  <NavListItemLink to="/">Home</NavListItemLink>
                </NavListItem>
                {menuItems.map((item, k) => (
                  <NavListItem role="menuitem" key={k}>
                    <NavListItemLink to={item.slug}>{item.title}</NavListItemLink>
                  </NavListItem>
                ))}
              </NavList>
            </NavLeft>
            <NavRight>
              <Socials>
                {config.facebook && (
                  <SocialLink
                    target="_blank"
                    title="Facebook"
                    rel="noopener noreferrer"
                    href={config.facebook}><Facebook/></SocialLink>
                )}
                {config.twitter && (
                  <SocialLink
                    target="_blank"
                    title="Twitter"
                    rel="noopener noreferrer"
                    href={config.twitter}><Twitter/></SocialLink>
                )}
              </Socials>
              {config.showSubscribe && (
                <SubscribeButton onClick={this.openModal}>Subscribe</SubscribeButton>
              )}
            </NavRight>
          </Nav>
        );
      }}/>
    );
  }
}
