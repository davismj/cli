"use strict";
const path = require('path');
const project = require('./aurelia_project/aurelia.json');

let output = project.platform.output;
let files = project.build.bundles
  .map(x => path.join(output, x.name))
  .concat([
    { pattern: project.unitTestRunner.source, included: false },
    'test/aurelia-karma.js'
  ]);
let entryIndex = files.indexOf(path.join(output, project.build.loader.inject));
let entryBundle = files.splice(entryIndex, 1)[0];
files.unshift(entryBundle);

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [project.testFramework.id],
    files: files,
    exclude: [],
    preprocessors: {
      [project.unitTestRunner.source]: [project.transpiler.id]
    },
    'babelPreprocessor': { options: project.transpiler.options },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
