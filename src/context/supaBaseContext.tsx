import React, { createContext, useContext, ReactNode } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

type SupabaseContextType = SupabaseClient | undefined

const SupabaseContext = createContext<SupabaseContextType>(undefined)


interface SupabaseProviderProps {
  children: ReactNode
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

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