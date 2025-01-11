import { useContext } from 'react';

import { useTheme } from '@mui/material';

import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from '@/templates/SignIn/SignInForm/styles';

import GoogleIcon from '@/assets/svg/googleIcon.svg';

import { AuthContext } from '@/libs/providers/GlobalProvider';

/**
 * A button component for Google authentication with reCAPTCHA verification.
 * This component renders a styled button for Google authentication. It handles
 * Google login functionality, integrates with reCAPTCHA for verification, and
 * supports both sign-in and sign-up flows.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isSignIn - Determines if the button text reflects a sign-in or sign-up action.
 * @returns {JSX.Element} The Google authentication button.
 */
const GoogleAuthButton = (props) => {
  const { isSignIn } = props;
  const { handleOpenSnackBar, handleGoogleLogin } = useContext(AuthContext);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const theme = useTheme();

  /**
   * Verifies the reCAPTCHA token and triggers a callback on success.
   *
   * @async
   * @param {Function} callback - The function to execute after successful reCAPTCHA verification.
   */
  const verifyRecaptcha = async (callback) => {
    if (!executeRecaptcha) return;
    try {
      const token = await executeRecaptcha('login');
      const res = await axios.post('/api/verify-recaptcha', { gRecaptchaToken: token });
      if (res.data?.success) callback();
      else handleOpenSnackBar('error', 'Failed reCAPTCHA verification.');
    } catch (err) {
      handleOpenSnackBar('error', err.message);
    }
  };

  return (
    <GradientOutlinedButton
      clickHandler={() => verifyRecaptcha(handleGoogleLogin)}
      icon={<GoogleIcon width={24} height={24} />}
      iconPlacement="left"
      text={`Sign ${isSignIn ? 'In' : 'Up'} Via Google`}
      textColor={theme.palette.Common.White['100p']}
      onHoverTextColor={theme.palette.common.white['100p']}
      {...styles.googleSignInButtonProps}
    />
  );
};

export default GoogleAuthButton;
