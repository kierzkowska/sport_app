import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./subpage.css";
import { stadium, calendar } from "./import"
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";

const Matchinfo = ({ parame }) => {
  return (
    <div className="match_info">
      <h1>Match Info</h1>
      <div className="match_info_p">
        <img className="imgdiv" src={calendar} alt="calendar" />
        <p> {new Date(parame?.sport_event?.start_time).toUTCString()}</p>
      </div>
      <div className="match_info_p">
        <img className="imgdiv1" src={stadium} alt="stadium" />
        <p>{parame?.sport_event?.venue?.name}</p>
      </div>
    </div>
  );
};

function Timeline({ a }) {
  let tab = [];
  for (let i = 0; i < a.timeline.length; i++) {
    tab.push(a.timeline[i]);
    if (
      a.timeline[i].type === "period_start" ||
      a.timeline[i].type === "throw_in" ||
      a.timeline[i].type === "free_kick" ||
      a.timeline[i].type === "goal_kick" ||
      a.timeline[i].type === "shot_off_target" ||
      a.timeline[i].type === "offside" ||
      a.timeline[i].type === "shot_on_target" ||
      a.timeline[i].type === "injury" ||
      a.timeline[i].type === "injury_return" ||
      a.timeline[i].type === "injury_time_shown" ||
      a.timeline[i].type === "shot_saved" ||
      a.timeline[i].type === "possible_goal" ||
      a.timeline[i].type === "break_start" ||
      a.timeline[i].type === "corner_kick"
    )
      tab.pop(a.timeline[i]);
    if (a.timeline[i].type === "substitution")
      a.timeline[i].type =
        a.timeline[i].type +
        " " +
        a.timeline[i].players[0].name +
        " into " +
        a.timeline[i].players[1].name;
    if (a.timeline[i].type === "score_change")
      a.timeline[i].type =
        a.timeline[i].home_score +
        " : " +
        a.timeline[i].away_score +
        " " +
        a.timeline[i].players[0].name;
    if (a.timeline[i].type === "yellow_card")
      a.timeline[i].type =
        a.timeline[i].type + " " + a.timeline[i].players[0].name;
    if (a.timeline[i].type === "red_card")
      a.timeline[i].type =
        a.timeline[i].type + " " + a.timeline[i].players[0].name;
    if (
      a.timeline[i].stoppage_time &&
      (a.timeline[i].match_time === 90 || a.timeline[i].match_time === 45)
    ) {
      a.timeline[i].match_time =
        a.timeline[i].match_time + "+" + a.timeline[i].stoppage_time + "'";
    }
    if (a.timeline[i].type === "period_score")
      a.timeline[i].type = "SECOND HALF";
    if (a.timeline[i].type === "match_ended")
      a.timeline[i].type = "END OF MATCH";
    if (a.timeline[i].type === "match_started")
      a.timeline[i].type = "FIRST HALF";
  }
  return (
    <Table striped bordered hover variant="secondary">
      <thead>
        <tr>
          <th>Minutes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tab.map((data, id) => {
          return (
            <tr key={id}>
              <td>{data.match_time}</td>
              {data?.competitor === "home" ? (
                <td className="text-start">{data?.type}</td>
              ) : (
                <td className="text-end">{data?.type}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function Summaryinfo({ par }) {
  return (
    <div className="match_info">
      <div>
        <Timeline a={par} />
      </div>
    </div>
  );
}

function Stats({ b }) {
  return (
    <div>
      <p>Ball Possession</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.ball_possession}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.ball_possession}
        />
      </ProgressBar>

      <p>Cards Given</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.cards_given}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.cards_given}
        />
      </ProgressBar>
      <p>Corner Kicks</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.corner_kicks}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.corner_kicks}
        />
      </ProgressBar>
      <p>Fouls</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.fouls}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.fouls}
        />
      </ProgressBar>
      <p>Free Kicks</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.free_kicks}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.free_kicks}
        />
      </ProgressBar>
      <p>Goal Kicks</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.goal_kicks}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.goal_kicks}
        />
      </ProgressBar>
      <p>Injures</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.injuries}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.injuries}
        />
      </ProgressBar>
      <p>Red cards</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.red_cards}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.red_cards}
        />
      </ProgressBar>
      <p>Yellow cards</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.yellow_cards}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.yellow_cards}
        />
      </ProgressBar>
      <p>Shots blocked</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.shots_blocked}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.shots_blocked}
        />
      </ProgressBar>
      <p>Shots off target</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.shots_off_target}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.shots_off_target}
        />
      </ProgressBar>
      <p>Shots on target</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.shots_on_target}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.shots_on_target}
        />
      </ProgressBar>
      <p>Shots saved</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.shots_saved}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.shots_saved}
        />
      </ProgressBar>
      <p>Shots total</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.shots_total}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.shots_total}
        />
      </ProgressBar>
      <p>Substitutions</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.substitutions}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.substitutions}
        />
      </ProgressBar>
      <p>Throw ins</p>
      <ProgressBar>
        <ProgressBar
          striped
          variant="success"
          now={b.statistics.totals.competitors[0].statistics.throw_ins}
        />
        <ProgressBar
          striped
          variant="primary"
          now={b.statistics.totals.competitors[1].statistics.throw_ins}
        />
      </ProgressBar>
    </div>
  );
}

