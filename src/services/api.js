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

function calculateEarnings(sessions, fees) {
    let totalAmount = 0;
    let numberOfSessions = 0;

    for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i];

        if (session.endDate == null)
            continue;

        numberOfSessions++;
        totalAmount += calculateSessionValue(session, fees);
    }

    return { numberOfSessions, totalAmount };
}

function calculateSessionValue(session, fees) {
    let amount = 0;
    const sessionDurationInHours = Math.abs(session.endDate - session.startDate) / 36e5; // 36e5 == 3600000 == 60 (minutes) * 60 (seconds) * 1000 (miliseconds)
    let remainingHoursToEvaluate = sessionDurationInHours;

    for (const fee of fees) {
        if (remainingHoursToEvaluate <= 0)
            break;

        if (fee.numberOfHours == null) {
            // It is assumed that can exist a fee with numberOfHours == null 
            // That fee will be used to calculate the amount when no more fees with numberOfHours exist (meaning, the remaining hours)
            amount += remainingHoursToEvaluate * fee.amount;
            break;
        }

        amount += fee.numberOfHours * fee.amount;
        remainingHoursToEvaluate -= fee.numberOfHours;
    }

    return amount;
}