#!/usr/bin/env node

/**
 * After prepare, files are copied to the platforms/ios and platforms/android folders.
 * Lets clean up some of those files that arent needed with this hook.
 */
var fs = require('fs');
var path = require('path');

var isEmptyDir = function isEmptyDir(dirname) {
  fs.readdir(dirname, function (err, files) {
    if (err) {
      // some sort of error
    } else {
      return !files.length;
    }
  });
};

var deleteFolderRecursive = function (removePath) {
  var fos = removePath.split("\\");
  var fo = removePath.split("\\");

  var proteclib = ["ionic\\fonts", "font-awesome\\fonts","font-awesome\\css"];
  var protectFile = ["bluebird.min.js","ionic.cloud.min.js","font-awesome.min.css"];
  var protecRoot = ["www\\lib", "lib\\ionic","lib\\font-awesome"];
  if (fo.length > 1) {
    fo = fo[fo.length - 2] + "\\" + fo[fo.length - 1];
  } else {
    fo = fo[fo.length - 1];
    proteclib = ["ionic", "font-awesome"];

  }
  if (fs.existsSync(removePath) && proteclib.indexOf(fo) == -1) {
    fs.readdirSync(removePath).forEach(function (file, index) {
      var curPath = path.join(removePath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        if(protectFile.indexOf(file)==-1||fos.indexOf('docs')!=-1)
            fs.unlinkSync(curPath);
      }
    });

    if (protecRoot.indexOf(fo) == -1) {
      fs.rmdirSync(removePath);
    }
  }
};

var iosPlatformsDir_1 = path.resolve(__dirname, '../../platforms/ios/www/css');
var iosPlatformsDir_2 = path.resolve(__dirname, '../../platforms/ios/www/js');
// var iosPlatformsDir_3 = path.resolve(__dirname, '../../platforms/ios/www/lib');
var iosPlatformsDir_4 = path.resolve(__dirname, '../../platforms/ios/www/components');
var iosPlatformsDir_5 = path.resolve(__dirname, '../../platforms/ios/www/app');
var iosPlatformsDir_6 = path.resolve(__dirname, '../../platforms/ios/www/templates');
var iosPlatformsDir_7 = path.resolve(__dirname, '../../platforms/ios/www/dist/dist_js/app');


var androidPlatformsDir_1 = path.resolve(__dirname, '../../platforms/android/assets/www/css');
var androidPlatformsDir_2 = path.resolve(__dirname, '../../platforms/android/assets/www/js');
var androidPlatformsDir_3 = path.resolve(__dirname, '../../platforms/android/assets/www/lib');
var androidPlatformsDir_4 = path.resolve(__dirname, '../../platforms/android/assets/www/components');
var androidPlatformsDir_5 = path.resolve(__dirname, '../../platforms/android/assets/www/app');
var androidPlatformsDir_6 = path.resolve(__dirname, '../../platforms/android/assets/www/templates');
var androidPlatformsDir_7 = path.resolve(__dirname, '../../platforms/android/assets/www/dist/dist_js/app');


deleteFolderRecursive(iosPlatformsDir_1);
deleteFolderRecursive(iosPlatformsDir_2);
// deleteFolderRecursive(iosPlatformsDir_3);
deleteFolderRecursive(iosPlatformsDir_4);
deleteFolderRecursive(iosPlatformsDir_5);
deleteFolderRecursive(iosPlatformsDir_6);
deleteFolderRecursive(iosPlatformsDir_7);


deleteFolderRecursive(androidPlatformsDir_1);
deleteFolderRecursive(androidPlatformsDir_2);
deleteFolderRecursive(androidPlatformsDir_3);
deleteFolderRecursive(androidPlatformsDir_4);
deleteFolderRecursive(androidPlatformsDir_5);
deleteFolderRecursive(androidPlatformsDir_6);
deleteFolderRecursive(androidPlatformsDir_7);
