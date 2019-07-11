class AbstractFigure {
	// Потомки обязаны реализовать
	// code(), name(), image(), dependent(), onClick(), onMove()

	generateId = () => Math.random().toString().replace('0.', '');

	measures = () => null;
}

export default AbstractFigure;
