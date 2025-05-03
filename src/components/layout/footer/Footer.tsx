import React from "react";
import scss from "./Footer.module.scss";
import liderUmrahLogo from "../../../../public/assets/images/logo.svg";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";


const Footer = () => {
  return (
    <footer className={scss.footer}>
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
            <h2>Quick links</h2>
            <div className={scss.nav}>
            <p>Home</p>
            <p>Privacy Policy</p>
            <p>FAQ's</p>
            <p>Glossary</p>
            <p>Contact Us</p>
            <p>Term Of Use</p>
            </div>
          </div>
          <div className={scss.center}>
            <h2>Company</h2>
            <div className={scss.nav}>
            <p>Blogs</p>
            <p>About us</p>
            <p>Careers</p>
            </div>
          </div>
          <div className={scss.center}>
            <h2>Resourses</h2>
            <div className={scss.nav}>
            <p>Umrah Packages</p>
            <p>Umrah + Holidays</p>
            <p>Hotels</p>
            <p>Destination</p>
            </div>
          </div>
          <div className={scss.right_block}>
            <h2>Contact Us</h2>
            <div className={scss.logo}>
            <IoLogoYoutube/>
            <FaInstagram/>
            <FaFacebook/>
            <AiOutlineLinkedin/>
            </div>
          </div>
        </div>
      </div>

      <div className={scss.under_footer}>
        <div className={scss.left}>
          <p>@ 2025, Lider Umrah</p>
        </div>
        <div className={scss.right}>
          <p>Powered by <span>IANT Studio</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;