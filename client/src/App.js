// import { LineChart, Legend, Tooltip, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import Chart from './components/Chart';

function App() {
//   const data = [
//     {date: '01.01.2020', uv: 400, pv: 700, x: 100}, 
//   {date: '02.01.2020', uv: 500, pv: 800, x: 200},
//   {date: '03.01.2020', uv: 700, pv: 900, x: 300},
// ];

// const covid = [
//   {date: '01.01.2020', sick: 400, pv: 700, x: 100}, 
// {date: '02.01.2020', sick: 500, pv: 800, x: 200},
// {date: '03.01.2020', sick: 700, pv: 900, x: 300},
// ];

// [
//   {date:'01.01.2020', sick:5},
//   {date:'01.01.2020', sick:5},
//   {date:'01.01.2020', sick:5},
//   {date:'01.01.2020', sick:5},
//   {date:'01.01.2020', sick:5},
//   {date:'01.01.2020', sick:5},
//   {date:'01.01.2020', sick:5},
// ]

  return (
    <div className="App">
      <Chart />
    {/* <LineChart width={600} height={300} data={data}>
        <Line type="linear" dataKey="uv" stroke="red" />
        <Line type="monotone" dataKey="pv" stroke="yellow" />
        <Line type="monotone" dataKey="x" stroke="#000000" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>


      <LineChart width={600} height={300} data={covid}>
        <Line type="linear" dataKey="sick" stroke="red" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend dataKey="Confirmed Cases"/>
      </LineChart> */}
    </div>
  );
}

export default App;
