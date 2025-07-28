"use client"

import React from 'react'

// Mock all Dialog components to do nothing
export const Dialog = ({ children, ...props }: any) => {
  console.log('Dialog rendered with props:', props)
  return <>{children}</>
}

export const DialogTrigger = ({ children, asChild, onClick, ...props }: any) => {
  console.log('DialogTrigger rendered - DISABLED')
  // Return the child but make it non-functional to prevent errors
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: (e: any) => {
        console.log('DialogTrigger clicked but disabled')
        if (onClick) onClick(e)
      }
    })
  }
  return (
    <button {...props} onClick={(e) => {
      console.log('DialogTrigger clicked but disabled')
      if (onClick) onClick(e)
    }}>
      {children}
    </button>
  )
}

export const DialogContent = ({ children, ...props }: any) => {
  console.log('DialogContent rendered - DISABLED')
  return null // Don't render content
}

export const DialogHeader = ({ children, ...props }: any) => {
  return null
}

export const DialogTitle = ({ children, ...props }: any) => {
  return null
}

export const DialogDescription = ({ children, ...props }: any) => {
  return null
}

export const DialogFooter = ({ children, ...props }: any) => {
  return null
}

export const DialogClose = ({ children, ...props }: any) => {
  return null
}

export const DialogPortal = ({ children, ...props }: any) => {
  return null
}

export const DialogOverlay = ({ children, ...props }: any) => {
  return null
}

// Log when this file is loaded
console.log('DIALOG COMPONENTS LOADED - ALL DISABLED')

// Default export for compatibility
export default Dialog