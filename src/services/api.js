import { getInitialData, generateRandomChanges } from './sample-data';

const data = getInitialData();

export function subscribeDataUpdates(callback) {
    setInterval(async() => {
        generateRandomChanges(data);
        callback(await getGarageOccupation());
    }, 1000);
}

// export function getFloors() {
//     return Promise.resolve(data.floors);
// }

export function getGarageOccupation() {
    const floorsOccupationData = data.floors.map(calculateFloorOccupation);

    return Promise.resolve({
        garage: floorsOccupationData.reduce(calculateTotalOccupationReducer, { capacity: 0, availableSpots: 0, occupiedSpots: 0 }),
        floors: floorsOccupationData
    });
}

// export function getFloorOccupation(floorIdentifier) {
//     const floorData = data.floors.find(floor => floor.id === floorIdentifier);

//     if (floorData == null)
//         return Promise.reject('Floor not found');

//     return Promise.resolve(calculateFloorOccupation(floorData));
// }

function calculateFloorOccupation(floorData) {
    const totalCapacity = floorData.spots.length;
    const numberOfAvailableSpots = floorData.spots.filter(spot => spot.isFree).length;

    return {
        description: floorData.description,
        capacity: totalCapacity,
        availableSpots: numberOfAvailableSpots,
        occupiedSpots: totalCapacity - numberOfAvailableSpots
    };
}

function calculateTotalOccupationReducer(totals, floorStatistics) {
    return {
        capacity: totals.capacity + floorStatistics.capacity,
        availableSpots: totals.availableSpots + floorStatistics.availableSpots,
        occupiedSpots: totals.occupiedSpots + floorStatistics.occupiedSpots
    };
}