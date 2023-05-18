import { useEffect, useState } from 'react';
import Restaurant from './components/Restaurant';
import { fetchBusinesses } from './services/yelp';

export default function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRes = async () => {
      const res = await fetchBusinesses();
      setBusinesses(res);
      setLoading(false);
    };
    fetchRes();
  }, []);

  async function handleQuery() {
    const res = await fetchBusinesses(zip, search);
    setBusinesses(res);
  }

  return (
    <div className="App">
      <h1>The Yelp! API</h1>
      <div className="query-form">
        <div className="form-control">
          <label>zip:
            <input type="text" placeholder="zip" value={ zip } onChange={ (e) => setZip(e.target.value) } />
          </label>
        </div>
  
        <div className="form-control">
    
          <label>query:</label>
    
          <input type="text" placeholder="search" value={ search } onChange={ (e) => setSearch(e.target.value) } />
  
        </div>
  
        <button type="submit" onClick={ handleQuery }>search</button>

      </div>

      { loading && <div className="loader"></div> }


      { !loading && businesses().map((place) => <Restaurant key={ place.id } { ...place } />) }
    </div>
  );
}