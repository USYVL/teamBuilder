# teamBuilder
Attempt at a Drag and Drop Team builder

Most of this is based on the w3schools example.

This looks interesting:
https://www.sitepoint.com/accessible-drag-drop/

Initially the data was just embedded in the routes/index.js file.
Since then things have been reconfigured to read the data from two
input files in the data directory.  Those are read in via app.js at
startup.  The data is prepared via the names2json.py script that reads
in the list of names from the names.list file.

Should probably rearrange things a bit as the python script should probably
NOT be stored in the node app directory.

Added in some gulp goodies.  This is my first attempt at using gulp, so its likely
not pretty.  But it seems to be effective, so pretty stoked about that.

We need to potentially add gender.  This will mean adding a field to our nameslist
and updating the parser to handle the extra info.
