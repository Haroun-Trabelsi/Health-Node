import '@testing-library/jest-dom';

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    useRouter: () => ({
      refresh: jest.fn(),
      push: jest.fn(),
      prefetch: jest.fn()
    })
  };
});
