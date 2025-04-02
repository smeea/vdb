const sanitizeScoreSheet = (sheet) => {
  Object.keys(sheet).forEach((k) => {
    [
      "D", // 3
      "F", // 5
      "G", // 6
      "J", // 9
      "K", // 10
      "L", // 11
      "M", // 12
      "N", // 13
      "O", // 14
      "P", // 15
      "Q", // 16
      "S", // 18
      "T", // 19
      "V", // 21
      "W", // 22
      "X", // 23
      "Y", // 24
      "Z", // 25
      "AA", // 26
      "AB", // 27
    ].forEach((col) => {
      if (k.includes(col)) {
        delete sheet[k];
      }
    });
  });

  let maxA = 1;
  Object.keys(sheet).forEach((k) => {
    ["f", "r", "h"].forEach((i) => delete sheet[k][i]);
    if (k.includes("A")) {
      const v = Number.parseInt(k.replace("A", ""));
      if (v > maxA) maxA = v;
    }
  });
  sheet["!ref"] = `A1:AB${maxA}`;
  sheet["!margins"] = undefined;

  return sheet;
};

export default sanitizeScoreSheet;
