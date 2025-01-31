import React from 'react';

import styles from './styles';

import { Fade, Grid } from '@mui/material';

import { useSelector } from 'react-redux';
import { actions as toolActions } from '@/tools/data';

import ExportButton from '@/components/TabButton/ExportButton';

import ExportButton from '@/components/TabButton/ExportButton';

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
<<<<<<< HEAD
<<<<<<< HEAD
    <Fade in>
      <Grid {...styles.mainGridProps}>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <Grid {...styles.questionsGridProps}>
          <DocumentEditor markdownContent={markdownContent} />
=======
=======
>>>>>>> 64111b4f05b4094d16dd5e838fe1b49362ff2ea6
    <>
      <ExportButton />
      <Fade in>
        <Grid {...styles.mainGridProps}>
          <Grid {...styles.questionsGridProps}>
            <DocumentEditor markdownContent={markdownContent} />
          </Grid>
<<<<<<< HEAD
>>>>>>> be737ff (Testing Export Button implementation.)
=======
>>>>>>> 64111b4f05b4094d16dd5e838fe1b49362ff2ea6
        </Grid>
      </Fade>
    </>
  );
};

export default QuizResponse;
