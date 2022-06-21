import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  createProductArtist,
  createProductCasts,
  createProductDirectors,
  detailsProduct,
  listProductArtists,
  listProductCasts,
  listProductDirectors,
  updateProduct,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import Select from "react-select";
import SellerSidebar from "../components/SellerSidebar";
import data from "../data";

export default function ProductEditScreen() {
  const params = useParams();
  const { id: productId } = params;
  const [name, setName] = useState("");
  // const [brand, setBrand] = useState('');
  // const [category, setCategory] = useState('');
  const [origin, setOrigin] = useState("");
  const [year, setYear] = useState(1930);
  const [format, setFormat] = useState("");
  const productDirectorsRef = useRef([]);
  const productCastsRef = useRef([]);
  const productArtistsRef = useRef([]);
  const [condition, setCondition] = useState("");
  const [rolledFolded, setRolledFolded] = useState("");
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [forSale, setForSale] = useState(false);
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const directorCreateDetails = useSelector((state) => state.directorCreate);
  const { director } = directorCreateDetails;

  const castsCreateDetails = useSelector((state) => state.castCreate);
  const { cast } = castsCreateDetails;

  const artistCreateDetails = useSelector((state) => state.artistCreate);
  const { artist } = artistCreateDetails;

  const productUpdate = useSelector((state) => state.productUpdate);

  const { directors } = useSelector((state) => state.directorList);
  const { casts } = useSelector((state) => state.castList);
  const { artists } = useSelector((state) => state.artistList);

  // useEffect(() => {
  // }, []);

  // const newDirectorData = useSelector((state) => state.directorCreate);
  // const { director } = newDirectorData;

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDirectors());
    dispatch(listProductCasts());
    dispatch(listProductArtists());

    productDirectorsRef.current = product?.directors ?? [];
    productCastsRef.current = product?.casts ?? [];
    productArtistsRef.current = product?.artists ?? [];

    if (successUpdate) {
      window.scrollTo(0, 0);
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setImages(product.images ?? []);
      // setBrand(product.brand);
      // setCategory(product.category);
      // setDirector(product.director);
      // setCast(product.cast);
      // setArtist(product.artist);
      setOrigin(product.origin);
      setFormat(product.format);
      setCondition(product.condition);
      setRolledFolded(product.rolledFolded);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setVisible(product.visible);
      setForSale(product.forSale);
      setYear(product.year);
    }
  }, [dispatch, product, productId, successUpdate]);

  useEffect(() => {
    if (director) {
      productDirectorsRef.current = [...productDirectorsRef.current, director];
      console.log(director);
      console.log(productDirectorsRef.current);
    }
    // if (director !== undefined || director !== {})
    //   productDirectorsRef.current = [...productDirectorsRef.current, director];
  }, [director]);

  useEffect(() => {
    if (cast) {
      productCastsRef.current = [...productCastsRef.current, cast];
      console.log(cast);
      console.log(productCastsRef.current);
    }
  }, [cast]);

  useEffect(() => {
    if (artist) {
      productArtistsRef.current = [...productArtistsRef.current, artist];
      console.log(artist);
      console.log(productCastsRef);
    }
  }, [artist]);
  const submitHandler = (e) => {
    e.preventDefault();

    const the_directors = productDirectorsRef.current.map(
      (director) => director._id
    );
    const the_casts = productCastsRef.current.map((cast) => cast._id);
    const the_artists = productArtistsRef.current.map((artist) => artist._id);

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        salePrice,
        image,
        images,
        directors: the_directors,
        casts: the_casts,
        artists: the_artists,
        origin,
        year,
        format,
        condition,
        rolledFolded,
        countInStock,
        description,
        visible,
        forSale,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e, forImages = false) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log("image upload data", data);
      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      setLoadingUpload(false);
    } catch (err) {
      console.log(err);
      setErrorUpload(err);
      dispatch({ type: "UPLOAD_FAIL", payload: err });
    }
  };

  const deleteFileHandler = async (fileName) => {
    setImages(images.filter((x) => x !== fileName));
  };

  return (
    <div className={"row top"}>
      <div className="col-1">
        <SellerSidebar />
      </div>
      <div className={"col-3"}>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Edit Product {productId}</h1>
            <div className="min-30">
              {product && (
                <Link to={`/product/${product._id}`} target="_blank">
                  View Product
                </Link>
              )}
            </div>
          </div>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div className={"featured-image"}>
                <label htmlFor="image">Feature ImageImage</label>
                <img src={image} alt="product" width={100} height={100} />

                <div className={"hide"}>
                  <label htmlFor="image">Image</label>
                  <input
                    id="image"
                    type="text"
                    placeholder="Enter image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className={"attachement-images"}>
                <input
                  type="file"
                  id="imageFile"
                  label="Choose Image"
                  onChange={uploadFileHandler}
                ></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                  <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
                <div className="mt-3"></div>
              </div>

              <div>
                <div className={"hide"}>
                  <label htmlFor="image">Images</label>
                  <input
                    id="image"
                    type="text"
                    disabled={true}
                    value={image}
                  ></input>
                </div>
              </div>
              <div className={"col start"}>
                {images?.length === 0 && <MessageBox>No image</MessageBox>}
                <ul className={"row start"}>
                  {images?.map((url) => (
                    <li key={url}>
                      <div className="row start top">
                        <img src={url} alt="product" width={100} height={100} />
                        <button onClick={() => deleteFileHandler(url)}>
                          <i className="fa fa-times-circle"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-3"></div>
              </div>
              <div>
                <label htmlFor="images">Poster Images</label>
                <input
                  type="file"
                  id="images"
                  label="Choose Image"
                  onChange={(e) => uploadFileHandler(e, true)}
                ></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                  <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
              </div>

              <div>
                <label htmlFor="directors">Directors</label>
                <MultiSelectDropdown
                  placeholder={"Select Director"}
                  defaultValue={product.directors?.map((director) => ({
                    value: director,
                    label: director.name,
                  }))}
                  options={directors?.map((director) => ({
                    value: director,
                    label: director.name,
                  }))}
                  onChange={(__directors, { action }) => {
                    switch (action) {
                      case "create-option":
                        const _director = {
                          name: __directors[__directors.length - 1].value,
                        };
                        dispatch(createProductDirectors(_director));
                        break;
                      case "remove-value":
                        break;
                      case "select-option":
                        productDirectorsRef.current = [
                          ...productDirectorsRef.current,
                          __directors[__directors.length - 1].value,
                        ];
                        break;
                      default:
                        break;
                    }
                  }}
                />
              </div>
              <div>
                <label htmlFor="casts">Casts</label>
                <MultiSelectDropdown
                  placeholder={"Select Cast"}
                  defaultValue={product.casts?.map((cast) => ({
                    value: cast,
                    label: cast.name,
                  }))}
                  options={casts?.map((cast) => ({
                    value: cast,
                    label: cast.name,
                  }))}
                  onChange={(__casts, { action }) => {
                    switch (action) {
                      case "create-option":
                        const _cast = {
                          name: __casts[__casts.length - 1].value,
                        };
                        dispatch(createProductCasts(_cast));
                        break;
                      case "remove-value":
                        break;
                      case "select-option":
                        productCastsRef.current = [
                          ...productCastsRef.current,
                          __casts[__casts.length - 1].value,
                        ];
                        break;
                      default:
                        break;
                    }
                  }}
                />
              </div>

              <div>
                <label htmlFor="directors">Artists</label>
                <MultiSelectDropdown
                  placeholder={"Select Artist"}
                  defaultValue={product.artists?.map((artist) => ({
                    value: artist,
                    label: artist.name,
                  }))}
                  options={artists?.map((artist) => ({
                    value: artist,
                    label: artist.name,
                  }))}
                  onChange={(__artists, { action }) => {
                    switch (action) {
                      case "create-option":
                        const _artist = {
                          name: __artists[__artists.length - 1].value,
                        };
                        dispatch(createProductArtist(_artist));
                        break;
                      case "remove-value":
                        break;
                      case "select-option":
                        productArtistsRef.current = [
                          ...productArtistsRef.current,
                          __artists[__artists.length - 1].value,
                        ];
                        break;
                      default:
                        break;
                    }
                  }}
                />
              </div>

              <div>
                <label htmlFor="origin">Origin</label>
                <Select
                  className="multi-select"
                  placeholder={"Select Country"}
                  defaultValue={{
                    value: product.origin,
                    label: product.origin,
                  }}
                  options={data.origins?.map((country) => ({
                    value: country.code,
                    label: country.name,
                  }))}
                  onChange={(__origin) => {
                    setOrigin(__origin.value);
                  }}
                />
              </div>

              <div>
                <label htmlFor="year">Year</label>
                <Select
                  className="multi-select"
                  placeholder={"Select Year"}
                  defaultValue={{ value: product.year, label: product.year }}
                  options={Array.from(
                    Array(new Date().getFullYear() - 1929).keys()
                  )?.map((year) => ({
                    value: year + 1930,
                    label: year + 1930,
                  }))}
                  onChange={(__year) => {
                    setYear(+__year.value);
                  }}
                />
              </div>

              <div>
                <label htmlFor="format">Format</label>

                <Select
                  className="multi-select"
                  placeholder={"Select Format"}
                  defaultValue={{
                    value: product.format,
                    label: product.format,
                  }}
                  options={data.formats}
                  onChange={(__format) => {
                    setFormat(__format.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="condition">Condition</label>
                <Select
                  className="multi-select"
                  placeholder={"Select Condition"}
                  defaultValue={{
                    value: product.condition,
                    label: product.condition,
                  }}
                  options={data.conditions}
                  onChange={(__condition) => {
                    setCondition(__condition.value);
                  }}
                />
              </div>

              <div>
                <label htmlFor="rolledFolded">Rolled / Folded</label>
                <Select
                  className="multi-select"
                  placeholder={"Select Rolled/Folded"}
                  defaultValue={{
                    value: product.rolledFolded,
                    label: product.rolledFolded,
                  }}
                  options={data.rolledFolded}
                  onChange={(__rolledFolded) => {
                    setRolledFolded(__rolledFolded.value);
                  }}
                />
              </div>
              {/* <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div> */}
              {/* <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div> */}
              <div>
                <label htmlFor="description">Notes</label>
                <textarea
                  id="description"
                  rows="3"
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  id="countInStock"
                  type="number"
                  placeholder="Enter countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="salePrice">Sale Price</label>
                <input
                  id="salePrice"
                  type="number"
                  placeholder="Enter Sale Price"
                  value={salePrice}
                  onChange={(e) => setSalePrice(+e.target.value)}
                ></input>
              </div>

              <div className="row">
                <div>
                  <label htmlFor="visible">Visibility</label>
                  <input
                    id="visible"
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => {
                      setVisible(e.target.checked);
                    }}
                  ></input>
                </div>{" "}
                <div>
                  <label htmlFor="forSale">For Sale</label>
                  <input
                    id="forSale"
                    type="checkbox"
                    checked={forSale}
                    onChange={(e) => {
                      setForSale(e.target.checked);
                    }}
                  ></input>
                </div>
              </div>

              <div>
                <label></label>
                <button className="primary" type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
