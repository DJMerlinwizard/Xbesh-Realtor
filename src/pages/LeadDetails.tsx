import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  PencilIcon,
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'

// Mock data for leads
const mockLeads = [
  {
    id: '1',
    username: 'future_homeowner',
    post_title: 'First time homebuyer with questions about mortgages',
    post_content: 'I\'m looking to buy my first home in the Seattle area and I have some questions about mortgage pre-approval. My credit score is around 720 and I have about 10% saved for a down payment. I\'m wondering what kind of interest rates I might qualify for and if there are any first-time homebuyer programs I should look into. Also, how much should I expect to pay in closing costs? Any advice would be greatly appreciated!',
    subreddit: 'r/FirstTimeHomeBuyer',
    created_at: '2023-11-20T14:30:00Z',
    status: 'new',
    lead_score: 85,
    location: 'Seattle, WA',
    budget: '$450,000 - $550,000',
    contact_status: 'Not contacted',
    interests: ['First-time buyer', 'Mortgage pre-approval', 'Down payment assistance'],
    timeline: 'Next 3-6 months',
    property_type: 'Single-family home',
    notes: ''
  },
  {
    id: '2',
    username: 'moving_to_austin',
    post_title: 'Relocating to Austin, need realtor recommendations',
    post_content: 'My family and I are moving to Austin in the next 3 months for work. We\'re looking for a 4 bedroom house in a good school district. Budget is around $600k. Can anyone recommend a good realtor who knows the area well? We\'re particularly interested in the northwest suburbs like Cedar Park or Round Rock. Schools are our top priority, followed by commute time to downtown (where I\'ll be working). We have two kids ages 8 and 10, so being close to parks and family-friendly amenities would be great too.',
    subreddit: 'r/Austin',
    created_at: '2023-11-19T09:15:00Z',
    status: 'contacted',
    lead_score: 95,
    location: 'Austin, TX',
    budget: '$550,000 - $650,000',
    contact_status: 'Contacted',
    interests: ['Relocation', 'Family home', 'School districts'],
    timeline: 'Next 3 months',
    property_type: 'Single-family home',
    notes: 'Sent initial message on Reddit. Waiting for response.'
  },
  {
    id: '3',
    username: 'refinance_now',
    post_title: 'Is now a good time to refinance?',
    post_content: 'I bought my house 3 years ago with a 4.5% interest rate. With rates dropping, I\'m wondering if it makes sense to refinance now or wait a bit longer? My home has appreciated about 15% since purchase. I plan to stay in the home for at least another 5 years. Would love to hear from anyone who has refinanced recently about their experience and what kind of rates they were able to get.',
    subreddit: 'r/personalfinance',
    created_at: '2023-11-18T16:45:00Z',
    status: 'qualified',
    lead_score: 70,
    location: 'Chicago, IL',
    budget: 'N/A (Refinance)',
    contact_status: 'Responded',
    interests: ['Refinancing', 'Lower interest rates'],
    timeline: 'Immediate',
    property_type: 'Existing homeowner',
    notes: 'Had initial consultation. Needs to be connected with a mortgage broker for refinancing options.'
  }
]

// Mock conversation data
const mockConversation = [
  {
    id: '1',
    sender: 'you',
    message: 'Hi there! I saw your post about relocating to Austin. I\'m a realtor specializing in the northwest suburbs and would love to help you find the perfect home for your family. The Cedar Park and Round Rock areas have excellent schools and are very family-friendly. Would you be interested in scheduling a call to discuss your needs in more detail?',
    timestamp: '2023-11-19T10:30:00Z'
  },
  {
    id: '2',
    sender: 'moving_to_austin',
    message: 'Thanks for reaching out! Yes, we\'re definitely interested in those areas. We\'re planning to visit Austin next month to look at neighborhoods. Would you be available to show us some properties then?',
    timestamp: '2023-11-19T14:45:00Z'
  },
  {
    id: '3',
    sender: 'you',
    message: 'Absolutely! I\'d be happy to show you around when you visit. It would be helpful to know more about your specific needs so I can start putting together a list of properties that might work for you. What dates will you be in town? Also, do you have any specific requirements for the home besides the 4 bedrooms and good school district?',
    timestamp: '2023-11-19T15:30:00Z'
  }
]

