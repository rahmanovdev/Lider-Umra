'use size';
import { useSize } from '@/hooks/use-size';
import Image from 'next/image';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import liderUmrahLogo from '../../../../public/assets/images/logo.svg';
import scss from './Footer.module.scss';
import { useTranslations } from 'next-intl';

const Footer = () => {
	const windowSize = useSize();
	const tabBarSize = useSize('#tab-bar');
	const t = useTranslations();
	return (
		<footer
			style={{
				marginBottom: windowSize.width <= 1000 ? tabBarSize.height : 0
			}}
			className={scss.footer}
		>
			<div className='container'>
				<div className={scss.content}>
					<div className={scss.left_block}>
						<Image
							src={liderUmrahLogo}
							alt='liderUmrah_logo'
							height={300}
							width={700}
						/>
						<p dangerouslySetInnerHTML={{ __html: t('descriptions.base') }} />
					</div>
					<div className={scss.center}>
						<h2>{t('footer.quickLinks')}</h2>
						<div className={scss.nav}>
							<p>{t('footer.links.home')}</p>
							<p>{t('footer.links.privacy')}</p>
							<p>{t('footer.links.faq')}</p>
							<p>{t('footer.links.glossary')}</p>
							<p>{t('footer.links.contact')}</p>
							<p>{t('footer.links.terms')}</p>
						</div>
					</div>
					<div className={scss.center}>
						<h2>{t('footer.company')}</h2>
						<div className={scss.nav}>
							<p>{t('footer.links.blog')}</p>
							<p>{t('footer.links.about')}</p>
							<p>{t('footer.links.career')}</p>
						</div>
					</div>
					<div className={scss.center}>
						<h2>{t('footer.resources')}</h2>
						<div className={scss.nav}>
							<p>{t('footer.links.umrahPackages')}</p>
							<p>{t('footer.links.umrahHolidays')}</p>
							<p>{t('footer.links.hotels')}</p>
							<p>{t('footer.links.destinations')}</p>
						</div>
					</div>

					<div className={scss.right_block}>
						<h2>Байланыш</h2>
						<div className={scss.logo}>
							<IoLogoYoutube />
							<FaInstagram />
							<FaFacebook />
							<AiOutlineLinkedin />
						</div>
					</div>
				</div>
			</div>

			<div className={scss.under_footer}>
				<div className={scss.left}>
					<p>@ 2025, Lider Umrah</p>
				</div>
				<div className={scss.right}>
					<p>
						Powered by <span>IANT Studio</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
