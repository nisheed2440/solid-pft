import { clearFolders } from './utils'

(async () => {
    // Clear all build folders before starting
    await clearFolders(['build', 'dist', 'lib']);
})();