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
	var S = 0;
	var DB = 0;
	var DP = 0;
	var PB = 0;
	var P = 0;
	var PC = 0;
	var mem = [];
	switch (layout) {
	case "hirom":
		mem = [0 for (x in range(0x000000, 0xffffff))];
		break;
	case "lorom":
		mem = [0 for (x in range(0x000000, 0xffffff)) if ((x & 0xffff) >= 0x8000)];
		break;
	}
}

_65816.prototype.run = function(code) {
	
	var lines = code.split("\n");
	var linecount = lines.length;
	for (var lineno = 0; lineno < linecount; ++i) {
		var line = lines[lineno];
		[mnemonic, operand] = line.split(' ');
		var opcode = ASMtoHex[mnemonic][operand];
	}
};

function hexbyte(n) {
 return pad(n.toString(16));
}

var bank = "";

function absolute(b1, b2) {
 var address = "$" + hexbyte(b2) + hexbyte(b1);
 var name = _65816.named_memory_locations[bank][(b2 << 8) + b1];
 if (name) {
  return ('<span title="' + address + '">' + name + '</span>');
 }
 return address;
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
 return "#$" + hexbyte(b2) + hexbyte(b1);
}
function relative(b1) {
 if (b1 >> 7 === 1) b1 = -((~b1 + 1) & 0xff);
 return b1;
}
function direct(b1) {
 var address = "$" + hexbyte(b1);
 var name = _65816.named_memory_locations["directpage"][b1];
 if (name) {
  return ('<span title="' + address + '">' + name + '</span>');
 }
 return address;
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
 return "$" + hexbyte(b3) + hexbyte(b2) + hexbyte(b1);
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
 if (num >> 15 === 1) num = -((~num + 1) & 0xffff)
 return num;
}
function stackRelative(b1) {
 return hexbyte(b1) + ",S";
}
function stackRelativeIndirectIndexedY(b1) {
 return "(" + stackRelative(b1) + "),Y";
}
function implied() {
 return "";
}
function accumulator() {
 return "";
}
function stackPush() {
 return "";
}
function stackPull() {
 return "";
}
function stackRTI() {
 return "";
}
function stackRTS() {
 return "";
}
function stackRTL() {
 return "";
}
function stackInterrupt(b1) {
 return "";
}
function stackProgramCounterRelativeLong(b1, b2) {
 return relativeLong(b1, b2);
}
function stackAbsolute(b1, b2) {
 return absolute(b1, b2);
}
function stackDirectIndirect(b1) {
 return directIndirect(b1);
}

