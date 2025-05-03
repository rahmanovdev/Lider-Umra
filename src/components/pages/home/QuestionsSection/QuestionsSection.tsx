import React from "react";
import scss from "./QuestionsSection.module.scss";

const QuestionsSection = () => {
  return (
    <section className={scss.Main}>
      <div className={scss.back_photo}></div>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block}>
          <h1>Остались вопросы?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Non et <br /> phasellus
            ullamcorper ut. Lectus mauris sed faucibus <br /> viverra viverra
          </p>

          <div className={scss.inputs}>
            <input type="text" placeholder="Имя"/>
            <input type="text" placeholder="Телефон"/>
            <input type="text" placeholder="Email"/>
            <button>Получить консультацию</button>
          </div>
          </div>
        </div>
      </div>
    </section> 
  );
};

export default QuestionsSection;