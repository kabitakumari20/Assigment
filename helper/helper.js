const moment = require("moment");
module.exports = {
  genratorRandom: (length = 10) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },
  getReferralAmount: (usedCount) => {
    usedCount = usedCount || 1;
    let days = moment().isoWeekday();
    console.log("daysNumber:", days);
    let holidays = [
      new Date("2022-05-25"),
      new Date("2022-05-26"),
      new Date("2022-05-30"),
    ];
    let refferalBonus = 0;
    if ([7, 6].includes(days)) {
    } else if (holidays.includes(new Date())) {
      refferalBonus = 200;
    } else {
      refferalBonus = 50;
    }

    if (usedCount == 1) refferalBonus = Number((refferalBonus * 100) / 100);
    if (usedCount == 2) refferalBonus = Number((refferalBonus * 50) / 100);
    if (usedCount >= 3) refferalBonus = Number((refferalBonus * 10) / 100);

    return refferalBonus;
  },
};
