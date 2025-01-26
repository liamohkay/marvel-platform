// file location function/utils/versionHistory.js

/**
 * to add a new version to the edit history
 * 
 * @param {array} editHistory - the current array of edit history
 * @param {string} currentContent - current Markdown content to save
 * @returns {Array} the updated edit history array which is capped at 15 versions
 */

export const saveVersionToHistory = (editHistory, currentContent) => 
{
    const timestamp = new Date().toISOString(); // this generate a timestamp for the version
    const newEntry = {content: currentContent, timestamp};

    // this code is to ensure that history doesn't exceed 15 entries
    if (editHistory.length >= 15)
    {
        editHistory.shift(); // this line will remove the oldest version
    }

    // this line will add the new version to the history array
    editHistory.push(newEntry);

    return editHistory;
};