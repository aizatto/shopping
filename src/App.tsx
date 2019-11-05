import React, { useState } from 'react';
import Navbar from './Navbar';
import { Container, Input, CardTitle, Card, Button } from 'reactstrap';
import * as urlLib from 'url';

interface QueryDataStore {
  query: string,
}

const markets = [
  (store: QueryDataStore): React.ReactNode => {
    const urlString = "https://www.lazada.com.my/catalog/";
    const urlObject = urlLib.parse(urlString, true);
    urlObject.search = undefined;
    urlObject.query['q'] = store.query;

    const newUrlString = urlLib.format(urlObject);

    return (
      <a href={newUrlString}>Lazada</a>
    )
  },
  (store: QueryDataStore): React.ReactNode => {
    const urlString = "https://shopee.com.my/search";
    const urlObject = urlLib.parse(urlString, true);
    urlObject.search = undefined;
    urlObject.query['keyword'] = store.query;

    const newUrlString = urlLib.format(urlObject);

    return (
      <a href={newUrlString}>Shopee</a>
    )
  },
  (store: QueryDataStore): React.ReactNode => {
    const urlString = "https://www.facebook.com/marketplace/kualalumpur/search/?vertical=C2C&sort=BEST_MATCH";
    const urlObject = urlLib.parse(urlString, true);
    urlObject.search = undefined;
    urlObject.query['query'] = store.query;

    const newUrlString = urlLib.format(urlObject);

    return (
      <a href={newUrlString}>Facebook Marketplace</a>
    )
  },
  (store: QueryDataStore): React.ReactNode => {
    const urlString = "https://my.carousell.com/search/products/";
    const urlObject = urlLib.parse(urlString, true);
    urlObject.search = undefined;
    urlObject.query['query'] = store.query;

    const newUrlString = urlLib.format(urlObject);

    return (
      <a href={newUrlString}>Carousell</a>
    )
  },
  (store: QueryDataStore): React.ReactNode => {
    const urlString = "https://www.amazon.com/s?";
    const urlObject = urlLib.parse(urlString, true);
    urlObject.search = undefined;
    urlObject.query['k'] = store.query;

    const newUrlString = urlLib.format(urlObject);

    return (
      <a href={newUrlString}>Amazon</a>
    )
  },
];

function setQueriesInLocalStorage(queries: QueryDataStore[]) {
  window.localStorage.setItem('queries', JSON.stringify(queries));
}

const App: React.FC = () => {
  const [queries, setQueries] = useState<QueryDataStore[]>(() =>{
    const queriesLocalStorage = window.localStorage.getItem('queries');
    if (!queriesLocalStorage) {
      return [];
    }

    return JSON.parse(queriesLocalStorage);
  });

  const [query, setQuery] = useState('');

  const onSubmit = (e: any) => {
    e.preventDefault();

    const newQuery = query.trim();
    if (newQuery.length === 0) {
      return;
    }

    const newQueries = Array.from(queries);
    newQueries.unshift({
      query: newQuery,
    });

    setQueries(newQueries);
    setQueriesInLocalStorage(newQueries);
  }

  const queryElements = queries.map(queryDS => {
    const marketElements = markets.map(market => {
      return <li>{market(queryDS)}</li>;
    });
    return (
      <Card key={queryDS.query}>
        <CardTitle>
          {queryDS.query}
        </CardTitle>
        <ul>
          {marketElements}
        </ul>
      </Card>
    )
  })

  return (
    <div className="App">
      <Navbar />
      <Container>
        <form onSubmit={onSubmit}>
          <Input
            defaultValue={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Button>
            Insert Query
          </Button>
        </form>
        {queryElements}
      </Container>
    </div>
  );
}

export default App;
