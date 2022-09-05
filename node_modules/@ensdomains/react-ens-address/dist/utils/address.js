"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAddress = isAddress;
exports.getEthAddressType = getEthAddressType;
exports.ETH_ADDRESS_TYPE = void 0;

var _ui = require("@ensdomains/ui");

var _ethers = require("ethers");

var ETH_ADDRESS_TYPE = {
  name: 'name',
  address: 'address',
  error: 'error'
};
exports.ETH_ADDRESS_TYPE = ETH_ADDRESS_TYPE;

function isAddress(address) {
  try {
    _ethers.utils.getAddress(address);
  } catch (e) {
    return false;
  }

  return true;
}

function getEthAddressType(address) {
  if (!address) return ETH_ADDRESS_TYPE.error;

  if (isAddress(address)) {
    return ETH_ADDRESS_TYPE.address;
  }

  try {
    (0, _ui.validateName)(address);
    return ETH_ADDRESS_TYPE.name;
  } catch (e) {
    return ETH_ADDRESS_TYPE.error;
  }
}