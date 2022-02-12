import * as fs from 'fs-extra';
import { pascalCase } from 'change-case';
import { PEEPS_PARTS } from './constants';

(async () => {
    let indexTpl = '';
    for(const part of PEEPS_PARTS) {
        indexTpl += `export { default as ${pascalCase(part)}Images } from './assets/${part}';\n`;
        indexTpl += `export { default as ${pascalCase(part)}Components } from './components/${part}';\n`;
    }
    await fs.ensureFile(`build/peeps/index.ts`);
    await fs.writeFile(`build/peeps/index.ts`, indexTpl, {encoding: 'utf8'});
})();