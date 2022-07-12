import { ApiAltSkus } from 'api';
import { useState } from 'react';
import Select from 'react-select';

const SkuSelect = ({ price, debtor, onChange, value }) => {
  const [cache, setCache] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = async (e, debtor, price) => {
    if (cache) {
      return;
    }
    setLoading(true);
    setOptions([]);
    const resp = await ApiAltSkus.indexSelect(100, 0, debtor, price);
    const data = resp.data.data.models;

    if (!data) {
      return [];
    }

    const options = data.map(v => ({ label: v.altSku, value: v.id }));

    const defaultValue = data ? data.find(v => v.value == selected) : '';
    setLoading(false);
    setOptions(options);
    setCache(true);
  };

  return (
    <Select
      isLoading={loading}
      options={options}
      defaultOptions={false}
      blurInputOnSelect={true}
      onFocus={e => loadOptions(e, debtor, price)}
      onChange={onChange}
      value={value}
    />
  );
};

export default SkuSelect;
