import { Pie, PieChart, Tooltip } from "recharts";
import { ANTITRIBU, CRYPT, MULTI, NAME, VALUE } from "@/constants";
import { useApp } from "@/context";
import { getClan } from "@/utils";

const TdaChartsClan = ({ decks }) => {
  const { isMobile, isDesktop, isWide } = useApp();
  const result = {};

  Object.values(decks).forEach((deck) => {
    const clan = getClan(deck[CRYPT]) || MULTI;
    if (result[clan]) {
      result[clan] += 1;
    } else {
      result[clan] = 1;
    }
  });

  const data = Object.keys(result)
    .map((c) => {
      return {
        name: isMobile && c.includes(ANTITRIBU) ? `!${c.replace(` ${ANTITRIBU}`, "")}` : c,
        value: result[c],
      };
    })
    .toSorted((a, b) => a[NAME] > b[NAME])
    .toSorted((a, b) => b.value > a.value);

  return (
    <PieChart
      width={isMobile || (isDesktop && !isWide) ? 400 : 620}
      height={isMobile || (isDesktop && !isWide) ? 250 : 365}
    >
      <Pie
        isAnimationActive={false}
        data={data}
        dataKey={VALUE}
        cx="50%"
        cy="50%"
        outerRadius={isMobile || (isDesktop && !isWide) ? 90 : 150}
        fill="#8884d8"
        label={({ index }) => data[index][NAME]}
      />
      <Tooltip
        contentStyle={{
          padding: "2px 9px 2px 2px",
          border: "1px solid #606070",
          background: "#404050",
        }}
        itemStyle={{ color: "white" }}
      />
    </PieChart>
  );
};

export default TdaChartsClan;
