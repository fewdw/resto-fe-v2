import React from "react";

const LoadingProfileSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="card w-80 bg-base-100">
        <div className="px-10 pt-10 flex justify-center">
          <div className="skeleton h-40 w-40 rounded-xl"></div>
        </div>
        <div className="card-body items-center text-center">
          <div className="skeleton h-6 w-40 mb-4"></div>
          <div className="flex items-center space-x-2">
            <div className="skeleton h-4 w-24"></div>
            <div className="skeleton h-8 w-16 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProfileSkeleton;
