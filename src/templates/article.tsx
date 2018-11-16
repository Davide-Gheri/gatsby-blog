import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import ArticleContent from '../components/ArticleContent';
import { ArticleQuery } from '../interfaces';
import { Container } from '../components/Styled';
import {
  Article,
  ArticleHeader,
  ArticleMeta,
  ArticleMetaDate,
  DateDivider,
  CategoryLink,
  ArticleTitle,
  ArticleFooter,
  ArticleImage,
} from '../components/Article';

const ArticleTemplate = ({ data }: ArticleQuery) => {
  const article = data.strapiArticle;
  return (
    <Layout headerTransparent={true}>
      <Helmet>
        <title>{article.title}</title>
      </Helmet>
      <Container>
        <Article>
          <ArticleHeader>
            <ArticleMeta>
              <ArticleMetaDate>{article.createdAt}</ArticleMetaDate>
              {article.category && (
                <>
                  <DateDivider>/</DateDivider>
                  <CategoryLink to={`/${article.category.slug}`}>{article.category.title}</CategoryLink>
                </>
              )}
            </ArticleMeta>
            <ArticleTitle>{article.title}</ArticleTitle>
          </ArticleHeader>
          <ArticleImage>
            <Img style={{height: '100%'}}
                 fluid={article.image.childImageSharp.fluid}/>
          </ArticleImage>
          <ArticleContent content={article.content || ''}/>
          <ArticleFooter>
          </ArticleFooter>
        </Article>
      </Container>
    </Layout>
  );
};

export default ArticleTemplate;

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }, published: { eq: true }) {
      title
      content
      createdAt(formatString: "LL")
      image {
        childImageSharp {
          id
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
    }
  }
`;
