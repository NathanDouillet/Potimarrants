import React, { useState } from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import ModalOrder from './ModalOrder';
import { OrderDto } from 'types';
import { OrderState, OrderStateContext } from '../../hooks/OrderContext';

type LinkOrderProps = {
  style: CSSProperties;
};

const LinkOrder = ({ style }: LinkOrderProps) => {
  const [order, setOrder] = useState<OrderDto>({
    show: undefined,
    performance: undefined,
    category: undefined,
    places: []
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  const initialContextValues: OrderState = {
    order: order,
    setOrder: setOrder,
    activeStep: activeStep,
    setActiveStep: setActiveStep
  };

  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <OrderStateContext.Provider value={initialContextValues}>
      <span style={style} onClick={handleOpen}>
        Réserver
      </span>

      <ModalOrder close={handleClose} opened={open} />
    </OrderStateContext.Provider>
  );
};

export default LinkOrder;
