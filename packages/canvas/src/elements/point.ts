import { defineElement } from '../element-structor'

export interface PointAttributes {
  x: number
  y: number
  name: string
  color?: string
  static?: boolean
}

export const point = defineElement<PointAttributes>((options) => {
  return (board) => {
    const x = options.static ? () => options.x : options.x
    const y = options.static ? () => options.y : options.y
    return board.create('point', [x, y], {
      name: options.name,
      ...(options.color && {
        fillColor: options.color,
      }),
    })
  }
})
