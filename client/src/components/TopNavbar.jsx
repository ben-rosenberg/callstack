import { Link } from 'react-router-dom';

import '../style.css';
import menuIcon from '../images/icons/menu_icon_64_plain.svg';
import avatarIcon from '../images/icons/profile_pic_icon_64_plain.svg';

const TopNavbar = (props) => {
    
    return (
        <div className="top_navbar">
            <img className='icon' src={ menuIcon } alt="Side navbar expansion icon" />
            <h1>
                <Link to='/'>Callstack</Link>
            </h1>
            <img className='icon' src={ avatarIcon } alt="User avatar" />
        </div>
    );
};

export default TopNavbar;