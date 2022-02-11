import {  loadConfig } from 'svgo';
import { PEEPS_PARTS } from './constants';
import { getPeepsAssetPaths, createRootIndex, createSvgComponents, createSvgIndex } from './utils';

(async () => {
    const svgoConfig = await loadConfig();
    PEEPS_PARTS.forEach(async (part) => {
        const filePaths = await getPeepsAssetPaths(part);
        await createSvgComponents(part, filePaths, svgoConfig || undefined);
        await createSvgIndex(part, filePaths);
    });
    await createRootIndex(PEEPS_PARTS);
})();