var m = true;
var x = true;
var hexToASM = {
	0x00: ["BRK", stackInterrupt],
	0x01: ["ORA", directIndexedIndirectX],
	0x02: ["COP", stackInterrupt],
	0x03: ["ORA", stackRelative],
	0x04: ["TSB", direct],
	0x05: ["ORA", direct],
	0X06: ["ASL", direct],
	0x07: ["ORA", directIndirectLong],
	0x08: ["PHP", stackPush],
	0x09: ["ORA", immediate],
	0X0A: ["ASL", accumulator],
	0x0B: ["PHD", stackPush],
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
	0x1A: ["INC", accumulator],
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
	0x28: ["PLP", stackPull],
	0x29: ["AND", immediate],
	0x2A: ["ROL", accumulator],
	0x2B: ["PLD", stackPull],
	0x2C: ["BIT", absolute],
	0x2D: ["AND", absolute],
	0x2E: ["ROL", absolute],
	0x2F: ["AND", absoluteLong],
	0x30: ["BMI", relative],
	0x31: ["AND", directIndirectIndexedY],
	0x32: ["AND", directIndirect],
	0x33: ["AND", stackRelativeIndirectIndexedY],
	0x34: ["BIT", directIndexedX],
	0x35: ["AND", directIndexedX],
	0x36: ["ROL", directIndexedX],
	0x37: ["AND", directIndirectLongIndexedY],
	0x38: ["SEC", implied],
	0x39: ["AND", absoluteIndexedY],
	0x3A: ["DEC", accumulator],
	0x3B: ["TSC", implied],
	0x3C: ["BIT", absoluteIndexedX],
	0x3D: ["AND", absoluteIndexedX],
	0x3E: ["ROL", absoluteIndexedX],
	0x3F: ["AND", absoluteLongIndexedX],
	0x40: ["RTI", stackRTI],
	0x41: ["EOR", directIndexedIndirectX],
	0x42: ["WDM", function(b1) { return ""; }],
	0x43: ["EOR", stackRelative],
	0x44: ["MVP", blockMove],
	0x45: ["EOR", direct],
	0x46: ["LSR", direct],
	0x47: ["EOR", directIndirectLong],
	0x48: ["PHA", stackPush],
	0x49: ["EOR", immediate],
	0x4A: ["LSR", accumulator],
	0x4B: ["PHK", stackPush],
	0x4C: ["JMP", absolute],
	0x4D: ["EOR", absolute],
	0x4E: ["LSR", absolute],
	0x4F: ["EOR", absoluteLong],
	0x50: ["BVC", relative],
	0x51: ["EOR", directIndirectIndexedY],
	0x52: ["EOR", directIndirect],
	0x53: ["EOR", stackRelativeIndirectIndexedY],
	0x54: ["MVN", blockMove],
	0x55: ["EOR", directIndexedX],
	0x56: ["LSR", directIndexedX],
	0x57: ["EOR", directIndirectLongIndexedY],
	0x58: ["CLI", implied],
	0x59: ["EOR", absoluteIndexedY],
	0x5A: ["PHY", stackPush],
	0x5B: ["TCD", implied],
	0x5C: ["JMP", absoluteLong],
	0x5D: ["EOR", absoluteIndexedX],
	0x5E: ["LSR", absoluteIndexedX],
	0x5F: ["EOR", absoluteLongIndexedX],
	0x60: ["RTS", stackRTS],
	0x61: ["ADC", directIndexedIndirectX],
	0x62: ["PER", stackProgramCounterRelativeLong],
	0x63: ["ADC", stackRelative],
	0x64: ["STZ", direct],
	0x65: ["ADC", direct],
	0x66: ["ROR", direct],
	0x67: ["ADC", directIndirectLong],
	0x68: ["PLA", stackPull],
	0x69: ["ADC", immediate],
	0x6A: ["ROR", accumulator],
	0x6B: ["RTL", stackRTL],
	0x6C: ["JMP", absoluteIndirect],
	0x6D: ["ADC", absolute],
	0x6E: ["ROR", absolute],
	0x6F: ["ADC", absoluteLong],
	0x70: ["BVS", relative],
	0x71: ["ADC", directIndirectIndexedY],
	0x72: ["ADC", directIndirect],
	0x73: ["ADC", stackRelativeIndirectIndexedY],
	0x74: ["STZ", directIndexedX],
	0x75: ["ADC", directIndexedX],
	0x76: ["ROR", directIndexedX],
	0x77: ["ADC", directIndirectLongIndexedY],
	0x78: ["SEI", implied],
	0x79: ["ADC", absoluteIndexedY],
	0x7A: ["PLY", stackPull],
	0x7B: ["TDC", implied],
	0x7C: ["JMP", absoluteIndexedIndirect],
	0x7D: ["ADC", absoluteIndexedX],
	0x7E: ["ROR", absoluteIndexedX],
	0x7F: ["ADC", absoluteLongIndexedX],
	0x80: ["BRA", relative],
	0x81: ["STA", directIndexedIndirectX],
	0x82: ["BRL", relativeLong],
	0x83: ["STA", stackRelative],
	0x84: ["STY", direct],
	0x85: ["STA", direct],
	0x86: ["STX", direct],
	0x87: ["STA", directIndirectLong],
	0x88: ["DEY", implied],
	0x89: ["BIT", immediate],
	0x8A: ["TXA", implied],
	0x8B: ["PHB", stackPush],
	0x8C: ["STY", absolute],
	0x8D: ["STA", absolute],
	0x8E: ["STX", absolute],
	0x8F: ["STA", absoluteLong],
	0x90: ["BCC", relative],
	0x91: ["STA", directIndirectIndexedY],
	0x92: ["STA", directIndirect],
	0x93: ["STA", stackRelativeIndirectIndexedY],
	0x94: ["STY", directIndexedX],
	0x95: ["STA", directIndexedX],
	0x96: ["STX", directIndexedY],
	0x97: ["STA", directIndirectLongIndexedY],
	0x98: ["TYA", implied],
	0x99: ["STA", absoluteIndexedY],
	0x9A: ["TXS", implied],
	0x9B: ["TXY", implied],
	0x9C: ["STZ", absolute],
	0x9D: ["STA", absoluteIndexedX],
	0x9E: ["STZ", absoluteIndexedX],
	0x9F: ["STA", absoluteLongIndexedX],
	0xA0: ["LDY", immediate],
	0xA1: ["LDA", directIndexedIndirectX],
	0xA2: ["LDX", immediate],
	0xA3: ["LDA", stackRelative],
	0xA4: ["LDY", direct],
	0xA5: ["LDA", direct],
	0xA6: ["LDX", direct],
	0xA7: ["LDA", directIndirectLong],
	0xA8: ["TAY", implied],
	0xA9: ["LDA", immediate],
	0xAA: ["TAX", implied],
	0xAB: ["PLB", stackPull],
	0xAC: ["LDY", absolute],
	0xAD: ["LDA", absolute],
	0xAE: ["LDX", absolute],
	0xAF: ["LDA", absoluteLong],
	0xB0: ["BCS", relative],
	0xB1: ["LDA", directIndirectIndexedY],
	0xB2: ["LDA", directIndirect],
	0xB3: ["LDA", stackRelativeIndirectIndexedY],
	0xB4: ["LDY", directIndexedX],
	0xB5: ["LDA", directIndexedX],
	0xB6: ["LDX", directIndexedY],
	0xB7: ["LDA", directIndirectLongIndexedY],
	0xB8: ["CLV", implied],
	0xB9: ["LDA", absoluteIndexedY],
	0xBA: ["TSX", implied],
	0xBB: ["TYX", implied],
	0xBC: ["LDY", absoluteIndexedX],
	0xBD: ["LDA", absoluteIndexedX],
	0xBE: ["LDX", absoluteIndexedY],
	0xBF: ["LDA", absoluteLongIndexedX],
	0xC0: ["CPY", immediate],
	0xC1: ["CMP", directIndexedIndirectX],
	0xC2: ["REP", function(b1) {
		if ((b1 & 0x10) === 0x10) x = false;
		if ((b1 & 0x20) === 0x20) m = false;
		return "#%" + pad(b1.toString(2), 8);
	}],
	0xC3: ["CMP", stackRelative],
	0xC4: ["CPY", direct],
	0xC5: ["CMP", direct],
	0xC6: ["DEC", direct],
	0xC7: ["CMP", directIndirectLong],
	0xC8: ["INY", implied],
	0xC9: ["CMP", immediate],
	0xCA: ["DEX", implied],
	0xCB: ["WAI", implied],
	0xCC: ["CPY", absolute],
	0xCD: ["CMP", absolute],
	0xCE: ["DEC", absolute],
	0xCF: ["CMP", absoluteLong],
	0xD0: ["BNE", relative],
	0xD1: ["CMP", directIndirectIndexedY],
	0xD2: ["CMP", directIndirect],
	0xD3: ["CMP", stackRelativeIndirectIndexedY],
	0xD4: ["PEI", stackDirectIndirect],
	0xD5: ["CMP", directIndexedX],
	0xD6: ["DEC", directIndexedX],
	0xD7: ["CMP", directIndirectLongIndexedY],
	0xD8: ["CLD", implied],
	0xD9: ["CMP", absoluteIndexedY],
	0xDA: ["PHX", stackPush],
	0xDB: ["STP", implied],
	0xDC: ["JMP", absoluteIndirectLong],
	0xDD: ["CMP", absoluteIndexedX],
	0xDE: ["DEC", absoluteIndexedX],
	0xDF: ["CMP", absoluteLongIndexedX],
	0xE0: ["CPX", immediate],
	0xE1: ["SBC", directIndexedIndirectX],
	0xE2: ["SEP", function(b1) {
		if ((b1 & 0x10) === 0x10) x = true;
		if ((b1 & 0x20) === 0x20) m = true;
		return "#%" + pad(b1.toString(2), 8);
	}],
	0xE3: ["SBC", stackRelative],
	0xE4: ["CPX", direct],
	0xE5: ["SBC", direct],
	0xE6: ["INC", direct],
	0xE7: ["SBC", directIndirectLong],
	0xE8: ["INX", implied],
	0xE9: ["SBC", immediate],
	0xEA: ["NOP", implied],
	0xEB: ["XBA", implied],
	0xEC: ["CPX", absolute],
	0xED: ["SBC", absolute],
	0xEE: ["INC", absolute],
	0xEF: ["SBC", absoluteLong],
	0xF0: ["BEQ", relative],
	0xF1: ["SBC", directIndirectIndexedY],
	0xF2: ["SBC", directIndirect],
	0xF3: ["SBC", stackRelativeIndirectIndexedY],
	0xF4: ["PEA", stackAbsolute],
	0xF5: ["SBC", directIndexedX],
	0xF6: ["INC", directIndexedX],
	0xF7: ["SBC", directIndirectLongIndexedY],
	0xF8: ["SED", implied],
	0xF9: ["SBC", absoluteIndexedY],
	0xFA: ["PLX", stackPull],
	0xFB: ["XCE", implied],
	0xFC: ["JSR", absoluteIndexedIndirect],
	0xFD: ["SBC", absoluteIndexedX],
	0xFE: ["INC", absoluteIndexedX],
	0xFF: ["SBC", absoluteLongIndexedX]
};

