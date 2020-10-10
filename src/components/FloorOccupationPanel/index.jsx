import React from 'react';

export default function ({ description, capacity, occupiedSpots }) {
    const availableSpots = capacity - occupiedSpots;
    const capacityPercentage = availableSpots / capacity * 100;

    return <div className="floor-occupation-panel mt-3 mb-3">
        <h5>
            {description}
            <span className="float-right font-weight-normal">Total spots: {capacity} | Current available capacity: {capacityPercentage.toFixed(1)}%</span>
        </h5>
        <div className="progress" style={{ height: '2rem' }}>
            <div className="progress-bar bg-dark" role="progressbar" style={{ width: `${100 - capacityPercentage}%` }}>{occupiedSpots} occupied</div>
            <div className="progress-bar bg-info" role="progressbar" style={{ width: `${capacityPercentage}%` }}>{availableSpots} available</div>
        </div>
    </div>;
}