node-red-contrib-simplejs
=
This node implements some global JavaScript functions so you don't 
need to use a function-node everytime for simple conversions like 
_parseFloat()_, _parseInt()_, etc.

> This a work-in-progress node at the moment!!

Functions
-
* [String()](http://www.w3schools.com/jsref/jsref_string.asp)
* [parseFloat()](http://www.w3schools.com/jsref/jsref_parsefloat.asp)
* [parseInt()](http://www.w3schools.com/jsref/jsref_parseint.asp)
* [isNaN()](http://www.w3schools.com/jsref/jsref_isnan.asp)
* [isFinite()](http://www.w3schools.com/jsref/jsref_isfinite.asp)

The functions are documented here: http://www.w3schools.com/jsref/jsref_obj_global.asp

_String()_ uses `toString()` is present on `msg.payload`.

Usage
-
Simply drag the node to your flow and select a desired function
in the dropdown. If you want, define a name. Otherwise a function 
acronym is shown as name of the node.

The node currently only works on `msg.payload`!

Keep in mind, that if a function can not return anything or the 
function evaluates to false, the node will return `null` and your
flow will not move on.

Contributing
-

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

Credits
-
Patrik Mayer, 2017

License
-
MIT