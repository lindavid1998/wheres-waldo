# Where's Waldo

This is an interactive photo-tagging game based on Where's Waldo. Users have three targets they need to find hidden in an illustration. Whoever can find them the fastest wins. 

The game provides feedback whenever an answer is correct or not.
## Demo

https://lindavid1998.github.io/wheres-waldo/

## Implementation

The trickiest part about this project was implementing the logic for checking a user's answers.

When a user clicks on the image, the mouse position is saved and an answer box pops up containing the targets. When the user clicks a target for their answer, the mouse position is checked against the answer key. This answer key is stored in Redux as part of the global state. 

What made this difficult at first was that there needed to be a way to account for different screen sizes. Hard coding absolute pixel positions in the answer key wouldn't work for this. Instead, the correct positions for each target were stored as proportions (i.e. target A is 20% down and 40% right from the top left corner). A restriction was also placed on the image such that the aspect ratio remained constant when resizing. User mouse positions were then converted to proportions of the aspect ratio and compared against the answer key.

There also needed to be a tolerance built in (i.e. user can be X pixels within target to be correct). Otherwise it would be near impossible to complete the game. This was resolved by setting the correct position as a box (defined by two corners), and checking that the user click was within the box. 

### Redux for State Management

Redux was used to capture the game state related to finding targets, displaying feedback, and tracking user attempts. The following variables were captured in the state:

1. `targets`: An array of target objects, each with the following properties:
    - `id`: A unique identifier for the target.
    - `name`: The name of the target (e.g., 'R2D2', 'Finn', 'Han Solo').
    - `imgSrc`: The source path for the target's image.
    - `isFound`: A boolean indicating whether the target has been found.
    - `boundary`: An object defining the north and south coordinates for the target.
2. `isAnsBoxVisible`: A boolean indicating whether the answer box is currently visible.
3. `feedbackMsg`: A message string for feedback.
4. `numOfAttempts`: A number representing the count of attempts made by the user.

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

An example of a test is shown below:

```js
it('should stop the stopwatch when all targets have been found', async () => {
	isInputWithinBoundary.mockReturnValue(true);
	render(
		<Provider store={store}>
			<App />
		</Provider>,
		{ wrapper: BrowserRouter }
	);
	const stopwatch = screen.getByTestId('stopwatch');
	const timeBefore = stopwatch.textContent;

	const answers = ['R2D2', 'Finn', 'Han Solo'];
	for (let i = 0; i < answers.length; i++) {
		let answer = answers[i];
		await clickOnAnswer(answer);
		await waitFor(() => {
			expect(screen.getByText(answer)).toHaveStyleRule(
				'color',
				'var(--success-color)'
			);
		});
	}

	act(() => {
		jest.advanceTimersByTime(30000);
	});
	expect(stopwatch.textContent).toEqual(timeBefore);
});
```

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
