import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
]

interface Props {
  variant?: 'light' | 'dark'
}

export default function LanguageSwitcher({ variant = 'light' }: Props) {
  const { i18n } = useTranslation()
  const current = i18n.language?.slice(0, 2)

  return (
    <div className="flex items-center gap-1 rounded-lg p-0.5 bg-black/10">
      {LANGUAGES.map(({ code, label, flag }) => {
        const isActive = current === code
        const activeClass =
          variant === 'dark'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'bg-white text-blue-700 shadow-sm'
        const inactiveClass =
          variant === 'dark'
            ? 'text-white/80 hover:text-white'
            : 'text-white/80 hover:text-white'

        return (
          <button
            key={code}
            onClick={() => i18n.changeLanguage(code)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-200 ${
              isActive ? activeClass : inactiveClass
            }`}
          >
            <span>{flag}</span>
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
