import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Region } from '@/src/types/enums';
import { RegionSelect } from '@/src/types/types';
import { setRegion } from '@store/countriesSlice';
import './SelectRegion.scss';

export const SelectRegion = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionSelect>('All');
  const dispatch = useDispatch();

  const regions = ['All', ...Object.values(Region)];

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const region = event.target.value as RegionSelect;
      setSelectedRegion(region);
      dispatch(setRegion(region));
    },
    [dispatch]
  );

  return (
    <div className="select-region">
      <h3 className="select-region__title">Region</h3>
      <select
        className="select-region__select"
        value={selectedRegion}
        onChange={handleChange}
      >
        {regions.map((region) => (
          <option className="select-region__option" key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};
