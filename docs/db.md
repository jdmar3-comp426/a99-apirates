DATABASE

Defined in user.db, used to store user information.

userinfo 

-id INTEGER PRIMARY KEY, Assigns id incrementally, 1 and 2 are already used for testing

-user TEXT,    User that the user decides at signup

-pass TEXT,    Password that the user decides at signup, uses md5 for encryption/hashing

-email TEXT,   Email that the user decides at signup

-points INTEGER, Current points of the user, initialized to 0

-active INTEGER, Current upgrade level of points per click, initialized at 1

-passive INTEGER, Current upgrade level of passive points per second, initialized at 0

-activeCost INTEGER, Cost of next upgrade to active upgrade level

-passiveCost INTEGER, Cost of next upgrade to passive upgrade level
