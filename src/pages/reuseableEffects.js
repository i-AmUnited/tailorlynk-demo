import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { chatMessages, customerCartList, getOrder, listChat, listVendors, materialList, savedItemsList, singleCatalogueDetail, userMeasurements, userProfileDetails, userShippingAddress, vendorDetail, vendorReviewList } from '../hooks/local/reducer';

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

  export function useCustomerCartList() {
    const [customerCart, setCustomerCart] = useState([])
    const dispatch = useDispatch();
    const userSessionData = useSelector((state) => state.user.userSession);

    useEffect(() => {
      const fetchCustomerCart = async() => {
        try {
            const {payload} = await dispatch(customerCartList());
            setCustomerCart(payload.data);
            // console.log(payload)
        }
        catch(e){}
      }
      // fetchCustomerCart();
      if (userSessionData) {
      fetchCustomerCart();
    } else {
      setCustomerCart([]);
    }
    }, [dispatch, userSessionData]);
  
    return customerCart;
  }

  export function useProfile() {
    const [profileDetails, setProfileDetails] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchProfileDetails = async() => {
        try {
            const {payload} = await dispatch(userProfileDetails());
            setProfileDetails(payload.data);
            // console.log(payload)
        }
        catch(e){}
      }
      fetchProfileDetails();
    }, [dispatch]);
  
    return profileDetails;
  }

  export function useMeasurements() {
    const [measurementDetail, setMeasurementDetail] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchMeasurementDetails = async() => {
        try {
            const {payload} = await dispatch(userMeasurements());
            setMeasurementDetail(payload.data);
        }
        catch(e){}
      }
      fetchMeasurementDetails();
    }, [dispatch]);
  
    return measurementDetail;
  }

  export function useShippingAddress() {
    const [shippingAddress, setShippingAddress] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchShippingAddress = async() => {
        try {
            const {payload} = await dispatch(userShippingAddress());
            setShippingAddress(payload.data);
        }
        catch(e){}
      }
      fetchShippingAddress();
    }, [dispatch]);
  
    return shippingAddress;
  }

  export function useListSavedItems() {
    const [wishList, setWishList] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchWishList = async() => {
        try {
            const {payload} = await dispatch(savedItemsList());
            setWishList(payload.data);
        }
        catch(e){}
      }
      fetchWishList();
    }, [dispatch]);
  
    return wishList;
  }

  export function useListCustomerOrders() {
    const [customerOrders, setCustomerOrders] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchCustomerOrders = async() => {
        try {
            const {payload} = await dispatch(getOrder());
            setCustomerOrders(payload.data);
        }
        catch(e){}
      }
      fetchCustomerOrders();
    }, [dispatch]);
  
    return customerOrders;
  }

  export function useListChat() {
    const [chatList, setChatList] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchChatList = async() => {
        try {
            const {payload} = await dispatch(listChat());
            setChatList(payload.data);
        }
        catch(e){}
      }
      fetchChatList();
    }, [dispatch]);
  
    return chatList;
  }

  export function useChatMessages(vendorID) {
    const [chats, setChats] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchChatMessages = async() => {
        try {
            const {payload} = await dispatch(chatMessages(vendorID));
            setChats(payload.data);
            // console.log(payload.data)
        }
        catch(e){}
      }
      fetchChatMessages();
    }, [dispatch, vendorID]);
  
    return chats;
  }