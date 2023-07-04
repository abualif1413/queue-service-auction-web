/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../../context';
import { BasicResponse, BidList, MyBidsSuccessResponseMetadata } from '../../../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { LocalTable } from '../../mollecules';
import { useUserAuth } from '../../../hooks';
import { APP_KEYS, HTTP_REQUEST_ENDPOINT, HTTP_REQUEST_METHOD, serviceHit } from '../../../utils';
import { format } from 'date-fns';

export const MyBids = () => {
  const { dashboardTitle, dashboardBreadcrumb } = useContext(DashboardContext);
  const [bidData, setBidData] = useState<BidList[]>([]);
  const { userData } = useUserAuth();

  useEffect(() => {
    const breadcrumbData = [{ text: 'Dashboard', href: '/' }, { text: 'My bids' }];
    dashboardBreadcrumb.set(breadcrumbData);
    dashboardTitle.set('My Bids');

    const response = serviceHit<unknown, BasicResponse<MyBidsSuccessResponseMetadata>>(
      HTTP_REQUEST_ENDPOINT.MY_BIDS,
      HTTP_REQUEST_METHOD.GET,
      null,
      {
        [APP_KEYS.USER_AUTH_HEADER]: userData.authId,
      }
    );

    response.then((resp) => {
      setBidData(resp.metadata.bids);
    });
  }, []);

  const columns: ColumnDef<BidList>[] = [
    {
      header: 'Name',
      accessorKey: 'item.name',
    },
    {
      header: 'Price',
      accessorKey: 'item.price',
    },
    {
      header: 'My Price',
      accessorKey: 'price',
    },
    {
      header: 'Time Window',
      accessorKey: 'item.timeWindow',
      cell: (value) => {
        const theDate = new Date(value.row.original.item.timeWindow);
        return format(theDate, 'MM/dd/yyyy HH:mm');
      },
    },
    {
      header: 'Owner',
      accessorKey: 'user.name',
    },
  ];

  return (
    <>
      <LocalTable columns={columns} data={bidData} />
    </>
  );
};
