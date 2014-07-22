var _65816 = (function() {
  'use strict';
  function range(a, b, step) {
    var arr = [a];
    step = step || 1;
    while (a + step <= b) arr.push(a += step);
    return arr;
  }
  function pad(n, length) {
    var nl = n.length;
    length = length || 2;
    return nl >= length ? n : new Array(length - nl + 1).join('0') + n;
  }
  function hexByte(b) {
    return pad(b.toString(16), 2);
  }
  function hexShort(b1, b2) {
    return pad((b1 | (b2 << 8)).toString(16), 4);
  }
  function hexLong(b1, b2, b3) {
    return pad((b1 | (b2 << 8) | (b3 << 16)).toString(16), 6);
  }
  function bin(b) {
    return pad(b.toString(2), 8);
  }

  // mode helpers
  function indirect(str) {
    return '(' + str + ')';
  }
  function indirectLong(str) {
    return '[' + str + ']';
  }
  function indexedX(str) {
    return str + ',X';
  }
  function indexedY(str) {
    return str + ',Y';
  }
  function immediate(str) {
    return '#' + str;
  }
  function immediateReg(flag, b1, b2) {
    if (flag) return immediate(direct(b1));
    return immediate(absolute(b1, b2));
  }

  // addressing modes
  function absolute(b1, b2) {
    return '$' + hexShort(b1, b2);
  }
  function absoluteIndexedX(b1, b2) {
    return indexedX(absolute(b1, b2));
  }
  function absoluteIndexedY(b1, b2) {
    return indexedY(absolute(b1, b2));
  }
  function absoluteIndexedIndirect(b1, b2) {
    return indirect(absoluteIndexedX(b1, b2));
  }
  function absoluteIndirect(b1, b2) {
    return indirect(absolute(b1, b2));
  }
  function immediateA(b1, b2) {
    return immediateReg(m, b1, b2);
  }
  function immediateXY(b1, b2) {
    return immediateReg(x, b1, b2);
  }
  function relative(b) {
    return b << 24 >> 24;
  }
  function direct(b) {
    return '$' + hexByte(b);
  }
  function directIndexedY(b) {
    return indexedY(direct(b));
  }
  function directIndexedX(b) {
    return indexedX(direct(b));
  }
  function directIndexedXIndirect(b) {
    return indirect(directIndexedX(b));
  }
  function directIndirectIndexedY(b) {
    return indexedY(directIndirect(b));
  }
  function absoluteIndirectLong(b1, b2) {
    return indirectLong(absolute(b1, b2));
  }
  function absoluteLong(b1, b2, b3) {
    return '$' + hexLong(b1, b2, b3);
  }
  function absoluteLongIndexedX(b1, b2, b3) {
    return indexedX(absoluteLong(b1, b2, b3));
  }
  function blockMove(b1, b2) {
    return b1 + ',' + b2;
  }
  function directIndirect(b) {
    return indirect(direct(b));
  }
  function directIndirectLong(b) {
    return indirectLong(direct(b));
  }
  function directIndirectLongIndexedY(b) {
    return indexedY(directIndirectLong(b));
  }
  function relativeLong(b1, b2) {
    return ((b2 << 8) | b1) << 16 >> 16;
  }
  function stackRelative(b) {
    return hexByte(b) + ',S';
  }
  function stackRelativeIndirectIndexedY(b) {
    return indexedY(indirect(stackRelative(b)));
  }
  function implied() {
    return null;
  }
  function accumulator() {
    return null;
  }
  function stackPush() {
    return null;
  }
  function stackPull() {
    return null;
  }
  function stackRTI() {
    return null;
  }
  function stackRTS() {
    return null;
  }
  function stackRTL() {
    return null;
  }
  function stackInterrupt(b) {
    return null;
  }
  function stackProgramCounterRelativeLong(b1, b2) {
    return relativeLong(b1, b2);
  }
  function stackAbsolute(b1, b2) {
    return absolute(b1, b2);
  }
  function stackDirectIndirect(b) {
    return directIndirect(b);
  }

  var m = true, x = true;
  function updateFlags(p, set) {
    if (p & 0x10) x = set;
    if (p & 0x20) m = set;
  }

  var hexToASM = [
    ['BRK', stackInterrupt],
    ['ORA', directIndexedXIndirect],
    ['COP', stackInterrupt],
    ['ORA', stackRelative],
    ['TSB', direct],
    ['ORA', direct],
    ['ASL', direct],
    ['ORA', directIndirectLong],
    ['PHP', stackPush],
    ['ORA', immediateA],
    ['ASL', accumulator],
    ['PHD', stackPush],
    ['TSB', absolute],
    ['ORA', absolute],
    ['ASL', absolute],
    ['ORA', absoluteLong],
    ['BPL', relative],
    ['ORA', directIndirectIndexedY],
    ['ORA', directIndirect],
    ['ORA', stackRelativeIndirectIndexedY],
    ['TRB', direct],
    ['ORA', directIndexedX],
    ['ASL', directIndexedX],
    ['ORA', directIndirectLongIndexedY],
    ['CLC', implied],
    ['ORA', absoluteIndexedY],
    ['INC', accumulator],
    ['TCS', implied],
    ['TRB', absolute],
    ['ORA', absoluteIndexedX],
    ['ASL', absoluteIndexedX],
    ['ORA', absoluteLongIndexedX],
    ['JSR', absolute],
    ['AND', directIndexedXIndirect],
    ['JSL', absoluteLong],
    ['AND', stackRelative],
    ['BIT', direct],
    ['AND', direct],
    ['ROL', direct],
    ['AND', directIndirectLong],
    ['PLP', stackPull],
    ['AND', immediateA],
    ['ROL', accumulator],
    ['PLD', stackPull],
    ['BIT', absolute],
    ['AND', absolute],
    ['ROL', absolute],
    ['AND', absoluteLong],
    ['BMI', relative],
    ['AND', directIndirectIndexedY],
    ['AND', directIndirect],
    ['AND', stackRelativeIndirectIndexedY],
    ['BIT', directIndexedX],
    ['AND', directIndexedX],
    ['ROL', directIndexedX],
    ['AND', directIndirectLongIndexedY],
    ['SEC', implied],
    ['AND', absoluteIndexedY],
    ['DEC', accumulator],
    ['TSC', implied],
    ['BIT', absoluteIndexedX],
    ['AND', absoluteIndexedX],
    ['ROL', absoluteIndexedX],
    ['AND', absoluteLongIndexedX],
    ['RTI', stackRTI],
    ['EOR', directIndexedXIndirect],
    ['WDM', function(b) { return null; }],
    ['EOR', stackRelative],
    ['MVP', blockMove],
    ['EOR', direct],
    ['LSR', direct],
    ['EOR', directIndirectLong],
    ['PHA', stackPush],
    ['EOR', immediateA],
    ['LSR', accumulator],
    ['PHK', stackPush],
    ['JMP', absolute],
    ['EOR', absolute],
    ['LSR', absolute],
    ['EOR', absoluteLong],
    ['BVC', relative],
    ['EOR', directIndirectIndexedY],
    ['EOR', directIndirect],
    ['EOR', stackRelativeIndirectIndexedY],
    ['MVN', blockMove],
    ['EOR', directIndexedX],
    ['LSR', directIndexedX],
    ['EOR', directIndirectLongIndexedY],
    ['CLI', implied],
    ['EOR', absoluteIndexedY],
    ['PHY', stackPush],
    ['TCD', implied],
    ['JML', absoluteLong],
    ['EOR', absoluteIndexedX],
    ['LSR', absoluteIndexedX],
    ['EOR', absoluteLongIndexedX],
    ['RTS', stackRTS],
    ['ADC', directIndexedXIndirect],
    ['PER', stackProgramCounterRelativeLong],
    ['ADC', stackRelative],
    ['STZ', direct],
    ['ADC', direct],
    ['ROR', direct],
    ['ADC', directIndirectLong],
    ['PLA', stackPull],
    ['ADC', immediateA],
    ['ROR', accumulator],
    ['RTL', stackRTL],
    ['JMP', absoluteIndirect],
    ['ADC', absolute],
    ['ROR', absolute],
    ['ADC', absoluteLong],
    ['BVS', relative],
    ['ADC', directIndirectIndexedY],
    ['ADC', directIndirect],
    ['ADC', stackRelativeIndirectIndexedY],
    ['STZ', directIndexedX],
    ['ADC', directIndexedX],
    ['ROR', directIndexedX],
    ['ADC', directIndirectLongIndexedY],
    ['SEI', implied],
    ['ADC', absoluteIndexedY],
    ['PLY', stackPull],
    ['TDC', implied],
    ['JMP', absoluteIndexedIndirect],
    ['ADC', absoluteIndexedX],
    ['ROR', absoluteIndexedX],
    ['ADC', absoluteLongIndexedX],
    ['BRA', relative],
    ['STA', directIndexedXIndirect],
    ['BRL', relativeLong],
    ['STA', stackRelative],
    ['STY', direct],
    ['STA', direct],
    ['STX', direct],
    ['STA', directIndirectLong],
    ['DEY', implied],
    ['BIT', immediateA],
    ['TXA', implied],
    ['PHB', stackPush],
    ['STY', absolute],
    ['STA', absolute],
    ['STX', absolute],
    ['STA', absoluteLong],
    ['BCC', relative],
    ['STA', directIndirectIndexedY],
    ['STA', directIndirect],
    ['STA', stackRelativeIndirectIndexedY],
    ['STY', directIndexedX],
    ['STA', directIndexedX],
    ['STX', directIndexedY],
    ['STA', directIndirectLongIndexedY],
    ['TYA', implied],
    ['STA', absoluteIndexedY],
    ['TXS', implied],
    ['TXY', implied],
    ['STZ', absolute],
    ['STA', absoluteIndexedX],
    ['STZ', absoluteIndexedX],
    ['STA', absoluteLongIndexedX],
    ['LDY', immediateXY],
    ['LDA', directIndexedXIndirect],
    ['LDX', immediateXY],
    ['LDA', stackRelative],
    ['LDY', direct],
    ['LDA', direct],
    ['LDX', direct],
    ['LDA', directIndirectLong],
    ['TAY', implied],
    ['LDA', immediateA],
    ['TAX', implied],
    ['PLB', stackPull],
    ['LDY', absolute],
    ['LDA', absolute],
    ['LDX', absolute],
    ['LDA', absoluteLong],
    ['BCS', relative],
    ['LDA', directIndirectIndexedY],
    ['LDA', directIndirect],
    ['LDA', stackRelativeIndirectIndexedY],
    ['LDY', directIndexedX],
    ['LDA', directIndexedX],
    ['LDX', directIndexedY],
    ['LDA', directIndirectLongIndexedY],
    ['CLV', implied],
    ['LDA', absoluteIndexedY],
    ['TSX', implied],
    ['TYX', implied],
    ['LDY', absoluteIndexedX],
    ['LDA', absoluteIndexedX],
    ['LDX', absoluteIndexedY],
    ['LDA', absoluteLongIndexedX],
    ['CPY', immediateXY],
    ['CMP', directIndexedXIndirect],
    ['REP', function(b) {
      updateFlags(b, false);
      return immediate('%' + bin(b));
    }],
    ['CMP', stackRelative],
    ['CPY', direct],
    ['CMP', direct],
    ['DEC', direct],
    ['CMP', directIndirectLong],
    ['INY', implied],
    ['CMP', immediateA],
    ['DEX', implied],
    ['WAI', implied],
    ['CPY', absolute],
    ['CMP', absolute],
    ['DEC', absolute],
    ['CMP', absoluteLong],
    ['BNE', relative],
    ['CMP', directIndirectIndexedY],
    ['CMP', directIndirect],
    ['CMP', stackRelativeIndirectIndexedY],
    ['PEI', stackDirectIndirect],
    ['CMP', directIndexedX],
    ['DEC', directIndexedX],
    ['CMP', directIndirectLongIndexedY],
    ['CLD', implied],
    ['CMP', absoluteIndexedY],
    ['PHX', stackPush],
    ['STP', implied],
    ['JMP', absoluteIndirectLong],
    ['CMP', absoluteIndexedX],
    ['DEC', absoluteIndexedX],
    ['CMP', absoluteLongIndexedX],
    ['CPX', immediateXY],
    ['SBC', directIndexedXIndirect],
    ['SEP', function(b) {
      updateFlags(b, true);
      return immediate('%' + bin(b));
    }],
    ['SBC', stackRelative],
    ['CPX', direct],
    ['SBC', direct],
    ['INC', direct],
    ['SBC', directIndirectLong],
    ['INX', implied],
    ['SBC', immediateA],
    ['NOP', implied],
    ['XBA', implied],
    ['CPX', absolute],
    ['SBC', absolute],
    ['INC', absolute],
    ['SBC', absoluteLong],
    ['BEQ', relative],
    ['SBC', directIndirectIndexedY],
    ['SBC', directIndirect],
    ['SBC', stackRelativeIndirectIndexedY],
    ['PEA', stackAbsolute],
    ['SBC', directIndexedX],
    ['INC', directIndexedX],
    ['SBC', directIndirectLongIndexedY],
    ['SED', implied],
    ['SBC', absoluteIndexedY],
    ['PLX', stackPull],
    ['XCE', implied],
    ['JSR', absoluteIndexedIndirect],
    ['SBC', absoluteIndexedX],
    ['INC', absoluteIndexedX],
    ['SBC', absoluteLongIndexedX]
  ];

  function maxPropertyNameLength(o) {
    var keys = Object.keys(o);
    if (keys.length === 0) return 0;
    return Math.max.apply(null, keys.map(function(name) {
      return o[name].length;
    }));
  }

  function Dissassembler(memory, startAddress, labels, memoryMap) {
    this.memory = memory;
    this.currentAddress = startAddress;
    this.labels = labels || {};
    this.maxLabelLength = maxPropertyNameLength(labels);
    this.pc = 0;
    this.memoryMap = memoryMap || {};
  }

  Dissassembler.prototype.readPC = function () {
    ++this.currentAddress;
    return this.memory[this.pc++];
  };

  Dissassembler.prototype.disassemble = function () {
    var mem = this.memory;
    var output = '';
    while (this.pc < this.memory.length) {
      output += this.step() + '\n';
    }
    return output;
  };

  Dissassembler.prototype.step = function () {
    var labels = this.labels,
        address = this.currentAddress,
        info = hexToASM[this.readPC()],
        mnemonic = info[0],
        mode = info[1],
        label = labels[address & 0xffff],
        output = '$' + pad(address.toString(16), 6) + ' ' +
          (label ?
           (label + ': ' + new Array(this.maxLabelLength - (label.length - 1)).join(' ')) :
           new Array(this.maxLabelLength + 3).join(' ')) + mnemonic,
        operandLength = mode.length,
        args = new Array(operandLength),
        j,
        operand;
    if (m && mode === immediateA || x && mode === immediateXY) {
      --operandLength;
    }
    for (j = 0; j < operandLength; ++j) {
      args[j] = this.readPC();
    }
    operand = mode.apply(null, args);
    switch (mode) {
    case relative:
    case relativeLong:
      operand = labels[(address + 2 + operand) & 0xffff];
    }
    if (operand !== null) {
      if (operand in this.memoryMap) output += ' ' + this.memoryMap[operand];
      else output += ' ' + operand;
    }
    return output;
  };

  return Dissassembler;
}());
