import React,{useState,useEffect} from 'react'
import {useParams,Link, useNavigate} from 'react-router-dom';
import "./AddEdit.css"
import axios from 'axios';
import {toast} from 'react-toastify';

const initialState={
    name:'',
    email:'',
    contact:'',
}

const AddEdit = () => {
    const [state,setState]=useState(initialState);

    const {name,email,contact}=state;
    const {id}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:3009/api/get/${id}`).then((response)=>setState({...response.data[0]}))
    },[id])

    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error('please provide value into each input feild')
        }else{
            if(!id){
                axios.post('http://localhost:3009/api/post',{
                    name,
                    email,
                    contact
                }).then(()=>{
                    setState({name:'',email:'',contact:''})
                }).catch((error)=>toast.error(error.response.data))
                toast.success('contact added successfully')
                setTimeout(()=>navigate('/'),500)
            }else{
                axios.put(`http://localhost:3009/api/update/${id}`,{
                    name,
                    email,
                    contact
                }).then(()=>{
                    setState({name:'',email:'',contact:''})
                }).catch((error)=>toast.error(error.response.data))
                toast.success('contact updated successfully')
                setTimeout(()=>navigate('/'),500)
            }
        }

    };

    const handleInput=(e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value})
    }
  return (
    <div style={{marginTop:'100px'}}>
      <form style={{
        margin:'auto',
        padding:'15px',
        maxWidth:'400px',
        alignContent:'center'
      }}
      onSubmit={handleSubmit}
      >
        <lable htmlFor='name'>Name</lable>
        <input type='text' id='name' name='name' placeholder='Your Name.....' value={name || ''} onChange={handleInput} />
        <lable htmlFor='email'>Email</lable>
        <input type='email' id='email' name='email' placeholder='Your Email.....' value={email || ''} onChange={handleInput} />
        <lable htmlFor='contact'>Contact</lable>
        <input type='number' id='contact' name='contact' placeholder='Your Contact.....' value={contact || ''} onChange={handleInput} />
        <input type='submit' value={id ? 'Update' :'Save'} />
        <Link to='/'>
            <input type='button' value='Go Back' />
        </Link>
        </form>  
    </div>
  )
}

export default AddEdit