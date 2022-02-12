import * as fs from 'fs-extra';
import { pascalCase } from 'change-case';
import { PEEPS_PARTS, PEEPS_BUILD_PATH } from './constants';

(async () => {
    let indexTpl = '';
    for(const part of PEEPS_PARTS) {
        indexTpl += `export { default as ${pascalCase(part)}Images } from './assets/${part}';\n`;
        indexTpl += `export { default as ${pascalCase(part)}Components } from './components/${part}';\n`;
    }
    await fs.ensureFile(`${PEEPS_BUILD_PATH}/index.ts`);
    await fs.writeFile(`${PEEPS_BUILD_PATH}/index.ts`, indexTpl, {encoding: 'utf8'});
})();