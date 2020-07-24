import React from 'react';
import { Container } from "react-bootstrap";

import { ProducerTable } from './components/Producer';
import { ConsumerTable } from './components/Consumer';

function App() {
  return (
    <Container>
      <ProducerTable />
      <ConsumerTable />
    </Container>
  );
}

export default App;
