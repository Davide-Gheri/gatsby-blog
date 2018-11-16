import React from 'react';
import { graphql } from 'gatsby';
import { ArticleEdges, CategoryNode } from '../interfaces';
import Layout from '../components/layout';
import { BlockDots, Container } from '../components/Styled';
import { Category, ArticlesFeed } from '../components/Category';
import Helmet from 'react-helmet';
import { HorizontalCard, VerticalCard } from '../components/Cards';
import { withInfiniteScroll, WithScrollProps } from '../components/withInfiniteScroll';

interface CategoryTemplateProps {
  data: {
    strapiCategory: CategoryNode;
    allStrapiArticle: {
      edges: ArticleEdges;
    }
  };
}

const CategoryTemplate: React.FunctionComponent<WithScrollProps<CategoryTemplateProps>> = (props: WithScrollProps<CategoryTemplateProps>) => {
  const category = props.data.strapiCategory;
  const posts = props.data.allStrapiArticle ? props.data.allStrapiArticle.edges.map(n => n.node) : [];
  return (
    <Layout isHome={false} isHeaderBig={true} headerData={{
      title: category.title,
      description: category.description,
    }}>
      <Helmet>
        <title>{category.title}</title>
      </Helmet>
      <Container>
        <Category>
          <ArticlesFeed>
            {posts.slice(0, props.toShow).map((post, k) => (
              ((k % 5 === 0 || k === 0) ? <HorizontalCard key={k} {...post}/> : <VerticalCard key={k} {...post}/>)
            ))}
          </ArticlesFeed>
          {props.loading && (
            <BlockDots/>
          )}
        </Category>
      </Container>
    </Layout>
  );
};

export default withInfiniteScroll(CategoryTemplate, 'allStrapiArticle.edges');

export const query = graphql`
    query CategoryTemplate($id: String!) {
      strapiCategory(id: { eq: $id }) {
        title
        description
        createdAt(formatString: "LL")
      }
      allStrapiArticle(
        filter: {category: {id: {eq: $id}}, published: {eq: true}}
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
