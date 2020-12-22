"use strict";

var db = require('../models');

var findAll = function findAll(req, res) {
  return regeneratorRuntime.async(function findAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          db.Gpus.find({}).then(function (gpus) {
            return res.json(gpus);
          })["catch"](function (err) {
            return res.status(502).json(err);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};