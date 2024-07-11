import './App.css'
import MenuBuilder from './components/MenuBuilder'
import MenuSidebar from './components/MenuSidebar'
import { ActiveIdProvider } from './context/ActiveIdContext';
import { MenuItemsProvider } from './context/MenuItemsContext';
import Navbar from './components/navbar/Navbar';




function App() {



  return (
    <>
      <MenuItemsProvider>

        <ActiveIdProvider>

          <header>
            <Navbar/>
          </header>

          <main className='py-8'>
            <div className='container mx-auto px-10'>
              <div className=' md:grid grid-cols-10 gap-9'>
                <div className='col-span-3 mb-5 md:mb-0'>
                  <MenuSidebar  />
                </div>
                <div className='col-span-7'>
                  <MenuBuilder  />
                </div>
              </div>
            </div>

          </main>

        </ActiveIdProvider>
      </MenuItemsProvider>
    </>
  )
}

export default App
