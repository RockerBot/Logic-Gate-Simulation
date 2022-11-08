export const GTYPE ={
    AND:    "AND",
    NAND:   "NAND",
    OR:     "OR",
    NOR:    "NOR",
    XOR:    "XOR",
    XNOR:   "XNOR",
    NOT:    "NOT",
    BUFFER: "BUFFER",
    SWITCH: "SWITCH",
    LED:    "LED",
    SRFF:   "SRFF",
    DFF:    "DFF",
    JKFF:   "JKFF",
    TFF:    "TFF"
}
export const NAME ={
    AND:    "AND",
    NAND:   "NAND",
    OR:     "OR",
    NOR:    "NOR",
    XOR:    "XOR",
    XNOR:   "XNOR",
    NOT:    "NOT",
    BUFFER: "BUFFER",
    SWITCH: "SWITCH [ON]",
    LED:    "LED [ON]",
    SRFF:   "SR Flip Flop",
    DFF:    "D Flip Flop",
    JKFF:   "JK Flip Flop",
    TFF:    "T Flip Flop"
}
export const DIM ={
    AND:    {w: 150, h: 75},
    NAND:   {w: 150, h: 75},
    OR:     {w: 150, h: 75},
    NOR:    {w: 150, h: 75},
    XOR:    {w: 150, h: 75},
    XNOR:   {w: 150, h: 75},
    NOT:    {w: 150, h: 75},
    BUFFER: {w: 150, h: 75},
    SWITCH: {w: 50, h: 50},
    LED:    {w: 50, h: 50},
    SRFF:   {w: 150, h: 100},
    DFF:    {w: 125, h: 100},
    JKFF:   {w: 120, h: 125},
    TFF:    {w: 100, h: 100},
}
export const CNT_IN_POS ={
    AND: [
        { x: -10, y: 10, },
        { x: -10, y: 40, }
    ],
    NAND:[
        { x: -10, y: 10, },
        { x: -10, y: 40, }
    ],
    OR:[
        { x: -10, y: 10, },
        { x: -10, y: 40, }
    ],
    NOR: [
        { x: -10, y: 10, },
        { x: -10, y: 40, }
    ],
    XOR: [
        { x: -10, y: 10, },
        { x: -10, y: 40, }
    ],
    XNOR: [
        { x: -10, y: 10, },
        { x: -10, y: 40, }
    ],
    NOT: [
        { x: -10, y: 30, },
    ],
    BUFFER: [
        { x: -10, y: 30, },
    ],
    SWITCH: [],
    LED: [
        { x: -10, y: 15, },
    ],
    SRFF: [
        { x: -10, y: 10, },
        { x: -10, y: 70, },
        { x: -10, y: 40, }
    ],
    DFF: [
        { x: -10, y: 5, },
        { x: -10, y: 70, }
    ],
    JKFF: [
        { x: -10, y: 25, },
        { x: -10, y: 75, },
        { x: -10, y: 50, }
    ],
    TFF: [
        { x: -10, y: 15, },
        { x: -10, y: 65, }
    ]
}
export const CNT_OUT_POS ={
    AND: [
        { x: 140, y: 25, },
    ],
    NAND:[
        { x: 140, y: 25, }
    ],
    OR:[
        { x: 140, y: 25, }
    ],
    NOR: [
        { x: 140, y: 25, }
    ],
    XOR: [
        { x: 140, y: 25, }
    ],
    XNOR: [
        { x: 140, y: 25, }
    ],
    NOT: [
        { x: 140, y: 25, },
    ],
    BUFFER: [
        { x: 140, y: 25, },
    ],
    SWITCH: [
        { x: 40, y: 15, },
    ],
    LED: [],
    SRFF: [
        { x: 140, y: 10, },
        { x: 140, y: 70, },
    ],
    DFF: [
        { x: 115, y: 5, },
        { x: 115, y: 70, }
    ],
    JKFF: [
        { x: 110, y: 25, },
        { x: 110, y: 75, },
    ],
    TFF: [
        { x: 90, y: 15, },
        { x: 90, y: 65, }
    ]
}
export const CONNECTOR={
    h:24,
    w:24
}