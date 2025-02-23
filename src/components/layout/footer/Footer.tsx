'use size';
import { useSize } from '@/hooks/use-size';
import Image from 'next/image';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import liderUmrahLogo from '../../../../public/assets/images/logo.svg';
import scss from './Footer.module.scss';

const Footer = () => {
  const windowSize = useSize();
  const tabBarSize = useSize('#tab-bar');

  return (
    <footer
      style={{
        marginBottom: windowSize.width <= 1000 ? tabBarSize.height : 0
      }}
      className={scss.footer}
    >
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left_block}>
            <Image
              src={liderUmrahLogo}
              alt="liderUmrah_logo"
              height={300} 
              width={700}
            />
            <p>
              Lorem ipsum dolor sit amet consectetur. Nunc risus <br /> accumsan
              magna mi vitae felis. Egestas mi pharetra ut iaculis <br /> non
              imperdiet sapien mattis. Dui euismod interdum egestas <br />{" "}
              malesuada nisl faucibus scelerisque magna. Scelerisque <br />{" "}
              facilisis nisi ut vitae. Tempor viverra.
            </p>
          </div>
          <div className={scss.center}>
            <h2>Тез шилтемелер</h2>
            <div className={scss.nav}>
              <p>Башкы</p>
              <p>Купуя саясаты</p>
              <p>{"FAQ'"}s</p>
              <p>Глоссарий</p>
              <p>Байланыш</p>
              <p>Колдонуу мооноту</p>
            </div>
          </div>
          <div className={scss.center}>
            <h2>Компания</h2>
            <div className={scss.nav}>
              <p>Блог</p>
              <p>Биз жөнүндө</p>
              <p>Карьера</p>
            </div>
          </div>
          <div className={scss.center}>
            <h2>Ресурстар</h2>
            <div className={scss.nav}>
              <p>Umrah Packages</p>
              <p>Umrah + Holidays</p>
              <p>Мейманканалар</p>
              <p>Көздөгөн жер</p>
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