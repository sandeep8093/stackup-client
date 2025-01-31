import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE,
    SET_CURRENT_USER,  GET_PROFILES } from './types';
    import {publicRequest,userRequest} from '../requestMethods';
//get current profile
export const getCurrentProfile = ()=> async dispatch => {
    try {
        dispatch(setProfileLoading());
        const res = await axios.get(`https://stackup-server.onrender.com/api/profile`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
          });   
      } catch (err) {        
        dispatch({
          type: GET_PROFILE,
          payload: {}
        });
      }
}

//get profile by HANDLE
export const getProfileByHandle = (handle)=> async dispatch => {
    try {
        dispatch(setProfileLoading());
        const res = await axios.get(`https://stackup-server.onrender.com/api/profile/handle/${handle}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
          });   
      } catch (err) {        
        dispatch({
          type: GET_PROFILE,
          payload: null
        });
      }
}

//GET all Profiles
export const getProfiles = ()=>async dispatch=>{
    
    try{       
        dispatch(setProfileLoading());
        const res = await axios.get(`https://stackup-server.onrender.com/api/profile/all`)
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: GET_PROFILES,
            payload: null
        })
    }
}


//profile loading
export const setProfileLoading = ()=>{
    return{
        type: PROFILE_LOADING
    }
}

//clear current profile 
export const clearCurrentProfile = ()=>{
    return{
        type: CLEAR_CURRENT_PROFILE
    }
}

// Create or update profile
export const createProfile = (profileData,history)=> async dispatch=>{
    try{
        const res = await axios.post(`https://stackup-server.onrender.com/api/profile`, profileData);
        history.push('/dashboard');   
        console.log(res.data)
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    }
} 

export const addExperience = (expData,history)=>async dispatch=>{
    try{
        const res = await axios.post(`https://stackup-server.onrender.com/api/profile/experience`,expData);
        history.push('/dashboard');
        console.log(res.data)
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    }
}

// Add Education
export const addEducation = (expData,history)=>async dispatch=>{
    try{
        const res = await axios.post(`https://stackup-server.onrender.com/api/profile/education`,expData);
        history.push('/dashboard');
        console.log(res.data)
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    }
}

// Delete Experience
export const deleteExperience = (id)=>async dispatch=>{
    try{
        const res = await axios.delete(`https://stackup-server.onrender.com/api/profile/experience/${id}`);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    }
}

// Delete Education
export const deleteEducation = (id)=>async dispatch=>{
    try{
    const res = await axios.delete(`https://stackup-server.onrender.com/api/profile/education/${id}`);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    }
}

//delete profile
export const deleteAccount = ()=>async dispatch=>{
    if(window.confirm('Are you sure? This can NOT be undone!')){
        try{
            await axios.delete(`https://stackup-server.onrender.com/api/profile`)
            dispatch({
                type:SET_CURRENT_USER,
                payload: {} //will log user out after deletion
            })
        }catch(err){
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data 
            })
        }
    }
}