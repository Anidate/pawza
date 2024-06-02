import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useInView } from 'react-intersection-observer';

type SetCheckState = (x: boolean) => boolean;

interface TermsProps {
  checkChange: SetCheckState;
  checkState: boolean;
}

export default function Terms({ checkChange, checkState }: TermsProps) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [checked, setChecked] = useState(checkState);

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleChange = () => {
    setChecked(!checked);
    checkChange(!checked);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen('paper')}>Read terms and conditions</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
          <div ref={ref}></div>
        </DialogContent>
        <DialogActions>
          {inView ? (
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" checked={checked} onChange={handleChange} />}
              label="I agree to the terms & conditions"
              sx={{ paddingRight: 23 }}
            />
          ) : (
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" checked={checked} onChange={handleChange} />}
              label="I agree to the terms & conditions"
              sx={{ paddingRight: 23 }}
              disabled
            />
          )}

          {checked ? (
            <Button onClick={handleClose}>Accept</Button>
          ) : (
            <Button onClick={handleClose} disabled>
              Accept
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
