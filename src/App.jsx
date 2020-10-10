import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import FloorOccupationPanel from './components/FloorOccupationPanel';
import OccupationTotalsPanel from './components/OccupationTotalsPanel';
import { getGarageOccupation, subscribeDataUpdates } from './services/api';

function App() {

    const [data, setData] = useState({ garage: {}, floors: [] });

    useEffect(() => {
        getGarageOccupation().then(setData);
        subscribeDataUpdates(onDataUpdate);
    }, []);


    function onDataUpdate(newDataValue) {
        setData(newDataValue);
    }

    return (
        <div className="app container">
            <h2 className="text-center mb-3">Parking Garage</h2>

            <OccupationTotalsPanel capacity={data.garage.capacity || 0} occupiedSpots={data.garage.occupiedSpots || 0} />

            {
                data.floors.map(({ description, capacity, occupiedSpots }, index) => <FloorOccupationPanel key={index} description={description} capacity={capacity} occupiedSpots={occupiedSpots} />)
            }

            <span style={{ position: 'fixed', bottom: '1rem', left: '1rem' }}>Photo by <a href="https://unsplash.com/@jordankgraff?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jordan Graff</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
        </div>
    );
}

export default App;
