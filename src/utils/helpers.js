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
