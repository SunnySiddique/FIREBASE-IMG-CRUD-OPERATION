import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../firebase";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
  "Scholarship",
];

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const { title, tags, trending, category, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storgeRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storgeRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is runing");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase sucessfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const getBlogDetail = useCallback(async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }

    setActive(null);
  }, [id, setActive]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id, getBlogDetail]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending && form && user)
      if (!id) {
        try {
          const docRef = collection(db, "blogs");
          await addDoc(docRef, {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const docRef = doc(db, "blogs", id);
          await updateDoc(docRef, {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (error) {
          console.error(error);
        }
      }
    else {
      return toast.error("All Fields are compulsory to fill");
    }
    navigate("/");
  };

  return (
    <>
      <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12">
            <div className="text-center heading py-2">
              {id ? "Update Blog" : "Create Blog"}
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row blog-form" onSubmit={handleSubmit}>
                {/* first input */}

                <div className="col-12 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </div>

                {/* first input */}

                {/* second input */}

                <div className="col-12 py-3">
                  <ReactTagInput
                    tags={tags}
                    placeholder="Tags"
                    onChange={handleTags}
                  />
                </div>

                {/* second input */}

                {/* radio input */}

                <div className="col-12 py-3">
                  <p className="trending">Is it trending blog ?</p>
                  <div className="form-check-inline mx-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="yes"
                      name="radioOption"
                      checked={trending === "yes"}
                      onChange={handleTrending}
                    />
                    <label htmlFor="radioOption" className="form-check-label">
                      Yes&nbsp;
                    </label>
                    <input
                      type="radio"
                      className="form-check-input"
                      value="no"
                      name="radioOption"
                      checked={trending === "no"}
                      onChange={handleTrending}
                    />
                    <label htmlFor="radioOption" className="form-check-label">
                      No
                    </label>
                  </div>
                </div>
                {/* radio input */}

                {/* category input */}

                <div className="col-12 py-3">
                  <select
                    value={category}
                    onChange={onCategoryChange}
                    className="catg-dropdown"
                  >
                    <option>Please select category</option>
                    {categoryOption.map((option, index) => (
                      <option value={option || ""} key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* category input */}

                {/* textAria input */}

                <div className="col-12 py-3">
                  <textarea
                    className="form-control description-box"
                    placeholder="Description"
                    value={description}
                    name="description"
                    onChange={handleChange}
                  />
                </div>

                {/* textAria input */}

                {/* file input */}

                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                {/* file input */}

                {/* button input */}

                <div className="col-12 py-3 text-center">
                  <button
                    className="btn btn-add"
                    type="submit"
                    disabled={progress !== null && progress < 100}
                  >
                    {id ? "Update" : "Submit"}
                  </button>
                </div>

                {/* button input */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditBlog;
