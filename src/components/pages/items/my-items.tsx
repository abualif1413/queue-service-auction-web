/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../../context';
import { BasicResponse, Item, MyItemsResponseSuccessMetadata } from '../../../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { LocalTable } from '../../mollecules';
import { useUserAuth } from '../../../hooks';
import { APP_KEYS, HTTP_REQUEST_ENDPOINT, HTTP_REQUEST_METHOD, serviceHit } from '../../../utils';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const MyItems = () => {
  const { dashboardTitle, dashboardBreadcrumb } = useContext(DashboardContext);
  const [itemData, setItemData] = useState<Item[]>([]);
  const { userData } = useUserAuth();

  useEffect(() => {
    const breadcrumbData = [{ text: 'Dashboard', href: '/' }, { text: 'My items' }];
    dashboardBreadcrumb.set(breadcrumbData);
    dashboardTitle.set('My Items');

    const response = serviceHit<unknown, BasicResponse<MyItemsResponseSuccessMetadata>>(
      HTTP_REQUEST_ENDPOINT.MY_ITEM_LIST,
      HTTP_REQUEST_METHOD.GET,
      null,
      {
        [APP_KEYS.USER_AUTH_HEADER]: userData.authId,
      }
    );

    response.then((resp) => {
      setItemData(resp.metadata.items);
    });
  }, []);

  const columns: ColumnDef<Item>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Price',
      accessorKey: 'price',
    },
    {
      header: 'Time Window',
      accessorKey: 'item.timeWindow',
      cell: (value) => {
        const theDate = new Date(value.row.original.timeWindow);
        return format(theDate, 'MM/dd/yyyy HH:mm');
      },
    },
  ];

  return (
    <>
      <Link to='/my-items/add'>
        <Button variant='outlined'>Add new item</Button>
      </Link>
      <LocalTable columns={columns} data={itemData} />
    </>
  );
};
