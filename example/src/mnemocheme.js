export default {
	id: 'idone',
	name: 'Мнемосхема номер один',
	data: [
		{
			'code': 'Pipeline',
			'id': '5593956453410027',
			'points': [
				{
					'x': 11,
					'y': 12
				},
				{
					'x': 76,
					'y': 12
				},
				{
					'x': 76,
					'y': 47
				},
				{
					'x': 11,
					'y': 47
				}
			],
			'color': '#000000'
		},
		{
			'code': 'Text',
			'id': '27413100389755374',
			'position': {
				'x': 9,
				'y': 9
			},
			'text': 'Схема 1',
			'fontSize': 'medium',
			'fontBold': false,
			'fontItalic': true,
			'fontUnderline': false,
			'color': '#008b02'
		},
		{
			'code': 'FlowDirectionWater',
			'x': 14,
			'y': 12,
			'id': '8165327506101927',
			'color': '#000000',
			'transformation': null,
			'labelText': null
		},
		{
			'code': 'FlowDirectionGas',
			'x': 14,
			'y': 47,
			'id': '142352704591584',
			'color': '#000000',
			'transformation': [
				{
					'rotate': 180
				}
			],
			'labelText': null
		},
		{
			'code': 'TemperatureConverter',
			'x': 21,
			'y': 10,
			'id': '41294749270190856',
			'color': '#000000',
			'transformation': null,
			'labelText': 't1, гр.C'
		},
		{
			'code': 'FlowMeter',
			'x': 30,
			'y': 12,
			'id': '7548142094546268',
			'color': '#000000',
			'transformation': null,
			'labelText': 'M1, т'
		},
		{
			'code': 'PressureChangeDetector',
			'x': 74,
			'y': 25,
			'id': '42729069114677487',
			'color': '#000000',
			'transformation': [
				{
					'rotate': 270
				}
			],
			'labelText': '𝚫P, МПа'
		},
		{
			'code': 'PumpCantilevered',
			'x': 27,
			'y': 47,
			'id': '1936280112492077',
			'color': '#000000',
			'transformation': [
				{
					'rotate': 270
				}
			],
			'labelText': null
		},
		{
			'code': 'FanCentrifugal',
			'x': 54,
			'y': 47,
			'id': '5441114166415251',
			'color': '#000000',
			'transformation': [
				{
					'flip': 'vertical'
				}
			],
			'labelText': null
		}
	],
};
