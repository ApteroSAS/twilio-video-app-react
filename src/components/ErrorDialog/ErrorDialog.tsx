import React, { PropsWithChildren } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import enhanceMessage from './enhanceMessage';
import { TwilioError } from 'twilio-video';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { PREVIOUSLY_JOINED_KEY } from '../../constants';

interface ErrorDialogProps {
  dismissError: Function;
  error: TwilioError | Error | null;
}

function ErrorDialog({ dismissError, error }: PropsWithChildren<ErrorDialogProps>) {
  const { message, code } = error || {};
  const enhancedMessage = enhanceMessage(message, code);
  //const { room } = useVideoContext();
  if (code === 53205) {
    //Another Participant has been disconnected because of duplicate identity -> ignore that error
    localStorage.removeItem(PREVIOUSLY_JOINED_KEY);
    dismissError();
  }

  return (
    <Dialog open={error !== null} onClose={() => dismissError()} fullWidth={true} maxWidth="xs">
      <DialogTitle>ERROR</DialogTitle>
      <DialogContent>
        <DialogContentText>{enhancedMessage}</DialogContentText>
        {Boolean(code) && (
          <pre>
            <code>Error Code: {code}</code>
          </pre>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dismissError();
            //room!.disconnect();
            localStorage.removeItem(PREVIOUSLY_JOINED_KEY);
          }}
          color="primary"
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;
