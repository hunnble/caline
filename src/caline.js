'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const lang = require('./lang');
const output = require('./output');

/**
 * 统计代码行数
 * @param context {String} 目标路径
 * @config config {Object} 配置项
 * @return result {Object} 文件(语言)类型为键，值包含code(代码行数)、comment(注释行数)、blank(空行数)
 */
function caline(context, config={}) {
    let paths = [context];
    let result = {};
    while(paths.length > 0) {
        let p = paths[0];
        let files = fs.readdirSync(p);

        paths.shift();

        files.forEach(function(file) {
            file = path.resolve(p, file);
            let stat = fs.statSync(file);

            if (stat.isFile()) {
                let name = path.extname(file).slice(1);
                if (
                    !name ||
                    config.include &&
                    _.indexOf(config.include, name) === -1 ||
                    config.exclude &&
                    _.indexOf(config.exclude, name) !== -1
                ) {
                    return;
                }
                let content = fs.readFileSync(file, { encoding: 'utf8' });
                let codeNum = 0;
                let commentNum = 0;
                let blankNum = 0;

                content = content.split('\n');
                let noBlank = _.compact(content);
                blankNum = content.length - noBlank.length;
                let tmpLen = noBlank.length;
                _.remove(noBlank, function(line) {
                    line = _.trimStart(line);
                    if (lang[name] && _.isArray(lang[name].comments)) {
                        for (let comment of lang[name].comments) {
                            if (_.startsWith(line, comment)) {
                                name = lang[name].name;
                                return true;
                            }
                        }
                        name = lang[name].name;

                        return false;
                    }
                    return _.startsWith(line, '//') || _.startsWith(line, '/*');
                });
                codeNum = noBlank.length;
                commentNum = tmpLen - codeNum;

                if (!result[name]) {
                    result[name] = {};
                    result[name].files = 1;
                    result[name].code = codeNum;
                    result[name].comment = commentNum;
                    result[name].blank = blankNum;
                } else {
                    result[name].files += 1;
                    result[name].code += codeNum;
                    result[name].comment += commentNum;
                    result[name].blank += blankNum;
                }
            } else if (stat.isDirectory()) {
                paths.push(file);
            }
        });
    }

    return result;
}

output(caline('./'), 0);

module.exports = caline;
