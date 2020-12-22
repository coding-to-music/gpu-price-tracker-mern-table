import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GpuTable } from './components/GpuTable';
import { getAllGpus } from './api';

import './App.css';

function App() {
  console.log(getAllGpus());
	return (
		<div>
			
		</div>
	);
}

export default App;
