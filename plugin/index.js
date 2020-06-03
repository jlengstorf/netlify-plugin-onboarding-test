// TODO make these configurable

// 1. Look for require env vars
// 2. If not found, clone an onboarding repo
// 3. Replace netlify.toml (or something) to build the onboarding site instead

const fs = require('fs-extra');

exports.onPreBuild = async ({ constants, utils, netlifyConfig }) => {
  if (process.env.hasOwnProperty('REQUIRED_ENV_VAR')) {
    console.log('env vars exist!');
    return;
  }

  console.log('missing env vars');
  // git clone https://github.com/jlengstorf/example-onboarding-flow.git
  await utils.run('git', [
    'clone',
    'https://github.com/jlengstorf/example-onboarding-flow.git',
    `${__dirname}/template`,
  ]);
  fs.copySync(
    `${__dirname}/template/index.html`,
    `${constants.PUBLISH_DIR}/index.html`,
    {
      overwrite: true,
    },
  );
};
