import * as fs from 'fs-extra';
import * as path from 'path';
import { paramCase, pascalCase } from 'change-case';
import { getPeepsAssetPaths } from './utils';
import { PEEPS_PARTS, PEEPS_BUILD_ASSETS_PATH, PEEPS_SRC_ASSETS_PATH } from './constants';

(async() => {
    let rootIndexTpl = '';
    for(const part of PEEPS_PARTS) {
        let indexTpl = '';
        const filePaths = await getPeepsAssetPaths(part);
        for(const filePath of filePaths) {
            const fileName = path.basename(filePath);
            indexTpl += `import ${pascalCase(fileName)} from './${fileName}';\n`;
        }
        indexTpl += '\nconst partSVGs = [\n';
        for(const filePath of filePaths) {
            const fileName = path.basename(filePath);
            indexTpl += ` {\n`;
            indexTpl += `   key: '${paramCase(fileName)}',\n`;
            indexTpl += `   name: '${pascalCase(fileName)}',\n`;
            indexTpl += `   src: ${pascalCase(fileName)},\n`;
            indexTpl += ` },\n`;
        }
        indexTpl += ']\n';
        indexTpl += `\nexport default partSVGs;\n`;
        rootIndexTpl += `export { default as ${pascalCase(part)}Images } from './${part}';\n`;
        // Copy the assets to the lib folder
        await fs.ensureFile(`${PEEPS_BUILD_ASSETS_PATH}/${part}/index.ts`);
        await fs.writeFile(`${PEEPS_BUILD_ASSETS_PATH}/${part}/index.ts`, indexTpl, {encoding: 'utf8'});
        await fs.copy(`${PEEPS_SRC_ASSETS_PATH}/${part}`, `${PEEPS_BUILD_ASSETS_PATH}/${part}`);
    }
    await fs.ensureFile(`${PEEPS_BUILD_ASSETS_PATH}/index.ts`);
    await fs.writeFile(`${PEEPS_BUILD_ASSETS_PATH}/index.ts`, rootIndexTpl, {encoding: 'utf8'});
})();