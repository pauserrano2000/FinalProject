import "./Search.css";
import React, { FC, useState, useEffect, useCallback } from "react";
import { Form } from "../../Components/Form/Form";
import { ImagesWrapper } from "../../Components/ImagesWrapper/ImagesWrapper";
import { useNavigate, Outlet } from "react-router-dom";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useNotification } from "../../Hooks/useNotification";
import { searchImages } from "../../Services/apicalls";
import { type ImageDataFE } from "../../Services/apicalls-mapper";
import { validateSearch } from "../../Services/validate";
import { ImageCard } from "../../Components/ImageCard/ImageCard";
import { Callout } from "../../Components/Callout/Callout";
import { IconSearch } from "../../Components/Icons/Icons";
import { Pagination } from "../../Components/Pagination/Pagination";
import { Loading } from "../../Components/Loading/Loading";


export const Search: FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const { showErrorNotification } = useNotification();

  const [images, setImages] = useState<null | ImageDataFE[]>(null);
  const [selectedImage, setSelectedImage] = useState<null | ImageDataFE>(null);
  const queryInput = useInput(validateSearch);
  const [query, setQuery] = useState(""); //stores the query for pagination since queryInput.value is reseted after submit

  const perPageOptions = [10, 20, 30];
  const [perPage, setPerPage] = useState(perPageOptions[2]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState<null | number>(null);
  const [totalPages, setTotalPages] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);



  const fetchSearchImages = useCallback(async (query: string, currentPage: number, perPage: number) => {
    try {
      setIsLoading(true);
      const { total, pages, images: fetchedImages } = await searchImages(query, currentPage, perPage)
      setImages(fetchedImages);
      if (total !== totalResults) {
        setTotalResults(total);
      }
      if (pages !== totalPages) {
        setTotalPages(pages);
      }
      setHasError(false);
      setTimeout(() => setIsLoading(false), 150); //Little delay (design decision)
    } catch (error) {
      console.error(error);
      setHasError(true);
      showErrorNotification({
        title: "Http requests to load search images failing",
        message: "You have reached the limit of 50 requests/hour",
      });
    }
  }, [showErrorNotification, totalResults, totalPages])
  

  useEffect(() => { //example loaded at the beggining
    setQuery("galaxy")
  }, []);
  
  useEffect(() => {
    if (query) {
      fetchSearchImages(query, currentPage, perPage);
    }
  }, [fetchSearchImages, query, currentPage, perPage]);


  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(queryInput.value);
    setCurrentPage(1);
    fetchSearchImages(query, currentPage, perPage);
    queryInput.reset();
  }

  const clickImageHandler = (image: ImageDataFE) => {
    setSelectedImage(image);
    navigate(`/search/${image.id}`);
  }

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
  }

  return (
    <main className="search">
      <div className={`search__top ${theme}-search__top `}>
        <h1 className="search__h1">
          Find the perfect image
        </h1>
        <div className="search__form">
          <Form direction="row" onSubmit={submitHandler}>
            <Form.Input
              type="text"
              id="query"
              value={queryInput.value}
              placeholder="Search for high-quality, copyright-free stock images (+3.48 million)"
              onChange={queryInput.changeHandler}
              onBlur={queryInput.blurHandler}
              hasError={queryInput.hasError}
              errorText="Some special characters not allowed"
            />
            <Form.Submit disabled={!queryInput.isValid}>
              <IconSearch size={22} />
            </Form.Submit>
          </Form>
          <Callout to="/image-creator" textLink="Create your own image">
            Can't find what you're looking for?
          </Callout>
        </div>
        <div className="search__info">
          {!isLoading && images && (
            <p className={`search__info__p ${theme}-search__info__p `}>
              {images.length !== 0 && `Total "${query}" results: ${totalResults} images`}
            </p>
          )}
          <label className={`search__info__label ${theme}-search__info__p `} htmlFor="perPage">
            Images per page:
          </label>
          <select
            id="perPage"
            className={`search__info__select ${theme}-search__info__p `}
            value={perPage}
            onChange={selectHandler}
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!hasError && isLoading && <Loading />}
      {hasError &&
        <p className={`search__not-found ${theme}-search__not-found`}>
          Http requests to load search images failing (check the api key)
        </p>}
      {images?.length === 0 &&
        <p className={`search__not-found ${theme}-search__not-found`}>
          Sorry, we couldn't find any results for "{query}"
        </p>}
      {!isLoading && images && (<>
        <ImagesWrapper>
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClickImage={clickImageHandler}
            />
          ))}
        </ImagesWrapper>
        <Pagination
          currentPage={currentPage}
          onChange={setCurrentPage}
          totalPages={totalPages!}
        />
      </>
      )}
      <Outlet context={{ selectedImage }} />
    </main>
  );
};