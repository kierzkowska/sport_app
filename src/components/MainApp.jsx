import React, { useState, useEffect } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";

function MainApp() {
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    Axios.get(
      "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=p2fjeanpgmrbmh9mymhuufwp"
    ).then((res) => {
      setSchedules(res.data.schedules);
      console.log(res.data.schedules);
    });
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Team Names</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, id) => {
            return (
              <tr key={id}>
                <td>
                  {schedule.sport_event.competitors[0].name} /{" "}
                  {schedule.sport_event.competitors[1].name}
                </td>
                {schedule.sport_event_status.status === "postponed" ? (
                  <td>{"Postponed"}</td>
                ) : (
                  <td>
                    {" "}
                    {schedule.sport_event_status.home_score} :{" "}
                    {schedule.sport_event_status.away_score}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default MainApp;
