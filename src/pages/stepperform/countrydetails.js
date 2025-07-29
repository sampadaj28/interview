// src/components/Countrydetails.js
import React, { useMemo } from "react";
import Select from "react-select";
import {
  useGetCountryListQuery,
  useGetStateListQuery,
} from "../../services/adminApi";

export default function Countrydetails({ data, setData }) {
  const token = localStorage.getItem("token");

  const {
    data: countryData,
    isLoading: loadingCountries,
    isError: countryError,
  } = useGetCountryListQuery(token);

  const {
    data: stateData,
    isLoading: loadingStates,
    isError: stateError,
  } = useGetStateListQuery(
    { countryId: data.countryId, token },
    { skip: !data.countryId }
  );

  const countries = useMemo(
    () =>
      countryData?.data?.map((item) => ({
        value: item.id,
        label: item.name,
      })) || [],
    [countryData]
  );

  const states = useMemo(
    () =>
      stateData?.data?.map((item) => ({
        value: item.id,
        label: item.name,
      })) || [],
    [stateData]
  );

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
          Details
        </h1>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Select Country
            </label>
            <Select
              isLoading={loadingCountries}
              options={countries}
              value={countries.find((c) => c.value === data.countryId) || null}
              onChange={(selected) =>
                setData({
                  ...data,
                  countryId: selected.value,
                  stateId: null,
                })
              }
              className="text-left text-sm text-gray-700 rounded border border-gray-200"
              classNamePrefix="select"
            />
            {countryError && (
              <p className="text-red-500 mt-1">Failed to load countries</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Select State
            </label>
            <Select
              isDisabled={!data.countryId}
              isLoading={loadingStates}
              options={states}
              value={states.find((s) => s.value === data.stateId) || null}
              onChange={(selected) =>
                setData({
                  ...data,
                  stateId: selected.value,
                })
              }
              className="text-left text-sm text-gray-700 rounded border border-gray-200"
              classNamePrefix="select"
            />
            {stateError && (
              <p className="text-red-500 mt-1">Failed to load states</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
