import React from 'react';

export default function ({ capacity, occupiedSpots }) {
    const availableSpots = capacity - occupiedSpots;
    const capacityPercentage = (availableSpots / capacity * 100).toFixed(1);

    return <div className="occupation-totals-panel card-group">
        <div className="card bg-dark text-white">
            <div className="card-header h5 text-center">Occupied spots</div>
            <div className="card-body">
                <p className="display-2 text-center">{occupiedSpots}</p>
            </div>
        </div>
        <div className="card bg-dark text-white">
            <div className="card-header h5 text-center">Current capacity</div>
            <div className="card-body">
                <p className={`display-3 mb-0 text-center text-${getColorBasedOnCurrentCapacity(capacityPercentage)}`}>{capacityPercentage}%</p>
                <p className="text-center mb-0">of {capacity} parking spots</p>
            </div>
        </div>
        <div className="card bg-dark text-white">
            <div className="card-header h5 text-center">Available spots</div>
            <div className="card-body">
                <p className="display-2 text-center">{availableSpots}</p>
            </div>
        </div>
    </div>;
}

function getColorBasedOnCurrentCapacity(currentCapacity) {
    if (currentCapacity < 25)
        return 'danger';

    if (currentCapacity < 50)
        return 'warning';

    return 'success';
}