import deepEqual from 'deep-equal';


export const equal = (a, b) => {
	return deepEqual(a, b);
};

export const stop = event => {
	event.stopPropagation();
	event.preventDefault();
};
