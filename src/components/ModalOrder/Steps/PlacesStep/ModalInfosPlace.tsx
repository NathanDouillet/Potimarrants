import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { PriceDto, ModalProps } from '../../../../types';
import { useOrderContext } from '../../../../hooks/OrderContext';
import ButtonPrimary from '../../../Buttons/ButtonPrimary';
import Dialog from '../../../Dialog/Dialog';
import ButtonSecondary from '../../../Buttons/ButtonSecondary';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '&:focus': {
      outline: 'none'
    }
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textField: {
    margin: '0 10px'
  },

  submitWrapper: {
    marginTop: '1em',
    textAlign: 'center'
  }
}));

type PlaceType = {
  name: string;
  firstName: string;
  price: PriceDto | undefined;
};

export default function ModalInfosPlace({ opened, close }: ModalProps) {
  const [order, setOrder] = useOrderContext();
  const classes = useStyles();
  const [place, setPlace] = useState<PlaceType>({
    name: '',
    firstName: '',
    price: undefined
  });
  const body = (
    <form
      onSubmit={event => {
        event.preventDefault();
        place.price = order.price;
        setOrder({ ...order, places: [...order.places, place] });
        setPlace({
          name: '',
          firstName: '',
          price: order.price
        });
        close();
      }}
    >
      <TextField
        id='place-firstname'
        label='Prénom'
        variant='outlined'
        className={classes.textField}
        value={place.firstName}
        required={true}
        onChange={event => {
          setPlace({ ...place, firstName: event.target.value });
        }}
      />
      <TextField
        id='place-name'
        label='Nom'
        variant='outlined'
        className={classes.textField}
        value={place.name}
        required={true}
        onChange={event => {
          setPlace({ ...place, name: event.target.value });
        }}
      />
      <div className={classes.submitWrapper}>
        <ButtonSecondary onClick={close}>Annuler</ButtonSecondary>
        <ButtonPrimary type='submit'>Ajouter la place</ButtonPrimary>
      </div>
    </form>
  );

  return (
    <>
      <Dialog
        open={opened || false}
        rounded={true}
        onClose={close}
        className={classes.modal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Dialog>
    </>
  );
}
