// data/content.ts

export const foods = [
	{
		id: 1,
		images: [
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.freepik.com%2Fpremium-photo%2Ffood-table-autumn-food-assortment-top-view-free-space-your-text_23758626.htm&psig=AOvVaw0pdBWvyayDBKp6uIQ1mFUN&ust=1739345064403000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJj4kLmLu4sDFQAAAAAdAAAAABAJ',
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.freepik.com%2Fpremium-photo%2Ffood-table-autumn-food-assortment-top-view-free-space-your-text_23758626.htm&psig=AOvVaw0pdBWvyayDBKp6uIQ1mFUN&ust=1739345064403000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJj4kLmLu4sDFQAAAAAdAAAAABAJ',
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.freepik.com%2Fpremium-photo%2Ffood-table-autumn-food-assortment-top-view-free-space-your-text_23758626.htm&psig=AOvVaw0pdBWvyayDBKp6uIQ1mFUN&ust=1739345064403000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJj4kLmLu4sDFQAAAAAdAAAAABAJ',
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.freepik.com%2Fpremium-photo%2Ffood-table-autumn-food-assortment-top-view-free-space-your-text_23758626.htm&psig=AOvVaw0pdBWvyayDBKp6uIQ1mFUN&ust=1739345064403000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJj4kLmLu4sDFQAAAAAdAAAAABAJ'
		],
		title: 'Тамактануу',
		description:
			'Күнүнө эки маал тамактануу: Эртең мененки жана кечки тамак-аш. Швед столу форматында уюштурулган, ар түрдүү тамактардын кеңири тандоосу менен: салаттар, биринчи жана экинчи тамактар, десерттер. Тамактар адал стандарттарына ылайык даярдалат.'
	}
];

export const hotelsData = [
	{
		id: 1,
		title: 'Проживание в Медине',
		subtitle: 'Maien Taiba (или аналог)',
		image: '/medina-hotel.jpg',
		details: [
			{ label: 'Расстояние до мечети Пророка', value: '300м' },
			{ label: 'Размещение', value: 'Четырехместное' },
			{ label: 'Питание', value: 'Завтрак и ужин - шведский стол' },
			{ label: 'Количество ночей', value: '3' }
		]
	},
	{
		id: 2,
		title: 'Проживание в Мекке',
		subtitle: 'Infinity (или аналог)',
		image: '/mecca-hotel.jpg',
		details: [
			{ label: 'Расстояние до Аль-Харама', value: '700 метров' },
			{ label: 'Размещение', value: 'Четырехместное' },
			{ label: 'Питание', value: 'Завтрак и ужин - шведский стол' },
			{ label: 'Количество ночей', value: '10' }
		]
	}
];

export const placesData = [
	{
		id: 1,
		title: 'Хурма бакка баруу',
		image: '/images/hurma.jpg',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		fullDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
	},
	{
		id: 2,
		title: 'Ухуд тоосу',
		image: '/images/uhud.jpg',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		fullDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
	},
	{
		id: 3,
		title: 'Куба мечити',
		image: '/images/mosque.jpg',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
		fullDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
	}
];

export const warningsData = [
	{
		id: 1,
		title: 'Өзүңүз менен бирге алып келбеңиз',
		image: '/warning1.jpg',
		description:
			'Эскертүү: Бардык электрондук түзүлүштөрдү (телефон, планшет ж.б.) алып келүүгө тыюу салынат...'
	},
	{
		id: 2,
		title: 'Сактык чаралары',
		image: '/warning2.jpg',
		description: 'Ысык аба ырайына байланыштуу көп суу ичүү керек...'
	}
];

export const gifts = [
	{
		id: 1,
		image: '/gift1.jpg',
		title: 'Замзам суусу',
		shortDescription: 'Ыйык Замзам суусунан 5 литр белекке берилет...',
		description:
			'Ыйык Замзам суусунан 5 литр белекке берилет. Бул суу Мекке шаарындагы ыйык булактан алынат. Замзам суусу - бул атактуу жана ыйык суу болуп, мусулмандар үчүн өзгөчө мааниге ээ. Анын тарыхы Ибрахим пайгамбардын убагына барып такалат жана мусулмандар үчүн кымбат белек болуп саналат.'
	},
	{
		id: 2,
		image: '/gift2.jpg',
		title: 'Ихрам кийими',
		shortDescription:
			'Ажылык ибадатын аткаруу үчүн атайын даярдалган ак түстөгү ихрам кийими...',
		description:
			'Ажылык ибадатын аткаруу үчүн атайын даярдалган ак түстөгү ихрам кийими берилет. Ихрам - бул ыйык ибадат учурунда кийилүүчү атайын кийим. Ал адамдардын арасындагы теңдикти жана жөнөкөйлүктү символдоштурат. Түсү ак, формасы жөнөкөй, бирок мааниси абдан терең.'
	},
	{
		id: 3,
		image: '/gift3.jpg',
		title: 'Хурма',
		shortDescription:
			'Мадина шаарындагы атактуу хурма бактарынан атайын тандалып алынган хурмалар...',
		description:
			'Мадина шаарындагы атактуу хурма бактарынан атайын тандалып алынган хурмалар берилет. Бул хурмалар өзүнүн жогорку сапаты жана даамы менен белгилүү. Хурма - бул жөн гана жемиш эмес, ал мусулман маданиятында өзгөчө орунга ээ болгон тамак-аш. Пайгамбарыбыз да хурманы жактырчу жана анын пайдалуу экендигин белгилечү.'
	}
];
