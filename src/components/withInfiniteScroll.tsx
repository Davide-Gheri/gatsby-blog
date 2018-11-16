import React, { PureComponent } from 'react';
import { get } from 'lodash';

interface InfiniteScrollState {
  postsToShow: number;
  canLoadMore: boolean;
  loading: boolean;
}

interface ScrollProps {
  loading: boolean;
  toShow: number;
}

export type WithScrollProps<P> = P & ScrollProps;

export function withInfiniteScroll<T = {}>(Component: any, edgesPath: string) {
  class InfiniteScroll extends PureComponent<T & {data: any}, InfiniteScrollState> {
    ticking = false;
    state: InfiniteScrollState = {
      postsToShow: 6,
      canLoadMore: true,
      loading: true,
    };

    update() {
      if (document.documentElement) {
        const data = get(this.props.data, edgesPath);
        const distanceToBottom = document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);
        if (this.state.canLoadMore && distanceToBottom < 100) {
          this.setState({loading: true});
          setTimeout(() => this.setState({ postsToShow: this.state.postsToShow + 6 }, () => {
            this.setState({loading: false, canLoadMore: this.state.postsToShow < data.length});
          }), 500);
        }
      }
      this.ticking = false;
    }

    handleScroll = () => {
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(() => this.update());
      }
    };

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
      return <Component loading={this.state.loading} toShow={this.state.postsToShow} {...this.props}/>;
    }
  }
  return InfiniteScroll;
}
