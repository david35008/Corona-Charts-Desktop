import React, { useState, useEffect } from "react";
import { Tooltip, Legend, LineChart, Line, CartesianGrid, XAxis, YAxis, } from "recharts";
import axios from "axios";

function Chart() {

    const [countrySvg1, setCountrySvg1] = useState();
    const [countrySvg2, setCountrySvg2] = useState();
    const [countryName1, setCountryName1] = useState('');
    const [countryName2, setCountryName2] = useState('');
    const [svgCountryData, setSvgCountryData] = useState([]);

    function csvJSON(csv) {
        let lines = csv.split("\n");
        let result = [];
        let headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
            let obj = {};
            let currentline = lines[i].split(",");
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }

    const fetchSvg = async () => {
        try {
            const { data: response } = await axios.get(
                "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
            );
            let filtered = csvJSON(response).filter((item) => {
                return item["Province/State"] === "";
            });
            setSvgCountryData(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSvg();
    }, []);
    let y
    let a =[]
    let b = []
     
    if (countrySvg1 && countrySvg2) {
        let x = Object.entries(countrySvg1)
        x.splice(0, 4)
         b = x.map(a => a[1])
         a = Object.entries(countrySvg2).map(a => a[1])
        a.splice(0, 4)
         y = x.map((element, index) => {
            let newObj = {
                name: element[0],
            }
            newObj[`${countryName1}`] = element[1]
            newObj[`${countryName2}`] = a[index]
            return newObj
        })
    }
    // console.log(y);
    return (
        <div>
            <h1>Corona Chart</h1>
            <LineChart
                width={600}
                height={300}
                data={y}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, Math.max(...a, ...b) + 10000]} />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={countryName1} stroke="#000000" />
                <Line type="monotone" dataKey={countryName2} stroke="#82ca9d" />
            </LineChart>
            {svgCountryData.length !== 0 && (
                <>
                    <select
                        defaultValue={
                            svgCountryData.length > 0 && svgCountryData[0]["Country/Region"]
                        }
                        onChange={(e) => {
                            setCountryName1(svgCountryData[e.target.value]["Country/Region"]);
 
                            setCountrySvg1(svgCountryData[e.target.value])
                        }}
                    >
                        {svgCountryData.map((item, i) => {
                            return (
                                <option key={i} value={i}>
                                    {item["Country/Region"]}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        defaultValue={
                            svgCountryData.length > 0 && svgCountryData[1]["Country/Region"]
                        }
                        onChange={(e) => {
                            setCountryName2(svgCountryData[e.target.value]["Country/Region"]);
 
                            setCountrySvg2(svgCountryData[e.target.value]);
                        }}
                    >
                        {svgCountryData.map((item, i) => {
                            return (
                                <option key={i} value={i}>
                                    {item["Country/Region"]}
                                </option>
                            );
                        })}
                    </select>
                </>
            )}
        </div>
    );
}

export default Chart;




{/* {countriesList.length !== 0 && (
    <>
    <select
    defaultValue={countriesList[0].Country}
    onChange={(e) => setCountry1(e.target.value)}
    >
    {countriesList.map((item) => {
        return <option value={item.Slug}>{item.Country}</option>;
    })}
    </select>
    <select
    defaultValue={countriesList.length > 0 && countriesList[0].Country}
    onChange={(e) => setCountry2(e.target.value)}
    >
    {countriesList.map((item) => {
        return <option value={item.Slug}>{item.Country}</option>;
    })}
    </select>
    </>
)} */}

// const data = dataApi2.map((day, i) => {
    //     return {
        //         name: new Date(day.Date).getDate(),
        //         uv: day.Confirmed,
        //         pv: dataApi1[i].Confirmed
        //     }
        // })

// const fetchData = async () => {
    //     try {
        //         const { data: dataCountry1 } = await axios.get(
            //             `https://api.covid19api.com/live/country/${country1}/status/confirmed/date/2020-03-21T13:13:30Z`,
            //             {
                //                 headers: {
                    //                     "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
                    //                 },
                    //             }
                    //         );
            //         setDataApi1(dataCountry1);
            //         const { data: dataCountry2 } = await axios.get(
            //             `https://api.covid19api.com/live/country/${country2}/status/confirmed/date/2020-03-21T13:13:30Z`,
            //             {
            //                 headers: {
            //                     "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
            //                 },
            //             }
            //         );
            //         setDataApi2(dataCountry2);
            //     } catch (err) {
            //         console.error(err);
            //     }
            // };

            // const fetchCountries = async () => {
            //     try {
            //         const { data } = await axios.get(`https://api.covid19api.com/countries`, {
            //             headers: {
            //                 "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
            //             },
            //         });
            //         setCountriesList(data);
            //     } catch (err) {
            //         console.error(err);
            //     }
            // };

            // useEffect(() => {
            //     fetchData();
            // }, [country1, country2]);