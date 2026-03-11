"use server";
import nodemailer from "nodemailer";

export async function SendMail(name: string, phoneOrEmail: string, message: string) {
  // console.log("Начинаем отправку письма...");
  // console.log("EMAIL_USER:", process.env.EMAIL_USER ? "установлен" : "не установлен");
  // console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "установлен" : "не установлен");
  // console.log("SMTP_HOST:", process.env.SMTP_HOST);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.yandex.ru",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // Включаем отладку
      logger: true, // Включаем логирование
    });

    // console.log("Проверяем соединение с SMTP...");
    await transporter.verify();
    // console.log("Соединение с SMTP успешно!");

    // console.log("Отправляем письмо...");
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Заявка от ${name}`,
      text: `${name}\n${phoneOrEmail}\n${message}`,
    });

    // console.log("Письмо отправлено! ID:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    // Выводим ПОЛНУЮ информацию об ошибке
    console.error("=== ДЕТАЛИ ОШИБКИ ===");
    console.error("Тип ошибки:", typeof error);
    console.error("Конструктор ошибки:", error?.constructor?.name);
    console.error("Сообщение:", error instanceof Error ? error.message : String(error));
    console.error("Стек:", error instanceof Error ? error.stack : "нет стека");

    if (error && typeof error === "object") {
      console.error("Код ошибки:", (error as any).code);
      console.error("Команда:", (error as any).command);
      console.error("Ответ:", (error as any).response);
      console.error("Ответный код:", (error as any).responseCode);
    }
    return { success: false };

    // Пробрасываем оригинальную ошибку, а не новую
    // throw new Error(`Ошибка отправки: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
  }
}
