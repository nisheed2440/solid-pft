import * as fs from 'fs-extra';
import { PEEPS_PARTS } from './constants';

(async() => {
    for(const part of PEEPS_PARTS) {
        await fs.copy(`src/assets/peeps/${part}`, `lib/assets/${part}`);
    }
})();