import { useState, useEffect } from 'react'
// Removed unused supabase import
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { 
  ArrowUpIcon, 
  // Removed unused ArrowDownIcon
  // Removed unused ChartBarIcon
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  HomeIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'
import { Line, Pie, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// Mock data for the dashboard
const mockLeads = [
  {
    id: '1',
    username: 'future_homeowner',
    post_title: 'First time homebuyer with questions about mortgages',
    post_content: 'I\'m looking to buy my first home in the Seattle area and I have some questions about mortgage pre-approval. My credit score is around 720 and I have about 10% saved for a down payment...',
    subreddit: 'r/FirstTimeHomeBuyer',
    created_at: '2023-11-20T14:30:00Z',
    status: 'new',
    lead_score: 85,
    location: 'Seattle, WA',
    budget: '$450,000 - $550,000',
    contact_status: 'Not contacted'
  },
  {
    id: '2',
    username: 'moving_to_austin',
    post_title: 'Relocating to Austin, need realtor recommendations',
    post_content: 'My family and I are moving to Austin in the next 3 months for work. We\'re looking for a 4 bedroom house in a good school district. Budget is around $600k. Can anyone recommend a good realtor who knows the area well?',
    subreddit: 'r/Austin',
    created_at: '2023-11-19T09:15:00Z',
    status: 'contacted',
    lead_score: 95,
    location: 'Austin, TX',
    budget: '$550,000 - $650,000',
    contact_status: 'Contacted'
  },
  {
    id: '3',
    username: 'refinance_now',
    post_title: 'Is now a good time to refinance?',
    post_content: 'I bought my house 3 years ago with a 4.5% interest rate. With rates dropping, I\'m wondering if it makes sense to refinance now or wait a bit longer?',
    subreddit: 'r/personalfinance',
    created_at: '2023-11-18T16:45:00Z',
    status: 'qualified',
    lead_score: 70,
    location: 'Chicago, IL',
    budget: 'N/A (Refinance)',
    contact_status: 'Responded'
  },
  {
    id: '4',
    username: 'downsizing_empty_nester',
    post_title: 'Looking to downsize now that kids are in college',
    post_content: 'My husband and I are empty nesters now and our 4 bedroom house feels too big. We\'re thinking of selling and buying a smaller place, maybe a townhouse. Any advice on the current market for sellers?',
    subreddit: 'r/RealEstate',
    created_at: '2023-11-17T11:20:00Z',
    status: 'new',
    lead_score: 80,
    location: 'Denver, CO',
    budget: '$350,000 - $450,000',
    contact_status: 'Not contacted'
  },
  {
    id: '5',
    username: 'investment_property_seeker',
    post_title: 'Looking for my first investment property',
    post_content: 'I\'ve been saving up and I\'m ready to purchase my first investment property. Looking for a duplex or small multi-family in the Phoenix area. Any tips for a first-time investor?',
    subreddit: 'r/realestateinvesting',
    created_at: '2023-11-16T13:10:00Z',
    status: 'contacted',
    lead_score: 90,
    location: 'Phoenix, AZ',
    budget: '$300,000 - $400,000',
    contact_status: 'Contacted'
  }
]

const Dashboard = () => {
  // Using _ prefix to indicate these variables are intentionally unused for now
  const [_loading, setLoading] = useState(true)
  const [leads] = useState(mockLeads)
  // Removed unused user variable
  // const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Supabase here
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Chart data
  const leadsBySourceData = {
    labels: ['r/FirstTimeHomeBuyer', 'r/RealEstate', 'r/personalfinance', 'r/realestateinvesting', 'r/Mortgages'],
    datasets: [
      {
        label: 'Leads by Source',
        data: [25, 18, 15, 12, 8],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const leadsByStatusData = {
    labels: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
    datasets: [
      {
        label: 'Leads by Status',
        data: [32, 24, 18, 8, 12],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  }

  const leadsTrendData = {
    labels: ['Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Oct 29', 'Nov 5', 'Nov 12', 'Nov 19'],
    datasets: [
      {
        label: 'New Leads',
        data: [12, 19, 15, 17, 22, 24, 28, 30],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const conversionRateData = {
    labels: ['Oct', 'Nov'],
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: [8.2, 9.5],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Leads</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">94</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/leads" className="font-medium text-indigo-600 hover:text-indigo-500">
                  View all
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">New Leads (This Week)</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        30
                        <span className="ml-2 text-sm font-medium text-green-600">
                          <ArrowUpIcon className="inline h-4 w-4" /> 7.2%
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/leads?filter=new" className="font-medium text-indigo-600 hover:text-indigo-500">
                  View new leads
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Response Rate</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        42%
                        <span className="ml-2 text-sm font-medium text-green-600">
                          <ArrowUpIcon className="inline h-4 w-4" /> 3.1%
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/analytics" className="font-medium text-indigo-600 hover:text-indigo-500">
                  View analytics
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <HomeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        9.5%
                        <span className="ml-2 text-sm font-medium text-green-600">
                          <ArrowUpIcon className="inline h-4 w-4" /> 1.3%
                        </span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/analytics" className="font-medium text-indigo-600 hover:text-indigo-500">
                  View analytics
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Leads by Source</h3>
              <div className="mt-2 h-64">
                <Pie data={leadsBySourceData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Leads by Status</h3>
              <div className="mt-2 h-64">
                <Pie data={leadsByStatusData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Leads Trend</h3>
              <div className="mt-2 h-64">
                <Line data={leadsTrendData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Conversion Rate</h3>
              <div className="mt-2 h-64">
                <Bar data={conversionRateData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent leads */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Leads</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {leads.slice(0, 5).map((lead) => (
                <li key={lead.id}>
                  <Link to={`/leads/${lead.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-indigo-600 truncate">{lead.username}</p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              lead.status === 'new' ? 'bg-green-100 text-green-800' : 
                              lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="text-sm text-gray-500">
                            Score: <span className="font-medium text-gray-900">{lead.lead_score}</span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <HomeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {lead.location}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {lead.budget}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            {new Date(lead.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
