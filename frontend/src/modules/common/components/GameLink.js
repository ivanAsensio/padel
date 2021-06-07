import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {FormattedDate, FormattedTime} from 'react-intl';

import {Link} from 'react-router-dom';

const GameLink = ({gameId, maximunLevel, minimunLevel, millisInitDate, millisFinalDate, typeGame, numPlayers}) => {

    const initDate = new Date(millisInitDate);
    const finalDate = new Date(millisFinalDate);

    return (
        <div className="tab-content d-flex">
            <div className="mr-auto p-2">
                <div htmlFor="minimunLevel" className="col-xs-6">
                    <label htmlFor="minimunLevel" className="col-md-6 col-form-label">
                        <FormattedMessage id="project.global.fields.minimunLevel"/>
                        :&nbsp;{minimunLevel}
                    </label>
                </div>
                <div htmlFor="maximunLevel" className="col-xs-6">
                    <label htmlFor="maximunLevel" className="col-md-6 col-form-label">
                        <FormattedMessage id="project.global.fields.maximunLevel"/>
                        :&nbsp;{maximunLevel}
                    </label>
                </div>
                <div htmlFor="initDate" className="col-xs-8">
                    <label htmlFor="initDate" className="col-md-12 col-form-label">
                        <FormattedMessage id="project.global.fields.initDate"/>
                        :<FormattedDate value={initDate} key={initDate.getTime()}/>
                        &nbsp;<FormattedTime value={initDate} />
                    </label>
                </div>
                <div htmlFor="finalDate" className="col-xs-8">
                    <label htmlFor="finalDate" className="col-md-12 col-form-label">
                        <FormattedMessage id="project.global.fields.finalDate"/>
                        :<FormattedDate value={finalDate} key={finalDate.getTime()}/>
                        &nbsp;<FormattedTime value={finalDate} />
                    </label>
                </div>
            </div>
            <div className="p-2">
                <div htmlFor="typeGame" className="col-xs-6">
                    <label htmlFor="typeGame" className="col-md-6 col-form-label">
                        <FormattedMessage id="project.global.fields.typeGame"/>
                        :&nbsp;{typeGame}
                    </label>
                </div>
                <div htmlFor="numPlayers" className="col-xs-6">
                    <label htmlFor="numPlayers" className="col-md-9 col-form-label">
                        <FormattedMessage id="project.global.fields.numPlayers"/>
                        :&nbsp;{numPlayers}
                    </label>
                </div>
                <Link to={`/games/game-details/${gameId}`}>
                    <button type="submit" className="btn btn-primary">
                        <FormattedMessage id="project.global.fields.showDetails"/> 
                    </button>
                </Link>
            </div>
        </div>
    );

}

GameLink.propTypes = {
    gameId: PropTypes.number.isRequired,
    maximunLevel: PropTypes.number.isRequired,
    minimunLevel: PropTypes.number.isRequired,
    millisInitDate: PropTypes.number.isRequired,
    millisFinalDate: PropTypes.number.isRequired,
    typeGame: PropTypes.string.isRequired,
    numPlayers: PropTypes.number.isRequired
};

export default GameLink; 