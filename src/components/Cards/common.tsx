import React from 'react';
import styled from 'styled-components';
import { graphql, Link, StaticQuery } from 'gatsby';
import { media } from '../../utils/styled';

export const CardWrapper = styled.article`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 40px;
  min-height: 300px;
  background: #fff center center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  transition: all .5s ease;
  :hover {
    box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
    transition: all 0.4s ease;
    transform: translate3D(0, -1px, 0) scale(1.02);
  }
`;

export const CardImageLink = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

export const CardImage = styled.aside`
  width: auto;
  height: 200px;
  background: #f2f2f2 no-repeat center center;
  background-size: cover;
`;

export const CardContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardContentLink = styled(Link)`
  position: relative;
  flex-grow: 1;
  display: block;
  padding: 25px 25px 0;
  color: #222222;
  :hover {
    text-decoration: none;
  }
`;

export const CardTags = styled.span`
  display: block;
  margin-bottom: 4px;
  color: #738a94;
  font-size: 1.2rem;
  line-height: 1.15em;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const CardTitle = styled.h2`
  //font-family: Georgia, serif;
  margin: 0 0 0.5em 0;
`;

export const CardExcerpt = styled.section`
  font-family: Georgia, serif;
  p {
    margin: 0 0 1.5em 0;
  }
`;

export const CardFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 25px 25px;
`;

export const AuthorList = styled.ul`
  display: flex;
  flex-wrap: wrap-reverse;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const AuthorNameTooltip = styled.div`
  position: absolute;
  bottom: 105%;
  z-index: 999;
  display: none;
  padding: 2px 8px;
  color: white;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
  white-space: nowrap;
  background: #15171A;
  border-radius: 3px;
  box-shadow: rgba(39, 44, 49, 0.08) 0 12px 26px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transform: translateY(6px);
  pointer-events: none;

  ${media.md`
    display: block;
  `}
`;

export const AuthorListItem = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  :hover ${AuthorNameTooltip} {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AvatarLink = styled(Link)`
  display: block;
  overflow: hidden;
  margin: 0 -5px;
  width: 34px;
  height: 34px;
  border: #fff 2px solid;
  border-radius: 100%;
`;

export const AuthorAvatarImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
`;

export const AuthorAvatar = () => (
  <StaticQuery query={graphql`
    query AuthorAvatarQuery {
        avatar: file(relativePath: {eq: "avatar.png"}) {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
    }
  `} render={(data: any) => (
    <AuthorAvatarImg src={data.avatar.childImageSharp.fixed.src}/>
  )}/>
);
