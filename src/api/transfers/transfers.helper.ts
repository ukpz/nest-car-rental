export function generateRandomString(length: number) {
    return Array.from({ length }, () =>
        Math.random().toString(36)[2]
    ).join('');
}

const getFilteredSeats = (vehicles) => {
    const seats = vehicles.limousines.map(vehicle => ({
        value: vehicle.seats,
        text: `${vehicle.seats} Seats`,
    }));

    // Remove duplicates
    return seats.filter((option, index, self) =>
        index === self.findIndex(o => o.value === option.value && o.text === option.text)  
    );
};

const getFilteredClasses = (vehicles) => {
    const classes = vehicles.available_booking_classes.map(option => ({
        value: option.id,
        text: option.name,
    }));

    const filteredClasses = classes.filter(option => option.value !== 'first' && option.text !== 'First Class');

    // Remove duplicates
    return filteredClasses.filter((option, index, self) =>
        index === self.findIndex(o => o.value === option.value && o.text === option.text)
    );
};

const getFilteredModel = (vehicles) => {
    const mdoels = vehicles.limousines.map(option => ({
        value: option.car_model,
        text: option.car_model,
    }));

    // Remove duplicates
    return mdoels.filter((option, index, self) =>
        index === self.findIndex(o => o.value === option.value && o.text === option.text)
    );
};

export async function makeFilterReference(data) {

    const [seats, classes, models] = await Promise.all([
        getFilteredSeats(data),
        getFilteredClasses(data),
        getFilteredModel(data),
    ]);

    return {
        seats: {
            field_text: 'Seats',
            option_type: 'single',
            options: seats,
        },
        class: {
            field_text: 'Car Class',
            option_type: 'multiple',
            options: classes,
        },
        carModels: {
            field_text: 'Car Model',
            option_type: 'multiple',
            options: models,
        },
    }
};

export function applySorting(vehicles: any, sortCriterion: string) {
    console.log('Sorting applied');
    switch (sortCriterion) {
        case 'minPrice':
            return [...vehicles].sort((a, b) => a.discount_price - b.discount_price);

        case 'maxPrice':
            return [...vehicles].sort((a, b) => b.discount_price - a.discount_price);

        default:
            return vehicles; // No sorting
    }
}

export function applyFilters(vehicles: any, filters: any) {
    console.log('Filter applied');

    return vehicles.filter(vehicle => {
        for (const [filterKey, filterValues] of Object.entries(filters)) {

            switch (filterKey) {
                case 'class':
                    if (!(filterValues as string[]).includes(vehicle.extended_booking_category)) {
                        return false;
                    }
                    break;

                case 'seats':
                    if ((filterValues as number) != vehicle?.seats) {
                        return false;
                    }
                    break;

                case 'carModels':
                    if (!(filterValues as string[]).includes(vehicle.car_model)) {
                        return false;
                    }
                    break;

                default:
                    continue; // No filter
            }
        }
        return true;
    });
}