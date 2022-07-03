import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";

import { templateImage } from "../../constants/Constants";
import "./product-control.css";
import validateProduct from "../../validations/product-validation";
import { InputBlock } from "../../components";
import { getFeedback, handleInputChange } from "../../helpers/FormClasses";
import {
  createCertificate,
  fetchCertificateById,
  updateCertificate,
} from "../../redux/slices/certificateSlice";
import equals from "../../helpers/ArrayHelper";

const ProductControl = (props) => {
  const dispatch = useDispatch();
  const isUpdate = props.match.params.action === "edit";
  const certificate = useSelector((state) => state.certificates.certificate);
  const controlStatus = useSelector(
    (state) => state.certificates.controlStatus
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(templateImage);
  const [imageObj, setImageObj] = useState(null);
  const [imageAlt, setImageAlt] = useState("template");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      name: name,
      description: description,
      price: price,
      duration: duration,
      image: image,
      imageObj: imageObj,
      tags: tags,
    };
    const errors = validateProduct(values, isUpdate);

    setFieldErrors(errors);
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      isUpdate
        ? dispatch(
            updateCertificate({
              id: certificate.id,
              data: prepareFieldsForUpdate(values),
            })
          )
        : dispatch(createCertificate(prepareFieldsForCreation(values)));
    }
  };

  const previewFile = (e) => {
    const reader = new FileReader();
    const files = e.target.files;
    const filesArray = Array.from(files);
    const image = filesArray[0];

    reader.onloadend = function (event) {
      setImage(event.target.result);
    };
    if (image) {
      reader.readAsDataURL(image);
      setImageObj(image);
      setImageAlt(image.name);
    } else {
      setImageObj(null);
      setImage(templateImage);
      setImageAlt("template");
    }
    delete fieldErrors.image;
  };

  const handleTagDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleTagDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const removeTagsError = () => {
    const newFieldErrors = fieldErrors;

    delete newFieldErrors.tags;

    setFieldErrors(newFieldErrors);
  };

  const prepareFieldsForCreation = (values) => {
    const data = new FormData();
    const certificateToCreate = new Object();

    certificateToCreate.name = values.name;
    certificateToCreate.description = values.description;
    certificateToCreate.price = values.price;
    certificateToCreate.duration = values.duration;
    certificateToCreate.tags = tags.map((tag) => {
      return {
        name: tag.text,
      };
    });
    data.append(
      "certificate",
      new Blob([JSON.stringify(certificateToCreate)], {
        type: "application/json",
      })
    );
    data.append("image", values.imageObj);
    console.log(data);

    return data;
  };

  const prepareFieldsForUpdate = (values) => {
    const data = new FormData();
    const certificateDataToUpdate = new Object();
    const tagsToUpdate = tags.map((tag) => tag.text);
    const currentTags = certificate.tags.map((tag) => tag.name);

    if (values.description !== certificate.description) {
      certificateDataToUpdate.description = values.description;
    }
    if (values.price !== certificate.price) {
      certificateDataToUpdate.price = values.price;
    }
    if (values.duration !== certificate.duration) {
      certificateDataToUpdate.duration = values.duration;
    }
    if (!equals(currentTags, tagsToUpdate)) {
      certificateDataToUpdate.tags = tagsToUpdate.map((name) => {
        return {
          name: name,
        };
      });
    }
    data.append(
      "certificate",
      new Blob([JSON.stringify(certificateDataToUpdate)], {
        type: "application/json",
      })
    );
    data.append("image", values.imageObj);

    return data;
  };

  useEffect(() => {
    if (isUpdate) {
      dispatch(fetchCertificateById(props.match.params.id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (certificate) {
      setName(certificate.name);
      setDescription(certificate.description);
      setDuration(certificate.duration);
      setPrice(certificate.price);
      setImage(certificate.imageUrl);
      setTags(
        certificate.tags.map((tag) => {
          return { id: tag.name, text: tag.name };
        })
      );
    }
  }, [certificate]);

  return controlStatus === "succeeded" ? (
    <Redirect to="/" />
  ) : (
    <div className="certificate-page form__wrap">
      <form onSubmit={handleSubmit}>
        <h2 className="certificate-page__title">
          {isUpdate ? "Edit coupon" : "Add new coupon"}
        </h2>
        <div className="form-block__container">
          <div className="form-block">
            <img src={image} className="certificate-img" alt={imageAlt} />
            <label htmlFor="file" className="file-upload certificate-img-label">
              Choose image
            </label>
            <input id="file" type="file" onChange={previewFile} />
            <div className="form-block__feedback">
              <span className="form-block__feedback--invalid">
                {getFeedback(fieldErrors.image)}
              </span>
            </div>
          </div>
          <div>
            <InputBlock
              id="name"
              type="text"
              label="Item name"
              value={name}
              error={fieldErrors.name}
              disabled={isUpdate}
              onChange={(e) =>
                handleInputChange(e, setName, fieldErrors, setFieldErrors)
              }
            />
            <div className="form-block">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              >
                {description}
              </textarea>
            </div>
            <InputBlock
              id="duration"
              type="number"
              label="Duration (days)"
              value={duration}
              min="1"
              error={fieldErrors.duration}
              onChange={(e) =>
                handleInputChange(e, setDuration, fieldErrors, setFieldErrors)
              }
            />
            <InputBlock
              id="price"
              type="number"
              label="Price, $"
              value={price}
              min="1"
              error={fieldErrors.price}
              onChange={(e) =>
                handleInputChange(e, setPrice, fieldErrors, setFieldErrors)
              }
            />
            <div className="form-block">
              <label htmlFor="tags">Tags</label>
              <ReactTags
                id="tags"
                tags={tags}
                placeholder="Press enter to add tag"
                handleDelete={handleTagDelete}
                handleAddition={handleTagAddition}
                handleDrag={handleTagDrag}
                inputFieldPosition="top"
                autocomplete
                handleInputChange={removeTagsError}
              />
              <div className="form-block__feedback">
                <span className="form-block__feedback--invalid">
                  {getFeedback(fieldErrors.tags)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="btn__container">
          <Link to="/" className="btn-main-lg cancel-btn">
            Cancel
          </Link>
          <button type="submit" className="btn-main-lg save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductControl;
