import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function AssetPage() {
  // Symbol comes from the URL: /asset/AAPL -> symbol = "AAPL"
  const { symbol } = useParams()

  return (
    <div className="page debug">
      <Navbar variant="back" balance={100000} />

      <main className="page-content debug-blue">
        <h2 className="debug-green">{symbol}</h2>

        <section className="asset-details debug-green">
          Asset details (trading widget)
        </section>

        <div className="trade-buttons debug-green">
          <button>Buy</button>
          <button>Sell</button>
        </div>
      </main>
    </div>
  )
}

export default AssetPage