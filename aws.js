var creds = require('./config/creds.js');

module.exports = {
  development: {
    accessKeyId: creds.production.accessKeyId,
    secretAccessKey: creds.production.secretAccessKey,
    region: "us-east-1",
    bucket: "datavis.infiniteborders.com",
    options: { // Optional
      // preserveFiles: ["*.jpg"]
    }
  },
  production: {
    accessKeyId: creds.production.accessKeyId,
    secretAccessKey: creds.production.secretAccessKey,
    region: "us-east-1",
    bucket: "datavis.infiniteborders.com",
    options: { // Optional
    }
  }
  // metrics: {
  //   tech: "vue",
  //   repoName: "datavis",
  //   baseUrl: "datavis.infiniteborders.com"
  // }
};
