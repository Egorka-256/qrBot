const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const qr = require("qrcode");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);
bot.start((ctx) =>
  ctx.reply(
    "Привет(*￣▽￣*)ブ! Меня зовут QRbot, я создам любой твой QRcode по url. Просто введи /qrcode (/qrcode url), а за тем свой url и получишь свой QRcode(☆▽☆). А также ты можешь поддержать автора по команде /sup 👉👈"
  )
);
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));

bot.command("sup", async (ctx) =>
  ctx.reply("https://www.tinkoff.ru/rm/kazandzhi.egor1/TycmC65265")
);

bot.command("qrcode", async (ctx) => {
  const url = ctx.message.text.split(" ")[1];
  try {2
    const QRcode = await qr.toBuffer(url, { type: "png" });

    ctx.replyWithPhoto({
      source: QRcode,
    });
  } catch (error) {
    console.error(error);
    ctx.reply("!ОШИБКА! Возможно что-то не так с url（*゜ー゜*）");
  }
});

bot.launch();
console.log("Bot started: https://t.me/QRniceBOT");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));