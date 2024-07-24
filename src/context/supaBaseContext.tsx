import React, { createContext, useContext, ReactNode } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useAppSelector } from '../redux/hooks'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

type SupabaseContextType = SupabaseClient | undefined

const SupabaseContext = createContext<SupabaseContextType>(undefined)


interface SupabaseProviderProps {
  children: ReactNode
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const token = useAppSelector(((state)=>state.auth.token))
  const supabase = createClient(supabaseUrl, supabaseAnonKey,{
    global:{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  })

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = (): SupabaseClient => {
  
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}