_65816.named_memory_locations = { "programbank": [], "databank": [], "directpage": [] };

var ASMtoHex = (function() {
	var ret = {};
	for (var i = 0x00; i < 0xFF; ++i) {
		var opcode = hexToASM[i];
		var mnemonic = opcode[0];
		var mode = opcode[1];
		if (typeof ret[mnemonic] === 'undefined') ret[mnemonic] = {};
		ret[mnemonic][mode] = i;
	}
	return ret;
})();

_65816.disassemble = function(hex, startAddress, labels) {
	var length = hex.length;
	var asm = "";
	for (var i = 0; i < length; ++i) {
		var opcode = hex[i];
		var func = hexToASM[opcode];
		var mnemonic = func[0];
		var mode = func[1];
		bank = ["JMP", "JSR"].indexOf(mnemonic) !== -1 ? "programbank" : "databank";
		var operandlength = mode.length;
		var args = new Array(operandlength);
		var operand = "";
		var currentAddress = startAddress + i;
		for (var j = 0; j < operandlength; ++j) {
			args[j] = hex[++i];
			if (m && [0x69, 0x29, 0x89, 0xc9, 0x49, 0xa9, 0x09, 0xe9].indexOf(opcode) !== -1) {
				args[++j] = 0;
				--operandlength;
			}
			else if (x && [0xe0, 0xc0, 0xa2, 0xa0].indexOf(opcode) !== -1) {
				args[++j] = 0;
				--operandlength;
			}
		}
		switch (mode) {
		case relative:
			var rel = mode.apply(null, args);
			operand = labels[(currentAddress + operandlength + 1 + rel) & 0xffff];
			break;
		case relativeLong:
			var rel = mode.apply(null, args);
			operand = labels[(currentAddress + operandlength + 1 + rel) & 0xffff];
			break;
		default:
			operand = mode.apply(null, args);
		}
		var label = labels && labels.hasOwnProperty(currentAddress & 0xffff) ? labels[currentAddress & 0xffff] + ":" : "\t";
		asm += "$" + pad(currentAddress.toString(16), 6) + "\t" + label + "\t" + mnemonic + " " + operand + "\n";
	}
	return asm;
};
return _65816;
})();
