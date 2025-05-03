import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { listVendors, materialList, singleCatalogueDetail, vendorDetail, vendorReviewList } from '../hooks/local/reducer';

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

  export function useCatalogueDetail(catalogueId) {
    const [catalogueDetail, setCatalogueDetail] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchSingleCatalogueDetail = async() => {
        try {
            const {payload} = await dispatch(singleCatalogueDetail(catalogueId));
            setCatalogueDetail(payload.data);
            // console.log(payload.data)
        }
        catch(e){}
      }
      fetchSingleCatalogueDetail();
    }, [dispatch, catalogueId]);
  
    return catalogueDetail;
  }

  export function useMaterialList() {
    const [listMaterial, setListMaterial] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchMaterialList = async() => {
        try {
            const {payload} = await dispatch(materialList());
            setListMaterial(payload.data);
        }
        catch(e){}
      }
      fetchMaterialList();
    }, [dispatch]);
  
    return listMaterial;
  }