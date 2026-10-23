import { Outlet } from 'react-router'


function AppLayout() {
  console.log("app layout")
  return (
    <div className='flex gap-2 flex-col'>
      <Outlet/>
    </div>
  )
}

export default AppLayout
