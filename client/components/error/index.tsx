import Image from 'next/image'

import { ButtonComponent } from '@/components/button'

import { useTranslate } from '@/hooks/useTranslate'

import ErrorRobot from '@/assets/graphics/error-robot.svg'

import { customSignOut } from '@/utils/customSignOut'

interface ErrorProps {
  title?: string
  message?: string
  secondaryMessage?: string
  compact?: boolean
}
export const ErrorComponent = ({ title, message, secondaryMessage, compact = false }: ErrorProps) => {
  const { t } = useTranslate()
  return (
    <div className={`flex flex-col items-center ${compact ? 'gap-4 mb-6' : 'h-screen gap-5 justify-center'}`}>
      <Image height={compact ? 280 : 580} src={ErrorRobot} alt="Error robot" />
      <strong className={`${compact ? 'text-5xl' : 'text-6xl'}`}>{title || t('error.title')}</strong>
      <strong className={`${compact ? 'text-3xl' : 'text-4xl'}`}>{message || t('error.message')}</strong>
      <strong className={`${compact ? 'text-xl' : 'text-2xl'}`}>
        {secondaryMessage || t('error.secondary_message')}
      </strong>
      <ButtonComponent onClick={customSignOut} variant="outline" fullWidth={false}>
        Go to login page
      </ButtonComponent>
    </div>
  )
}
