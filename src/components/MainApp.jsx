import React, { useState, useEffect } from "react";
import { getApiData } from "../services/getApi";
import Table from "react-bootstrap/Table";
import DropD from "./DropD";

function MainApp() {
  const index = 0;
  const [schedules, setSchedules] = useState([]);
  const [type, setType] = useState("sr:season:77453");

  useEffect(() => {
    getApiData(type).then((data) => {
      setSchedules(data.schedules);
      //console.log(data.schedules);
    });
  }, [type]);

  function HalfT(idN) {
    const tabl = [];
    for (let i = 0; i < schedules.length; i++) {
      if (schedules[i].sport_event_status.status === "postponed") {
        tabl.push("Postponed");
      } else if (schedules[i].sport_event_status.status === "closed")
        tabl.push(
          schedules[i].sport_event_status.period_scores[0].home_score +
            " : " +
            schedules[i].sport_event_status.period_scores[0].away_score
        );
    }
    return tabl[idN];
  }

  return (
    <div>
      <DropD type={type} setType={setType} />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Team Names - Home</th>
            <th>Team Names - Away</th>
            <th>Result</th>
            <th>Match Date</th>
            <th>Half time score</th>
            <th>Stadium name</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, id) => {
            return (
              <tr key={id}>
                {schedule.sport_event_status.status === "postponed" ? (
                  <td className="bg-secondary">
                    {schedule.sport_event.competitors[index].name}
                  </td>
                ) : schedule.sport_event_status.match_tie ? (
                  <td className="bg-warning">
                    {schedule.sport_event.competitors[index].name}
                  </td>
                ) : schedule.sport_event.competitors[0].id ===
                  schedule.sport_event_status.winner_id ? (
                  <td className="bg-success">
                    {schedule.sport_event.competitors[index].name}
                  </td>
                ) : (
                  <td className="bg-danger">
                    {schedule.sport_event.competitors[index].name}
                  </td>
                )}

                {schedule.sport_event_status.status === "postponed" ? (
                  <td className="bg-secondary">
                    {schedule.sport_event.competitors[1].name}
                  </td>
                ) : schedule.sport_event_status.match_tie ? (
                  <td className="bg-warning">
                    {schedule.sport_event.competitors[1].name}
                  </td>
                ) : schedule.sport_event.competitors[1].id ===
                  schedule.sport_event_status.winner_id ? (
                  <td className="bg-success">
                    {schedule.sport_event.competitors[1].name}
                  </td>
                ) : (
                  <td className="bg-danger">
                    {schedule.sport_event.competitors[1].name}
                  </td>
                )}

                <td>
                  {schedule.sport_event_status.home_score} :{" "}
                  {schedule.sport_event_status.away_score}
                </td>
                <td>
                  {new Date(
                    schedule.sport_event.start_time
                  ).toLocaleDateString()}{" "}
                </td>
                <td>{HalfT(id)}</td>
                <td>{schedule.sport_event.venue.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default MainApp;
