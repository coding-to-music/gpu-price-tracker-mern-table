import './App.css';
import GpuContainer from './components/GpuTable';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from './utils/AuthContext';

function App() {
	const {
		user,
		setUser,
		authenticated,
		setAuthenticated,
		authChecked,
	} = useContext(AuthContext);

	return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path='/' render={() => <GpuContainer saved={false} />} />
					<Route exact path='/saved'>
						{!authChecked ? (
							<></>
						) : authenticated ? (
							<GpuContainer saved={true} />
						) : (
							<Redirect to='/login' />
						)}
					</Route>
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<Route path='*' component={NotFound} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
