import styled from 'styled-components';
import { media } from '../../utils/styled';
import { CardsWrapper } from '../Styled';

export const Category = styled.div`
  position: relative;
  z-index: 50;
`;

export const ArticlesFeed = styled(CardsWrapper)`
  ${media.lg`
    margin-top: -70px;
    padding-top: 0;
  `}
`;
