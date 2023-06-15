"use client"
import Table from './components/Table'
import NavBar from './components/NavBar'

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className='p-20'>
      <Table />
      </div>

    </div>
  )
}
