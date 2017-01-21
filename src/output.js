'use strict';

const _ = require('lodash');
const colors = require('colors/safe');

const ex = { md: { files: 5, code: 461, comment: 14, blank: 200 },
  json: { files: 4, code: 338, comment: 0, blank: 4 },
  JavaScript: { files: 1054, code: 39245, comment: 2200, blank: 4602 },
  sample: { files: 9, code: 431, comment: 0, blank: 74 },
  yml: { files: 1, code: 5, comment: 0, blank: 1 } }

/**
 * @param order {Number} 0=aesc 1=desc
 */
function outputTable(datas, order=1) {
    datas = _.toPairs(datas).sort(function(data1, data2) {
        if (order === 1) {
            return data2[1].code - data1[1].code;
        } else {
            return data1[1].code - data2[1].code;
        }
    });
    let sumCode = 0;
    let sumComment = 0;
    let sumBlank = 0;

    console.log(colors.white.bold(_.pad('Language', 20) + _.pad('code', 20) + _.pad('comment', 20) + _.pad('blank', 20)));
    _.forEach(datas, function(data) {
        sumCode += data[1].code;
        sumComment += data[1].comment;
        sumBlank += data[1].blank;
        console.log(colors.blue.bold(_.pad(data[0], 20)) + colors.cyan.bold(_.pad(data[1].code, 20) + _.pad(data[1].comment, 20) + _.pad(data[1].blank, 20)));
    });
    console.log(colors.blue.bold(_.pad('Sum', 20)) + colors.cyan((_.pad(sumCode, 20) + _.pad(sumComment, 20) + _.pad(sumBlank, 20))));
}

module.exports = outputTable;
