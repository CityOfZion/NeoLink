import { formatGas } from '../../src/app/utils/helpers'

test('formatGas formats gas under 1 correctly', () => {
  const formattedGas = formatGas([0, 1323242])
  expect(formattedGas).toBe('0.13232')
})

test('formatGas formats gas above 1 correctly', () => {
  const formattedGas = formatGas([1, 1323242])
  expect(formattedGas).toBe('1.13232')
})
