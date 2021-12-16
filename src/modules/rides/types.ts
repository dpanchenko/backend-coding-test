export interface IRideDto {
  start_lat: number;
  start_long: number;
  end_lat: number;
  end_long: number;
  rider_name: string;
  driver_name: string;
  driver_vehicle: string;
}

export interface IRideEntity {
  rideID: number;
  startLat: number;
  startLong: number;
  endLat: number;
  endLong: number;
  riderName: string;
  driverName: string;
  driverVehicle: string;
  created: string;
}
