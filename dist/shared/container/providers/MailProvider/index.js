"use strict";

var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));

var _tsyringe = require("tsyringe");

var _SESMailProvider = _interopRequireDefault(require("./implementations/SESMailProvider"));

var _mail = _interopRequireDefault(require("../../../../config/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.default),
  ses: _tsyringe.container.resolve(_SESMailProvider.default)
};

_tsyringe.container.registerInstance("MailProvider", providers[_mail.default.driver]);