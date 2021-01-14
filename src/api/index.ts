import Axios from "axios";

const url = "https://covid19.mathdro.id/api";

const fetchData = async (country: any = null) => {
  let countryUrl = url;
  
  if (country) {
    countryUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await Axios.get(countryUrl);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log("error", error);
  }
};

const fetchDailyData = async () => {
  try {
    const { data } = await Axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData: any) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log("error", error);
  }
};

const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await Axios.get(`${url}/countries`);

    return countries.map((country: any) => country.name);
  } catch (error) {
    console.log("error", error);
  }
};

export { fetchData, fetchDailyData, fetchCountries };
