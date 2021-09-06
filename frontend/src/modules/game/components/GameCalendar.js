import * as React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
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
import { grey } from '@material-ui/core/colors';


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
          id: field.fieldId,
          color : grey
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
        {<div className="w-100">
          <div className="text-center d-flex align-content-center flex-wrap">
              <div>
                {data.users && data.users.length === 4 && <label className="bg-danger">COMPLETED</label>}
                <h6>{data.minimunLevel}-{data.maximunLevel}</h6>
                <Link className="float-right" to={`/games/game-details/${data.id}`}>
                  <h6 className="text-primary float-right"><FormattedMessage id="project.global.fields.showDetails"/>-></h6>
                </Link>
              </div>
                  
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
              cellDuration={30}
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