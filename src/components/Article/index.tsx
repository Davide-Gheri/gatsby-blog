import styled, { css } from 'styled-components';
import { media } from '../../utils/styled';
import { Link } from 'gatsby';
import { Content } from '../Styled';

export const Article = styled('article')<{noImage?: boolean}>`
  position: relative;
  z-index: 50;
  ${props => props.noImage && css`
    ${Content} {
      padding-top: 0;
      :before, :after {
        display: none;
      }
    }
  `}
`;

export const ArticleHeader = styled.header`
  margin: 0 auto;
  max-width: 1040px;
  text-align: center;
  padding: 14vw 3vw 10vw;
  ${media.sm`
    padding: 6vw 3vw 3vw;
  `};
`;

export const ArticleMeta = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #738a94;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.2rem;
  line-height: 1.3em;
  ${media.sm`
    font-size: 1.4rem;
    line-height: inherit;
  `};
`;

export const ArticleMetaDate = styled.time`
  color: #3eb0ef;
`;

export const ArticleTitle = styled.h1`
  margin: 0;
  color: rgb(11, 12, 14);
  font-size: 2.9rem;
  line-height: 1.15;
  ${media.sm`
    font-size: 5rem;
  `}
`;

// TODO SWITCH TO media.* util
export const ArticleImage = styled.figure`
  background: #c5d2d9 center center;
  margin: 0 -11vw -165px;
  height: 800px;
  background-size: cover;
  border-radius: 5px;
  @media (max-width: 1170px) {
    margin: 0 -4vw -100px;
    height: 600px;
    border-radius: 0;
  }
  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
  }
`;

export const ArticleFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 3vw 0 6vw 0;
  max-width: 840px;
`;

export const DateDivider = styled.span`
  display: inline-block;
  margin: 0 6px 1px;
`;

export const CategoryLink = styled(Link)`
  color: #26a6ed;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

export const ReadNextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
`;
