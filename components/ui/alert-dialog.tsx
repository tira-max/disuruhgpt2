"use client"

import React from 'react'

export const AlertDialog = ({ children, ...props }: any) => {
  console.log('AlertDialog rendered - DISABLED')
  return <>{children}</>
}

export const AlertDialogTrigger = ({ children, asChild, onClick, ...props }: any) => {
  console.log('AlertDialogTrigger rendered - DISABLED')
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: (e: any) => {
        console.log('AlertDialogTrigger clicked but disabled')
        if (onClick) onClick(e)
      }
    })
  }
  return (
    <button {...props} onClick={(e) => {
      console.log('AlertDialogTrigger clicked but disabled')
      if (onClick) onClick(e)
    }}>
      {children}
    </button>
  )
}

export const AlertDialogContent = ({ children, ...props }: any) => {
  return null
}

export const AlertDialogHeader = ({ children, ...props }: any) => {
  return null
}

export const AlertDialogTitle = ({ children, ...props }: any) => {
  return null
}

export const AlertDialogDescription = ({ children, ...props }: any) => {
  return null
}

export const AlertDialogFooter = ({ children, ...props }: any) => {
  return null
}

export const AlertDialogAction = ({ children, ...props }: any) => {
  return null
}

export const AlertDialogCancel = ({ children, ...props }: any) => {
  return null
}

export const AlertDialogPortal = ({ children, ...props }: any) => {
  return null
}

export const AlertDialogOverlay = ({ children, ...props }: any) => {
  return null
}

console.log('ALERT DIALOG COMPONENTS LOADED - ALL DISABLED')