export type ComponentType = {
  SELECT: 'select'
}

export type ComponentOptions = {
  label: string,
  type: ComponentType,
  dataType: any[],
  default: any,
  options?: any
}
export type ComponentItem = {
  [key: string]: ComponentOptions
}
