'use strict';

const { createLogger, format, transports } = require('winston');
const chalk = require('chalk').default;
const { combine, colorize, label, printf, splat, timestamp } = format;

const logFormat = (loggerLabel) => combine(
  timestamp(),
  splat(),
  colorize(),
  label({ label: loggerLabel }),
  printf(info => `[${info.timestamp}] ${chalk.cyan(info.label)} ${info.level}: ${info.message}`)
);

const createLoggerWithLabel = (label) => createLogger({
  level:'info',
  transports: [new transports.Console({})],
  format: logFormat(label)
});

module.exports = {
  info: createLoggerWithLabel('API'),
};
