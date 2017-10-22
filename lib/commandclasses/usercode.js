var generic = require('./generic');

var CLASS_NAME = 'UserCode';
const CLASS_ID = require('./ids')[CLASS_NAME];

exports.id = CLASS_ID;
exports.name = CLASS_NAME;
exports.create = function (deviceApi, deviceId) {
  var result = generic.create(CLASS_ID, deviceApi, deviceId);

  result.setCode = function(id, code, isEnabled) {
    isEnabled = isEnabled ? 1 : 0;
    return deviceApi.runCommand(deviceId, CLASS_ID,
      `Set(${id},'${code}',${isEnabled})`);
  };

  result.isCodeSet = function(id) {
    let data = deviceApi.getDeviceInfo(deviceId, CLASS_ID);
    return !!(data[id] && data[id].hasCode);
  };

  return result;
};
