import TabPackages from './icon/tab_packages.png';
import Instagram from './icon/social/instagram.svg';
import Telegram from './icon/social/telegram.svg';
import Whatsapp from './icon/social/whatsapp.svg';
import YouTube from './icon/social/youtube.svg';

import Card1 from './icon/about_cards/card1.svg';
import Card2 from './icon/about_cards/card2.svg';
import Card3 from './icon/about_cards/card3.svg';

import GlobalIcon from './icon/Global.svg';
import Logo from './svg/logo.svg';

import Advantages from './images/about/advantages.jpg';
import Ornament from './images/about/ornament.svg';

import AdliWahid from './images/adli-wahid.jpg';

import Bg1 from './images/hero-backgrounds/bg-1.png';
import Bg2 from './images/hero-backgrounds/bg-2.png';
import Bg3 from './images/hero-backgrounds/bg-3.jpg';

import CardEmblem from './images/card-emblem.svg';
import Lamp from './images/lamp.svg';

import Stage1 from './images/hadj-stages/stage1.png';
import Stage2 from './images/hadj-stages/stage2.png';
import Stage3 from './images/hadj-stages/stage3.png';
import Stage4 from './images/hadj-stages/stage4.png';
import Stage5 from './images/hadj-stages/stage5.png';

import IAntLogo from './global/iant-logo.svg';
import Kyrgyzstan from './global/kyrgyzstan.svg';
import Russia from './global/russian.svg';

import Gallery1 from './images/about/galleries/gallery1.jpg';
import Gallery2 from './images/about/galleries/gallery2.jpg';
import Gallery3 from './images/about/galleries/gallery3.jpg';
import Gallery4 from './images/about/galleries/gallery4.jpg';
import Gallery5 from './images/about/galleries/gallery5.jpg';
import Gallery6 from './images/about/galleries/gallery6.jpg';

const Icons = {
   TabPackages,
   Social: { Instagram, Telegram, Whatsapp, YouTube },
   AboutCard: [Card1, Card2, Card3],
   Global: GlobalIcon,
};

const Svg = {
   Logo,
};

const Images = {
   About: {
      Advantages,
      Ornament,
      Galleries: [Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery6],
   },
   AdliWahid,
   HeroBackgrounds: [Bg1, Bg2, Bg3],
   CardEmblem,
   Lamp,
   HadjStages: [Stage1, Stage2, Stage3, Stage4, Stage5],
};

const Global = {
   IAntLogo,
   Languages: { KG: Kyrgyzstan, RU: Russia },
};

export const Assets = { Icons, Svg, Images, Global };
