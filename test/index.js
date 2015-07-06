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
  fs = require('fs'),
  i18n = require(path.resolve(__dirname, '../lib/localize'));


test('construx-dustjs-i18n', function (t) {


    t.test('localizes a good dust file', function (t) {
        var args = {
            paths: [path.resolve(__dirname, '../tmp/templates')],
            context: {
                srcRoot: path.resolve(__dirname, 'fixtures/public'),
                destRoot: destRoot,
                filePath: '/templates/localized.js',
                name: 'localized',
                ext: 'dust',
                origName: 'localized',
                srcPath: path.resolve(__dirname, 'fixtures/public/templates/localized.dust')
            }
        };
        var localePath = path.resolve(__dirname, 'fixtures/locales/US/es');
        var dust = Dust({i18n: {contentPath: localePath}});
        t.plan(1);
        dust(' ', args, function (err, compiled) {
            t.ok(compiled.indexOf('("<div>  Hola ")') !== -1);
            t.end();
        });


    });

    t.test('processes a bad dust file', function (t) {
        var args = {
            paths: [path.resolve(__dirname, '../tmp/templates')],
            context: {
                srcRoot: path.resolve(__dirname, 'fixtures/public'),
                destRoot: destRoot,
                filePath: '/templates/localized-bad.js',
                name: 'localized-bad',
                ext: 'dust',
                origName: 'localized-bad',
                srcPath: path.resolve(__dirname, 'fixtures/public/templates/localized-bad.dust')
            }
        };
        var localePath = path.resolve(__dirname, 'fixtures/locales/US/es');
        var dust = Dust({i18n: {contentPath: localePath}});
        t.plan(1);
        dust(' ', args, function (err, compiled) {
            t.ok(err.name === 'Error');
            t.end();
        });


    });

    t.test('processes a non-localized dust file', function (t) {
        var args = {
            paths: [path.resolve(__dirname, '../tmp/templates')],
            context: {
                srcRoot: path.resolve(__dirname, 'fixtures/public'),
                destRoot: destRoot,
                filePath: '/templates/index.js',
                name: 'index',
                ext: 'dust',
                origName: 'index',
                srcPath: path.resolve(__dirname, 'fixtures/public/templates/index.dust')
            }
        };
        var dust = Dust({});
        t.plan(1);
        fs.readFile(path.resolve(__dirname, 'fixtures/public/templates/index.dust'), function (err, data) {
            dust(data, args, function (err, compiled) {
                t.ok(compiled.indexOf('<h1>Hello, world!</h1>') !== -1);
                t.end();
            });
        });


    });

});
test('construx-dustjs-i18n localize.preHook', function (t) {


    t.test('correctly constructs context', function (t) {
        var args = {
            paths: [path.resolve(__dirname, '../tmp/templates')],
            context: {
                srcRoot: path.resolve(__dirname, 'fixtures/public'),
                destRoot: destRoot,
                filePath: '/templates/US/fr/localized.js',
                name: 'US/fr/localized',
                ext: 'dust'
            }
        };
        i18n.preHook(args.context, function (err, context) {
            t.plan(3);
            t.deepEqual(context.locality, {country: 'US', language: 'fr'});
            t.equal(context.srcPath, path.resolve(__dirname, 'fixtures/public/templates/localized.dust'));
            t.equal(context.origName, 'localized');
            t.end();
        });


    });


});
