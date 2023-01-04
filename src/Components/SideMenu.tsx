import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myData from '../data/menu.json';

export interface ISideMenuData {
    data: ISideMenuDataItem[];
}

export interface ISideMenuDataItem {
    title: string;
    url: string;
}

const SideMenu: React.FunctionComponent = (): React.ReactElement => {
    const [menu, setMenu] = useState<ISideMenuData>(myData);

    useEffect(() => {
        setMenu(myData);
    }, []);
    return(
        <React.Fragment>
        <div>
            Menu options:
        </div>
        {
            menu.data.map((data: ISideMenuDataItem, index: number) => (
                <div key={index}>
                    <Link to={data.url}>
                        <button type="button" className="button">{data.title}</button>
                    </Link>
                </div>
            ))
        }
        </React.Fragment>
    );
}

export default SideMenu;