# teamBuilder
Attempt at a Drag and Drop Team builder

Most of this is based on the w3schools example.

This looks interesting:
https://www.sitepoint.com/accessible-drag-drop/

Initially the data was just embedded in the routes/index.js file.
Since then things have been reconfigured to read the data from two
input files in the data directory.  Those are read in via app.js at
startup.  The test data is prepared via the names2json.py script that reads
in the list of names and gender from the names.list file which contains ":"
separated fields.

Should probably rearrange things a bit as the python script should probably
NOT be stored in the node app directory.

Added in some gulp goodies.  This is my first attempt at using gulp, so its likely
not pretty.  But it seems to be effective, so pretty stoked about that.

We need to potentially add gender.  This will mean adding a field to our nameslist
and updating the parser to handle the extra info.

The next thing may be to figure out if there is an easy way to handle
dependencies/associations in our data.  Primarily, we want to be able to link/associate
a coach to a player (their own kid) as well as one possible coach request.  Want
to come up with some sort of visual cue if that condition is not met.  
Then we have to figure out how to handle the case of a parent with two children
in different age divisions.  After that we need so figure out if we want to
generalize/extend that approach to linking players.
