import { useState } from "react";

const titleMessages = {
  giveFeedback: "give feedback",
  statistics: "statistics",
};

const statisticNames = {
  good: "good",
  neutral: "neutral",
  bad: "bad",
  all: "all",
  average: "average",
  positive: "positive",
};

const Title = ({ message }) => <h1>{message}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ statistic, value }) => (
  <tr>
    <td>{statistic}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine statistic={statisticNames.good} value={good} />
        <StatisticLine statistic={statisticNames.neutral} value={neutral} />
        <StatisticLine statistic={statisticNames.bad} value={bad} />
        <StatisticLine
          statistic={statisticNames.all}
          value={good + neutral + bad}
        />
        <StatisticLine
          statistic={statisticNames.average}
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticLine
          statistic={statisticNames.positive}
          value={(good / (good + neutral + bad)) * 100 + "%"}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Title message={titleMessages.giveFeedback} />
      <Button onClick={() => setGood(good + 1)} text={statisticNames.good} />
      <Button
        onClick={() => setNeutral(neutral + 1)}
        text={statisticNames.neutral}
      />
      <Button onClick={() => setBad(bad + 1)} text={statisticNames.bad} />

      <Title message={titleMessages.statistics} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
