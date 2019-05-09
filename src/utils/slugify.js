export const slugify = value => {
  if (!value) return value
  const bits = value.split(' ')
  if (bits.length === 1) return value.toLowerCase()
  const result = bits.map(bit => bit.toLowerCase()).join('-')
  return result
}
