import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import emoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

import MemoizedReactMarkdown from '@/components/MemoizedMarkdown';
import ImageURLs from '@/assets/urls';
import CodeComponent from '../CodeComponent';
import styles from './styles';

const TextMessage = (props) => {
  const { isMyMessage, message } = props;

  return (
    <>
      {isMyMessage ? (
        // User message (no animation)
        <Grid id="message" {...styles.mainGridProps(isMyMessage)}>
          <Grid {...styles.messageWrapperProps(isMyMessage)}>
            <Typography {...styles.messageProps()}>
              <MemoizedReactMarkdown
                remarkPlugins={[remarkGfm, emoji]}
                components={{ code: CodeComponent }}
              >
                {message}
              </MemoizedReactMarkdown>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        // BULLET 1: AI message with full fade-in effect, ensuring only the text fades in
        <Grid id="message" {...styles.mainGridProps(isMyMessage)}>
          <Grid {...styles.messageWrapperProps(isMyMessage)}>
            <Box>
              <Image
                width="38.74px"
                height="38.74px"
                src={ImageURLs.MarvelCircleAvatar}
                alt="Marvel AI"
              />
            </Box>
            <div style={{ display: 'flex', flexDirection: 'column' }}>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: 'ease-in' }}
              >
                <Typography {...styles.messageProps()}>
                  <MemoizedReactMarkdown
                    remarkPlugins={[remarkGfm, emoji]}
                    components={{ code: CodeComponent }}
                  >
                    {message}
                  </MemoizedReactMarkdown>
                </Typography>
              </motion.div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default TextMessage;
