Repository for Video Demo of Lit Actions

The `toSign` variable is an array of numbers that represent the ASCII codes for the characters in the string "Hello World". Each number in the array corresponds to a character in the string.

Here is a breakdown of how each number in the `toSign` array maps to a character in the "Hello World" string:

- 72 is the ASCII code for the character "H"
- 101 is the ASCII code for the character "e"
- 108 is the ASCII code for the character "l"
- 108 is the ASCII code for the character "l"
- 111 is the ASCII code for the character "o"
- 32 is the ASCII code for the space character " "
- 87 is the ASCII code for the character "W"
- 111 is the ASCII code for the character "o"
- 114 is the ASCII code for the character "r"
- 108 is the ASCII code for the character "l"
- 100 is the ASCII code for the character "d"

So, when these numbers are converted to their corresponding characters using their ASCII codes, they form the string "Hello World".

The rest of the code defines an asynchronous `go` function that uses this `toSign` array to request a signature share from a Lit Node using the `LitActions.signEcdsa` method. The signature share is returned in the HTTP response from the node and stored in the `sigShare` variable.

PKP - https://explorer.litprotocol.com/pkps/13060450351822802328499309576153793306552432408244037559038668142453714032884
Lit Action Created  - https://explorer.litprotocol.com/actions/QmSCxGRRznNDJRDri9qd3batstNiSj9xDHRTVhj8j2TKfo

`npm install -g getlit`
