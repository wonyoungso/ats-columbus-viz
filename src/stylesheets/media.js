import { css } from 'styled-components'

const sizes = {
   mobileLarge: 768,
   padLandscape: 1024,
   smallDesktop: 1280,
   bigDesktop: 1440
}
export default Object.keys(sizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
         ${css(...args)};
      }
   `
   return acc
}, {})