import { render, screen } from '@testing-library/react';

import { MetricCard } from '@/components/dashboard/MetricCard';

describe('<MetricCard />', () => {
  it('renders values and helper text', () => {
    render(<MetricCard label="Sleep" value="7h" helperText="Weekly avg" />);
    expect(screen.getByText('Sleep')).toBeInTheDocument();
    expect(screen.getByText('7h')).toBeInTheDocument();
    expect(screen.getByText('Weekly avg')).toBeInTheDocument();
  });
});
