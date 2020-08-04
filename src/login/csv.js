import React,{useState,useContext} from 'react';
import { CSVReader } from 'react-papaparse'
import Axios from 'axios';
import {DataContext} from '../Contexts/DataContextComponent';

export default function CSV(props){
    const [csv,setCsv] = useState({users:[]});
    const [isSubmit,setSubmit] = useState(false);
    const dataContext = useContext(DataContext);
    var buttonRef = React.createRef();
    
    var handleSubmit = (alldata)=>{
        // console.log(alldata);
        
        var outData = new Promise((resolve,reject)=>{
            resolve(alldata.map((data) => data.data));
        });
        outData.then((data)=>{
            console.log(data);
            setCsv({users:data.slice(4)});
        }) 
    
    };

    var handleError = ()=>{
      if(isSubmit === true){
        return <div className = "msg-success">Submitted</div>
      }
      else if(isSubmit === 'failed'){
        return <div className = "msg-fail"> Submit Failed </div>
      }
      else if(isSubmit === "sending"){
        return <div className = "msg-sending"> Sending</div>
      }
      else {
        return null;
      }
    }

      var handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.open(e)
        }
      }
    
    //   var handleOnFileLoad = (data) => {
    //     console.log('---------------------------')
    //     console.log(data)
    //     console.log('---------------------------')
    //   }
    
      var handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
      }
    
      var handleOnRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
      }
    
      var handleRemoveFile = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.removeFile(e)
        }
      }

      var sendData = (event)=>{
          event.preventDefault();
          setSubmit("sending")
          Axios.post("http://localhost:3000/csv",{users:csv.users})
          .then((response)=>{
              console.log(response.data);
              dataContext.getData("All");
              dataContext.setLoc("All");
              setSubmit(true);
          })
          .catch((error)=>{
            console.log(error);
            setSubmit("failed");
          })
      }

    return(
      <div className="csv-container">
        <form onSubmit = {sendData}>
            <CSVReader
          ref={buttonRef}
          onFileLoad={handleSubmit}
          onError={handleOnError}
          noClick
          noDrag
          onRemoveFile={handleOnRemoveFile}
        >
           {({ file }) => (
            <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10,
              width:'800px'
            }}
          >
              <button
                type='button'
                onClick={handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
              >
                Browse file
              </button>
              <div className="CSV-div"
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 40,
                  lineHeight: 2,
                  marginTop: 0,
                  marginBottom: 0,
                  paddingLeft: 13,
                  textAlign:"center",
                  paddingTop: 3,
                  width: '100%'
                }}
              >
                {file && file.name?"File Uploaded":"Upload File"}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                onClick={handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
          </CSVReader>
          <button className="submitCsv" type="submit">Submit CSV</button>
          <div>{csv.users.map((user)=>
              <div>
                  <b>Name :</b> {user[0]} <b>Email:</b> {user[1]} <b>Duration:</b> {user[4]}
              </div>
          )}</div>

          {
            handleError()
          }
          
        </form>
        </div>
        

    );
}