import React, { useState } from 'react';
import {FormattedMessage} from 'react-intl';

const ScheduleList = (user) => {

    const schedulesExample = [
        {
            scheduleId: 1,
            day: "Lunes",
            initHour: "13:00",
            finalHour: "16:00"
        },
        {
            scheduleId: 2,
            day: "Lunes",
            initHour: "13:00",
            finalHour: "16:00"
        },
        {
            scheduleId: 3,
            day: "Lunes",
            initHour: "13:00",
            finalHour: "16:00"
        }
    ]

    const [schedules, setSchedules] = useState(schedulesExample);
    const [day, setDay] = useState('');
    const [initHour, setInitHour] = useState('');
    const [finalHour, setFinalHour] = useState('');
    const [showAdd, setShowAdd] = useState(false);

    let scheduleId = 5;

    const handleAdd = () => {
        setShowAdd(!showAdd)
    }

    const addSchedule = () => {
        scheduleId = scheduleId + 1;
        schedules.push(
            {
                scheduleId: scheduleId,
                day: day,
                initHour: initHour,
                finalHour: finalHour
            }
        );
        setSchedules(schedules);
        console.log(schedules);
    }

    const onChangeSelect = (value) => {
        setDay(value);
    }

    if(!schedules){
        return null;
    }

    return (

        schedules != null ? 

        <div>
            {schedules.length === 0 ?
                <div>
                    <div className="alert alert-info" role="alert">
                        <FormattedMessage id='project.users.getSchedules.noSchedules'/>
                    </div>
                </div>
            : 
            undefined}
                <button type="button" onClick={handleAdd}>Añadir</button>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">
                                <FormattedMessage id='project.global.fields.day'/>
                            </th>
                            <th scope="col">
                                <FormattedMessage id='project.global.fields.initHour'/>
                            </th>
                            <th scope="col">
                                <FormattedMessage id='project.global.fields.finalHour'/>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {schedules.map(schedule => 
                            <tr key={schedule.scheduleId}>
                                <td>
                                    <label className="col-md-6 col-form-label">
                                        {schedule.day}
                                    </label>
                                </td>
                                <td>
                                    <label className="col-md-6 col-form-label">
                                        {schedule.initHour}
                                    </label>
                                </td>
                                <td>
                                    <label className="col-md-6 col-form-label">
                                        {schedule.finalHour}
                                    </label>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
                {showAdd ? 
                    <div>
                        <select defaultValue={day} onChange={e => onChangeSelect(e.target.value)}>
                            <option value="Monday">Lunes</option>
                            <option value="Tuesday">Martes</option>
                            <option value="Miercoles">Miercoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
                            <option value="Sabado">Sabado</option>
                            <option value="Domingo">Domingo</option>
                        </select>
                        <input id="initHour" type="text" onChange={setInitHour} placeholder="InitHour"/>
                        <input id="finalHour" type="text" onChange={setFinalHour} placeholder="FinalHour"/>
                        <button type="button" onClick={addSchedule}>Añadir horario</button>
                    </div>
                    : undefined}

        </div>
        : 
        <table className="table table-striped table-hover"></table>

    );

}

export default ScheduleList;