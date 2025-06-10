import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/20/solid'
import { HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

// Mock data for the leads list
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
  },
  {
    id: '6',
    username: 'mortgage_rate_shopper',
    post_title: 'Best mortgage rates for excellent credit?',
    post_content: 'I have a credit score of 820 and I\'m looking to buy a home in the $700k range with 20% down. What kind of rates should I expect in the current market? Any recommendations for lenders that offer the best rates?',
    subreddit: 'r/Mortgages',
    created_at: '2023-11-15T10:05:00Z',
    status: 'new',
    lead_score: 75,
    location: 'Boston, MA',
    budget: '$650,000 - $750,000',
    contact_status: 'Not contacted'
  },
  {
    id: '7',
    username: 'fixer_upper_hunter',
    post_title: 'Looking for a fixer-upper in Portland',
    post_content: 'My partner and I are handy and looking for a fixer-upper in the Portland area. Our budget is around $350k for the purchase and we can put another $100k into renovations. Any neighborhoods we should focus on?',
    subreddit: 'r/Portland',
    created_at: '2023-11-14T15:30:00Z',
    status: 'contacted',
    lead_score: 85,
    location: 'Portland, OR',
    budget: '$300,000 - $400,000',
    contact_status: 'Contacted'
  },
  {
    id: '8',
    username: 'condo_vs_house',
    post_title: 'Condo vs Single Family Home for first purchase?',
    post_content: 'I\'m torn between buying a condo in the city or a small house in the suburbs. I work downtown and like the idea of a short commute, but I\'m worried about HOA fees and restrictions with a condo. Any advice?',
    subreddit: 'r/FirstTimeHomeBuyer',
    created_at: '2023-11-13T09:45:00Z',
    status: 'qualified',
    lead_score: 80,
    location: 'Minneapolis, MN',
    budget: '$250,000 - $350,000',
    contact_status: 'Responded'
  },
  {
    id: '9',
    username: 'vacation_home_dreamer',
    post_title: 'Looking for a vacation home in Florida',
    post_content: 'We\'re from Michigan and want to buy a vacation home in Florida that we can use in the winter and possibly rent out the rest of the year. Budget is around $400k. Any recommendations on areas that are good for both vacationing and rental income?',
    subreddit: 'r/RealEstate',
    created_at: '2023-11-12T14:20:00Z',
    status: 'new',
    lead_score: 90,
    location: 'Florida (Various)',
    budget: '$350,000 - $450,000',
    contact_status: 'Not contacted'
  },
  {
    id: '10',
    username: 'first_time_seller',
    post_title: 'Tips for selling my first home?',
    post_content: 'I\'ve owned my home for 5 years and I\'m looking to sell in the next few months. It\'s my first time selling and I\'m not sure what to expect. Should I use a realtor or try to sell it myself? Any tips for preparing the house for sale?',
    subreddit: 'r/RealEstate',
    created_at: '2023-11-11T11:10:00Z',
    status: 'contacted',
    lead_score: 75,
    location: 'Nashville, TN',
    budget: 'N/A (Seller)',
    contact_status: 'Contacted'
  }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const LeadsList = () => {
  const [leads] = useState(mockLeads)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState('lead_score')
  const [sortDirection, setSortDirection] = useState('desc')

  // Filter leads based on search term and status filter
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.post_content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Sort leads based on sort field and direction
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let aValue = a[sortField as keyof typeof a]
    let bValue = b[sortField as keyof typeof b]
    
    // Handle string comparisons
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    }
    
    // Handle number comparisons
    if (sortDirection === 'asc') {
      return (aValue as number) - (bValue as number)
    } else {
      return (bValue as number) - (aValue as number)
    }
  })

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700">
                A list of all potential leads from Reddit, including their username, post details, location, and status.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Export Leads
              </button>
            </div>
          </div>
          
          {/* Search and filter */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 min-w-0">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <div className="flex items-center">
                <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                <select
                  id="status-filter"
                  name="status-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Leads table */}
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          <button
                            type="button"
                            className="group inline-flex items-center"
                            onClick={() => handleSort('username')}
                          >
                            User
                            <span className={classNames(
                              sortField === 'username' ? 'bg-gray-200 text-gray-900' : 'invisible text-gray-400 group-hover:visible group-focus:visible',
                              'ml-2 flex-none rounded'
                            )}>
                              {sortField === 'username' && sortDirection === 'desc' ? (
                                <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex items-center"
                            onClick={() => handleSort('post_title')}
                          >
                            Post
                            <span className={classNames(
                              sortField === 'post_title' ? 'bg-gray-200 text-gray-900' : 'invisible text-gray-400 group-hover:visible group-focus:visible',
                              'ml-2 flex-none rounded'
                            )}>
                              {sortField === 'post_title' && sortDirection === 'desc' ? (
                                <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex items-center"
                            onClick={() => handleSort('location')}
                          >
                            Location
                            <span className={classNames(
                              sortField === 'location' ? 'bg-gray-200 text-gray-900' : 'invisible text-gray-400 group-hover:visible group-focus:visible',
                              'ml-2 flex-none rounded'
                            )}>
                              {sortField === 'location' && sortDirection === 'desc' ? (
                                <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex items-center"
                            onClick={() => handleSort('status')}
                          >
                            Status
                            <span className={classNames(
                              sortField === 'status' ? 'bg-gray-200 text-gray-900' : 'invisible text-gray-400 group-hover:visible group-focus:visible',
                              'ml-2 flex-none rounded'
                            )}>
                              {sortField === 'status' && sortDirection === 'desc' ? (
                                <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex items-center"
                            onClick={() => handleSort('lead_score')}
                          >
                            Score
                            <span className={classNames(
                              sortField === 'lead_score' ? 'bg-gray-200 text-gray-900' : 'invisible text-gray-400 group-hover:visible group-focus:visible',
                              'ml-2 flex-none rounded'
                            )}>
                              {sortField === 'lead_score' && sortDirection === 'desc' ? (
                                <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex items-center"
                            onClick={() => handleSort('created_at')}
                          >
                            Date
                            <span className={classNames(
                              sortField === 'created_at' ? 'bg-gray-200 text-gray-900' : 'invisible text-gray-400 group-hover:visible group-focus:visible',
                              'ml-2 flex-none rounded'
                            )}>
                              {sortField === 'created_at' && sortDirection === 'desc' ? (
                                <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </button>
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {sortedLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <Link to={`/leads/${lead.id}`} className="text-indigo-600 hover:text-indigo-900">
                              {lead.username}
                            </Link>
                            <p className="text-xs text-gray-500">{lead.subreddit}</p>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="max-w-xs truncate font-medium text-gray-900">{lead.post_title}</div>
                            <div className="max-w-xs truncate">{lead.post_content}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <HomeIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                              {lead.location}
                            </div>
                            <div className="flex items-center mt-1">
                              <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                              {lead.budget}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={classNames(
                              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                              lead.status === 'new' ? 'bg-green-100 text-green-800' : 
                              lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 
                              lead.status === 'qualified' ? 'bg-blue-100 text-blue-800' :
                              lead.status === 'converted' ? 'bg-purple-100 text-purple-800' :
                              'bg-red-100 text-red-800'
                            )}>
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">{lead.contact_status}</p>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className={classNames(
                              'font-medium',
                              lead.lead_score >= 90 ? 'text-green-700' :
                              lead.lead_score >= 70 ? 'text-green-600' :
                              lead.lead_score >= 50 ? 'text-yellow-600' :
                              'text-red-600'
                            )}>
                              {lead.lead_score}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex space-x-2 justify-end">
                              <button
                                type="button"
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Send message"
                              >
                                <EnvelopeIcon className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Call"
                              >
                                <PhoneIcon className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Comment on post"
                              >
                                <ChatBubbleLeftIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadsList
