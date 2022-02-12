import { clearFolders } from './utils';
import { FOLDERS_TO_CLEAR } from './constants';

(async () => {
    // Clear all build folders before starting
    await clearFolders(FOLDERS_TO_CLEAR);
})();