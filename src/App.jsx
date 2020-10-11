import React, { useState, useEffect } from 'react';

import DailyEarningsPanel from './components/DailyEarningsPanel';
import FloorOccupationPanel from './components/FloorOccupationPanel';
import Loader from './components/Loader';
import OccupationTotalsPanel from './components/OccupationTotalsPanel';

import { getGarageOccupation, subscribeDataUpdates } from './services/garage';

const VisualizationModes = { Earnings: 'Earnings', Occupation: 'Occupation' };

export default function App() {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [visualizationMode, setVisualizationMode] = useState(VisualizationModes.Occupation)

    useEffect(() => {
        getGarageOccupation()
            .then(data => {
                setData(data);
                setIsLoading(false);

                subscribeDataUpdates(onDataUpdate);
            });
    }, []);

    function onDataUpdate(newDataValue) {
        setData(newDataValue);
    }

    function getToggleButtonToVisualizationMode(buttonVisualizationMode) {
        return <button
            type="button"
            className={`btn btn-${visualizationMode === buttonVisualizationMode ? 'dark' : 'secondary'}`}
            onClick={() => setVisualizationMode(buttonVisualizationMode)}>
            {buttonVisualizationMode}
        </button>;
    }

    if (isLoading) {
        return <div className="app container">
            <Loader />
        </div>;
    }

    return (
        <div className="app container">

            <div className="btn-group mb-3 d-flex">
                {getToggleButtonToVisualizationMode(VisualizationModes.Occupation)}
                {getToggleButtonToVisualizationMode(VisualizationModes.Earnings)}
            </div>

            {
                visualizationMode === VisualizationModes.Occupation
                    ? <OccupationSection garageData={data.garage} floorsData={data.floors} />
                    : <EarningsSection earningData={data.earnings} />
            }

            <span style={{ position: 'fixed', bottom: '1rem', left: '1rem' }}>Photo by <a href="https://unsplash.com/@jordankgraff?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jordan Graff</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
        </div>
    );
}

function OccupationSection({ garageData, floorsData }) {
    return <>
        <OccupationTotalsPanel capacity={garageData.capacity || 0} occupiedSpots={garageData.occupiedSpots || 0} />
        {
            floorsData.map(({ description, capacity, occupiedSpots }, index) => <FloorOccupationPanel key={index} description={description} capacity={capacity} occupiedSpots={occupiedSpots} />)
        }
    </>
}

function EarningsSection({ earningData }) {
    return <DailyEarningsPanel numberOfSessions={earningData.numberOfSessions} totalAmount={earningData.totalAmount} />;
}