#!/usr/bin/env node

'use strict';

let program = require('commander');
let fs = require('fs');
let _ = require('lodash');

program
    .version('1.0.0')
    .option('-c --config', 'Read config from file')
    .option('-e --exclude', 'Exclude file types')
    .option('-i --include', 'Include file types')
    .option('-o --out', 'Output type')
    .parse(process.argv);

if (program.config) {

}

if (program.include) {

} else if (program.exclude) {

}

if (program.out) {

} else {

}
