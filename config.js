'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://drzoid14:Orange-12@ds123181.mlab.com:23181/pantry-manager';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-pantry-app';
exports.PORT = process.env.PORT || 8080;