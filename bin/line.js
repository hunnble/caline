#!/usr/bin/env node

'use strict';

const program = require('commander');
const fs = require('fs');
const _ = require('lodash');

const line = require('../src/caline');
const output = require('../src/output');

let config = {};

program
    .version('1.0.0')
    .option('-i --include <name>', 'including file types, splitted by comma')
    .option('-e --exclude <name>', 'excluding file types, splitted by comma')
    .option('-p --excludePaths <name>', 'excluding paths, splitted by comma')
    .parse(process.argv);

if (program.include) {
    config.include = program.include.split(',');
}

if (program.exclude) {
    config.exclude = program.exclude.split(',');
}

if (program.excludePaths) {
    config.excludePaths = program.excludePaths.split(',');
}

output(line('./', config));
