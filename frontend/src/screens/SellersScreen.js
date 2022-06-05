import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listSellers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function SellersScreen(props) {
  const params = useParams();
  const { id: sellerId } = params;
  const { loading, error, sellers } = useSelector((state) => state.sellerList);

  // const [currentProduct, setCurrentProduct] = React.useState(null);
  // const navigate = useNavigate();

  // const addToCartHandler = () => {
  //   navigate(`/cart/${currentProduct._id}?qty=1}`);
  // };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listSellers());
  }, [dispatch, sellerId]);

  return (
    <div className="">
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          sellers.map((seller) => (
            <ul className="card card-body">
              <li>
                <div className="row start">
                  <Link to={`/seller/${seller._id}`}>
                    <div className="p-1">
                      <img
                        className="small"
                        src={seller.seller.logo}
                        alt={seller.seller.name}
                      ></img>
                    </div>
                  </Link>
                  <div className="p-1">
                    <Link to={`/seller/${seller._id}`}>
                      <h1>{seller.seller.name}</h1>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Rating
                  rating={seller.seller.rating}
                  numReviews={seller.seller.numReviews}
                ></Rating>
              </li>
              <li>
                <a href={`mailto:${seller.email}`}>Contact Seller</a>
              </li>
              <li>{seller.seller.description}</li>
            </ul>
          ))
        )}
      </div>
    </div>
  );
}