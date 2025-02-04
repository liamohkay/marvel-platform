import { Fade, Grid } from '@mui/material';

import { useSelector } from 'react-redux';

import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

import styles from './styles';

/**
 * Displays the response from the Syllabus Generator tool in a table format.
 *
 * The table has two columns: "Section" and "Details". The "Section" column
 * displays the name of the section, and the "Details" column displays the
 * details of the section.
 *
 * The sections and their details are as follows:
 *
 * - Course Title: The title of the course.
 * - Grade Level: The grade level of the course.
 * - Description: A brief description of the course.
 * - Objectives: The objectives of the course.
 * - Learning Outcomes: The learning outcomes of the course.
 */
const SyllabusGeneratorResponse = () => {
<<<<<<< HEAD
  const { response } = useSelector((state) => state.tools);

  const renderTable = () => {
    return (
      <TableContainer
        component={Paper}
        sx={{ background: 'none', boxShadow: 'none' }}
      >
        <Table sx={{ background: 'none' }}>
          <TableHead>
            <TableRow>
              <TableCell>Section</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Course Title</TableCell>
              <TableCell>{response.course_information.course_title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grade Level</TableCell>
              <TableCell>{response.course_information.grade_level}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{response.course_information.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Objectives</TableCell>
              <TableCell>
                <ul>
                  {response.course_description_objectives.objectives.map(
                    (objective, index) => (
                      <li key={index}>{objective}</li>
                    )
                  )}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.lastRowCellProps}>
                Learning Outcomes
              </TableCell>
              <TableCell sx={styles.lastRowCellProps}>
                <ul>
                  {response.course_description_objectives.intended_learning_outcomes.map(
                    (outcome, index) => (
                      <li key={index}>{outcome}</li>
                    )
                  )}
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
=======
  const { content: markdownContent } = useSelector((state) => state.tools.editorState.currentState);
>>>>>>> a3b4a1f (Feature/2.2 task3 redo (#13))

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        <DocumentEditor markdownContent={markdownContent} />
      </Grid>
    </Fade>
  );
};

export default SyllabusGeneratorResponse;
