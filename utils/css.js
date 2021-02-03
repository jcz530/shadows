import { rgbaToHex } from './colors'

export const parseShadow = (cssBoxShadow) => {
  let shadows = [];
  
  let str = cssBoxShadow

  str = str.replace("box-shadow:", "")
  let strings = str.split(/,(?![^\(\[]*[\]\)])/g) //commas not in parenthesis
  // console.log(strings)
    
  strings.forEach(s => {
    s = s.trim()
  let parts = s.split(/ (?![^\(\[]*[\]\)])/g) //spaces not in parenthesis
    console.log(parts)
      let shadow = { id: -1, visible: true }
      parts.forEach(s => {
        // console.log(s)
        s = s.replace("px", "")

        if (s.startsWith("r") || s.startsWith("#")) {
          shadow.color = rgbaToHex(s)

          let opacity = s.substring(s.lastIndexOf(',') + 1, s.lastIndexOf(")"))
          opacity = parseFloat(opacity) * 100
          shadow.opacity = parseInt(opacity)

          return
        }
        
        s = parseInt(s)

        if (shadow.x === undefined) {
          shadow.x = s
        } else if (shadow.y === undefined) {
          shadow.y = s
          shadow.distance = s
          shadow.angle = 90
        } else if (shadow.blur === undefined) {
          shadow.blur = s
        } else if (shadow.spread === undefined) {
          shadow.spread = s
        } 
        
      })
      shadows.push(shadow)
      // console.log("shadow")
      // console.log(shadow)
    });
    return shadows;
  }