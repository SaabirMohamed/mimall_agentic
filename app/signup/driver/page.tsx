import React from 'react'

const DriverSignUp = () => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl mb-4">Sign Up as a Driver</h1>
      <form className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Full Name</label>
          <input type="text" id="name" className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input type="email" id="email" className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">Phone Number</label>
          <input type="tel" id="phone" className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="license" className="block mb-2">Driver's License Number</label>
          <input type="text" id="license" className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input type="password" id="password" className="w-full p-2 border rounded" required />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  )
}

export default DriverSignUp

