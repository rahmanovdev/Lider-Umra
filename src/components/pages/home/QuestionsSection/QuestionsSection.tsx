"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import scss from "./QuestionsSection.module.scss";

interface IFormTelegram {
  name: string;
  phone: string;
  email: string;
}

const TG_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

console.log({TG_TOKEN})
console.log({CHAT_ID})

const QuestionsSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IFormTelegram>({ mode: "onChange" });

  const botsMessageModel = (data: IFormTelegram) => {
    let messageTG = `User's name: <b>${data.name}</b>\n`;
    messageTG += `User's phone: <b>${data.phone}</b>\n`;
    messageTG += `User's email: <b>${data.email}</b>\n`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    try {
      await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: botsMessageModel(data),
      });
      reset();
      toast.success("Сообщение успешно отправлено!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Ошибка! Попробуйте позже.", { autoClose: 2000 });
      console.error(error);
    }
  };

  return (
    <section className={scss.Main}>
      <div className={scss.back_photo}></div>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block}>
            <h1>Остались вопросы?</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Non et <br /> phasellus ullamcorper ut. Lectus mauris sed faucibus <br /> viverra viverra
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className={scss.inputs}>
              <input type="text" placeholder="Имя" {...register("name", { required: true })} />
              <input type="text" placeholder="Телефон" {...register("phone", { required: true })} />
              <input type="text" placeholder="Email" {...register("email", { required: true })} />
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Отправка..." : "Получить консультацию"}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;