import * as React from 'react';
import {Link} from 'react-router-dom';
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

    const obtainHour = (initMillis, finalMillis) => {
      const initDate = new Date(initMillis);
      const initMins = ('0'+ initDate.getMinutes()).slice(-2);
      const finalDate = new Date(finalMillis);
      const finalMins = ('0'+ finalDate.getMinutes()).slice(-2);
      return initDate.getHours() + ":" + initMins + "-" + finalDate.getHours() + ":" + finalMins;
    }

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
        {
          <Link to={`/games/game-details/${data.id}`}>
            <div className="text-center align-content-center flex-wrap">
              <div>
                <label>{data.minimunLevel}-{data.maximunLevel}</label>&nbsp;&nbsp;   
                <label>{obtainHour(data.millisInitDate, data.millisFinalDate)}</label>
                {data.users && data.users.length === 4 && <label className="bg-danger">COMPLETED</label>}
              </div>
                  
            </div>
          </Link>
        }
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