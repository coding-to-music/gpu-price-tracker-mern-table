import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GpuTable } from './components/GpuTable';
import { getAllGpus } from './api';

import './App.css';
import { GpuContainer } from './components/GpuContainer';

function App() {
	return (
		<GpuContainer />
	);
}

export default App;
