import React from 'react';
import { graphql } from 'gatsby';
import { ArticlesQuery } from '../interfaces';
import Layout from '../components/layout';
import { BlockDots, CardsWrapper } from '../components/Styled';
import { HorizontalCard, VerticalCard } from '../components/Cards';
import { withInfiniteScroll, WithScrollProps } from '../components/withInfiniteScroll';

const IndexPage: React.FunctionComponent<WithScrollProps<ArticlesQuery>> = (props: WithScrollProps<ArticlesQuery>) => {
  const posts = props.data.allStrapiArticle.edges.map(n => n.node);
  return (
    <Layout isHome={true}>
      <CardsWrapper>
        {posts.slice(0, props.toShow).map((post, k) => (
          ((k % 5 === 0 || k === 0) ? <HorizontalCard key={k} {...post}/> : <VerticalCard key={k} {...post}/>)
        ))}
      </CardsWrapper>
      {props.loading && (
        <BlockDots/>
      )}
    </Layout>
  );
};

export default withInfiniteScroll<ArticlesQuery>(IndexPage, 'allStrapiArticle.edges');

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle(
      filter: {published: {eq: true}}
      sort: {fields: [createdAt], order: DESC}
    ) {
      edges {
        node {
          title
          slug
          id
          published
          content
          createdAt
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          category {
            id
            title
            slug
          }
          user {
            id
            username
          }
        }
      }
    }
  }
`;
