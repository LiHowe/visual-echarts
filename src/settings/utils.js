export const COMPONENT = {
  SELECT: 'select',
  INPUT: 'input',
  CHECK_BOX: 'checkbox'
}

export function genOptions (label, value) {
  return {
    label,
    value
  }
}
