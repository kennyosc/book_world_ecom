import React,{Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import ProfileNav from './ProfileNav'
import Header from '../headers/Header.js'
import axios from '../../config/axios.js'

class Inbox extends Component{

    state={
        user_notification:[]
    }

    componentWillMount(){
        axios.get(`/usernotifications/${this.props.user.id}`).then(res=>{
            this.setState({user_notification: res.data})
        })
    }

    renderInbox = () =>{
        axios.get(`/usernotifications/${this.props.user.id}`).then(res=>{
            this.setState({user_notification: res.data})
        })
    }

    //NOTIFICATIONS
    handleDeleteNotification = (notif_id)=>{
        const user_id = this.props.user.id
        axios.delete(`/deleteusernotification/${user_id}/${notif_id}`).then(res=>{
            console.log(res)
            this.renderInbox()
        })
    }

    handleClearAllNotif = () =>{
        axios.delete(`/deleteallusernotification/${this.props.user.id}`).then(res=>{
            console.log(res)
            this.renderInbox()
        })
    }

    renderInbox = () =>{
        if(this.state.user_notification.length === 0){
            return(
                <tr>
                    <td>No Notifications</td>
                </tr>
            )
        }else{
            return this.state.user_notification.map(val=>{
                return(
                    <tr>
                        <td style={{width:'10%'}} className='border-top-0 border-bottom'>
                            <button style={{color:'lightgrey'}} className='btn' onClick={()=>this.handleDeleteNotification(val.id)}><i className="fas fa-window-close"></i></button>
                        </td>
                        <td className='border-top-0 border-bottom' style={{fontSize:'0.9em'}}>
                            <p>{val.notification}</p>
                            <p style={{fontSize:'0.8em',color:'grey',marginBottom:'1%'}}>At {val.created_at}</p>
                        </td>
                    </tr>
                )
            })
        }
    }

    render(){
        if(this.props.user.username === ''){
            return(
                <Redirect to=''/>
            )
        }else{
            return(
                <div>
                    <Header/>
                    <div className='container'>
                        <div className="row my-4">
                            <div className="col-sm-12 col-lg-3 position-sticky">
                                {/* PROFILE NAV */}
                                <ProfileNav/>
                            </div>
                            <div class="card col-sm-12 col-md-6 col-lg-7">
                                <div class="card-body">
                                
                                    <div className='mb-3'>
                                        <h2 className='d-inline'>Inbox</h2>
                                        <button onClick={this.handleClearAllNotif} style={{fontSize:'0.7em'}} className='btn btn-light btn-sm ml-3'>Clear All</button>
                                    </div>

                                    <table class="table table-hover">
                                        <tbody>
                                            {this.renderInbox()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps)(Inbox)