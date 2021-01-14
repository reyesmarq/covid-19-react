import { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

interface Props {
  handleCountryChange: any;
}

const CountryPicker: React.FC<Props> = ({ handleCountryChange }) => {
  const [countriesData, setCountriesData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      setCountriesData(await fetchCountries());
    };

    fetchData();
  }, [setCountriesData]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Global</option>
        {countriesData.map((country: string, i: any) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
