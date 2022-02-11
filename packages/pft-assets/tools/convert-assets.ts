import * as fs from 'fs-extra';
import * as path from 'path';
import del from 'del';
import fg from 'fast-glob';
import { optimize, loadConfig, OptimizeOptions } from 'svgo';
import { paramCase, pascalCase } from 'change-case';

const PARTS = ['accessories', 'body', 'face', 'head', 'pose', 'facial-hair'];
// const TEST_PARTS = ['test'];
let svgoConfig: OptimizeOptions = {};

const getPeepsAssetPaths = async (part: string): Promise<string[]> => {
    const peepsAssets = await fg(`src/assets/peeps/${part}/*.svg`);
    return peepsAssets;
}

const optimizeSvg = async (filePath: string): Promise<string> => {
    const svg = await fs.readFile(filePath, 'utf8');
    const optimizedSvg = optimize(svg, svgoConfig);
    return (optimizedSvg as any).data;
}

const addPropsToSvg = (svg: string): string => {
    let componentTpl = 'import { Component } from "solid-js";\n';
    const svgWithProps = svg.replace(/(?<=<svg.*?)(>)/i, " {...props}>");
    componentTpl += `\nconst SolidComponent: Component<{}> = (props = {}) => (${svgWithProps});\n`;
    componentTpl += 'export default SolidComponent;\n';
    return componentTpl;
}

const saveSvgComponent = async (part: string, fileName: string, svg: string): Promise<void> => {
    const compFileName = paramCase(fileName);
    const filePath = path.join(__dirname, `../build/components/${part}/${compFileName}.tsx`);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, svg, {encoding: 'utf8'});
}

const createSvgIndex = async (part: string, filePaths: string[]): Promise<void> => {
    let indexTpl = 'import { lazy } from "solid-js";\n';
    indexTpl += '\nexport default {\n';
    for (const filePath of filePaths) {
        const fileName = path.basename(filePath, '.svg');
        const compName = pascalCase(fileName);
        const compFileName = paramCase(fileName);
        indexTpl += `  ${compName}: lazy(() => import("./${compFileName}")),\n`;
    };
    indexTpl += '}\n';
    const filePath = path.join(__dirname, `../build/components/${part}/index.ts`);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, indexTpl, {encoding: 'utf8'});
}

const createSvgComponents = async (part: string, filePaths: string[]): Promise<void> => {
    for (const filePath of filePaths) {
        const fileName = path.basename(filePath, '.svg');
        const svg = await optimizeSvg(filePath);
        const svgWithProps = addPropsToSvg(svg);
        await saveSvgComponent(part, fileName, svgWithProps);
    }
}

(async () => {
    await del(['build', 'lib']);
    svgoConfig = await loadConfig();
    PARTS.forEach(async (part) => {
        const filePaths = await getPeepsAssetPaths(part);
        await createSvgComponents(part, filePaths);
        await createSvgIndex(part, filePaths);
    });
})();

