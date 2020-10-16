"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class RedisCacheProvider {
  constructor() {
    this.cache = {};
  }

  async save(key, value) {
    this.cache[key] = JSON.stringify(value);
  }

  async recover(key) {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);
    return parsedData;
  }

  async invalidate(key) {
    delete this.cache[key];
  }

  async invalidatePrefix(prefix) {
    const keys = Object.keys(this.cache);
    const keysWithSelectedPrefix = keys.filter(key => key.startsWith(`${prefix}:`));
    keysWithSelectedPrefix.forEach(key => delete this.cache[key]);
  }

}

var _default = RedisCacheProvider;
exports.default = _default;