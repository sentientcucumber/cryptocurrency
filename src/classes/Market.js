'use strict';

export default class Market {

  constructor(name) {
    this.name = name;

    let split = name.split('_');
    this.bid = split[0];
    this.ask = split[1];
  }
}
