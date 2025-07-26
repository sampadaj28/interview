import React, { useEffect, useState } from "react";
import Select from "react-select";


export default function Countrydetails({ data, setData }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
    const TOKEN = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://reactinterviewtask.codetentaclestechnologies.in/api/api/country-list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const mappedCountries = res.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setCountries(mappedCountries);
      })
      .catch((err) => console.error("Country fetch error:", err));
  }, []);

  useEffect(() => {
    if (!data.country_id) return;

    const url = `https://reactinterviewtask.codetentaclestechnologies.in/api/api/state-list?country_id=${data.country_id}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const mappedStates = res.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setStates(mappedStates);
      })
      .catch((err) => console.error("State fetch error:", err));
  }, [data.country_id]);

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
            Details
          </h1>
          <form action="/" method="post">
            <div className="grid gap-2 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="country"
                >
                  Select Country
                </label>
                <Select
                  className="basic-single text-left text-sm text-gray-700 rounded border border-gray-200"
                  classNamePrefix="select"
                  options={countries}
                  value={countries.find((c) => c.value === data.country_id) || null}
                  onChange={(selected) =>
                    setData({
                      ...data,
                      country_id: selected.value,
                      state_id: null,
                    })
                  }
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="state"
                >
                  Select State
                </label>
                <Select
                  className="basic-single text-left text-sm text-gray-700 rounded border border-gray-200"
                  classNamePrefix="select"
                  options={states}
                  value={states.find((s) => s.value === data.state_id) || null}
                  onChange={(selected) =>
                    setData({
                      ...data,
                      state_id: selected.value,
                    })
                  }
                  isDisabled={!data.country_id}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
