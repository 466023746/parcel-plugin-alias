const fs = require('fs')
const path = require('path')

module.exports = function (bundler) {
    let options
    try {
        options = require(path.resolve(__dirname, '../../aliasrc'))
    } catch(e) {}

    if (options) {
        let originResolver = bundler.resolver;
        let originResolve = originResolver.resolve;

        originResolver.resolve = function (filename, parent) {
            if (filename) {
                for (let name in options) {
                    let alias = options[name]

                    if (filename === name || startsWith(filename, name + '/')) {
                        if (filename !== alias && !startsWith(filename, alias + '/')) {
                            filename = alias + filename.substr(name.length)
                        }
                    }
                }
            }

            return originResolve.call(originResolver, filename, parent)
        }
    }
}

function startsWith(string, searchString) {
    const stringLength = string.length;
    const searchLength = searchString.length;

    // early out if the search length is greater than the search string
    if(searchLength > stringLength) {
        return false;
    }
    let index = -1;
    while(++index < searchLength) {
        if(string.charCodeAt(index) !== searchString.charCodeAt(index)) {
            return false;
        }
    }
    return true;
}