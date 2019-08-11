var generic = require('./generic');

const CLASS_NAME = 'SwitchMultilevelV2';
const CLASS_ID = require('./ids')[CLASS_NAME];

exports.id = CLASS_ID;
exports.name = CLASS_NAME;

exports.create = function (deviceApi, deviceId) {
  var result = generic.create(CLASS_ID, deviceApi, deviceId);

  result.refresh = function () {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Get()');
  };

  result.set = function (value) {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set('+(value|0)+')');
  };

  return result;
};
