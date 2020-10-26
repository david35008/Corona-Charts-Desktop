import React, { useState, useEffect } from "react";
import { Tooltip, Legend, LineChart, Line, CartesianGrid, XAxis, YAxis, } from "recharts";
import axios from "axios";

function Chart() {

    const [country1, setCountry1] = useState([]);
    const [country2, setCountry2] = useState([]);
    const [dataApi1, setDataApi1] = useState([]);
    const [dataApi2, setDataApi2] = useState([]);
    const [countriesList, setCountriesList] = useState([])

    const fetchData = async () => {
        try {
            const { data: dataCountry1 } = await axios.get(
                `https://api.covid19api.com/live/country/${country1}/status/confirmed`,
                {
                    headers: {
                        "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
                    },
                }
            );
            console.log(dataCountry1);
            setDataApi1(dataCountry1);
            const { data: dataCountry2 } = await axios.get(
                `https://api.covid19api.com/live/country/${country2}/status/confirmed`,
                {
                    headers: {
                        "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
                    },
                }
            );
            setDataApi2(dataCountry2);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCountries = async () => {
        try {
            const { data } = await axios.get(`https://api.covid19api.com/countries`, {
                headers: {
                    "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
                },
            });
            setCountriesList(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCountries()
    }, []);

    useEffect(() => {
        fetchData();
    }, [country1, country2]);

    return (
        <div>
            <h1>Corona Chart Death</h1>
            <LineChart
                width={600}
                height={300}
                data={dataApi2.map((day, i) => {
                    return {
                        name: new Date(day.Date).getDate(),
                        uv: day.Confirmed,
                        pv: dataApi1[i].Confirmed
                    }
                })}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis dataKey="name" />
                <YAxis
                // type="number" domain={[0, Math.max(1, 2, 3) + 10000]}
                />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey='uv' stroke="#000000" />
                <Line type="monotone" dataKey='pv' stroke="#82ca9d" />
            </LineChart>
            {countriesList.length !== 0 && (
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
            )}
        </div>
    );
}

export default Chart;





