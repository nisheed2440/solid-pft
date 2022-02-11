import * as fs from 'fs-extra';
import * as path from 'path';
import del from 'del';
import fg from 'fast-glob';
import { optimize, OptimizeOptions } from 'svgo';
import { paramCase, pascalCase, camelCase } from 'change-case';

/**
 * Function to get the paths of all the assets for a given peeps part.
 * @param part The part to get the paths for
 * @returns The paths to the assets for the given part
 */
export const getPeepsAssetPaths = async (part: string): Promise<string[]> => {
    const peepsAssets = await fg(`src/assets/peeps/${part}/*.svg`);
    return peepsAssets;
}

/**
 * Function to clear all the build folders.
 * @param folders The folders to clear
 */
export const clearFolders = async (folders: string[]): Promise<void> => {
    for (const folder of folders) {
        await del(folder);
    }
}

/**
 * Function to optimize the given SVG file for creating a component.
 * @param filePath The path to the file to optimize
 * @param options The svgo options to use when optimizing the file
 * @returns The optimized svg string
 */
export const optimizeSvg = async (filePath: string, options?: OptimizeOptions): Promise<string> => {
    const svg = await fs.readFile(filePath, 'utf8');
    const optimizedSvg = optimize(svg, options);
    return (optimizedSvg as any).data;
}

/**
 * Function to return the component template for a given svg file input.
 * @param svg The svg string to convert to a component
 * @returns The component string
 */
export const addPropsToSvg = (svg: string): string => {
    let componentTpl = 'import { Component } from "solid-js";\n';
    let svgWithProps = svg.replace(/(?<=<svg.*?)(>)/i, " {...props}>");
    // Replace xlink:hrefn as per https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/href
    svgWithProps = svgWithProps.replace(/(xlink\:href)/i, "href");
    componentTpl += `\nconst SolidComponent: Component<{}> = (props = {}) => (${svgWithProps});\n`;
    componentTpl += 'export default SolidComponent;\n';
    return componentTpl;
}

/**
 * Function to save the component template to a file for a given peeps part.
 * @param part The part to create the component for
 * @param fileName The name of the file to create the component for
 * @param svg The svg string to convert to a component
 */
export const saveSvgComponent = async (part: string, fileName: string, svg: string): Promise<void> => {
    const compFileName = paramCase(fileName);
    const filePath = path.join(__dirname, `../build/components/${part}/${compFileName}.tsx`);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, svg, {encoding: 'utf8'});
}

/**
 * Creates an index file of components for a given peeps part
 * @param part The part of the peeps
 * @param filePaths The paths of the svg files
 */
export const createSvgIndex = async (part: string, filePaths: string[]): Promise<void> => {
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

/**
 * Function to create a component for each SVG file in the peeps folder
 * @param part The part of the peeps
 * @param filePaths The paths of the svg files
 * @param options The options for svgo
 */
export const createSvgComponents = async (part: string, filePaths: string[], options?: OptimizeOptions): Promise<void> => {
    for (const filePath of filePaths) {
        const fileName = path.basename(filePath, '.svg');
        const svg = await optimizeSvg(filePath, options);
        const svgWithProps = addPropsToSvg(svg);
        await saveSvgComponent(part, fileName, svgWithProps);
    }
}

/**
 * Creates a root index file for all peeps parts
 * @param parts The peeps parts to create the index for
 */
export const createRootIndex = async (parts: string[]): Promise<void> => {
    let rootIndexTpl = '';
    for(const part of parts) {
        rootIndexTpl = `${rootIndexTpl}export { default as ${camelCase(part)}Components } from "./${part}";\n`;
    }
    const filePath = path.join(__dirname, `../build/components/index.ts`);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, rootIndexTpl, {encoding: 'utf8'});
}
