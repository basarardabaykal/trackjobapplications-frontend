import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserIcon, MailIcon, LockIcon, EyeIcon } from '../icons'

interface Props {
  onSwitch: () => void
}

export default function SignUpForm({ onSwitch }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-1">{t('auth.signUp.title')}</h2>
      <p className="text-sm text-gray-400 mb-8">{t('auth.signUp.subtitle')}</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2"><UserIcon /></span>
          <input
            type="text"
            placeholder={t('auth.signUp.fullName')}
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2"><MailIcon /></span>
          <input
            type="email"
            placeholder={t('auth.signUp.email')}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2"><LockIcon /></span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.signUp.password')}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-sm font-semibold text-white tracking-wide bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200"
        >
          {t('auth.signUp.submit')}
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">{t('auth.signUp.or')}</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="text-center text-sm text-gray-500 md:hidden">
          {t('auth.signUp.hasAccount')}{' '}
          <button type="button" onClick={onSwitch} className="text-blue-600 font-medium hover:underline">
            {t('auth.signUp.switchToSignIn')}
          </button>
        </p>
      </form>
    </div>
  )
}
