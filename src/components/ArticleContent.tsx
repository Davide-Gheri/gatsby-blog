import React, { PureComponent } from 'react';
import { mdToDraftjs, draftjsToMd } from 'draftjs-md-converter';
import { EditorState, convertFromRaw } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import { Content } from './Styled';

interface ArticleContentState {
  content: any;
}

interface ArticleContentProps {
  content: string;
}

export default class ArticleContent extends PureComponent<ArticleContentProps, ArticleContentState> {
  state: ArticleContentState = {
    content: EditorState.createEmpty(),
  };

  componentDidMount() {
    const content = mdToDraftjs(this.props.content);
    this.setState({
      content: EditorState.createWithContent(convertFromRaw(content)),
    });
  }

  render() {
    return (
      <Content>
        <Editor onChange={() => {}} editorState={this.state.content} readonly={true}/>
      </Content>
    );
  }
}
