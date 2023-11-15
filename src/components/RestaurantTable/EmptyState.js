/**
 *
 * EmptyState for RestaurantTable
 *
 */

import React from "react";

export function EmptyState() {
  return (
    <td>
      <div className="w-screen h-full flex flex-col items-center pt-20">
        No data found
      </div>
    </td>
  );
}

export default EmptyState;
