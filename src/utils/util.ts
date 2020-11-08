
import { Ictx } from '../utils/constants'

export const Strformat = function (s: string, c: Ictx) {
  return s.replace(/{(\w+)}/g, function (m, p) {
    return c[p]
  })
}
