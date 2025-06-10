import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    price: { monthly: '$49' },
    description: 'Perfect for individual realtors just getting started.',
    features: [
      '50 leads per month',
      'Basic lead qualification',
      'Email notifications',
      'Standard support',
    ],
    featured: false,
    current: false,
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    price: { monthly: '$99' },
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
    current: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    price: { monthly: '$249' },
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
    current: false,
  },
]

const frequentlyAskedQuestions = [
  {
    id: 1,
    question: "How do I change my subscription plan?",
    answer:
      "You can upgrade or downgrade your subscription at any time from the Subscriptions page. Changes to your subscription will take effect at the start of your next billing cycle.",
  },
  {
    id: 2,
    question: "What happens if I exceed my monthly lead limit?",
    answer:
      "If you reach your monthly lead limit, you won't receive any new leads until your next billing cycle begins. You can upgrade your plan at any time to increase your lead limit.",
  },
  {
    id: 3,
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of your current billing period.",
  },
  {
    id: 4,
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 7-day free trial for all new users. You can test our platform and see the quality of leads before committing to a subscription.",
  },
  {
    id: 5,
    question: "How are leads qualified?",
    answer:
      "Our AI system analyzes Reddit posts and comments to identify users who are actively discussing real estate needs. We look at factors like intent, timeline, location specificity, and engagement level to assign a lead score.",
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Subscriptions() {
  const [frequency, setFrequency] = useState('monthly')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription plan and billing information.
        </p>
      </div>

      {/* Current subscription */}
      <div className="mb-12 rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Current subscription</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>You are currently on the Professional plan. Your subscription renews on December 15, 2023.</p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              Manage billing
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-12 rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Usage this month</h3>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Leads</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">87/200</dd>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '43%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-white border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Contacted Leads</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">32</dd>
                <div className="mt-4 text-sm text-gray-500">
                  36.8% of total leads
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-white border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Converted Leads</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">7</dd>
                <div className="mt-4 text-sm text-gray-500">
                  21.9% conversion rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing plans */}
      <div className="mb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Plans for realtors of all sizes
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
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
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.featured ? 'ring-2 ring-primary-600' : 'ring-1 ring-gray-200',
                  'rounded-3xl p-8 xl:p-10'
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.featured ? 'text-primary-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.featured ? (
                    <p className="rounded-full bg-primary-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price.monthly}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {tier.current ? (
                    <button
                      className="w-full rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                      disabled
                    >
                      Current plan
                    </button>
                  ) : (
                    <button
                      className={classNames(
                        tier.featured
                          ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-500'
                          : 'text-primary-600 ring-1 ring-inset ring-primary-200 hover:ring-primary-300',
                        'w-full rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                      )}
                    >
                      {tier.featured ? 'Upgrade' : tier.name === 'Starter' ? 'Downgrade' : 'Upgrade'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing history */}
      <div className="mb-12 rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Billing history</h3>
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Nov 15, 2023
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Professional Plan - Monthly</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$99.00</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-primary-600 hover:text-primary-900">
                          View receipt
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Oct 15, 2023
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Professional Plan - Monthly</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$99.00</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-primary-600 hover:text-primary-900">
                          View receipt
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Sep 15, 2023
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Professional Plan - Monthly</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$99.00</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-primary-600 hover:text-primary-900">
                          View receipt
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12 rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Frequently asked questions</h3>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {frequentlyAskedQuestions.map((faq) => (
              <div key={faq.id} className="pt-6">
                <dt className="text-lg">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between text-left text-gray-900"
                    aria-controls={`faq-${faq.id}`}
                    aria-expanded="false"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base text-gray-500">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Need help */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Need help?</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              If you have any questions about your subscription or need assistance, our support team is here to help.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Contact support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
