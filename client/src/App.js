import { Routes, Route } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';

import './style.css';
import CallstackDetails from './views/CallstackDetails';
import Main from './views/Main';
import NewCallstack from './views/NewCallstack';
import EditTask from './views/EditTask.js';

function App() {
    return (
        <div className="flex_col">
            <TopNavbar />
            <div className="content">
                <Routes>
                    <Route path='' element={ <Main /> } />
                    <Route path='callstacks/new' element={ <NewCallstack /> } />
                    <Route path='callstacks/:callstackId' element={ <CallstackDetails /> } />
                    <Route path='callstacks/:callstackId/tasks/:id/edit' element={ <EditTask /> } />
                </Routes>
            </div>
        </div>
    );
}

export default App;
