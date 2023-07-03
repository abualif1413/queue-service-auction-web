/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../../context';
import { BasicResponse, BrowseItemsResponseSuccessMetadata, Item } from '../../../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { LocalTable } from '../../mollecules';
import { useUserAuth } from '../../../hooks';
import { APP_KEYS, HTTP_REQUEST_ENDPOINT, HTTP_REQUEST_METHOD, serviceHit } from '../../../utils';
import { Button } from '@mui/material';
import { BidsModal } from '../../modals';
import { useBidModal } from '../../../hooks/modals/bid-modals';

export const BrowseItems = () => {
  const { dashboardTitle, dashboardBreadcrumb } = useContext(DashboardContext);
  const [itemData, setItemData] = useState<Item[]>([]);
  const { userData } = useUserAuth();
  const { open, item, isOpen, close } = useBidModal();

  useEffect(() => {
    const breadcrumbData = [{ text: 'Dashboard', href: '/' }, { text: 'Browse items' }];
    dashboardBreadcrumb.set(breadcrumbData);
    dashboardTitle.set('Browse Items');

    const response = serviceHit<unknown, BasicResponse<BrowseItemsResponseSuccessMetadata>>(
      HTTP_REQUEST_ENDPOINT.BROWSE_LIST,
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
      accessorKey: 'timeWindow',
    },
    {
      header: 'Owner',
      accessorKey: 'user.name',
    },
    {
      header: '',
      accessorKey: 'id',
      size: 300,
      cell: (value) => {
        return (
          <Button variant='contained' onClick={onBidButtonClick(value.row.original)}>
            Bid
          </Button>
        );
      },
    },
  ];

  const onBidButtonClick = (item: Item) => {
    return () => {
      open(item);
    };
  };

  return (
    <>
      <LocalTable columns={columns} data={itemData} />
      {item && <BidsModal open={isOpen} item={item} onClose={close} />}
    </>
  );
};
