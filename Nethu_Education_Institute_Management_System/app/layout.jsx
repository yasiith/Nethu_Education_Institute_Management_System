
import '@styles/globals.css';
import Navbar from '@components/nav';


export const metadata = {
    title: "NEIMS",
    description: 'Learn at Ease'
}

const Rootlayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div className="main">
                <div className="gradient"/>
            </div>
            <main className="app">
                
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout
