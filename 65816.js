var _65816 = (function() {
"use strict";
function range(a, b, step) {
	var A = [];
	A[0] = a;
	step = step || 1;
	while (a + step <= b) A[A.length] = a += step;
	return A;
}
function pad(n, l) {
  var length = l || 2;
  return n.length >= length ? n : new Array(length - n.length + 1).join('0') + n;
}
function _65816(layout) {
	var A = 0;
	var B = 0;
	var X = 0;
	var Y = 0;
	var mem = [];
	switch (layout) {
	case "hirom":
		mem = [0 for (x in range(0x000000, 0xffffff))];
		break;
	case "lorom":
		for (var b = 0x00; b <= 0xff; ++b) {
			for (var a = 0x8000; a <= 0xffff; ++a) {
				mem[(b << 16) + a] = 0;
			}
		}
		break;
	}
}
_65816.prototype.run = function(code) {
	var lines = code.split("\n");
};

function absolute(b1, b2) {
 return "$" + pad(b2.toString(16)) + pad(b1.toString(16));
}
function absoluteIndexedX(b1, b2) {
 return absolute(b1, b2) + ",X";
}
function absoluteIndexedY(b1, b2) {
 return absolute(b1, b2) + ",Y";
}
function absoluteIndexedIndirect(b1, b2) {
 return "(" + absoluteIndexedX(b1, b2) + ")";
}
function absoluteIndirect(b1, b2) {
 return "(" + absolute(b1, b2) + ")";
}
function immediate(b1, b2) {
 return "#$" + pad(b2.toString(16)) + pad(b1.toString(16));
}
function relative(b1) {
 if (b1 >> 7 === 1) b1 = ~b1 + 1;
 return b1;
}
function direct(b1) {
 return "$" + pad(b1.toString(16));
}
function directIndexedY(b1) {
 return direct(b1) + ",Y";
}
function directIndexedX(b1) {
 return direct(b1) + ",X";
}
function directIndexedIndirectX(b1) {
 return "(" + directIndexedX(b1) + ")";
}
function directIndirectIndexedY(b1) {
 return directIndirect(b1) + ",Y";
}
function absoluteIndirectLong(b1, b2) {
 return "[" + absolute(b1, b2) + "]";
}
function absoluteLong(b1, b2, b3) {
 return "$" + pad(b3.toString(16)) + pad(b2.toString(16)) + pad(b1.toString(16));
}
function absoluteLongIndexedX(b1, b2, b3) {
 return absoluteLong(b1, b2, b3) + ",X";
}
function blockMove(b1, b2) {
 return b1 + "," + b2;
}
function directIndirect(b1) {
 return "(" + direct(b1) + ")";
}
function directIndirectLong(b1) {
 return "[" + direct(b1) + "]";
}
function directIndirectLongIndexedY(b1) {
 return directIndirectLong(b1) + ",Y";
}
function relativeLong(b1, b2) {
 var num = (b2 << 8) + b1;
 if (num >> 15 === 1) num = ~num + 1;
 return num;
}
function stackRelative(b1) {
 return pad(b1.toString(16)) + ",S";
}
function stackRelativeIndirectIndexedY(b1) {
 return "(" + stackRelative(b1) + "),Y";
}
var implied = accumulator = stackHardwareInterrupt = stackSoftwareInterrupt = stackPush = stackPull = stackRTI = stackRTS = function() {
 return "";
};

var m = true;
var x = true;
var hexToASMFuncs = {
	0x00: ["BRK", direct],
	0x01: ["ORA", directIndexedIndirectX],
	0x02: ["COP", implied],
	0x03: ["ORA", stackRelative],
	0x04: ["TSB", direct],
	0x05: ["ORA", direct],
	0X06: ["ASL", direct],
	0x07: ["ORA", directIndirectLong],
	0x08: ["PHP", implied],
	0x09: ["ORA", immediate],
	0X0A: ["ASL", implied],
	0x0B: ["PHD", implied],
	0x0C: ["TSB", absolute],
	0x0D: ["ORA", absolute],
	0X0E: ["ASL", absolute],
	0x0F: ["ORA", absoluteLong],
	0x10: ["BPL", relative],
	0x11: ["ORA", directIndirectIndexedY],
	0x12: ["ORA", directIndirect],
	0x13: ["ORA", stackRelativeIndirectIndexedY],
	0x14: ["TRB", direct],
	0x15: ["ORA", directIndexedX],
	0X16: ["ASL", directIndexedX],
	0x17: ["ORA", directIndirectLongIndexedY],
	0x18: ["CLC", implied],
	0x19: ["ORA", absoluteIndexedY],
	0x1A: ["INC", implied],
	0x1B: ["TCS", implied],
	0x1C: ["TRB", absolute],
	0x1D: ["ORA", absoluteIndexedX],
	0X1E: ["ASL", absoluteIndexedX],
	0x1F: ["ORA", absoluteLongIndexedX],
	0x20: ["JSR", absolute],
	0x21: ["AND", directIndexedIndirectX],
	0x22: ["JSR", absoluteLong],
	0x23: ["AND", stackRelative],
	0x24: ["BIT", direct],
	0x25: ["AND", direct],
	0x26: ["ROL", direct],
	0x27: ["AND", directIndirectLong],
	0x28: ["PLP", implied],
	0x29: ["AND", immediate],
	0x2A: [],
	0x2B: ["PLD", implied],
	0x2C: ["BIT", absolute],
	0x2D: ["AND", absolute],
	0x2E: ["ROL", absolute],
	0x2F: ["AND", absoluteLong],
	0x30: ["BMI", relative],
	0x31: ["AND", directIndirectIndexedY],
	0x32: ["AND", directIndirect],
	0x33: ["AND", stackRelativeIndirectIndexedY],
	0x34: [],
	0x35: ["AND", directIndexedX],
	0x36: [],
	0x37: ["AND", directIndirectLongIndexedY],
	0x38: [],
	0x39: ["AND", absoluteIndexedY],
	0x3A: [],
	0x3B: [],
	0x3C: [],
	0x3D: ["AND", absoluteIndexedX],
	0x3E: [],
	0x3F: ["AND", absoluteLongIndexedX],
	0x40: [],
	0x41: [],
	0x42: ["WDM", implied],
	0x43: [],
	0x44: [],
	0x45: [],
	0x46: [],
	0x47: [],
	0x48: ["PHA", implied],
	0x49: [],
	0x4E: ["LSR", absolute],
	0x50: ["BVC", relative],
	0x51: [],
	0x52: [],
	0x53: [],
	0x54: ["MVN", blockMove],
	0x55: [],
	0x56: ["LSR", directIndexedX],
	0x57: [],
	0x58: [],
	0x59: [],
	0x5A: [],
	0x5B: ["TCD", implied],
	0x5C: ["JMP", absoluteLong],
	0x60: ["RTS", implied],
	0x61: ["ADC", directIndexedIndirectX],
	0x63: ["ADC", stackRelative],
	0x64: ["STZ", direct],
	0x65: ["ADC", direct],
	0x67: ["ADC", directIndirectLong],
	0x68: ["PLA", implied],
	0x69: ["ADC", immediate],
	0x6A: ["ROR", implied],
	0x6B: ["RTL", implied],
	0x6D: ["ADC", absolute],
	0x6F: ["ADC", absoluteLong],
	0x70: ["BVS", relative],
	0x71: ["ADC", directIndirectIndexedY],
	0x72: ["ADC", directIndirect],
	0x73: ["ADC", stackRelativeIndirectIndexedY],
	0x75: ["ADC", directIndexedX],
	0x77: ["ADC", directIndirectLongIndexedY],
	0x79: ["ADC", absoluteIndexedY],
	0x7B: ["TDC", implied],
	0x7D: ["ADC", absoluteIndexedX],
	0x7F: ["ADC", absoluteLongIndexedX],
	0x80: ["BRA", relative],
	0x82: ["BRL", relativeLong],
	0x84: ["STY", direct],
	0x85: ["STA", direct],
	0x86: ["STX", direct],
	0x8A: ["TXA", implied],
	0x8D: ["STA", absolute],
	0x8E: ["STX", absolute],
	0x8F: ["STA", absoluteLong],
	0x90: ["BCC", relative],
	0x98: ["TYA", implied],
	0x9A: ["TXS", implied],
	0x9B: ["TXY", implied],
	0x9C: ["STZ", absolute],
	0xA0: ["LDY", immediate],
	0xA1: ["LDA", directIndexedIndirectX],
	0xA2: ["LDX", immediate],
	0xA3: ["LDA", stackRelative],
	0xA5: ["LDA", direct],
	0xA6: ["LDX", direct],
	0xA9: ["LDA", immediate],
	0xAA: ["TAX", implied],
	0xAD: ["LDA", absolute],
	0xAF: ["LDA", absoluteLong],
	0xB0: ["BCS", relative],
	0xC0: ["CPY", immediate],
	0xC2: ["REP", function(b1) {
		if ((b1 & 0x10) === 0x10) x = false;
		if ((b1 & 0x20) === 0x20) m = false;
		return "#%" + pad(b1.toString(2), 8);
	}],
	0xC8: ["INY", implied],
	0xC9: ["CMP", immediate],
	0xCE: ["DEC", absolute],
	0xD0: ["BNE", relative],
	0xDF: ["CMP", absoluteLongIndexedX],
	0xE2: ["SEP", function(b1) {
		if ((b1 & 0x10) === 0x10) x = true;
		if ((b1 & 0x20) === 0x20) m = true;
		return "#%" + pad(b1.toString(2), 8);
	}],
	0xE8: ["INX", implied],
	0xEA: ["NOP", implied],
	0xEB: ["XBA", implied],
	0xF0: ["BEQ", relative],
	0xFB: ["XCE", implied],
	0xFE: ["INC", absoluteIndexedX],
	0xFF: ["SBC", absoluteLongIndexedX]
};
_65816.disassemble = function(hex) {
	var length = hex.length;
	var asm = "";
	for (var i = 0; i < length; ++i) {
		var opcode = hex[i];
		var func = hexToASMFuncs[opcode];
		var mnemonic = func[0];
		var mode = func[1];
		var operandlength = mode.length;
		var args = new Array(operandlength);
		for (var j = 0; j < operandlength; ++j) {
			args[j] = hex[++i];
			if (m && [0x69, 0x29, 0x89, 0xc9, 0x49, 0xa9, 0x09, 0xe9].indexOf(opcode) != -1) {
				args[++j] = 0;
			}
			if (x && [0xe0, 0xc0, 0xa2, 0xa0].indexOf(opcode) != -1) {
				args[++j] = 0;
			}
		}
		asm += mnemonic + " " + mode.apply(null, args) + "\n";
	}
	return asm;
};
return _65816;
})();
