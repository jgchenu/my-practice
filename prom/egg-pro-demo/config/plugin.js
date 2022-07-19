'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  prometheus: {
    enable: true,
    package: 'egg-prometheus',
  },
};
