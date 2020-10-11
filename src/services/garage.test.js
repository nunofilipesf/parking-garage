import { calculateEarnings, calculateFloorOccupation } from './garage.helpers';

it('calculates the occupation of a given floor', () => {

    const floorConfiguration = {
        description: 'Floor 1',
        spots: [
            { id: '', type: '', isFree: true },
            { id: '', type: '', isFree: false },
            { id: '', type: '', isFree: true },
            { id: '', type: '', isFree: false },
            { id: '', type: '', isFree: true }
        ]
    }

    const expectedResult = {
        description: 'Floor 1',
        capacity: 5,
        availableSpots: 3,
        occupiedSpots: 2
    };

    expect(calculateFloorOccupation(floorConfiguration)).toEqual(expectedResult);
});

it('calculates the total earnings for all the given sessions', () => {
    const fees = [
        { priority: 1, amount: 50, numberOfHours: 1 },
        { priority: 2, amount: 30, numberOfHours: 2 },
        { priority: 3, amount: 10, numberOfHours: null }
    ];

    const noClosedSessions = [{ id: '', licensePlace: 'AA-ABCDE-123', startDate: new Date(), endDate: null }];
    expect(calculateEarnings(noClosedSessions, fees)).toEqual({ numberOfSessions: 0, totalAmount: 0 });

    const oneHourSingleSession = [{ id: '', licensePlace: 'AA-ABCDE-123', startDate: new Date('2020-10-10T10:00:00'), endDate: new Date('2020-10-10T11:00:00') }];
    expect(calculateEarnings(oneHourSingleSession, fees)).toEqual({ numberOfSessions: 1, totalAmount: 50 });

    const twoHoursSingleSession = [{ id: '', licensePlace: 'AA-ABCDE-123', startDate: new Date('2020-10-10T10:00:00'), endDate: new Date('2020-10-10T12:00:00') }];
    expect(calculateEarnings(twoHoursSingleSession, fees)).toEqual({ numberOfSessions: 1, totalAmount: 80 }); // 50 +30

    const fiveHoursSingleSession = [{ id: '', licensePlace: 'AA-ABCDE-123', startDate: new Date('2020-10-10T10:00:00'), endDate: new Date('2020-10-10T15:00:00') }];
    expect(calculateEarnings(fiveHoursSingleSession, fees)).toEqual({ numberOfSessions: 1, totalAmount: 130 }); // 50 + 30*2 + 10*2

    const multipleSessions = [
        { id: '', licensePlace: 'AA-ABCDE-123', startDate: new Date('2020-10-10T10:00:00'), endDate: new Date('2020-10-10T11:00:00') },
        { id: '', licensePlace: 'AA-ABCDE-123', startDate: new Date('2020-10-10T10:00:00'), endDate: new Date('2020-10-10T11:00:00') },
        { id: '', licensePlace: 'AA-ABCDE-123', startDate: new Date('2020-10-10T10:00:00'), endDate: new Date('2020-10-10T11:00:00') }
    ];
    expect(calculateEarnings(multipleSessions, fees)).toEqual({ numberOfSessions: 3, totalAmount: 150 });
})