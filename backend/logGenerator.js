const bunyan = require('bunyan');
var RotatingFileStream = require('bunyan-rotating-file-stream');
let log = bunyan.createLogger({
   name: 'crud',
   streams: [
      {
         stream: new RotatingFileStream({
            path: './logs/check.log',
            period: '1d', // daily rotation
            totalFiles: 10, // keep up to 10 back copies
            rotateExisting: true, // Give ourselves a clean file when we start up, based on period
            threshold: '10m', // Rotate log files larger than 10 megabytes
            totalSize: '20m', // Don't keep more than 20mb of archived log files
            gzip: true, // Compress the archive log files to save space
         }),
      },
   ],
});

module.exports = log;
