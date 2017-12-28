import {PixelRatio} from 'react-native'

export default function (px) {
  let ppi = PixelRatio.get();
  return px / ppi
}