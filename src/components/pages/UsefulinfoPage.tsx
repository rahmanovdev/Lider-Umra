import scss from './UsefulinfoPage.module.scss';
import React from 'react';
import UsefulinfoContent from './usefulinfo/UsefulinfoContent/UsefulinfoContent';

const UsefulinfoPage = () => {
	return (
		<div className={`container ${scss.pageContainer}`}>
			<h4 className={scss.title}>Полезные информации</h4>
			<UsefulinfoContent />
		</div>
	);
};

export default UsefulinfoPage;
