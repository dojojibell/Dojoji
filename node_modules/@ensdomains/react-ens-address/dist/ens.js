"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
exports["default"] = getENS;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ui = require("@ensdomains/ui");

var ens = {};

function setup(_x) {
  return _setup.apply(this, arguments);
}

function _setup() {
  _setup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var reloadOnAccountsChange, customProvider, ensAddress, _yield$setupENS, ensInstance;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reloadOnAccountsChange = _ref.reloadOnAccountsChange, customProvider = _ref.customProvider, ensAddress = _ref.ensAddress;
            _context.next = 3;
            return (0, _ui.setupENS)({
              reloadOnAccountsChange: reloadOnAccountsChange,
              customProvider: customProvider,
              ensAddress: ensAddress
            });

          case 3:
            _yield$setupENS = _context.sent;
            ensInstance = _yield$setupENS.ens;
            ens = ensInstance;
            return _context.abrupt("return", {
              ens: ens
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setup.apply(this, arguments);
}

function getENS() {
  return ens;
}