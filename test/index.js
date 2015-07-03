/*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2015 eBay Software Foundation                                │
 │                                                                             │
 │hh ,'""`.                                                                    │
 │  / _  _ \  Licensed under the Apache License, Version 2.0 (the "License");  │
 │  |(@)(@)|  you may not use this file except in compliance with the License. │
 │  )  __  (  You may obtain a copy of the License at                          │
 │ /,'))((`.\                                                                  │
 │(( ((  )) ))    http://www.apache.org/licenses/LICENSE-2.0                   │
 │ `\ `)(' /'                                                                  │
 │                                                                             │
 │   Unless required by applicable law or agreed to in writing, software       │
 │   distributed under the License is distributed on an "AS IS" BASIS,         │
 │   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
 │   See the License for the specific language governing permissions and       │
 │   limitations under the License.                                            │
 \*───────────────────────────────────────────────────────────────────────────*/
/*global describe, it, beforeEach, afterEach*/

'use strict';


var test = require('tap').test,
  path = require('path'),
  Dust = require(path.resolve(__dirname, '..')),
  destRoot = path.resolve(__dirname, 'tmp'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  i18n = require(path.resolve(__dirname, '../lib/localize'));


test('construx-dustjs-i18n', function (t) {
    var args = {
        paths: [path.resolve(__dirname, '../tmp/templates')],
        context: {
            srcRoot: path.resolve(__dirname, 'fixtures/public'),
            destRoot: destRoot,
            filePath: '/templates/localized.js',
            name: 'localized',
            ext: 'dust',
            origName: 'localized'
        }
    };

    t.test('localizes a good dust file', function (t) {
        var localePath = path.resolve(__dirname, 'fixtures/locales/US/es');
        var dust = Dust({i18n: {contentPath: localePath}});
        t.plan(1);
        //get good star file
        fs.readFile(path.resolve(__dirname, 'fixtures/public/templates/localized.dust'), function (err, data) {
            dust(data, args, function (err, compiled) {
                t.ok(compiled.indexOf('("<div>  Hola ")') !== -1);
                t.end();
            });

        });

    });

    //t.test('processes a bad dust file', function (t) {
    //    t.plan(1);
    //    //get bad star file
    //    fs.readFile(path.resolve(__dirname, 'star/bad.star'), function (err, data) {
    //        star(data, {paths: '', context: {name: 'star.compiled'}}, function (err, compiled) {
    //            t.ok(err.name === 'Error');
    //            t.end();
    //        });
    //
    //    });
    //
    //});

});

//test('teardown', function (t) {
//    rimraf(destRoot, function (err) {
//        if (err) {
//            // don't throw
//        }
//    });
//});