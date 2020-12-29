import './App.css';
import { GpuContainer } from './components/GpuTable/GpuContainer';
import { NavBar } from './components/NavBar/NavBar';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  
	return (
		<Router>
			<div>
				<NavBar />
				<Switch>
					<Route exact path='/' render={() => <GpuContainer saved={false} />} />
					<Route exact path='/saved' render={() => <GpuContainer saved={true} />} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
