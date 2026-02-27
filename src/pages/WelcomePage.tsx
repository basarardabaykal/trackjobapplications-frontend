import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-800 tracking-tight">TrackJobs</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {t('nav.signIn')}
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-md hover:shadow-blue-200 transition-all duration-200"
          >
            {t('nav.getStarted')}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-6 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          {t('welcome.badge')}
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight max-w-2xl mb-5">
          {t('welcome.headline')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
            {t('welcome.headlineHighlight')}
          </span>
        </h1>

        <p className="text-gray-500 text-lg max-w-xl mb-10 leading-relaxed">
          {t('welcome.subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 mb-16">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200"
          >
            {t('welcome.cta')}
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3.5 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all duration-200"
          >
            {t('nav.signIn')}
          </button>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl w-full">
          <FeatureCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            title={t('welcome.features.track.title')}
            description={t('welcome.features.track.description')}
          />
          <FeatureCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title={t('welcome.features.visualize.title')}
            description={t('welcome.features.visualize.description')}
          />
          <FeatureCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
            title={t('welcome.features.followup.title')}
            description={t('welcome.features.followup.description')}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 text-xs text-gray-400">
        © {new Date().getFullYear()} TrackJobs. {t('footer.rights')}
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 text-left">
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-800 mb-1.5">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}
