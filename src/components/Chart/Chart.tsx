// @ts-nocheck
import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Bar, Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

interface Props {
  country: any;
  data: any;
}

const Chart: React.FC<Props> = ({
  country,
  data: { confirmed, recovered, deaths },
}) => {
  const [dailyData, setDailyData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      setDailyData(await fetchDailyData());
    })();
  }, []);

  // const lineChart = dailyData[0] ? (
  //   <Line
  //     data={{
  //       labels: dailyData(({date}) => date),
  //       dataset: [{}, {}],
  //     }}
  //   />
  // ) : null;

  const lineChart = dailyData?.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "rgba(0, 0, 255, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : (
    <p>loading...</p>
  );

  console.log(confirmed, recovered, deaths);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
