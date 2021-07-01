import * as React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {FormattedTime} from 'react-intl';
import Paper from '@material-ui/core/Paper';
import {
  ViewState, GroupingState, IntegratedGrouping
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  DateNavigator,
  Appointments,
  Toolbar,
  GroupingPanel,
  DayView,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import * as selectors from '../selectors';
import * as selectorsField from '../../field/selectors';
import { useSelector } from 'react-redux';


const GameCalendar = () => {

    const games = useSelector(selectors.getGamesDate);
    const fields = useSelector(selectorsField.getAllFields);
    const gamesObtained = games ? games.map((game) => 
      Object.assign(game, {
        id: game.gameId,
        startDate: new Date(game.millisInitDate),
        endDate: new Date(game.millisFinalDate),
        fields: [game.fieldId]
      })
    ) : [];
    const data = gamesObtained;
    const locale = 'es-ES';
    const today = new Date();
    const dayString = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const resources = [{
        fieldName: 'fields',
        title: 'Fields',
        instances: fields ? fields.map((field) => Object.assign(field, {
          text: field.name,
          id: field.fieldId
        })) : [{text: 'No Field'}],
        allowMultiple: true,
      }];

    const grouping = [ {
      resourceName: 'fields',
    }];

    const Appointment = ({
      children, data, style, ...restProps
    }) => (
    <Appointments.Appointment
        {...restProps}
    >
        {<div className="text-center">
        <div>
            <div>
            <h4>Level:{data.minimunLevel}-{data.maximunLevel}</h4>
            <h4><FormattedTime value={data.startDate} key={data.startDate.getTime()}/>
            -<FormattedTime value={data.endDate} key={data.endDate.getTime()}/></h4>
            </div>
            <Link to={`/games/game-details/${data.id}`}>
                        <button type="submit" className="btn btn-primary">
                            <FormattedMessage id="project.global.fields.showDetails"/> 
                        </button>
                    </Link>
        </div>
        </div>}
    </Appointments.Appointment>
    );

    return (
        <Paper>
          <Scheduler
            data={data}
            locale={locale}
          >
            <ViewState
              defaultCurrentDate={dayString}
              
            />
            <GroupingState
              grouping={grouping}
            />
  
            <DayView
              startDayHour={10}
              endDayHour={23}
              intervalCount={1}
            />
            <Toolbar />
            <DateNavigator />
            <Appointments appointmentComponent={Appointment}/>
            <Resources
              data={resources}
              mainResourceName="fields"
            />
  
            <IntegratedGrouping />
            <AppointmentForm />
            <GroupingPanel />
          </Scheduler>
        </Paper>
      );

}

export default GameCalendar;