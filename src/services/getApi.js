import axios from "axios";

export const getApiData = async (type) => {
  try {
    const { data } = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/seasons/${type}/schedules.json?api_key=p2fjeanpgmrbmh9mymhuufwp`,
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getApiData_2 = async () => {
  try {
    const { data } = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=p2fjeanpgmrbmh9mymhuufwp",
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
