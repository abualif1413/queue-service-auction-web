/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { APP_KEYS, HTTP_REQUEST_ENDPOINT, HTTP_REQUEST_METHOD, serviceHit } from '../../utils';
import { BasicResponse, Bid, Item, PlaceBidRequest, User } from '../../interfaces';
import { useUserAuth } from '../user-auth';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';

export const usePlaceBid = (item: Item) => {
  const { userData } = useUserAuth();
  const [allBids, setAllBids] = useState<(Bid & { user: User })[] | null>(null);
  const [minBidPrice, setMinBidPrice] = useState(item.price);
  const current = new Date();
  const formik = useFormik({
    initialValues: {
      bid: 0,
    },
    validationSchema: yup.object({
      bid: yup.number().required('Bid should be a number').moreThan(minBidPrice),
    }),
    onSubmit: (values) => {
      void (async () => {
        await serviceHit<PlaceBidRequest, unknown>(
          HTTP_REQUEST_ENDPOINT.PLACE_BID,
          HTTP_REQUEST_METHOD.POST,
          {
            itemId: item.id,
            price: values.bid,
            bidTime: current,
          },
          {
            [APP_KEYS.USER_AUTH_HEADER]: userData.authId,
          }
        );
        formik.resetForm();
        fetchAllBids().then((bids) => setAllBids(bids));
      })();
    },
  });

  const fetchAllBids = useCallback(async () => {
    const response = await serviceHit<null, BasicResponse<(Bid & { user: User })[]>>(
      `${HTTP_REQUEST_ENDPOINT.ALL_BIDS}/${item.id}`,
      HTTP_REQUEST_METHOD.GET
    );
    return response.metadata;
  }, [item.id]);

  useEffect(() => {
    formik.setTouched({});
    formik.resetForm();
    fetchAllBids().then((bids) => setAllBids(bids));
  }, [fetchAllBids]);

  useEffect(() => {
    if (allBids && allBids.length > 0) setMinBidPrice(allBids[0].price);
    else setMinBidPrice(item.price);
  }, [allBids, item.price]);

  return {
    formik,
    allBids,
    minBidPrice,
  };
};
