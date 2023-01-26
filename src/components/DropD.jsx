import React, { useState, useEffect } from "react";
import { getApiData_2 } from "../services/getApi"
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

function DropD({ type, setType }) {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    getApiData_2().then((data) => {
      setSeasons(data.seasons);
      //console.log(data.schedules);
    });
  }, []);

  function seas(id) {
    const tab = [];
    for (let i = 0; i < seasons.length; i++) {
      const element = seasons[i].name;
      tab.push(element);
    }
    return tab[id];
  }

  function urlID(ik) {
    const tab = [];
    for (let i = 0; i < seasons.length; i++) {
      const element = seasons[i].id;
      tab.push(element);
    }
    return tab[ik];
  }


  return (
    <div>
        <FormControl fullWidth>
          <InputLabel id="type">Seasons</InputLabel>

          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={urlID(0)}>{seas(0)}</MenuItem>
            <MenuItem value={urlID(1)}>{seas(1)}</MenuItem>
            <MenuItem value={urlID(2)}>{seas(2)}</MenuItem>
          </Select>
        </FormControl>
    </div>
  );
}

export default DropD;
