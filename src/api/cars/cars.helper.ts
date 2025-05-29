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
        vehicle_class: {
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