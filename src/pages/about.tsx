import React from 'react';
import Layout from '../components/layout';
import { Container } from '../components/Styled';
import { Article, ArticleHeader, ArticleTitle } from '../components/Article';
import ArticleContent from '../components/ArticleContent';

const AboutPage = () => (
  <Layout>
    <Container>
      <Article noImage={true}>
        <ArticleHeader>
          <ArticleTitle>About</ArticleTitle>
        </ArticleHeader>
        <ArticleContent content={''}/>
      </Article>
    </Container>
  </Layout>
);

export default AboutPage;
