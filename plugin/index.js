const fs = require('fs-extra');

exports.onPreBuild = async ({ inputs, constants, utils }) => {
  if (
    inputs.requiredEnvVars.every((envVar) => process.env.hasOwnProperty(envVar))
  ) {
    return;
  }

  utils.status.show({
    title: 'Missing Required Environment Variables',
    summary: `The required env vars ${inputs.requiredEnvVars.join(
      ', ',
    )} are not set. Showing a installation wizard. 🧙‍♂️`,
    text: 'You’re a collapsible section.',
  });

  await utils.run('git', [
    'clone',
    inputs.templateRepository,
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