export default function LeadDetails() {
  const { id } = useParams<{ id: string }>()
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [conversation, setConversation] = useState(mockConversation)
  const [newMessage, setNewMessage] = useState('')
  const [notes, setNotes] = useState('')
  const [editingNotes, setEditingNotes] = useState(false)

  useEffect(() => {
    // Simulate API call to get lead details
    setLoading(true)
    const foundLead = mockLeads.find(lead => lead.id === id)
    
    setTimeout(() => {
      setLead(foundLead || null)
      setNotes(foundLead?.notes || '')
      setLoading(false)
    }, 500)
  }, [id])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg = {
      id: (conversation.length + 1).toString(),
      sender: 'you',
      message: newMessage,
      timestamp: new Date().toISOString()
    }

    setConversation([...conversation, newMsg])
    setNewMessage('')
  }

  const handleSaveNotes = () => {
    // In a real app, you would save the notes to the database
    setEditingNotes(false)
    // Update the lead object with new notes
    if (lead) {
      setLead({...lead, notes})
    }
  }

  const handleStatusChange = (newStatus: string) => {
    // In a real app, you would update the status in the database
    if (lead) {
      setLead({...lead, status: newStatus})
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Lead not found</h2>
        <p className="mt-2 text-gray-600">The lead you're looking for doesn't exist or has been removed.</p>
        <Link to="/leads" className="mt-4 inline-block text-primary-600 hover:text-primary-800">
          ← Back to leads
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/leads" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              ← Back to leads
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 flex items-center">
              {lead.username}
              <span
                className={`ml-4 inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  lead.status === 'new'
                    ? 'bg-blue-100 text-blue-800'
                    : lead.status === 'contacted'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
            </h1>
          </div>
          <div className="flex space-x-3">
            <div className="relative inline-block text-left">
              <select
                id="status"
                name="status"
                className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
              </select>
            </div>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <EnvelopeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              Email
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <PhoneIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-white" aria-hidden="true" />
              Call
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Lead details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Reddit Post</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Original post from {format(new Date(lead.created_at), 'MMM d, yyyy')} in {lead.subreddit}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h4 className="text-lg font-medium text-gray-900">{lead.post_title}</h4>
              <div className="mt-3 text-sm text-gray-600 whitespace-pre-line">
                {lead.post_content}
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                >
                  View on Reddit
                  <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Notes</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Add private notes about this lead
                </p>
              </div>
              {!editingNotes ? (
                <button
                  type="button"
                  onClick={() => setEditingNotes(true)}
                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingNotes(false)}
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <XCircleIcon className="h-4 w-4 mr-1" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="inline-flex items-center rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                  >
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    Save
                  </button>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              {editingNotes ? (
                <textarea
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Add your notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              ) : (
                <div className="text-sm text-gray-600 whitespace-pre-line min-h-[100px]">
                  {notes || "No notes yet. Click 'Edit' to add notes."}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Conversation</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Messages exchanged with this lead
              </p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6 max-h-96 overflow-y-auto">
                {conversation.length > 0 ? (
                  <ul role="list" className="space-y-6">
                    {conversation.map((message) => (
                      <li key={message.id} className="relative flex gap-x-4">
                        <div className={`absolute left-0 top-0 flex w-6 justify-center -bottom-6`}>
                          <div className="w-px bg-gray-200"></div>
                        </div>
                        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                          {message.sender === 'you' ? (
                            <div className="h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center text-xs text-white">
                              Y
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                              <UserIcon className="h-4 w-4 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-auto">
                          <div className="flex justify-between gap-x-4">
                            <div className="py-0.5 text-sm font-medium leading-5 text-gray-900">
                              {message.sender === 'you' ? 'You' : lead.username}
                            </div>
                            <time
                              dateTime={message.timestamp}
                              className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                            >
                              {format(new Date(message.timestamp), 'MMM d, h:mm a')}
                            </time>
                          </div>
                          <p className="text-sm leading-6 text-gray-500">{message.message}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6">
                    <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No messages</h3>
                    <p className="mt-1 text-sm text-gray-500">Start the conversation with this lead.</p>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <div className="flex space-x-3">
                  <div className="flex-grow">
                    <textarea
                      rows={2}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Lead Information</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Lead Score</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        lead.lead_score >= 80 ? 'bg-green-500' : lead.lead_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    ></div>
                    {lead.lead_score}/100
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        lead.status === 'new'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.location}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Budget</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.budget}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Timeline</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.timeline}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Property Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.property_type}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Interests</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="flex flex-wrap gap-2">
                      {lead.interests.map((interest: string) => (
                        <span
                          key={interest}
                          className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Actions</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  <EnvelopeIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Send Email
                </button>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PhoneIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Call Lead
                </button>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <CalendarIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Suggested Templates</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-4">
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex">
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-gray-800">Initial Outreach</h3>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Hi {lead.username}, I saw your post about {lead.post_title.toLowerCase()}. I'm a realtor specializing in {lead.location} and would love to help you with your real estate needs...</p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="text-sm font-medium text-primary-600 hover:text-primary-500"
                          onClick={() => setNewMessage(`Hi ${lead.username}, I saw your post about ${lead.post_title.toLowerCase()}. I'm a realtor specializing in ${lead.location} and would love to help you with your real estate needs. Would you be interested in scheduling a quick call to discuss your situation in more detail?`)}
                        >
                          Use template
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex">
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-gray-800">Follow-up Message</h3>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Hi {lead.username}, I wanted to follow up on my previous message. I understand you're looking for {lead.interests[0].toLowerCase()}. I have some great options that might interest you...</p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="text-sm font-medium text-primary-600 hover:text-primary-500"
                          onClick={() => setNewMessage(`Hi ${lead.username}, I wanted to follow up on my previous message. I understand you're looking for ${lead.interests[0].toLowerCase()}. I have some great options that might interest you and would be happy to share more information. Let me know if you'd like to discuss further!`)}
                        >
                          Use template
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
