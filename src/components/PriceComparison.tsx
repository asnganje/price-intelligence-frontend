const retailers = [
  {
    name: 'Laptops World',
    price: 80000,
    availability: 'In Stock',
  },
  {
    name: 'Digitonia Systems Ltd',
    price: 75000,
    availability: 'In Stock',
  },
  {
    name: 'Fahavi Computers',
    price: 75000,
    availability: 'In Stock',
  },
]

function PriceComparison() {
  return (
    <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm">

      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">
          Price Comparison
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          HP ZBook Firefly 14 G10
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="px-6 py-4">Retailer</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Availability</th>
            </tr>
          </thead>

          <tbody>
            {retailers.map((retailer) => (
              <tr
                key={retailer.name}
                className="border-t border-slate-100"
              >
                <td className="px-6 py-4 font-medium text-slate-700">
                  {retailer.name}
                </td>

                <td className="px-6 py-4 font-semibold text-slate-800">
                  KSh {retailer.price.toLocaleString('en-KE')}
                </td>

                <td className="px-6 py-4">
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {retailer.availability}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default PriceComparison