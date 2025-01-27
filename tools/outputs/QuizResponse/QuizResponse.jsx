import React from 'react';

import styles from './styles';

import { Fade, Grid } from '@mui/material';

import { useSelector } from 'react-redux';
import { actions as toolActions } from '@/tools/data';

import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

const { addStateToEditHistory } = toolActions;

const QuizResponse = () => {
  const { editorState } = useSelector((state) => state.tools);
  const markdownContent = editorState.editHistory[0].content ?? '';

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        <Grid {...styles.questionsGridProps}>
          <DocumentEditor markdownContent={markdownContent} />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default QuizResponse;