function Statsinfo({ para }) {
  return (
    <div className="match_info">
      <div>
        <Stats b={para} />
      </div>
    </div>
  );
}

function Teams({ f }) {
  let tab0 = [];
  for (let i = 0; i < f.statistics.totals.competitors[0].players.length; i++) {
    tab0.push(f.statistics.totals.competitors[0].players[i]);
  }

  function Add({ id }) {
    let tab1 = [];
    for (
      let i = 0;
      i < f.statistics.totals.competitors[1].players.length;
      i++
    ) {
      tab1.push(f.statistics.totals.competitors[1].players[i].name);
    }
    return tab1[id];
  }

  return (
    <Table striped bordered hover variant="secondary">
      <thead>
        <tr>
          <th>{f.statistics.totals.competitors[0].name}</th>
          <th>{f.statistics.totals.competitors[1].name}</th>
        </tr>
      </thead>
      <tbody>
        {tab0.map((data, id) => {
          return (
            <tr key={id}>
              <td>{data.name}</td>
              <td>
                <Add id={id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function Lineinfo({ pa }) {
  return (
    <div className="match_info">
      <div>
        <Teams f={pa} />
      </div>
    </div>
  );
}

function Subpage() {
  const [param, setParam] = useState([]);
  const { id } = useParams();
  const [isShown, setIsShown] = useState(true);
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);

  const handleClick = (event) => {
    setIsShown1(false);
    setIsShown2(false);
    setIsShown3(false);
    setIsShown((current) => !current);
  };
  const handleClick1 = (event) => {
    setIsShown(false);
    setIsShown2(false);
    setIsShown3(false);
    setIsShown1((current) => !current);
  };
  const handleClick2 = (event) => {
    setIsShown(false);
    setIsShown1(false);
    setIsShown3(false);
    setIsShown2((current) => !current);
  };
  const handleClick3 = (event) => {
    setIsShown(false);
    setIsShown1(false);
    setIsShown2(false);
    setIsShown3((current) => !current);
  };

  useEffect(() => {
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/sport_events/${id}/timeline.json?api_key=p2fjeanpgmrbmh9mymhuufwp`
    ).then((res) => {
      setParam(res.data);
      //console.log(res.data);
    });
  }, []);

  return (
    <div>
      <div className="main-container">
        <div className="head">
          {" "}
          <div className="team1">
            <p> {param?.sport_event?.competitors[0].name}</p>
          </div>
          <div className="result">
            <p>
              {param?.sport_event_status?.home_score} :{" "}
              {param?.sport_event_status?.away_score}
            </p>
          </div>
          <div className="team2">
            <p>{param?.sport_event?.competitors[1].name}</p>
          </div>
        </div>
        <div className="tab_container">
          <button onClick={handleClick}>Info</button>
          <button onClick={handleClick1}>Summary</button>

          <button onClick={handleClick2}>Stats</button>
          <button onClick={handleClick3}>Line-ups</button>
        </div>
      </div>
      <div className="kuku">
        {" "}
        {isShown ? <Matchinfo parame={param} /> : null}
      </div>
      <div className="kuku">
        {" "}
        {isShown1 ? <Summaryinfo par={param} /> : null}
      </div>
      <div className="kuku">
        {" "}
        {isShown2 ? <Statsinfo para={param} /> : null}
      </div>
      <div className="kuku"> {isShown3 ? <Lineinfo pa={param} /> : null}</div>
    </div>
  );
}

export default Subpage;
