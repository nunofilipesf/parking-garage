import React from 'react';

export default function ({ numberOfSessions, totalAmount }) {

    return <div className="daily-earnings-panel card-group">
        <div className="card bg-dark text-white">
            <div className="card-header h5 text-center">Today's Parking Sessions</div>
            <div className="card-body">
                <p className="display-2 text-center">{numberOfSessions}</p>
            </div>
        </div>
        <div className="card bg-dark text-white">
            <div className="card-header h5 text-center">Today's Total Earnings</div>
            <div className="card-body">
                <p className="display-2 text-center">NOK {totalAmount}</p>
            </div>
        </div>
    </div>
}