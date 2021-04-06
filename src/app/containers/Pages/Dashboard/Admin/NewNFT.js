import {
    Card,
    CardContent, Grid
} from '@material-ui/core/';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';

import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import r1 from '../../../../assets/img/patients/patient.jpg';
import r2 from '../../../../assets/img/r2.jpg';
import r3 from '../../../../assets/img/r3.jpg';
import r4 from '../../../../assets/img/r4.jpg';
import r5 from '../../../../assets/img/r5.jpg';
import r6 from '../../../../assets/img/r6.jpg';
import audio from '../../../../assets/mp3/music.mp3';


import ReactDOM from "react-dom";
import Cube from "react-3d-cube";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    badge: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    card: {
        minWidth: 250,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));



function NewNFT(props) {
    // const  = ;

    // variable to play audio in loop
    const [audioTune, setAudioTune] = useState(new Audio(audio));
    const [playInLoop, setPlayInLoop] = useState(false);

    // load audio file on component load
    useEffect(() => {
        audioTune.load();
    }, [])

    // set the loop of audio tune
    useEffect(() => {
        audioTune.loop = playInLoop;
    }, [playInLoop])

    // play audio sound
    const playSound = () => {
        var playPromise = audioTune.play();
        console.log("audioTune", audioTune);

        // if (playPromise !== undefined) {
        //     playPromise
        //         .then(_ => {
        //             // Automatic playback started!
        //             // Show playing UI.
        //             console.log(audio);
        //             console.log("audio played auto");
        //         })
        //         .catch(error => {
        //             // Auto-play was prevented
        //             // Show paused UI.
        //             console.log("playback prevented", error);
        //         });
        // }
        audioTune.play();
    }

    // pause audio sound
    const pauseSound = () => {
        console.log("audioTune", audioTune);
        audioTune.pause();
    }

    // stop audio sound
    const stopSound = () => {
        console.log("audioTune", audioTune);
        audioTune.pause();
        audioTune.currentTime = 0;
    }
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    // const [inputList, setInputList] = useState([]);
    let [isSaving, setIsSaving] = useState(false);
    let [title, setTitle] = useState();
    let [description, setDescription] = useState();
    let [types, setTypes] = useState(["Common", "Rare", "Epic", "Lgendary", "Uncommon"]);
    let [supplies, setSupplies] = useState(["Fixed Supply", "Variable Supply", "Mintable"]);
    let [supply, setSupply] = useState("");


    let [collectionTypes, setCollectionTypes] = useState(["Common", "Rare", "Epic", "Lgendary", "Uncommon"]);
    let [collectionType, setCollectionType] = useState("New Collection");
    let [collection, setCollection] = useState('');
    let [fileData, setFileData] = useState('');
    let [tokenSupply, setTokenSupply] = useState();
    let [importerName, setImporterName] = useState('');
    let [type, setType] = useState();
    let [isDisabledImporter, setIsDisabledImporter] = useState(true);
    let [image1Blob, setImage1Blob] = useState(r1);
    let [image2Blob, setImage2Blob] = useState(r1);
    let [image3Blob, setImage3Blob] = useState(r1);
    let [image4Blob, setImage4Blob] = useState(r1);
    let [image5Blob, setImage5Blob] = useState(r1);
    let [image6Blob, setImage6Blob] = useState(r1);

    let [image1, setImage1] = useState(r1);
    let [image2, setImage2] = useState(r1);
    let [image3, setImage3] = useState(r1);
    let [image4, setImage4] = useState(r1);
    let [image5, setImage5] = useState(r1);
    let [image6, setImage6] = useState(r1);
    let [music, setMusic] = useState();

    let fileSelectHandler = (event, index) => {
        if (event.target.files[0] !== undefined) {
            setFileData(event.target.files[0]);
        }
    };
    let uploadMusicHandler = (event, index) => {
        console.log("event.target.files", event.target.files);
        console.log("event.target.value", event.target.value);
        if (event.target.files[0] !== undefined) {
            setMusic(event.target.files[0]);
            setAudioTune(event.target.value);
        }
    };

    useEffect(() => {
        props.setActiveTab({
            dashboard: "",
            newNFT: "active",
            orders: "",
            settings: "",
            privacyPolicy: "",
            termsandconditions: "",
            changePassword: "",
            newDrop:"",
            newCollection:"",
        });
    }, []);

    const handleSubmitEvent = (event) => {
        event.preventDefault();
        setIsSaving(true);

        let jwt = Cookies.get("Authorization");
        let jwtDecoded = jwtDecode(jwt);
        let exporter = jwtDecoded.id;
        let fileData = new FormData();
        // fileData.append("importerId", importer);
        fileData.append("exporterId", exporter);
        // console.log("JSON.stringify(inputList)", inputList);
        let catagoryArray = [];
        let descriptionArray = [];
        // for (let i = 0; i < inputList.length; i++) {
        //     catagoryArray.push(inputList[i].title);
        //     descriptionArray.push(inputList[i].description);
        //     fileData.append(`file`, inputList[i].fileData);
        // }
        console.log(descriptionArray);

        fileData.append(`description`, JSON.stringify(descriptionArray));
        fileData.append(`documentNames`, JSON.stringify(catagoryArray));
        fileData.append(`numberOfTokens`, tokenSupply * 10 ** 18);

        for (var pair of fileData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        axios.post("api/v1/exporter/addOrder", fileData).then(
            (response) => {
                setIsSaving(false);
                let variant = "success";
                enqueueSnackbar('Order Added Successfully.', { variant });
            },
            (error) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                    console.log(error.response);
                }
                setIsSaving(false);
                let variant = "error";
                enqueueSnackbar('Unable to Add Order.', { variant });

            }
        );
    };
    // const handleRemoveClick = (index) => {
    //     const list = [...inputList];
    //     list.splice(index, 1);
    //     setInputList(list);
    // };

    // handle click event of the Add button
    const handleAddClick = () => {

        // setInputList([...inputList, { title: title, description: description, fileData: fileData }]);
        // setTitle('');
        // setDescription('');
        // setFileData('');
    };

    let onChangeFile = (e) => {
        if (e.target.files.length > 6) {
            alert("you cant upload more than 6 images")
        } else
            if (e.target.files.length === 0) {
                setImage1(r1);
                setImage2(r1);
                setImage3(r1);
                setImage4(r1);
                setImage5(r1);
                setImage6(r1);
                setImage1Blob(r1);
                setImage2Blob(r1);
                setImage3Blob(r1);
                setImage4Blob(r1);
                setImage5Blob(r1);
                setImage6Blob(r1);
            }
            else {
                for (let i = 0; i < e.target.files.length; i++) {

                    if (i === 0) {
                        setImage1(e.target.files[0])
                        setImage1Blob(URL.createObjectURL(e.target.files[0]))
                        setImage2(r1);
                        setImage3(r1);
                        setImage4(r1);
                        setImage5(r1);
                        setImage6(r1);
                        setImage2Blob(r1);
                        setImage3Blob(r1);
                        setImage4Blob(r1);
                        setImage5Blob(r1);
                        setImage6Blob(r1);

                    }
                    if (i === 1) {
                        setImage2(e.target.files[1])
                        setImage2Blob(URL.createObjectURL(e.target.files[1]))
                        setImage3(r1);
                        setImage4(r1);
                        setImage5(r1);
                        setImage6(r1);
                        setImage3Blob(r1);
                        setImage4Blob(r1);
                        setImage5Blob(r1);
                        setImage6Blob(r1);
                    }
                    if (i === 2) {
                        setImage3(e.target.files[2])
                        setImage3Blob(URL.createObjectURL(e.target.files[2]))
                        setImage4(r1);
                        setImage5(r1);
                        setImage6(r1);
                        setImage4Blob(r1);
                        setImage5Blob(r1);
                        setImage6Blob(r1);
                    }
                    if (i === 3) {
                        setImage4(e.target.files[3])
                        setImage4Blob(URL.createObjectURL(e.target.files[3]))
                        setImage5(r1);
                        setImage6(r1);
                        setImage5Blob(r1);
                        setImage6Blob(r1);
                    }
                    if (i === 4) {
                        setImage5(e.target.files[4])
                        setImage5Blob(URL.createObjectURL(e.target.files[4]))
                        setImage6(r1);
                        setImage6Blob(r1);

                    }
                    if (i === 5) {
                        setImage6(e.target.files[5])
                        setImage6Blob(URL.createObjectURL(e.target.files[5]))
                    }
                }
            }
        let fileCollection = [];

        Array.from(e.target.files).map(f => fileCollection.push(f));

    }

    return (
        <div className="card">
            <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">New NFT</li>
            </ul>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 col-lg-6">
                        {/* <div className="App">
                            <audio src={audioTune} />
                            
                            <input type="button" className="btn btn-primary mr-2" value="Play" onClick={playSound}></input>
                            <input type="button" className="btn btn-warning mr-2" value="Pause" onClick={pauseSound}></input>
                            <input type="button" className="btn btn-danger mr-2" value="Stop" onClick={stopSound}></input>

                        </div> */}
                        <form onSubmit={handleSubmitEvent}>
                            <div className="form-group">
                                <label>Select Artwork</label>
                                <div className="filter-widget">
                                    <div className="form-group">
                                        <div className="change-avatar">

                                            <div className="upload-img">
                                                <div
                                                    className="change-photo-btn"
                                                // style={{ backgroundColor: "rgb(167,0,0)" }}
                                                >
                                                    <span>
                                                        <i className="fa fa-upload"></i>
                          Upload Artworks
                        </span>
                                                    <input
                                                        name="sampleFile"
                                                        type="file"
                                                        multiple
                                                        className="upload"
                                                        accept=".png,.jpg,.jpeg,gif"
                                                        onChange={onChangeFile}
                                                    // onChange={onChangePictureHandler}
                                                    />
                                                </div>
                                                <small className="form-text text-muted">
                                                    Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                      </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label>Select Type</label>
                                <div className="filter-widget">
                                    <Autocomplete
                                        id="combo-dox-demo"
                                        required
                                        options={types}
                                        // disabled={isDisabledImporter}
                                        getOptionLabel={(option) =>
                                            option
                                        }
                                        onChange={(event, value) => {
                                            if (value == null) setType("");
                                            else {
                                                console.log(value);
                                                setType(value)
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Type"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Token Supply</label>
                                    <div className="filter-widget">
                                        <input
                                            type="number"
                                            placeholder="Enter Total Supply"
                                            required
                                            value={tokenSupply}
                                            placeholder=""
                                            className="form-control"
                                            onChange={(e) => {
                                                setTokenSupply(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <label>Select Supply Type</label>
                                <div className="filter-widget">
                                    <Autocomplete
                                        id="combo-dox-demo"
                                        required
                                        options={supplies}
                                        // disabled={isDisabledImporter}
                                        getOptionLabel={(option) =>
                                            option
                                        }
                                        onChange={(event, value) => {
                                            if (value == null) setType("");
                                            else {
                                                console.log(value);
                                                setSupply(value)
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Supply Type"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Title</label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            required
                                            value={title}
                                            placeholder="Enter Art Work Title"
                                            className="form-control"
                                            onChange={(e) => {
                                                setTitle(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            type="text"
                                            required
                                            rows="4"
                                            value={description}
                                            placeholder="Enter Art work Description"
                                            className="form-control"
                                            onChange={(e) => {
                                                setDescription(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Upload Music</label>{" "}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            required
                                            type="file"
                                            name="sampleFile"
                                            accept=".mp3"
                                            className="form-control"
                                            onChange={(e) => uploadMusicHandler(e)}

                                        />
                                    </div>
                                    <FormControl component="fieldset">
                                        <lable component="legend">Select to add in Collection </lable>
                                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                            <FormControlLabel style={{ color: 'black' }} value="New Collection" onChange={() => setCollectionType("New Collection")} checked={collectionType === 'New Collection'} control={<Radio color="secondary" />} label="New Collection" />
                                            <FormControlLabel style={{ color: 'black' }} value="Existing Collection" onChange={() => setCollectionType("Existing Collection")} checked={collectionType === 'Existing Collection'} control={<Radio color="secondary" />} label="Existing Collection" />
                                        </RadioGroup>
                                    </FormControl>
                                    {collectionType === 'New Collection' ? (
                                        <div className="form-group">
                                            <label>New Collection</label>
                                            <input
                                                type="text"
                                                required
                                                value={collection}
                                                placeholder="Enter Collection Name"
                                                className="form-control"
                                                onChange={(e) => {
                                                    setCollection(e.target.value)
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="form-group">

                                            <label>Select Collection</label>
                                            <div className="filter-widget">
                                                <Autocomplete
                                                    id="combo-dox-demo"
                                                    required
                                                    options={collectionTypes}
                                                    // disabled={isDisabledImporter}
                                                    getOptionLabel={(option) =>
                                                        option
                                                    }
                                                    onChange={(event, value) => {
                                                        if (value == null) setCollection("");
                                                        else {
                                                            console.log(value);
                                                            setCollection(value)
                                                        }
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Collections"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>

                                    )}

                                    {/* {title === '' || description === '' || tokenSupply === '' || fileData === '' || setType === "" || typeof setType === "undefined" ? (
                                        <button
                                            className="btn"
                                            type="submit"
                                            disabled
                                        >
                                            <i className="fa fa-upload"></i>{' '}Upload to IPFS
                                        </button>
                                    ) : (
                                        <button
                                            className="btn"
                                            type="submit"
                                            onClick={handleAddClick}
                                        >
                                            <i className="fa fa-upload"></i>{' '} Upload to IPFS
                                        </button>
                                    )} */}
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="col-md-12 col-lg-6">
                        {/* <!-- Change Password Form --> */}
                        <div className="App">
                            <div class="wrapper">
                                <div class="cube-box1">
                                    <img src={image1Blob} alt="" />
                                    <img src={image2Blob} alt="" />
                                    <img src={image3Blob} alt="" />
                                    <img src={image4Blob} alt="" />
                                    <img src={image5Blob} alt="" />
                                    <img src={image6Blob} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {isSaving ? (
                    <div className="text-center">
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ color: "#00d0f1" }}
                        >
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    // inputList.length === 0 ? (
                    //     <div className="submit-section">
                    //         <button type="button" disabled className="btn submit-btn">
                    //             Create NFT
                    // </button>
                    //     </div>
                    // ) : (
                    <div className="submit-section">
                        <button type="button" onClick={handleSubmitEvent} className="btn submit-btn">
                            Create NFT
                  </button>
                    </div>
                    // )

                )}
            </div>

        </div >

    );
}

export default NewNFT;
