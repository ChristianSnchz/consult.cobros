import indexCore from './index';

global.fetch = jest.fn().mockImplementation(
  (): Promise<any> =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve('text response')
    })
);

test('should call indexCore', async () => {
  await indexCore({ url: '/', method: 'POST', data: {} });
  expect(indexCore);
});
