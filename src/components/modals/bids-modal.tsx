import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC, useCallback, useRef } from 'react';
import { BidsModalProps } from '../../interfaces';
import { usePlaceBid } from '../../hooks';

const BidListItem = ({ name, bidOn, price }: { name: string; bidOn: Date; price: number }) => {
  const renderBidInfo = () => {
    return (
      <>
        <Typography variant='body2'>{name}</Typography>
        <Typography variant='caption'>{bidOn.toString()}</Typography>
      </>
    );
  };
  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar
          alt='Remy Sharp'
          src={`https://ui-avatars.com/api/?name=${name}&background=random&color=random`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant='h5'>${price.toLocaleString()}</Typography>}
        secondary={renderBidInfo()}
      />
    </ListItem>
  );
};

export const BidsModal: FC<BidsModalProps> = ({ open, item, onClose }) => {
  const { formik, allBids, minBidPrice } = usePlaceBid(item);
  const formRef = useRef<HTMLFormElement>(null);
  const greyColor = grey[50];

  const onPlaceBid = useCallback(() => {
    formik.handleSubmit();
  }, [formik]);

  return (
    <Dialog open={open} fullWidth maxWidth='md'>
      <DialogTitle>
        <Typography variant='h4'>Bids</Typography>
        <Typography variant='body2'>
          Place your bid for item <strong>{item.name}</strong>
        </Typography>
        <Typography variant='body1'>
          Start price <strong>${item.price.toLocaleString()}</strong>, bid must be higher than{' '}
          <strong>${minBidPrice.toLocaleString()}</strong>
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: '0px' }}>
        <Grid container sx={{ maxHeight: '300px' }}>
          <Grid item xs={8}>
            <List
              sx={{
                padding: '0px',
                '& .MuiListItem-root:nth-child(odd)': {
                  backgroundColor: greyColor,
                },
              }}
            >
              {allBids?.map((bid, bid_index) => (
                <BidListItem
                  key={bid_index}
                  name={bid.user.name}
                  bidOn={bid.bidTime}
                  price={bid.price}
                />
              ))}
            </List>
          </Grid>
          <Grid item xs={4} sx={{ padding: '10px', border: `solid 1px ${greyColor}` }}>
            <form
              ref={formRef}
              style={{ position: 'sticky', top: '10px' }}
              onSubmit={formik.handleSubmit}
            >
              <TextField
                label='Place your bid'
                variant='outlined'
                name='bid'
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                }}
                value={formik.values.bid}
                onChange={formik.handleChange}
                error={formik.touched.bid && Boolean(formik.errors.bid)}
                helperText={formik.touched.bid && formik.errors.bid}
              />
            </form>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='text' color='primary' onClick={onClose}>
          No
        </Button>
        <Button variant='contained' color='primary' onClick={onPlaceBid}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
