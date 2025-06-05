export function generateRandomString(length: number) {
    return Array.from({ length }, () =>
        Math.random().toString(36)[2]
    ).join('');
}

export function makeFilterReference(vehicles) {
    // const vehicleClassList=vehicles.map(veh=>({value: veh.VehicleClass, text: veh.VehicleClass}))
    // const uniqueVehClassList = vehicleClassList.filter(
    //     (obj, index, self) => index === self.findIndex(o => o.value === obj.value)
    // );
    const uniqueVehClassList = Array.from(
        new Map(
            vehicles.map(veh => [veh.VehicleClass, { value: veh.VehicleClass, text: veh.VehicleClass }])
        ).values()
    );
    return {
        vehicleClass: {
            field_text: 'Vehicle Class',
            option_type: 'multiple',
            options: uniqueVehClassList,
        },
        transmission: {
            field_text: 'Transmission',
            option_type: 'multiple',
            options: [
                { value: 'Automatic', text: 'Automatic' },
                { value: 'Manual', text: 'Manual' }
            ],
        },
        mileage: {
            field_text: 'Mileage',
            option_type: 'multiple',
            options: [
                { value: 'Limited', text: 'Limited' },
                { value: 'Unlimited', text: 'Unlimited' }
            ],
        }
    }
};

export function applySorting(vehicles: any, sortCriterion: string) {
    console.log('Sorting applied');
    switch (sortCriterion) {
        case 'minPrice':
            return [...vehicles].sort((a, b) => a.sellPrice - b.sellPrice);

        case 'maxPrice':
            return [...vehicles].sort((a, b) => b.sellPrice - a.sellPrice);

        default:
            return vehicles; // No sorting
    }
}

export function applyFilters(vehicles: any, filters: any) {
    console.log('Filter applied');

    return vehicles.filter(vehicle => {
        // Check each filter criterion
        for (const [filterKey, filterValues] of Object.entries(filters)) {
            if (!Array.isArray(filterValues) || filterValues.length === 0) continue;

            switch (filterKey) {
                case 'transmission':
                    if (!filterValues.includes(vehicle.TransmissionType)) {
                        return false;
                    }
                    break;

                case 'mileage':
                    const isUnlimited = (vehicle.vehicleVehicleRate?.UnlimitedMileage === 'true');
                    if (filterValues.includes('Unlimited') && !isUnlimited) {
                        return false;
                    }
                    if (filterValues.includes('Limited') && isUnlimited) {
                        return false;
                    }
                    break;

                case 'vehicleClass':
                    if (!filterValues.includes(vehicle.VehicleClass)) {
                        return false;
                    }
                    break;

                default:
                    return vehicles; // No filter
            }
        }

        return true;
    });
}