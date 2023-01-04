import React, { useState } from 'react';
import driverJson from '../data/drivers.json';

interface IDrivers {
    data: IDriverData[];
}
interface IDriverData {
    driverID: number;
    surname: string;
    forename: string;
    vehicleRegistration: string;
    traces: IDriverDataTrace[];
}

interface IDriverDataTrace {
    date: string;
    activity: IDriverDataActivity[];
}

interface IDriverDataActivity {
    startTime: string;
    type: string;
    duration: number;
}

interface IDay {
    name: string;
    value: string;
    order: number;
}

interface IActivity {
    type: string;
    duration: number;
}

const DriverMenu: React.FunctionComponent = (): React.ReactElement => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [driverData] = useState<IDrivers>(driverJson);
    const [driverDataSearched, setDriverDataSearched] = useState<IDrivers>(driverJson);

    const daysOfWeek: IDay[] = [        
        {
            name: 'Sun',
            value: 'Sunday',
            order: 7
        },
        {
            name: 'Mon',
            value: 'Monday',
            order: 1
        },
        {
            name: 'Tue',
            value: 'Tuesday',
            order: 2
        },
        {
            name: 'Wed',
            value: 'Wednesday',
            order: 3
        },
        {
            name: 'Thu',
            value: 'Thursday',
            order: 4
        },
        {
            name: 'Fri',
            value: 'Friday',
            order: 5
        },
        {
            name: 'Sat',
            value: 'Saturday',
            order: 6
        }
    ]

    const daysOfWeekDeepCopy: IDay[] = [...daysOfWeek]; // Create deep copy to prevent mutation during sort operation later on in the file

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchedTerm: string = e.currentTarget.value;

        let driverDataCopy: IDrivers = {...driverData};

        const driverDataCopyData: IDriverData[] = driverDataCopy.data.filter(
            x => x.vehicleRegistration.toLowerCase().includes(searchedTerm) || x.forename.toLowerCase().includes(searchedTerm) || x.surname.toLowerCase().includes(searchedTerm))

        driverDataCopy.data = driverDataCopyData;

        setDriverDataSearched(driverDataCopy);
        setSearchTerm(e.currentTarget.value);
    }

    const findDays = (driver: IDriverData): string[] => {
        let foundDays: string[] = [];
        driver.traces.forEach((trace: IDriverDataTrace) => {
            foundDays.push(daysOfWeek[new Date(trace.date).getDay()].value);
        });

        foundDays = foundDays.filter((item, index) => foundDays.indexOf(item) === index); // Remove any duplicates in case we span more than one week

        return foundDays;
    }

    const findDistinctActivities = (driver: IDriverData): IActivity[] => {
        const activities: IActivity[] = [];

        driver.traces.forEach(trace => {
            trace.activity.forEach(activity => {
                if (activities.filter(x => x.type === activity.type).length > 0) {
                    const index: number = activities.findIndex(x => x.type === activity.type);

                    activities[index].duration += activity.duration;
                }
                else {
                    activities.push({
                        type: activity.type,
                        duration: activity.duration
                    })
                }               
            });
        })

        return activities;
    }

    return (
        <React.Fragment>
            <label htmlFor={'searchField'}>Search: </label>
            <input type={'text'} name={'searchField'} value={searchTerm} onChange={(e) => handleSearchChange(e)} />
            {
                (driverDataSearched as IDrivers).data.map((driver: IDriverData, index: number) => {                     
                    return (
                        <div key={index}>
                            <div className='driverMenuContainer'>
                                <p className='driverInfo'>{driver.forename} {driver.surname}</p>
                                <p className='driverInfo'>{driver.vehicleRegistration}</p>
                                <div className='driverInfo'>
                                    <p className='driverInfo'>Total Duration: {driver.traces.reduce((a, b) => a + b.activity?.reduce((a2, b2) => a2 = a2 + b2.duration, 0), 0)}</p>
                                    {
                                        findDistinctActivities(driver).map((activity: IActivity, index: number) => (
                                            <p key={index}>Total {activity.type}: {activity.duration}</p>
                                        ))
                                    }
                                </div>                                    
                                <div className='driverMenuDayContainer' key={index}>  
                                    {
                                        daysOfWeekDeepCopy.sort((a, b) => a.order - b.order).map((day: IDay, index: number) => {
                                            const isDayDriven = daysOfWeekDeepCopy.filter(x => findDays(driver).includes(day.value)).length > 0;

                                            return (
                                                <React.Fragment key={index}>
                                                <div className='dayOfWeekContainer' key={index}>
                                                    <div>{day.name}</div>
                                                    <div className={`dayOfWeek ${isDayDriven ? 'driven' : ''}`}></div>
                                                </div>
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
}

export default DriverMenu;