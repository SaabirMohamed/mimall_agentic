import React from 'react'

const chinaLocations = [
  {
    name: "China Mall Amalgam",
    address: "19 Osmium Rd, Amalgam, Johannesburg South, 2091",
    description: "One of the largest China Malls in Johannesburg, offering a wide variety of products."
  },
  {
    name: "Dragon City",
    address: "4 Commissioner St, Ferreiras Dorp, Johannesburg, 2001",
    description: "A popular wholesale mall in the Johannesburg CBD, known for its diverse range of goods."
  },
  {
    name: "China Mart Crown Mines",
    address: "Main Reef Rd, Crown Mines, Johannesburg South, 2092",
    description: "A large complex offering wholesale and retail Chinese products."
  },
  {
    name: "Oriental City",
    address: "99 Eloff St, Johannesburg Central, Johannesburg, 2001",
    description: "Located in the heart of Johannesburg, offering a variety of Chinese and Asian products."
  },
  {
    name: "China Mall Bruma",
    address: "27 Ernest Oppenheimer Ave, Bruma, Johannesburg, 2198",
    description: "A popular destination for wholesale and retail shopping in the eastern suburbs."
  },
  {
    name: "Hong Kong City",
    address: "Cnr Hanover St & Jeppe St, Johannesburg Central, 2001",
    description: "A multi-story mall in the CBD offering a wide range of imported goods."
  }
]

const MiChinaLocationsPage = () => {
  return (
    <div className="container mx-auto my-8 pt-16">
      <h1 className="text-4xl font-bold mb-8 text-center">MiChina Mall Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {chinaLocations.map((location) => (
          <div key={location.name} className="bg-black bg-opacity-70 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{location.name}</h2>
            <p className="mb-2"><strong>Address:</strong> {location.address}</p>
            <p>{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MiChinaLocationsPage

