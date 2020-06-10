import React from 'react';
import { Button } from '@material-ui/core';
import { PerformanceDto } from '../../../../types';
import { useOrderContext } from '../../../../hooks/OrderContext';
import { getPerformances, getCategories } from '../../../../utils';

export default function PerformancesStep() {
  const [order, setOrder, activeStep, setActiveStep] = useOrderContext();

  if (order.show === undefined || order.show.performances === undefined) {
    return <p>Impossible d'afficher les représentations</p>;
  }

  const handleOnClick = (perfSelected: PerformanceDto) => {
    const categories = getCategories(perfSelected);
    if (categories.length === 1) {
      setOrder({
        ...order,
        performance: perfSelected,
        category: categories[0]
      });
    } else {
      setOrder({ ...order, performance: perfSelected, category: undefined });
    }
    setActiveStep(activeStep + 1);
  };

  const performances: PerformanceDto[] = getPerformances(order.show);

  return (
    <>
      <h1>{order.show.title}</h1>
      <ul>
        {performances.map((item: PerformanceDto) => (
          <li key={item.alternative_id}>
            {item.date !== undefined ? item.date.french : 'Date inconnue'}
            <Button
              onClick={() => {
                handleOnClick(item);
              }}
            >
              Choisir
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
