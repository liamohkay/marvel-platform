import React from 'react';

import { Box, Fade, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import ExportButton from '@/components/TabButton/ExportButton';

import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

import styles from './styles'; // Import styles from the same file or external styles file

import { convertResponseToMarkdown } from '@/tools/libs/utils/markdownConverter'; // Import your utility

const QuizResponse = () => {
  const { response } = useSelector((state) => state.tools); // Fetch response from Redux
  const toolId = 'multiple-choice-quiz-generator'; // Adjust based on your use case

  // Use the existing utility to convert the response into Markdown
  const markdownContent = convertResponseToMarkdown(response, toolId);

  console.log('Generated Markdown:', markdownContent);
  return (
    <>
      <ExportButton />
      <Fade in>
        <Grid {...styles.mainGridProps}>
          <Grid {...styles.questionsGridProps}>
            <DocumentEditor markdownContent={markdownContent} />
          </Grid>
        </Grid>
      </Fade>
    </>
  );
};

export default QuizResponse;
