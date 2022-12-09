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
    TFF:    "TFF",
    CLOCK:  "CLOCK",
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
    TFF:    "T Flip Flop",
    CLOCK:  "CLOCK"
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
    SWITCH: {w: 50,  h: 50},
    LED:    {w: 50,  h: 50},
    SRFF:   {w: 150, h: 100},
    DFF:    {w: 125, h: 100},
    JKFF:   {w: 120, h: 125},
    TFF:    {w: 100, h: 100},
    CLOCK:  {w: 70,  h: 70},
}
export const CNT_IN_POS ={
    AND: [
        { x: 0, y: 20, },
        { x: 0, y: 55, }
    ],
    NAND:[
        { x: 0, y: 20, },
        { x: 0, y: 55, }
    ],
    OR:[
        { x: 0, y: 20, },
        { x: 0, y: 40, }
    ],
    NOR: [
        { x: 0, y: 20, },
        { x: 0, y: 55, }
    ],
    XOR: [
        { x: 0, y: 20, },
        { x: 0, y: 55, }
    ],
    XNOR: [
        { x: 0, y: 20, },
        { x: 0, y: 55, }
    ],
    NOT: [
        { x: 0, y: 37.5, },
    ],
    BUFFER: [
        { x: 0, y: 37.5, },
    ],
    SWITCH: [],
    LED: [
        { x: 0, y: 25, },
    ],
    SRFF: [
        { x: 0, y: 20, },
        { x: 0, y: 80, },
        { x: 0, y: 50, }
    ],
    DFF: [
        { x: 0, y: 15, },
        { x: 0, y: 80, }
    ],
    JKFF: [
        { x: 0, y: 35, },
        { x: 0, y: 85, },
        { x: 0, y: 60, }
    ],
    TFF: [
        { x: 0, y: 25, },
        { x: 0, y: 75, }
    ],
    CLOCK: [],
}
export const CNT_OUT_POS ={
    AND: [
        { x: 150, y: 37.5, },
    ],
    NAND:[
        { x: 150, y: 37.5, }
    ],
    OR:[
        { x: 150, y: 37.5, }
    ],
    NOR: [
        { x: 150, y: 37.5, }
    ],
    XOR: [
        { x: 150, y: 37.5, }
    ],
    XNOR: [
        { x: 150, y: 37.5, }
    ],
    NOT: [
        { x: 150, y: 37.5, },
    ],
    BUFFER: [
        { x: 150, y: 37.5, },
    ],
    SWITCH: [
        { x: 50, y: 25, },
    ],
    LED: [],
    SRFF: [
        { x: 150, y: 20, },
        { x: 150, y: 80, },
    ],
    DFF: [
        { x: 125, y: 15, },
        { x: 125, y: 80, }
    ],
    JKFF: [
        { x: 120, y: 35, },
        { x: 120, y: 85, },
    ],
    TFF: [
        { x: 100, y: 25, },
        { x: 100, y: 75, }
    ],
    CLOCK: [
        { x: 70, y: 35, },
    ],
}
export const CONNECTOR={
    h:24,
    w:24
}
export const INS={
    AND:    [0, 0   ],
    NAND:   [0, 0   ],
    OR:     [0, 0   ],
    NOR:    [0, 0   ],
    XOR:    [0, 0   ],
    XNOR:   [0, 0   ],
    NOT:    [0      ],
    BUFFER: [0      ],
    SWITCH: [       ],
    LED:    [0      ],
    SRFF:   [0, 0, 0],
    DFF:    [0, 0   ],
    JKFF:   [0, 0, 0],
    TFF:    [0, 0   ],
    CLOCK:  [       ],
}
export const OUTS={
    AND:    [0      ],
    NAND:   [0      ],
    OR:     [0      ],
    NOR:    [0      ],
    XOR:    [0      ],
    XNOR:   [0      ],
    NOT:    [0      ],
    BUFFER: [0      ],
    SWITCH: [0      ],
    LED:    [       ],
    SRFF:   [0, 0   ],
    DFF:    [0, 0   ],
    JKFF:   [0, 0   ],
    TFF:    [0, 0   ],
    CLOCK:  [0      ],
}
// export const SERVER_URL = "http://localhost:3333";
// export const LOGIC_GATE_URL = "http://localhost:3000";
// export const SIGNIN = '/signin';

export const SERVER_URL = {
    port: 3333,
    base: "http://localhost:3333",
    login: "/loginInfo",
    gates: "/gates",
    mongo: {
        base: "mongodb://localhost:27017",
        database: "LogicGateSimulation",
        collection: "LoginInfo",
    },
}
export const CLIENT_URL = {
    base: "http://localhost:3000",
    signin: '/signin',
}