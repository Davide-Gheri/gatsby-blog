import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import removeMd from 'remove-markdown';
import { ArticleNode } from '../../interfaces';
import {
  CardWrapper,
  CardImage,
  CardImageLink,
  CardContent,
  CardContentLink,
  CardExcerpt,
  CardTitle,
  CardTags,
  CardFooter, AuthorList, AuthorListItem, AuthorNameTooltip, AvatarLink, AuthorAvatar,
} from './common';
import { media } from '../../utils/styled';

const HorCardWrapper = styled(CardWrapper)`
  ${media.md`
    flex: 1 1 100%;
    flex-direction: row;
  `};
`;

const HorCardImageLink = styled(CardImageLink)`
  ${media.md`
    flex: 1 1 auto;
    border-radius: 5px 0 0 5px;
  `}
`;

const HorCardImage = styled(CardImage)`
  ${media.md`
    position: absolute;
    width: 100%;
    height: 100%;
  `}
`;

const HorCardContent = styled(CardContent)`
  ${media.md`
    flex: 0 1 357px;
  `};
`;

const HorCardContentLink = styled(CardContentLink)`
  ${media.md`
    padding: 30px 40px 0;
  `};
`;

const HorCardTitle = styled(CardTitle)`
  ${media.md`
    font-size: 2.6rem;
  `};
`;

const HorCardExcerpt = styled(CardExcerpt)`
  ${media.md`
    font-size: 1.8rem;
    line-height: 1.55em;
  `};
`;

const HorCardFooter = styled(CardFooter)`
  ${media.md`
    padding: 0 40px 30px;
  `};
`;

export const HorizontalCard = (post: ArticleNode) => {
  const path = `/${post.category ? post.category.slug : 'articles'}/${post.slug}`;
  return (
    <HorCardWrapper>
      <HorCardImageLink to={path}>
        <HorCardImage>
          <Img alt={post.title} style={{height: '100%'}} fluid={post.image.childImageSharp.fluid}/>
        </HorCardImage>
      </HorCardImageLink>
      <HorCardContent>
        <HorCardContentLink to={path}>
          <header>
            {post.category && <CardTags>{post.category.title}</CardTags>}
            <HorCardTitle>{post.title}</HorCardTitle>
          </header>
          <HorCardExcerpt>
            <p>{post.content && removeMd(post.content).substring(0, 160)}</p>
          </HorCardExcerpt>
        </HorCardContentLink>
        <HorCardFooter>
          {post.user && (
            <AuthorList>
              <AuthorListItem>
                <AuthorNameTooltip>
                  {post.user.username}
                </AuthorNameTooltip>
                <AvatarLink to="/">
                  <AuthorAvatar />
                </AvatarLink>
              </AuthorListItem>
            </AuthorList>
          )}
        </HorCardFooter>
      </HorCardContent>
    </HorCardWrapper>
  );
};
