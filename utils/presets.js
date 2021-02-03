import { parseShadow } from './css'

const elevations = {
    z1: "box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)",
  }

export const mdc = () => {
    const title = (z) => {
        return `Elevation ${z}`
    }
    const elevations = {
        z1: {
            z: 1,
            title: title(1),
            class: "mdc-elevation--z1",
            css: "box-shadow:0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)",
        },
        z2: {
            z: 2,
            title: title(2),
            class: "mdc-elevation--z2",
            css: "box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
        },
        z3: {
            z: 3,
            title: title(3),
            class: "mdc-elevation--z3",
            css: "box-shadow:0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12)",
        },
        z4: {
            z: 4,
            title: title(4),
            class: "mdc-elevation--z4",
            css: "box-shadow:0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)",
        },
        z5: {
            z: 5,
            title: title(5),
            class: "mdc-elevation--z5",
            css: "box-shadow:0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12)",
        },
        z6: {
            z: 6,
            title: title(6),
            class: "mdc-elevation--z6",
            css: "box-shadow:0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)",
        },
        z7: {
            z: 7,
            title: title(7),
            class: "mdc-elevation--z7",
            css: "box-shadow:0 4px 5px -2px rgba(0,0,0,.2), 0 7px 10px 1px rgba(0,0,0,.14), 0 2px 16px 1px rgba(0,0,0,.12)",
        },
        z8: {
            z: 8,
            title: title(8),
            class: "mdc-elevation--z8",
            css: "box-shadow:00 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)",
        },
        z9: {
            z: 9,
            title: title(9),
            class: "mdc-elevation--z9",
            css: "box-shadow:0 5px 6px -3px rgba(0,0,0,.2), 0 9px 12px 1px rgba(0,0,0,.14), 0 3px 16px 2px rgba(0,0,0,.12)",
        },
        z10: {
            z: 10,
            title: title(10),
            class: "mdc-elevation--z10",
            css: "box-shadow:0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12)",
        },
        z11: {
            z: 11,
            title: title(11),
            class: "mdc-elevation--z11",
            css: "box-shadow:0 6px 7px -4px rgba(0,0,0,.2), 0 11px 15px 1px rgba(0,0,0,.14), 0 4px 20px 3px rgba(0,0,0,.12)",
        },
        z12: {
            z: 12,
            title: title(12),
            class: "mdc-elevation--z12",
            css: "box-shadow:0 7px 8px -4px rgba(0,0,0,.2), 0 12px 17px 2px rgba(0,0,0,.14), 0 5px 22px 4px rgba(0,0,0,.12)",
        },
        z13: {
            z: 13,
            title: title(13),
            class: "mdc-elevation--z13",
            css: "box-shadow:0 7px 8px -4px rgba(0,0,0,.2), 0 13px 19px 2px rgba(0,0,0,.14), 0 5px 24px 4px rgba(0,0,0,.12)",
        },
        z14: {
            z: 14,
            title: title(14),
            class: "mdc-elevation--z14",
            css: "box-shadow:0 7px 9px -4px rgba(0,0,0,.2), 0 14px 21px 2px rgba(0,0,0,.14), 0 5px 26px 4px rgba(0,0,0,.12)",
        },
        z15: {
            z: 15,
            title: title(15),
            class: "mdc-elevation--z15",
            css: "box-shadow:0 8px 9px -5px rgba(0,0,0,.2), 0 15px 22px 2px rgba(0,0,0,.14), 0 6px 28px 5px rgba(0,0,0,.12)",
        },
        z16: {
            z: 16,
            title: title(16),
            class: "mdc-elevation--z16",
            css: "box-shadow:0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)",
        },
        z17: {
            z: 17,
            title: title(17),
            class: "mdc-elevation--z17",
            css: "box-shadow:0 8px 11px -5px rgba(0,0,0,.2), 0 17px 26px 2px rgba(0,0,0,.14), 0 6px 32px 5px rgba(0,0,0,.12)",
        },
        z18: {
            z: 18,
            title: title(18),
            class: "mdc-elevation--z18",
            css: "box-shadow:0 9px 11px -5px rgba(0,0,0,.2), 0 18px 28px 2px rgba(0,0,0,.14), 0 7px 34px 6px rgba(0,0,0,.12)",
        },
        z19: {
            z: 19,
            title: title(19),
            class: "mdc-elevation--z19",
            css: "box-shadow:0 9px 12px -6px rgba(0,0,0,.2), 0 19px 29px 2px rgba(0,0,0,.14), 0 7px 36px 6px rgba(0,0,0,.12)",
        },
        z20: {
            z: 20,
            title: title(20),
            class: "mdc-elevation--z20",
            css: "box-shadow:0 10px 13px -6px rgba(0,0,0,.2), 0 20px 31px 3px rgba(0,0,0,.14), 0 8px 38px 7px rgba(0,0,0,.12)",
        },
        z21: {
            z: 21,
            title: title(21),
            class: "mdc-elevation--z21",
            css: "box-shadow:0 10px 13px -6px rgba(0,0,0,.2), 0 21px 33px 3px rgba(0,0,0,.14), 0 8px 40px 7px rgba(0,0,0,.12)",
        },
        z22: {
            z: 22,
            title: title(22),
            class: "mdc-elevation--z22",
            css: "box-shadow:0 10px 14px -6px rgba(0,0,0,.2), 0 22px 35px 3px rgba(0,0,0,.14), 0 8px 42px 7px rgba(0,0,0,.12)",
        },
        z24: {
            z: 23,
            title: title(23),
            class: "mdc-elevation--z23",
            css: "box-shadow:0 11px 14px -7px rgba(0,0,0,.2), 0 23px 36px 3px rgba(0,0,0,.14), 0 9px 44px 8px rgba(0,0,0,.12)",
        },
        z24: {
            z: 24,
            title: title(24),
            class: "mdc-elevation--z24",
            css: "box-shadow:0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12)",
        },



      }
    return { elevations: elevations }
    //   let shadow = parseShadow(elevations['z1'])
    // return elevations['z1']
}

export const tailwind = () => {
    const elevations = {
        sm: {
            z: 1,
            title: "Small Shadow",
            class: "shadow-sm",
            css: "box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)",
        },
        default: {
            z: 2,
            class: "mdc-elevation--z2",
            css: "box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)",
        },
        
      }
    return { elevations: elevations }
    //   let shadow = parseShadow(elevations['z1'])
    // return elevations['z1']
}