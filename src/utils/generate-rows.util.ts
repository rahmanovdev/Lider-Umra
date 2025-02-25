/* eslint-disable @typescript-eslint/no-explicit-any */
interface LayoutItem<T = any> {
	fr: number;
	item: T;
}

export const generateRows = <T = any>(items: T[], width: number) => {
	const rows: LayoutItem<T>[][] = [];
	let index = 0;

	const layouts =
		width <= 440
			? [[{ fr: '2_1' }], [{ fr: '2_1' }], [{ fr: '2_1' }], [{ fr: '2_1' }]]
			: width <= 1090
			? [
					[{ fr: 2 }, { fr: 2 }],
					[{ fr: 2 }, { fr: 2 }],
					[{ fr: 2 }, { fr: 2 }],
					[{ fr: 2 }, { fr: 2 }]
			  ]
			: [
					[{ fr: 1 }, { fr: 1 }, { fr: 2 }],
					[{ fr: 1 }, { fr: 2 }, { fr: 1 }],
					[{ fr: 2 }, { fr: 1 }, { fr: 1 }],
					[{ fr: 1 }, { fr: 1 }, { fr: 1 }, { fr: 1 }],
					[{ fr: 2 }, { fr: 2 }]
			  ];

	layouts.forEach(layout => {
		const row = layout
			.map(item => {
				const _item = items[index];
				index++;
				return _item ? { ...item, item: _item } : null;
			})
			.filter(Boolean) as LayoutItem<T>[];
		if (row.length) rows.push(row);
	});

	while (index < items.length) {
		const remainingRow =
			width <= 440
				? [{ fr: 2, item: items[index] }]
				: ([
						{ fr: 2, item: items[index] },
						items[index + 1] ? { fr: 2, item: items[index + 1] } : null
				  ].filter(Boolean) as LayoutItem<T>[]);
		rows.push(remainingRow);
		index += width <= 440 ? 1 : 2;
	}

	return rows;
};
