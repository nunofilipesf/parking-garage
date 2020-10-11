import { calculateFloorOccupation, calculateEarnings } from './garage.helpers';
import { getInitialData, generateRandomChanges } from './sample-data';

const data = getInitialData();

export function subscribeDataUpdates(callback) {
    setInterval(async() => {
        generateRandomChanges(data);
        callback(await getGarageOccupation());
    }, 1000);
}

export function getGarageOccupation() {
    const floorsOccupationData = data.floors.map(calculateFloorOccupation);

    return Promise.resolve({
        garage: floorsOccupationData.reduce(calculateTotalOccupationReducer, { capacity: 0, availableSpots: 0, occupiedSpots: 0 }),
        floors: floorsOccupationData,
        earnings: calculateEarnings(data.sessions, data.feeModel)
    });
}

function calculateTotalOccupationReducer(totals, floorStatistics) {
    return {
        capacity: totals.capacity + floorStatistics.capacity,
        availableSpots: totals.availableSpots + floorStatistics.availableSpots,
        occupiedSpots: totals.occupiedSpots + floorStatistics.occupiedSpots
    };
}