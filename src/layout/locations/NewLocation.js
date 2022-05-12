import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import {getFirestore, addDoc, collection} from "firebase/firestore";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import fire from "../../firebase-config";
import {GeoPoint} from "firebase/firestore";
import "./NewLocation.css"
import ImageUpload from "../../components/upload-img/ImageUpload";
import makeAnimated from 'react-select/animated';


function NewLocation() {

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();
    const longitudeInputRef = useRef();
    const latitudeInputRef = useRef();
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [image, setImg] = useState();
    let [loading, setLoading] = useState(false);
    const style = {cursor: 'pointer', display: 'flex'};

    let progress;
    useEffect(() => {
        if (progress < 99) {
            setLoading(true);
        }
    });

    const tags = [
        {value: 'hiking', label: 'hiking'},
        {value: 'climbing', label: 'climbing'},
        {value: 'fort', label: 'fort'},
        {value: 'history', label: 'history'},
        {value: 'architecture', label: 'architecture'},
        {value: 'beach', label: 'beach'},
        {value: 'weekend getaway', label: 'weekend getaway'},
        {value: 'nightlife', label: 'nightlife'},
        {value: 'dine-in', label: 'dine-in'},
        {value: 'rooftop', label: 'rooftop'},
        {value: 'camping', label: 'camping'},
        {value: 'dining', label: 'dining'},
        {value: 'party', label: 'party'},
    ]
    const animatedComponents = makeAnimated();

    const db = getFirestore(fire);
    const storage = getStorage();

    const handleChange = (options) => {
        const tags = []
        options.map(tag =>
            tags.push(tag.value)
        );
        setSelectedTags(tags);
        console.log(selectedTags);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        await uploadImage(image);
        setLoading(true);
        console.log(loading);
    }

    async function uploadImage(img) {
        setIsLoading(true);
        const storageRef = ref(storage, `/locations/${img.name}`)
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on("state_changed", (snapshot) => {
                progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, (err) => console.log(err),
            async () => {

                const response = await getDownloadURL(uploadTask.snapshot.ref)
                console.log(response);
                setLoading(false);

                const enteredName = nameInputRef.current.value;
                const enteredAddress = addressInputRef.current.value;
                const enteredDescription = descriptionInputRef.current.value;
                const enteredLongitude = longitudeInputRef.current.value;
                const enteredLatitude = latitudeInputRef.current.value;

                const locationData = {
                    description: enteredDescription,
                    geolocation: new GeoPoint(enteredLongitude, enteredLatitude),
                    location: enteredAddress,
                    mainPhoto: response,
                    name: enteredName,
                    tags: selectedTags
                }

                await addDoc(collection(db, "locations", ""), locationData).then(() => {
                        setIsLoading(false);
                    }
                )
            }
        );
    }

    return (
        <div style={{display: "flex", paddingTop: "50px", justifyContent: "center"}}>
            <div className="location-container">
                <div className="form-container add-location-container">
                    <form onSubmit={handleSubmit}>
                        <div className="overlay">
                            <div className="overlay-panel">
                                <ImageUpload setImg={setImg}/>
                            </div>
                        </div>
                        <div className="control">
                            <label htmlFor="name">Location Name</label>
                            <input type="text" required id='name' ref={nameInputRef}/>
                        </div>
                        <div className="control">
                            <div className="long-lat">
                                <label htmlFor="longitude">Longitude</label>
                                <input type="number" required id='longitude' ref={longitudeInputRef}/>
                                <label htmlFor="latitude">Latitude</label>
                                <input type="number" required id='latitude' ref={latitudeInputRef}/>
                            </div>
                        </div>
                        <div className="control">
                            <label htmlFor="address">Location</label>
                            <input type="text" required id='address' ref={addressInputRef}/>
                        </div>
                        <div className="control">
                            <label htmlFor="description">Description</label>
                            <textarea id='description' required rows='8' ref={descriptionInputRef}/>
                        </div>
                        <div className="control">
                            <label htmlFor="tags">Tags</label>
                            <Select options={tags} closeMenuOnSelect={false}
                                    components={animatedComponents} isMulti onChange={handleChange} style={style}/>
                        </div>
                        <div className="actions">
                            <button>Add Location</button>
                        </div>
                        {!isLoading && <div className="control">
                            <p className="done">DONE</p>
                        </div>}
                    </form>
                </div>
            </div>
        </div>)
}

export default NewLocation;