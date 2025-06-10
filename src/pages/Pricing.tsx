import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '/register',
    price: { monthly: '$49', annually: '$470' },
    description: 'Perfect for individual realtors just getting started.',
    features: [
      '50 leads per month',
      'Basic lead qualification',
      'Email notifications',
      'Standard support',
    ],
    featured: false,
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '/register',
    price: { monthly: '$99', annually: '$950' },
    description: 'Ideal for established realtors looking to grow their business.',
    features: [
      '200 leads per month',
      'Advanced lead qualification',
      'Email and SMS notifications',
      'Priority support',
      'Lead analytics dashboard',
      'Personalized outreach templates',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '/register',
    price: { monthly: '$249', annually: '$2,390' },
    description: 'For real estate teams and brokerages with multiple agents.',
    features: [
      'Unlimited leads',
      'Premium lead qualification',
      'Team collaboration tools',
      'Dedicated account manager',
      'Advanced analytics and reporting',
      'API access',
      'White-label option',
    ],
    featured: false,
  },
]

const faqs = [
  {
    question: 'How does LeadMine find potential clients on Reddit?',
    answer: 'Our AI-powered system continuously monitors relevant subreddits where people discuss mortgages, home buying, refinancing, and other real estate topics. We analyze the content to identify users who are likely in the market for real estate services.',
  },
  {
    question: 'Is it ethical to contact people from Reddit?',
    answer: 'Yes, when done properly. We provide you with leads who have publicly expressed interest in real estate services. Our system helps you craft personalized, helpful outreach that adds value rather than spamming. We also provide best practices for ethical outreach.',
  },
  {
    question: 'How many leads can I expect each month?',
    answer: 'The number of leads depends on your subscription tier. Our Starter plan provides up to 50 qualified leads per month, Professional offers 200, and Enterprise gives unlimited access. The actual number may vary based on market conditions and Reddit activity.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes, we offer a 7-day free trial for all new users. You can test our platform and see the quality of leads before committing to a subscription.',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
  const [frequency, setFrequency] = useState('monthly')

  return (
    <div className="bg-white">
      <main>
        {/* Pricing section */}
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-base font-semibold leading-7 text-primary-600">Pricing</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Pricing plans for realtors of all sizes
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Choose the perfect plan for your needs. All plans include a 7-day free trial.
          </p>
          <div className="mt-16 flex justify-center">
            <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200">
              <div
                className={classNames(
                  frequency === 'monthly'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500',
                  'cursor-pointer rounded-full px-2.5 py-1'
                )}
                onClick={() => setFrequency('monthly')}
              >
                Monthly
              </div>
              <div
                className={classNames(
                  frequency === 'annually'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500',
                  'cursor-pointer rounded-full px-2.5 py-1'
                )}
                onClick={() => setFrequency('annually')}
              >
                Annually <span className="text-primary-600">(-20%)</span>
              </div>
            </div>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.featured ? 'ring-2 ring-primary-600' : 'ring-1 ring-gray-200',
                  'rounded-3xl p-8'
                )}
              >
                <h2
                  id={tier.id}
                  className={classNames(
                    tier.featured ? 'text-primary-600' : 'text-gray-900',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h2>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency as keyof typeof tier.price]}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">{frequency === 'monthly' ? '/month' : '/year'}</span>
                </p>
                <Link
                  to={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-500'
                      : 'text-primary-600 ring-1 ring-inset ring-primary-200 hover:ring-primary-300',
                    'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                  )}
                >
                  Get started
                </Link>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Feature comparison */}
        <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Compare plans</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find the right plan for your business
            </p>
          </div>
          <div className="isolate mt-10">
            <div className="relative -mx-8">
              <table className="w-full border-separate border-spacing-x-8 border-spacing-y-4 text-left">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Feature</span>
                    </th>
                    {tiers.map((tier) => (
                      <th key={tier.id} scope="col" className="px-6 text-lg font-semibold leading-7 text-gray-900">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="text-sm font-semibold leading-6 text-gray-900">
                      Monthly lead limit
                    </th>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">50</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">200</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Unlimited</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-sm font-semibold leading-6 text-gray-900">
                      Lead qualification
                    </th>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Basic</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Advanced</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Premium</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-sm font-semibold leading-6 text-gray-900">
                      Notifications
                    </th>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Email</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Email & SMS</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Email & SMS</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-sm font-semibold leading-6 text-gray-900">
                      Analytics dashboard
                    </th>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Basic</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Advanced</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Advanced</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-sm font-semibold leading-6 text-gray-900">
                      Outreach templates
                    </th>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">5 templates</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">20 templates</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Unlimited</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-sm font-semibold leading-6 text-gray-900">
                      Team members
                    </th>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">1</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">3</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">Unlimited</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-sm font-semibold leading-6 text-gray-900">
                      API access
                    </th>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">—</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">—</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">
                      <CheckIcon className="mx-auto h-5 w-5 text-primary-600" aria-hidden="true" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-sm font-semibold leading-6 text-gray-900">
                      White labeling
                    </th>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">—</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">—</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">
                      <CheckIcon className="mx-auto h-5 w-5 text-primary-600" aria-hidden="true" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-sm font-semibold leading-6 text-gray-900">
                      Dedicated account manager
                    </th>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">—</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">—</td>
                    <td className="px-6 text-center text-sm leading-6 text-gray-600">
                      <CheckIcon className="mx-auto h-5 w-5 text-primary-600" aria-hidden="true" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <div key={faq.question} className="pt-6">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* CTA section */}
        <div className="relative -z-10 mt-32 px-6 lg:px-8">
          <div
            className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:bottom-0 sm:right-[calc(50%-6rem)] sm:top-auto sm:translate-y-0 sm:transform-gpu sm:justify-end"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-primary-600 to-secondary-600 opacity-25"
              style={{
                clipPath:
                  'polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to grow your real estate business?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Start finding qualified leads from Reddit today. Sign up for your free 7-day trial.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Get started for free
              </Link>
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Sign in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
