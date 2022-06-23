const exec = (dir, cmd) => `bash -c "cd ../${dir} && ${cmd}"`
module.exports = {
  '../front/src/**/*{.js,.jsx,.ts,.tsx,.d.ts,.mts}': (filenames) => [
    exec('front', 'yarn tsc'),
    exec('front', `yarn prettier --check --write ${filenames.join(' ')}`),
    exec('front', `yarn eslint --fix ${filenames.join(' ')}`),
  ],
  '../app/randomfield/**/*.go': () => exec('app', 'docker-compose exec -T app gofmt -w .'),
  '../terraform/**/*.tf': () => exec('terraform', 'terraform fmt -write=true ../terraform'),
}
