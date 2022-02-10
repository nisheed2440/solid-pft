import * as fs from 'fs-extra';
import * as path from 'path';
import fg from 'fast-glob';
import { optimize, loadConfig, OptimizeOptions } from 'svgo';
import { paramCase, pascalCase } from 'change-case';

const PARTS = ['accessories', 'body', 'face', 'head', 'pose', 'facial-hair'];
const TEST_PARTS = ['test'];
let svgoConfig: OptimizeOptions = {};

const getPeepsAssetPaths = async (part: string): Promise<string[]> => {
    const peepsAssets = await fg(`src/${part}/*.svg`);
    return peepsAssets;
}

const optimizeSvg = async (filePath: string): Promise<string> => {
    const svg = await fs.readFile(filePath, 'utf8');
    const optimizedSvg = optimize(svg, svgoConfig);
    return (optimizedSvg as any).data;
}

const createSvgComponent = (svg: string): string => {
    const svgWithProps = svg.replace(/(?<=<svg.*?)(>)/i, " {...props}>");
    return `export default (props = {}) => (${svgWithProps});\n`;
}

const saveSvgComponent = async (part: string, fileName: string, svg: string): Promise<void> => {
    const compFileName = paramCase(fileName);
    const filePath = path.join(__dirname, `../lib/${part}/${compFileName}.tsx`);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, svg, {encoding: 'utf8'});
}

const createSvgIndex = async (part: string, filePaths: string[]): Promise<void> => {
    let indexTpl = 'import { lazy } from "solid-js";\n';
    indexTpl += '\nexport default {\n';
    filePaths.forEach((filePath) => {
        const fileName = path.basename(filePath, '.svg');
        const compName = pascalCase(fileName);
        const compFileName = paramCase(fileName);
        indexTpl += `  ${compName}: lazy(() => import("./${compFileName}")),\n`;
    });
    indexTpl += '}\n';
    const filePath = path.join(__dirname, `../lib/${part}/index.ts`);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, indexTpl, {encoding: 'utf8'});
}

(async () => {
    svgoConfig = await loadConfig();
    // PARTS.forEach(async (part) => {
    //     console.log(await getPeepsAssetPaths(part));
    // });
    PARTS.forEach(async (part) => {
        const filePaths = await getPeepsAssetPaths(part);
        filePaths.forEach(async (filePath) => {
            const fileName = path.basename(filePath, '.svg');
            const optimizedSVG = await optimizeSvg(filePath);
            const svgComponent = createSvgComponent(optimizedSVG);
            await saveSvgComponent(part, fileName, svgComponent);
        });
        await createSvgIndex(part, filePaths);
    });
})();

