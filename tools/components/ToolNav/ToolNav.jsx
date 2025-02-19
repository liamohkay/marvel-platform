import { Grid } from '@mui/material';

import { useRouter } from 'next/router';

import AIChatIcon from '@/assets/svg/AIChatIcon.svg';
import HistoryIcon from '@/assets/svg/HistoryIcon.svg';
import KAIAvatar from '@/assets/svg/KAIAvatar.svg';

import EditPromptPopout from './EditPromptPopout/EditPromptPopout';
import LastSaved from './LastSaved/LastSaved';

import styles from './styles';

import ROUTES from '@/libs/constants/routes';
import EditorExport from '@/tools/components/EditorExport/EditorExport';

const ToolNav = (props) => {
  const { toolDoc, popoutOpen } = props;
  const router = useRouter();

  return (
    <Grid container alignItems="center" spacing={0} sx={{ width: '100%', flexWrap: 'nowrap' }}>
      <Grid onClick={() => router.push(ROUTES.HOME)} {...styles.logoGridProps}>
        <KAIAvatar {...styles.logoProps} />
      </Grid>
      <Grid container direction="column" justifyContent="center" sx={{ width: "100%", height:'100%', paddingBottom: '10px' }}>
        <Grid item><h2>{toolDoc?.name}</h2></Grid>
        <Grid item container alignItems="center" spacing={0} sx={{ gap: '7px' }}>
          <Grid item>{toolDoc?.name}</Grid>
          <Grid item><LastSaved /></Grid>
        </Grid>
      </Grid>
      <Grid item container alignItems="center" spacing={0} sx={{ gap: '7px' }}>
        <Grid item sx={{ paddingRight: '25px' }}>
          <EditPromptPopout toolDoc={toolDoc} popoutOpen={popoutOpen} />
        </Grid>
        <Grid item><HistoryIcon /></Grid>
        <Grid item><EditorExport /></Grid>
        <Grid item><AIChatIcon /></Grid>
      </Grid>
    </Grid>
  );
};

export default ToolNav;
