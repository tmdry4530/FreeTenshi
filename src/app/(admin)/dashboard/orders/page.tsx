'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye } from 'lucide-react'

const mockOrders = [
  {
    id: 'ord_1',
    orderNumber: 'FT-ABC123-XYZ',
    customer: { email: 'user@example.com', name: 'John Doe' },
    total: 189000,
    currency: 'KRW',
    status: 'DELIVERED',
    paymentStatus: 'COMPLETED',
    paymentMethod: 'STRIPE_KRW',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'ord_2',
    orderNumber: 'FT-DEF456-ABC',
    customer: { email: 'test@test.com', name: 'Jane Smith' },
    total: 69000,
    currency: 'KRW',
    status: 'PROCESSING',
    paymentStatus: 'COMPLETED',
    paymentMethod: 'STRIPE_KRW',
    createdAt: '2024-01-15T09:15:00Z',
  },
  {
    id: 'ord_3',
    orderNumber: 'FT-GHI789-DEF',
    customer: { email: 'demo@demo.com', name: 'Demo User' },
    total: 150,
    currency: 'USD',
    status: 'CONFIRMED',
    paymentStatus: 'COMPLETED',
    paymentMethod: 'STRIPE_USD',
    createdAt: '2024-01-14T14:00:00Z',
  },
]

const statusColors: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-yellow-100 text-yellow-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

const paymentStatusColors: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-800',
  PROCESSING: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-green-100 text-green-800',
  FAILED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-orange-100 text-orange-800',
}

export default function OrdersPage() {
  const [orders] = useState(mockOrders)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'KRW') {
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        maximumFractionDigits: 0,
      }).format(price)
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-normal">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-200 text-sm"
        >
          <option value="all">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Order</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Customer</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Total</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Payment</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Status</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Date</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-mono text-sm">{order.orderNumber}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm">{order.customer.name}</p>
                      <p className="text-xs text-gray-400">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    {formatPrice(order.total, order.currency)}
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className={`text-xs px-2 py-1 inline-block ${paymentStatusColors[order.paymentStatus]}`}>
                        {order.paymentStatus}
                      </span>
                      <p className="text-xs text-gray-400">{order.paymentMethod.replace('_', ' ')}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="View details"
                      >
                        <Eye size={16} className="text-gray-400" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  )
}
