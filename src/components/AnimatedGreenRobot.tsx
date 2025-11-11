'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import DashboardCard from '@/components/dashboard/card'
import type { SecurityStatus as SecurityStatusType } from '@/types/dashboard'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Bullet } from '@/components/ui/bullet'

// Variant styling for status cards
const securityStatusItemVariants = cva('border rounded-md ring-4', {
  variants: {
    variant: {
      success: 'border-success bg-success/5 text-success ring-success/3',
      warning: 'border-warning bg-warning/5 text-warning ring-warning/3',
      destructive: 'border-destructive bg-destructive/5 text-destructive ring-destructive/3',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
})

interface SecurityStatusItemProps extends VariantProps<typeof securityStatusItemVariants> {
  title: string
  value: string
  status: string
  className?: string
}

function SecurityStatusItem({ title, value, status, variant, className }: SecurityStatusItemProps) {
  return (
    <div className={cn(securityStatusItemVariants({ variant }), className)}>
      <div className="flex items-center gap-2 py-1 px-2 border-b border-current">
        <Bullet size="sm" variant={variant} />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="py-1 px-2.5">
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-xs opacity-50">{status}</div>
      </div>
    </div>
  )
}

// === Animated SVG Robot (replaces GIF) ===
interface AnimatedCuteRobotProps {
  size?: number
  color?: string
  animationSpeed?: number
}

function AnimatedCuteRobot({
  size = 240,
  color = '#00FF00',
  animationSpeed = 1.8,
}: AnimatedCuteRobotProps) {
  return (
    <div
      className="absolute bottom-0 right-0 md:right-8 md:bottom-6 w-[140px] md:w-[240px] pointer-events-none"
      style={{ filter: 'drop-shadow(0 0 10px rgba(0,255,0,0.6))' }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        width={size}
        height={size}
        animate={{
          filter: [
            'drop-shadow(0 0 6px rgba(0,255,0,0.5))',
            'drop-shadow(0 0 12px rgba(0,255,0,0.9))',
            'drop-shadow(0 0 6px rgba(0,255,0,0.5))',
          ],
        }}
        transition={{
          duration: animationSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Glow pulse */}
        <motion.path
          stroke={color}
          strokeLinecap="square"
          strokeWidth={1.667}
          d="M10 3.333H4.166v7.5h11.667v-7.5H10Zm0 0V1.667m-6.667 12.5 1.25-1.25m12.083 1.25-1.25-1.25M7.5 6.667V7.5m5-.833V7.5M5 10.833V12.5a5 5 0 0 0 10 0v-1.667"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: animationSpeed * 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Eyes flicker */}
        <motion.circle
          cx="7.5"
          cy="7"
          r="0.4"
          fill={color}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.circle
          cx="12.5"
          cy="7"
          r="0.4"
          fill={color}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
        />
      </motion.svg>
    </div>
  )
}

// === Main Security Status with Robot ===
interface SecurityStatusProps {
  statuses: SecurityStatusType[]
}

export default function SecurityStatus({ statuses }: SecurityStatusProps) {
  return (
    <DashboardCard
      title="SECURITY STATUS"
      intent="success"
      addon={<Badge variant="outline-success">ONLINE</Badge>}
    >
      <div className="relative flex flex-col md:flex-row">
        {/* Status items grid */}
        <div className="max-md:order-1 grid grid-cols-3 md:grid-cols-1 gap-4 py-2 px-1 md:max-w-max">
          {statuses.map((item, index) => (
            <SecurityStatusItem
              key={index}
              title={item.title}
              value={item.value}
              status={item.status}
              variant={item.variant}
            />
          ))}
        </div>

        {/* Animated Robot (vector-based, green glowing) */}
        <AnimatedCuteRobot />
      </div>
    </DashboardCard>
  )
}
