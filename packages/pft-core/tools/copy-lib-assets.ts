import * as fs from 'fs-extra';
import { PEEPS_PARTS, PEEPS_LIB_ASSETS_PATH, PEEPS_SRC_ASSETS_PATH } from './constants';

(async() => {
    for(const part of PEEPS_PARTS) {
        await fs.copy(`${PEEPS_SRC_ASSETS_PATH}/${part}`, `${PEEPS_LIB_ASSETS_PATH}/${part}`);
    }
})();