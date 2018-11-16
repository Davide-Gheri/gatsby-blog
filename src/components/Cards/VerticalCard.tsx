import React from 'react';
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
  CardFooter,
  AuthorList,
  AuthorListItem,
  AuthorNameTooltip,
  AuthorAvatar,
  AvatarLink,
} from './common';

export const VerticalCard = (post: ArticleNode) => {
  const path = `/${post.category ? post.category.slug : 'articles'}/${post.slug}`;
  return (
    <CardWrapper>
      <CardImageLink to={path}>
        <CardImage>
          <Img alt={post.title} style={{height: '100%'}} fluid={post.image.childImageSharp.fluid}/>
        </CardImage>
      </CardImageLink>
      <CardContent>
        <CardContentLink to={path}>
          <header>
            {post.category && <CardTags>{post.category.title}</CardTags>}
            <CardTitle>{post.title}</CardTitle>
          </header>
          <CardExcerpt>
            <p>{post.content && removeMd(post.content).substring(0, 160)}</p>
          </CardExcerpt>
        </CardContentLink>
        <CardFooter>
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
        </CardFooter>
      </CardContent>
    </CardWrapper>
  );
};
