var generic = require('./generic');

var CLASS_NAME = 'ThermostatMode';
const CLASS_ID = require('./ids')[CLASS_NAME];

const Mode = Object.freeze({
  OFF: 0,
  HEAT: 1,
  COOL: 2,
});

exports.id = CLASS_ID;
exports.name = CLASS_NAME;
exports.create = function (deviceApi, deviceId) {
  var result = generic.create(CLASS_ID, deviceApi, deviceId);

  result.Mode = Mode;

  result.get = function() {
    return deviceApi.getDeviceInfo(deviceId, CLASS_ID).mode;
  };

  result.refresh = function() {
    return deviceApi.runCommand(deviceId, CLASS_ID, 'Get()');
  };

  result.set = function(mode) {
    return deviceApi.runCommand(deviceId, CLASS_ID, 'Set('+(mode|0)+')');
  };

  return result;
};
