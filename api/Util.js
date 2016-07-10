/* Copyright 2016 Streampunk Media Ltd.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

function extractVersions(v) {
  var m = v.match(/^([0-9]+):([0-9]+)$/)
  return [+m[1], +m[2]];
}

function compareVersions(l, r) {
  var lm = extractVersions(l);
  var rm = extractVersions(r);
  if (lm[0] < rm[0]) return -1;
  if (lm[0] > rm[0]) return 1;
  if (lm[1] < rm[1]) return -1;
  if (lm[1] > rm[1]) return 1;
  return 0;
}

function getResourceName(r) {
  return /^function\s+([\w\$]+)\s*\(/.exec(
    r.constructor.toString())[1].toLowerCase();
  // TODO conside changing to ES6 <Function>.name
}

function getFirstExternalNetworkInterface() {
  var nis = require('os').networkInterfaces();
  var nias = [];
  Object.keys(nis).forEach(function (nik) {
    var ni = nis[nik];
    ni.forEach(function (n) {
      n.interface = nik;
      nias.push(n);
    });
  });
  return nias.find(function (x) { return x.internal === false && x.family === 'IPv4'; });
}

var util = {
  extractVersions : extractVersions,
  compareVersions : compareVersions,
  getResourceName : getResourceName,
  getFirstExternalNetworkInterface : getFirstExternalNetworkInterface
};

module.exports = util;
