export const validRidePayloadWithSqlInjection = {
  start_lat: 0,
  start_long: 0,
  end_lat: 0,
  end_long: 0,
  rider_name: "Rider's!; SELECT * FROM Riders;", // eslint-disable-line
  driver_name: 'Driver); SELECT * FROM Riders;(',
  driver_vehicle: 'Vehicle',
};

export const validRidePayload = {
  start_lat: 0,
  start_long: 0,
  end_lat: 0,
  end_long: 0,
  rider_name: 'Rider',
  driver_name: 'Driver',
  driver_vehicle: 'Vehicle',
};

export const invalidRidePayload1 = {
  start_lat: -100,
  start_long: 0,
  end_lat: 0,
  end_long: 0,
  rider_name: 'Rider',
  driver_name: 'Driver',
  driver_vehicle: 'Vehicle',
};

export const invalidRidePayload2 = {
  start_lat: 0,
  start_long: 0,
  end_lat: -100,
  end_long: 0,
  rider_name: 'Rider',
  driver_name: 'Driver',
  driver_vehicle: 'Vehicle',
};

export const invalidRidePayload3 = {
  start_lat: 0,
  start_long: 0,
  end_lat: 0,
  end_long: 0,
  rider_name: '',
  driver_name: 'Driver',
  driver_vehicle: 'Vehicle',
};

export const invalidRidePayload4 = {
  start_lat: 0,
  start_long: 0,
  end_lat: 0,
  end_long: 0,
  rider_name: 'Rider',
  driver_name: '',
  driver_vehicle: 'Vehicle',
};

export const invalidRidePayload5 = {
  start_lat: 0,
  start_long: 0,
  end_lat: 0,
  end_long: 0,
  rider_name: 'Rider',
  driver_name: 'Driver',
  driver_vehicle: '',
};
