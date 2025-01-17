-- Create rides table
CREATE TABLE rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  pickup_location JSONB NOT NULL,
  dropoff_location JSONB NOT NULL,
  vehicle_type TEXT NOT NULL,
  distance_km NUMERIC(5,2) NOT NULL,
  duration_min NUMERIC(5,2) NOT NULL,
  price NUMERIC(8,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'requested',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create ride history table
CREATE TABLE ride_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES rides(id) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_rides_user_id ON rides(user_id);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_ride_history_ride_id ON ride_history(ride_id);

-- Seed initial data
INSERT INTO rides (
  user_id,
  pickup_location,
  dropoff_location,
  vehicle_type,
  distance_km,
  duration_min,
  price,
  status
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '{"lat": -26.2041, "lng": 28.0473}',
  '{"lat": -26.1076, "lng": 28.0567}',
  'car',
  15.2,
  25,
  228.00,
  'completed'
);

-- Enable RLS for security
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own rides" ON rides
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their ride history" ON ride_history
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM rides 
  WHERE rides.id = ride_history.ride_id 
  AND rides.user_id = auth.uid()
));