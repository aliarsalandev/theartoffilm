import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { detailsUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import ShowCase from '../components/ShowCase';
import { useNavigate } from 'react-router-dom';

export default function SellersScreen(props) {
  const params = useParams();
  const { id: sellerId } = params;


  const [currentProduct, setCurrentProduct] = React.useState(null);

  const { loading, error, users } = useSelector((state) => state.userList);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
    dispatch(listUsers())
  }, [dispatch, sellerId]);
  const navigate = useNavigate();

  const addToCartHandler = () => {
    navigate(`/cart/${currentProduct._id}?qty=1}`);
  };
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          users.map((user) => user.isSeller && <ul className="card card-body">
            <li>
              <div className="row start">

                <Link to={`/seller/${user._id}`}>
                  <div className="p-1">
                    <img
                      className="small"
                      src={user.seller.logo}
                      alt={user.seller.name}
                    ></img>
                  </div>
                </Link>
                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              ></Rating>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>)
        )}
      </div>

    </div>
  );
}
