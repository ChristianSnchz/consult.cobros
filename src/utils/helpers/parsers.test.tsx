import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import parsers from './parsers';

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

test('should parser ', async () => {
  const { parseCUIT } = parsers;
  expect(parseCUIT({ value: '30-72131231-2' }, { value: '30-72131231-' }).value).toBe('30-72131231-2');
});
test('should addCeros', async () => {
  const { addCeros } = parsers;
  expect(addCeros({ value: '25' }, 10).value).toBe('0000000025');
});
