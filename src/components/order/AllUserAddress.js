import React, {Component} from 'react'
import axios from '../../config/axios';

class AllUserAddress extends Component{

    handleSelectAsMain = (address_id) =>{
        axios.patch(`/setaddressasmain/${this.props.user_id}/${address_id}`).then(res=>{
            this.props.getAllUserAddress()
            this.props.renderAll()
        })
    }

    handleDeleteAddress = (address_id) =>{
        axios.delete(`/deleteuseraddress/${this.props.user_id}/${address_id}`).then(res=>{
            console.log(res)
            this.props.getAllUserAddress()
            this.props.renderAll()
        })
    }

    renderList = () =>{
        const val = this.props.val
        const index = this.props.index

            if(val.main_address === 0){
                return(
                    <div>
                        <li class="list-group-item"><b>{index+1}. {val.order_recipient}, ({val.phone_number}): </b>{val.address.concat(` , ${val.city}, ${val.postal_code}`)}
                        <p className='mt-2'>
                            <b><button onClick={()=>this.handleSelectAsMain(val.id)} style={{fontSize:'0.7em'}} className='btn btn-light mr-3'>Set as main address</button></b>
                            <b><button onClick={()=>this.handleDeleteAddress(val.id)} style={{fontSize:'0.7em'}} className='btn btn-light mr-3'>Delete Address</button></b>
                        </p>
                        </li>
                    </div>
                )
            }else{
                return(
                    <div>
                        <li class="list-group-item"><b>{index+1}. {val.order_recipient}, ({val.phone_number}): </b>{val.address.concat(` , ${val.city}, ${val.postal_code}`)}
                        <p className='mt-2'>
                            <b><button style={{fontSize:'0.7em'}} className='btn btn-success disabled'>Main Address</button></b>
                        </p>
                        </li>
                    </div>
                )
            }
    }

    render(){
        return(
            <div>
                <ul class="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        )
    }
}

export default AllUserAddress