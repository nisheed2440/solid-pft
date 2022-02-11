import * as fs from 'fs-extra';
import * as path from 'path';
import { paramCase, pascalCase } from 'change-case';
import { getPeepsAssetPaths } from './utils';
import { PEEPS_PARTS } from './constants';

(async() => {
    for(const part of PEEPS_PARTS) {
        let indexTpl = '';
        const filePaths = await getPeepsAssetPaths(part);
        for(const filePath of filePaths) {
            const fileName = path.basename(filePath);
            indexTpl += `import ${pascalCase(fileName)} from './${fileName}';\n`;
        }
        indexTpl += '\nconst partSVGs = {\n';
        for(const filePath of filePaths) {
            const fileName = path.basename(filePath);
            indexTpl += ` ${pascalCase(fileName)}: {\n`;
            indexTpl += `   key: '${paramCase(fileName)}',\n`;
            indexTpl += `   src: ${pascalCase(fileName)},\n`;
            indexTpl += ` },\n`;
        }
        indexTpl += '}\n';
        indexTpl += `\nexport default partSVGs;\n`;
        // Copy the assets to the lib folder
        await fs.ensureFile(`lib/assets/peeps/${part}/index.ts`);
        await fs.writeFile(`lib/assets/peeps/${part}/index.ts`, indexTpl, {encoding: 'utf8'});
        await fs.copy(`src/assets/peeps/${part}`, `lib/assets/peeps/${part}`);
    }
})();