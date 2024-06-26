import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonRowList = ({ amount, style, col = 6 }) => {
  let skeletonRowList = [];
  for (let index = 0; index < amount; index++) {
    skeletonRowList.push(
      <tr key={index}>
        <td colSpan={col}>
          <Skeleton className={style} />
        </td>
      </tr>
    );
  }
  return skeletonRowList;
};

export default SkeletonRowList;
