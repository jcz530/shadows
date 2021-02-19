export const hexToRgba = (hex, opacity) => {
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    , (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

  let alpha = opacity / 100

  return `rgba(${hex[0]}, ${hex[1]}, ${hex[2]}, ${alpha})`
}

export const rgbaToHex = (rgba) => {
  rgba = rgba.substring(5, rgba.lastIndexOf(','))
  let parts = rgba.split(",")
  parts = parts.map(rgb => {
    let hex = parseInt(rgb).toString(16)
    if (hex.length === 1)
      hex = `${hex}${hex}`
    return hex
  })

  return `#${parts[0]}${parts[1]}${parts[2]}`
  // hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
  //           ,(m, r, g, b) => '#' + r + r + g + g + b + b)
  // .substring(1).match(/.{2}/g)
  // .map(x => parseInt(x, 16))

  //   let alpha = opacity / 100

  //   return `rgba(${hex[0]}, ${hex[1]}, ${hex[2]}, ${alpha})`
}
