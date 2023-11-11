import { render, screen } from '@testing-library/react';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import selectEvent from 'react-select-event';

import { queryClient } from '@/services/query-client';

import Home from '@/app/page';

const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>
        <Home />
      </Hydrate>
    </QueryClientProvider>
  );
};

describe('Home', () => {
  it('should have a dashboard heading', () => {
    render(<HomePage />);

    const element = screen.getByRole('heading', {
      name: 'Dashboards',
    });

    expect(element).toBeInTheDocument();
  });

  it('should be able to select a type', async () => {
    render(<HomePage />);

    await selectEvent.select(screen.getByLabelText('Type'), ['Visualization']);

    expect(screen.getByTestId('type-selector')).toHaveFormValues({
      type: 'VISUALIZATION',
    });
  });

  it('should be able to add a second type', async () => {
    render(<HomePage />);

    await selectEvent.select(screen.getByLabelText('Type'), ['Visualization']);

    await selectEvent.select(screen.getByLabelText('Type'), ['Map']);

    expect(screen.getByTestId('type-selector')).toHaveFormValues({
      type: ['VISUALIZATION', 'MAP'],
    });
  });
});
