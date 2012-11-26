var _65816 = (function() {
"use strict";
function range(a, b, step) {
	var A = [];
	A[0] = a;
	step = step || 1;
	while (a + step <= b) A[A.length] = a += step;
	return A;
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
 return "$" + b2.toString(16) + b1.toString(16);
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
 return "#" + b2.toString(16) + b1.toString(16);
}
function relative(b1) {
 var num = parseint(b1, 16);
 if (num >> 7 === 1) num = ~num + 1;
 return num;
}
function direct(b1) {
 return "$" + b1.toString(16);
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
 return "$" + b3.toString(16) + b2.toString(16) + b1.toString(16);
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
function directIndirectIndexedLongY(b1) {
 return directIndirectLong(b1) + ",Y";
}
function relativeLong(b1, b2) {
 var num = parseint(b2 + b1, 16);
 if (num >> 15 === 1) num = ~num + 1;
 return num;
}
function stackRelative(b1) {
 return b1 + ",S";
}
function stackRelativeIndirectIndexedY(b1) {
 return "(" + stackRelative(b1) + "),Y";
}
var m = true;
var x = true;
var hexToASMFuncs = {
	0x00: function(b1) { return "BRK"; },
	0x01: function(b1) { return "ORA " + directIndexedIndirectX(b1); },
	0x02: function() { return "COP"; },
	0x03: function(b1) { return "ORA " + stackRelative(b1); },
	0X06: function(b1) { return "ASL" },
	0x08: function() { return "PHP" },
	0x09: function(b1, b2) { return "ORA " + immediate(b1, b2); },
	0X0A: function() { return "ASL" },
	0X0E: function(b1, b2) { return "ASL" },
	0x10: function(b1) { return "BPL"; },
	0X16: function(b1) { return "ASL"; },
	0x18: function() { return "CLC"; },
	0X1E: function(b1, b2) { return "ASL" },
	0x20: function(b1, b2) { return "JSR " + absolute(b1, b2); },
	0x21: function(b1) { return "AND" },
	0x23: function(b1) { return "AND" },
	0x24: function(b1) { return "BIT " + direct(b1); },
	0x25: function(b1) { return "AND" },
	0x26: function(b1) { return "ROL " + direct(b1); },
	0x27: function(b1) { return "AND" },
	0x29: function(b1) { return "AND" },
	0x2D: function(b1, b2) { return "AND" },
	0x2F: function(b1, b2, b3) { return "AND" },
	0x30: function(b1) { return "BMI"; },
	0x31: function(b1) { return "AND" },
	0x32: function(b1) { return "AND" },
	0x33: function(b1) { return "AND" },
	0x35: function(b1) { return "AND" },
	0x37: function(b1) { return "AND" },
	0x39: function(b1, b2) { return "AND" },
	0x3D: function(b1, b2) { return "AND" },
	0x3F: function(b1, b2, b3) { return "AND" },
	0x42: function() { return "WDM"; },
	0x50: function(b1) { return "BVC"; },
	0x5c: function(b1, b2, b3) { return "JMP " + absoluteLong(b1, b2, b3); },
	0x61: function(b1) { return "ADC " + directIndexedIndirectX(b1); },
	0x63: function(b1) { return "ADC " + stackRelative(b1); },
	0x65: function(b1) { return "ADC " + direct(b1); },
	0x67: function(b1) { return "ADC " + directIndirectLong(b1); },
	0x68: function() { return "PLA"; },
	0x69: function(b1, b2) { return "ADC " + immediate(b1, b2); },
	0x6A: function() { return "ROR"; },
	0x6D: function(b1, b2) { return "ADC " + absolute(b1, b2); },
	0x6F: function(b1, b2, b3) { return "ADC " + absoluteLong(b1, b2, b3); },
	0x70: function(b1, b2) { return "BVS"; },
	0x71: function(b1) { return "ADC " + directIndirectIndexedY(b1, b2); },
	0x72: function(b1) { return "ADC " + directIndirect(b1); },
	0x73: function(b1) { return "ADC " + stackRelativeIndirectIndexedY(b1); },
	0x75: function(b1) { return "ADC " + directIndexedX(b1); },
	0x77: function(b1) { return "ADC " + directIndirectLongIndexedY(b1); },
	0x79: function(b1, b2) { return "ADC " + absoluteIndexedY(b1, b2); },
	0x7D: function(b1, b2) { return "ADC " + absoluteIndexedX(b1, b2); },
	0x7F: function(b1, b2, b3) { return "ADC " + absoluteLongIndexedX(b1, b2, b3); },
	0x80: function(b1) { return "BRA " + relative(b1); },
	0x82: function(b1, b2) { return "BRL"; },
	0x8D: function(b1, b2) { return "STA " + absolute(b1, b2); },
	0x8F: function(b1, b2, b3) { return "STA " + absoluteLong(b1, b2, b3); },
	0x90: function(b1) { return "BCC"; },
	0xB0: function(b1) { return "BCS"; },
	0xC2: function(b1) {
		if (b1 & 0x10 === 0x10) x = false;
		if (b1 & 0x20 === 0x20) m = false;
		return "REP " + immediate(b1, 0);
	},
	0xD0: function(b1) { return "BNE"; },
	0xE2: function(b1) {
		if (b1 & 0x10 === 0x10) x = true;
		if (b1 & 0x20 === 0x20) m = true;
		return "SEP " + immediate(b1, 0);
	},
	0xEB: function() { return "XBA"; },
	0xF0: function(b1) { return "BEQ"; },
	0xFB: function() { return "XCE"; },
	0xFF: function(b1, b2, b3) { return "SBC " + absoluteLongIndexedX(b1, b2, b3); },
};
_65816.disassemble = function(hex) {
	var length = hex.length;
	var asm = "";
	for (var i = 0; i < length; ++i) {
		var func = hexToASMFuncs[hex[i]];
		var operandlength = func.length;
		var args = new Array(operandlength);
		var opcode = hex[i];
		for (var j = 0; j < operandlength; ++j) {
			args[j] = hex[++i];
			if (m && [0x69, 0x29, 0x89, 0xc9, 0xe0, 0xc0, 0x49, 0xa9, 0x09, 0xe9].indexOf(hex[i]) != -1) {
				args[++j] = 0;
				break;
			}
			if (x && [0xa2, 0xa0].indexOf(hex[i]) != -1) {
				args[++j] = 0;
				break;
			}
		}
		console.log("opcode: " + opcode.toString(16) + " " + args);
		asm += func.apply(null, args) + "\n";
	}
	return asm;
};
return _65816;
})();
