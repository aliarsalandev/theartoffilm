import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
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

export default function ProductEditScreen(props) {
  const formats = [
    { value: "US 1 Sheet", label: "US 1 Sheet" },
    { value: "US Halfsheet", label: "US Halfsheet" },
    { value: "US Lobby Se", label: "US Lobby Se" },
    { value: "US Insert", label: "US Insert" },
    { value: "US Window Card", lable: "US Window Card" },
    { value: "German A0", label: "German A0" },
    { value: "German A1", label: "German A1" },
    { value: "German A2", label: "German A2" },
    { value: "German Lobby Cards", label: "German Lobby Cards" },
    { value: "Japanese B1", label: "Japanese B1" },
    { value: "Japanese B2", label: "Japanese B2" },
    { value: "Japanese B3", label: "Japanese B3" },
    { value: "Japanese B4", label: "Japanese B4" },
    { value: "Japanese B5", label: "Japanese B5" },
    { value: "French Grande", label: "French Grande" },
    { value: "French Half Grande", label: "French Half Grande" },
    { value: "French Pantalon", label: "French Pantalon" },
    { value: "French Moyenne", label: "French Moyenne" },
    { value: "French Petite", label: "French Petite" },
    { value: "French Lobby Cards", label: "French Lobby Cards" },
    { value: "Italian Foglio", label: "Italian Foglio" },
    { value: "Italian 2 Foglio", label: "Italian 2 Foglio" },
    { value: "Italian 4 Foglio", label: "Italian 4 Foglio" },
    { value: "Italian Locandina", label: "Italian Locandina" },
    { value: " Italian Photobusta", label: " Italian Photobusta" },
    { value: "UK Quad", label: "UK Quad" },
    { value: "UK 1 Sheet", label: "UK 1 Sheet" },
    { value: "UK Double Crown", label: "UK Double Crown" },
    { value: "UK 3 Sheet", label: "UK 3 Sheet" },
    { value: "UK 6 Sheet", label: "UK 6 Sheet" },
    { value: "UK Front of House set", label: "UK Front of House set" },
  ];
  const countries = [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "United Kingdom", code: "UK" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
  ];
  const navigate = useNavigate();
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

    if (successUpdate) {
      window.scrollTo(0, 0);
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      productDirectorsRef.current = product.directors;
      productCastsRef.current = product.casts;
      productArtistsRef.current = product.artists;

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
  }, [product, dispatch, productId, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const director_ids = productDirectorsRef.current.map(({ _id }) => _id);
    const cast_ids = productCastsRef.current.map(({ _id }) => _id);
    const artist_ids = productArtistsRef.current.map(({ _id }) => _id);
    console.log({
      _id: productId,
      name,
      price,
      salePrice,
      image,
      images,
      directors: director_ids,
      casts: cast_ids,
      artists: artist_ids,
      origin,
      year,
      format,
      condition,
      rolledFolded,
      countInStock,
      description,
      visible,
      forSale,
    });

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        salePrice,
        image,
        images,
        directors: director_ids,
        casts: cast_ids,
        artists: artist_ids,
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
      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      setLoadingUpload(false);
    } catch (err) {
      setErrorUpload(err);
      dispatch({ type: "UPLOAD_FAIL", payload: err });
    }
  };

  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
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
                          name: __directors[__directors.length - 1].label,
                        };
                        dispatch(createProductDirectors(_director));
                        break;
                      default:
                        break;
                    }
                    productDirectorsRef.current = __directors;
                  }}
                />
              </div>
              <div>
                <label htmlFor="directors">Casts</label>

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
                          name: __casts[__casts.length - 1].label,
                        };
                        dispatch(createProductCasts(_cast));
                        break;
                      default:
                        break;
                    }
                    productCastsRef.current = __casts;
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
                          name: __artists[__artists.length - 1].label,
                        };
                        dispatch(createProductArtist(_artist));
                        break;
                      default:
                        break;
                    }
                    productArtistsRef.current = __artists;
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
                  options={countries?.map((country) => ({
                    value: country.code,
                    label: country.name,
                  }))}
                  onChange={(__origin, { action }) => {
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
                  onChange={(__year, { action }) => {
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
                  options={formats}
                  onChange={(__format, { action }) => {
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
                  options={[
                    { value: "Mint", label: "Mint" },
                    { value: "Near Mint", label: "Near Mint" },
                    { value: "Very Good", label: "Very Good" },
                    { value: "Good", label: "Good" },
                    { value: "Fair", label: "Fair" },
                    { value: "Poor", label: "Poor" },
                  ]}
                  onChange={(__condition, { action }) => {
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
                  options={[
                    { value: "Rolled", label: "Rolled" },
                    { value: "Folded", label: "Folded" },
                  ]}
                  onChange={(__rolledFolded, { action }) => {
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
