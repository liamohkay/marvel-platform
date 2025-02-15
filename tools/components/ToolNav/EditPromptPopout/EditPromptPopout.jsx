import { useDispatch } from 'react-redux';

import AccordionInputGroupItem from '@/components/AccordionInputGroupItem';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import CarrotDown from '@/assets/svg/CarrotDown.svg';
import CarrotUp from '@/assets/svg/CarrotUp.svg';

import styles from './styles';

import ToolRequestForm from '@/tools/components/ToolRequestForm';

import { actions as toolActions } from '@/tools/data';

const { setPopoutOpen } = toolActions;

/**
 * EditPromptPopout Component
 *
 * This component renders a button to toggle the prompt popout, 
 * which contains a tool request form inside an accordion.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.toolDoc - The tool document containing input data.
 * @param {boolean} props.popoutOpen - Boolean indicating if the popout is open.
 * @returns {JSX.Element} The rendered component.
 */
const EditPromptPopout = (props) => {
  const { toolDoc, popoutOpen } = props;
  const dispatch = useDispatch();

  /**
   * Renders the button to toggle the popout.
   *
   * @returns {JSX.Element} The button component.
   */
  const renderPromptButton = () => {
    return (
      <GradientOutlinedButton
        text="Prompt"
        bgcolor={popoutOpen ? '#DECDFF !important' : 'black !important'}
        textColor="white !important"
        iconPlacement="right"
        active={!!popoutOpen}
        icon={popoutOpen ? <CarrotUp /> : <CarrotDown />}
        onClick={() => dispatch(setPopoutOpen(!popoutOpen))}
        extraButtonProps={{
          sx: {
            ...styles.promptButton,
            borderColor: popoutOpen ? '#9D7BFF' : '#9D7BFF',
          },
        }}
      />
    );
  };

  /**
   * Renders the accordion-style popout containing the tool request form.
   *
   * @returns {JSX.Element} The accordion component.
   */
  const renderPopout = () => {
    return (
      <AccordionInputGroupItem
        open={popoutOpen}
        toggleOpen={() => dispatch(setPopoutOpen(!popoutOpen))}
        extraAccordionDetailsProps={styles.popoutStyles}
      >
        <ToolRequestForm isPopout={true} inputs={toolDoc?.inputs} id={toolDoc?.id} />
      </AccordionInputGroupItem>
    );
  };

  return (
    <>
      {renderPromptButton()}
      {popoutOpen && renderPopout()}
    </>
  );
};

export default EditPromptPopout;
