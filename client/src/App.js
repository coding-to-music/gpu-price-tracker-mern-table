import './App.css';
import GpuContainer from './components/GpuTable';
import NavBar from './components/NavBar';
import Login from './components/Login';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		// <Router>
		// 	<div>
		// 		<NavBar />
		// 		<Switch>
		// 			<Route exact path='/' render={() => <GpuContainer saved={false} />} />
		// 			<Route exact path='/saved' render={() => <GpuContainer saved={true} />} />
		// 		</Switch>
		// 	</div>
		// </Router>
		<Login />
	);
}

export default App;
