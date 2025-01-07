import React from 'react'

const locations = [
  {
    name: "Sandton City",
    address: "83 Rivonia Rd, Sandhurst, Sandton, 2196",
    hours: "Mon-Sat: 9am-8pm, Sun: 10am-6pm",
    phone: "+27 11 217 6000"
  },
  {
    name: "Hyde Park Corner",
    address: "Cnr Jan Smuts Ave & William Nicol Dr, Hyde Park, Johannesburg, 2196",
    hours: "Mon-Sat: 9am-6pm, Sun: 10am-3pm",
    phone: "+27 11 325 4340"
  },
  {
    name: "Rosebank Mall",
    address: "50 Bath Ave, Rosebank, Johannesburg, 2196",
    hours: "Mon-Sat: 9am-6pm, Sun: 10am-3pm",
    phone: "+27 11 788 5530"
  },
  {
    name: "The Zone @ Rosebank",
    address: "177 Oxford Rd, Rosebank, Johannesburg, 2196",
    hours: "Mon-Sun: 9am-8pm",
    phone: "+27 11 325 4340"
  },
  {
    name: "Melrose Arch",
    address: "Melrose Blvd, Melrose North, Johannesburg, 2196",
    hours: "Mon-Sat: 9am-8pm, Sun: 10am-6pm",
    phone: "+27 11 684 0000"
  },
  {
    name: "Mall of Africa",
    address: "Magwa Crescent, Waterfall City, Midrand, 1686",
    hours: "Mon-Sun: 9am-9pm",
    phone: "+27 10 596 1470"
  },
  {
    name: "Greenstone Shopping Centre",
    address: "Cnr Modderfontein Rd & Van Riebeeck Ave, Edenvale, 1609",
    hours: "Mon-Sat: 9am-7pm, Sun: 9am-5pm",
    phone: "+27 11 524 0445"
  },
  {
    name: "Eastgate Shopping Centre",
    address: "43 Bradford Rd, Bedfordview, Johannesburg, 2008",
    hours: "Mon-Sat: 9am-7pm, Sun: 9am-5pm",
    phone: "+27 11 479 6000"
  }
]

const LocationsPage = () => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl mb-6">Our Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {locations.map((location) => (
          <div key={location.name} className="bg-black bg-opacity-70 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{location.name}</h2>
            <p className="mb-2"><strong>Address:</strong> {location.address}</p>
            <p className="mb-2"><strong>Hours:</strong> {location.hours}</p>
            <p><strong>Phone:</strong> {location.phone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LocationsPage

