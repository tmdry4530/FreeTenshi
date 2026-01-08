import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react'

const stats = [
  { name: 'Total Products', value: '24', icon: Package, change: '+2 this week' },
  { name: 'Total Orders', value: '156', icon: ShoppingCart, change: '+12 this week' },
  { name: 'Total Users', value: '1,234', icon: Users, change: '+89 this week' },
  { name: 'Revenue', value: '₩4.2M', icon: DollarSign, change: '+15% this week' },
]

const recentOrders = [
  { id: 'FT-ABC123', customer: 'user@example.com', total: '₩189,000', status: 'Completed' },
  { id: 'FT-DEF456', customer: 'test@test.com', total: '₩69,000', status: 'Processing' },
  { id: 'FT-GHI789', customer: 'demo@demo.com', total: '₩258,000', status: 'Shipped' },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-normal mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <stat.icon size={20} className="text-gray-400" />
              <span className="text-sm text-gray-500">{stat.name}</span>
            </div>
            <p className="text-3xl font-normal mb-1">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm uppercase tracking-wider">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Order ID</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Customer</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Total</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm">{order.id}</td>
                  <td className="p-4 text-sm">{order.customer}</td>
                  <td className="p-4 text-sm">{order.total}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
