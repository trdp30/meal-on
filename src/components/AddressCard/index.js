import { get } from "lodash";
import React, { useMemo } from "react";

const AddressCard = ({ row }) => {
  const data = row?.original;
  const formattedAddress = useMemo(() => {
    let address = get(data, "address1");
    const address2 = get(data, "address2");
    return get(data, "address2") ? address + ", " + address2 : address;
  }, [data]);

  return (
    <div className="text-xs truncate">
      <p>{formattedAddress}</p>
      <p>
        {data?.city}, {data?.district}, {data?.state}, {data?.pin_code}
      </p>
    </div>
  );
};

export default AddressCard;
