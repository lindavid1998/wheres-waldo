export const getImgDimensions = (imageDiv) => {
	return { height: imageDiv.clientHeight, width: imageDiv.clientWidth };
};

export const convertTargetBoundaryToPixels = (imgDimensions, target) => {
	const { width, height } = imgDimensions;
	const boundary = target.boundary;

	return {
		north: {
			x: boundary.north.x * width,
			y: boundary.north.y * height,
		},
		south: {
			x: boundary.south.x * width,
			y: boundary.south.y * height,
		},
	};
};

export const isInputWithinBoundary = (targetPos, inputPos) => {
	const x = inputPos.x;
	const y = inputPos.y;
	const isInputWithinX = x < targetPos.south.x && x > targetPos.north.x;
	const isInputWithinY = y < targetPos.south.y && y > targetPos.north.y;
	return isInputWithinX && isInputWithinY;
};

export const convertSecondsToHMS = (timeInSeconds) => {
	let hours = Math.floor(timeInSeconds / 3600);
	let minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
	let seconds = timeInSeconds - hours * 3600 - minutes * 60;
	let timeArray = [hours.toString(), minutes.toString(), seconds.toString()];

	timeArray = timeArray.map((time) => {
		if (time.length === 1) {
			return '0' + time;
		} else {
			return time;
		}
	});

	return timeArray.join(':');
};