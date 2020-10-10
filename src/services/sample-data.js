const ParkingSpotType = {
    Compact: 'Compact',
    Large: 'Large',
    Handicapped: 'Handicapped',
    Motorcycle: 'Motorcycle',
};

export function getInitialData() {
    const data = {
        floors: [
            getFloor('1st Floor', 100),
            getFloor('2nd Floor', 80),
            getFloor('3rd Floor', 80),
            getFloor('4th Floor', 50)
        ],
        sessions: []
    };

    for (let i = 0; i < 200; i++)
        generateRandomChanges(data);

    return data;
};

export function generateRandomChanges(data) {
    const floor = Math.floor(Math.random() * data.floors.length);
    const spot = Math.floor(Math.random() * data.floors[floor].spots.length);

    const isSpotFree = data.floors[floor].spots[spot].isFree;

    if (isSpotFree) { // Generate a new session and occupy the spot
        data.floors[floor].spots[spot].isFree = false;

        data.sessions.push({
            id: generateId().toString(),
            licensePlace: 'AA-ABCDE-123',
            startDate: new Date(),
            endDate: null
        });
    } else { // Find a open session and close it
        data.floors[floor].spots[spot].isFree = true;

        const openSession = data.sessions.find(session => session.endDate == null);
        if (openSession)
            openSession.endDate = new Date();
    }
}

function getFloor(description, numberOfSpots) {
    const floor = { id: generateId(), description, spots: [] };

    for (let i = 0; i < numberOfSpots; i++)
        floor.spots.push({ id: generateId(), type: ParkingSpotType.Compact, isFree: true });

    return floor;
}

function generateId() { return new Date().getTime(); }