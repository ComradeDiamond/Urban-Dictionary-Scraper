const LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const NON_LEAP = LEAP.slice(0, 1).concat(28).concat(LEAP.slice(2, LEAP.length));

/**
 * @callback dailyCallback
 * @param {String} year YYYY
 * @param {String} month MM
 * @param {String} day DD
 */

/**
 * For each day between the startYear and endYear, execute the callback
 * @param {Number} startYear The year to start with
 * @param {Number} endYear The year to end with, INCLUSIVE
 * @param {dailyCallback} callback Function to run for every day this loops
 */
module.exports.execute_over_yr = async function(startYear, endYear, callback)
{
    //Good news about UrbanDictionary is that we don't need to worry about date/month/year ranges
    //Since it uses an SQL query, we'll get a valid page no matter what
    try
    {
        if (!Number.isInteger(startYear) || Math.floor(Math.log10(startYear)) != 3) throw "Start Year needs to be an integer in YYYY format";
        if (!Number.isInteger(endYear) || Math.floor(Math.log10(endYear)) != 3) throw "End Year needs to be an integer in YYYY format";
        if (!callback) throw "Please provide a callback";
    }
    catch(err)
    {
        console.error(err);
        return;
    }

    for (var year = startYear; year <= endYear; year++)
    {
        let DAYS_IN_MONTH = year % 4 == 0 ? LEAP : NON_LEAP;
        
        for (var month = 0; month < 12; month++)
        {
            for (var day = 0; day < DAYS_IN_MONTH[month]; day++)
            {
                var monthStr = (month + 1).toString().padStart(2, "0");
                var dayStr = (day + 1).toString().padStart(2, "0");
                
                await callback(year.toString(), monthStr, dayStr);
            }
        }
    }
}