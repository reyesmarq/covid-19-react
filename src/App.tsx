import React, { useEffect, useState } from "react";
import { Cards, CountryPicker, Chart } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { Typography } from "@material-ui/core";

const App = () => {
  const [data, setData] = useState<any>({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    })();
  }, []);

  const handleCountryChange = async (country: any) => {
    const fetchedData = await fetchData(country);
    setData(fetchedData);
    setCountry(country);
  };

  return (
    <>
      <div className={styles.container}>
        <Typography variant="h5">Covid - 19</Typography>
        <Cards data={data} />
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    </>
  );
};

// class App extends React.Component {
//   async componentDidMount() {
//     const data = await fetchData();

//     console.log(data);
//   }

//   render() {
//     return (
//       <>
//         <div className={styles.container}>
//           <Cards />
//           <CountryPicker />
//           <Chart />
//         </div>
//       </>
//     );
//   }
// }

export default App;
