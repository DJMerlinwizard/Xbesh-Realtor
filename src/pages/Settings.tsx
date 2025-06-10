import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const Settings = () => {
  const [_profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    phone: '',
    website: '',
    license_number: '',
    service_areas: '',
    specialties: '',
    bio: '',
    notification_email: true,
    notification_sms: false,
    notification_push: true,
    auto_respond: false,
    auto_respond_template: ''
  })
  const { user } = useAuth()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          setLoading(true)
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (error) {
            console.error('Error fetching profile:', error)
          } else if (data) {
            setProfile(data)
            setFormData({
              full_name: data.full_name || '',
              company_name: data.company_name || '',
              phone: data.phone || '',
              website: data.website || '',
              license_number: data.license_number || '',
              service_areas: data.service_areas || '',
              specialties: data.specialties || '',
              bio: data.bio || '',
              notification_email: data.notification_email !== false,
              notification_sms: data.notification_sms === true,
              notification_push: data.notification_push !== false,
              auto_respond: data.auto_respond === true,
              auto_respond_template: data.auto_respond_template || ''
            })
          }
        }
      } catch (error) {
        console.error('Error in fetchProfile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return
    
    try {
      setSaving(true)
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          company_name: formData.company_name,
          phone: formData.phone,
          website: formData.website,
          license_number: formData.license_number,
          service_areas: formData.service_areas,
          specialties: formData.specialties,
          bio: formData.bio,
          notification_email: formData.notification_email,
          notification_sms: formData.notification_sms,
          notification_push: formData.notification_push,
          auto_respond: formData.auto_respond,
          auto_respond_template: formData.auto_respond_template,
          updated_at: new Date()
        })
        .eq('id', user.id)

      if (error) {
        console.error('Error updating profile:', error)
        alert('Error updating profile. Please try again.')
      } else {
        alert('Profile updated successfully!')
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {loading ? (
            <div className="text-center py-10">
              <div className="spinner"></div>
              <p className="mt-2 text-sm text-gray-500">Loading your settings...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Update your personal and professional information.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="full_name"
                          id="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                        Company name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="company_name"
                          id="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="website"
                          id="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="license_number" className="block text-sm font-medium text-gray-700">
                        License number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="license_number"
                          id="license_number"
                          value={formData.license_number}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="service_areas" className="block text-sm font-medium text-gray-700">
                        Service areas
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="service_areas"
                          id="service_areas"
                          value={formData.service_areas}
                          onChange={handleChange}
                          placeholder="e.g. Seattle, WA; Bellevue, WA"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Separate multiple areas with semicolons.
                      </p>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
                        Specialties
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="specialties"
                          id="specialties"
                          value={formData.specialties}
                          onChange={handleChange}
                          placeholder="e.g. First-time buyers; Luxury homes; Investment properties"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Separate multiple specialties with semicolons.
                      </p>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={formData.bio}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description of your experience and approach as a realtor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Settings</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Configure how you want to be notified about new leads and messages.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notification_email"
                          name="notification_email"
                          type="checkbox"
                          checked={formData.notification_email}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notification_email" className="font-medium text-gray-700">
                          Email notifications
                        </label>
                        <p className="text-gray-500">Receive email notifications for new leads and messages.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notification_sms"
                          name="notification_sms"
                          type="checkbox"
                          checked={formData.notification_sms}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notification_sms" className="font-medium text-gray-700">
                          SMS notifications
                        </label>
                        <p className="text-gray-500">Receive text message notifications for new leads and messages.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notification_push"
                          name="notification_push"
                          type="checkbox"
                          checked={formData.notification_push}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notification_push" className="font-medium text-gray-700">
                          Push notifications
                        </label>
                        <p className="text-gray-500">Receive browser push notifications for new leads and messages.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Auto-Response Settings</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Configure automatic responses to new leads.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="auto_respond"
                          name="auto_respond"
                          type="checkbox"
                          checked={formData.auto_respond}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="auto_respond" className="font-medium text-gray-700">
                          Enable auto-responses
                        </label>
                        <p className="text-gray-500">Automatically send a response to new leads.</p>
                      </div>
                    </div>

                    {formData.auto_respond && (
                      <div>
                        <label htmlFor="auto_respond_template" className="block text-sm font-medium text-gray-700">
                          Auto-response template
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="auto_respond_template"
                            name="auto_respond_template"
                            rows={4}
                            value={formData.auto_respond_template}
                            onChange={handleChange}
                            placeholder="Hi {username}, I noticed your post about {topic} and I'd be happy to help. I'm a realtor specializing in {specialties} in the {location} area. Would you like to schedule a quick call to discuss your needs?"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          You can use placeholders like {"{username}"}, {"{topic}"}, {"{location}"}, and {"{specialties}"}.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
