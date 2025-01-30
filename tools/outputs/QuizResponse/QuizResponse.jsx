import React from 'react';

import styles from './styles';

import { Fade, Grid } from '@mui/material';

import { useSelector } from 'react-redux';
import { actions as toolActions } from '@/tools/data';

import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';
import { useDispatch } from 'react-redux';

const { undo, redo } = toolActions;

const QuizResponse = () => {
  const dispatch = useDispatch();
  const { content: markdownContent } = useSelector(
    (state) => state.tools.editorState.currentState
  );

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };
  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <Grid {...styles.questionsGridProps}>
          <DocumentEditor markdownContent={markdownContent} />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default QuizResponse;
