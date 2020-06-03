const fs = require('fs-extra');
const toml = require('toml');

const tomlFile = fs.readFileSync(`${__dirname}/netlify.toml`, 'utf8');
const netlifyConfig = toml.parse(tomlFile);
const requiredEnvVars = netlifyConfig.plugins[0].inputs.requiredEnvVars;

// if we’re missing the required env vars, we need to
// no-op to avoid a failed build and show the install
// helper page.
if (!requiredEnvVars.every((envVar) => process.env.hasOwnProperty(envVar))) {
  console.log('missing env vars; bailing');
  return;
}

// if we get here, build the site
fs.copySync(`${__dirname}/src/index.html`, `${__dirname}/public/index.html`, {
  overwrite: true,
});

console.log('successfully built the site');
