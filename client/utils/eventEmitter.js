import _each from 'lodash/forEach';
import isNil from 'lodash/isNil';

export default class EventEmitter {
  static instance;
  constructor() {
    this.callbacks = {};
    if (EventEmitter.instance) {
      return EventEmitter.instance;
    }
  }

  exists = (event) => !isNil(this.callbacks[event]);

  on = (event, callback) => {
    if (!this.exists(event)) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(callback);
  };

  off = (event, callback) => {
    if (this.exists(event)) {
      this.callbacks[event] = this.callbacks[event].filter(
        (item) => item !== callback
      );
    }
  };

  send = (event, ...data) => {
    if (this.exists(event)) {
      _each(this.callbacks[event], (callback) => callback(...data));
    }
  };
}
