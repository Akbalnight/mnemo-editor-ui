class AbstractFigure {
  // Потомки обязаны реализовать
  // code(), name(), image(), dependent(), onClick(), onMove()

	generateId = () => {
	  return Math.random().toString().replace('0.', '')
	}
}

export default AbstractFigure
