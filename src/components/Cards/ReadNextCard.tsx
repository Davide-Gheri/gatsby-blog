import React from 'react';
import styled from 'styled-components';
import { graphql, Link, StaticQuery } from 'gatsby';
import { Infinity } from '../icons';

const ReadNextCardWrapper = styled.article`
  position: relative;
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 40px;
  padding: 25px;
  color: #fff;
  background: #15171A center center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  :before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    background: linear-gradient(135deg, rgba(0,40,60,0.8) 0%,rgba(0,20,40,0.7) 100%);
    border-radius: 5px;
    backdrop-filter: blur(2px);
  }
`;

const ReadNextCardHeader = styled.header`
  position: relative;
  z-index: 50;
  padding-top: 20px;
  text-align: center;
`;

const ReadNextCardHeaderSitetitle = styled.small`
  display: block;
  font-size: 1.3rem;
  line-height: 1.3em;
  opacity: 0.8;
`;

const ReadNextCardHeaderTitle = styled.h3`
  margin: 0;
  padding: 0 20px;
  color: #fff;
  font-size: 3rem;
  line-height: 1.2em;
  letter-spacing: 1px;
  a {
    color: #fff;
    font-weight: 300;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
`;

const ReadNextDivider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 80px;
  svg {
    width: 40px;
    fill: transparent;
    stroke: #fff;
    stroke-width: 0.5px;
    stroke-opacity: 0.65;
  }
`;

const ReadNextCardContent = styled.div`
  position: relative;
  z-index: 50;
  flex-grow: 1;
  display: flex;
  font-size: 1.7rem;
  ul {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    list-style: none;
  }
  li {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    line-height: 1.25em;
    font-weight: 200;
    letter-spacing: -0.5px;
  }
  li a {
    display: block;
    padding: 20px 0;
    border-bottom: rgba(255, 255, 255, 0.3) 1px solid;
    color: #fff;
    font-weight: 500;
    vertical-align: top;
    transition: opacity 0.3s ease;
  }
  li:first-of-type a {
    padding-top: 10px;
  }
  li a:hover {
    opacity: 1;
  }
`;

const ReadNextCardFooter = styled.footer`
  position: relative;
  margin: 15px 0 3px 0;
  text-align: center;
  a {
    color: #fff;
  }
`;

export const ReadNextCard = (props: any) => (
  <StaticQuery query={graphql`
    query ReadNextCardQuery {
        site {
            siteMetadata {
                title
            }
        }
        allStrapiArticle(
            filter: {published: {eq: true}}
            sort: {fields: [createdAt], order: DESC}
        ) {
            edges {
                node {
                    id
                    title
                    slug
                    category {
                        id
                    }
                }
            }
        }
    }
  `} render={(data: any) => {
    const relatedPosts = data.allStrapiArticle ? data.allStrapiArticle.edges.filter((n: any) => n.node.category.id === props.category.id).map((n: any) => n.node) : [];
    console.log(relatedPosts)
    return (
      <ReadNextCardWrapper>
        <ReadNextCardHeader>
          <ReadNextCardHeaderSitetitle>
            &mdash; {data.site.siteMetadata.title} &mdash;
          </ReadNextCardHeaderSitetitle>
          <ReadNextCardHeaderTitle>
            <Link to={`/`}>sss</Link>
          </ReadNextCardHeaderTitle>
        </ReadNextCardHeader>
        <ReadNextDivider>
          <Infinity />
        </ReadNextDivider>
        <ReadNextCardContent>
          <ul>
            {relatedPosts.slice(0, 3).map((post: any) => {
              console.log(post);
              return (
                <li key={post.id}>
                  <Link to={post.slug}>{post.title}</Link>
                </li>
              );
            })}
          </ul>
        </ReadNextCardContent>
        <ReadNextCardFooter>
          {/*<Link to={`/tags/${_.kebabCase(props.tags[0])}/`}>*/}
            {/*{props.relatedPosts.totalCount > 1 &&*/}
            {/*`See all ${props.relatedPosts.totalCount} posts`}*/}
            {/*{props.relatedPosts.totalCount === 1 && `1 post`}*/}
            {/*{props.relatedPosts.totalCount === 0 && `No posts`} →*/}
          {/*</Link>*/}
        </ReadNextCardFooter>
      </ReadNextCardWrapper>
    );
  }}/>
);
