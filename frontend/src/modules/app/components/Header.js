import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import users from '../../users';

const Header = () => {

    const login = useSelector(users.selectors.getLogin);
    const id = useSelector(users.selectors.getUser).id;
    const user = useSelector(users.selectors.getUserRole) === "USER";

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light border">
            <Link className="navbar-brand" to="/">Padel Project</Link>
            <button className="navbar-toggler" type="button" 
                data-toggle="collapse" data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav mr-auto">
                </ul>

                
                {login ? 

                <ul className="navbar-nav text-center">

                    <li className="nav-item dropdown">

                        <a className="dropdown-toggle nav-link" href="/"
                            data-toggle="dropdown">
                            <span className="fas"></span>&nbsp;
                            <FormattedMessage id="project.header.gameManagement"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            {user && <li className="nav-item">                  
                                <Link className="nav-link" to="/games/gameCalendarFiltered">
                                    <FormattedMessage id="project.games.filteredGames.title"/>
                                </Link>
                            </li>}

                            {user && <li className="nav-item">                  
                                <Link className="nav-link" to="/games/gamesUserListPending">
                                    <FormattedMessage id="project.games.pendingGames.title"/>
                                </Link>
                            </li>}

                            {!user && <li className="nav-item">                  
                                <Link className="nav-link" to="/games/gameCalendarDate">
                                    <FormattedMessage id="project.games.dateFilteredGames.title"/>
                                </Link>
                            </li>}

                            {!user && <li className="nav-item">                  
                                <Link className="nav-link" to="/games/addGameLink">
                                    <FormattedMessage id="project.games.addGame.title"/>
                                </Link>
                            </li>}

                            {user && <li className="nav-item">                  
                                <Link className="nav-link" to="/games/gamesUserList">
                                    <FormattedMessage id="project.games.gamesUserList.title"/>
                                </Link>
                            </li>}

                            {!user && <li className="nav-item">                  
                                <Link className="nav-link" to="/games/finishedGamesList">
                                    <FormattedMessage id="project.games.finishedGamesList.title"/>
                                </Link>
                            </li>}
                        </div>

                    </li>

                    {!user && <li className="nav-item dropdown">

                        <a className="dropdown-toggle nav-link" href="/"
                            data-toggle="dropdown">
                            <span className="fas"></span>&nbsp;
                            <FormattedMessage id="project.header.fieldManagement"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <li className="nav-item">                  
                                <Link className="nav-link" to="/fields/fieldList">
                                    <FormattedMessage id="project.field.fieldList.title"/>
                                </Link>
                            </li>
                        </div>

                    </li>}

                    {!user && <li className="nav-item dropdown">

                        <a className="dropdown-toggle nav-link" href="/"
                            data-toggle="dropdown">
                            <span className="fas"></span>&nbsp;
                            <FormattedMessage id="project.header.userManagement"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <li className="nav-item">                  
                                <Link className="nav-link" to="/users/signup">
                                    <FormattedMessage id="project.users.SignUp.title"/>
                                </Link>
                            </li>

                            <li className="nav-item">                  
                                <Link className="nav-link" to="/users/userList">
                                    <FormattedMessage id="project.users.userList.title"/>
                                </Link>
                            </li>
                        </div>

                    </li>}
                
                    <li className="nav-item dropdown">

                        <a className="dropdown-toggle nav-link" href="/"
                            data-toggle="dropdown">
                            <span className="fas fa-user"></span>&nbsp;
                            {login}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to={`/users/user-details/${id}`}>
                                <FormattedMessage id="project.app.Header.detailsProfile"/>
                            </Link>
                            <Link className="dropdown-item" to="/users/change-password">
                                <FormattedMessage id="project.users.ChangePassword.title"/>
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/users/logout">
                                <FormattedMessage id="project.app.Header.logout"/>
                            </Link>
                        </div>

                    </li>

                </ul>
                
                :

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/users/login">
                            <FormattedMessage id="project.users.Login.title"/>
                        </Link>
                    </li>
                </ul>
                
                }

            </div>
        </nav>

    );

};

export default Header;
