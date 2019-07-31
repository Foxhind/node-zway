var generic = require('./generic');

var CLASS_NAME = 'ThermostatSetPoint';
const CLASS_ID = require('./ids')[CLASS_NAME];

exports.id = CLASS_ID;
exports.name = CLASS_NAME;
exports.create = function (deviceApi, deviceId) {
  var result = generic.create(CLASS_ID, deviceApi, deviceId);

  result.Mode = {
    OFF: 0,
    HEAT: 1,
    COOL: 2,
  };

  result.get = function() {
    var res = deviceApi.getDeviceInfo(deviceId, CLASS_ID);
    return (res && res.val && res.val.value) || null;
  };

  result.refresh = function() {
    return deviceApi.runCommand(deviceId, CLASS_ID, 'Get()');
  };

  result.set = function(mode, t) {
    return deviceApi.runCommand(deviceId, CLASS_ID, 'Set('+(mode|0)+','+(t|0)+
      ')');
  };

  return result;
};
