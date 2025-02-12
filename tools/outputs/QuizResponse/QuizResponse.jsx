import React from "react";

import styles from "./styles";

import { Fade, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import theme from "@/libs/theme/theme";
import DocumentEditor from "../../components/DocumentEditor/DocumentEditor";

const QuizResponse = () => {
  const { content: markdownContent } = useSelector(
    (state) => state.tools.editorState.currentState
  );

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
