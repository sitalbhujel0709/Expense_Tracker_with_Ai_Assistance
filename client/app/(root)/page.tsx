import { CardSection } from '@/components/web/card-section'
import { TransactionChart } from '@/components/web/transaction-chart'
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { cookies } from 'next/headers';
import React from 'react'

const page = async () => {

  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/summary`)
  const data = await res.json()

  return (
    <div className='p-4'>
      <CardSection data={data}/>
      <TransactionChart data={data}/>
    </div>
  )
}

export default page