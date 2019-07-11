export const text = {code: 'text', title: 'Текст'};
export const pipes = {code: 'pipes', title: 'Трубопровод'};
export const directionArrows = {code: 'directionArrows', title: 'Направление потока'};
export const measuringInstruments = {code: 'measuringInstruments', title: 'Средства измерения'};
export const valves = {code: 'valves', title: 'Трубопроводная арматура'};
export const pumps = {code: 'pumps', title: 'Насосы'};
export const fans = {code: 'fans', title: 'Вентиляторы'};
export const heatExchangers = {code: 'heatExchangers', title: 'Теплообменники'};
export const heaters = {code: 'heaters', title: 'Радиаторы'};

export const allGroups = [text, pipes, directionArrows, measuringInstruments, valves, pumps, fans, heatExchangers, heaters];

export const findGroupByCode = groupCode => {
	for (let i = 0; i < allGroups.length; i++) {
		if (allGroups[i].code === groupCode) {
			return allGroups[i];
		}
	}
};
