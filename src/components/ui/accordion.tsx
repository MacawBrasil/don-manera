'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { cn } from '@/lib/utils'

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'relative w-7.5 h-7.5 focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>#open]:opacity-0',
          className,
        )}
        {...props}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          viewBox="0 0 30 30"
          fill="none"
          id="open"
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-all"
        >
          <g clipPath="url(#clip0_1_248)" fill="#D9CCB2">
            <path d="M22.09 0H7.91C3.55 0 0 3.549 0 7.91v14.18C0 26.45 3.549 30 7.91 30h14.18C26.45 30 30 26.451 30 22.09V7.91C30 3.55 26.451 0 22.09 0zm6.152 22.09a6.16 6.16 0 01-6.152 6.152H7.91a6.16 6.16 0 01-6.152-6.152V7.91A6.16 6.16 0 017.91 1.758h14.18a6.16 6.16 0 016.152 6.152v14.18z" />
            <path d="M22.031 14.121H15.88V7.97a.879.879 0 00-1.758 0v6.152H7.97a.879.879 0 000 1.758h6.152v6.152a.879.879 0 101.758 0V15.88h6.152a.879.879 0 100-1.758z" />
          </g>
          <defs>
            <clipPath id="clip0_1_248">
              <path fill="#fff" d="M0 0H30V30H0z" />
            </clipPath>
          </defs>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          viewBox="0 0 30 30"
          fill="none"
          id="close"
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-all"
        >
          <g clipPath="url(#clip0_1_252)" fill="#D9CCB2">
            <path d="M22.09 0H7.91C3.55 0 0 3.549 0 7.91v14.18C0 26.45 3.549 30 7.91 30h14.18C26.45 30 30 26.451 30 22.09V7.91C30 3.55 26.451 0 22.09 0zm6.152 22.09a6.16 6.16 0 01-6.152 6.152H7.91a6.16 6.16 0 01-6.152-6.152V7.91A6.16 6.16 0 017.91 1.758h14.18a6.16 6.16 0 016.152 6.152v14.18z" />
            <path d="M22.031 14.121H15.88h-7.91a.879.879 0 000 1.758h6.152 7.91a.879.879 0 100-1.758z" />
          </g>
          <defs>
            <clipPath id="clip0_1_252">
              <path fill="#fff" d="M0 0H30V30H0z" />
            </clipPath>
          </defs>
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm',
        className,
      )}
      {...props}
    >
      <div className="pt-0 pb-4">{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
