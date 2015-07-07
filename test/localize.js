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
  destRoot = path.resolve(__dirname, 'tmp'),
  i18n = require(path.resolve(__dirname, '../lib/localize'));



test('construx-dustjs-i18n localize.preHook', function (t) {


    t.test('correctly constructs context', function (t) {
        t.plan(3);
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

            t.deepEqual(context.locality, {country: 'US', language: 'fr'});
            t.equal(context.srcPath, path.resolve(__dirname, 'fixtures/public/templates/localized.dust'));
            t.equal(context.origName, 'localized');
            t.end();
        });


    });


});
