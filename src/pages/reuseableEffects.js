import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { listVendors, vendorDetail, vendorReviewList } from '../hooks/local/reducer';

export function useVendorList() {
    const [listVendor, setListVendor] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchvendorList = async() => {
        try {
            const {payload} = await dispatch(listVendors());
            setListVendor(payload.data);
        }
        catch(e){}
      }
      fetchvendorList();
    }, [dispatch]);
  
    return listVendor;
  }

export function useVendorDetail(vendorID) {
    const [vendordetail, setvendordetail] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchvendordetail = async() => {
        try {
            const {payload} = await dispatch(vendorDetail(vendorID));
            setvendordetail(payload.data);
        }
        catch(e){}
      }
      fetchvendordetail();
    }, [dispatch, vendorID]);
  
    return vendordetail;
  }

export function useVendorReviews(vendorID) {
    const [vendorReviews, setvendorReviews] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchvendorReviews = async() => {
        try {
            const {payload} = await dispatch(vendorReviewList(vendorID));
            setvendorReviews(payload.data);
        }
        catch(e){}
      }
      fetchvendorReviews();
    }, [dispatch, vendorID]);
  
    return vendorReviews;
  }