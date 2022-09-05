"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _templateObject, _templateObject2;

var LoaderContainer = (0, _styled["default"])('div')(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  @-webkit-keyframes lds-dual-ring {\n    0% {\n      -webkit-transform: rotate(0);\n      transform: rotate(0);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @keyframes lds-dual-ring {\n    0% {\n      -webkit-transform: rotate(0);\n      transform: rotate(0);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  .lds-dual-ring {\n    position: relative;\n    width: 100%;\n    height: 100%;\n  }\n  .lds-dual-ring div {\n    position: absolute;\n    width: ", ";\n    height: ", ";\n    top: 0;\n    left: 0;\n    border-radius: 50%;\n    border: ", " solid #000;\n    border-color: #5284ff transparent #5284ff transparent;\n    -webkit-animation: lds-dual-ring 1.5s linear infinite;\n    animation: lds-dual-ring 1.5s linear infinite;\n  }\n  .lds-dual-ring {\n    width: 20px !important;\n    height: 20px !important;\n    -webkit-transform: translate(-100px, -100px) scale(1)\n      translate(100px, 100px);\n    transform: translate(-100px, -100px) scale(1) translate(100px, 100px);\n  }\n"])), function (p) {
  return p.center && "\n    width: 100%;\n    display: flex;\n    justify-content: center;\n  ";
}, function (_ref) {
  var large = _ref.large;
  return large ? '60px' : '20px';
}, function (_ref2) {
  var large = _ref2.large;
  return large ? '60px' : '20px';
}, function (_ref3) {
  var large = _ref3.large;
  return large ? '4px' : '2px';
});
var LoaderWrapper = (0, _styled["default"])('div')(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 50px 0;\n"])));

var Loader = function Loader(props) {
  var withWrap = props.withWrap;

  if (withWrap) {
    return /*#__PURE__*/_react["default"].createElement(LoaderWrapper, null, /*#__PURE__*/_react["default"].createElement(LoaderContainer, (0, _extends2["default"])({
      className: "lds-css"
    }, props), /*#__PURE__*/_react["default"].createElement("div", {
      className: "lds-dual-ring"
    }, /*#__PURE__*/_react["default"].createElement("div", null))));
  }

  return /*#__PURE__*/_react["default"].createElement(LoaderContainer, (0, _extends2["default"])({
    className: "lds-css"
  }, props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "lds-dual-ring"
  }, /*#__PURE__*/_react["default"].createElement("div", null)));
};

var _default = Loader;
exports["default"] = _default;