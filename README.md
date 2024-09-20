# Where's Waldo

This is an interactive photo-tagging game based on Where's Waldo. Users have three targets they need to find hidden in an illustration. Whoever can find them the fastest wins. 

The game provides feedback whenever an answer is correct or not.
## Demo

https://lindavid1998.github.io/wheres-waldo/

## Implementation

The trickiest part about this project was implementing the logic for checking a user's answers.

When a user clicks on the image, the mouse position is saved and an answer box pops up containing the targets. When the user clicks a target for their answer, the mouse position is checked against the answer key. This answer key is stored in Redux as part of the global state. 

What made this difficult at first was that there needed to be a way to account for different screen sizes. Hard coding absolute pixel positions in the answer key wouldn't work for this. Instead, the correct positions for each target were stored as proportions (i.e. target A is 20% down and 40% right from the top left corner). A restriction was also placed on the image such that the aspect ratio remained constant when resizing. User mouse positions were then converted to proportions of the aspect ratio and compared against the answer key.

## Tech Stack

**Frontend:** React, Redux, Styled Components, Jest

**Backend:** Firebase (to store leaderboard)

App is hosted on GitHub.

## Testing

Frontend testing was performed using Jest. The tests verify that:
- The answer box shows when a user clicks on the image
- The answer box hides when a user submits an answer or hits the Esc key
- The corresponding target in the progress bar is marked correct when the answer is correct
- The stopwatch elapses time correctly
- The stopwatch stops when all targets have been found

The tests can be run from the root directory using:
```
$ npm run test


 PASS  src/components/Header.test.js
 PASS  src/components/Game.test.js
 PASS  src/App.test.js

Test Suites: 3 passed, 3 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        6.878 s
Ran all test suites.
```


## Acknowledgements

This project was an idea from [The Odin Project](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app) as part of their Full Stack curriculum.

The illustration used was made by Gus Morais OC.