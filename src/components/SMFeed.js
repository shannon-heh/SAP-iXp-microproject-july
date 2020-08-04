import React,{useState, useEffect,useContext} from 'react';
import Axios from 'axios';
import {AuthContext} from '../Contexts/AuthContextComponent'
import trophy from '../../src/images/sap_trophy.png'
import { Container, Row, Col } from 'react-grid';
import swag from '../../src/images/sapswag.png'
import yang from '../../src/images/yangSAP.jpg'
import olympics from '../../src/images/intern_olympics.png'
import writing from '../../src/images/japanese_writing.jpg'


export default function Feed() {
   
  
    return (
    <div className='feed'>
         
            <center><h2><strong>SAP iXp Feed</strong></h2></center>
            <div className='profile-wrapper'>
                <div>
            Share what you're up to with your fellow iXp interns and view what they've been doing!
                    <br/>

                    <Row id='row3'>
                    <button id="new-post" className="promsg"><strong>New Post</strong></button> 
                    </Row>
                    <div className='info-block'> 
                        <div className='info-header'>
                            <img src={swag} width='280px'/>
                        </div>
                        <div className='post1text'>
                            <strong>Mike Jones:</strong>
                            Just received my SAP iXp swag! Can't wait to wear this 
                            when I go back to school. Thank you SAP!!
                        </div>
                    </div>
                    <div className='info-block'> 
                        <div className='info-header'>
                            <img src={yang} width='280px'/>
                        </div>
                        <div className='post1text'>
                            <strong>Sarah Lee:</strong>
                            Attended this SAP chat with Andrew Yang today.  
                            He was responding to our comments and he even answered my question.
                            This was so cool!! #YangGang 
                        </div>
                    </div>
                    <div className='info-block'> 
                        <div className='info-header'>
                            <img src={olympics} width='280px'/>
                        </div>
                        <div className='post1text'>
                            <strong>Mike Jones:</strong>
                            Just received my SAP iXp swag! Can't wait to wear this 
                            when I go back to school. Thank you SAP!!
                        </div>
                    </div>
                    <div className='info-block'> 
                        <div className='info-header'>
                            <img src={writing} width='280px'/>
                        </div>
                        <div className='post1text'>
                            <strong>Mike Jones:</strong>
                            Just received my SAP iXp swag! Can't wait to wear this 
                            when I go back to school. Thank you SAP!!
                        </div>
                    </div>
                </div>
           
            </div>
            
    
    </div>); 
}