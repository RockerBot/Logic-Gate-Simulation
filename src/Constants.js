export const GTYPE ={
    AND:"AND",
    NAND:"NAND",
    OR:"OR",
    NOR: "NOR",
    XOR: "XOR",
    XNOR: "XNOR",
    NOT: "NOT",
    BUFFER: "BUFFER",
    ON: "ON",/* TODO WIP */
    OFF: "OFF",/* TODO WIP */
    SRFF: "SRFF",
    DFF: "DFF",
    JKFF: "JKFF",
    TFF: "TFF"
}
export const NAME ={
    AND:"AND",
    NAND:"NAND",
    OR:"OR",
    NOR: "NOR",
    XOR: "XOR",
    XNOR: "XNOR",
    NOT: "NOT",
    BUFFER: "BUFFER",
    ON: "ON",/* TODO WIP */
    OFF: "OFF",/* TODO WIP */
    SRFF: "SR Flip Flop",
    DFF: "D Flip Flop",
    JKFF: "JK Flip Flop",
    TFF: "T Flip Flop"
}
export const CNT_IN_POS ={
    AND: [
        { x: -70, y: 10, },
        { x: -70, y: 40, }
    ],
    NAND:[
        { x: -70, y: 10, },
        { x: -70, y: 40, }
    ],
    OR:[
        { x: -70, y: 10, },
        { x: -70, y: 40, }
    ],
    NOR: [
        { x: -70, y: 10, },
        { x: -70, y: 40, }
    ],
    XOR: [
        { x: -70, y: 10, },
        { x: -70, y: 40, }
    ],
    XNOR: [
        { x: -70, y: 10, },
        { x: -70, y: 40, }
    ],
    NOT: [
        { x: -70, y: 30, },
    ],
    BUFFER: [
        { x: -70, y: 30, },
    ],
    ON: [],/* TODO WIP */
    OFF: [],/* TODO WIP */
    SRFF: [
        { x: -70, y: -50, },
        { x: -70, y: +50, },
        { x: -70, y: 0, }
    ],
    DFF: [
        { x: -100, y: -50, },
        { x: -100, y: +50, }
    ],
    JKFF: [
        { x: -100, y: -50, },
        { x: -100, y: +50, },
        { x: -100, y: 0, }
    ],
    TFF: [
        { x: -100, y: -50, },
        { x: -100, y: +50, }
    ]
}
export const CNT_OUT_POS ={
    AND: [
        { x: 100, y: 0, },
    ],
    NAND:[
        { x: 100, y: 0, }
    ],
    OR:[
        { x: 100, y: 0, }
    ],
    NOR: [
        { x: 100, y: 0, }
    ],
    XOR: [
        { x: 100, y: 0, }
    ],
    XNOR: [
        { x: 100, y: 0, }
    ],
    NOT: [
        { x: 100, y: 0, },
    ],
    BUFFER: [
        { x: 100, y: 0, },
    ],
    ON: [
        { x: 100, y: 0, },
    ],/* TODO WIP */
    OFF: [
        { x: 100, y: 0, },
    ],/* TODO WIP */
    SRFF: [
        { x: 100, y: -50, },
        { x: 100, y: +50, },
    ],
    DFF: [
        { x: 100, y: -50, },
        { x: 100, y: +50, }
    ],
    JKFF: [
        { x: 100, y: -50, },
        { x: 100, y: +50, },
    ],
    TFF: [
        { x: 100, y: -50, },
        { x: 100, y: +50, }
    ]
}