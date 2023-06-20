import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import usdIcon from "../assets/usd.svg";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
import { AuthContext } from "../contexts/AuthContext";

const DetailProduct = () => {
  const {
    postState: { post, images },
  } = useContext(PostContext);
  const {
    authState: {
      user: { username, numberPhone },
    },
  } = useContext(AuthContext);

  const [initPost, setInitPost] = useState([]);
  const [initImages, setInitImages] = useState([]);

  const [hasRunEffect, setHasRunEffect] = useState(false);

  useEffect(() => {
    if (post) {
      localStorage.setItem("post", JSON.stringify(post));
      setInitPost(post);
    } else {
      const parsedPost = JSON.parse(localStorage.getItem("post"));
      setInitPost(parsedPost);
    }

    if (!hasRunEffect) {
      if (Object.keys(images).length === 0 || images === null) {
        const parsedImages = JSON.parse(localStorage.getItem("images"));
        setInitImages(parsedImages);
      } else {
        localStorage.setItem("images", JSON.stringify(images));
        setInitImages(images);
      }
      setHasRunEffect(true);
    }

    initImages.map(async (image, index) => {
      try {
        const response = await axios.get(
          `${apiUrl}/posts/getImage/${image.fileName}`,
          {
            responseType: "blob",
          }
        );
        const blobData = new Blob([response.data]);
        const reader = new FileReader();
        reader.onloadend = () => {
          image.url = reader.result;
          if (index === 0) {
            setActiveImage(image.url);
            setImageRecent(image.url);
          }
        };
        reader.readAsDataURL(blobData);
      } catch (error) {
        console.error(error);
      }
    });
  }, [initImages]);

  // xử lý chọn size;
  const [selectedSize, setSelectedSize] = useState("xs");

  const handleInputChange = (event) => {
    setSelectedSize(event.target.value);
  };

  // xử lý tăng giảm số lượng;
  const [total, setTotal] = useState("1");

  const handleIncreTotal = (event) => {
    event.preventDefault();
    setTotal(parseInt(total) + 1);
  };

  const handleDescreTotal = (event) => {
    event.preventDefault();
    if (parseInt(total) > 1) {
      setTotal(parseInt(total) - 1);
    }
  };

  // xử lý nút thả tim;
  const colorHeart = "#f25769";
  const [originalColor, setOriginalColor] = useState("currentColor");

  const handleHeartBtn = (event) => {
    event.preventDefault();
    if (originalColor === colorHeart) {
      setOriginalColor("currentColor");
    } else {
      setOriginalColor(colorHeart);
    }
  };

  // xử lý hover ảnh nhỏ
  const [activeImage, setActiveImage] = useState(null);
  const [imageRecent, setImageRecent] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageHover = (image) => {
    setIsHovered(true);
    setActiveImage(image);
  };

  const handleImageClick = (image) => {
    setIsClicked(true);
    setActiveImage(image);
    setImageRecent(activeImage);
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      setIsHovered(false);
      setActiveImage(imageRecent);
    } else {
      setIsClicked(false);
    }
  };

  return (
    <div className="flex font-sans bg-[#f0f1f4] m-10 rounded-[10px] drop-shadow-xl">
      <div className="flex-none w-1/3 h-[520px] relative ">
        <img
          src={activeImage}
          alt=""
          id="main-image"
          className="rounded-[10px] absolute inset-0 w-full h-[396px] object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 py-[12px] w-full grid grid-cols-4 gap-x-4">
          {initImages.map((image, index) => (
            <img
              key={index}
              className="thumbnail w-[102px] h-[100px] object-cover"
              src={image.url}
              alt={index + 1}
              onMouseEnter={() => handleImageHover(`${image.url}`)}
              onClick={() => handleImageClick(`${image.url}`)}
              onMouseLeave={() => handleMouseLeave(`${image.url}`)}
            />
          ))}
        </div>
      </div>
      <form className="flex-auto p-6 pl-[40px]">
        <div className="flex flex-wrap">
          <h1 className="flex-auto font-semibold text-slate-900 text-4xl">
            {initPost.tittle}
          </h1>
          <div className="flex text-3xl font-semibold text-slate-500">
            {initPost.price}
            <img className="w-6 h-6 my-auto" src={usdIcon} alt="" />
          </div>
          <div className="w-full flex-none text-lg font-medium text-slate-700 mt-2">
            <p className="text-xl">
              <i class="fa-solid fa-shop"></i> {username}
            </p>
            <p className="inline-block">
              <i class="fa-solid fa-square-phone"></i> {numberPhone}
            </p>
          </div>
        </div>
        <div className="flex items-baseline mt-8 ml-12 my-[50px] pb-8 border-b border-slate-200">
          <div className="space-x-2 flex text-sm">
            <p className="flex items-center font-medium text-2xl">Size: </p>
            <label>
              <input
                className="sr-only peer"
                name="size"
                type="radio"
                value="xs"
                checked={selectedSize === "xs"}
                onChange={handleInputChange}
              />
              <div className="bg-[#d7ddf4] w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                XS
              </div>
            </label>
            <label>
              <input
                className="sr-only peer"
                name="size"
                type="radio"
                value="s"
                checked={selectedSize === "s"}
                onChange={handleInputChange}
              />
              <div className="bg-[#d7ddf4] w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                S
              </div>
            </label>
            <label>
              <input
                className="sr-only peer"
                name="size"
                type="radio"
                value="m"
                checked={selectedSize === "m"}
                onChange={handleInputChange}
              />
              <div className="bg-[#d7ddf4] w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                M
              </div>
            </label>
            <label>
              <input
                className="sr-only peer"
                name="size"
                type="radio"
                value="l"
                checked={selectedSize === "l"}
                onChange={handleInputChange}
              />
              <div className="bg-[#d7ddf4] w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                L
              </div>
            </label>
            <label>
              <input
                className="sr-only peer"
                name="size"
                type="radio"
                value="xl"
                checked={selectedSize === "xl"}
                onChange={handleInputChange}
              />
              <div className="bg-[#d7ddf4] w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                XL
              </div>
            </label>
          </div>
          <div className="ml-[100px] flex">
            <p className="flex items-center font-medium text-2xl px-3">
              Total:{" "}
            </p>
            <button
              id="btn-decrease"
              className="px-4 py-2 cursor-pointer bg-gray-200"
              onClick={handleDescreTotal}
            >
              -
            </button>
            <span id="total" className="flex mx-4 items-center">
              {total}
            </span>
            <button
              id="btn-increase"
              className="px-4 py-2 cursor-pointer bg-gray-200"
              onClick={handleIncreTotal}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex space-x-4 mb-10 text-sm font-medium">
          <div className="flex-auto flex space-x-4 justify-center">
            <button
              className="h-10 px-6 font-semibold text-base rounded-md bg-[#4d5187] text-white"
              type="submit"
            >
              <i className="fa-solid fa-money-bill-wave"></i> Buy now
            </button>
            <button
              className="h-10 px-6 font-semibold text-base rounded-md border bg-[#4d5187] border-slate-200 text-white"
              type="button"
            >
              <i className="fa-solid fa-cart-plus"></i> Add to bag
            </button>
          </div>
          <div className="flex">
            <p className="flex items-center mr-[5px] text-xl">Favorites: 43</p>
            <button
              id="heart-btn"
              className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200 bg-[#a5a5b4]"
              type="button"
              aria-label="Like"
              onClick={handleHeartBtn}
            >
              <svg
                width="20"
                height="20"
                fill={originalColor}
                aria-hidden="true"
                id="heart-icon"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-medium py-4">Describe product:</h3>
          <div className="text-sm text-slate-700">
            <ul className="list-disc text-base">
              <li>{initPost.description}</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailProduct;
